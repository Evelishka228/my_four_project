document.addEventListener("DOMContentLoaded", function () {
  // Тексты на разных языках
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
      faq: "ВОПРОСЫ",
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
        "LARGE-SCALE SAFE",
      ],
      button: "RUS",
      logo: "VISOTKI",
      about: "ABOUT US",
      events: "EVENTS",
      merch: "MERCH",
      faq: "FAQ",
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

  // Функция для обновления контента на странице
  function updatePageContent() {
    // Обновляем кнопку переключения
    if (languageToggle) {
      languageToggle.textContent = translations[currentLanguage].button;
    }

    // Обновляем текст в шапке
    const logoElement = document.querySelector(".logo");
    if (logoElement) {
      logoElement.textContent = translations[currentLanguage].logo;
    }

    // Обновляем навигационные ссылки
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (translations[currentLanguage][key]) {
        el.textContent = translations[currentLanguage][key];
      }
    });

    // Обновляем основной текст на первом экране
    if (finalText) {
      finalText.textContent = translations[currentLanguage].stages
        .map((stage) => stage.text)
        .join(" ");
    }

    // Обновляем изображение пчелы
    if (finalBee) {
      finalBee.src = translations[currentLanguage].stages[2].image;
    }

    // Обновляем три строки текста
    translations[currentLanguage].additionalText.forEach((text, index) => {
      if (textLines[index]) {
        textLines[index].textContent = text;
      }
    });
  }

  // Функция для переключения языка
  function toggleLanguage() {
    currentLanguage = currentLanguage === "rus" ? "eng" : "rus";
    updatePageContent();
  }

  // Обработчик клика на кнопку
  if (languageToggle) {
    languageToggle.addEventListener("click", toggleLanguage);
  }

  // Анимация появления текста при скролле
  function handleScrollAnimation() {
    const triggerPoint = window.innerHeight / 1.2;

    textLines.forEach((line, index) => {
      const lineTop = line.getBoundingClientRect().top;

      if (lineTop < triggerPoint) {
        setTimeout(() => {
          line.classList.add("visible");
        }, index * 200);
      }
    });
  }

  // Инициализация при загрузке
  window.addEventListener("load", () => {
    // Показываем header и кнопку языка после прелоадера
    setTimeout(() => {
      document.querySelector(".main-header").style.display = "flex";
      document.querySelector(".lang-switcher").style.display = "block";
    }, 1000);

    // Инициализация текста
    updatePageContent();

    // Инициализация скролл-анимации
    window.addEventListener("scroll", handleScrollAnimation);
    handleScrollAnimation();
  });

  async function animateLoader() {
    let currentStage = 0;

    function showNextStage() {
      if (currentStage >= translations[currentLanguage].stages.length) {
        preloader.classList.add("final-state");
        document.body.classList.add("dark-background");
        firstScreen.style.display = "flex";

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
          if (i > 0) {
            wordSpan.style.marginLeft = "20px"; // Фиксируем расстояние между словами
          }
          textElement.appendChild(wordSpan);
        }
        textElement.style.opacity = "1";
      }

      currentStage++;
      setTimeout(showNextStage, 1000);
    }

    showNextStage();
  }

  // Запускаем анимацию после полной загрузки страницы
  setTimeout(animateLoader, 300);
});
