import express from "express";
import cors from "cors";
import "./supertokens";
import { middleware as supertokensMiddleware } from "supertokens-node/framework/express";
import SuperTokens from "supertokens-node";

export async function getApp() {
  const app = express();
  app.use(express.json());
  app.disable("x-powered-by");
  app.use(
    cors({
      origin: [
        "https://studio.apollographql.com",
        /mystack\.io$/,
        /localhost/,
        "http://localhost:3001",
      ],
      allowedHeaders: [
        "content-type",
        "apollographql-client-version",
        "apollographql-client-name",
        "apollo-require-preflight",
        ...SuperTokens.getAllCORSHeaders(),
      ],
      credentials: true,
      exposedHeaders: "Content-Range",
    }),
  );
  app.use(supertokensMiddleware());
  return app;
}
