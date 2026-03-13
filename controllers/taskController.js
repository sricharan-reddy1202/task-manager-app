const Task = require("../models/Task");

exports.createTask = async (req, res) => {
    try {

        const { title, description, status, dueDate } = req.body;

        const task = await Task.create({
            title,
            description,
            status,
            dueDate,
            createdBy: req.user._id
        });

        res.status(201).json(task);

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};