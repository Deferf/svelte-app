<script>
	import {callFrame,  participants} from './stores.js'
    import {createEventDispatcher } from 'svelte'

	const initializeDaily = async () => {
        const container = document.getElementById("container");
        // $callFrame = window.DailyIframe.createFrame(container);
        let dailyObject = window.DailyIframe.createFrame(container);
        // THis thing awaits 500 for someone to join? Non optimal, but it is progress! :)
        // dailyObject.on("joined-meeting", async (e)  => {console.log("got into event! :)"); var a = await dailyObject.participants(); await new Promise(resolve => setTimeout(resolve, 1000)); console.log(a);console.log(Object.keys(a)); $participants = a});
		dailyObject.on("joined-meeting", async (e)  => {console.log("got into call! :)"); var a = await dailyObject.participants();/* await new Promise(resolve => setTimeout(resolve, 1000))*/; console.log(a);console.log(Object.keys(a)); $participants = a});
        
        dailyObject.on("participant-joined", async (e)  => {console.log("someone is approaching :)"); var a = await dailyObject.participants();/* await new Promise(resolve => setTimeout(resolve, 1000))*/; console.log(a);console.log(Object.keys(a)); $participants = a;showChat()});
        //callFrame.update(() => window.DailyIframe.createFrame(container));
        console.log("callframe first call");
        console.log($callFrame);

        /*
        callFrame.subscribe(value => {
            dailyObject = value;
        });*/

        // Did internal state change after joining?
        //console.log("Before");
        //console.log(dailyObject)
		// await $callFrame.join({ url: 'https://andresportillo.daily.co/hello' });
        await dailyObject.join({ url: 'https://andresportillo.daily.co/hello' });
        //callFrame.update(() => window.DailyIframe.createFrame(container));
        //console.log("After"); 
        //console.log(dailyObject)
       
        console.log("participants--")
        //console.log(dailyObject.participants())
        //console.log( Object.keys(dailyObject.participants()))
        // After we join the call we update the Daily object to show new participants
        // But why it does only show me? The local user
        //callFrame.update(() => dailyObject);
        console.log("participants--2")
        //let temp = dailyObject.participants()
        //console.log(temp)
        
        //participants.update(() => Object.keys(temp))
        // $callFrame.on("joined-meeting", ()  => {console.log("got into event! :)");let a = $callFrame.participants(); console.log(a); $participants = a});
        // dailyObject.on("joined-meeting", (e)  => {console.log("got into event! :)");let a = dailyObject.participants(); console.log(a); $participants = a});
	}
    //console.log(callFrame.participants())
	
    // setInterval(() => {
    //     console.log(["count", $counter])
    //     $counter["a"] = $counter["a"] + 1
       
    // }, 500);

    // $: callFrame && (() => {$participants = callFrame.participants()})();

    // const dispatch = createEventDispatcher();

    // function sayHello() {
    //     dispatch('message', {
    //         text: 'Hello!'
    // }}

    const showChat = async function () {
        let keys = Object.keys($participants).filter((e) => e != "local")
        var me = new Talk.User({
            id: $participants['local']['user_id'],
            name: $participants['local']['user_name'],
        });
        window.talkSession = new Talk.Session({
            appId: 'tfLvklnK',
            me: me,
        });
        var others = keys.map((e) => {console.log($participants[e]['user_name']); var a =  new Talk.User({
            id: $participants[e]['user_id'],
            name: $participants[e]['user_name'],
        }); console.log(a); return a});

        console.log(["keys", keys])
        console.log(["others", others])


        // var other = new Talk.User({
        //     id: $participants[keys[keys.length-1]]['user_id'],
        //     name: $participants[keys[keys.length-1]]['user_name'],
        // });
  console.log(["got into oneoneid", others.map((p) => (Talk.oneOnOneId(me, p)))])
  var conversations = others.map((p) => talkSession.getOrCreateConversation(
    Talk.oneOnOneId(me, p)
  ));
  console.log(["got into convs", conversations])

  //conversations.forEach((c) => {c.setParticipant(me); others.forEach((p) =>  c.setParticipant(p)); c.sendMessage(`${me.name} joined`);});
  conversations.forEach((c, i) => {console.log(['current convo', c]);c.setParticipant(me); c.setParticipant(others[i]); c.sendMessage(`${me.name} joined`);});
  console.log("got into particiipants");

  //await new Promise(resolve => c.sendMessage(`${me.name} joined`).then(resolve))

//   var conversation = talkSession.getOrCreateConversation(
//     Talk.oneOnOneId(me, other)
//   );
//   conversation.setParticipant(me);
//   conversation.setParticipant(other);
//   conversation.sendMessage(`${me.name} joined`);
  //var inbox = talkSession.createInbox({ selected: conversation });
  var inbox;
  if (conversations.length > 2){
    inbox = talkSession.createInbox();
  }
  else{
    inbox = talkSession.createInbox( { selected: conversations[0] });
  }
  

  console.log("got into inbox creation")
  inbox.mount(document.getElementById('talkjs-container2'));
  console.log("got into inbox mounting");


}
    
</script>

<svelte:head>
  <script crossorigin src="https://unpkg.com/@daily-co/daily-js" on:load={initializeDaily}></script>
</svelte:head>


<div id="container" />

<div id="talkjs-container2">
    <i>Loading chat...</i>
  </div>


<style>
#container-pause {
    flex: 1.5;
    padding: 1rem 2rem 1rem 1rem;
    display: flex;
    justify-content: center;
  }

#container {
    float: left;
    width: 50%;
    height: 100%;
}

#talkjs-container2{
    width: 40%;
    margin: 30px;
    height: 500px;
    float: right;
}
</style>