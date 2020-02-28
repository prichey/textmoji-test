import { writable } from 'svelte/store';
import { defaultState } from './config.yaml';

const text = writable(defaultState.text);
const bgColor = writable(defaultState.bgColor);
const fontColor = writable(defaultState.fontColor);
const fontSize = writable(defaultState.fontSize);
const fontFamily = writable(defaultState.fontFamily);

export { bgColor, text, fontColor, fontSize, fontFamily };
