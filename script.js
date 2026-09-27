/* =========================================================
   YASHWANT K — PORTFOLIO INTERACTIONS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("pageLoader");
  const nav = document.getElementById("mainNav");
  const typingText = document.getElementById("typingText");
  const year = document.getElementById("year");
  const cursorGlow = document.querySelector(".cursor-glow");

  // Loader
  window.addEventListener("load", () => {
    setTimeout(() => loader.classList.add("hide"), 550);
  });

  // Footer year
  year.textContent = new Date().getFullYear();

  // Navbar scroll state
  const handleNav = () => {
    nav.classList.toggle("scrolled", window.scrollY > 40);
  };
  handleNav();
  window.addEventListener("scroll", handleNav, { passive: true });

  // Mouse glow — disabled on touch devices
  if (window.matchMedia("(pointer: fine)").matches) {
    window.addEventListener("mousemove", (e) => {
      cursorGlow.style.left = `${e.clientX}px`;
      cursorGlow.style.top = `${e.clientY}px`;
    });
  } else {
    cursorGlow.style.display = "none";
  }

  // Typing animation
  const words = [
    "JAVA FULL STACK DEVELOPER",
    "JAVA DEVELOPER",
    "FRONT-END DEVELOPER",
    "SOFTWARE ENTHUSIAST",
    "CONTINUOUS LEARNER"
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function typeLoop() {
    const word = words[wordIndex];

    if (!deleting) {
      charIndex++;
      typingText.textContent = word.substring(0, charIndex);

      if (charIndex === word.length) {
        deleting = true;
        setTimeout(typeLoop, 1300);
        return;
      }
    } else {
      charIndex--;
      typingText.textContent = word.substring(0, charIndex);

      if (charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
      }
    }

    setTimeout(typeLoop, deleting ? 45 : 75);
  }
  setTimeout(typeLoop, 800);

  // Reveal-on-scroll
  const revealElements = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach(el => revealObserver.observe(el));

  // Counter animation
  const counters = document.querySelectorAll(".counter");
  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const counter = entry.target;
      const target = Number(counter.dataset.target);
      let current = 0;
      const duration = 900;
      const start = performance.now();

      function update(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        current = Math.floor(eased * target);
        counter.textContent = current;

        if (progress < 1) requestAnimationFrame(update);
        else counter.textContent = target;
      }

      requestAnimationFrame(update);
      observer.unobserve(counter);
    });
  }, { threshold: 0.6 });

  counters.forEach(counter => counterObserver.observe(counter));

  // Active nav link
  const sections = document.querySelectorAll("header[id], section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${entry.target.id}`
          );
        });
      }
    });
  }, { rootMargin: "-35% 0px -55% 0px" });

  sections.forEach(section => sectionObserver.observe(section));

  // Close mobile Bootstrap nav after clicking a link
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      const menu = document.getElementById("navMenu");
      if (menu.classList.contains("show") && window.bootstrap) {
        bootstrap.Collapse.getOrCreateInstance(menu).hide();
      }
    });
  });

  // Contact form: opens user's email client with a pre-filled message.
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      status.textContent = "Please complete all fields.";
      status.style.color = "#ff8d9d";
      return;
    }

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    const mailSubject = encodeURIComponent(subject);
    const mailBody = encodeURIComponent(
      `Hello Yashwant,\n\nName: ${name}\nEmail: ${email}\n\n${message}`
    );

    window.location.href =
      `mailto:yash.manjula07@gmail.com?subject=${mailSubject}&body=${mailBody}`;

    status.textContent = "Opening your email application...";
    status.style.color = "#45e6a5";
  });

  // Small tilt effect on project cards
  if (window.matchMedia("(pointer: fine)").matches) {
    document.querySelectorAll(".project-card").forEach(card => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        card.style.transform =
          `perspective(900px) rotateX(${y * -2}deg) rotateY(${x * 2}deg) translateY(-5px)`;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
      });
    });
  }
});
