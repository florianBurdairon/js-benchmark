import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const Prisma = require("./generated/client/index.js");

export { prisma };
const prisma = new Prisma.PrismaClient();

export default prisma;
