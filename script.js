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


// ── TESTIMONIALS SLIDER ──

// Step 1: All testimonials stored in an array of objects
const testimonials = [
  {
    name: "Chidi Nwosu",
    location: "Ikeja, Lagos",
    avatar: "🏠",
    stars: 5,
    quote: "Liga Core changed my life o! We used to run generator morning till night — fuel cost was killing us. Now we have solar and our light bill is almost nothing. Best decision ever!"
  },
  {
    name: "Fatimah Bello",
    location: "Surulere, Lagos",
    avatar: "👩‍💼",
    stars: 5,
    quote: "Professional people. They came for the assessment, explained everything clearly, gave me a fair price, and installed within two days. My freezer and AC have not gone off since. 10/10."
  },
  {
    name: "Emeka & Sons Printing",
    location: "Oshodi, Lagos",
    avatar: "🏭",
    stars: 5,
    quote: "We run a printing press — power outage used to mean lost money every day. Liga Core set us up with a system that handles all our machines. Production has not stopped since installation."
  },
  {
    name: "Blessing Okafor",
    location: "Ajah, Lagos",
    avatar: "👨‍👩‍👧",
    stars: 5,
    quote: "Genuine people with genuine work. No hidden charges. The quote they gave me was exactly what I paid. My neighbours have already asked for their contact. Highly recommend!"
  },
  {
    name: "Taiwo Adeyemi",
    location: "Yaba, Lagos",
    avatar: "💻",
    stars: 5,
    quote: "I work from home so stable power is everything for me. Liga Core installed my inverter system in one day and I haven't thought about NEPA since. Worth every kobo!"
  }
]

// Step 2: Track which slide is showing
let currentIndex = 0
let autoPlayTimer = null

// Step 3: Build one dot per testimonial in the array
function buildDots() {
  const dotsContainer = document.getElementById('slider-dots')
  dotsContainer.innerHTML = ''

  testimonials.forEach((_, i) => {
    const dot = document.createElement('button')
    dot.classList.add('dot')
    dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`)
    if (i === currentIndex) dot.classList.add('active')
    dot.addEventListener('click', () => goToSlide(i))
    dotsContainer.appendChild(dot)
  })
}

// Step 4: Core function — reads from array, updates DOM
function showSlide(index) {
  const t = testimonials[index]

  document.getElementById('slider-stars').textContent = '★'.repeat(t.stars)
  document.getElementById('slider-quote').textContent = t.quote
  document.getElementById('slider-name').textContent = t.name
  document.getElementById('slider-location').textContent = t.location
  document.getElementById('slider-avatar').textContent = t.avatar

  // Restart slide-in animation on each change
  const card = document.getElementById('slider-card')
  card.style.animation = 'none'
  card.offsetHeight // force browser reflow
  card.style.animation = 'slideIn 0.4s ease'

  // Sync the active dot
  document.querySelectorAll('.dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === index)
  })
}

// Step 5: Navigation — modulo (%) wraps the index around
function nextSlide() {
  currentIndex = (currentIndex + 1) % testimonials.length
  showSlide(currentIndex)
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length
  showSlide(currentIndex)
}

function goToSlide(index) {
  currentIndex = index
  showSlide(currentIndex)
  resetAutoPlay()
}

// Step 6: Auto-play every 5 seconds
function startAutoPlay() {
  autoPlayTimer = setInterval(nextSlide, 5000)
}

function resetAutoPlay() {
  clearInterval(autoPlayTimer)
  startAutoPlay()
}

// Step 7: Touch/swipe support for mobile
let touchStartX = 0

document.getElementById('slider-card').addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX
})

document.getElementById('slider-card').addEventListener('touchend', (e) => {
  const diff = touchStartX - e.changedTouches[0].screenX
  if (Math.abs(diff) > 40) {
    diff > 0 ? nextSlide() : prevSlide()
    resetAutoPlay()
  }
})

// Step 8: Wire up buttons
document.getElementById('next-btn').addEventListener('click', () => {
  nextSlide()
  resetAutoPlay()
})

document.getElementById('prev-btn').addEventListener('click', () => {
  prevSlide()
  resetAutoPlay()
})

// Initialize everything
buildDots()
showSlide(currentIndex)
startAutoPlay()
