const search = document.querySelector("#thesis-search");
const clear = document.querySelector("#clear-search");
const cards = [...document.querySelectorAll(".thesis-card")];
const count = document.querySelector("#result-count");
const empty = document.querySelector("#empty-state");
const filterButtons = [...document.querySelectorAll(".filter-button")];
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
