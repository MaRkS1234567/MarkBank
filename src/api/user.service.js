import { markQuery } from "@/core/mark-query/mark-query.lib"

export class UserService {
    #BASE_URL = '/users'

    getAll(searchTerm, onSuccess) {
        return markQuery({
            path: `${this.#BASE_URL}${
                searchTerm
                ? + `?${new URLSearchParams({
                        searchTerm
                    })}` 
                : ''
            }`,
            onSuccess
        })
    }
}