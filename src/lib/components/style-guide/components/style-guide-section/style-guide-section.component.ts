import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StyleGuideComponentType } from '../../models/style-guide-config.model';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderSectionComponent } from '../header-section/header-section.component';
import { LIBRARY_CONSTANTS } from '../../../../shared/models/library-constants.model';
import { TableSectionComponent } from '../table-section/table-section.component';
import { ListSectionComponent } from '../list-section/list-section.component';
import { TreeSectionComponent } from '../tree-section/tree-section.component';

@Component({
    selector: 'ys-style-guide-section',
    standalone: true,
    imports: [
        CommonModule,
        TranslateModule,
        HeaderSectionComponent,
        TableSectionComponent,
        ListSectionComponent,
        TreeSectionComponent
    ],
    templateUrl: './style-guide-section.component.html'
})
export class StyleGuideSectionComponent {
    @Input()
    component?: StyleGuideComponentType;

    componentType = StyleGuideComponentType;
    translationPrefix = LIBRARY_CONSTANTS.TRANSLATIONS_PREFIX;
}
