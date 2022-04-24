<script>
    import { callFrame, participants} from "./stores.js";

    // Most of the logic is here.
    // Once the Daily Object is loaded we handle callbacks when someone triggers some meeting events

    const initializeDaily = async () => {
        const container = document.getElementById("container");
                
        let dailyObject = window.DailyIframe.createFrame(container, {showLeaveButton: true});

        // Old code used a Svelte store to share the Daily Object with other components
        // $callFrame = window.DailyIframe.createFrame(container);
        // THis thing awaits 500 for someone to join? Non optimal, but it is progress! :)
        // dailyObject.on("joined-meeting", async (e)  => {console.log("got into event! :)"); var a = await dailyObject.participants(); await new Promise(resolve => setTimeout(resolve, 1000)); console.log(a);console.log(Object.keys(a)); $participants = a});
        // dailyObject.on("joined-meeting", async (e) => {
        //     console.log("got into call! :)");
        //     var a = await dailyObject.participants(); /* await new Promise(resolve => setTimeout(resolve, 1000))*/
        //     console.log(a);
        //     console.log(Object.keys(a));
        //     $participants = a;
        // });

        // Handle when the user first joins the meeting
        dailyObject.on("joined-meeting", initializeChat)

        // dailyObject.on("participant-joined", async (e) => {
        //     console.log("someone is approaching :)");
        //     var a = await dailyObject.participants(); /* await new Promise(resolve => setTimeout(resolve, 1000))*/
        //     console.log(a);
        //     console.log(Object.keys(a));
        //     $participants = a;
        //     showChat();
        // });
        // Handle when another user joints the meeting
        // This event is also fired when the user is new to a meeting with pre-existing participants

        // So here we handle those events
        dailyObject.on("participant-joined", someoneJoins)
        
        // TO DO 
        dailyObject.on("participant-left", someoneLeft)

        // We need to wait the join method to complete
        await dailyObject.join({
            url: "https://andresportillo.daily.co/hello",
        });
    };

    // ego is the "me" user used by Talk JS
    let ego;

    // // Mounts empty chat and initializes the ego object
    const initializeChat = function (res){
        // Initialize the "me" object and add it to a store for future use
        console.log(res)
        ego = new Talk.User({
            id: res["participants"]["local"]["user_id"],
            name: res["participants"]["local"]["user_name"],
        });

        window.talkSession = new Talk.Session({
            appId: "tfLvklnK", // App Id is hardcoded
            me: ego,
        });

        // Create empty chat inbox
        let inbox = talkSession.createInbox({showFeedHeader: false} );
        inbox.mount(document.getElementById("talkjs-container2"));
    }

    // This function creates a conversation with the new participant and shows the conversation on the feed
    // It uses some tricks to tame TalkJS stubborness 
    const someoneJoins = function (res){
        console.log(res)
        console.log(ego)//is ego working? -> it is
        var other = new Talk.User({
            id: res["participant"]["user_id"],
            name: res["participant"]["user_name"],
        });

        var conversation = talkSession.getOrCreateConversation(
            Talk.oneOnOneId(ego, other)
        );
        // Select the existing inbox
        let oldInbox = talkSession.getInboxes()[0]
        // Add participants to conversation
        conversation.setParticipant(ego);
        conversation.setParticipant(other);
        // Select the conversation, otherwise it returns a 500 error
        oldInbox.select(conversation);
        // Send a message automatically to enable history and the capability to go back and forth to chat and feed
        conversation.sendMessage(`${ego.name} joined`);
        // De select previous chat to show all conversations on feed
        oldInbox.select(null);
    }

    // It may be worthwhile to block new messages for gone peers
    const someoneLeft = function (res) {

    }

</script>

<svelte:head>
    <script crossorigin src="https://unpkg.com/@daily-co/daily-js" on:load={initializeDaily}></script>
</svelte:head>

<div id="container" />

<!-- <div id="talkjs-container">
    <i>Loading chat...</i>
</div> -->

<style>
    #container {
        float: left;
        width: 60%;
        height: 500px;
    }

    /* #talkjs-container2 {
        width: 298px;
        margin: 30px;
        height: 500px;
        float: right;
    } */
</style>
