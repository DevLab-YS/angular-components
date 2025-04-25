import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderAction, HeaderActionType, HeaderConfig } from '../../../header/models/header-config.model';
import { HeaderComponent } from '../../../header/header.component';

@Component({
    selector: 'ys-header-section',
    standalone: true,
    imports: [CommonModule, TranslateModule, HeaderComponent],
    templateUrl: './header-section.component.html'
})
export class HeaderSectionComponent {
    headerConfig = new HeaderConfig({
        prefix: 'angular-components.style-guide.section.header.header',
        leftActions: [
            new HeaderAction({
                key: 'edit',
                type: HeaderActionType.Text,
                action: () => {},
                showLabel: true,
                showTooltip: false
            }),
            new HeaderAction({
                key: 'delete',
                type: HeaderActionType.Text,
                action: () => {},
                showLabel: true,
                showTooltip: false
            })
        ],
        rightActions: [
            new HeaderAction({
                key: 'filters',
                type: HeaderActionType.SecondaryButton,
                action: () => {},
                showLabel: true,
                showTooltip: false
            }),
            new HeaderAction({
                key: 'new',
                type: HeaderActionType.PrimaryButton,
                action: () => {},
                showLabel: true,
                showTooltip: false
            })
        ]
    });
}
