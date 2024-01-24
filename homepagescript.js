const cardColors = ['red', 'blue', 'green', 'yellow', 'purple']

let flippedCards = []
let matchedCards = []

function generateCardPairs(colors) {
  const pairs = []

  for (let color of colors) {
    pairs.push(color)
    pairs.push(color)
  }

  return pairs
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }

  return array
}

function createCardElement(index, color) {
  const card = document.createElement('div')
  card.className = 'card'
  card.dataset.color = color
  card.style.backgroundImage = "url('https://i.imgur.com/bQkmxD6.png')"
  card.style.backgroundSize = 'cover'
  card.style.backgroundPosition = 'center'
  card.innerText = ''

  card.addEventListener('click', () => {
    if (!flippedCards.includes(card) && flippedCards.length < 2) {
      flipCard(card)
      flippedCards.push(card)

      if (flippedCards.length === 2) {
        checkCards()
      }
    }
  })

  return card
}

function flipCard(card) {
  card.style.backgroundImage = ''
  card.style.backgroundColor = card.dataset.color
  card.style.color = '#fff'
}

function flipCardBack(card) {
  if (!matchedCards.includes(card)) {
    setTimeout(() => {
      card.style.backgroundImage = "url('https://i.imgur.com/bQkmxD6.png')"
      card.style.backgroundColor = 'gray'
      card.style.color = 'white'
    }, 500)
  }
}

function checkCards() {
  const firstCard = flippedCards[0]
  const secondCard = flippedCards[1]

  if (firstCard.dataset.color === secondCard.dataset.color) {
    matchedCards.push(firstCard, secondCard)
    flippedCards = []

    if (matchedCards.length === 10) {
      displayCongratulationsMessage()
    }
  } else {
    setTimeout(() => {
      flipCardBack(firstCard)
      flipCardBack(secondCard)
      flippedCards = []
    }, 1000)
  }
}

function displayCongratulationsMessage() {
  const congratulationsElement = document.getElementById('congratulations')
  congratulationsElement.innerText =
    'Congratulations MORTAL! You have passed the first trial!'

  const playAgainButton = document.createElement('button')
  playAgainButton.innerText = 'Play Again'
  playAgainButton.className = 'button'
  playAgainButton.addEventListener('click', () => {
    resetGame()
    congratulationsElement.style.display = 'none'
  })

  const returnHomeButton = document.createElement('button')
  returnHomeButton.innerText = 'Return to Home Page'
  returnHomeButton.className = 'button'
  returnHomeButton.addEventListener('click', goToHomePage)

  const optionsContainer = document.createElement('div')
  optionsContainer.className = 'button-container'
  optionsContainer.appendChild(playAgainButton)
  optionsContainer.appendChild(returnHomeButton)

  congratulationsElement.appendChild(optionsContainer)
  congratulationsElement.style.display = 'block'
}

function resetCongratulationsMessage() {
  const congratulationsElement = document.getElementById('congratulations')
  congratulationsElement.innerText = ''
  congratulationsElement.style.display = 'none'
}

function resetGame() {
  flippedCards = []
  matchedCards = []
  resetCongratulationsMessage()

  const gameContainer = document.getElementById('game-container')
  while (gameContainer.firstChild) {
    gameContainer.removeChild(gameContainer.firstChild)
  }

  const newShuffledPairs = shuffleArray(generateCardPairs(cardColors))

  for (let i = 0; i < 10; i++) {
    const card = createCardElement(i, newShuffledPairs[i])
    gameContainer.appendChild(card)
  }
}

function goToHomePage() {
  window.location.href = 'index.html'
}

// Initialize the game
window.addEventListener('DOMContentLoaded', () => {
  const gameContainer = document.getElementById('game-container')

  const shuffledPairs = shuffleArray(generateCardPairs(cardColors))

  for (let i = 0; i < 10; i++) {
    const card = createCardElement(i, shuffledPairs[i])
    gameContainer.appendChild(card)
  }
})
