# TrueMatch

> An AI-powered job matching platform that uses semantic search to connect developers with honest job opportunities.

## 🎯 Problem Statement

Traditional job boards use literal keyword matching (React.js ≠ ReactJS), causing qualified developers to miss opportunities. Additionally:
- Misleading job titles ("Junior" roles requiring 4+ years)
- Manual skill tracking across multiple job descriptions
- ATS filters dropping qualified candidates due to keyword variations

TrueMatch solves this with semantic search, skill normalization, and truth scoring.

## 🚀 Tech Stack

### Backend
- **GraphQL**: Apollo Server v4
- **Database**: PostgreSQL (Supabase)
- **ORM**: Prisma 7 with connection pooling
- **Runtime**: Node.js + TypeScript
- **Server**: Express 5

### Planned Features
- React 19 frontend
- JWT authentication
- AI-powered resume parsing (Claude API)
- Vector search for semantic job matching
- Real-time updates with GraphQL subscriptions

## 📁 Project Structure
```
truematch/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma          # Database schema
│   │   └── migrations/
│   ├── src/
│   │   ├── graphql/
│   │   │   ├── schema.ts          # GraphQL type definitions
│   │   │   └── resolvers.ts       # Query/mutation resolvers
│   │   ├── utils/                 # Helper functions
│   │   └── index.ts               # Server entry point
│   ├── .env                       # Environment variables
│   └── package.json
└── frontend/                      # Coming soon
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 18+
- PostgreSQL database (or Supabase account)

### Installation

1. **Clone the repository**
```bash
   git clone https://github.com/pujeetas/TrueMatch.git
   cd TrueMatch/backend
```

2. **Install dependencies**
```bash
   npm install
```

3. **Configure environment variables**
   
   Create `.env` file:
```env
   DATABASE_URL="postgresql://user:password@host:port/database"
```

4. **Setup database**
```bash
   npx prisma generate
   npx prisma migrate dev --name init
```

5. **Start development server**
```bash
   npm run dev
```

6. **Access GraphQL Playground**
```
   http://localhost:4000/graphql
```

## 📊 Database Schema
```prisma
model User {
  id          String
  fullName    String
  email       String @unique
  password    String
  skills      String[]
  resumeURL   String?
  applications Application[]
}

model Job {
  id              String
  title           String
  company         String
  description     String
  requiredSkills  String[]
  experienceYears Int
  truthFlags      String[]      # Honesty indicators
  location        String
  salary          String?
  applications    Application[]
}

model Application {
  id         String
  userId     String
  jobId      String
  matchScore Int                # AI-calculated match %
  status     String
  appliedAt  DateTime
}
```

## 🔍 Current Features

- ✅ GraphQL API with Apollo Server v4
- ✅ PostgreSQL database with Prisma ORM
- ✅ Connection pooling for scalability
- ✅ User data queries
- ✅ Type-safe database operations

## 🚧 In Progress

- [ ] Job CRUD operations
- [ ] User authentication (JWT)
- [ ] Skill normalization algorithm
- [ ] Semantic search implementation
- [ ] Truth score calculation
- [ ] Resume parsing with AI
- [ ] Frontend React application

## 📝 Example Queries

### Get all users
```graphql
query {
  users {
    id
    fullName
    email
    skills
  }
}
```

## 🎓 Learning Goals

This project demonstrates:
- Modern GraphQL API architecture
- Database design with relations
- Type-safe backend development
- Cloud database integration
- Problem-solving with real-world constraints

## 👤 Author

**Pujeeta Singh**
- GitHub: [@pujeetas](https://github.com/pujeetas)
- LinkedIn: [linkedin.com/in/pujeetasingh](https://linkedin.com/in/pujeetasingh)
- Portfolio: [pujeeta-portfolio.vercel.app](https://pujeeta-portfolio.vercel.app)

## 📄 License

MIT

---

**Status**: 🚀 Active Development | Day 2 Complete
