import { GraphQLServer } from 'graphql-yoga';
import { Query, Mutation, Post, User, Picture, AnimalInterface } from './graphql/resolvers/index';

const server = new GraphQLServer({
  typeDefs: './src/graphql/schema.graphql',


  resolvers: {
    Query,
    Mutation,
    Post,
    User,
    Picture,
    AnimalInterface
  }
});

server.start(() => {
  console.log('And running');
})


