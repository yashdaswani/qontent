// src/resolvers/userResolvers.js

const { v4: uuidv4 } = require("uuid");

let users = [];

const resolvers = {
  Query: {
    users: () => users,
  },
  Mutation: {
    createUser: (_, { name, age, email }) => {
      const newUser = { id: uuidv4(), name, age, email };
      users.push(newUser);
      return newUser;
    },
    deleteUser: (_, { id }) => {
      const index = users.findIndex((user) => user.id === id);
      if (index !== -1) {
        users.splice(index, 1);
        return "User deleted successfully";
      }
      throw new Error("User not found");
    },
  },
};

module.exports = resolvers;
