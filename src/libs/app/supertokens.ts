import supertokens from "supertokens-node";
import jwt from "supertokens-node/recipe/jwt";
import Session from "supertokens-node/recipe/session";
import EmailPassword from "supertokens-node/recipe/emailpassword";
import UserRoles from "supertokens-node/recipe/userroles";
import Dashboard from "supertokens-node/recipe/dashboard";

supertokens.init({
  framework: "express",
  supertokens: {
    connectionURI: process.env.AUTH_DOMAIN,
    apiKey: process.env.API_SECRET,
  },
  appInfo: {
    appName: "auth",
    apiDomain: process.env.API_DOMAIN,
    websiteDomain: process.env.WEB_DOMAIN,
    apiBasePath: "/auth",
    websiteBasePath: "/auth",
  },
  recipeList: [
    jwt.init(),
    EmailPassword.init({
      override: {
        functions: (originalImplementation) => {
          return {
            ...originalImplementation,

            // here we are only overriding the function that's responsible
            // for signing in a user.
            signIn: async function (input) {
              console.log("supertokens: signin");
              console.log(input);
              console.log(input.userContext._default);
              return await originalImplementation.signIn(input);
            },
            signUp: async function (input) {
              console.log("supertokens: signup");
              // TODO: some custom logic

              // or call the default behaviour as show below
              return await originalImplementation.signUp(input);
            },
            // ...
            // TODO: override more functions
          };
        },
      },
    }),
    UserRoles.init(),
    Session.init({
      jwt: {
        enable: true,
        // issuer: "",
      },
      // cookieSameSite: "none",
    }), // initializes session features
    Dashboard.init({
      apiKey: "hello",
    }),
  ],
});
