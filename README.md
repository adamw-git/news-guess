## Setup

1. Clone the repository:

```bash
git clone https://github.com/adamw-git/news-guess.git
cd news-guess
```

2. Install dependencies.

```bash
npm install
```

3. Create a .env file in the project root, then insert your API key:

```ini
GUARDIAN_API_KEY=INSERT_KEY_HERE
```

## Run

1. Run the program with the following command:

```bash
node scripts/index.js
```

This script will populate the database with articles using the Guardian's API, and populate the json file with article data.