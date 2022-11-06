// https://graphql-nexus.github.io/nexus-prisma
import { all_auth_recipe_users, Post } from "nexus-prisma";
import { makeSchema, objectType } from "nexus";

export const schema = makeSchema({
  types: [
    objectType({
      name: all_auth_recipe_users.$name,
      description: all_auth_recipe_users.$description,
      definition(t) {
        t.field(all_auth_recipe_users.user_id);
      },
    }),
    objectType({
      name: Post.$name,
      description: Post.$description,
      definition(t) {
        t.field(Post.id);
      },
    }),
  ],
  contextType: {
    module: require.resolve("./context"),
    export: "Context",
  },
});
