const form = document.querySelector('form')
const input = document.querySelector('input')
const chatbox = document.querySelector('#chatbox')
const button = document.querySelector('button')
const authors = ["Me", "Myself", "I"]
let id = 0

const createMessage = (sender, messageText) => {
  id++
  const time = new Date()
  const hours = time.getHours()
  const minutes = time.getMinutes()
  const timestamp = `(${hours > 12 ? hours - 12 : hours}:${minutes < 10 ? '0' + minutes : minutes})`
  const message =
    `<div class="message" id="${id}">
        <span>${timestamp}</span>
        <span class="sender">${sender}:</span>
        <span>${messageText}</span>
        <span class="delete" onclick="deleteMessage(${id})">❌</span>
      </div>`
  chatbox.innerHTML = message + chatbox.innerHTML
}

const getChuckNorrisJoke = async _ => {
  const data = await fetch('https://api.icndb.com/jokes/random')
  const formatMessage = await data.json()
  createMessage('Fact', formatMessage.value.joke)
}

const handleSubmit = event => {
  event.preventDefault()
  const sender = authors[Math.floor(Math.random() * authors.length)]
  const messageText = input.value
  createMessage(sender, messageText)
  input.value = String()
}

const deleteMessage = id => {
  if (confirm('Are you sure?')) {
    const message = document.getElementById(id)
    message.parentNode.removeChild(message)
  }
}

form.addEventListener('submit', handleSubmit)
button.addEventListener('click', getChuckNorrisJoke)