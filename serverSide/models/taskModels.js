const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    date: {
      type: Date,
      required: true,
      default: new Date(),
    },

    priority: {
      type: String,
      default: "normal",
      enum: ["low", "normal", "high", "medium"],
    },

    stage: {
      type: String,
      default: "todo",
      enum: ["todo", "in-progress", "completed"],
    },

    activities: [
      {
        type: {
          type: String,
          default: "assigned",
          enum: [
            "assigned",
            "in-progress",
            "completed",
            "started",
            "commented",
            "bug",
          ],
        },

        activity: { type: String },

        date: { type: Date, default: new Date() },

        by: { type: Schema.Types.ObjectId, ref: "User" },
      },
    ],

    SubTask: [
      {
        title: String,
        date: Date,
        tag: String,
      },
    ],

    assets: [String],

    team: [{ type: Schema.Types.ObjectId, ref: "User" }],

    isTrashed: { type: Boolean, default: false },
  },
  { timeStamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
