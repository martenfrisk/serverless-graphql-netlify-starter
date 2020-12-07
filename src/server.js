const ApolloServer = require('apollo-server').ApolloServer
const depthLimit = require('graphql-depth-limit')
const resolvers = require('./resolvers')
const typeDefs = require('./resources')
const errorFormatter = require('./errors/ErrorFormatter')
const ApolloServerLambda = require('apollo-server-lambda').ApolloServer


const apiKey = process.env.API_KEY || '1';

const validationRules = [
	depthLimit(3),
];

function createLambdaServer () {
  return new ApolloServerLambda({
    typeDefs,
    resolvers,
    context: {
        baseUrl: `https://www.thesportsdb.com/api/v1/json/${apiKey}/`,
    },
    formatError: errorFormatter,
    validationRules,
    introspection: true,
    playground: true,
  });
}

function createLocalServer () {
  return new ApolloServer({
    typeDefs,
    resolvers,
    context: {
        baseUrl: `https://www.thesportsdb.com/api/v1/json/${apiKey}/`,
    },
    formatError: errorFormatter,
    validationRules,
    introspection: true,
    playground: true,
  });
}

module.exports = { createLambdaServer, createLocalServer }