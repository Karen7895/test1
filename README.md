# Deutsch Leseecke

Modern German reading platform built with Express and EJS. Stories are gated behind authentication and stored in MySQL. The admin account (`karen12389033@gmail.com`) can publish new stories directly from the web UI.

## Key Features

- Secure sessions with signup/login flows (passwords hashed with bcrypt).
- Story catalogue available only to authenticated readers.
- Admin tooling for creating stories from the browser with live database persistence.
- Admin tooling for creating stories and comprehension questions (with optional audio) directly in the browser.
- Level filtering (A1&ndash;C2), improved navigation, and refined UI.
- Express + EJS server-side rendering with modular partials and modern styling.

## Tech Stack

- **Runtime:** Node.js 18+, Express 4
- **Views:** EJS templates
- **Database:** MySQL (via `mysql2/promise`)
- **Styles:** Custom CSS (Inter font, responsive layout)
- **Auth:** `express-session` + hashed passwords (`bcryptjs`)

## Getting Started

1. Install dependencies
   ```bash
   npm install
   ```
2. Provide environment variables (see `.env.example` if available)  
   Required keys:
   ```env
   PORT=3000
   SESSION_SECRET=replace-me
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_USER=your_mysql_user
   DB_PASSWORD=your_mysql_password
   DB_NAME=deutsch_leseecke
   DB_SSL=false
   ```
3. Prepare the database schema (see below).
4. Run the server:
   ```bash
   npm run dev   # nodemon auto-reload
   # or
   npm start
   ```
5. Visit [http://localhost:3000](http://localhost:3000).

## Database Schema

The application expects `users`, `stories`, `questions`, `vocabulary_entries`, and `grammar_topics` tables. Below is a reference schema (feel free to adjust column types to your needs).

```sql
CREATE TABLE IF NOT EXISTS users (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

Add the `stories` table to persist story content authored by the admin:

```sql
CREATE TABLE IF NOT EXISTS stories (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  level ENUM('A1','A2','B1','B2','C1','C2') NOT NULL,
  summary VARCHAR(255) NOT NULL,
  body MEDIUMTEXT NOT NULL,
  author_id INT UNSIGNED NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_stories_author
    FOREIGN KEY (author_id) REFERENCES users(id)
    ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

> **Tip:** Seed the `users` table with the admin account (`karen12389033@gmail.com`). After creating the user through the signup form you can update the email directly in MySQL if required.

Add the `questions` table so the admin can author multiple-choice prompts with four answers and an optional MP3 audio clip:

```sql
CREATE TABLE IF NOT EXISTS questions (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  story_id INT UNSIGNED NOT NULL,
  prompt TEXT NOT NULL,
  answer_a VARCHAR(255) NOT NULL,
  answer_b VARCHAR(255) NOT NULL,
  answer_c VARCHAR(255) NOT NULL,
  answer_d VARCHAR(255) NOT NULL,
  correct_index TINYINT UNSIGNED NOT NULL,
  audio_path VARCHAR(255) NULL,
  author_id INT UNSIGNED NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_questions_story
    FOREIGN KEY (story_id) REFERENCES stories(id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_questions_author
    FOREIGN KEY (author_id) REFERENCES users(id)
    ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT chk_questions_correct_index
    CHECK (correct_index BETWEEN 0 AND 3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

> **Note:** Uploaded audio is stored under `public/uploads/questions`. Ensure the folder exists and is writable by the server process.
> Each question is linked to a specific story via `story_id`, so readers can answer the quiz directly underneath the story.

Vocabulary items power the `/learning/vocabulary` page and the comprehension features the admin can reference in stories:

```sql
CREATE TABLE IF NOT EXISTS vocabulary_entries (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  term VARCHAR(255) NOT NULL,
  translation VARCHAR(255) NOT NULL,
  example_sentence TEXT NULL,
  author_id INT UNSIGNED NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_vocabulary_author
    FOREIGN KEY (author_id) REFERENCES users(id)
    ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

Grammar explanations live in the `/learning/grammar` section and allow rich HTML formatting:

```sql
CREATE TABLE IF NOT EXISTS grammar_topics (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  explanation MEDIUMTEXT NOT NULL,
  author_id INT UNSIGNED NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_grammar_author
    FOREIGN KEY (author_id) REFERENCES users(id)
    ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

## Roles and Access

- **Readers:** Any authenticated user can browse and read stories.
- **Admin (karen12389033@gmail.com):** Gains access to the "Neue Geschichte" workflow (including inline quiz creation), the "Neue Frage" action, and the learning editors for vocabulary and grammar content.
- Story detail pages, list, and creation routes are all protected; unauthenticated visitors are redirected to `/login`.

## Project Structure

```
.
├─ server.js
├─ public/
│  ├─ css/main.css
│  ├─ uploads/questions/
│  └─ js/
│     ├─ home.js
│     └─ ai-chat.js
├─ views/
│  ├─ partials/ (head, header, footer)
│  ├─ stories/new.ejs
│  ├─ questions/new.ejs
│  ├─ errors/{403,404,500}.ejs
│  ├─ home.ejs
│  ├─ story.ejs
│  ├─ login.ejs
│  ├─ signup.ejs
│  └─ about.ejs
└─ lib/db.js (MySQL connection pool)
```

## Development Notes

- Password hashing uses 12 salt rounds; adjust in `server.js` if needed.
- `express-session` stores session data in-memory; switch to a persistent store (Redis/MySQL) for production.
- Story filtering is performed client-side (`public/js/home.js`) by toggling visibility classes.
- The floating AI helper is UI-only; integrate an API by replacing the stub in `public/js/ai-chat.js`.

## Next Steps

1. Add pagination or search across the story catalogue.
2. Implement editing/deleting stories for the admin role.
3. Replace session store with a production-ready adapter.
4. Connect the AI helper to an actual language assistant API.
5. Add automated tests for auth and story creation workflows.

Mit viel Erfolg beim Deutschlernen!
