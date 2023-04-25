import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import path from 'path';
import { authMiddleware } from './utils/authMiddleware';
import { clientMiddleware } from './utils/clientMiddleware';
import typeDefs from './schemas/typeDefs';
// import resolvers from './schemas/resolvers';
import db from './config/connection';
import { Request, Response } from 'express';

const __dirname = path.resolve();
const PORT = process.env.PORT || 3001;
const app = express();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware, clientMiddleware,
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'build')))
};

app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
});

const startApolloServer = async (): Promise<void> => {
    await server.start();
    server.applyMiddleware({ app });

    await db();

    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}`);
        console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
};

startApolloServer();