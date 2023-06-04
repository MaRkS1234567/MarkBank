import { markQuery } from "@/core/mark-query/mark-query.lib"

export class StatisticService {
    #BASE_URL = '/statistics'

    main(onSuccess){
        return markQuery({
            path: this.#BASE_URL,
            onSuccess
        })
    }
}