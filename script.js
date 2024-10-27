document.querySelector("input").readOnly = true;

document.querySelectorAll(".container__buttons__button").forEach(button => {
    button.addEventListener("click", () => {
        document.querySelector("input").value += button.dataset.value;
    });
});