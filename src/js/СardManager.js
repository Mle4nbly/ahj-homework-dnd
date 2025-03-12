// import { initCard } from "./dnd.alternative.js";
import { saveCards } from "./localStorage.js";
import { onMouseDown } from "./dnd.js";

export default class CardManager {
  constructor(column) {
    this._column = column;
    this._cards = this._column.querySelector(".cards");

    this.onCross = this.onCross.bind(this);
    this.onCard = this.onCard.bind(this);

    this.loadCards();

    this._actualElement = undefined;
  }

  createCard(content, isRender) {
    const newCard = document.createElement("div");

    newCard.className = "card";
    // newCard.setAttribute('draggable', true);
    newCard.innerHTML = this.innerCard(content);

    this._cards.appendChild(newCard);

    newCard.addEventListener("mouseenter", this.onCard);
    newCard.querySelector(".cross").addEventListener("click", this.onCross);

    newCard.addEventListener("mousedown", onMouseDown);
    // initCard(newCard);

    if (isRender) {
      return;
    }

    saveCards();
  }

  removeCard(element) {
    element.remove();

    saveCards();
  }

  onCard(e) {
    e.target.querySelector(".cross").classList.remove("hidden");

    e.target.addEventListener("mouseleave", () => {
      e.target.querySelector(".cross").classList.add("hidden");
    });
  }

  onCross(e) {
    this.removeCard(e.target.parentElement);
  }

  innerCard(content) {
    return `
                <div class="card-content">${content}</div>
                <div class="cross hidden">✖</div>
            `;
  }

  loadCards() {
    const data = JSON.parse(localStorage.getItem(`data`)) || [];

    data[`column_${this._column.dataset.id}`].forEach((content) => {
      this.createCard(content, true);
    });
  }
}
