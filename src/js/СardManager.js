// import { initCard } from "./dnd.alternative.js";
import { onMouseDown } from "./dnd.js";

export default class CardManager {
  constructor(column) {
    this._column = column;
    this._cards = this._column.querySelector(".cards");

    this.onCross = this.onCross.bind(this);
    this.onCard = this.onCard.bind(this);

    this._actualElement = undefined;
  }

  createCard(content) {
    const newCard = document.createElement("div");

    newCard.className = "card";
    // newCard.setAttribute('draggable', true);
    newCard.innerHTML = this.innerCard(content);

    this._cards.appendChild(newCard);

    newCard.addEventListener("mouseenter", this.onCard);
    newCard.querySelector(".cross").addEventListener("click", this.onCross);

    newCard.addEventListener("mousedown", onMouseDown);
    // initCard(newCard);
  }

  removeCard(element) {
    element.remove();
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
            ${content}
            <div class="cross hidden">✖</div>
        `;
  }
}
