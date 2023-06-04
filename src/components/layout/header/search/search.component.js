import ChildComponent from "@/core/component/child-screen.component";import RenderService from "@/core/services/render.service";
import template from './search.template.html'
import styles from './search.module.scss'
import { $M } from "@/core/mquery/mquery.lib";

export class Search extends ChildComponent {
    render(){
        this.element = RenderService.htmlToElement(template, [

        ], styles);

        $M(this.element).find('input').input({
            type: 'search',
            name: 'search',
            placeholder: 'Search contacts...'
        })

        return this.element;
    }
}
