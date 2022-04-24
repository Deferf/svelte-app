import { writable, derived } from 'svelte/store';

export let callFrame = writable({});

// export let counter = writable({"a":1})

export let participants = writable({});

// export let participants = derived(
// 	callFrame,
// 	$callFrame => {console.log(typeof $callFrame.participants);if (typeof $callFrame.participants === 'function') {console.log(JSON.stringify($callFrame.participants()));return JSON.stringify($callFrame.participants())} else {return {} }}
// );

//Object.keys(callFrame.participants() )

export let ego = writable({})