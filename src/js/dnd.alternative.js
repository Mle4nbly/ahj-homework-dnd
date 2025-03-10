let currentCard = undefined;
let currentShadow = undefined;

function onDragStart(e) {
  e.target.classList.add("dragged");
  currentCard = e.target;

  currentShadow = document.createElement("div");
  currentShadow.className = "card shadow";
  currentShadow.style.width = currentCard.style.width;
  currentShadow.style.height = currentCard.style.height;

  setTimeout(() => {
    e.target.classList.add("hidden");
  }, 0);
}

function onDragEnd(e) {
  e.target.className = "card";

  currentShadow.remove();
  currentShadow = undefined;
  currentCard = undefined;
}

function onDrop() {
  if (currentShadow) {
    currentShadow.insertAdjacentElement("beforebegin", currentCard);

    return;
  }
}

function onDragEnter(e) {
  if (e.target == currentShadow) {
    return;
  }

  const column = e.target.closest(".column");
  const cards = column.querySelector(".cards");
  const card = e.target.closest(".card");

  if (card) {
    const cardRect = card.getBoundingClientRect();

    if (e.clientY < cardRect.top + cardRect.height / 2) {
      currentShadow.remove();

      card.insertAdjacentElement("beforebegin", currentShadow);
    } else {
      currentShadow.remove();

      card.insertAdjacentElement("afterend", currentShadow);
    }

    return;
  }

  if (!column.querySelector(".shadow")) {
    currentShadow.remove();
    cards.appendChild(currentShadow);
  }

  return;
}

function onDragOver(e) {
  e.preventDefault();
}

export function initCard(card) {
  card.addEventListener("dragstart", onDragStart);
  card.addEventListener("dragend", onDragEnd);
}

export function initColumn(column) {
  column.addEventListener("dragover", onDragOver);
  column.addEventListener("dragenter", onDragEnter);
  column.addEventListener("drop", onDrop);
}
