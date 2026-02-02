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
        experienceYear: Int!
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
    }

    type Query {
        user(id: ID!): User
        users: [User!]!
        job(id:ID!): Job
        jobs: [Job!]!
        applications: [Application!]!
    }

    type AuthPayload{
        token: String!
        user: User!
    }

    type Mutation{
        signup(email: String!, password: String!, fullName: String!): AuthPayload!
        login(email: String!, password: String!) : AuthPayload!
    }

    type Query{
        me : User
    }
`;