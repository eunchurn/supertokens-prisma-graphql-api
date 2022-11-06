import { PrismaClient } from ".prisma/client";

interface ProcessOptions {
  cleanup?: boolean;
  exit?: boolean;
  client: Client;
}

interface Client {
  prisma: PrismaClient;
}

/**
 * It's a function that takes in two arguments, the first being an object with a property called
 * cleanup, and the second being a number. It returns a promise that resolves to nothing
 * @param {ProcessOptions} options - ProcessOptions
 * @param exitCode - The exit code, if you are exiting explicitly.
 */
async function exitHandler(
  options: ProcessOptions,
  exitCode: NodeJS.ExitListener,
): Promise<void> {
  if (options.cleanup) console.log("😎 clean exit");
  if (exitCode || exitCode === 0) {
    console.log(`🔧 exit code: ${exitCode}`);
    await options.client.prisma.$disconnect();
    process.exit();
  }
  if (options.exit) {
    console.log(`😵 exit without exitCode`);
    await options.client.prisma.$disconnect();
    process.exit();
  }
}

/**
 * It's a function that runs when the app is closing, and it's used to close the database connection
 */
export async function cleanup(client: Client): Promise<void> {
  // prisma: PrismaClient
  // app is closing
  process.on("exit", exitHandler.bind(null, { cleanup: true, client }));

  // atches ctrl+c event
  process.on("SIGINT", exitHandler.bind(null, { exit: true, client }));
  process.on("SIGTERM", exitHandler.bind(null, { cleanup: true, client }));
  // catches "kill pid" (for example: nodemon restart)
  process.on("SIGUSR1", exitHandler.bind(null, { exit: true, client }));
  process.on("SIGUSR2", exitHandler.bind(null, { exit: true, client }));

  // catches uncaught exceptions
  process.on(
    "uncaughtException",
    exitHandler.bind(null, { exit: true, client }),
  );
}
