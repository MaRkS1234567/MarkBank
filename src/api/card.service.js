import { markQuery } from "@/core/mark-query/mark-query.lib"
import { NotificationService } from "@/core/services/notification.service"
import { Store } from "@/core/store/store"

export class CardService {
    #BASE_URL = '/cards'

    constructor(){
        this.store = Store.getInstance()
        this.notificationService = new NotificationService()
    }

    byUser(onSuccess){
        return markQuery({
            path: `${this.#BASE_URL}/by-user`,
            onSuccess
        })
    }

    // create(onSuccess){
    //     return markQuery({
    //         path: this.#BASE_URL,
    //         method: 'POST',
    //         onSuccess
    //     })
    // }

    /**
     * Updates the user balance with specified amount and type
     * @param {number} amount - The amount to be added or withdrawn from the user balance 
     * @param {'top-up' | 'withdrawal'} type  - The type of the transaction , either "yop-up" or "withdrawal"
     * @param {function} onSuccess - The callback function to be executed when the balance update 
     * @returns {Promise} A promise object that resolves to the response from the API 
     */
    updateBalance(amount, type, onSuccess){
        return markQuery({
            path: `${this.#BASE_URL}/balance/${type}`,
            method: 'PATCH',
            body: { amount: +amount },
            onSuccess: ()=> {
                this.notificationService.show(
                    'success',
                    'Balance successfully changed!'
                )
                onSuccess()
            }
        })
    }

    /**
     * Transfers money between two card numbers
     * @function 
     * @param {Object} body - The transfer details
     * @param {number} body.amount - The amount to be transferred
     * @param {string} body.toCardNumber - The recipient card number 
     * @param {Function} onSuccess - The callback function with the markQuery response 
     * @returns {Promise} A promise that resolves with the markQuery response 
     */
    transfer({ amount, toCardNumber }, onSuccess){
        return markQuery({
            path: `${this.#BASE_URL}/transfer-money`,
            method: 'PATCH',
            body: {
                amount: +amount,
                fromCardNumber: this.store.user.card.number,
                toCardNumber
            },
            onSuccess: ()=> {
                this.notificationService.show(
                    'success',
                    'Transfer successfully completed!'
                )
                onSuccess()
            }
        })
    }
}