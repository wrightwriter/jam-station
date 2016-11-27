'use strict';

const Rx = require('rx');
const $ = Rx.Observable;
const {Subject} = Rx;

const studio = require('./studio');
const instrument = require('./instrument');
const sequencer = require('./sequencer');
const midiMap = require('./midi-map');

// util
const obj = require('iblokz/common/obj');
const {measureToBeatLength} = require('../util/math');

const stream = new Subject();

const init = () => stream.onNext(state => ({
	bpm: '120',
	measure: '4/4',
	beatLength: 16,
	instrument: {
		eg: {
			attack: 0,
			decay: 0.1,
			sustain: 0.2,
			release: 0.1
		},
		vco: {
			type: 'sawtooth'
		},
		lfo: {
			type: 'sawtooth'
		},
		vcf: {
			cutoff: 0,
			resonance: 0
		}
	},
	channels: [
		'Kick',
		'HiHat',
		'Snare',
		'Clap'
	],
	pattern: [
		[1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0],
		[0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
	],
	playing: false,
	tickIndex: -1,
	midi: {
		inputs: [],
		outputs: []
	}
}));

module.exports = {
	stream: $.merge(stream, studio.stream, instrument.stream, sequencer.stream, midiMap.stream),
	studio,
	instrument,
	sequencer,
	midiMap,
	init
};
