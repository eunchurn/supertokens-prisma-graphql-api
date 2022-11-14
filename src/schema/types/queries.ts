import { queryField } from "nexus";
import { User } from "nexus-prisma";

export const ping = queryField("ping", {
  type: "String",
  resolve(_root, _args, { session }) {
    console.log({ userId: session?.getUserId() });
    return "pong";
  },
});

export const getMe = queryField("getMe", {
  type: User.$name,
  resolve(_root, _args, { session, prisma }) {
    if (!session) return null;
    const userId = session.getUserId();
    console.log({ userId });
    const user = prisma.user.findUnique({
      where: { authId: userId },
    });
    user.then(console.log);
    return user;
  },
});
