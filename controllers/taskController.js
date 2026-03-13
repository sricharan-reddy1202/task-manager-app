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
exports.getTasks = async (req, res) => {
    try {

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const skip = (page - 1) * limit;

        const filter = { createdBy: req.user._id };

        if (req.query.status) {
            filter.status = req.query.status;
        }

        const tasks = await Task.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        res.json(tasks);

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};