 
import {PeerSetup,uncode,code} from "./node_modules/nahdi-flowrtc/src/index.js"



// button
const CreateOfferBtn = document.getElementById("offer")
const CreateAnswerBtn = document.getElementById("answer")
const  EstablishConnection = document.getElementById("makeConnection")
const  close = document.getElementById("close")
const  ShowIce = document.getElementById("show-ice")
const  eatice = document.getElementById("eat-ice")

// text Area
const textice  = document.getElementById("textarea-ice")
const textareaoffer   = document.getElementById("textarea-offer")
const textareaanswer   = document.getElementById("textarea-anwser")

 

const  makeNewConnection = document.getElementById("makeNewConnection")

let  peer   
let  videoLocal = document.querySelector(".localVideo")
let  remoteStream = document.querySelector(".remoteVideo")



 const constraint = {
     video:true,
     audio:false
}
 
  
const icegoogle = {  
    iceServers: [{urls: "stun:stun.l.google.com:19302"}]
}
 peer = new PeerSetup({
           constraint :  constraint,
           localVideoRef: videoLocal,
           remoteVideoRef: remoteStream,
           iceconf :icegoogle
 })

 
 
 
 













 



  CreateOfferBtn.onclick = async()=>{
    const offer = await peer.createOffer() 
    console.log(offer)
    textareaoffer.value = code(offer)
 }




 CreateAnswerBtn.onclick =async ()=>{

    const getOffer = uncode(document.getElementById("textarea-offer").value)
    console.log(getOffer)
   const answer = await peer.createAnswer(getOffer) 
    textareaanswer.value = JSON.stringify(answer)
 }

 
 









// IMPORTANT: "change-ice" video
// ICE configuration is critical for establishing connections.
// If ICE servers are not updated or exchanged properly,
// many video calls may fail.
// ICE (Interactive Connectivity Establishment) helps two devices
// find the best way to connect over the internet.
// It uses STUN/TURN servers to handle firewalls and NAT.
// Without proper ICE configuration, video/audio calls may fail.

 
// okay we design event fire when the ice come and  when you do setremotedes ur ice start come and
// you should send ur ice to other peer to know the way to come to you 
// so for now we do vanilla js  all things by hands  we gonna use  temparray to store our ice
// and send it to other peer  and  the reall thing you should do it by socket "when ice come send to other peer"
// so we have this event 

const tempIce = []
 
peer.on("candidate",(data)=>{
    console.log(data)
    tempIce.push(data)
    
})
peer.on("RemoteDescription",(data)=>{
    console.log(data) // this when you fire when your remotedesc not empty  so you should 
    // wait this event to  come to you to eat your ice
})




ShowIce.onclick = ()=>{
    textice.innerHTML = code(tempIce)
}

eatice.onclick = () => {
 const arrayIce  = uncode(document.getElementById("textarea-eat-ice").value)
 arrayIce.map((item)=> {
     peer.handleRemoteIceCandidate(item) // eat ice from textarea
 })
   

}




EstablishConnection.onclick = async ()=>{
    // here last step to connect  so this methode establishConnection(expect  answer to the  offer)
  const getOffer = uncode(document.getElementById("textarea-anwser").value)
  console.log(getOffer,"<==")
  peer.establishConnection(getOffer)  // ensure here to use uncode(<the offer>)
 
 }


 













 makeNewConnection.onclick =async ()=>{
    peer.initializeNewVideoSession()
}


close.onclick = ()=>{
    peer.closeConnection()
}
 





 