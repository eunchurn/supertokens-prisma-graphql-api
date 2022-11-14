import { ExpressContextFunctionArgument } from "@apollo/server/express4";
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import prisma from "./libs/prisma/client";
import { getSession, SessionContainer } from "supertokens-node/recipe/session";

const getSessionContext = async ({
  req,
  res,
}: ExpressContextFunctionArgument) => {
  const session = await getSession(req, res).catch(() => null);
  if (!session) return { session, userId: null };
  const userId = session.getUserId();
  return { session, userId };
};

export type Context = {
  req: Request;
  res: Response;
  session: SessionContainer | null;
  userId: string | null;
  prisma: PrismaClient;
};

export async function context({
  req,
  res,
}: ExpressContextFunctionArgument): Promise<Context> {
  const { session, userId } = await getSessionContext({ req, res });
  return {
    req,
    res,
    session,
    userId,
    prisma,
  };
}
