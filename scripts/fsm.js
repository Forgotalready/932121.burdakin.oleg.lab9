'use strict'

class FSM
{
    constructor() 
    {
        this.operationsStack = []
        this.states = Object.freeze({
            EMPTY : 0,
            NUM : 1,
            SIGN : 2
        })
        this.signs = ["+", "-", "/", "*"]
        this.numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."]
        this.inputElement = document.querySelector(".container__form__input")

        this.operationsStack.push(this.states.EMPTY)
    }

    handleInput(input)
    {
        if(this.inputElement.textContent === "0")
        {
            this.inputElement.innerHTML = "" 
        }
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
            const state = this.operationsStack.at(-1)
            this.inputElement.innerHTML = new Function('return ' + this.inputElement.textContent)().toString()
            this.operationsStack = []
            this.operationsStack.push(this.states.NUM)
        }
        else if(input === "C")
        {
            const state = this.operationsStack.at(-1)
            this.inputElement.innerHTML = "0"
            this.operationsStack = []
            this.operationsStack.push(this.states.EMPTY)
        }
        else if(input === "<-")
        {
            if(this.operationsStack.length != 1)
            {
                this.operationsStack.pop()
                this.inputElement.textContent = this.inputElement.textContent.slice(0, -1)
            }
        }
    }

    handleSign(input)
    {
        const state = this.operationsStack.at(-1)
        switch(state)
        {
            case this.states.SIGN:
                this.inputElement.textContent = this.inputElement.textContent.slice(0, -1)
                this.inputElement.innerHTML = `<span style="opacity: 0.3">${this.inputElement.innerHTML}</span>${input}`
                break
            case this.states.EMPTY:
                if(input === "-")
                    this.inputElement.innerHTML = input
                return
            default:
                this.inputElement.innerHTML = `<span style="opacity: 0.3">${this.inputElement.innerHTML}</span>${input}`
                break
        }
        this.operationsStack.push(this.states.SIGN)
    }

    handleNumber(input)
    {
        const state = this.operationsStack.at(-1)

        if(input === '.')
        {
            if(!(this.numbers.includes(this.inputElement.textContent.at(-1)) && this.inputElement.textContent.at(-1) !== ".")) 
                return        
        }

        switch(state)
        {
            case this.states.NUM:
                this.inputElement.innerHTML += input
                break
            default:
                this.inputElement.innerHTML = `<span style="opacity: 0.3">${this.inputElement.innerHTML}</span>${input}`
                break
        }
        this.operationsStack.push(this.states.NUM)
    }
}