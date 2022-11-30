const { ApolloError } = require("apollo-server-express");
const bcrypt = require("bcryptjs");
const Task = require("./models/Task");
const User = require("./models/User");

const resolvers = {
  Query: {
    getAllTasks: async (_, { sorts }) => {
      let sort = -1;
      if (sorts[0]?.sort === "ASC") {
        sort = 1;
      }
      const tasks = await Task.find().sort({ title: sort });
      return tasks;
    },
    async getTask(_, args) {
      const task = await Task.findById(args.id);
      return task;
    },
    async getUser(_, args) {
      const user = await User.findById(args.id);
      return user;
    },
  },
  Mutation: {
    createTask: async (_, args) => {
      const { title, terminate } = args.task;
      const newTask = new Task({ title, terminate });
      await newTask.save();
      return newTask;
    },
    deleteTask: async (_, { id }) => {
      const deletedTask = await Task.findByIdAndDelete(id);
      return deletedTask;
    },
    updateTask: async (_, { task, id }) => {
      const taskUpdated = await Task.findByIdAndUpdate(
        id,
        {
          $set: task,
        },
        { new: true }
      );
      return taskUpdated;
    },
    createUser: async (_, args) => {
      const newUser = new User(args.user);
      const encryptedPassword = await bcrypt.hash(args.user.password, 10);
      newUser.password = encryptedPassword;
      await newUser.save();
      return newUser;
    },
    updateUser: async (_, { user, id }) => {
      const userUpdated = await User.findByIdAndUpdate(
        id,
        {
          $set: user,
        },
        { new: true }
      );
      return userUpdated;
    },
    login: async (_, { username, password }) => {
      try {
        const user = await User.findOne({ username });
        if (!user) {
          throw new Error("Username no valido");
        }
        const isMatch = bcrypt.compare(password, user.password);
        if (!isMatch) {
          throw new Error("Invalid password");
        }
        return user;
      } catch (error) {
        throw new ApolloError(error.message, 403);
      }
    },
  },
};

module.exports = { resolvers };
