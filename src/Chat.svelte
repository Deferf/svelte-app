<script context="module">



(function(t,a,l,k,j,s){
s=a.createElement('script');s.async=1;s.src="https://cdn.talkjs.com/talk.js";a.head.appendChild(s)
;k=t.Promise;t.Talk={v:3,ready:{then:function(f){if(k)return new k(function(r,e){l.push([f,r,e])});l
.push([f])},catch:function(){return k&&new k()},c:l}};})(window,document,[]);

// Talk.ready.then(async function () {
//   var me = new Talk.User({
//     id: Math.round(Math.random() * 10000000) + "",//'34234',
//     name: 'Andres',
//     role: 'default'
//   });
//   window.talkSession = new Talk.Session({
//     appId: 'tfLvklnK',
//     me: me,
//   });
//   var other = new Talk.User({
//     id: Math.round(Math.random() * 10000000) + "",//'432424',
//     name: 'Sebastian',
//     // email: 'Sebastian@example.com',
//     // photoUrl: 'https://demo.talkjs.com/img/sebastian.jpg',
//     role: 'default'
//   });

//   var conversation = talkSession.getOrCreateConversation(
//     Talk.oneOnOneId(me, other)
//   );
//   conversation.setParticipant(me);
//   conversation.setParticipant(other);
//   conversation.sendMessage("Chat experiment1");
//   var inbox =  talkSession.createInbox(/* {messageField: {placeholder: "Say Hello!", visible: true}}*/ { selected: conversation  });
  
//   inbox.mount(document.getElementById('talkjs-container'));


// });
	
</script>

<div id="talkjs-container2">
    <div ><i>Loading chat...</i></div>
  </div>

<style>

/* #talkjs-container2{
    width: 298px;
    margin: 30px;
    height: 100%;
    float: right;
} */

#talkjs-container2{
    letter-spacing: normal;
    box-sizing: border-box;
    margin: 0;
    outline: 0;
    font-size: 100%;
    vertical-align: baseline;
    background-color: #fff;
    border-radius: 5px;
    border: 1px solid #e7ecee;
    overflow-x: hidden;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: #4E606A;
    width: 298px;
    height: 100%;
}

</style>

