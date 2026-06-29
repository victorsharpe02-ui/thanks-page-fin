
// Function to fetch language data
async function fetchLanguageData(lang) {
    const response = await fetch(`languages/${lang}.json`);
    return response.json();
}

// Function to set the language preference
function setLanguagePreference(lang) {
    localStorage.setItem("language", lang);
    location.reload();
}

// Function to update content based on selected language
function updateContent(langData) {
    document.querySelectorAll("[data-i18n]").forEach((element) => {
        const key = element.getAttribute("data-i18n");

        if (element.tagName === "INPUT" && key === "placeholder_text") {
            // If the element is an input with placeholder_text attribute, set placeholder
            element.placeholder = langData[key];
        } else {
            // For other elements, set text content
            //element.textContent = langData[key];
            element.innerHTML = langData[key];
        }
    });
}

// Function to change language
async function changeLanguage(lang) {
    await setLanguagePreference(lang);

    const langData = await fetchLanguageData(lang);
    updateContent(langData);

    //
    toggleSpanishStylesheet(lang); // Toggle Arabic stylesheet
}

// Function to toggle Arabic stylesheet based on language selection
function toggleSpanishStylesheet(lang) {
    const head = document.querySelector("head");
    const link = document.querySelector("#styles-link");

    if (link) {
        head.removeChild(link); // Remove the old stylesheet link
    } else if (lang === "es") {
        const newLink = document.createElement("link");
        newLink.id = "styles-link";
        newLink.rel = "stylesheet";
        newLink.href = "./assets/css/new.css"; // Path to Arabic stylesheet
        head.appendChild(newLink);
    }
}

function handleSelect(elm) {
    window.location = elm.value + "/new.css";
}


// Call updateContent() on page load
window.addEventListener("DOMContentLoaded", async () => {
    const userPreferredLanguage = localStorage.getItem("language") || "en";
    const langData = await fetchLanguageData(userPreferredLanguage);
    updateContent(langData);
    toggleSpanishStylesheet(userPreferredLanguage);
});
