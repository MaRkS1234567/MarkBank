import { BaseScreen } from "@/core/component/base-screen.component";
import RenderService from "@/core/services/render.service";
import template from './home.template.html'
import styles from './home.module.scss'
import { $M } from "@/core/mquery/mquery.lib";
import { Button } from "@/components/ui/button/button.component";
import { Field } from "@/components/ui/field/field.component";
import { Heading } from "@/components/ui/heading/heading.component";
import { UserItem } from "@/components/ui/user-item/user-item.component";
import { CardInfo } from "./card-info/card-info.component";
import { Actions } from "./actions/actions.component";

export class Home extends BaseScreen {
    constructor(){
        super({title: 'Home'})
    }
    render(){
        const element = RenderService.htmlToElement(template, [CardInfo, Actions], styles)

        // $M(element).find('h1').css('color', 'green')
        
        return element
    }
}
