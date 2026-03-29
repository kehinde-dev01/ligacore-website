const body = document.body
const themeToggle = document.getElementById('theme-toggle')
const themeIcon = document.querySelector('.theme-icon')
const hamburger = document.getElementById('hamburger')
const mobileMenu = document.getElementById('mobile-menu')
const popup = document.getElementById('popup')
const popupCloseBtn = document.getElementById('popup-close-btn')
const contactForm = document.getElementById('contact-form')

function applyTheme(theme) {
  if (theme === 'light') {
    body.classList.add('light-mode')
    if (themeIcon) themeIcon.textContent = '☀️'
  } else {
    body.classList.remove('light-mode')
    if (themeIcon) themeIcon.textContent = '🌙'
  }
  localStorage.setItem('ligacore-theme', theme)
}

const savedTheme = localStorage.getItem('ligacore-theme')
if (savedTheme) {
  applyTheme(savedTheme)
} else {
  applyTheme('dark')
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isLight = body.classList.contains('light-mode')
    applyTheme(isLight ? 'dark' : 'light')
  })
}

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open')
    hamburger.setAttribute('aria-expanded', String(isOpen))
  })

  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open')
      hamburger.setAttribute('aria-expanded', 'false')
    })
  })
}

function cleanText(value, maxLength = 500) {
  return String(value).replace(/\s+/g, ' ').trim().slice(0, maxLength)
}

function isValidPhone(phone) {
  return /^[0-9+\-\s()]{7,20}$/.test(phone)
}

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const formData = new FormData(contactForm)
    const name = cleanText(formData.get('name'), 80)
    const phone = cleanText(formData.get('phone'), 20)
    const location = cleanText(formData.get('location'), 80)
    const service = cleanText(formData.get('service'), 120)
    const message = cleanText(formData.get('message'), 500)

    if (!name || !phone || !location || !service) {
      alert('Please fill in all required fields.')
      return
    }

    if (!isValidPhone(phone)) {
      alert('Please enter a valid phone number.')
      return
    }

    const text =
      `Hello LIGACORE Solutions! My name is ${name}. ` +
      `Phone: ${phone}. ` +
      `Location: ${location}. ` +
      `Service needed: ${service}. ` +
      `${message ? `Project details: ${message}` : ''}`

    const url = `https://wa.me/2347032719230?text=${encodeURIComponent(text)}`

    popup.classList.add('open')

    setTimeout(() => {
      window.open(url, '_blank', 'noopener,noreferrer')
      contactForm.reset()
    }, 500)
  })
}

if (popupCloseBtn) {
  popupCloseBtn.addEventListener('click', () => {
    popup.classList.remove('open')
  })
}

if (popup) {
  popup.addEventListener('click', (event) => {
    if (event.target === popup) {
      popup.classList.remove('open')
    }
  })
}

const testimonials = [
  {
    name: "Chidi Nwosu",
    location: "Ikeja, Lagos",
    avatar: "☀️",
    stars: 5,
    quote: "LIGACORE Solutions handled our solar and inverter installation professionally. The setup is neat, stable, and the team explained everything clearly."
  },
  {
    name: "Fatimah Bello",
    location: "Surulere, Lagos",
    avatar: "📹",
    stars: 5,
    quote: "We needed CCTV coverage for our property and they delivered clean installation with good camera positioning. Very professional finish."
  },
  {
    name: "Emeka & Sons",
    location: "Oshodi, Lagos",
    avatar: "⚡",
    stars: 5,
    quote: "They installed our electric fence system and the work was sharp and organized. Communication was smooth from start to finish."
  },
  {
    name: "Adebayo Homes",
    location: "Lekki, Lagos",
    avatar: "🚪",
    stars: 5,
    quote: "Our automated door system works beautifully and the installation quality was impressive. LIGACORE Solutions knows how to deliver premium results."
  },
  {
    name: "Taiwo Adeyemi",
    location: "Yaba, Lagos",
    avatar: "🔧",
    stars: 5,
    quote: "What I liked most was that they looked at the whole problem and recommended the right solution instead of pushing one product only."
  }
]

let currentIndex = 0
let autoPlayTimer = null
let touchStartX = 0

const sliderCard = document.getElementById('slider-card')
const sliderStars = document.getElementById('slider-stars')
const sliderQuote = document.getElementById('slider-quote')
const sliderName = document.getElementById('slider-name')
const sliderLocation = document.getElementById('slider-location')
const sliderAvatar = document.getElementById('slider-avatar')
const sliderDots = document.getElementById('slider-dots')
const nextBtn = document.getElementById('next-btn')
const prevBtn = document.getElementById('prev-btn')

function buildDots() {
  if (!sliderDots) return
  sliderDots.innerHTML = ''

  testimonials.forEach((_, index) => {
    const dot = document.createElement('button')
    dot.className = 'dot'
    dot.type = 'button'
    dot.setAttribute('aria-label', `Go to testimonial ${index + 1}`)

    if (index === currentIndex) {
      dot.classList.add('active')
    }

    dot.addEventListener('click', () => {
      goToSlide(index)
    })

    sliderDots.appendChild(dot)
  })
}

function updateDots() {
  document.querySelectorAll('.dot').forEach((dot, index) => {
    dot.classList.toggle('active', index === currentIndex)
  })
}

function showSlide(index) {
  const item = testimonials[index]
  if (!item || !sliderCard) return

  sliderStars.textContent = '★'.repeat(item.stars)
  sliderQuote.textContent = item.quote
  sliderName.textContent = item.name
  sliderLocation.textContent = item.location
  sliderAvatar.textContent = item.avatar

  sliderCard.style.animation = 'none'
  void sliderCard.offsetWidth
  sliderCard.style.animation = 'slideIn 0.35s ease'

  updateDots()
}

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

function startAutoPlay() {
  autoPlayTimer = setInterval(nextSlide, 5000)
}

function resetAutoPlay() {
  clearInterval(autoPlayTimer)
  startAutoPlay()
}

if (nextBtn) {
  nextBtn.addEventListener('click', () => {
    nextSlide()
    resetAutoPlay()
  })
}

if (prevBtn) {
  prevBtn.addEventListener('click', () => {
    prevSlide()
    resetAutoPlay()
  })
}

if (sliderCard) {
  sliderCard.addEventListener('touchstart', (event) => {
    touchStartX = event.changedTouches[0].screenX
  })

  sliderCard.addEventListener('touchend', (event) => {
    const diff = touchStartX - event.changedTouches[0].screenX
    if (Math.abs(diff) > 40) {
      diff > 0 ? nextSlide() : prevSlide()
      resetAutoPlay()
    }
  })
}

buildDots()
showSlide(currentIndex)
startAutoPlay()