// https://graphql-nexus.github.io/nexus-prisma
import { all_auth_recipe_users, Post } from "nexus-prisma";
import { objectType } from "nexus";

export const allAuthRecipeUsers = objectType({
  name: all_auth_recipe_users.$name,
  description: all_auth_recipe_users.$description,
  definition(t) {
    t.field(all_auth_recipe_users.user_id);
    t.field(all_auth_recipe_users.recipe_id);
    t.field(all_auth_recipe_users.Post);
  },
});
export const PostType = objectType({
  name: Post.$name,
  description: Post.$description,
  definition(t) {
    t.field(Post.id);
  },
});
