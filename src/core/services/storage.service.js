export class StorageService {
    /**
     * Saves an item in localStorage with the provided key and value. 
     * @param {string} key - the key under which the value will be stored. 
     * @param {any} value - The value to be stored. 
     */
    setItem(key, value) {
        localStorage.setItem(key, JSON.stringify(value))
    }

    /**
     * Get an item in localStorage with the provided key and value. 
     * @param {string} key - the key under which the value will be stored. 
     * @returns {any} value - The value of the item or null if the item doesn't exist. 
     */
    getItem(key){
        const value = localStorage.getItem(key)
        return value ? JSON.parse(value) : null
    }

    /**
     * removes an item from localStorage by the provided key. 
     * @param {string} key - the key of the item to be removed. 
     */
    removeItem(key) {
        localStorage.removeItem(key)
    }

    /**
     * clears all data from localStorage. 
     */
    clear(){
        localStorage.clear()
    }
}