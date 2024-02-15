// src/server.js

const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { readFileSync } = require("fs");
const { join } = require("path");
const userResolvers = require("./resolvers/userResolvers");

// Read schema file
const schemaFile = join(__dirname, "models", "userSchema.graphql");
const typeDefs = readFileSync(schemaFile, "utf8");

// Create executable schema
const schema = makeExecutableSchema({ typeDefs, resolvers: userResolvers });

// Create express server
const app = express();

// GraphQL endpoint
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
