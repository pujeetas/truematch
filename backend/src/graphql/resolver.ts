import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import {comparePassword, generateToken, hashPassword } from "../utils/auth.js";

const pool = new pg.Pool({ 
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export const resolvers = {
  Query: {
    users: async () => {
      return await prisma.user.findMany();
    },
    user: async (parent: any, args : {id : string}) => {
      return await prisma.user.findUnique({ where: {id: args.id}})
    },
    jobs: async () => {
      return await prisma.job.findMany();
    },
    job: async(parent: any, args: {id: string}) => {
      return await prisma.job.findUnique({where: {id: args.id}})
    },
    applications: async() => {
      return await prisma.application.findMany();
    }
  },
  Mutation: {
    signup: async(_: any, args: {email: string, password: string, fullName: string}) => {
      const hashedPassword = await hashPassword(args.password);

      const user = await prisma.user.create({
        data: {
          email: args.email,
          password: hashedPassword,
          fullName: args.fullName,
        }
      })

      const token = generateToken(user.id)
      return {token,user}
    },

    login: async(_:any, args: {email: string, password: string}) => {
      const user = await prisma.user.findUnique({where: {email: args.email}});

      if(!user){
        throw new Error("User not found")
      }

      const valid = await comparePassword(args.password, user.password);

      if(!valid){
        throw new Error("Invalid credentials");
      }

      const token = generateToken(user.id)

      return { token, user}

  }
}}