import InputWidget from "../components/InputWidget.js";
import { initColumn } from "./dnd.alternative.js"

const columns = document.querySelectorAll('.column');
let currentWidget = undefined;

columns.forEach((column) => {
    const inputWidget = new InputWidget(column);
    const button = column.querySelector('.add-btn')

    // initColumn(column);

    button.addEventListener('click', () => {
        if (currentWidget) {
            currentWidget.hideWidget();
        }

        button.classList.add('hidden');
        inputWidget.showWidget();
        currentWidget = inputWidget;
    });
})

