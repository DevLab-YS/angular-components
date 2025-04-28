import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderAction, HeaderActionType, HeaderConfig } from '../../../header/models/header-config.model';
import { ListComponent } from '../../../list/list.component';
import { ListConfig, ListItem, ListItemType, ListSection } from '../../../list/models/list-config.model';

@Component({
    selector: 'ys-list-section',
    standalone: true,
    imports: [CommonModule, TranslateModule, ListComponent],
    templateUrl: './list-section.component.html'
})
export class ListSectionComponent {
    config = new ListConfig({
        prefix: 'angular-components.style-guide.section.list.list',
        sections: [
            new ListSection({
                key: 'card',
                items: [
                    new ListItem({
                        title: 'Card item 1',
                        type: ListItemType.Card
                    }),
                    new ListItem({
                        title: 'Card item 2',
                        type: ListItemType.Card
                    })
                ]
            }),
            new ListSection({
                key: 'text',
                items: [
                    new ListItem({
                        title: 'Text item 1',
                        type: ListItemType.Text
                    }),
                    new ListItem({
                        title: 'Text item 2',
                        type: ListItemType.Text
                    })
                ]
            })
        ]
    });
}
