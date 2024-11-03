'use strict'

class FSM
{
    constructor() 
    {
        this.states = Object.freeze({
            EMPTY : 0,
            NUM : 1,
            SIGN : 2
        })
        this.signs = ["+", "-", "/", "*"]
        this.numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."]
        this.inputElement = document.querySelector(".container__form__input")

        this.state = this.states.EMPTY
    }

    handleInput(input)
    {
        if(this.numbers.includes(input))
        {
            this.handleNumber(input)
        }
        else if(this.signs.includes(input))
        {
            this.handleSign(input)
        }
        else if(input === "=")
        {
            this.inputElement.innerHTML = new Function('return ' + this.inputElement.textContent)().toString()
            this.state = this.states.NUM
        }
        else if(input === "C")
        {
            this.inputElement.innerHTML = ""
            this.state = this.states.EMPTY
        }
    }

    handleSign(input)
    {
        switch(this.state)
        {
            case this.states.SIGN:
                break
            case this.states.EMPTY:
                break
            default:
                this.inputElement.innerHTML = `<span style="opacity: 0.3">${this.inputElement.innerHTML}</span>${input}`
                break
        }
        this.state = this.states.SIGN
    }

    handleNumber(input)
    {
        switch(this.state)
        {
            case this.states.NUM:
                this.inputElement.innerHTML += input
                break
            default:
                this.inputElement.innerHTML = `<span style="opacity: 0.3">${this.inputElement.innerHTML}</span>${input}`
                break
        }
        this.state = this.states.NUM
    }
}