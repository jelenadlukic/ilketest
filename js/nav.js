const toggler  = document.querySelector('.custom-toggler');
const collapse = document.getElementById('navbarNav');

toggler.addEventListener('click', () => {
    toggler.classList.toggle('opened');
});
collapse.addEventListener('shown.bs.collapse', () => toggler.classList.add('opened'));
collapse.addEventListener('hidden.bs.collapse', () => toggler.classList.remove('opened'));

const nav = document.querySelector('.navbar');
const links = document.querySelectorAll('a.nav-link[href^="#"]');

links.forEach(link => {
    link.addEventListener('click', e => {
        const id = link.getAttribute('href');
        if (id.length < 2) return;
        const target = document.querySelector(id);
        if (!target) return;

        e.preventDefault();
        const navH = nav ? nav.offsetHeight : 0;
        const y = target.getBoundingClientRect().top + window.pageYOffset - (navH + 16);
        window.scrollTo({ top: y, behavior: 'smooth' });

        const bsCollapse = new bootstrap.Collapse(collapse, { toggle: false });
        bsCollapse.hide();
    });
});

 function animateCounters(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = +counter.getAttribute("data-target");
        let current = 0;
        const increment = Math.ceil(target / 100); // koliko brzo raste

        const updateCounter = () => {
          current += increment;
          if (current > target) current = target;
          counter.textContent = current;
          if (current < target) {
            requestAnimationFrame(updateCounter);
          }
        };

        updateCounter();
        observer.unobserve(counter); // da se animira samo jednom
      }
    });
  }

  const counters = document.querySelectorAll('.counter');
  const observer = new IntersectionObserver(animateCounters, {
    threshold: 0.6
  });

  counters.forEach(counter => {
    observer.observe(counter);
  });

   const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    // Kada About dođe u viewport (≈ 600px od vrha), prikaži dugme
    if (window.scrollY > document.getElementById('about').offsetTop - 100) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 10) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// === ScrollSpy efekat ===
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

window.addEventListener("scroll", () => {
  let currentSection = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100; // visina navigacije
    const sectionHeight = section.clientHeight;

    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
});

// === Klik na "Home" ide skroz na vrh ===
document.querySelector('a[href="#home"]').addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

ScrollReveal().reveal('.service-box', {
  delay: 150,
  duration: 800,
  distance: '40px',
  easing: 'ease-out',
  origin: 'bottom',
  interval: 100
});
