import ChildComponent from "@/core/component/child-screen.component";
import RenderService from "@/core/services/render.service";
import template from './search.template.html'
import styles from './search.module.scss'
import { $M } from "@/core/mquery/mquery.lib";
import { UserService } from "@/api/user.service";
import { UserItem } from "@/components/ui/user-item/user-item.component";
import { debounce } from "@/utils/debounce.util";

export class Search extends ChildComponent {
    constructor(){
        super()
        this.userService = new UserService()
    }

    #handleSearch = async event => {
		const searchTerm = event.target.value
		const searchResultElement = $M(this.element).find('#search-results')

		if (!searchTerm) {
			searchResultElement.html('')
			return
		}

		await this.userService.getAll(searchTerm, users => {
			searchResultElement.html('')

			users.forEach((user, index) => {
				const userItem = new UserItem(user, true, () => {
					searchResultElement.html('')
				}).render()

				$M(userItem)
					.addClass(styles.item)
					.css('transition-delay', `${index * 0.1}s`)

				searchResultElement.append(userItem)

				setTimeout(() => {
					$M(userItem).addClass(styles.visible)
				}, 50)
			})
		})
	}

    render(){
        this.element = RenderService.htmlToElement(template, [], styles);

        const debouncedHandleSearch = debounce(this.#handleSearch, 300)

        $M(this.element)
			.find('input')
			.input({
				type: 'search',
				name: 'search',
				placeholder: 'Search contacts...'
			})
			.on('input', debouncedHandleSearch)

        return this.element;
    }
}
