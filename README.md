## Game URL

Play the game at: https://adamw-git.github.io/news-guess/client/index.html

## Setup for Game

1. Clone the repository:

```bash
git clone https://github.com/adamw-git/news-guess.git
cd news-guess
```

## Run

1. Run the program with the following command:

```bash
sudo npm install -g serve
cd client
serve
```

Then open http://localhost:3000 in your web browser.


## Setup for Guardian API
1. Install dependencies.

```bash
npm install
```

2. Create a .env file in the project root, then insert your Guardian API key:

```ini
GUARDIAN_API_KEY=INSERT_KEY_HERE
```

Run the program with the following command:

```
node scripts/index.js
```

This script will populate the database with articles using the Guardian's API, and populate the json file with article data.