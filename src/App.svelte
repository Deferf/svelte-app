<script>
	import Frame from "./Frame.svelte";
	import Chat from "./Chat.svelte"
	import { participants, callFrame } from './stores.js';
	/*
	let dailyObject
	callFrame.subscribe(value => {
		dailyObject = value;
	});*/
	// if typeof callFrame.participants === 'function'{
	// 	$: p = callFrame.participants()
	// }
</script>

<svelte:head>
	<title>Andres Daily Demo</title>
</svelte:head>

<!-- {JSON.stringify($participants)} -->


<!-- <button on:click={console.log($participants)} >Click me</button>
<button on:click={console.log(Object.keys($participants))} >Click me</button> -->

<!-- {#if $callFrame.participants}
	 <h1>{Object.keys($callFrame.participants()).length}</h1>
{/if}

<button on:click={console.log($callFrame.participants())}>zdfg</button> -->


<div id = "super_container">
<Frame/>
<Chat/>
</div>

<style>
	#super_container{
		height: 500px;
		align-items: center;
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

</style>