document.addEventListener("DOMContentLoaded", function () {
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
  const hoverImage1 = document.getElementById("hoverImage1");
  const hoverImage2 = document.getElementById("hoverImage2");
  const hoverImage3 = document.getElementById("hoverImage3");
  const hoverImage4 = document.getElementById("hoverImage4");

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

    translations[currentLanguage].additionalText.forEach((text, index) => {
      if (textLines[index]) {
        const words = text.split(" ");
        const duplicatedWords = [];
        for (let i = 0; i < 10; i++) {
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

          span.addEventListener("mouseenter", (e) => {
            const word = span.dataset.word;
            const rect = span.getBoundingClientRect();
            let hoverImage = null;

            // Определяем какое изображение показывать
            if (word === "МАСШТАБНО" || word === "SCALED")
              hoverImage = hoverImage1;
            else if (word === "КРЕАТИВНО" || word === "CREATIVE")
              hoverImage = hoverImage2;
            else if (word === "ТЕХНОЛОГИЧНО" || word === "TECHNOLOGICAL")
              hoverImage = hoverImage3;
            else if (word === "ИННОВАЦИОННО" || word === "INNOVATIVE")
              hoverImage = hoverImage4;

            if (hoverImage) {
              const container = hoverImage.parentElement;
              container.style.left = `${rect.left}px`;
              container.style.top = `${rect.top}px`;
              container.style.width = `${rect.width}px`;
              container.style.height = `${rect.height}px`;
              container.style.opacity = "1";
              container.style.zIndex = "-1";

              // Центрируем изображение
              hoverImage.style.left = "50%";
              hoverImage.style.top = "50%";
              hoverImage.style.transform = "translate(-50%, -50%)";
            }

            // Пауза анимации только для текущей строки
            e.target.closest(".text-line").style.animationPlayState = "paused";
            span.style.color = "transparent";
            span.style.webkitTextStroke = "1.2px #fff";
          });

          span.addEventListener("mouseleave", () => {
            document
              .querySelectorAll(".hover-image-container")
              .forEach((container) => {
                container.style.opacity = "0";
              });
            textLines[index].style.animationPlayState = "running";
            span.style.color = "";
            span.style.webkitTextStroke = "";
          });
        });
      }
    });

    setTimeout(() => {
      document.querySelectorAll(".text-line").forEach((line, i) => {
        line.style.animation = `${
          i % 2 === 0 ? "moveRight" : "moveLeft"
        } 50s linear infinite`;
      });
    }, 50);
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
      const lineTop = line.getBoundingClientRect().top;

      if (lineTop < triggerPoint) {
        setTimeout(() => {
          line.classList.add("visible");
        }, index * 200);
      }
    });
  }

  window.addEventListener("load", () => {
    document.body.classList.add("loaded");

    setTimeout(() => {
      document.querySelector(".main-header").style.display = "flex";
      document.querySelector(".lang-switcher").style.display = "block";
    }, 1000);

    updatePageContent();
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
          textElement.appendChild(wordSpan);
        }
        textElement.style.opacity = "1";
      }

      currentStage++;
      setTimeout(showNextStage, 1000);
    }

    showNextStage();
  }

  setTimeout(animateLoader, 300);
});
