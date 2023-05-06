let activo = false;
let modelo, escala;
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

AFRAME.registerComponent('tap-place', {
  init() {
    const ground = document.getElementById('ground')
    ground.addEventListener('click', (event) => {
      if(activo){
        // Create new entity for the new object
      const newElement = document.createElement('a-entity')

      // The raycaster gives a location of the touch in the scene
      const touchPoint = event.detail.intersection.point
      newElement.setAttribute('position', touchPoint)

      const randomYRotation = Math.random() * 360
      newElement.setAttribute('rotation', `0 ${randomYRotation} 0`)

      newElement.setAttribute('visible', 'false')
      newElement.setAttribute('scale', '0.0001 0.0001 0.0001')

      newElement.setAttribute('shadow', {
        receive: false,
      })

      switch(modelo){
        case 1:
          newElement.setAttribute('gltf-model', '#tmod')
          escala = '7 7 7'
          break;
        case 2:
          newElement.setAttribute('gltf-model', '#bramod')
          escala = '0.040 0.040 0.040'
          break;
        case 3:
          newElement.setAttribute('gltf-model', '#dinod')
          escala = '0.010 0.010 0.010'
          break;
        case 4:
          newElement.setAttribute('gltf-model', '#pte')
          escala = '5 5 5'
          break;
        case 5:
          newElement.setAttribute('gltf-model', '#megat')
          escala = '0.6 0.6 0.6'
          break;
        case 6:
          newElement.setAttribute('gltf-model', '#mosa')
          escala = '0.037 0.037 0.037'
          break;
        case 7:
          newElement.setAttribute('gltf-model', '#tri')
          escala = '0.7 0.7 0.7'
          break;
        case 8:
          newElement.setAttribute('gltf-model', '#velo')
          escala = '5 5 5'
          break;
      }

      this.el.sceneEl.appendChild(newElement)

      newElement.addEventListener('model-loaded', () => {
        // Once the model is loaded, we are ready to show it popping in using an animation
        newElement.setAttribute('visible', 'true')
        newElement.setAttribute('animation', {
          property: 'scale',
          to: `${escala}`,
          easing: 'easeOutElastic',
          dur: 800,
        })
      })
      activo = false;
      }
    })
  },
})

function tmod(){
  activo = true;
  modelo = 1;
}

function bramod(){
  activo = true;
  modelo = 2;
}

function dinod(){
  activo = true;
  modelo = 3;
}

function pte(){
  activo = true;
  modelo = 4;
}

function megat(){
  activo = true;
  modelo = 5;
}

function mosa(){
  activo = true;
  modelo = 6;
}

function tri(){
  activo = true;
  modelo = 7;
}

function velo(){
  activo = true;
  modelo = 8;
}