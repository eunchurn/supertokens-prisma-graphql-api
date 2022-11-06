import { ApolloServer } from "apollo-server-express";
import { getApp } from "./libs";
import { schema } from "./schema";
import { context } from "./context";

const port = process.env.PORT || "8000";

const server = new ApolloServer({
  schema,
  context,
  introspection: process.env.NODE_ENV !== "production",
  // csrfPrevention: true,
  // cache: "bounded",
});

export async function runServer() {
  await server.start();
  const app = await getApp();
  server.applyMiddleware({ app, path: "/", cors: false });
  await new Promise<void>((resolve) => app.listen(Number(port), resolve));
  console.info(
    `🚀 GraphQL service ready at http://localhost:${port}${server.graphqlPath}`,
  );
}
