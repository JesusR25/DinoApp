let index = 0;
const modelos = ["trex", "brachi", "dinosaur", "pterodactyl", "mega", "mesasa", "triceratops", "velociraptor"];
const fichas = ["Brachiosaurus.png", "Megalodon.png", "Mosasaurus.png", "Pterodactylo.png", "Stegosaurus.png", "TRex.png", "Triceratops.png", "Velociraptor.png"];

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
  if (index == 8) {
    index = 0;
    document.querySelector(`#${provmod[index]}`).setAttribute("visible", true);
    provmod.splice(index, 1);
    document.getElementById("inf").removeAttribute('src');
    if (document.getElementById('ch').checked) {
      document.getElementById("inf").src = "../../assets/Fichas/Acuaticos/" + `#${provimg[index]}`;
      document.getElementById("imagenes").style.display = "block";
    }
    provmod.forEach(function (numero) {
      document.querySelector(`#${provmod[index]}`).setAttribute("visible", false);
    });
    index++;
    provmod = modelos;
  }else{
    provmod.forEach(function(numero) {
      console.log(numero);
  });
    document.querySelector(`#${provmod[index]}`).setAttribute("visible", true);
    provmod.splice(index, 1);
    document.getElementById("inf").removeAttribute('src');
    if (document.getElementById('ch').checked) {
      document.getElementById("inf").src = "../../assets/Fichas/" + `#${provimg[index]}`;
      document.getElementById("imagenes").style.display = "block";
    }
    provmod.forEach(function (numero) {
      document.querySelector(`#${numero}`).setAttribute("visible", false);
    });
    index++;
    provmod = modelos;
  }
}

function anterior(){

}
