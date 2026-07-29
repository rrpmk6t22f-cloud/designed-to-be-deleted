const gate = document.querySelector("#access-gate");
const gateForm = document.querySelector("#gate-form");
const gatePassword = document.querySelector("#gate-password");
const gateError = document.querySelector("#gate-error");
const accessHash = "9c4e199e182ab4b8967b57ddda37fd47354f47bce56ffba86a33016b45820e89";
const accessKey = "dtbd-access";

function openGate() {
  document.body.classList.remove("gate-pending");
  document.body.classList.add("gate-open");
  gate?.setAttribute("aria-hidden", "true");
}

if (sessionStorage.getItem(accessKey) === "granted") {
  openGate();
} else {
  gatePassword?.focus();
}

gateForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const bytes = new TextEncoder().encode(gatePassword.value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  const candidate = [...new Uint8Array(digest)]
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");

  if (candidate === accessHash) {
    sessionStorage.setItem(accessKey, "granted");
    openGate();
    return;
  }

  gateError.hidden = false;
  gatePassword.value = "";
  gatePassword.setAttribute("aria-invalid", "true");
  gatePassword.focus();
});

const search = document.querySelector("#thesis-search");
const clear = document.querySelector("#clear-search");
const cards = [...document.querySelectorAll(".thesis-card")];
const count = document.querySelector("#result-count");
const empty = document.querySelector("#empty-state");
const filterButtons = [...document.querySelectorAll(".filter-button")];
const shareButton = document.querySelector(".share-button");
const sourceSearch = document.querySelector("#source-search");
const clearSourceSearch = document.querySelector("#clear-source-search");
const sourceRows = [...document.querySelectorAll("[data-source-row]")];
const sourceCount = document.querySelector("#source-count");
const sourceEmpty = document.querySelector("#source-empty");
let activeFilter = "all";

function filterCards() {
  const query = search?.value.trim().toLocaleLowerCase() ?? "";
  let visible = 0;
  cards.forEach((card) => {
    const matchesSearch = card.dataset.search.includes(query);
    const matchesPart = activeFilter === "all" || card.dataset.part === activeFilter;
    const match = matchesSearch && matchesPart;
    card.hidden = !match;
    if (match) visible += 1;
  });
  if (count) count.textContent = visible;
  if (empty) empty.hidden = visible !== 0;
}

search?.addEventListener("input", filterCards);
clear?.addEventListener("click", () => {
  search.value = "";
  filterCards();
  search.focus();
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    filterButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    filterCards();
  });
});

shareButton?.addEventListener("click", async () => {
  const label = shareButton.querySelector("span");
  const shareData = {
    title: shareButton.dataset.shareTitle,
    text: shareButton.dataset.shareText,
    url: window.location.href,
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
      return;
    }
    await navigator.clipboard.writeText(shareData.url);
    label.textContent = "Link copied";
    shareButton.classList.add("is-copied");
    window.setTimeout(() => {
      label.textContent = "Share thesis";
      shareButton.classList.remove("is-copied");
    }, 1800);
  } catch (error) {
    if (error.name !== "AbortError") {
      label.textContent = "Copy failed";
    }
  }
});

function filterSources() {
  const query = sourceSearch?.value.trim().toLocaleLowerCase() ?? "";
  let visible = 0;
  sourceRows.forEach((row) => {
    const match = row.dataset.search.includes(query);
    row.hidden = !match;
    if (match) visible += 1;
  });
  if (sourceCount) sourceCount.textContent = visible;
  if (sourceEmpty) sourceEmpty.hidden = visible !== 0;
}

sourceSearch?.addEventListener("input", filterSources);
clearSourceSearch?.addEventListener("click", () => {
  sourceSearch.value = "";
  filterSources();
  sourceSearch.focus();
});
