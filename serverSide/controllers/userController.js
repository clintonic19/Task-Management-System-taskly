const express = require("express");
// const { response } = require("express");
const User = require("../models/userModels");
const Notify = require("../models/notifyModel");
const { createJWTToken } = require("../utils/createJWTToken");

//REGISTER USERS
const registerUser = async (req, res) => {
  try {
    const { name, title, email, role, password, isAdmin } = req.body;

    const existUser = await User.findOne({ email });

    // CHECK IF USER EXISTS
    if (existUser) {
       res.send({ status: false, message: "User already exists" });
    }

    //CREATE A NEW USER
    const user = await User.create({
      name,
      title,
      email,
      role,
      password,
      isAdmin,
    });

    // CREATE NEW USER
    if ( user ) {
      isAdmin ? createJWTToken(res, user._id) : null;

      user.password = undefined;

      // return res.status(201).json( user );
      return res.send( user );
    } else {
      return res
        .status(400)
        .json({ status: false, message: "Invalid user data" });
    }
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

// LOGIN USER
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email:email });

    // CHECK IF USER EXISTS
    if (!user) {
       res.send({ status: false, message: "Invalid email and password" });
    }

    // CHECK IF USER IS ACTIVE
    if (!user?.isActive) {
       res.send({ status: false, message: "Account deactivated, please contact admin" });
    }

    // CHECK IF PASSWORD IS CORRECT
    const isPasswordCorrect = await user.matchPassword(password);
    if (!isPasswordCorrect) {
       res.send({ message: "Invalid email or password" });
    }

    // CREATE JWT TOKEN
    if (user && isPasswordCorrect) {
      createJWTToken(res, user._id);
      user.password = undefined;
       res.send({ user });
    } else {
       res
        .status(401)
        .json({ status: false, message: "Invalid email and password" });
    }
  } catch (error) {
    console.log(error)
     res.status(500).json({ message: error.message });
  }
};

// LOGOUT USER
const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token", "", {
      httpOnly: true,
      // secure: process.env.NODE_ENV === "production",
      // sameSite: "None",
      expires: new Date(0),
    });
   res.send({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET TEAM MEMBERS  LIST
const getTeamList = async (req, res) => {
  try {
    const team = await User.find().select(
      "name title role email isActive"
    );
    res.status(200).json({ team });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// GET NOTIFICATION LIST
const getNotifyList = async (req, res) => {
  try {
    const { userId } = req.user;
    const NotifyUser = await Notify.find({
      team: userId,
      isRead: { $nin: [userId] },
    })
      .populate("team", "name, email")
      .populate("task", "title")
      .select("team text task notiType");
    res.status(200).json({ NotifyUser });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// UPDATE A USER PROFILE
const updateUserProfile = async (req, res) => {
  try {
    const { userId, isAdmin } = req.user;
    const { _id } = req.body;

    // CHECK IF USER IS ADMIN TO UPDATE PROFILE OR NOT ADMIN
    const id =
      isAdmin && userId === _id
        ? userId
        : isAdmin && userId !== _id
        ? _id
        : userId;

    const user = await User.findById(id);

    // CHECK IF USER EXISTS
    if (user) {
      user.name = req.body.name || user.name;
      user.title = req.body.title || user.title;
      // user.email = req.body.email || user.email;
      user.role = req.body.role || user.role;
      // user.isActive = req.body.isActive || user.isActive;
      // user.isAdmin = req.body.isAdmin || user.isAdmin;

      const updatedUser = await user.save();
      updatedUser.password = undefined;
      return res.status(200).json({ status: true, message: "Profile Updated Successfully", user: updatedUser});
    } else {
      return res.status(404).json({ status: false, message: "User Not Found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// MARK READ NOTIFICATION
const markNotifyAsRead = async (req, res) => {
  try {
    const { userId } = req.user;
    const { id, isReadType } = req.query;

    // CHECK TO MARK ALL NOTIFICATION AS READ
    if (isReadType === "all") {
      const notify = await Notify.updateMany(
        { team: userId, isRead: { $nin: [userId] } },
        { $push: { isRead: userId } },
        { new: true }
      );
      return res.status(200).json({ notify });
    } else {
      const notify = await Notify.findByIdAndUpdate(
        { _id: id, isRead: { $nin: [userId] } },
        { $push: { isRead: userId } },
        { new: true }
      );
      return res.status(200).json({ notify, status: true, message: "Done" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//CHANGE USER PASSWORD

const changePassword = async (req, res) => {
  try {
    const { userId } = req.user;
    // const { oldPassword, newPassword } = req.body;

    const user = await User.findById(userId);

    // CHECK IF USER EXISTS
    if (user) {
      // CHECK IF OLD PASSWORD IS CORRECT
      // const isPasswordCorrect = await user.matchPassword(oldPassword);
      // if (!isPasswordCorrect) {
      //     return res.status(401).json({ message: "Invalid old password" });
      // }
      // user.password = newPassword;
      // await user.save();
      // return res.status(200).json({ message: "Password changed successfully" });
      user.password = req.body.password;
      await user.save();
      user.password = undefined;
      return res.status(200).json({ message: "Password changed successfully" });
    } else {
      return res.status(404).json({ message: "User Not Found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// ACTIVATE USER PROFILE
const activateUserProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (user) {
      // user.isActive = req.body.isActive;
      user.isActive = !user.isActive;
      await user.save();
      return res.status(200).json({
        status: true,
        message: `User profile updated ${
          user?.isActive ? "activated" : "deactivated"
        }`,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// DELETE USER PROFILE
const deleteUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (user) {
      await user.remove();
      return res
        .status(200)
        .json({ status: true, message: "User profile deleted" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getTeamList,
  getNotifyList,
  markNotifyAsRead,
  updateUserProfile,
  changePassword,
  activateUserProfile,
  deleteUserProfile,
};
