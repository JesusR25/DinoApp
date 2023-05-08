let activo = false;
let actmod = true;
let modelo, escala;
let mega = true;
let modmega;
let modbrachi;
let modmesa;
let modpte;
let moddino;
let modtrex;
let modtri;
let modvelo;
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
          newElement.setAttribute('id', 'trex')
          newElement.setAttribute('gltf-model', '#tmod')
          escala = '7 7 7'
          break;
        case 2:
          newElement.setAttribute('id', 'brachi')
          newElement.setAttribute('gltf-model', '#bramod')
          escala = '0.040 0.040 0.040'
          break;
        case 3:
          newElement.setAttribute('id', 'dinosaur')
          newElement.setAttribute('gltf-model', '#dinod')
          escala = '0.010 0.010 0.010'
          break;
        case 4:
          newElement.setAttribute('id', 'ptero')
          newElement.setAttribute('gltf-model', '#pte')
          escala = '5 5 5'
          break;
        case 5:
          newElement.setAttribute('id', 'mega')
          newElement.setAttribute('gltf-model', '#megat')
          escala = '0.6 0.6 0.6'
          break;
        case 6:
          newElement.setAttribute('id', 'mesasa')
          newElement.setAttribute('gltf-model', '#mosa')
          escala = '0.037 0.037 0.037'
          break;
        case 7:
          newElement.setAttribute('id', 'triceratops')
          newElement.setAttribute('gltf-model', '#tri')
          escala = '0.7 0.7 0.7'
          break;
        case 8:
          newElement.setAttribute('id', 'velociraptor')
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
      componentes(modelo);
      activo = false;
      actmod = true;
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

//Controlador para movimientos
AFRAME.registerComponent("movtrex", {
  init: function () {
      // track markerFound/markerLost
      // grab the model reference
      console.log("Movimiento");
      if(actmod){
        document.querySelector("#trex").addEventListener("model-loaded", evt => {
          modtrex = evt.detail.model;
            this.mesh = evt.detail.model
        })
        // hammerjs input helper
        const hammertime = new Hammer(document.body);
  
        // scale
        // scale is tricky, because it resets
        var currentScale = 1;
        hammertime.get('pinch').set({ enable: true });
        hammertime.on("pinchstart", (ev) => {
            currentScale = this.mesh.scale.x;
        })
        hammertime.on("pinchmove", (ev) => {
            if (!mega) return;
            modtrex.scale.multiplyScalar(0).addScalar(ev.scale * currentScale);
        });
  
        // rotation
        // pan left/right for rotation
        this.isPanning = false;
        var xrot = false;
        hammertime.on("panleft", () => {
            if (!mega) return;
            this.isPanning = true
            modtrex.rotation.y -= 4 * Math.PI / 360;
        })
  
        hammertime.on("panright", () => {
            if (!mega) return;
            this.isPanning = true
            modtrex.rotation.y += 4 * Math.PI / 360;
        })
  
        hammertime.on("panup", () => {
            if (!mega) return;
            xrot = true;
            modtrex.rotation.x -= 4 * Math.PI / 360;
        })
  
        hammertime.on("pandown", () => {
            if (!mega) return;
            xrot = true;
            modtrex.rotation.x += 4 * Math.PI / 360;
        })
  
  
        hammertime.on("panend", () => this.isPanning = false, xrot = false)
        hammertime.on("pancancel", () => this.isPanning = false, xrot = false)
  
        hammertime.on("swipeleft", ({ velocity }) => {
            if (!mega) return;
            console.log("swipeeee");
            this.swipeVelocity = velocity
        })
        hammertime.on("swiperight", ({ velocity }) => {
            if (!mega) return;
            this.swipeVelocity = velocity
        })
        hammertime.on("swipeup", ({ velocity }) => {
            if (!mega) return;
            this.swipeVelocity = velocity
        })
        hammertime.on("swipedown", ({ velocity }) => {
            if (!mega) return;
            this.swipeVelocity = velocity
        })
      }
  },
  tick: function () {
      if (!(mega && this.swipeVelocity && !this.isPanning)){
          return;
      }else{
          modtrex.rotation.y += this.swipeVelocity * 4 * Math.PI / 360;
          //this.mesh.rotation.x += this.swipeVelocity * 4 * Math.PI / 360;
          this.swipeVelocity *= 0.93;
          if (Math.abs(this.swipeVelocity) <= 0.1) this.swipeVelocity = 0;
      }
      
      
  }
})

//Controlador para movimientos brachiosaurus
AFRAME.registerComponent("movbra", {
  init: function () {
      // track markerFound/markerLost
      // grab the model reference
      if(actmod){
        document.querySelector("#brachi").addEventListener("model-loaded", evt => {
          modbrachi = evt.detail.model;
            this.mesh = evt.detail.model
        })
        // hammerjs input helper
        const hammertime = new Hammer(document.body);
  
        // scale
        // scale is tricky, because it resets
        var currentScale = 1;
        hammertime.get('pinch').set({ enable: true });
        hammertime.on("pinchstart", (ev) => {
            currentScale = this.mesh.scale.x;
        })
        hammertime.on("pinchmove", (ev) => {
            if (!mega) return;
            modbrachi.scale.multiplyScalar(0).addScalar(ev.scale * currentScale);
        });
  
        // rotation
        // pan left/right for rotation
        this.isPanning = false;
        var xrot = false;
        hammertime.on("panleft", () => {
            if (!mega) return;
            this.isPanning = true
            modbrachi.rotation.y -= 4 * Math.PI / 360;
        })
  
        hammertime.on("panright", () => {
            if (!mega) return;
            this.isPanning = true
            modbrachi.rotation.y += 4 * Math.PI / 360;
        })
  
        hammertime.on("panup", () => {
            if (!mega) return;
            xrot = true;
            modbrachi.rotation.x -= 4 * Math.PI / 360;
        })
  
        hammertime.on("pandown", () => {
            if (!mega) return;
            xrot = true;
            modbrachi.rotation.x += 4 * Math.PI / 360;
        })
  
  
        hammertime.on("panend", () => this.isPanning = false, xrot = false)
        hammertime.on("pancancel", () => this.isPanning = false, xrot = false)
  
        hammertime.on("swipeleft", ({ velocity }) => {
            if (!mega) return;
            console.log("swipeeee");
            this.swipeVelocity = velocity
        })
        hammertime.on("swiperight", ({ velocity }) => {
            if (!mega) return;
            this.swipeVelocity = velocity
        })
        hammertime.on("swipeup", ({ velocity }) => {
            if (!mega) return;
            this.swipeVelocity = velocity
        })
        hammertime.on("swipedown", ({ velocity }) => {
            if (!mega) return;
            this.swipeVelocity = velocity
        })
      }
  },
  tick: function () {
      if (!(mega && this.swipeVelocity && !this.isPanning)){
          return;
      }else{
          modbrachi.rotation.y += this.swipeVelocity * 4 * Math.PI / 360;
          //this.mesh.rotation.x += this.swipeVelocity * 4 * Math.PI / 360;
          this.swipeVelocity *= 0.93;
          if (Math.abs(this.swipeVelocity) <= 0.1) this.swipeVelocity = 0;
      }
      
      
  }
})

//Controlador para movimientos dinosaur
AFRAME.registerComponent("movdino", {
  init: function () {
      // track markerFound/markerLost
      // grab the model reference
      if(actmod){
        document.querySelector("#dinosaur").addEventListener("model-loaded", evt => {
          moddino = evt.detail.model;
            this.mesh = evt.detail.model
        })
        // hammerjs input helper
        const hammertime = new Hammer(document.body);
  
        // scale
        // scale is tricky, because it resets
        var currentScale = 1;
        hammertime.get('pinch').set({ enable: true });
        hammertime.on("pinchstart", (ev) => {
            currentScale = this.mesh.scale.x;
        })
        hammertime.on("pinchmove", (ev) => {
            if (!mega) return;
            moddino.scale.multiplyScalar(0).addScalar(ev.scale * currentScale);
        });
  
        // rotation
        // pan left/right for rotation
        this.isPanning = false;
        var xrot = false;
        hammertime.on("panleft", () => {
            if (!mega) return;
            this.isPanning = true
            moddino.rotation.y -= 4 * Math.PI / 360;
        })
  
        hammertime.on("panright", () => {
            if (!mega) return;
            this.isPanning = true
            moddino.rotation.y += 4 * Math.PI / 360;
        })
  
        hammertime.on("panup", () => {
            if (!mega) return;
            xrot = true;
            moddino.rotation.x -= 4 * Math.PI / 360;
        })
  
        hammertime.on("pandown", () => {
            if (!mega) return;
            xrot = true;
            moddino.rotation.x += 4 * Math.PI / 360;
        })
  
  
        hammertime.on("panend", () => this.isPanning = false, xrot = false)
        hammertime.on("pancancel", () => this.isPanning = false, xrot = false)
  
        hammertime.on("swipeleft", ({ velocity }) => {
            if (!mega) return;
            console.log("swipeeee");
            this.swipeVelocity = velocity
        })
        hammertime.on("swiperight", ({ velocity }) => {
            if (!mega) return;
            this.swipeVelocity = velocity
        })
        hammertime.on("swipeup", ({ velocity }) => {
            if (!mega) return;
            this.swipeVelocity = velocity
        })
        hammertime.on("swipedown", ({ velocity }) => {
            if (!mega) return;
            this.swipeVelocity = velocity
        })
      }
  },
  tick: function () {
      if (!(mega && this.swipeVelocity && !this.isPanning)){
          return;
      }else{
          moddino.rotation.y += this.swipeVelocity * 4 * Math.PI / 360;
          //this.mesh.rotation.x += this.swipeVelocity * 4 * Math.PI / 360;
          this.swipeVelocity *= 0.93;
          if (Math.abs(this.swipeVelocity) <= 0.1) this.swipeVelocity = 0;
      }
      
      
  }
})

//Controlador para movimientos pterodactyl
AFRAME.registerComponent("movpte", {
  init: function () {
      // track markerFound/markerLost
      // grab the model reference
      if(actmod){
        document.querySelector("#ptero").addEventListener("model-loaded", evt => {
          modpte = evt.detail.model;
            this.mesh = evt.detail.model
        })
        // hammerjs input helper
        const hammertime = new Hammer(document.body);
  
        // scale
        // scale is tricky, because it resets
        var currentScale = 1;
        hammertime.get('pinch').set({ enable: true });
        hammertime.on("pinchstart", (ev) => {
            currentScale = this.mesh.scale.x;
        })
        hammertime.on("pinchmove", (ev) => {
            if (!mega) return;
            modpte.scale.multiplyScalar(0).addScalar(ev.scale * currentScale);
        });
  
        // rotation
        // pan left/right for rotation
        this.isPanning = false;
        var xrot = false;
        hammertime.on("panleft", () => {
            if (!mega) return;
            this.isPanning = true
            modpte.rotation.y -= 4 * Math.PI / 360;
        })
  
        hammertime.on("panright", () => {
            if (!mega) return;
            this.isPanning = true
            modpte.rotation.y += 4 * Math.PI / 360;
        })
  
        hammertime.on("panup", () => {
            if (!mega) return;
            xrot = true;
            modpte.rotation.x -= 4 * Math.PI / 360;
        })
  
        hammertime.on("pandown", () => {
            if (!mega) return;
            xrot = true;
            modpte.rotation.x += 4 * Math.PI / 360;
        })
  
  
        hammertime.on("panend", () => this.isPanning = false, xrot = false)
        hammertime.on("pancancel", () => this.isPanning = false, xrot = false)
  
        hammertime.on("swipeleft", ({ velocity }) => {
            if (!mega) return;
            console.log("swipeeee");
            this.swipeVelocity = velocity
        })
        hammertime.on("swiperight", ({ velocity }) => {
            if (!mega) return;
            this.swipeVelocity = velocity
        })
        hammertime.on("swipeup", ({ velocity }) => {
            if (!mega) return;
            this.swipeVelocity = velocity
        })
        hammertime.on("swipedown", ({ velocity }) => {
            if (!mega) return;
            this.swipeVelocity = velocity
        })
      }
  },
  tick: function () {
      if (!(mega && this.swipeVelocity && !this.isPanning)){
          return;
      }else{
          modpte.rotation.y += this.swipeVelocity * 4 * Math.PI / 360;
          //this.mesh.rotation.x += this.swipeVelocity * 4 * Math.PI / 360;
          this.swipeVelocity *= 0.93;
          if (Math.abs(this.swipeVelocity) <= 0.1) this.swipeVelocity = 0;
      }
      
      
  }
})

//Controlador para movimientos mega
AFRAME.registerComponent("movmega", {
  init: function () {
      // track markerFound/markerLost
      // grab the model reference
      if(actmod){
        document.querySelector("#mega").addEventListener("model-loaded", evt => {
          modmega = evt.detail.model;
            this.mesh = evt.detail.model
        })
        // hammerjs input helper
        const hammertime = new Hammer(document.body);
  
        // scale
        // scale is tricky, because it resets
        var currentScale = 1;
        hammertime.get('pinch').set({ enable: true });
        hammertime.on("pinchstart", (ev) => {
            currentScale = this.mesh.scale.x;
        })
        hammertime.on("pinchmove", (ev) => {
            if (!mega) return;
            modmega.scale.multiplyScalar(0).addScalar(ev.scale * currentScale);
        });
  
        // rotation
        // pan left/right for rotation
        this.isPanning = false;
        var xrot = false;
        hammertime.on("panleft", () => {
            if (!mega) return;
            this.isPanning = true
            modmega.rotation.y -= 4 * Math.PI / 360;
        })
  
        hammertime.on("panright", () => {
            if (!mega) return;
            this.isPanning = true
            modmega.rotation.y += 4 * Math.PI / 360;
        })
  
        hammertime.on("panup", () => {
            if (!mega) return;
            xrot = true;
            modmega.rotation.x -= 4 * Math.PI / 360;
        })
  
        hammertime.on("pandown", () => {
            if (!mega) return;
            xrot = true;
            modmega.rotation.x += 4 * Math.PI / 360;
        })
  
  
        hammertime.on("panend", () => this.isPanning = false, xrot = false)
        hammertime.on("pancancel", () => this.isPanning = false, xrot = false)
  
        hammertime.on("swipeleft", ({ velocity }) => {
            if (!mega) return;
            console.log("swipeeee");
            this.swipeVelocity = velocity
        })
        hammertime.on("swiperight", ({ velocity }) => {
            if (!mega) return;
            this.swipeVelocity = velocity
        })
        hammertime.on("swipeup", ({ velocity }) => {
            if (!mega) return;
            this.swipeVelocity = velocity
        })
        hammertime.on("swipedown", ({ velocity }) => {
            if (!mega) return;
            this.swipeVelocity = velocity
        })
      }
  },
  tick: function () {
      if (!(mega && this.swipeVelocity && !this.isPanning)){
          return;
      }else{
          modmega.rotation.y += this.swipeVelocity * 4 * Math.PI / 360;
          //this.mesh.rotation.x += this.swipeVelocity * 4 * Math.PI / 360;
          this.swipeVelocity *= 0.93;
          if (Math.abs(this.swipeVelocity) <= 0.1) this.swipeVelocity = 0;
      }
      
      
  }
})

//Controlador para movimientos mesasa
AFRAME.registerComponent("movmesasa", {
  init: function () {
      // track markerFound/markerLost
      // grab the model reference
      if(actmod){
        document.querySelector("#mesasa").addEventListener("model-loaded", evt => {
          modmesa = evt.detail.model;
            this.mesh = evt.detail.model
        })
        // hammerjs input helper
        const hammertime = new Hammer(document.body);
  
        // scale
        // scale is tricky, because it resets
        var currentScale = 1;
        hammertime.get('pinch').set({ enable: true });
        hammertime.on("pinchstart", (ev) => {
            currentScale = this.mesh.scale.x;
        })
        hammertime.on("pinchmove", (ev) => {
            if (!mega) return;
            modmesa.scale.multiplyScalar(0).addScalar(ev.scale * currentScale);
        });
  
        // rotation
        // pan left/right for rotation
        this.isPanning = false;
        var xrot = false;
        hammertime.on("panleft", () => {
            if (!mega) return;
            this.isPanning = true
            modmesa.rotation.y -= 4 * Math.PI / 360;
        })
  
        hammertime.on("panright", () => {
            if (!mega) return;
            this.isPanning = true
            modmesa.rotation.y += 4 * Math.PI / 360;
        })
  
        hammertime.on("panup", () => {
            if (!mega) return;
            xrot = true;
            modmesa.rotation.x -= 4 * Math.PI / 360;
        })
  
        hammertime.on("pandown", () => {
            if (!mega) return;
            xrot = true;
            modmesa.rotation.x += 4 * Math.PI / 360;
        })
  
  
        hammertime.on("panend", () => this.isPanning = false, xrot = false)
        hammertime.on("pancancel", () => this.isPanning = false, xrot = false)
  
        hammertime.on("swipeleft", ({ velocity }) => {
            if (!mega) return;
            console.log("swipeeee");
            this.swipeVelocity = velocity
        })
        hammertime.on("swiperight", ({ velocity }) => {
            if (!mega) return;
            this.swipeVelocity = velocity
        })
        hammertime.on("swipeup", ({ velocity }) => {
            if (!mega) return;
            this.swipeVelocity = velocity
        })
        hammertime.on("swipedown", ({ velocity }) => {
            if (!mega) return;
            this.swipeVelocity = velocity
        })
      }
  },
  tick: function () {
      if (!(mega && this.swipeVelocity && !this.isPanning)){
          return;
      }else{
          modmesa.rotation.y += this.swipeVelocity * 4 * Math.PI / 360;
          //this.mesh.rotation.x += this.swipeVelocity * 4 * Math.PI / 360;
          this.swipeVelocity *= 0.93;
          if (Math.abs(this.swipeVelocity) <= 0.1) this.swipeVelocity = 0;
      }
      
      
  }
})

//Controlador para movimientos triceratops
AFRAME.registerComponent("movtri", {
  init: function () {
      // track markerFound/markerLost
      // grab the model reference
      if(actmod){
        document.querySelector("#triceratops").addEventListener("model-loaded", evt => {
          modtri = evt.detail.model;
            this.mesh = evt.detail.model
        })
        // hammerjs input helper
        const hammertime = new Hammer(document.body);
  
        // scale
        // scale is tricky, because it resets
        var currentScale = 1;
        hammertime.get('pinch').set({ enable: true });
        hammertime.on("pinchstart", (ev) => {
            currentScale = this.mesh.scale.x;
        })
        hammertime.on("pinchmove", (ev) => {
            if (!mega) return;
            modtri.scale.multiplyScalar(0).addScalar(ev.scale * currentScale);
        });
  
        // rotation
        // pan left/right for rotation
        this.isPanning = false;
        var xrot = false;
        hammertime.on("panleft", () => {
            if (!mega) return;
            this.isPanning = true
            modtri.rotation.y -= 4 * Math.PI / 360;
        })
  
        hammertime.on("panright", () => {
            if (!mega) return;
            this.isPanning = true
            modtri.rotation.y += 4 * Math.PI / 360;
        })
  
        hammertime.on("panup", () => {
            if (!mega) return;
            xrot = true;
            modtri.rotation.x -= 4 * Math.PI / 360;
        })
  
        hammertime.on("pandown", () => {
            if (!mega) return;
            xrot = true;
            modtri.rotation.x += 4 * Math.PI / 360;
        })
  
  
        hammertime.on("panend", () => this.isPanning = false, xrot = false)
        hammertime.on("pancancel", () => this.isPanning = false, xrot = false)
  
        hammertime.on("swipeleft", ({ velocity }) => {
            if (!mega) return;
            console.log("swipeeee");
            this.swipeVelocity = velocity
        })
        hammertime.on("swiperight", ({ velocity }) => {
            if (!mega) return;
            this.swipeVelocity = velocity
        })
        hammertime.on("swipeup", ({ velocity }) => {
            if (!mega) return;
            this.swipeVelocity = velocity
        })
        hammertime.on("swipedown", ({ velocity }) => {
            if (!mega) return;
            this.swipeVelocity = velocity
        })
      }
  },
  tick: function () {
      if (!(mega && this.swipeVelocity && !this.isPanning)){
          return;
      }else{
          modtri.rotation.y += this.swipeVelocity * 4 * Math.PI / 360;
          //this.mesh.rotation.x += this.swipeVelocity * 4 * Math.PI / 360;
          this.swipeVelocity *= 0.93;
          if (Math.abs(this.swipeVelocity) <= 0.1) this.swipeVelocity = 0;
      }
      
      
  }
})

//Controlador para movimientos velociraptor
AFRAME.registerComponent("movvelo", {
  init: function () {
      // track markerFound/markerLost
      // grab the model reference
      if(actmod){
        document.querySelector("#velociraptor").addEventListener("model-loaded", evt => {
          modvelo = evt.detail.model;
            this.mesh = evt.detail.model
        })
        // hammerjs input helper
        const hammertime = new Hammer(document.body);
  
        // scale
        // scale is tricky, because it resets
        var currentScale = 1;
        hammertime.get('pinch').set({ enable: true });
        hammertime.on("pinchstart", (ev) => {
            currentScale = this.mesh.scale.x;
        })
        hammertime.on("pinchmove", (ev) => {
            if (!mega) return;
            modvelo.scale.multiplyScalar(0).addScalar(ev.scale * currentScale);
        });
  
        // rotation
        // pan left/right for rotation
        this.isPanning = false;
        var xrot = false;
        hammertime.on("panleft", () => {
            if (!mega) return;
            this.isPanning = true
            modvelo.rotation.y -= 4 * Math.PI / 360;
        })
  
        hammertime.on("panright", () => {
            if (!mega) return;
            this.isPanning = true
            modvelo.rotation.y += 4 * Math.PI / 360;
        })
  
        hammertime.on("panup", () => {
            if (!mega) return;
            xrot = true;
            modvelo.rotation.x -= 4 * Math.PI / 360;
        })
  
        hammertime.on("pandown", () => {
            if (!mega) return;
            xrot = true;
            modvelo.rotation.x += 4 * Math.PI / 360;
        })
  
  
        hammertime.on("panend", () => this.isPanning = false, xrot = false)
        hammertime.on("pancancel", () => this.isPanning = false, xrot = false)
  
        hammertime.on("swipeleft", ({ velocity }) => {
            if (!mega) return;
            console.log("swipeeee");
            this.swipeVelocity = velocity
        })
        hammertime.on("swiperight", ({ velocity }) => {
            if (!mega) return;
            this.swipeVelocity = velocity
        })
        hammertime.on("swipeup", ({ velocity }) => {
            if (!mega) return;
            this.swipeVelocity = velocity
        })
        hammertime.on("swipedown", ({ velocity }) => {
            if (!mega) return;
            this.swipeVelocity = velocity
        })
      }
  },
  tick: function () {
      if (!(mega && this.swipeVelocity && !this.isPanning)){
          return;
      }else{
          modvelo.rotation.y += this.swipeVelocity * 4 * Math.PI / 360;
          //this.mesh.rotation.x += this.swipeVelocity * 4 * Math.PI / 360;
          this.swipeVelocity *= 0.93;
          if (Math.abs(this.swipeVelocity) <= 0.1) this.swipeVelocity = 0;
      }
      
      
  }
})

function componentes(modelo) {
  switch (modelo) {
    case 1:
      document.querySelector('a-scene').setAttribute('movtrex', '');
      document.querySelector('a-scene').removeAttribute('movbra');
      document.querySelector('a-scene').removeAttribute('movdino');
      document.querySelector('a-scene').removeAttribute('movpte');
      document.querySelector('a-scene').removeAttribute('movmega');
      document.querySelector('a-scene').removeAttribute('movmesasa');
      document.querySelector('a-scene').removeAttribute('movtri');
      document.querySelector('a-scene').removeAttribute('movvelo');
      break;
    case 2:
      document.querySelector('a-scene').setAttribute('movbra', '');
      document.querySelector('a-scene').removeAttribute('movtrex');
      document.querySelector('a-scene').removeAttribute('movdino');
      document.querySelector('a-scene').removeAttribute('movpte');
      document.querySelector('a-scene').removeAttribute('movmega');
      document.querySelector('a-scene').removeAttribute('movmesasa');
      document.querySelector('a-scene').removeAttribute('movtri');
      document.querySelector('a-scene').removeAttribute('movvelo');
      break;
    case 3:
      document.querySelector('a-scene').setAttribute('movdino', '');
      document.querySelector('a-scene').removeAttribute('movbra');
      document.querySelector('a-scene').removeAttribute('movtrex');
      document.querySelector('a-scene').removeAttribute('movpte');
      document.querySelector('a-scene').removeAttribute('movmega');
      document.querySelector('a-scene').removeAttribute('movmesasa');
      document.querySelector('a-scene').removeAttribute('movtri');
      document.querySelector('a-scene').removeAttribute('movvelo');
      break;
    case 4:
      document.querySelector('a-scene').setAttribute('movpte', '');
      document.querySelector('a-scene').removeAttribute('movbra');
      document.querySelector('a-scene').removeAttribute('movdino');
      document.querySelector('a-scene').removeAttribute('movtrex');
      document.querySelector('a-scene').removeAttribute('movmega');
      document.querySelector('a-scene').removeAttribute('movmesasa');
      document.querySelector('a-scene').removeAttribute('movtri');
      document.querySelector('a-scene').removeAttribute('movvelo');
      break;
    case 5:
      document.querySelector('a-scene').setAttribute('movmega', '');
      document.querySelector('a-scene').removeAttribute('movbra');
      document.querySelector('a-scene').removeAttribute('movdino');
      document.querySelector('a-scene').removeAttribute('movpte');
      document.querySelector('a-scene').removeAttribute('movtrex');
      document.querySelector('a-scene').removeAttribute('movmesasa');
      document.querySelector('a-scene').removeAttribute('movtri');
      document.querySelector('a-scene').removeAttribute('movvelo');
      break;
    case 6:
      document.querySelector('a-scene').setAttribute('movmesasa', '');
      document.querySelector('a-scene').removeAttribute('movbra');
      document.querySelector('a-scene').removeAttribute('movdino');
      document.querySelector('a-scene').removeAttribute('movpte');
      document.querySelector('a-scene').removeAttribute('movmega');
      document.querySelector('a-scene').removeAttribute('movtrex');
      document.querySelector('a-scene').removeAttribute('movtri');
      document.querySelector('a-scene').removeAttribute('movvelo');
      break;
    case 7:
      document.querySelector('a-scene').setAttribute('movtri', '');
      document.querySelector('a-scene').removeAttribute('movbra');
      document.querySelector('a-scene').removeAttribute('movdino');
      document.querySelector('a-scene').removeAttribute('movpte');
      document.querySelector('a-scene').removeAttribute('movmega');
      document.querySelector('a-scene').removeAttribute('movmesasa');
      document.querySelector('a-scene').removeAttribute('movtrex');
      document.querySelector('a-scene').removeAttribute('movvelo');
      break;
    case 8:
      document.querySelector('a-scene').setAttribute('movvelo', '');
      document.querySelector('a-scene').removeAttribute('movbra');
      document.querySelector('a-scene').removeAttribute('movdino');
      document.querySelector('a-scene').removeAttribute('movpte');
      document.querySelector('a-scene').removeAttribute('movmega');
      document.querySelector('a-scene').removeAttribute('movmesasa');
      document.querySelector('a-scene').removeAttribute('movtri');
      document.querySelector('a-scene').removeAttribute('movtrex');
      break;
  }
}