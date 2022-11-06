import { queryField } from "nexus";
import { all_auth_recipe_users } from "nexus-prisma";

export const ping = queryField("ping", {
  type: "String",
  resolve(_root, _args, { session }) {
    console.log({ session });
    return "pong";
  },
});

export const getMe = queryField("getMe", {
  type: all_auth_recipe_users.$name,
  resolve(_root, _args, { session, prisma }) {
    if (!session) return null;
    const userId = session.getUserId();
    const user = prisma.all_auth_recipe_users.findUnique({
      where: { user_id: userId },
    });
    return user;
  },
});
