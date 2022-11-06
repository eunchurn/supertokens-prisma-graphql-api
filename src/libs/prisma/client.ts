import { PrismaClient } from "@prisma/client";
import { cleanup } from "./cleanup";

export const prisma = new PrismaClient();
cleanup({ prisma });

export default prisma;
