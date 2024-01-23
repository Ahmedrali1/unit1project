document.addEventListener('DOMContentLoaded', function () {
  const cardColors = ['red', 'yellow', 'blue']
  const cardPairs = generateCardPairs(cardColors)

  const shuffledPairs = shuffleArray(cardPairs)

  const gameContainer = document.getElementById('game-container')
  for (let i = 0; i < 6; i++) {
    const card = createCardElement(i, shuffledPairs[i])
    gameContainer.appendChild(card)
  }

  let flippedCards = []
  let matchedCards = []

  gameContainer.addEventListener('click', function (event) {
    const clickedCard = event.target

    if (!clickedCard.classList.contains('card') || flippedCards.length >= 2) {
      return
    }

    flipCard(clickedCard)

    flippedCards.push(clickedCard)

    if (flippedCards.length === 2) {
      setTimeout(checkCards, 1000)
    }
  })

  function generateCardPairs(colors) {
    const pairs = []
    for (const color of colors) {
      pairs.push({ color })
      pairs.push({ color })
    }
    return pairs
  }

  function createCardElement(index, pair) {
    const card = document.createElement('div')
    card.classList.add('card')
    card.dataset.color = pair.color
    card.style.backgroundColor = card.innerText = ''

    return card
  }

  function flipCard(card) {
    card.style.backgroundColor = card.dataset.color
    card.innerText = '' // Clear the text content
    card.classList.add('flipped')
  }

  function checkCards() {
    const firstCard = flippedCards[0]
    const secondCard = flippedCards[1]

    if (firstCard.dataset.color === secondCard.dataset.color) {
      matchedCards.push(firstCard, secondCard)
      flippedCards = []

      if (matchedCards.length === 6) {
        alert('Congratulations! You have won!')
      }
    } else {
      setTimeout(() => {
        flipCardBack(firstCard)
        flipCardBack(secondCard)
        flippedCards = []
      }, 1000)
    }
  }

  function flipCardBack(card) {
    card.style.backgroundColor = ''
    card.innerText = ''
    card.classList.remove('flipped')
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }
})
