document.addEventListener("DOMContentLoaded", function () {
  // Объявляем переменные для изображений
  const hoverImage1 = document.getElementById("hoverImage1");
  const hoverImage2 = document.getElementById("hoverImage2");
  const hoverImage3 = document.getElementById("hoverImage3");
  const hoverImage4 = document.getElementById("hoverImage4");

  // Добавляем шрифты в CSS
  const fontStyles = `
 @font-face {
    font-family: "Inter";
    src: url("./fonts/inter-8.woff") format("woff");
  }
  @font-face {
    font-family: "BebasNeue";
    src: url("./fonts/bebas_neue_bold.woff") format("woff");
    font-weight: 700;
  }
  @font-face {
    font-family: "BebasNeue";
    src: url("./fonts/bebas_neue_book.woff") format("woff");
    font-weight: 350;
  }
  @font-face {
    font-family: "BebasNeueCyrillic";
    src: url("./fonts/BebasNeueCyrillic.woff") format("woff");
  }
    
    .hover-image-container {
      position: absolute;
      opacity: 0;
      transition: opacity 0.3s ease;
      overflow: visible;
      z-index: 100;
      pointer-events: none;
    }
    
    .hover-image {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: auto;
      height: 150%;
      max-width: none;
      pointer-events: none;
    }

    /* Стили для эффектов постеров */
    .poster-item {
      transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      opacity: 1;
      transform: scale(1);
    }

    .poster-item.hover-left-1 {
      opacity: 0.8;
      transform: scale(0.95);
    }

    .poster-item.hover-left-2 {
      opacity: 0.6;
      transform: scale(0.9);
    }

    .poster-item.hover-left-3 {
      opacity: 0.4;
      transform: scale(0.85);
    }

    .poster-item.hover-right-1 {
      opacity: 0.8;
      transform: scale(0.95);
    }

    .poster-item.hover-right-2 {
      opacity: 0.6;
      transform: scale(0.9);
    }

    .poster-item.hover-right-3 {
      opacity: 0.4;
      transform: scale(0.85);
    }

    .poster-item.active-hover {
      transform: scale(1.25);
      z-index: 100;
    }

    /* Стили для подчеркивания ссылки */
    .event-description a {
      text-decoration: underline;
      text-decoration-thickness: 1px;
      text-underline-offset: 3px;
      transition: text-decoration-color 0.3s ease;
    }

    .event-description a:hover {
      text-decoration-color: rgba(255, 255, 255, 0.5);
    }
  `;

  const styleElement = document.createElement("style");
  styleElement.innerHTML = fontStyles;
  document.head.appendChild(styleElement);

  const translations = {
    rus: {
      stages: [
        { image: "./img/pchela1.svg", text: "СТРОЙ" },
        { image: "./img/pchela2.svg", text: "СВОЁ" },
        { image: "./img/pchela3.svg", text: "БУДУЩЕЕ" },
      ],
      additionalText: [
        "НАДЁЖНО ТЕХНОЛОГИЧНО",
        "ИННОВАЦИОННО КРЕАТИВНО",
        "МАСШТАБНО БЕЗОПАСНО",
      ],
      button: "EN",
      logo: "ВЫСОТКИ",
      about: "О НАС",
      events: "СОБЫТИЯ",
      merch: "МЕРЧ",
      faq: "КОНТАКТЫ",
      eventsTitle: "СОБЫТИЯ",
    },
    eng: {
      stages: [
        { image: "./img/pchela1.svg", text: "BUILD" },
        { image: "./img/pchela2.svg", text: "YOUR" },
        { image: "./img/pchela3.svg", text: "FUTURE" },
      ],
      additionalText: [
        "RELIABLE TECHNOLOGICAL",
        "INNOVATIVE CREATIVE",
        "SCALED CONFIDENTIAL",
      ],
      button: "RUS",
      logo: "VISOTKI",
      about: "ABOUT US",
      events: "EVENTS",
      merch: "MERCH",
      faq: "CONTACTS",
      eventsTitle: "EVENTS",
    },
  };

  // Полные данные для всех постеров
  const eventsData = {
    "1-1": {
      title: {
        rus: "МАЙ, 2023",
        eng: "MAY, 2023",
      },
      description: {
        rus: "Ежегодное пополнение кадрового состава компании",
        eng: "Annual replenishment of the company's personnel",
      },
      posters: [
        "./img/poster1:1.svg",
        "./img/poster1:2.svg",
        "./img/poster1:3.svg",
      ],
    },
    "1-2": {
      title: {
        rus: "МАЙ, 2023",
        eng: "MAY, 2023",
      },
      description: {
        rus: "Ежегодное пополнение кадрового состава компании",
        eng: "Annual replenishment of the company's personnel",
      },
      posters: [
        "./img/poster1:2.svg",
        "./img/poster1:1.svg",
        "./img/poster1:3.svg",
      ],
    },
    "1-3": {
      title: {
        rus: "МАЙ, 2023",
        eng: "MAY, 2023",
      },
      description: {
        rus: "Ежегодное пополнение кадрового состава компании",
        eng: "Annual replenishment of the company's personnel",
      },
      posters: [
        "./img/poster1:3.svg",
        "./img/poster1:1.svg",
        "./img/poster1:2.svg",
      ],
    },
    "2-1": {
      title: {
        rus: "НОЯБРЬ, 2025",
        eng: "NOVEMBER, 2025",
      },
      description: {
        rus: "Лекция: «От выхода на рынок к лидерству: как построить долгосрочный успех»",
        eng: "Lecture: «From market entry to leadership: how to build long-term success»",
      },
      posters: [
        "./img/poster2:1.svg",
        "./img/poster2:2.svg",
        "./img/poster2:3.svg",
      ],
    },
    "2-2": {
      title: {
        rus: "НОЯБРЬ, 2025",
        eng: "NOVEMBER, 2025",
      },
      description: {
        rus: "Лекция: «От выхода на рынок к лидерству: как построить долгосрочный успех»",
        eng: "Lecture: «From market entry to leadership: how to build long-term success»",
      },
      posters: [
        "./img/poster2:2.svg",
        "./img/poster2:1.svg",
        "./img/poster2:3.svg",
      ],
    },
    "2-3": {
      title: {
        rus: "НОЯБРЬ, 2025",
        eng: "NOVEMBER, 2025",
      },
      description: {
        rus: "Лекция: «От выхода на рынок к лидерству: как построить долгосрочный успех»",
        eng: "Lecture: «From market entry to leadership: how to build long-term success»",
      },
      posters: [
        "./img/poster2:3.svg",
        "./img/poster2:1.svg",
        "./img/poster2:2.svg",
      ],
    },
    "3-1": {
      title: {
        rus: "ИЮЛЬ, 2024",
        eng: "JULY, 2024",
      },
      description: {
        rus: "Интерактивный воркшоп по пищевой химии: от изучения состава мёда до создания его аналога",
        eng: "Interactive workshop on food chemistry: from studying honey composition to creating its analogue",
      },
      posters: [
        "./img/poster3:1.svg",
        "./img/poster3:2.svg",
        "./img/poster3:3.svg",
      ],
    },
    "3-2": {
      title: {
        rus: "ИЮЛЬ, 2024",
        eng: "JULY, 2024",
      },
      description: {
        rus: "Интерактивный воркшоп по пищевой химии: от изучения состава мёда до создания его аналога",
        eng: "Interactive workshop on food chemistry: from studying honey composition to creating its analogue",
      },
      posters: [
        "./img/poster3:2.svg",
        "./img/poster3:1.svg",
        "./img/poster3:3.svg",
      ],
    },
    "3-3": {
      title: {
        rus: "ИЮЛЬ, 2024",
        eng: "JULY, 2024",
      },
      description: {
        rus: "Интерактивный воркшоп по пищевой химии: от изучения состава мёда до создания его аналога",
        eng: "Interactive workshop on food chemistry: from studying honey composition to creating its analogue",
      },
      posters: [
        "./img/poster3:3.svg",
        "./img/poster3:1.svg",
        "./img/poster3:2.svg",
      ],
    },
    "4-1": {
      title: {
        rus: "ЯНВАРЬ, 2025",
        eng: "JANUARY, 2025",
      },
      description: {
        rus: "«Научимся у природы»: интерактивный мастер-класс по созданию съедобных сот",
        eng: "«Learning from nature»: interactive master class on creating edible honeycombs",
      },
      posters: [
        "./img/poster4:1.svg",
        "./img/poster4:2.svg",
        "./img/poster4:3.svg",
      ],
    },
    "4-2": {
      title: {
        rus: "ЯНВАРЬ, 2025",
        eng: "JANUARY, 2025",
      },
      description: {
        rus: "«Научимся у природы»: интерактивный мастер-класс по созданию съедобных сот",
        eng: "«Learning from nature»: interactive master class on creating edible honeycombs",
      },
      posters: [
        "./img/poster4:2.svg",
        "./img/poster4:1.svg",
        "./img/poster4:3.svg",
      ],
    },
    "4-3": {
      title: {
        rus: "ЯНВАРЬ, 2025",
        eng: "JANUARY, 2025",
      },
      description: {
        rus: "«Научимся у природы»: интерактивный мастер-класс по созданию съедобных сот",
        eng: "«Learning from nature»: interactive master class on creating edible honeycombs",
      },
      posters: [
        "./img/poster4:3.svg",
        "./img/poster4:1.svg",
        "./img/poster4:2.svg",
      ],
    },
    "5-1": {
      title: {
        rus: "АПРЕЛЬ, 2025",
        eng: "APRIL, 2025",
      },
      description: {
        rus: "Инновационный воркшоп: от разработки продукта до создания успешной рекламной кампании",
        eng: "Innovative workshop: from product development to creating a successful advertising campaign",
      },
      posters: [
        "./img/poster5:1.svg",
        "./img/poster5:2.svg",
        "./img/poster5:3.svg",
      ],
      link: "https://evelishka228.github.io/my_second_project/",
    },
    "5-2": {
      title: {
        rus: "АПРЕЛЬ, 2025",
        eng: "APRIL, 2025",
      },
      description: {
        rus: "Инновационный воркшоп: от разработки продукта до создания успешной рекламной кампании",
        eng: "Innovative workshop: from product development to creating a successful advertising campaign",
      },
      posters: [
        "./img/poster5:1.svg",
        "./img/poster5:2.svg",
        "./img/poster5:3.svg",
      ],
      link: "https://evelishka228.github.io/my_second_project/",
    },
    "5-3": {
      title: {
        rus: "АПРЕЛЬ, 2025",
        eng: "APRIL, 2025",
      },
      description: {
        rus: "Инновационный воркшоп: от разработки продукта до создания успешной рекламной кампании",
        eng: "Innovative workshop: from product development to creating a successful advertising campaign",
      },
      posters: [
        "./img/poster5:1.svg",
        "./img/poster5:2.svg",
        "./img/poster5:3.svg",
      ],
      link: "https://evelishka228.github.io/my_second_project/",
    },
  };

  let currentLanguage = "rus";
  const beeElement = document.getElementById("bee");
  const textElement = document.getElementById("text");
  const preloader = document.querySelector(".preloader");
  const languageToggle = document.getElementById("languageToggle");
  const firstScreen = document.getElementById("firstScreen");
  const finalBee = document.querySelector(".final-bee");
  const finalText = document.querySelector(".final-text");
  const textLines = document.querySelectorAll(".text-line");
  const eventsLink = document.querySelector('.nav-link[data-i18n="events"]');

  // Элементы для всплывающей плашки
  const eventDetail = document.getElementById("eventDetail");
  const eventTitle = document.getElementById("eventTitle");
  const eventDescription = document.getElementById("eventDescription");
  const eventPosters = document.getElementById("eventPosters");
  const closeDetail = document.getElementById("closeDetail");
  let currentEventData = null;

  // Добавляем обработчик для ссылки "Контакты"
  const contactsLink = document.querySelector('.nav-link[data-i18n="faq"]');
  if (contactsLink) {
    contactsLink.addEventListener("click", function (e) {
      // Проверяем, не нажата ли уже активная ссылка
      if (!this.classList.contains("active")) {
        e.preventDefault();
        window.location.href = "contacts.html";
      }
    });
  }

  function updateEventDetail(event) {
    if (!eventTitle || !eventDescription || !eventPosters) return;

    eventTitle.textContent = event.title[currentLanguage];

    // Очищаем содержимое
    eventDescription.innerHTML = "";

    // Проверяем, нужно ли сделать описание ссылкой
    const isAnnualRecruitmentPoster = event.posters.some(
      (poster) =>
        poster.includes("poster1:1.svg") ||
        poster.includes("poster1:2.svg") ||
        poster.includes("poster1:3.svg")
    );

    // Проверяем, нужно ли добавить подчеркивание и ссылку для инновационного воркшопа
    const isInnovativeWorkshopPoster = event.posters.some(
      (poster) =>
        poster.includes("poster5:1.svg") ||
        poster.includes("poster5:2.svg") ||
        poster.includes("poster5:3.svg")
    );

    if (isAnnualRecruitmentPoster) {
      // Создаем ссылку для ежегодного набора
      const link = document.createElement("a");
      link.href = "https://evelishka228.github.io/my_third_project/";
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = event.description[currentLanguage];
      link.style.color = "#fff";
      link.style.textDecoration = "underline";
      link.style.textUnderlineOffset = "3px";
      link.style.textDecorationThickness = "1px";
      link.style.fontFamily = '"Inter", sans-serif';
      link.style.transition = "text-decoration-color 0.3s ease";
      eventDescription.appendChild(link);
    } else if (isInnovativeWorkshopPoster) {
      // Создаем ссылку для инновационного воркшопа
      const link = document.createElement("a");
      link.href = "https://evelishka228.github.io/my_second_project/";
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = event.description[currentLanguage];
      link.style.color = "#fff";
      link.style.textDecoration = "underline";
      link.style.textUnderlineOffset = "3px";
      link.style.textDecorationThickness = "1px";
      link.style.fontFamily = '"Inter", sans-serif';
      link.style.transition = "text-decoration-color 0.3s ease";
      eventDescription.appendChild(link);
    } else {
      // Обычный текст для остальных событий
      eventDescription.textContent = event.description[currentLanguage];
      eventDescription.style.fontFamily = '"Inter", sans-serif';
      eventDescription.style.textDecoration = "none";
    }

    // Остальной код функции остается без изменений
    eventPosters.innerHTML = "";

    const sortedPosters = [...event.posters].sort((a, b) => {
      const getPosterNumber = (filename) => {
        const match = filename.match(/:(\d+)\./);
        return match ? parseInt(match[1]) : 0;
      };
      return getPosterNumber(a) - getPosterNumber(b);
    });

    const postersContainer = document.createElement("div");
    postersContainer.style.display = "flex";
    postersContainer.style.gap = "20px";
    postersContainer.style.justifyContent = "center";
    postersContainer.style.alignItems = "center";
    postersContainer.style.width = "100%";
    postersContainer.style.overflowX = "auto";
    postersContainer.style.padding = "10px 0";

    sortedPosters.forEach((poster) => {
      const img = document.createElement("img");
      img.src = poster;
      img.alt = `${event.title[currentLanguage]} ${
        poster.match(/:(\d+)\./)[1]
      }`;
      img.style.maxHeight = "300px";
      img.style.width = "auto";
      img.style.objectFit = "contain";
      img.style.flexShrink = "0";
      postersContainer.appendChild(img);
    });

    eventPosters.appendChild(postersContainer);
  }

  function showEventDetail(event) {
    if (!eventDetail) return;

    currentEventData = event;

    // Создаем копию события с правильно отсортированными постерами
    const sortedEvent = {
      ...event,
      posters: [...event.posters].sort((a, b) => {
        const getPosterNumber = (filename) => {
          const match = filename.match(/:(\d+)\./);
          return match ? parseInt(match[1]) : 0;
        };
        return getPosterNumber(a) - getPosterNumber(b);
      }),
    };

    updateEventDetail(sortedEvent);
    document.body.classList.add("detail-open");
    eventDetail.classList.add("active");
  }

  function initPosters() {
    const posterItems = document.querySelectorAll(".poster-item");
    if (!posterItems.length) return;

    posterItems.forEach((poster) => {
      const img = poster.querySelector("img");
      if (!img) return;

      // Улучшенное извлечение ID постера
      const getPosterId = (altText) => {
        const match = altText.match(/(\d+)[:\-](\d+)/);
        if (match) {
          return `${match[1]}-${match[2]}`;
        }
        return null;
      };

      img.addEventListener("click", function () {
        const posterId = getPosterId(this.alt);
        console.log("Clicked poster ID:", posterId);

        if (posterId && eventsData[posterId]) {
          showEventDetail(eventsData[posterId]);
        } else {
          console.warn(
            "No data for poster:",
            this.alt,
            "Extracted ID:",
            posterId
          );
          console.log("Available poster IDs:", Object.keys(eventsData));
        }
      });

      // Эффекты при наведении
      poster.addEventListener("mouseenter", () => {
        // Удаляем все классы hover у всех постеров
        posterItems.forEach((item) => {
          item.classList.remove(
            "active-hover",
            "hover-left-1",
            "hover-left-2",
            "hover-left-3",
            "hover-right-1",
            "hover-right-2",
            "hover-right-3"
          );
        });

        // Добавляем класс активному постеру
        poster.classList.add("active-hover");

        // Обрабатываем постеры слева
        let prev = poster.previousElementSibling;
        let distance = 1;
        while (prev && distance <= 3) {
          prev.classList.add(`hover-left-${distance}`);
          prev = prev.previousElementSibling;
          distance++;
        }

        // Обрабатываем постеры справа
        let next = poster.nextElementSibling;
        distance = 1;
        while (next && distance <= 3) {
          next.classList.add(`hover-right-${distance}`);
          next = next.nextElementSibling;
          distance++;
        }
      });

      poster.addEventListener("mouseleave", () => {
        // Удаляем все классы hover при уходе курсора
        posterItems.forEach((item) => {
          item.classList.remove(
            "active-hover",
            "hover-left-1",
            "hover-left-2",
            "hover-left-3",
            "hover-right-1",
            "hover-right-2",
            "hover-right-3"
          );
        });
      });
    });

    const posterContainer = document.querySelector(".poster-scroll-container");
    if (posterContainer) {
      posterContainer.addEventListener(
        "wheel",
        (e) => {
          if (e.deltaY !== 0) {
            e.preventDefault();
            posterContainer.scrollLeft += e.deltaY + e.deltaX;
          }
        },
        { passive: false }
      );
    }
  }

  function updatePageContent() {
    if (languageToggle) {
      languageToggle.textContent = translations[currentLanguage].button;
    }

    const logoElement = document.querySelector(".logo");
    if (logoElement) {
      logoElement.textContent = translations[currentLanguage].logo;
    }

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (translations[currentLanguage][key]) {
        el.textContent = translations[currentLanguage][key];
      }
    });

    if (finalText) {
      finalText.textContent = translations[currentLanguage].stages
        .map((stage) => stage.text)
        .join(" ");
    }

    if (finalBee) {
      finalBee.src = translations[currentLanguage].stages[2].image;
    }

    const eventsTitle = document.querySelector('[data-i18n="eventsTitle"]');
    if (eventsTitle) {
      eventsTitle.textContent = translations[currentLanguage].eventsTitle;
    }

    if (
      eventDetail &&
      eventDetail.classList.contains("active") &&
      currentEventData
    ) {
      updateEventDetail(currentEventData);
    }

    if (textLines.length > 0) {
      translations[currentLanguage].additionalText.forEach((text, index) => {
        if (textLines[index]) {
          const words = text.split(" ");
          const duplicatedWords = [];
          // Увеличиваем количество повторений для более плавной анимации
          for (let i = 0; i < 20; i++) {
            duplicatedWords.push(...words);
          }

          textLines[index].innerHTML = duplicatedWords
            .map((word) => `<span data-word="${word}">${word}</span>`)
            .join("");

          const spans = textLines[index].querySelectorAll("span");
          spans.forEach((span) => {
            span.style.margin = "0 40px";
            span.style.position = "relative";
            span.style.top = "0.1em";
          });

          // Обновите обработчики внутри цикла spans:
          spans.forEach((span) => {
            span.addEventListener("mouseenter", (e) => {
              const word = span.dataset.word;
              const rect = span.getBoundingClientRect();

              // Сначала скрываем все изображения
              document
                .querySelectorAll(".hover-image-container")
                .forEach((c) => {
                  c.style.opacity = "0";
                  c.style.zIndex = "0";
                });

              // Выбираем нужное изображение
              let container = null;
              if (word === "МАСШТАБНО" || word === "SCALED") {
                container = hoverImage1.parentElement;
              } else if (word === "КРЕАТИВНО" || word === "CREATIVE") {
                container = hoverImage2.parentElement;
              } else if (word === "ТЕХНОЛОГИЧНО" || word === "TECHNOLOGICAL") {
                container = hoverImage3.parentElement;
              } else if (word === "ИННОВАЦИОННО" || word === "INNOVATIVE") {
                container = hoverImage4.parentElement;
              }

              if (container) {
                // Позиционируем контейнер
                container.style.left = `${
                  rect.left + window.scrollX + rect.width / 2
                }px`;
                container.style.top = `${
                  rect.top + window.scrollY + rect.height / 2
                }px`;
                container.style.width = `${rect.width * 1.5}px`;
                container.style.height = `${rect.height * 1.5}px`;
                container.style.opacity = "1";
                container.style.zIndex = "999"; // показываем поверх текста
              }

              // Делаете слово прозрачным с обводкой
              span.style.color = "transparent";
              span.style.webkitTextStroke = "1.2px #fff";
            });

            span.addEventListener("mouseleave", () => {
              // Скрываем все изображения
              document
                .querySelectorAll(".hover-image-container")
                .forEach((c) => {
                  c.style.opacity = "0";
                  c.style.zIndex = "0";
                });
              // Восстанавливаем стиль слова
              span.style.color = "";
              span.style.webkitTextStroke = "";
            });
          });
        }
      });

      setTimeout(() => {
        document.querySelectorAll(".text-line").forEach((line, i) => {
          // Увеличиваем длительность анимации для более плавного движения
          line.style.animation = `${
            i % 2 === 0 ? "moveRight" : "moveLeft"
          } 100s linear infinite`;
        });
      }, 50);
    }
  }

  if (eventsLink) {
    eventsLink.addEventListener("click", function (e) {
      e.preventDefault();
      window.location.href = "events.html";
    });
  }

  function toggleLanguage() {
    currentLanguage = currentLanguage === "rus" ? "eng" : "rus";
    updatePageContent();
  }

  if (languageToggle) {
    languageToggle.addEventListener("click", toggleLanguage);
  }

  function handleScrollAnimation() {
    const triggerPoint = window.innerHeight / 1.2;

    textLines.forEach((line, index) => {
      if (!line) return;

      const lineTop = line.getBoundingClientRect().top;

      if (lineTop < triggerPoint) {
        setTimeout(() => {
          line.classList.add("visible");
        }, index * 200);
      }
    });
  }

  if (closeDetail) {
    closeDetail.addEventListener("click", function () {
      document.body.classList.remove("detail-open");
      if (eventDetail) {
        eventDetail.classList.remove("active");
      }
    });
  }

  if (eventDetail) {
    eventDetail.addEventListener("click", function (e) {
      if (e.target === this) {
        document.body.classList.remove("detail-open");
        this.classList.remove("active");
      }
    });
  }

  // Создаем 404 страницу
  function show404Page() {
    const page404 = document.createElement("div");
    page404.id = "page404";
    page404.style.position = "fixed";
    page404.style.top = "0";
    page404.style.left = "0";
    page404.style.width = "100%";
    page404.style.height = "100%";
    page404.style.backgroundColor = "#000";
    page404.style.display = "flex";
    page404.style.justifyContent = "center";
    page404.style.alignItems = "center";
    page404.style.zIndex = "9999";

    const number404 = document.createElement("div");
    number404.textContent = "404";
    number404.style.fontFamily = '"BebasNeueBold", sans-serif';
    number404.style.fontSize = "30vw";
    number404.style.color = "#fff";
    number404.style.lineHeight = "0.8";

    page404.appendChild(number404);
    document.body.appendChild(page404);

    // Закрытие по клику
    page404.addEventListener("click", function () {
      document.body.removeChild(page404);
    });
  }

  window.addEventListener("load", () => {
    document.body.classList.add("loaded");

    if (preloader) {
      setTimeout(() => {
        const mainHeader = document.querySelector(".main-header");
        const langSwitcher = document.querySelector(".lang-switcher");

        if (mainHeader) mainHeader.style.display = "flex";
        if (langSwitcher) langSwitcher.style.display = "block";
      }, 1000);
    } else {
      const mainHeader = document.querySelector(".main-header");
      const langSwitcher = document.querySelector(".lang-switcher");

      if (mainHeader) {
        mainHeader.style.opacity = "1";
        mainHeader.style.transform = "translateY(0)";
      }
      if (langSwitcher) {
        langSwitcher.style.opacity = "1";
        langSwitcher.style.transform = "translateY(0)";
      }
    }
    // Обработка перехода по ссылке "МЕРЧ" через JS
    const merchLink = document.querySelector('.nav-link[data-i18n="merch"]');
    if (merchLink) {
      merchLink.addEventListener("click", function (e) {
        e.preventDefault();
        window.location.href = "merch.html";
      });
    }

    updatePageContent();
    initPosters();

    if (textLines.length > 0) {
      window.addEventListener("scroll", handleScrollAnimation);
      handleScrollAnimation();
    }
  });

  async function animateLoader() {
    if (!preloader) return;

    let currentStage = 0;

    function showNextStage() {
      if (currentStage >= translations[currentLanguage].stages.length) {
        preloader.classList.add("final-state");
        document.body.classList.add("dark-background");
        if (firstScreen) firstScreen.style.display = "flex";

        setTimeout(() => {
          preloader.style.display = "none";
        }, 1000);

        return;
      }

      if (beeElement) {
        beeElement.src =
          translations[currentLanguage].stages[currentStage].image;
        beeElement.style.opacity = "1";
      }

      if (textElement) {
        textElement.innerHTML = "";
        for (let i = 0; i <= currentStage; i++) {
          const wordSpan = document.createElement("span");
          wordSpan.className = "word";
          wordSpan.textContent = translations[currentLanguage].stages[i].text;
          textElement.appendChild(wordSpan);
        }
        textElement.style.opacity = "1";
      }

      currentStage++;
      setTimeout(showNextStage, 1000);
    }

    setTimeout(showNextStage, 300);
  }

  if (preloader) {
    animateLoader();
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const merchItems = document.querySelectorAll(".merch-item");
  const merchDetailView = document.getElementById("merchDetailView");
  const detailImage = merchDetailView.querySelector(".detail-image");
  const detailDescription = merchDetailView.querySelector(
    ".detail-description"
  );

  merchItems.forEach((item) => {
    item.addEventListener("click", function () {
      const imgSrc = this.getAttribute("data-img");
      const description = this.getAttribute("data-description");

      detailImage.src = `./img/${imgSrc}`;
      detailImage.alt = "";
      detailDescription.innerHTML = description; // Изменено с textContent на innerHTML

      merchDetailView.classList.add("active");
    });
  });

  merchDetailView.addEventListener("click", function (e) {
    if (e.target === this) {
      this.classList.remove("active");
    }
  });
});
