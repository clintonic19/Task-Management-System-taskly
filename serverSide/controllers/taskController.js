const express = require("express");
const { protectedRoute, isAdminRoute } = require("../middlewares/authHandler");
const User = require("../models/userModels");
const Task = require("../models/taskModels");
const Notify = require("../models/notifyModel");

// CREATE TASK FOR USERS POST ROUTE
const createTask = async (req, res) => {
  try {

    const { userId } = req.user;

    const { title, team, stage, date, priority, assets } = req.body;

    // CREATE A MESSAGE TO THE USER
     let text = "New Task created and Assigned to you";
     if(team?.length > 1){
        text = text + ` and ${team?.length - 1} others`;
     }
      text = text + ` The Task Priority is ${priority} and the Due Date is ${ new Date(date.toString())} Weldon!!!`;

      const activity = {
        type: "assigned",
        activity: text,
        by: userId,
      };

    const task = await Task.create({
      title,
      team,
      stage: stage?.toLowerCase(),
      date,
      priority: priority?.toLowerCase(),
      assets,
      activities: activity,
    });

    // let message = "New Task created and Assigned to you";

    // if (task.team.length > 1) {
    //   message = message + ` and ${task.team.length - 1} more members`;
    // }
    // message =
    //   message +
    //   ` with Priority is ${
    //     task.priority
    //   } and Due Date is ${task.date.toString()} Weldon!!!`;

    await Notify.create({ team: task.team, text: text, task: task._id });

    res.status(201).json({ status: true, task, message: "Task Created Successfully"});
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// DEUPPLICATE TASK FOR USERS POST ROUTE
const duplicateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);

    const newTask = await Task.create({
      ...task,
      title:  `Copy of ${task.title}`,
    });

    newTask.team = task.team;
    newTask.SubTask = task.SubTask;
    newTask.assets = task.assets;
    newTask.priority = task.priority;
    newTask.stage = task.stage;

    await newTask.save();

    // ALERT MESSAGE
    let message = "New Task created and Assigned to you";

    if (task.team.length > 1) {
      message = message + ` and ${task.team.length - 1} more members`;
    }
    message =
      message +
      ` with Priority is ${
        task.priority
      } and Due Date is ${task.date.toString()} Weldon!!!`;

    await Notify.create({
      team: task.team,
      task: newTask._id,
      message: message,
    });

     res
      .status(201)
      .json({ message: "Task Duplicated Successfully", task });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// TASK ACTIVITY POST ROUTE
const TaskActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.user;
    const { type, activity } = req.body;

    const task = await Task.findById(id);

    const data = {
      type,
      activity,
      by: userId,
    };

    task.activities.push(data);
    await task.save();
    res.status(200).json({
      status: true,
      message: "Task Activity Posted Successfully",
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// USER DASHBOARD AND GET STATISTIC OR GRAPH
const dashboard = async (req, res) => {
  try {
    const { userId, isAdmin } = req.user;

    const allTasks = isAdmin
      ? await Task.find({
          isTrashed: false,
        })
          .populate({ path: "team", select: " name role title email" })
          .sort({ _id: -1 })
      : await Task.find({
          isTrashed: false,
          team: { $all: [userId] },
        })
          .populate({ path: "team", select: " name role title " })
          .sort({ _id: -1 });

    //FETCHING USER DETAILS
    const users = await User.find({ isActive: true })
      .select("name role title isAdmin createdAt")
      .limit(5)
      .sort({ _id: -1 });

    //CALCULATE COUNTS FOR DASHBOARD
    const tasks = allTasks.reduce((result, task) => {
      const stage = task.stage;

      if (!result[stage]) {
        result[stage] = 1;
      } else {
        result[stage] += 1;
      }
      return result;
    }, {});

    //FETCHING PRIORITY
    const data = Object.entries(
      allTasks.reduce((result, task) => {
        const { priority } = task;
        result[priority] = (result[priority] || 0) + 1;
        return result; 
      }, {}))
      .map(([name, total]) => ({ name, total }));

    // CALCULATE ALL TASK
    const total = allTasks.length;
    const last10Task = allTasks?.slice(0, 10);

    const sum = {
      total,
      last10Task,
      users: isAdmin ? users : [],
      tasks: tasks,
      graphData: data,
    };

    res.status(200).json({
      status: true,
      message: " Done ",
      ...sum,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//GET ALL TASK
const getTasks = async (req, res) => {
  try {
    const { stage, isTrashed } = req.query;

    let query = { isTrashed: isTrashed ? true : false };

    if (stage) {
      query.stage = stage;
    }

    let queryResult = Task.find(query)
      .populate({
        path: "team",
        select: "name, title email",
      })
      .sort({ _id: -1 });

    const tasks = await queryResult;

     res.status(200).json({ status: true, tasks });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//GET EACH TASK OR SINGLE TASK
const getTask = async (req, res) => {
  try {
    const { id } = req.params;

    const tasks = await Task.findById(id)
      .populate({
        path: "team",
        select: "name role email title",
      })
      .populate({
        path: "activities.by",
        select: "name",
      })
      .sort({ _id: -1 });
    res
      .status(200)
      .json({ message: "Task Created Successfully", tasks });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//CREATE SUBTASK PUT REQUEST
const createSubTask = async (req, res) => {
  try {
    const { title, tag, date } = req.body;
    const { id } = req.params;
    console.log(req.params);

    const newSubTask = {
      title,
      tag,
      date,
    };

    const subTask = await Task.findById(id);
    subTask.SubTask.push(newSubTask);
    await subTask.save();

    res
      .status(200)
      .json({ message: "SubTask Created Successfully", tasks });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//UPDATE A TASK PUT REQUEST
const updateTask =  (async (req, res) => {
    try {
        const { id } = req.params;
        const { title, date, team, stage, priority, assets } = req.body;

        const task = await Task.findByIdAndUpdate(id);

        task.title = title;
        task.date = date,
        task.priority = priority.toLowerCase();
        task.assets = assets;
        task.stage = stage.toLowerCase();
        task.team = team;

        await task.save()

     res
      .status(201)
      .json({ status: true, message: "Task Updated Successfully",  });

  }catch (error) {
        return res.status(500).json({ message: error.message });
    }
});


// TRASHED TASKS PUT REQUEST
const trashTask =  (async (req, res) => {
    try {
        const { id } = req.params;

        const task = await Task.findById(id);
        task.isTrashed = true;
        await task.save()

    res
      .status(201)
      .json({ status: true, message: "Task Trashed Successfully",  });


  }catch (error) {
        return res.status(500).json({ message: error.message });
    }
});


//RESTORE DELETED TASKS
const deleteRestoreTask =  (async (req, res) => {
    try {
        const { id } = req.params;
        const { actionType } = req.query;

        if(actionType === "delete"){
            await Task.findByIdAndDelete(id)

        }else if (actionType === "deleteAll"){
           await Task.deleteMany({isTrashed: true})

        }else if (actionType === "restore"){
          // const result = await Task.findById(id);
          const result = await Task.findByIdAndUpdate(id);
          result.isTrashed = false;
             result.save();
            
        }else if (actionType === "restoreAll"){
           await Task.updateMany({ isTrashed: true }, {  $set: {isTrashed: false} });        
        }
        
      res
      .status(201)
      .json({ status: true, message: " Done ",  });

  }catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// const createTask =  (async (req, res) => {
//     try {

//   }catch (error) {
//         return res.status(500).json({ message: error.message });
//     }
// });

module.exports = {
    createTask,
    getTasks,
    getTask,
    duplicateTask,
    TaskActivity,
    dashboard,
    createSubTask,
    updateTask,
    trashTask,
    deleteRestoreTask,
};
