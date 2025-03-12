export function saveCards() {
  const columns = document.querySelectorAll(".cards");
  const data = {};

  columns.forEach((column) => {
    const cards = Array.from(column.children).map(
      (card) => card.querySelector(".card-content").textContent,
    );

    data[`column_${column.parentElement.dataset.id}`] = cards;
  });

  localStorage.setItem("data", JSON.stringify(data));
}
