let handlefail = function(err){
  console.log(err)
}

let appId = "b938a651ce0e4ce2b06231da64d17150";
let globalStream;
let isAudioMuted= false;
let isVidioMuted= false;
let numPeople = 0;
let participants = []
let recipeUploaded=false;
let currRecipe = "";

let client = AgoraRTC.createClient({
  mode: "live",
  codec: "h264"
})

client.init(appId,() => console.log("AgoraRTC Client Connected"),handlefail
)

function removeMyVideoStream(){
  globalStream.stop();
}

function removeVideoStream(evt){
  let stream = evt.stream;
  stream.stop();
  let remDiv = document.getElementById(stream.getId())
  remDiv.parentNode.removeChild(remDiv);
}

function addVideoStream1(streamId){
  console.log()
  let remoteContainer = document.getElementById("remoteStream1");
  let name = document.getElementById("participants");
  let streamDiv = document.createElement("div");
  streamDiv.id = streamId;
  document.getElementById("participants").innerHTML += "\t" + streamId + "\n";
  // streamDiv.style.transform = "rotateY(180deg)";
  console.log(username);
  name.value=username;
  streamDiv.style.height = "150px"
  remoteContainer.appendChild(streamDiv)
  numPeople++;
} 

function addVideoStream2(streamId){
  console.log()
  let remoteContainer = document.getElementById("remoteStream2");
  let name = document.getElementById("participants");
  let streamDiv = document.createElement("div");
  streamDiv.id = streamId;
  document.getElementById("participants").innerHTML +=  "\t" + streamId + "\n" ;
  // streamDiv.style.transform = "rotateY(180deg)";
  console.log(username);
  name.value=username;
  streamDiv.style.height = "150px"
  remoteContainer.appendChild(streamDiv)
  numPeople++;
} 

function addVideoStream3(streamId){
  console.log()
  let remoteContainer = document.getElementById("remoteStream3");
  let name = document.getElementById("participants");
  let streamDiv = document.createElement("div");
  streamDiv.id = streamId;
  document.getElementById("participants").innerHTML +=  "\t" + streamId + "\n" ;
  // streamDiv.style.transform = "rotateY(180deg)";
  console.log(username);
  name.value=username;
  streamDiv.style.height = "150px"
  remoteContainer.appendChild(streamDiv)
  numPeople++;
} 

document.getElementById("leave").onclick = function () {
  client.leave(function() {
      console.log("Left!")
  },handlefail)
  removeMyVideoStream();
}

document.getElementById("join").onclick = function () {
  let channelName = document.getElementById("channelName").value;
  let Username = document.getElementById("username").value;
  document.getElementById("participants").innerHTML = Username + "\n";
  console.log(recipeUploaded)
  if (recipeUploaded) {
    console.log(currRecipe)
    document.getElementById("recipe").href = currRecipe;
  }
  participants.push(Username)
  client.join(
      null,
      channelName,
      Username,
      () =>{
          var localStream = AgoraRTC.createStream({
              video: true,
              audio: true,
          })

          localStream.init(function(){
              localStream.play("SelfStream")
              console.log(`App id: ${appId}\nChannel id: ${channelName}`)
              client.publish(localStream)
          })

          globalStream = localStream
      }
  )

  client.on("stream-added", function (evt){
      console.log("Added Stream");
      client.subscribe(evt.stream,handlefail)
  })

  client.on("stream-subscribed", function(evt){
      console.log("Subscribed Stream");
      let stream = evt.stream;
      if (numPeople==0) {
        addVideoStream1(stream.getId()); 

        stream.play(stream.getId());
    } else if (numPeople==1){
        addVideoStream2(stream.getId()); 
        stream.play(stream.getId());
    }else if (numPeople==2){
        addVideoStream3(stream.getId()); 
        stream.play(stream.getId());
    }else{
        console.log("no more room to add people")
    }
    
  })


  client.on("peer-leave", function (evt) {
      console.log("Peer has left")
      removeVideoStream(evt)}
      )
}

document.getElementById("video-mute").onclick = function(){
  if(!isVidioMuted){
      globalStream.muteVideo();
      isVidioMuted = true;
  }else{
      globalStream.unmuteVideo();
      isVidioMuted = false;
  }
}

document.getElementById("audio-mute").onclick = function(){
  if(!isAudioMuted){
      globalStream.muteAudio();
      isAudioMuted = true;
  }else{
      globalStream.unmuteAudio();
      isAudioMuted = false;
  }
}

document.getElementById("upload").onclick = function() {
  if (recipeUploaded) {
    document.getElementById("recipe").href = currRecipe;
  }
  else {
    let link = document.getElementById("link");
    console.log(link.value)
    document.getElementById("recipe").href = link.value;
    recipeUploaded = true;
    currRecipe = link.value;
  }
  
}