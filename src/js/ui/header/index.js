'use strict';

const {div, h1, header, img, i, ul, li, a, button, input} = require('iblokz/adapters/vdom');

module.exports = ({state, actions}) => header([
	ul([
		li([a({class: {on: state.ui.mediaLibrary}, on: {click: ev => actions.toggleUI('mediaLibrary')}}, [i('.fa.fa-book')])]),
		// li([a({class: {on: state.ui.patches}, on: {click: ev => actions.toggleUI('patches')}}, 'Patches')]),
		li([a({class: {on: state.ui.instrument}, on: {click: ev => actions.toggleUI('instrument')}}, [i('.fa.fa-sliders')])]),
		li([a({class: {on: state.ui.sequencer}, on: {click: ev => actions.toggleUI('sequencer')}}, [i('.fa.fa-braille')])]),
		li([a({class: {on: state.ui.midiMap}, on: {click: ev => actions.toggleUI('midiMap')}}, [i('.fa.fa-sitemap')])]),
		li([a({class: {on: state.ui.midiKeyboard}, on: {click: ev => actions.toggleUI('midiKeyboard')}}, [i('.fa.fa-keyboard-o')])])
	]),
	h1([
		img('[src="assets/logo.png"]'),
		'Jam Station'
	]),
	ul('.right', [
		li([
			a([i('.fa.fa-volume-down')]),
			input('[type="range"]', {
				attrs: {min: 0, max: 1, step: 0.005},
				props: {value: state.studio.volume},
				on: {change: ev => actions.studio.change('volume', parseFloat(ev.target.value))}
			}),
			a([i('.fa.fa-volume-up')])
		]),
		li([a([i('.fa.fa-save')])]),
		li([a([i('.fa.fa-upload')])]),
		li([a([i('.fa.fa-trash')])])
	])
]);
