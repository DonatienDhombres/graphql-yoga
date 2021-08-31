import { GraphQLServer } from 'graphql-yoga';
import { Query, Post, User, Picture } from './graphql/resolvers/index';

const server = new GraphQLServer({
  typeDefs: './src/graphql/schema.graphql',


  resolvers: {
    Query,
    Post,
    User,
    Picture
    // Post: {
    //   author: async (parent, args, context, info) => {
    //     const response = await axios.get(`${db}/users/${parent.author}`);
    //     return response.data;
    //   },
    //   picture: async (parent, args, context, info) => {
    //     const response = await axios.get(`${db}/pictures/${parent.picture}`);
    //     return response.data;
    //   }
    // },
  }
});

server.start(() => {
  console.log('And running');
})


