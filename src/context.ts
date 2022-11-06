import { ExpressContext } from "apollo-server-express";
import { Request, Response } from "express";
import { getSession, SessionContainer } from "supertokens-node/recipe/session";

export type Context = {
  req: Request;
  res: Response;
  session: SessionContainer;
};

export async function context({ req, res }: ExpressContext): Promise<Context> {
  const session = await getSession(req, res);
  console.log(session);
  return {
    req,
    res,
    session,
  };
}
