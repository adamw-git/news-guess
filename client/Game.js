import Article from './Article.js'

class Game {
  constructor(articlesData) {
    this.currentArticle = null
    this.guessCount = 0
    this.maxGuesses = 3
    this.hintIndex = 0
  }

  async gameStart() {
    this.guessCount = 0
    this.hintIndex = 0

    const gameArea = document.getElementById('gameArea')
    gameArea.innerHTML = '<p>Loading article...</p>'

    try {
      const res = await fetch('/api/random-article')
      const data = await res.json()

      this.currentArticle = new Article(data)
      this.displayArticle()
    } catch (err) {
      console.error('Error fetching article:', err)
      document.getElementById('gameArea').innerHTML =
        '<p>Failed to load aricle. </p>'
    }
  }

  // displayArticle() {
  //   const gameArea = document.getElementById('gameArea')

  //   gameArea.innerHTML = `
  //       <h2>${this.currentArticle.title}</h2>
  //       <p>${this.currentArticle.getRedactedContent()}</p>
  //       <img id="articleImg" src="${
  //         this.currentArticle.img
  //       }" class ="blurred" />
  //       <input id="guessInput" type="text" placeholder="Guess the country" />
  //       <button id ="submitGuess">Submit Guess</button>
  //       <p id="feedback"></p>
  //       <p id="hint"></p>
  //       `
  //   document.getElementById('submitGuess').addEventListener('click', () => {
  //     this.checkGuess()
  //   })
  // }

  checkGuess() {
    const guessInput = document.getElementById('guessInput')
    const guess = guessInput.ariaValueMax.trim()
    const feedback = document.getElementById('feedback')
    const hintEl = document.getElementById('hint')

    if (!guess) return

    this.guessCount++

    if (guess.toLowerCase() === this.currentArticle.country.toLowerCase()) {
      feedback.textContent = `✅ Correct! The article is from ${this.currentArticle.country}.`
    } else {
      feedback.textContent = `❌ Wrong guess!`

      const hint = this.currentArticle.getHint(this.hintIndex++)

      if (hint) hintEl.textContent = `Hint: ${hint}`

      if (this.hintIndex - 1 === 2) {
        const imgE1 = document.getElementById('articleImg')
        if (imgE1) imgE1.classList.remove('blurred')
        imgE1.classList.add('unblurred')
      }

      if (this.guessCount >= this.maxGuesses) {
        feedback.textContent += `Game over! the article was from ${this.currentArticle.country}.`
        this.nextArticleButton()
      }
    }

    guessInput.value = ''
  }

  // nextArticleButton() {
  //   const gameArea = document.getElementById(gameArea)
  //   gameArea.innerHTML += `<br><button id= "nextArticle">Next Article</button>`
  //   document
  //     .getElementById('nextArticle')
  //     .addEventListener('click', () => this.gameStart())
  // }
}

export default Game
