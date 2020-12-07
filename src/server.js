import { ApolloServer } from 'apollo-server'
import depthLimit from 'graphql-depth-limit'
import resolvers from './resolvers'
import typeDefs from './resources'
import errorFormatter from './errors/ErrorFormatter'
import { ApolloServer as ApolloServerLambda } from 'apollo-server-lambda'


const apiKey = process.env.API_KEY || '1';

const validationRules = [
	depthLimit(3),
];

export function createLambdaServer () {
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

export function createLocalServer () {
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
