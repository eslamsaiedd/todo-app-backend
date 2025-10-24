
const Task = require('../models/taskModel')

const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({userId: req.user.id}) 
        res.json(tasks)
    }catch (error) {
        res.status(500).json({status: ERROR, message: "server error"})
    }
} 

// add new task
const addTask = async (req, res) => {
    try {
        const {title} = req.body
        const newTask = await Task.create({userId: req.user.id, title})
        res.status(201).json(newTask)
    }catch (error) {
        res.status(500).json({status: ERROR, message: "server error"})
    }
}

// edit task
const editTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)
        if (!task || task.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        task.completed = !task.completed;

        await task.save();
        res.json(task);

    } catch (error) {
        res.status(500).json({ message: "Error updating task" });
    }
}

// delete task
const deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)
        if (!task || task.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized" });
        }
        await task.deleteOne();
        res.json({ message: "Task deleted" });
    }catch (error) {
        res.status(500).json({ message: "Error deleting task" });
    }

}
module.exports = {
    getTasks,
    addTask, 
    editTask,
    deleteTask
}





// const express = require("express");
// const router = express.Router();
// const Task = require("../models/Task");
// const authMiddleware = require("../middleware/authMiddleware"); // لازم المستخدم يكون داخل

// router.use(authMiddleware);

// // 🟢 GET - هات كل المهام بتاعة المستخدم
// router.get("/", async (req, res) => {
//   try {
//     const tasks = await Task.find({ userId: req.user.id });
//     res.json(tasks);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching tasks" });
//   }
// });

// // 🟡 POST - أضف مهمة جديدة
// router.post("/", async (req, res) => {
//   try {
//     const { title } = req.body;
//     const newTask = await Task.create({ userId: req.user.id, title });
//     res.status(201).json(newTask);
//   } catch (error) {
//     res.status(500).json({ message: "Error creating task" });
//   }
// });

// // 🔵 PUT - غيّر حالة التاسك (من منجزة إلى غير منجزة والعكس)
// router.put("/:id/toggle", async (req, res) => {
//   try {
//     const task = await Task.findById(req.params.id);
//     if (!task || task.userId.toString() !== req.user.id)
//       return res.status(403).json({ message: "Unauthorized" });

//     task.completed = !task.completed;
//     await task.save();
//     res.json(task);
//   } catch (error) {
//     res.status(500).json({ message: "Error updating task" });
//   }
// });

// // 🔴 DELETE - احذف التاسك
// router.delete("/:id", async (req, res) => {
//   try {
//     const task = await Task.findById(req.params.id);
//     if (!task || task.userId.toString() !== req.user.id)
//       return res.status(403).json({ message: "Unauthorized" });

//     await task.deleteOne();
//     res.json({ message: "Task deleted" });
//   } catch (error) {
//     res.status(500).json({ message: "Error deleting task" });
//   }
// });

// module.exports = router;
