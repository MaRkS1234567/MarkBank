/**
 * Formats a credit card number string by adding dashes (-) after every 4 number
 * @param {string} cardNumber - The credit card number
 * @return {string} - Returns the formatted credit card number
 */
export function formatCardNumberDashes(cardNumber) {
    return cardNumber.replace(/(\d{4})(?=\d)/g, '$1-')
}