import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import {comparePassword, generateToken, hashPassword, verifyToken } from "../utils/auth.js";
import { calculateTruthFlags } from "../utils/truthFlags.js";
import { calculateMatchScore } from "../utils/matchScore.js";

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
    },

    me: async (_:any, context : {userId : string}) => {
      if(!context.userId){
        throw new Error("Not Authenticated");
      }
      return await prisma.user.findUnique({where: {id: context.userId}})
    },
     myApplications: async(_:any, __:any, context : {userId? : string}) => {
    if(!context.userId){
      throw new Error("Not Authenticated");
    }

    return await prisma.application.findMany({ where: {userId: context.userId}})
  }
  },
  Mutation: {
    updateSkills: async (_: any, args: {skills: string[]}, context: {userId?: string}) => {
  if (!context.userId) throw new Error("Not authenticated");
  
  return await prisma.user.update({
    where: { id: context.userId },
    data: { skills: args.skills }
  });
},
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

  },

  createJob: async(_:any, args: {title: string, company: string, description: string, requiredSkills: string[], experienceYears: number, location: string, salary: string}, context: {userId?: string}) => {
    if(!context.userId){
      throw new Error("Not Authenticated")
    }

    const truthFlags = calculateTruthFlags(args.title, args.experienceYears, args.requiredSkills);

    const job = await prisma.job.create({
      data: {
        title: args.title,
        company: args.company,
        description: args.description,
        requiredSkills: args.requiredSkills,
        experienceYears: args.experienceYears,
        location: args.location,
        salary: args.salary,
        truthFlags,
      }
    })
    return job;
  },

  applyToJob: async(_:any, args: {jobId : string}, context: {userId?: string})=> {
    if(!context.userId){
      throw new Error("Not Authenticated")
    }

    const jobExists = await prisma.job.findUnique({where : {id: args.jobId}});
    if(!jobExists){
      throw new Error("Job does not exists")
    }

    const user = await prisma.user.findUnique({where: {id: context.userId}})

    const matchScore = calculateMatchScore(user?.skills || [], jobExists.requiredSkills)

    const createApplication = await prisma.application.create({
      data: {
        jobId: args.jobId,
        matchScore,
        status: "applied",
        userId: context.userId
      }
    })
    return createApplication
  }
},
Application : {
    job: async (parent:any) => {
      return await prisma.job.findUnique({where : {id: parent.jobId}})
    }, user: async(parent:any) => {
      return await prisma.user.findUnique({ where : {id: parent.userId}})
    }
  },
}