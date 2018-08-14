import { Types } from "mongoose";
import jwt from "jsonwebtoken";
import Todo from "../../models/todo";
import User from "../../models/user";
import logger from "../../utils/logger";

const userOneId = new Types.ObjectID();
const userTwoId = new Types.ObjectID();

const users = [
  {
    _id: userOneId,
    email: "andrew@example.com",
    password: "userOnePass",
    tokens: [
      {
        access: "auth",
        token: jwt.sign({ _id: userOneId, access: "auth" }, process.env.JWT_SECRET).toString(),
      },
    ],
  },
  {
    _id: userTwoId,
    email: "jen@example.com",
    password: "userTwoPass",
    tokens: [
      {
        access: "auth",
        token: jwt.sign({ _id: userTwoId, access: "auth" }, process.env.JWT_SECRET).toString(),
      },
    ],
  },
];

const todos = [
  {
    _id: new Types.ObjectID(),
    text: "First test todo",
    _creator: userOneId,
  },
  {
    _id: new Types.ObjectID(),
    text: "Second test todo",
    completed: true,
    completedAt: 333,
    _creator: userTwoId,
  },
];

const populateTodos = done =>
  Todo.remove({})
    .then(() => Todo.insertMany(todos))
    .then(() => done())
    .catch(err => logger.error("Error populating todos.", err));

const populateUsers = done =>
  User.remove({})
    .then(() => {
      const userOne = new User(users[0]).save();
      const userTwo = new User(users[1]).save();
      return Promise.all([userOne, userTwo]);
    })
    .then(() => done())
    .catch(err => logger.error("Error populating users.", err));

module.exports = { todos, populateTodos, users, populateUsers };