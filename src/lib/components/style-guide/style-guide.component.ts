import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StyleGuideComponentType } from './models/style-guide-config.model';
import { StyleGuideSectionComponent } from './components/style-guide-section/style-guide-section.component';
import { TranslateModule } from '@ngx-translate/core';
import { LIBRARY_CONSTANTS } from '../../shared/models/library-constants.model';

@Component({
    selector: 'ys-style-guide',
    standalone: true,
    imports: [CommonModule, StyleGuideSectionComponent, TranslateModule],
    templateUrl: './style-guide.component.html'
})
export class StyleGuideComponent {
    @Input()
    components: StyleGuideComponentType[] = [
        StyleGuideComponentType.Header,
        StyleGuideComponentType.Table,
        StyleGuideComponentType.List,
        StyleGuideComponentType.Tree,
        StyleGuideComponentType.Form
    ];

    translationPrefix = LIBRARY_CONSTANTS.TRANSLATIONS_PREFIX;
}
