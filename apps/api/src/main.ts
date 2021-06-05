import { ApolloServer } from 'apollo-server-express';
import * as express from 'express';

import { db } from './db';
import { schema } from './schema';

const PORT = 3333;

const apollo = new ApolloServer({
  schema,
  context: ({ req }) => {
    return {
      db,
      currentUserId: req?.headers?.authorization,
    };
  },
});

const app = express();

app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json({ type: 'application/json', limit: '50mb' }));

apollo.applyMiddleware({
  app,
  cors: {
    origin: 'http://localhost:4200',
    credentials: true,
  },
});

app.listen(PORT, () => {
  console.log(`🚀 GraphQL service ready at http://localhost:${PORT}/graphql`);
});
