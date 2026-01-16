require("dotenv").config();
const { PrismaClient } = require("@prisma/client");

const p = new PrismaClient();

p.lesson
  .findUnique({ where: { id: "cmk4g7e100015owd9q5gbs" } })
  .then((r) => {
    console.log("FOUND?", !!r);
    console.log(r);
  })
  .catch((e) => console.error(e))
  .finally(() => p.$disconnect());