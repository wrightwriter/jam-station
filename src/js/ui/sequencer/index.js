'use strict';

const {div, h2, i, span, p, input, label, hr, button} = require('iblokz-snabbdom-helpers');

const loop = (times, fn) => (times > 0) && [].concat(loop(times - 1, fn), fn(times - 1)) || [];

const isOn = (pattern, bar, channel, tick) => pattern[bar] && pattern[bar][channel] && pattern[bar][channel][tick];

module.exports = ({state, actions, params = {}}) => div('.sequencer', params, [
	div('.header', [
		h2([i('.fa.fa-braille'), ' Sequencer']),
		label('LN'),
		input('.bars-length', {
			props: {value: state.sequencer.barsLength || 4, size: 3},
			on: {input: ev => actions.sequencer.setBarsLength(ev.target.value)}
		}),
		label('BAR'),
		span('.cipher', [
			button('.left.fa.fa-caret-left', {on: {click: () => actions.studio.prev()}}),
			input('.bar[type="number"]', {props: {value: state.studio.tick.bar, size: 6}}),
			button('.right.fa.fa-caret-right', {on: {click: () => actions.studio.next()}})
		]),
		div('.right', [
			(state.sequencer.channel !== -1) ? button('.fa.fa-minus', {on: {
				click: () => actions.sequencer.remove(state.sequencer.channel)
			}}) : '',
			(state.sequencer.channel !== -1) ? button('.fa.fa-eraser', {on: {
				click: () => actions.sequencer.clear(state.sequencer.channel)
			}}) : '',
			button('.fa.fa-plus', {on: {click: () => actions.sequencer.add()}})
		])
	]),
	div('.body', [].concat(
		/*
		[div('.head', loop(state.studio.beatLength, c =>
			div('.cell', {
				class: {
					tick: (state.studio.tick.index === c)
				}
			})
		))],
		*/
		loop(state.sequencer.channels.length, r =>
			div(`.row`, {
				style: {
					minWidth: 142 + 22 * state.studio.beatLength + 'px'
				}
			}, [].concat(
				[div('.channel', {
					class: {on: state.sequencer.channel === r},
					on: {
						click: () => actions.sequencer.select(r),
						dragover: (ev, o) => (ev.preventDefault(), (o.elm.style.borderStyle = 'dashed')),
						dragleave: (ev, o) => (ev.preventDefault(), (o.elm.style.borderStyle = 'solid')),
						dragend: ev => ev.preventDefault()
					}
				}, [span(
					state.mediaLibrary.files[state.sequencer.channels[r]]
						? state.mediaLibrary.files[state.sequencer.channels[r]].replace('.ogg', '')
						: ''
					)])],
				loop(state.studio.beatLength, c =>
					div(`.bar`, {
						class: {
							on: (isOn(state.sequencer.pattern, state.studio.tick.bar, r, c) && state.studio.tick.index !== c),
							tick: (isOn(state.sequencer.pattern, state.studio.tick.bar, r, c) && state.studio.tick.index === c)
						},
						on: {
							click: ev => actions.sequencer.toggle(state.studio.tick.bar, r, c)
						}
					})
				)
				/*
				(state.sequencer.channel === r) ? [div('.delete-channel.fa.fa-minus-circle', {
					on: {click: () => actions.sequencer.deleteChannel(r)}
				})] : []
				*/
			)))
		/*
		[div(`.row`, [
			div('.add-channel', {
				on: {click: () => actions.sequencer.addChannel()}
			}, [span('.fa.fa-plus')])
		])]
		*/
	))
]);
