const express = require("express");
const jwt = require("jsonwebtoken");

const createJWTToken =  (res, userId) => {
//   try {
//     // const { id } = req.body;
//     const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
//       expiresIn: "1d",
//     });
//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV !== "development",
//       sameSite: "strict", //PREVENT CSRF ATTACKS
//       maxAge: 1000 * 60 * 60 * 24, // 1day
//     });
//     return token;
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }

    //   UPDATED CODE FOR JWT TOKEN
    try {
        const token = jwt.sign({ userId }, process.env.JWT_SECRET,{
            expiresIn: '1d',
        });
    
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict', //PREVENT CSRF ATTACKS
            // sameSite: 'none', //PREVENT CSRF ATTACKS
            maxAge: 1000 * 60 * 60 * 24,
        });
        

    } catch (error) {
        return res.status(500).json({ message: error.message });    
    }

};

module.exports = { createJWTToken };
