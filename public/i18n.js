
document.addEventListener("DOMContentLoaded", () => {
  const languageSwitcher = document.getElementById("languageSwitcher");

  const supportedLanguages = ["ar", "fr", "en", "es", "de", "nl"];

  function changeLanguage(language) {
    if (!supportedLanguages.includes(language)) {
      language = "ar";
    }

    // ترجمة النصوص اللي داخل HTML
    document.querySelectorAll("[data-" + language + "]").forEach(element => {
      // ما نمسحوش العناصر الداخلية بحال span و small
      if (element.children.length === 0) {
        element.textContent = element.getAttribute("data-" + language);
      }
    });

    // ترجمة النصوص البديلة ديال الصور
    document.querySelectorAll("[data-" + language + "-alt]").forEach(element => {
      element.alt = element.getAttribute("data-" + language + "-alt");
    });

    // ترجمة placeholders
    document.querySelectorAll("[data-" + language + "-placeholder]").forEach(element => {
      element.placeholder = element.getAttribute("data-" + language + "-placeholder");
    });

    // ترجمة title
    document.querySelectorAll("[data-" + language + "-title]").forEach(element => {
      element.title = element.getAttribute("data-" + language + "-title");
    });

    // تغيير اتجاه الصفحة
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";

    // حفظ اللغة المختارة
    localStorage.setItem("rifBiteLanguage", language);

    // تحديث select ديال اللغة
    if (languageSwitcher) {
      languageSwitcher.value = language;
    }

    // إشعار script.js باش يعاود يعرض المنتجات والسلة
    document.dispatchEvent(
      new CustomEvent("rifBiteLanguageChanged", {
        detail: { language }
      })
    );
  }

  // تبديل اللغة ملي المستخدم يختار لغة أخرى
  if (languageSwitcher) {
    languageSwitcher.addEventListener("change", event => {
      changeLanguage(event.target.value);
    });
  }

  // استرجاع آخر لغة اختارها المستخدم
  const savedLanguage = localStorage.getItem("rifBiteLanguage") || "ar";
  changeLanguage(savedLanguage);
});
