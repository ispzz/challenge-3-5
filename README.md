# Leonardo AI Code Challenge

A Next.js application built with TypeScript, Apollo Client, and Chakra UI that demonstrates user authentication, profile management, and anime data visualization using the AniList GraphQL API.

## 🛠️ Tech Stack

- **Framework**: Next.js 15.4.3 with App Router
- **Language**: TypeScript
- **UI Library**: Chakra UI v3
- **State Management**: React Context API
- **Data Fetching**: Apollo Client with GraphQL
- **Testing**: Jest with React Testing Library
- **Code Quality**: ESLint, Prettier
- **Icons**: React Icons

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── information/        # Anime browsing with pagination
│   ├── login/             # Authentication page
│   ├── profile/           # User profile management
│   └── page.tsx           # Home dashboard
├── components/            # Reusable UI components
│   ├── anime-modal.tsx    # Anime detail modal
│   ├── auth-wrapper.tsx   # Authentication guard
│   ├── header.tsx         # Navigation header
│   └── profile-input.tsx  # Profile form inputs
├── contexts/              # React Context providers
│   └── user-context.tsx   # User state management
├── lib/                   # External service configurations
│   ├── apollo-client.ts   # GraphQL client setup
│   └── queries.ts         # GraphQL queries
├── types/                 # TypeScript type definitions
│   ├── anime.ts           # Anime data types
│   └── user.ts            # User data types
└── utils/                 # Helper functions
    └── user-form-helpers.ts
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone git@github.com:ispzz/challenge-3-5.git
cd leonardoai-challenge
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🧪 Testing

Run the test suite:
```bash
npm test
```
