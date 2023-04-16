let index = -1;
const modelos = ["brachi",  "mesasa", "pterodactyl", "dinosaur", "trex", "triceratops", "velociraptor", "mega"];
const fichas = ["Brachiosaurus.png", "Mosasaurus.png", "Pterodactylo.png", "Stegosaurus.png", "TRex.png", "Triceratops.png", "Velociraptor.png", "Megalodon.png"];

function onQRCodeScanned(scannedText)
{
}

//funtion returning a promise with a video stream
function provideVideoQQ()
{
    return navigator.mediaDevices.enumerateDevices()
    .then(function(devices) {
        var exCameras = [];
        devices.forEach(function(device) {
        if (device.kind === 'videoinput') {
          exCameras.push(device.deviceId)
        }
     });
        
        return Promise.resolve(exCameras);
    }).then(function(ids){
        if(ids.length === 0)
        {
          return Promise.reject('Could not find a webcam');
        }
        
        return navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: 'environment'
            }
        });        
    });                
}  

//this function will be called when JsQRScanner is ready to use
function JsQRScannerReady()
{
    //create a new scanner passing to it a callback function that will be invoked when
    //the scanner succesfully scan a QR code
    var jbScanner = new JsQRScanner(onQRCodeScanned, provideVideoQQ);
    //reduce the size of analyzed images to increase performance on mobile devices
    jbScanner.setSnapImageMaxSize(300);
    var scannerParentElement = document.getElementById("scanner");
    if(scannerParentElement)
    {
        //append the jbScanner to an existing DOM element
        jbScanner.appendTo(scannerParentElement);
    }        
}

function siguiente() {
  let provmod = modelos;
  let provimg = fichas;
  if (index == 7) {
    index = 0;
    document.querySelector(`#${provmod[index]}`).setAttribute("visible", true);
    document.querySelector(`#${provmod[7]}`).setAttribute("visible", false);
    document.getElementById("inf").src = "../../assets/Fichas/" + `${provimg[index]}`;
    document.getElementById("imagenes").style.display = "block";
  } else {
    index++;
    for(var i=0; i<modelos.length; i++){
      if(i == index){
        document.querySelector(`#${provmod[i]}`).setAttribute("visible", true);
      }else{
        document.querySelector(`#${provmod[i]}`).setAttribute("visible", false);
      }
      document.getElementById("inf").src = "../../assets/Fichas/" + `${provimg[index]}`;
      document.getElementById("imagenes").style.display = "block";
     }
  }
}

function anterior(){
  let provmod = modelos;
  let provimg = fichas;
  if(index <= 0){
    index = 7;
    document.querySelector(`#${provmod[index]}`).setAttribute("visible", true);
    document.querySelector(`#${provmod[0]}`).setAttribute("visible", false);
    document.getElementById("inf").src = "../../assets/Fichas/" + `${provimg[index]}`;
    document.getElementById("imagenes").style.display = "block";
  }else{
    index--;
    for(var i=0; i<modelos.length; i++){
      if(i == index){
        document.querySelector(`#${provmod[i]}`).setAttribute("visible", true);
      }else{
        document.querySelector(`#${provmod[i]}`).setAttribute("visible", false);
      }
     }
     document.getElementById("inf").src = "../../assets/Fichas/" + `${provimg[index]}`;
    document.getElementById("imagenes").style.display = "block";
  }
}

function volver(){
  window.location.href = "../Paginas/Menu.html";
}

function ocultar(){
  document.getElementById('imagenes').style.display = "none";
}