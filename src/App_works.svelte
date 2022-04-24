<script>
	import {onMount} from "svelte";
	
	let callFrame;

	const initializeDaily =  () => {
		const container = document.getElementById("container");
		console.log(window.DailyIframe);
		callFrame = window.DailyIframe.createFrame(container);
		callFrame.join({ url: 'https://andresportillo.daily.co/hello' });
	}	
	
	//onMount( initializeDaily );

</script>



<svelte:head>
  <script crossorigin src="https://unpkg.com/@daily-co/daily-js" on:load={initializeDaily}></script>
</svelte:head>

<div id="container" />