import express from "express"
import { ApolloServer } from "@apollo/server"
import {expressMiddleware} from "@as-integrations/express5"
import { typeDefs } from "./graphql/schema.js";
import { resolvers } from "./graphql/resolver.js";
import cors from "cors"
import bodyParser from "body-parser";

const app = express();

const server = new ApolloServer({
    typeDefs,
    resolvers
})

await server.start();

app.use(cors());
app.use(bodyParser.json())

app.use("/graphql", expressMiddleware(server));

app.listen(4000, () => {
    console.log("Server running at 4000")
})

