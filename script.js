const body = document.body

const btnTheme = document.querySelector('button[aria-label="toggle theme"]')
const btnThemeIcon = document.getElementById('btn-theme')
const btnHamburger = document.querySelector('.nav__hamburger')
const btnHamburgerIcon = document.getElementById('btn-hamburger')

const addThemeClass = (bodyClass, btnClass) => {
  if (bodyClass) body.classList.add(bodyClass)
  if (btnClass) btnThemeIcon.dataset.themeIcon = btnClass
}

const getBodyTheme = localStorage.getItem('portfolio-theme')
const getBtnTheme = localStorage.getItem('portfolio-btn-theme')

addThemeClass(getBodyTheme, getBtnTheme)

const isDark = () => body.classList.contains('dark')

const syncThemeIcon = () => {
	btnThemeIcon.textContent = isDark() ? '☀' : '☾'
}

const setTheme = (bodyClass, btnClass) => {
	const currentBodyTheme = localStorage.getItem('portfolio-theme')

	if (currentBodyTheme) body.classList.remove(currentBodyTheme)

  addThemeClass(bodyClass, btnClass)
	syncThemeIcon()

	localStorage.setItem('portfolio-theme', bodyClass)
	localStorage.setItem('portfolio-btn-theme', btnClass)
}

const toggleTheme = () =>
	isDark() ? setTheme('light', 'fa-moon') : setTheme('dark', 'fa-sun')

syncThemeIcon()
btnTheme.addEventListener('click', toggleTheme)

const displayList = () => {
	const navUl = document.querySelector('.nav__list')

	if (btnHamburger.dataset.open === 'true') {
		btnHamburger.dataset.open = 'false'
		btnHamburgerIcon.textContent = '\u2630'
		btnHamburger.setAttribute('aria-label', 'toggle navigation')
		navUl.classList.remove('display-nav-list')
	} else {
		btnHamburger.dataset.open = 'true'
		btnHamburgerIcon.textContent = '\u2715'
		btnHamburger.setAttribute('aria-label', 'toggle navigation')
		navUl.classList.add('display-nav-list')
	}
}

btnHamburger.addEventListener('click', displayList)

const scrollUp = () => {
	const btnScrollTop = document.querySelector('.scroll-top')

	if (
		body.scrollTop > 500 ||
		document.documentElement.scrollTop > 500
	) {
		btnScrollTop.style.display = 'block'
	} else {
		btnScrollTop.style.display = 'none'
	}
}

document.addEventListener('scroll', scrollUp)

const stackedStates = {};

function slideProjects(sliderId, direction) {
	const slider = document.getElementById(sliderId);
	const cards = slider.querySelectorAll('.card');
	const total = cards.length;
  
	if (!slider || total === 0) return;
  
	if (!(sliderId in stackedStates)) stackedStates[sliderId] = 0;
  
	let current = stackedStates[sliderId];
	current = (current + direction + total) % total;
	stackedStates[sliderId] = current;
  
	cards.forEach((card, idx) => {
	  card.classList.remove('active');
	  if (idx === current) card.classList.add('active');
	});
  
	cards[current].scrollIntoView({ behavior: 'smooth', inline: 'center' });
  }
  
