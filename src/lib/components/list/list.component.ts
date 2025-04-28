import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { faAngleDown, faAngleRight, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatMenuModule } from '@angular/material/menu';
import { ListItem, ListConfig, ListSection, ListItemType } from './models/list-config.model';

@Component({
    selector: 'ys-list',
    standalone: true,
    imports: [FontAwesomeModule, TranslateModule, NgbTooltipModule, CommonModule, MatMenuModule],
    templateUrl: './list.component.html'
})
export class ListComponent {
    @Input() config?: ListConfig;

    closeIcon = faAngleRight;
    openIcon = faAngleDown;

    clickHeader(section: ListSection): void {
        section.showItems = !section.showItems;
    }

    getItemClasses(item: ListItem): string {
        const common =
                'tw-w-full tw-flex tw-justify-center tw-rounded-lg tw-p-1 tw-space-x-3 tw-m-1 tw-overflow-hidden tw-cursor-pointer',
            card = 'tw-bg-background-tertiary tw-shadow-md hover:tw-opacity-80',
            text = 'tw-bg-transparent hover:tw-text-primaryInverse';

        switch (item.type) {
            case ListItemType.Card:
                return `${common} ${card}`;
            case ListItemType.Text:
                return `${common} ${text}`;
            default:
                return common;
        }
    }
}
