import React from 'dom-chef';
import {HeartFillIcon, InfoIcon, PencilIcon, QuestionIcon} from '@primer/octicons-react';
import * as pageDetect from 'github-url-detection';
import * as textFieldEdit from 'text-field-edit';
import delegate, {DelegateEvent} from 'delegate-it';

import features from '../feature-manager.js';
import smartBlockWrap from '../helpers/smart-block-wrap.js';
import observe from '../helpers/selector-observer.js';

function addCommentTypeNote({delegateTarget}: DelegateEvent<MouseEvent, HTMLButtonElement>): void {
	addCommentType(delegateTarget, "[Note] ");
}

function addCommentTypeDetails({delegateTarget}: DelegateEvent<MouseEvent, HTMLButtonElement>): void {
	addCommentType(delegateTarget, "[Details] ");
}

function addCommentTypeChange({delegateTarget}: DelegateEvent<MouseEvent, HTMLButtonElement>): void {
	addCommentType(delegateTarget, "[Change] ");
}

function addCommentTypePraise({delegateTarget}: DelegateEvent<MouseEvent, HTMLButtonElement>): void {
	addCommentType(delegateTarget, "[Praise] ");
}

function addCommentType(delegateTarget: HTMLButtonElement, text: string): void {
	/* There's only one rich-text editor even when multiple fields are visible; the class targets it #5303 */
	const field = delegateTarget.form!.querySelector('textarea.js-comment-field')!;
	const newContent = text;

	field.focus();
	textFieldEdit.insert(field, smartBlockWrap(newContent, field));
}

function addCommentTypeButtons(referenceButton: HTMLElement): void {
	referenceButton.after(
		<button type="button" className="toolbar-item btn-octicon p-2 p-md-1 tooltipped tooltipped-sw rgh-comment-type-btn-note" aria-label="Add comment type [Note]">
			<InfoIcon/>
		</button>,
		<button type="button" className="toolbar-item btn-octicon p-2 p-md-1 tooltipped tooltipped-sw rgh-comment-type-btn-details" aria-label="Add comment type [Details]">
			<QuestionIcon/>
		</button>,
		<button type="button" className="toolbar-item btn-octicon p-2 p-md-1 tooltipped tooltipped-sw rgh-comment-type-btn-change" aria-label="Add comment type [Change]">
			<PencilIcon/>
		</button>,
		<button type="button" className="toolbar-item btn-octicon p-2 p-md-1 tooltipped tooltipped-sw rgh-comment-type-btn-praise" aria-label="Add comment type [Praise]">
			<HeartFillIcon/>
		</button>,
	);
}

function init(signal: AbortSignal): void {
	observe('md-ref', addCommentTypeButtons, {signal});
	delegate('.rgh-comment-type-btn-note', 'click', addCommentTypeNote, {signal});
	delegate('.rgh-comment-type-btn-details', 'click', addCommentTypeDetails, {signal});
	delegate('.rgh-comment-type-btn-change', 'click', addCommentTypeChange, {signal});
	delegate('.rgh-comment-type-btn-praise', 'click', addCommentTypePraise, {signal});
}

void features.add(import.meta.url, {
	include: [
		pageDetect.hasRichTextEditor,
	],
	init,
});
