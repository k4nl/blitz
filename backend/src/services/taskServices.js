const taskModels = require('../models/taskModels');
const CustomError = require('../middlewares/CustomError');
const e = require('../utils/dictionary/status');
const verify = require('../utils/functions');
const schema = require('../schemas/taskSchema');

const createTask = async (task, user) => {
  const { error } = schema.taskSchema.validate(task);
  const msg = error && error.details[0].message;
  verify.verifySchema(error, msg);

  const name = await taskModels.getTaskByName(task);
  verify.verifyName(name);

  await taskModels.createTask(task, { id: user.id, email: user.email });
  return task;
}

const getAllTasks = async (user) => {
  if (user.email === 'admin@blitz.com') {
    return taskModels.getAllTasks();
  }
  const tasks = await taskModels.getAllTasksByUser(user.id);
  return tasks;
};

const updateTask = async (task, user, id) => {
  const { error } = schema.editSchema.validate(task);
  const msg = error && error.details[0].message;
  verify.verifySchema(error, msg);

  const taskFound = await taskModels.getTaskById(id);

  verify.verifyIfTaskExist(taskFound);
  verify.verifyTaskOwner(taskFound.user.id, user.id, user.email);

  const updated = await taskModels.updateTask(id, task.status);
  const response = { 
    _id: id,
    task: { ...taskFound.task, status: task },
    user: { ...taskFound.user },
  };

  return response;
}

const deleteTask = async (user, id) => {
  const taskFound = await taskModels.getTaskById(id);
  verify.verifyIfTaskExist(taskFound);
  verify.verifyTaskOwner(taskFound.user.id, user.id, user.email);

  await taskModels.deleteTask(id);
}

module.exports = {
  createTask,
  getAllTasks,
  updateTask,
  deleteTask,
}