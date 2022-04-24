<script>
	import Frame from "./Frame.svelte";
	import Chat from "./Chat.svelte"
	// import { participants, callFrame } from './stores.js';
	/*
	let dailyObject
	callFrame.subscribe(value => {
		dailyObject = value;
	});*/
	// if typeof callFrame.participants === 'function'{
	// 	$: p = callFrame.participants()
	// }
</script>

<!-- {JSON.stringify($participants)} -->


<!-- <button on:click={console.log($participants)} >Click me</button>
<button on:click={console.log(Object.keys($participants))} >Click me</button> -->

<!-- {#if $callFrame.participants}
	 <h1>{Object.keys($callFrame.participants()).length}</h1>
{/if}

<button on:click={console.log($callFrame.participants())}>zdfg</button> -->

<!-- <button on:click={console.log($callFrame)}>zdfg</button>

<h1>{p}</h1> -->


<Frame/>
<Chat/>

