import ChildComponent from "@/core/component/child-screen.component";import RenderService from "@/core/services/render.service";
import template from './logout-button.template.html'
import styles from './logout-button.module.scss'
import { $M } from "@/core/mquery/mquery.lib";
import { Store } from "@/core/store/store";

export class LogoutButton extends ChildComponent {
    constructor({router}){
        super()
        this.router = router

        this.store = Store.getInstance()
        this.user = this.store.state.user
    }
    render(){
        this.element = RenderService.htmlToElement(template, [], styles);

        $M(this.element).find('button').click(
            () => {
                this.store.logout()
                this.router.navigate('/auth')
            }
        )

        return this.element;
    }
}
