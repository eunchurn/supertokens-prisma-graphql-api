// https://graphql-nexus.github.io/nexus-prisma
import { User, Post } from "nexus-prisma";
import { objectType } from "nexus";

export const UserType = objectType({
  name: User.$name,
  description: User.$description,
  definition(t) {
    t.field(User.id);
    t.field(User.email);
    t.field(User.post);
    t.field(User.authId);
  },
});
export const PostType = objectType({
  name: Post.$name,
  description: Post.$description,
  definition(t) {
    t.field(Post.id);
  },
});
