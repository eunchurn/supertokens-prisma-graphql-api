import supertokens from "supertokens-node";
import jwt from "supertokens-node/recipe/jwt";
import Session from "supertokens-node/recipe/session";
import ThirdPartyEmailPassword, {
  Google,
  Apple,
} from "supertokens-node/recipe/thirdpartyemailpassword";
import UserRoles from "supertokens-node/recipe/userroles";
import Dashboard from "supertokens-node/recipe/dashboard";
import { prisma } from "../prisma";
import { AccessType } from "@prisma/client";

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
    ThirdPartyEmailPassword.init({
      providers: [
        Google({
          clientId:
            "1060725074195-kmeum4crr01uirfl2op9kd5acmi9jutn.apps.googleusercontent.com",
          clientSecret: "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",
        }),
        Apple({
          clientId: "4398792-io.supertokens.example.service",
          clientSecret: {
            keyId: "7M48Y4RYDL",
            privateKey:
              "-----BEGIN PRIVATE KEY-----\nMIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQgu8gXs+XYkqXD6Ala9Sf/iJXzhbwcoG5dMh1OonpdJUmgCgYIKoZIzj0DAQehRANCAASfrvlFbFCYqn3I2zeknYXLwtH30JuOKestDbSfZYxZNMqhF/OzdZFTV0zc5u5s3eN+oCWbnvl0hM+9IW0UlkdA\n-----END PRIVATE KEY-----",
            teamId: "YWQCXGJRJL",
          },
        }),
      ],
      override: {
        functions: (originalImplementation) => {
          return {
            ...originalImplementation,
            async emailPasswordSignIn(input) {
              const signinUser =
                await originalImplementation.emailPasswordSignIn(input);
              const { status } = signinUser;
              if (status === "OK") {
                const {
                  user: { email, id },
                } = signinUser;
                await prisma.accessLog.create({
                  data: {
                    user: { connect: { authId: id } },
                    email,
                    accessType: AccessType.SIGNIN,
                  },
                });
              }
              return signinUser;
            },
            async emailPasswordSignUp(input) {
              const signupUser =
                await originalImplementation.emailPasswordSignUp(input);
              const { status } = signupUser;
              if (status === "OK") {
                const {
                  user: { email, id },
                } = signupUser;
                await prisma.user.create({ data: { email, authId: id } });
                await prisma.accessLog.create({
                  data: {
                    user: { connect: { authId: id } },
                    email,
                    accessType: AccessType.SIGNUP,
                  },
                });
              }

              return signupUser;
            },
            thirdPartySignInUp: async function (input) {
              // TODO: some custom logic
              console.log(input);
              // or call the default behaviour as show below
              const authUsers = await originalImplementation.thirdPartySignInUp(
                input,
              );
              console.log({ authUsers });
              return authUsers;
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
