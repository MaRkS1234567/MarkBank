import { markQuery } from "@/core/mark-query/mark-query.lib"

export class TransactionService {
    #BASE_URL = '/transaction'

    getAll(onSuccess) {
        return markQuery({
            path: this.#BASE_URL + `?${new URLSearchParams({
                orderBy: 'desc'
            })}`,
            onSuccess
        })
    }
}