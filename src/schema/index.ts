import "../moduleAliases";
import { makeSchema } from "nexus";
import * as types from "./types";
import path from "path";

export const schema = makeSchema({
  types,
  contextType: {
    module: require.resolve("../context"),
    export: "Context",
  },
  outputs: {
    typegen: path.resolve(__dirname, "../generated/resolverTypes.ts"),
    schema: path.resolve(__dirname, "../generated/schema.graphql"),
  },
});
