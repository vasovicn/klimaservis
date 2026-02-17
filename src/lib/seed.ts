import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import bcryptjs from "bcryptjs";

const adapter = new PrismaLibSql({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const adminPassword = await bcryptjs.hash("admin123", 10);
  const serviserPassword = await bcryptjs.hash("serviser123", 10);

  await prisma.user.upsert({
    where: { email: "admin@klimaservisice.rs" },
    update: {},
    create: {
      email: "admin@klimaservisice.rs",
      password: adminPassword,
      firstName: "Admin",
      lastName: "Klima",
      phone: "+381640785469",
      role: "admin",
      sequence: 0,
    },
  });

  await prisma.user.upsert({
    where: { email: "marko@klimaservisice.rs" },
    update: {},
    create: {
      email: "marko@klimaservisice.rs",
      password: serviserPassword,
      firstName: "Marko",
      lastName: "Marković",
      phone: "+381641234567",
      role: "serviser",
      sequence: 1,
    },
  });

  await prisma.user.upsert({
    where: { email: "nikola@klimaservisice.rs" },
    update: {},
    create: {
      email: "nikola@klimaservisice.rs",
      password: serviserPassword,
      firstName: "Nikola",
      lastName: "Nikolić",
      phone: "+381647654321",
      role: "serviser",
      sequence: 2,
    },
  });

  console.log("Seed complete!");
  console.log("Admin: admin@klimaservisice.rs / admin123");
  console.log("Serviser 1: marko@klimaservisice.rs / serviser123");
  console.log("Serviser 2: nikola@klimaservisice.rs / serviser123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
