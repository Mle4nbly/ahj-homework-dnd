import CardManager from "../js/СardManager.js";

export default class InputWidget {
  constructor(column) {
    this._column = column;
    this._manager = new CardManager(this._column);

    this.onCancel = this.onCancel.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this._widget = this.createWidget();
    this._column.appendChild(this._widget);
  }

  createWidget() {
    const widget = document.createElement("div");
    widget.className = "input-widget hidden";
    widget.innerHTML = this.innerWidget();

    return widget;
  }

  showWidget() {
    this._widget.classList.remove("hidden");

    this._widget
      .querySelector(".submit")
      .addEventListener("click", this.onSubmit);
    this._widget
      .querySelector(".cancel")
      .addEventListener("click", this.onCancel);
  }

  hideWidget() {
    this._widget
      .querySelector(".submit")
      .removeEventListener("click", this.onSubmit);
    this._widget
      .querySelector(".cancel")
      .removeEventListener("click", this.onCancel);

    this._widget.querySelector(".input-field").value = "";
    this._widget.classList.add("hidden");
    this._column.querySelector(".add-btn").classList.remove("hidden");
  }

  onCancel() {
    this.hideWidget();
  }

  onSubmit() {
    const inputField = this._widget.querySelector(".input-field");

    if (!inputField.value) {
      return;
    }

    this._manager.createCard(inputField.value);

    this.hideWidget();
  }

  innerWidget() {
    return `
            <textarea type="text" class="input-field" placeholder="Enter a title for this card..."></textarea>
            <div class="input-actions">
                <button class="submit">Add card</button>
                <button class="cancel">✖</button>
            </div>
        `;
  }
}
