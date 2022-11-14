import { ApolloServer } from "@apollo/server";
import http from "http";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { ApolloServerPluginLandingPageProductionDefault } from "@apollo/server/plugin/landingPage/default";
import { getApp } from "./libs";
import { schema } from "./schema";
import { context, Context } from "./context";

const port = process.env.PORT || "8000";

function getPlugins(httpServer: http.Server) {
  const plugins = [ApolloServerPluginDrainHttpServer({ httpServer })];
  plugins.push(
    ApolloServerPluginLandingPageProductionDefault({
      graphRef: process.env.APOLLO_GRAPH_REF,
      footer: false,
      embed: true,
    }),
  );
  return plugins;
}

export async function runServer() {
  const app = await getApp();
  const httpServer = http.createServer(app);
  const plugins = getPlugins(httpServer);
  const server = new ApolloServer<Context>({
    schema,
    introspection: process.env.NODE_ENV !== "production",
    plugins,
    csrfPrevention: true,
  });
  await server.start();
  app.use("/", expressMiddleware(server, { context }));
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: Number(port) }, resolve),
  );
  console.info(`🚀 GraphQL service ready at http://localhost:${port}`);
}
