import { BaseScreen } from "@/core/component/base-screen.component";
import RenderService from "@/core/services/render.service";
import template from './home.template.html'
import styles from './home.module.scss'

export class CardInfo extends ChildComponent {
    render(){
        this.element = RenderService.htmlToElement(template, [], styles);

        return this.element;
    }
}
