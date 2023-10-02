import React from 'dom-chef';
import * as pageDetect from 'github-url-detection';
import select from 'select-dom';

import features from '../feature-manager.js';

function init(): void {
	const templateDropdown = (
		<div className="rgh-tags-dropdown float-right d-flex flex-shrink-0 flex-items-center">
			<details className="details-reset details-overlay select-menu branch-select-menu position-relative">
				<summary className="btn select-menu-button branch Button--secondary Button--small Button" title="Select PR template" aria-haspopup="menu">
					Select PR template&nbsp;
				</summary>
				<details-menu preload className="select-menu-modal position-absolute dropdown-menu-sw" role="menu" style={{zIndex: 99}} >
					<a href="?" className="SelectMenu-item" role="menuitemradio">
						Default
					</a>
					<a href="?template=tm-blocky-world.md" className="SelectMenu-item" role="menuitemradio">
						tm-blocky-world.md
					</a>
					<a href="?template=tm-core-tech.md" className="SelectMenu-item" role="menuitemradio">
						tm-core-tech.md
					</a>
					<a href="?template=tm-gameplay.md" className="SelectMenu-item" role="menuitemradio">
						tm-gameplay.md
					</a>
					<a href="?template=tm-npc-ai.md" className="SelectMenu-item" role="menuitemradio">
						tm-npc-ai.md
					</a>
					<a href="?template=tm-tools.md" className="SelectMenu-item" role="menuitemradio">
						tm-tools.md
					</a>

				</details-menu>
		 	</details>
		</div>
	);

	const searchBarWrapper = select('.pre-mergability')!.closest('div')!;
	searchBarWrapper.append(
		<span style={{right:"1em", position:"absolute"}}>
			{templateDropdown}
		</span>,
	);
}

void features.add(import.meta.url, {
	asLongAs: [
		pageDetect.isCompare,
		pageDetect.hasRichTextEditor
	],
	init,
});
