'use strict';

const Rx = require('rx');
const $ = Rx.Observable;
const {Subject} = Rx;

const {obj} = require('iblokz-data');

const stream = new Subject();

const initial = {
	vcaOn: 1,
	vca1: {
		volume: 0.41,
		attack: 0,
		decay: 0.16,
		sustain: 0.8,
		release: 0.21
	},
	vca2: {
		volume: 0.43,
		attack: 0,
		decay: 0.16,
		sustain: 0.8,
		release: 0.19
	},
	vca3: {
		volume: 0.7,
		attack: 0,
		decay: 0.04,
		sustain: 0.8,
		release: 0.08
	},
	vca4: {
		volume: 0.7,
		attack: 0,
		decay: 0.04,
		sustain: 0.8,
		release: 0.08
	},
	vco1: {
		on: true,
		type: 'square',
		detune: -1
	},
	vco2: {
		on: true,
		type: 'sawtooth',
		detune: 1
	},
	lfo: {
		on: false,
		expanded: true,
		type: 'sawtooth',
		frequency: 5,
		gain: 0.15
	},
	vcf: {
		on: true,
		expanded: true,
		type: 'lowpass',
		cutoff: 0.64,
		resonance: 0,
		gain: 0
	},
	delay: {
		on: false,
		expanded: true,
		time: 1,
		dry: 1,
		wet: 0
	},
	reverb: {
		on: true,
		expanded: true,
		seconds: 3,
		decay: 2,
		reverse: false,
		dry: 0.8,
		wet: 0.7
	}
};

const updateProp = (param, prop, value) =>
	state => obj.patch(state, ['instrument', param, prop], value);

const setVca = index =>
	state => obj.patch(state, ['instrument', 'vcaOn'], index);

const applyPatch = patch =>
	state => obj.patch(state, 'instrument', patch);

module.exports = {
	initial,
	updateProp,
	setVca,
	applyPatch
};
