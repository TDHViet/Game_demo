# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## 🎮 Introduce about the project
This is the project I did for the entrance test of the smilegate 2025 internship for the frontend engineer intern position.

## 🔧 About the Technology

- **Framework:** Built with [Nuxt 3](https://nuxt.com), a powerful full-stack framework based on Vue 3.
- **UI Library:** Utilizes [Tailwind CSS](https://tailwindcss.com) for utility-first, responsive, and customizable styling.
- **Package Manager:** Managed using [Bun](https://bun.sh) for fast dependency installation and execution.
- **Linter:** Code formatting and linting are enforced with [ESLint](https://eslint.org).
- **Backend Engine:** Uses Nuxt 3 Server Engine (Nitro) for server-side logic and API routes.
- **Database:** Connected to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for scalable cloud-based data storage.

---

## 🌐 Web Application Features

### 📄 Game List Page

- **Search and Filter:** Search games by keyword or filter by category.
- **Game Table:** Displays a paginated list of games in a table format.
- **Edit Functionality:** Users can edit individual game entries.
- **Game Registration:** Allows users to register new games.
- **Bulk Deletion:** Support for selecting and deleting multiple games at once.

### 📝 Game Registration Page

- **Create and Update:** Users can create or update game information.
- **Multilingual Support:** Supports three languages: English (EN), Korean (KO), and Japanese (JA). Users can dynamically add or remove languages.
- **Input Validation:** Validates input fields based on custom-defined formats.

---

## 🚀 How to Run the Project

1. **Clone the repository:**

```bash
git clone <your_repository_url>
cd <project_folder>
```

2. **Set up environment variables:**

Create a `.env` file in the root directory with the following variables:

```env
# MongoDB Configuration
MONGODB_URI=<Your_MongoDB_Atlas_connection_string>
```



3. **Install dependencies:**

Make sure to install dependencies:

```bash
# bun
bun install
```

4. **Start the development server:**

Start the development server on `http://localhost:3000`:

```bash
# bun
bun run dev
```

---

### MongoDB Setup

1. **MongoDB Atlas**: Use MongoDB Atlas cloud service
   - Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Create a cluster and get your connection string
   - Replace the environment variable with your actual value

2. **Environment Variables**: Make sure to set the required environment variable:
   - `MONGODB_URI`: Your MongoDB Atlas connection string

## Production

Build the application for production:

```bash
# bun
bun run build
```

Locally preview production build:

```bash
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
