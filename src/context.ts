import { ExpressContext } from "apollo-server-express";
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import prisma from "./libs/prisma/client";
import { getSession, SessionContainer } from "supertokens-node/recipe/session";

export type Context = {
  req: Request;
  res: Response;
  session: SessionContainer | null;
  prisma: PrismaClient;
};

export async function context({ req, res }: ExpressContext): Promise<Context> {
  let session: SessionContainer | null = null;
  try {
    session = await getSession(req, res);
  } catch (e) {
    console.log(e);
  }
  return {
    req,
    res,
    session,
    prisma,
  };
}
