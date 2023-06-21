import { markQuery } from "@/core/mark-query/mark-query.lib"
import { NotificationService } from "@/core/services/notification.service"
import { StorageService } from "@/core/services/storage.service"
import { Store } from "@/core/store/store"

export class AuthService {
    #BASE_URL = '/auth'

    constructor(){
        this.store = Store.getInstance()
        this.notificationService = new NotificationService()
        this.storageService = new StorageService()
    }

    main(type, body){
        return markQuery({
            path: `${this.#BASE_URL}/${type}`,
            body,
            onSuccess: data => {
                this.store.login(data.user, data.accessToken)
                this.notificationService.show('success', 'You successfully logged in!')
            },
            method: 'POST'
        })
    }
}