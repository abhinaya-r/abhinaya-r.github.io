let handlefail = function(err){
    console.log(err)
}
let numPeople = 0;
let participants = []

function addVideoStream1(streamId, username){
    console.log()
    let remoteContainer = document.getElementById("remoteStream1");
    let name = document.getElementById("participants");
    let streamDiv = document.createElement("div");
    streamDiv.id = streamId;
    // streamDiv.style.transform = "rotateY(180deg)";
    console.log(username);
    name.value=username;
    streamDiv.style.height = "200px"
    remoteContainer.appendChild(streamDiv)
    numPeople++;
} 

function addVideoStream2(streamId, username){
    console.log()
    let remoteContainer = document.getElementById("remoteStream2");
    let name = document.getElementById("participants");
    let streamDiv = document.createElement("div");
    streamDiv.id = streamId;
    // streamDiv.style.transform = "rotateY(180deg)";
    console.log(username);
    name.value=username;
    streamDiv.style.height = "200px"
    remoteContainer.appendChild(streamDiv)
    numPeople++;
} 

function addVideoStream3(streamId, username){
    console.log()
    let remoteContainer = document.getElementById("remoteStream3");
    let name = document.getElementById("participants");
    let streamDiv = document.createElement("div");
    streamDiv.id = streamId;
    // streamDiv.style.transform = "rotateY(180deg)";
    console.log(username);
    name.value=username;
    streamDiv.style.height = "200px"
    remoteContainer.appendChild(streamDiv)
    numPeople++;
} 

document.getElementById("join").onclick = function () {
    let channelName = document.getElementById("channelName").value;
    let Username = document.getElementById("username").value;
    let people = document.getElementById("participants")
    participants.push(Username)
    console.log(participants);
    plist = ""
    // for (person in participants) {
    //     console.log("printing person")
    //     console.log(person);
    //     plist += person + "\n"
    // }
    console.log("participants:")
    participants.forEach(element => console.log(element));
    participants.forEach(element => plist += element + "\n");
   
    people.textContext = plist;
    let appId = "53ca517bfccd44f388878863903c1dc8";
    

    let client = AgoraRTC.createClient({
        mode: "live",
        codec: "h264"
    })

    client.init(appId,() => console.log("AgoraRTC Client Connected"),handlefail
    )

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
            addVideoStream1(stream.getId(), Username);  
            stream.play(stream.getId());
        } else if (numPeople==1){
            addVideoStream2(stream.getId(), Username); 
            stream.play(stream.getId());
        }else if (numPeople==2){
            addVideoStream3(stream.getId(), Username); 
            stream.play(stream.getId());
        }else{
            console.log("no more room to add people")
        }
        
    })

}