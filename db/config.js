const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const conn = async () => {
  try {
    prisma.$connect();
    console.log("connected to db");
  } catch (error) {
    console.error(error);
    console.log("something went wrong");
  }
};
module.exports = { prisma, conn };
