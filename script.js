document.addEventListener('DOMContentLoaded', () => {

	const navToggle = document.getElementById('nav-toggle');
	const mainNav   = document.getElementById('main-nav');
	const navLinks  = document.querySelectorAll('.nav-link');

	navToggle.addEventListener('click', () => {
		const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
		navToggle.setAttribute('aria-expanded', !isOpen);
		mainNav.classList.toggle('is-open');

		document.body.style.overflow = isOpen ? '' : 'hidden';
	});

	navLinks.forEach(link => {
		link.addEventListener('click', () => {
		navToggle.setAttribute('aria-expanded', 'false');
		mainNav.classList.remove('is-open');
		document.body.style.overflow = '';
		});
	});

	const revealSelectors = [
		'.info-card',
		'.gift-card',
		'.fruit-item',
		'.symbol-card',
		'.prayer-card',
		'.pull-quote',
		'.two-col__text',
		'.gifts-group__title',
		'.section-header',
		'.fruit-detail'
	];

	revealSelectors.forEach(selector => {
		document.querySelectorAll(selector).forEach(el => {
		el.classList.add('reveal');
		});
	});

	const revealObserver = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('is-visible');
				revealObserver.unobserve(entry.target);
			}
		});
		}, {
			threshold: 0.1,
			rootMargin: '0px 0px -40px 0px'
		}
	);

	document.querySelectorAll('.reveal').forEach(el => {
		revealObserver.observe(el);
	});

	const sections = document.querySelectorAll('section[id]');

	const sectionObserver = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				const id = entry.target.getAttribute('id');
				navLinks.forEach(link => {
					link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
				});
			}
		});
		}, {
			rootMargin: '-20% 0px -70% 0px'
		}
	);

	sections.forEach(section => {
		sectionObserver.observe(section);
	});

	const header = document.getElementById('site-header');
	let lastScroll = 0;

	window.addEventListener('scroll', () => {
		const currentScroll = window.scrollY;

		if (currentScroll > 100) {
			header.style.padding = '';
		}

		lastScroll = currentScroll;
	}, { passive: true });

});