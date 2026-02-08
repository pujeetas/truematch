export const typeDefs = `

    type User {
        id: ID!
        fullName : String!
        email: String!
        password: String!
        resumeURL: String
        skills: [String!]!
        createdAt: String!
        applications: [Application!]!
    }

    type Job {
        id: ID!
        title: String!
        company: String!
        postedAt: String!
        description: String!
        requiredSkills: [String!]!
        experienceYears: Int!
        location: String!
        salary: String!
        truthFlags: [String!]!
        applications: [Application!]!
    }

    type Application {
        id: ID!
        appliedAt: String!
        userId: String!
        jobId: String!
        matchScore: Int!
        status: String!
        job: Job!
        user: User!
    }

    type Query {
        user(id: ID!): User
        users: [User!]!
        job(id:ID!): Job
        jobs: [Job!]!
        applications: [Application!]!
         me : User
        myApplications: [Application!]!

    }

    type AuthPayload{
        token: String!
        user: User!
    }

    type Mutation{
        signup(email: String!, password: String!, fullName: String!): AuthPayload!
        login(email: String!, password: String!) : AuthPayload!
        createJob(title: String!, company: String!, description: String!, requiredSkills: [String!]!, experienceYears: Int!, location: String!, salary: String!): Job!
        updateSkills(skills: [String!]!): User!
        applyToJob(jobId: ID!) : Application!
    }
`;