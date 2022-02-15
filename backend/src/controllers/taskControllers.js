const taskServices = require('../services/taskServices');
const e = require('../utils/dictionary/status');

const createTask = async (req, res, next) => {
  try {
    const task = await taskServices.createTask(req.body);
    return res.status(e.created).json(task);
  } catch (error) {
    return next(error);
  }
};

const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await taskServices.getAllTasks(req.body, req.user);
    return res.status(e.success).json(tasks);
  } catch (error) {
    return next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const task = await taskServices.updateTask(req.body, req.user);
    return res.status(e.success).json(task);
  } catch (error) {
    return next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    await taskServices.login(req.body, req.user);
    return res.status(e.success).json();
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createUser,
  login,
};