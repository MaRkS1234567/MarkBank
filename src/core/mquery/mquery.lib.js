/**
 * Represent the MQuery class for working with DOM elements
 */

import { formatCardNumberDashes } from "@/utils/format/format-card-number"


class MQuery {

    /**
     * Create a new MQuery instance 
     * @param {string|HTMLElement} selector - A CSS selector or an HTMLElement 
     */

    constructor(selector){
        if(typeof selector === 'string'){
            this.element = document.querySelector(selector)

            if(!this.element){
                throw new Error(`Element ${element} not found!`)
            }
        } else if (selector instanceof HTMLElement) {
            this.element = selector
        } else {
            throw new Error('Invalid selector type')
        }
    }

   /**
    * Find the first element by the tag.
    * @param {string} selector - A CSS selector string or an html.
    * @returns {MQuery} A new MQuery instance for the found selector.
    */
    find(selector) {
        const element = new MQuery(this.element.querySelector(selector))

        if (element){
            return element
        } else {
            throw new Error(`Element ${element} not found!`)
        }
    }

    /**
     * Append a new element as a child of the selected element.
     * @param {HTMLElement} childElement - The new child element to append. 
     * @returns {MQuery} The current MQuery instance for chaining. 
     */
    append(childElement){
        this.element.appendChild(childElement)
        return this
    }

    /**
     * Insert a new element as a child of the selected element.
     * @param {HTMLElement} newElement - The new child element to insert. 
     * @returns {MQuery} The current MQuery instance for chaining. 
     */
    before(newElement){
        if(!(newElement instanceof HTMLElement)){
            throw new Error('Element must be an HTMLElement')
        }

        const parentElement = this.element.parentElement

        if(parentElement){
            parentElement.insertBefore(newElement, this.element)
            return this
        } else {
            throw new Error('Element does not have a parent element')
        }

        console.log(this.element.parentElement)
    }

    /**
     * Get or set the innerHTML of the selected element. 
     * @param {string} [htmlContent] - Optional HTML content to set. 
     * @returns {MQuery|string} The current MQuery instance. 
     */
    html(htmlContent){
        if(typeof htmlContent === 'undefined'){
            return this.element.innerHTML
        } else {
            this.element.innerHTML = htmlContent
            return this
        }
    }

    /**
     * Get or set the text of the selected element. 
     * @param {string} [textContent] - Optional text content to set. 
     * @returns {MQuery|string} The current MQuery instance. 
     */
    text(textContent){
        if(typeof textContent === 'undefined'){
            return this.element.textContent
        } else {
            this.element.textContent = textContent
            return this
        }
    }

    /**
     * Set an event listener for the submit event of a form element. 
     * @param {function(Event): void} onSubmit - The event listener for the form submit event. 
     * @returns {MQuery} The current MQuery instance for chaining. 
     */
    submit(onSubmit){
        if(this.element.tagName.toLocaleLowerCase() === 'form'){
            this.element.addEventListener('submit', e => {
                e.preventDefault()
                onSubmit(e)
            })
        } else {
            throw new Error('Element must be a form')
        }

        return this
    }


	/* EVENTS */

	/**
	 * Attach a click event listener to the selected element.
	 * @param {function(Event): void} callback - The event listener function to execute when the selected element is clicked. The function will receive the event object as its argument.
	 * @returns {RQuery} The current RQuery instance for chaining.
	 */
    click(callback) {
		this.element.addEventListener('click', callback)
		return this
	}

    /**
     * Set attributes and event listeners for an input element
     * @param {object} options - An object containing input options 
     * @param {function(Event): void} [options.onChange] - The event listener for input changes
     * @param {function(Event): void} [options.onInput ] -The event listeners for input events
     * @param {object} [options.rest] - Optional attributes to set on the input element
     * @returns {MQuery} The current MQuery instance for chining 
     */
    input({onInput, ...rest}){
        if(this.element.tagName.toLowerCase() != 'input'){
            throw new Error('Element must be an input')
        }

        for (const [key, value] of Object.entries(rest)) {
            this.element.setAttribute(key, value)
        }

        if (onInput){
            this.element.addEventListener('input', onInput)
        }

        return this
    }
    /**
     * Set attributes and event listeners for a number input element
     * @param {number} [limit] - The maximus length of input value
     * @returns {MQuery} - The current MQuery instance for chaining
     */
    numberInput(limit){
        if(
            this.element.tagName.toLowerCase() != 'input' ||
            this.element.type != 'number'
        ) {
           throw new Error('Element must be an input with type number') 
        }

        this.element.addEventListener('input', event => {
            let value = event.target.value.replace(/[^0-9]/g, '')
            if(limit) value = value.substring(0, limit)
            event.target.value = value
        })

        return this
    }

     /**
     * Set attributes and event listeners for a credit card input element
     * @returns {MQuery} - The current MQuery instance for chaining
     */
    creditCardInput(){
        const limit = 16
        if(
            this.element.tagName.toLowerCase() != 'input' ||
            this.element.type != 'text'
        ) {
           throw new Error('Element must be in credit card format') 
        }

        this.element.addEventListener('input', event => {
            let value = event.target.value.replace(/[^0-9]/g, '')
            if(limit) value = value.substring(0, limit)
            event.target.value = formatCardNumberDashes(value)
        })

        return this
    }

    /* STYLES */


    /**
     * Shows the selected element by removing the 'display' sty;e property. 
     * @returns {MQuery} The current MQuery instance for chaining. 
     */
    show(){
        this.element.style.removeProperty('display')
        return this
    }

    /**
     * Hide the selected element by removing the 'display' sty;e property. 
     * @returns {MQuery} The current MQuery instance for chaining. 
     */
    hide(){
        this.element.style.display = 'none'
        return this
    }


    /**
     * Set the CSS style of the selected element.
     * @param {string} property - The CSS property to set. 
     * @param {string} value - The value to set for the css property. 
     * @returns {MQuery} the current MQuery instance for chining.
     */
    css(property, value){
        if(typeof property != 'string' || typeof value != 'string'){
            throw new Error('property and value must be strings')
        }

        this.element.style[property] = value
        return this
    }

    /**
     * Adds a class or a list of classes to the current element
     * @param {string|string[]} classNames - a single name or array for class
     * @returns {MQuery} The current MQuery instance for chaining
     */
    addClass(classNames){
        if(Array.isArray(classNames)){
            for (const className of classNames) {
               this.element.classList.add(className)
            }
        } else {
            this.element.classList.add(classNames)
        }
        return this
    }

    /**
     * Removes a class or a list of classes to the current element
     * @param {string|string[]} classNames - a single name or array for class
     * @returns {MQuery} The current MQuery instance for chaining
     */
    removeClass(classNames){
        if(Array.isArray(classNames)){
            for (const className of classNames) {
               this.element.classList.remove(className)
            }
        } else {
            this.element.classList.remove(classNames)
        }
        return this
    }

    /**
     * Set or get the value of an attribute on the selected element. 
     * @param {string} attributeName - The name of the attribute to set or get. 
     * @param {string} [value] - The value to set for the attributes. 
     * @returns {MQuery|string} The current MQuery instance for chaining. 
     */
    attr(attributeName, value){
        if(typeof attributeName != 'string') throw new Error('attribute must be a string')

        if(typeof value === 'undefined'){
            return this.element.getAttribute(attributeName)
        } else {
            this.element.setAttribute(attributeName, value)
            return this
        }
    }
}

/**
 * Create a new MQuery instance for the given selector.
 * @param {string|HTMLElement} selector - A CSS selector string or an html.
 * @returns {MQuery} A new MQuery instance for the given selector.
 */

export function $M(selector){
    return new MQuery(selector)
}