// resolvers

import axios from 'axios';
const db = 'http://localhost:3004';

const Query = {
  agent: async (parent, args, context, info) => {
    const response = await axios.get(`${db}/users/${args.id}`);
    return response.data
  },
  agents: async (parent, args, context, info) => {
    const name = args.name != null ? `name=${args.name}` : '';
    const age = args.age != null ? `age=${args.age}` : '';


    const response = await axios.get(`${db}/users?${name}&${age}`);
    return response.data;
  },
  posts: async (parent, args, context, info) => {
    const response = await axios.get(`${db}/posts`);
    return response.data;
  },
  post: async (parent, args, context, info) => {
    const response = await axios.get(`${db}/posts/${args.id}`);
    return response.data;
  },
  pictures: async (parent, args, context, info) => {
    const response = await axios.get(`${db}/pictures`);
    return response.data;
  },
  animal: async (parent, args, context, info) => {
    let response = {};
    let random = Math.floor(Math.random() * 6) + 1;
    if (random > 3) {
      response = {
        animal: 'DOG',
        name: 'Lassy',
        hair: 'lots'
      }
    } else {
      response = {
        animal: 'CAT',
        name: 'Fluffy',
        paws: 'sharp'
      }
    }
    return response;
  }
}

const Mutation = {
  createAgent: async (parent, args, context, info) => {
    const { name, age, married, average, status } = args.data;
    const response = await axios.post(`${db}/users`, {
      name: name,
      age: age,
      married: married,
      average: 0,
      status: status
    });
    return response.data;
  },
  updateAgent: async (parent, args, context, info) => {
    const { id } = args;
    const { name, age, married, average, status } = args.data;
    const data = {};

    if (name !== undefined) { data.name = name };
    if (age !== undefined) { data.age = age };
    if (married !== undefined) { data.married = married };
    if (average !== undefined) { data.average = average };
    if (status !== undefined) { data.status = status };
    const response = await axios.patch(`${db}/users/${id}`, data);
    return response.data;
  },
  createPost: async (parent, args, context, info) => {
    // get token = user id
    // got to store picture === get id of the picture


    const response = await axios.post(`${db}/posts`, {
      title: args.title,
      content: args.content,
      author: 1,
      picture: 1,
      status: "DRAFT"
    });
    return response.data;
  },
  deletePost: async (parent, args, context, info) => {
    // get token = user id

    const response = await axios.delete(`${db}/posts/${args.id}`);
    if (Object.keys(response.data).length === 0) {
      return true;
    }
    return false;
  },
  deleteAgent: async (parent, args, context, info) => {
    const response = await axios.delete(`${db}/users/${args.id}`);

    // find all posts - delete them
    // find all pictures - delete them
    if (Object.keys(response.data).length === 0) {
      return true;
    }
    return false;
  }
}

const Post = {
  author: async (parent, args, context, info) => {
    try {
      const response = await axios.get(`${db}/users/${parent.author}`);
      return response.data;
    } catch (error) {
      return null;
    }
  },
  picture: async (parent, args, context, info) => {
    const response = await axios.get(`${db}/pictures/${parent.picture}`);
    return response.data;
  }
}

const User = {
  posts: async (parent, args, context, info) => {
    const response = await axios.get(`${db}/posts?author=${parent.id}`);
    return response.data;
  },
  pictures: async (parent, args, context, info) => {
    const response = await axios.get(`${db}/pictures?author=${parent.id}`);
    return response.data;
  }
}

const Picture = {
  author: async (parent, args, context, info) => {
    const response = await axios.get(`${db}/users/${parent.author}`);
    return response.data;
  },
  post: async (parent, args, context, info) => {
    const response = await axios.get(`${db}/posts/${parent.post}`);
    return response.data;
  }
}

const AnimalInterface = {
  __resolveType(obj, context, info) {
    if (obj.animal == 'DOG') {
      return 'Dog';
    }
    if (obj.animal == 'CAT') {
      return 'Cat';
    }
    return null
  }
}

export {
  Query,
  Mutation,
  Post,
  User,
  Picture,
  AnimalInterface
}
