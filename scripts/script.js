'use strict'

const fsm = new FSM()

document.querySelectorAll(".container__buttons__button").forEach(button => {
    button.addEventListener("click", () => {fsm.handleInput(button.dataset.value)});
});