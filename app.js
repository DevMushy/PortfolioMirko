const portfolio = document.getElementById("portfolio");
const sections = [...document.querySelectorAll(".panel")];
const progressBar = document.getElementById("progressBar");
const currentSection = document.getElementById("currentSection");

const detailOverlay = document.getElementById("detailOverlay");
const detailContent = document.getElementById("detailContent");
const closeDetail = document.getElementById("closeDetail");

const details = {
  about: {
    type: "cards",
    title: "Chi sono",
    text: "Ecco alcuni aspetti che mi rappresentano e che guidano il mio modo di lavorare e di approcciarmi ai progetti.",
    cards: [
      {
        title: "Creativo",
        text: "Mi piace immaginare nuove idee e trasformarle in progetti personali, curando colori, dettagli, interazioni e personalità."
      },
      {
        title: "Curioso",
        text: "Mi piace imparare cose nuove, sperimentare tecnologie diverse e mettermi alla prova con sfide sempre differenti."
      },
      {
        title: "Concreto",
        text: "Cerco di portare ogni idea a qualcosa di funzionante, semplice da usare e utile per migliorare le mie competenze."
      }
    ]
  },

  skills: {
    type: "skills",
    title: "Competenze",
    text: "Ecco le competenze che possiedo e che mi permettono di realizzare i miei progetti.",
    skills: [
      "HTML",
      "CSS",
      "JavaScript",
      "PHP",
      "PostgreSQL",
      "Figma",
      "Git",
      "flutter",
      "Unity",
      "C#",
      "Docker",
    ]
  },

  projects: {
    type: "cards",
    title: "Progetti",
    text: "Ogni progetto può diventare una scheda cliccabile con screenshot, descrizione, tecnologie usate e link.",
    cards: [
      {
        title: "Biglietteria online",
        text: "Sistema di vendita con calendario, eventi, carrello, disponibilità e gestione ordini."
      },
      {
        title: "Prenotazioni ombrelloni",
        text: "Flusso con controlli su codici, abbonamenti, disponibilità e limiti giornalieri."
      },
      {
        title: "Gestionale custom",
        text: "Pannelli interni, tabelle, filtri, controlli e strumenti pensati per velocizzare il lavoro."
      }
    ]
  },

  timeline: {
    type: "timeline",
    title: "Percorso",
    text: "Questa timeline può raccontare la tua crescita professionale o personale.",
    items: [
      {
        year: "2022",
        text: "Prime basi di sviluppo web, pagine semplici, layout e piccoli script."
      },
      {
        year: "2023",
        text: "Progetti più strutturati, interfacce dinamiche e prime logiche backend."
      },
      {
        year: "2024",
        text: "Sviluppo di flussi reali, prenotazioni, gestionali, validazioni e sistemi personalizzati."
      },
      {
        year: "2025",
        text: "Più attenzione a UX, animazioni, ordine del codice e identità visiva."
      },
      {
        year: "2026",
        text: "Portfolio personale, progetti più maturi e voglia di creare esperienze più riconoscibili."
      }
    ]
  },

  contacts: {
    type: "cards",
    title: "Contatti",
    text: "Qui puoi mettere i tuoi link reali.",
    cards: [
      {
        title: "Email",
        text: "nome@email.it"
      },
      {
        title: "GitHub",
        text: "github.com/tuo-profilo"
      },
      {
        title: "LinkedIn",
        text: "linkedin.com/in/tuo-profilo"
      },
      {
        title: "CV",
        text: "Aggiungi qui il link al tuo curriculum."
      }
    ]
  }
};

sections.forEach((section, index) => {
  const nextBtn = section.querySelector("[data-scroll-next]");

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      const nextSection = sections[index + 1];

      if (nextSection) {
        nextSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  }
});

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const index = sections.indexOf(entry.target);
      const title = entry.target.dataset.title;

      sections.forEach(section => section.classList.remove("active"));
      entry.target.classList.add("active");

      currentSection.textContent = title;
      document.title = `${title} | Portfolio`;

      const progress = ((index + 1) / sections.length) * 100;
      progressBar.style.width = `${progress}%`;
    });
  },
  {
    root: portfolio,
    threshold: 0.65
  }
);

sections.forEach(section => observer.observe(section));

sections[0].classList.add("active");
progressBar.style.width = `${(1 / sections.length) * 100}%`;

document.querySelectorAll("[data-open-detail]").forEach(button => {
  button.addEventListener("click", () => {
    const key = button.dataset.openDetail;
    openDetail(key);
  });
});

closeDetail.addEventListener("click", closePanel);

detailOverlay.addEventListener("click", event => {
  if (event.target === detailOverlay) {
    closePanel();
  }
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closePanel();
  }

  if (event.key === "ArrowDown") {
    goToSection(1);
  }

  if (event.key === "ArrowUp") {
    goToSection(-1);
  }
});

function goToSection(direction) {
  let activeIndex = sections.findIndex(section =>
    section.classList.contains("active")
  );

  if (activeIndex === -1) {
    activeIndex = 0;
  }

  const nextIndex = activeIndex + direction;

  if (sections[nextIndex]) {
    sections[nextIndex].scrollIntoView({ behavior: "smooth" });
  }
}

function openDetail(key) {
  const data = details[key];

  if (!data) return;

  let html = `
    <h3 class="detail-title">${data.title}</h3>
    <p class="detail-text">${data.text}</p>
  `;

  if (data.type === "cards") {
    html += `<div class="card-grid">`;

    data.cards.forEach(card => {
      html += `
        <article class="card">
          <h4>${card.title}</h4>
          <p>${card.text}</p>
        </article>
      `;
    });

    html += `</div>`;
  }

  if (data.type === "skills") {
    html += `<div class="skill-list">`;

    data.skills.forEach(skill => {
      html += `<span class="skill-pill">${skill}</span>`;
    });

    html += `</div>`;
  }

  if (data.type === "timeline") {
    html += `<div class="timeline">`;

    data.items.forEach(item => {
      html += `
        <div class="timeline-item">
          <strong>${item.year}</strong>
          <span>${item.text}</span>
        </div>
      `;
    });

    html += `</div>`;
  }

  detailContent.innerHTML = html;
  detailOverlay.classList.add("open");
}

function closePanel() {
  detailOverlay.classList.remove("open");
}