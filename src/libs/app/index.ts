import express from "express";
import cors from "cors";
import "./supertokens";
import { middleware as supertokensMiddleware } from "supertokens-node/framework/express";
import { verifySession } from "supertokens-node/recipe/session/framework/express";
// import { getAllCORSHeaders } from "supertokens-node";

export async function getApp() {
  const app = express();
  app.use(express.json());
  app.disable("x-powered-by");
  app.use(
    cors({
      origin: ["https://studio.apollographql.com", /localhost/],
      // allowedHeaders: ["content-type", ...getAllCORSHeaders()],
      credentials: true,
    }),
  );
  app.use(supertokensMiddleware());
  app.use("/", verifySession({ sessionRequired: false }));
  return app;
}
