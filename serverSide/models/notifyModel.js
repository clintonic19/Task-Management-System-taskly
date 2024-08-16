const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const notifySchema = new Schema({

    team: [{ type: Schema.Types.ObjectId, ref: "User" }],
    text: { type: String },
    task: { type: Schema.Types.ObjectId, ref: "Task" },
    notiType: { type: String,  default: "alert", enum:["alert", "message"] },
    isRead: [{ type: Schema.Types.ObjectId, ref: "User" }],
} , { timeStamps: true });

module.exports = mongoose.model('Notify', notifySchema);