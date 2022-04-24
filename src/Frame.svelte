<script>
    import { callFrame, participants} from "./stores.js";
    import { createEventDispatcher } from "svelte";

    //ff("Hi!-----------------")

    // To have an event based implementation I want to check whether we can mount the chat when we only have 
    // one user and then check whether we can mount again when someone comes :)

    const initializeDaily = async () => {
        const container = document.getElementById("container");
        // $callFrame = window.DailyIframe.createFrame(container);
        let dailyObject = window.DailyIframe.createFrame(container);
        // THis thing awaits 500 for someone to join? Non optimal, but it is progress! :)
        // dailyObject.on("joined-meeting", async (e)  => {console.log("got into event! :)"); var a = await dailyObject.participants(); await new Promise(resolve => setTimeout(resolve, 1000)); console.log(a);console.log(Object.keys(a)); $participants = a});
        // dailyObject.on("joined-meeting", async (e) => {
        //     console.log("got into call! :)");
        //     var a = await dailyObject.participants(); /* await new Promise(resolve => setTimeout(resolve, 1000))*/
        //     console.log(a);
        //     console.log(Object.keys(a));
        //     $participants = a;
        // });
        dailyObject.on("joined-meeting", initializeChat)

        // dailyObject.on("participant-joined", async (e) => {
        //     console.log("someone is approaching :)");
        //     var a = await dailyObject.participants(); /* await new Promise(resolve => setTimeout(resolve, 1000))*/
        //     console.log(a);
        //     console.log(Object.keys(a));
        //     $participants = a;
        //     showChat();
        // });

        dailyObject.on("participant-joined", someoneJoins)

        await dailyObject.join({
            url: "https://andresportillo.daily.co/hello",
        });
    };

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

    // It is unclear at the moment what should happen
    // Create conversation
    // Make it appear on the feed 
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

        let oldInbox = talkSession.getInboxes()[0]
        conversation.setParticipant(ego);
        conversation.setParticipant(other);
        oldInbox.select(conversation);
        conversation.sendMessage(`${ego.name} joined`);
        oldInbox.select(null);
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
    #container {
        float: left;
        width: 50%;
        height: 100%;
    }

    #talkjs-container2 {
        width: 298px;
        margin: 30px;
        height: 500px;
        float: right;
    }
</style>
