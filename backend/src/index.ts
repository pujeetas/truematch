import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './graphql/schema.js';
import { resolvers } from './graphql/resolver.js';
import { verifyToken } from './utils/auth.js';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  context: async ({ req }) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
      try {
        const decoded = verifyToken(token);
        return { userId: decoded.userId };
      } catch (e) {
        return {};
      }
    }
    return {};
  },
  listen: { port: 4000 },
});

console.log(`Server ready at ${url}`);