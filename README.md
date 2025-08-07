# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Environment Configuration

Create a `.env` file in the root directory with the following variables:

```env
# MongoDB Configuration
MONGODB_URI=<Your_MongoDB_Atlas_connection_string>
```

### MongoDB Setup

1. **MongoDB Atlas**: Use MongoDB Atlas cloud service
   - Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Create a cluster and get your connection string
   - Replace the environment variable with your actual value

2. **Environment Variables**: Make sure to set the required environment variable:
   - `MONGODB_URI`: Your MongoDB Atlas connection string

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

## API Endpoints

The application includes the following API endpoints for game management:

### Games API

- `GET /api/games` - Get all games with pagination and filtering
- `POST /api/games` - Create a new game
- `GET /api/games/[id]` - Get a specific game by ID
- `PUT /api/games/[id]` - Update a game by ID
- `DELETE /api/games/[id]` - Delete a game by ID
- `GET /api/games/search?q=term` - Search games by title, description, or category


## Code Quality

This project is configured with ESLint and Prettier for code quality and formatting:

### Linting

Run ESLint to check for code issues:

```bash
# Check for issues
bun run lint

# Fix auto-fixable issues
bun run lint:fix
```

### Formatting

Format code with Prettier:

```bash
# Format all files
bun run format
```

### Configuration

- **ESLint**: Configured with `@nuxt/eslint-config` for Nuxt.js projects
- **Prettier**: Configured for consistent code formatting
- **TypeScript**: Full TypeScript support with strict linting rules
- **Vue**: Vue.js specific linting rules included

### VS Code Integration

The project includes VS Code settings for automatic formatting and linting on save. Make sure you have the ESLint and Prettier extensions installed in VS Code.

## Database Features

- **MongoDB Integration**: Full CRUD operations for games
- **Environment Variables**: Secure configuration management
- **Error Handling**: Comprehensive error handling and logging
- **Pagination**: Built-in pagination support
- **Search**: Full-text search across game titles, descriptions, and categories
- **Filtering**: Category-based filtering
- **Sorting**: Configurable sorting options

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
