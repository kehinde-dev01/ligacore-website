function handleSubmit(e) {
  e.preventDefault()
  const name = e.target.querySelector('input[type="text"]').value
  const phone = e.target.querySelector('input[type="tel"]').value
  const location = e.target.querySelectorAll('input[type="text"]')[1].value
  const service = e.target.querySelector('select').value
  const message = e.target.querySelector('textarea').value

  const text = `Hello Liga Core! My name is ${name}. Phone: ${phone}. Location: ${location}. I need: ${service}. ${message ? 'Message: ' + message : ''}`
  const url = `https://wa.me/2347032719230?text=${encodeURIComponent(text)}`
  window.open(url, '_blank')

  popup.classList.add('open')
  e.target.reset()
}

    const hamburger = document.querySelector('.hamburger')
const mobileMenu = document.getElementById('mobile-menu')

hamburger.addEventListener('click', function() {
  mobileMenu.classList.toggle('open')
})

function closeMenu() {
  mobileMenu.classList.remove('open')
}

const popup = document.getElementById('popup')

function closePopup() {
  popup.classList.remove('open')
}