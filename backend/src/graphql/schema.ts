export const typeDefs = `

    type User {
        id: String
        fullName : String
        email: String
        password: String
        resumeURL: String
    }
    type Query {
        user: User
        users: [User!]!
    }
`;