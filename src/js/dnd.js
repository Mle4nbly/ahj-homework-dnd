let currentCard;
let cardShadow;

let offsetX, offsetY;
let cardWidth, cardHeight;

export function onMouseDown(e) {
  if (e.target.classList.contains("cross")) {
    return;
  }

  currentCard = e.target;

  cardWidth = currentCard.offsetWidth;
  cardHeight = currentCard.offsetHeight;

  currentCard.classList.add("dragged");

  currentCard.style.width = cardWidth - 16 + "px";
  currentCard.style.height = cardHeight - 16 + "px";

  offsetX = e.clientX - currentCard.getBoundingClientRect().left;
  offsetY = e.clientY - currentCard.getBoundingClientRect().top;

  cardShadow = createShadow(currentCard);

  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);
}

function onMouseMove(e) {
  currentCard.style.top = e.clientY - offsetY - 16 + "px";
  currentCard.style.left = e.clientX - offsetX - 8 + "px";

  let shadowRect = cardShadow.getBoundingClientRect();
  if (
    e.clientY > shadowRect.top &&
    e.clientY < shadowRect.bottom &&
    e.clientX > shadowRect.left &&
    e.clientX < shadowRect.right
  ) {
    return;
  }

  const cardAll = document.querySelectorAll(".card");
  let targetCard = getTarget(cardAll, e);

  if (targetCard) {
    const rect = targetCard.getBoundingClientRect();

    if (e.clientY < rect.top + rect.height / 2) {
      cardShadow.remove();

      targetCard.insertAdjacentElement("beforebegin", cardShadow);
    } else if (e.clientY > rect.top + rect.height / 2) {
      cardShadow.remove();

      targetCard.insertAdjacentElement("afterend", cardShadow);
    }
  } else {
    const columns = document.querySelectorAll(".column");

    let targetColumn = getTarget(columns, e);

    if (targetColumn) {
      if (!targetColumn.querySelector(".shadow")) {
        const cards = targetColumn.querySelector(".cards");

        cardShadow.remove();
        cards.appendChild(cardShadow);
      }

      return;
    }
  }
}

function onMouseUp() {
  cardShadow.insertAdjacentElement("afterend", currentCard);
  cardShadow.remove();
  cardShadow = undefined;

  currentCard.classList.remove("dragged");

  currentCard.style.width = "";
  currentCard.style.height = "";

  currentCard.style.top = "";
  currentCard.style.left = "";

  currentCard = undefined;

  document.removeEventListener("mousemove", onMouseMove);
  document.removeEventListener("mouseup", onMouseUp);
}

function createShadow(card) {
  const shadow = document.createElement("div");
  shadow.className = "card shadow";
  shadow.style.height = card.style.height;

  return shadow;
}

function getTarget(elements, event) {
  for (const el of elements) {
    const rect = el.getBoundingClientRect();

    if (
      event.clientY > rect.top &&
      event.clientY < rect.bottom &&
      event.clientX > rect.left &&
      event.clientX < rect.right &&
      el != currentCard
    ) {
      return el;
    }
  }

  return undefined;
}
