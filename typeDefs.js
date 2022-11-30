const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Task {
    id: ID
    title: String
    terminate: Boolean
  }

  type User {
    id: ID
    username: String
    address: String
    city: String
    country: String
    phone: String
    email: String
    photo: String
    token: String
  }

  enum SortOrder {
    ASC
    DESC
  }

  input Sort {
    field: String!
    sort: SortOrder = ASC
  }

  type Query {
    getAllTasks(sorts: [Sort]): [Task]
    getTask(id: ID): Task
    getUser(id: ID): User
  }

  input TaskInput {
    title: String
    terminate: Boolean
  }

  input UserInput {
    username: String
    password: String
    address: String
    city: String
    country: String
    phone: String
    email: String
    photo: String
    token: String
  }

  type Mutation {
    createTask(task: TaskInput!): Task
    deleteTask(id: ID!): Task
    updateTask(id: ID!, task: TaskInput): Task
    createUser(user: UserInput): User
    updateUser(id: ID!, user: UserInput!): User
    login(username: String, password: String): User
  }
`;

module.exports = { typeDefs };
