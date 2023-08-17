const { graphql, buildSchema } = require("graphql");
const express = require('express');
const { graphqlHTTP } = require("express-graphql");
let usersData = [
  {
    "id": 1,
    "name": "Sadrul",
    "email": "hossainsadrul@gmail.com"
  },
  {
    "id": 2,
    "name": "Shakil",
    "email": "hossainshakil@gmail.com"
  }
];

const app = express();

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Person {
    id: Int,
    name: String,
    email: String,
  }
  type Query {
    user(id: ID!): Person!,
  }
  input userInput {
    name: String, 
    email: String
  }
  type Mutation {
    addUser(input: userInput): Person!,
    updateUser(id: ID!, input: userInput): Person!,
  }
`);

// The rootValue provides a resolver function for each API endpoint
const root = {
  user: ({ id }) => {
    return usersData.find(user => user.id == id);
  },
  addUser: ({ input }) => {
    return usersData[usersData.length] = { "id": usersData.length, "name": input.name, "email": input.email };
  },
  updateUser: ({ id, input }) => {
    return usersData[id - 1] = { "id": id, "name": input.name, "email": input.email };
  },

};

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,
  rootValue: root,
}));

app.listen(3001);

// Run the GraphQL query '{ hello }' and print out the response
console.log('Server is running on http://location:3001');