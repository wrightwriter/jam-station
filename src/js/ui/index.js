'use strict';

const {div} = require('iblokz-snabbdom-helpers');
const header = require('./header');
const mediaLibrary = require('./media-library');
const rack = require('./rack');
const sequencer = require('./sequencer');
const midiMap = require('./midi-map');
const midiKeyboard = require('./midi-keyboard');

const panels = {
	mediaLibrary,
	rack,
	sequencer,
	midiMap,
	midiKeyboard
};

module.exports = ({state, actions, tapTempo}) => div('#ui', [
	header({state, actions, tapTempo}),
	div('#layout', Object.keys(panels)
		.filter(panel => state.layout[panel].visible)
		.map(panel =>
			panels[panel]({state, actions, params: {
			}})
		))
]);
