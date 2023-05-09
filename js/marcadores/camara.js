let activo = false;
let actmod = true;
let modelo, escala;
let brachi = true;
let mesasa = true;
let pterodactyl = true;
let dinosaur = true;
let trex = true;
let triceratops = true;
let velociraptor = true;
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

      //const randomYRotation = Math.random() * 360
      //newElement.setAttribute('rotation', `0 ${randomYRotation} 0`)

      newElement.setAttribute('visible', 'false')
      newElement.setAttribute('scale', '0.0001 0.0001 0.0001')

      newElement.setAttribute('shadow', {
        receive: false,
      })

      switch(modelo){
        case 1:
          newElement.setAttribute('id', 'trex')
          newElement.setAttribute('gltf-model', '#tmod')
          newElement.setAttribute('animation-mixer', '')
          newElement.setAttribute('rotation', `0 0 0`)
          escala = '3 3 3'
          break;
        case 2:
          newElement.setAttribute('id', 'brachi')
          newElement.setAttribute('gltf-model', '#bramod')
          newElement.setAttribute('animation-mixer', '')
          newElement.setAttribute('rotation', `0 45 0`)
          escala = '0.040 0.040 0.040'
          break;
        case 3:
          newElement.setAttribute('id', 'dinosaur')
          newElement.setAttribute('gltf-model', '#dinod')
          newElement.setAttribute('animation-mixer', '')
          newElement.setAttribute('rotation', `0 25 0`)
          escala = '0.020 0.020 0.020'
          break;
        case 4:
          newElement.setAttribute('id', 'ptero')
          newElement.setAttribute('gltf-model', '#pte')
          newElement.setAttribute('animation-mixer', 'clip: flying')
          newElement.setAttribute('rotation', `0 30 0`)
          escala = '5 5 5'
          break;
        case 5:
          newElement.setAttribute('id', 'mega')
          newElement.setAttribute('gltf-model', '#megat')
          newElement.setAttribute('animation-mixer', 'clip: swimming_skeletal.3')
          newElement.setAttribute('rotation', `0 -20 0`)
          escala = '0.6 0.6 0.6'
          break;
        case 6:
          newElement.setAttribute('id', 'mesasa')
          newElement.setAttribute('gltf-model', '#mosa')
          newElement.setAttribute('animation-mixer', '')
          newElement.setAttribute('rotation', `0 -25 0`)
          escala = '0.020 0.020 0.020'
          break;
        case 7:
          newElement.setAttribute('id', 'triceratops')
          newElement.setAttribute('gltf-model', '#tri')
          newElement.setAttribute('animation-mixer', '')
          newElement.setAttribute('rotation', `0 25 0`)
          escala = '0.7 0.7 0.7'
          break;
        case 8:
          newElement.setAttribute('id', 'velociraptor')
          newElement.setAttribute('gltf-model', '#velo')
          newElement.setAttribute('animation-mixer', '')
          newElement.setAttribute('rotation', `0 -7 0`)
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
            if (!trex) return;
            modtrex.scale.multiplyScalar(0).addScalar(ev.scale * currentScale);
        });
  
        // rotation
        // pan left/right for rotation
        this.isPanning = false;
        var xrot = false;
        hammertime.on("panleft", () => {
            if (!trex) return;
            this.isPanning = true
            modtrex.position.x += 4 * Math.PI / 360;
        })
  
        hammertime.on("panright", () => {
            if (!trex) return;
            this.isPanning = true
            modtrex.position.x -= 4 * Math.PI / 360;
        })
  
        hammertime.on("panup", () => {
            if (!trex) return;
            xrot = true;
            modtrex.position.y += 4 * Math.PI / 360;
        })
  
        hammertime.on("pandown", () => {
            if (!trex) return;
            xrot = true;
            modtrex.position.y -= 4 * Math.PI / 360;
        })
  
  
        hammertime.on("panend", () => this.isPanning = false, xrot = false)
        hammertime.on("pancancel", () => this.isPanning = false, xrot = false)
  
        hammertime.on("swipeleft", ({ velocity }) => {
            if (!trex) return;
            console.log("swipeeee");
            this.swipeVelocity = velocity
        })
        hammertime.on("swiperight", ({ velocity }) => {
            if (!trex) return;
            this.swipeVelocity = velocity
        })
        hammertime.on("swipeup", ({ velocity }) => {
            if (!trex) return;
            this.swipeVelocity = velocity
        })
        hammertime.on("swipedown", ({ velocity }) => {
            if (!trex) return;
            this.swipeVelocity = velocity
        })
      }
  },
  tick: function () {
      if (!(trex && this.swipeVelocity && !this.isPanning)){
          return;
      }else{
          modtrex.position.y += this.swipeVelocity * 4 * Math.PI / 360;
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
            if (!brachi) return;
            modbrachi.scale.multiplyScalar(0).addScalar(ev.scale * currentScale);
        });
  
        // rotation
        // pan left/right for rotation
        this.isPanning = false;
        var xrot = false;
        hammertime.on("panleft", () => {
            if (!brachi) return;
            this.isPanning = true
            modbrachi.position.x += 120 * Math.PI / 360;
        })
  
        hammertime.on("panright", () => {
            if (!brachi) return;
            this.isPanning = true
            modbrachi.position.x -= 120 * Math.PI / 360;
        })
  
        hammertime.on("panup", () => {
            if (!brachi) return;
            xrot = true;
            modbrachi.position.y += 120 * Math.PI / 360;
        })
  
        hammertime.on("pandown", () => {
            if (!brachi) return;
            xrot = true;
            modbrachi.position.y -= 120 * Math.PI / 360;
        })
  
  
        hammertime.on("panend", () => this.isPanning = false, xrot = false)
        hammertime.on("pancancel", () => this.isPanning = false, xrot = false)
  
        hammertime.on("swipeleft", ({ velocity }) => {
            if (!brachi) return;
            console.log("swipeeee");
            this.swipeVelocity = velocity
        })
        hammertime.on("swiperight", ({ velocity }) => {
            if (!brachi) return;
            this.swipeVelocity = velocity
        })
        hammertime.on("swipeup", ({ velocity }) => {
            if (!brachi) return;
            this.swipeVelocity = velocity
        })
        hammertime.on("swipedown", ({ velocity }) => {
            if (!brachi) return;
            this.swipeVelocity = velocity
        })
      }
  },
  tick: function () {
      if (!(brachi && this.swipeVelocity && !this.isPanning)){
          return;
      }else{
          modbrachi.position.y += this.swipeVelocity * 4 * Math.PI / 360;
          //this.mesh.position.x += this.swipeVelocity * 4 * Math.PI / 360;
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
            if (!dinosaur) return;
            moddino.scale.multiplyScalar(0).addScalar(ev.scale * currentScale);
        });
  
        // position
        // pan left/right for position
        this.isPanning = false;
        var xrot = false;
        hammertime.on("panleft", () => {
            if (!dinosaur) return;
            this.isPanning = true
            moddino.position.x += 300 * Math.PI / 360;
        })
  
        hammertime.on("panright", () => {
            if (!dinosaur) return;
            this.isPanning = true
            moddino.position.x -= 300 * Math.PI / 360;
        })
  
        hammertime.on("panup", () => {
            if (!dinosaur) return;
            xrot = true;
            moddino.position.y += 300 * Math.PI / 360;
        })
  
        hammertime.on("pandown", () => {
            if (!dinosaur) return;
            xrot = true;
            moddino.position.y -= 300 * Math.PI / 360;
        })
  
  
        hammertime.on("panend", () => this.isPanning = false, xrot = false)
        hammertime.on("pancancel", () => this.isPanning = false, xrot = false)
  
        hammertime.on("swipeleft", ({ velocity }) => {
            if (!dinosaur) return;
            console.log("swipeeee");
            this.swipeVelocity = velocity
        })
        hammertime.on("swiperight", ({ velocity }) => {
            if (!dinosaur) return;
            this.swipeVelocity = velocity
        })
        hammertime.on("swipeup", ({ velocity }) => {
            if (!dinosaur) return;
            this.swipeVelocity = velocity
        })
        hammertime.on("swipedown", ({ velocity }) => {
            if (!dinosaur) return;
            this.swipeVelocity = velocity
        })
      }
  },
  tick: function () {
      if (!(dinosaur && this.swipeVelocity && !this.isPanning)){
          return;
      }else{
          moddino.position.y += this.swipeVelocity * 4 * Math.PI / 360;
          //this.mesh.position.x += this.swipeVelocity * 4 * Math.PI / 360;
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
            if (!pterodactyl) return;
            modpte.scale.multiplyScalar(0).addScalar(ev.scale * currentScale);
        });
  
        // position
        // pan left/right for position
        this.isPanning = false;
        var xrot = false;
        hammertime.on("panleft", () => {
            if (!pterodactyl) return;
            this.isPanning = true
            modpte.position.x += 4 * Math.PI / 360;
        })
  
        hammertime.on("panright", () => {
            if (!pterodactyl) return;
            this.isPanning = true
            modpte.position.x -= 4 * Math.PI / 360;
        })
  
        hammertime.on("panup", () => {
            if (!pterodactyl) return;
            xrot = true;
            modpte.position.y += 4 * Math.PI / 360;
        })
  
        hammertime.on("pandown", () => {
            if (!pterodactyl) return;
            xrot = true;
            modpte.position.y -= 4 * Math.PI / 360;
        })
  
  
        hammertime.on("panend", () => this.isPanning = false, xrot = false)
        hammertime.on("pancancel", () => this.isPanning = false, xrot = false)
  
        hammertime.on("swipeleft", ({ velocity }) => {
            if (!pterodactyl) return;
            console.log("swipeeee");
            this.swipeVelocity = velocity
        })
        hammertime.on("swiperight", ({ velocity }) => {
            if (!pterodactyl) return;
            this.swipeVelocity = velocity
        })
        hammertime.on("swipeup", ({ velocity }) => {
            if (!pterodactyl) return;
            this.swipeVelocity = velocity
        })
        hammertime.on("swipedown", ({ velocity }) => {
            if (!pterodactyl) return;
            this.swipeVelocity = velocity
        })
      }
  },
  tick: function () {
      if (!(pterodactyl && this.swipeVelocity && !this.isPanning)){
          return;
      }else{
          modpte.position.y += this.swipeVelocity * 4 * Math.PI / 360;
          //this.mesh.position.x += this.swipeVelocity * 4 * Math.PI / 360;
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
  
        // position
        // pan left/right for position
        this.isPanning = false;
        var xrot = false;
        hammertime.on("panleft", () => {
            if (!mega) return;
            this.isPanning = true
            modmega.position.x += 10 * Math.PI / 360;
        })
  
        hammertime.on("panright", () => {
            if (!mega) return;
            this.isPanning = true
            modmega.position.x -= 10 * Math.PI / 360;
        })
  
        hammertime.on("panup", () => {
            if (!mega) return;
            xrot = true;
            modmega.position.y += 10 * Math.PI / 360;
        })
  
        hammertime.on("pandown", () => {
            if (!mega) return;
            xrot = true;
            modmega.position.y -= 10 * Math.PI / 360;
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
          modmega.position.y += this.swipeVelocity * 4 * Math.PI / 360;
          //this.mesh.position.x += this.swipeVelocity * 4 * Math.PI / 360;
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
            if (!mesasa) return;
            modmesa.scale.multiplyScalar(0).addScalar(ev.scale * currentScale);
        });
  
        // position
        // pan left/right for position
        this.isPanning = false;
        var xrot = false;
        hammertime.on("panleft", () => {
            if (!mesasa) return;
            this.isPanning = true
            modmesa.position.x += 200 * Math.PI / 360;
        })
  
        hammertime.on("panright", () => {
            if (!mesasa) return;
            this.isPanning = true
            modmesa.position.x -= 200 * Math.PI / 360;
        })
  
        hammertime.on("panup", () => {
            if (!mesasa) return;
            xrot = true;
            modmesa.position.y += 200 * Math.PI / 360;
        })
  
        hammertime.on("pandown", () => {
            if (!mesasa) return;
            xrot = true;
            modmesa.position.y -= 200 * Math.PI / 360;
        })
  
  
        hammertime.on("panend", () => this.isPanning = false, xrot = false)
        hammertime.on("pancancel", () => this.isPanning = false, xrot = false)
  
        hammertime.on("swipeleft", ({ velocity }) => {
            if (!mesasa) return;
            console.log("swipeeee");
            this.swipeVelocity = velocity
        })
        hammertime.on("swiperight", ({ velocity }) => {
            if (!mesasa) return;
            this.swipeVelocity = velocity
        })
        hammertime.on("swipeup", ({ velocity }) => {
            if (!mesasa) return;
            this.swipeVelocity = velocity
        })
        hammertime.on("swipedown", ({ velocity }) => {
            if (!mesasa) return;
            this.swipeVelocity = velocity
        })
      }
  },
  tick: function () {
      if (!(mesasa && this.swipeVelocity && !this.isPanning)){
          return;
      }else{
          modmesa.position.y += this.swipeVelocity * 4 * Math.PI / 360;
          //this.mesh.position.x += this.swipeVelocity * 4 * Math.PI / 360;
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
            if (!triceratops) return;
            modtri.scale.multiplyScalar(0).addScalar(ev.scale * currentScale);
        });
  
        // position
        // pan left/right for position
        this.isPanning = false;
        var xrot = false;
        hammertime.on("panleft", () => {
            if (!triceratops) return;
            this.isPanning = true
            modtri.position.x += 10 * Math.PI / 360;
        })
  
        hammertime.on("panright", () => {
            if (!triceratops) return;
            this.isPanning = true
            modtri.position.x -= 10 * Math.PI / 360;
        })
  
        hammertime.on("panup", () => {
            if (!triceratops) return;
            xrot = true;
            modtri.position.y += 10 * Math.PI / 360;
        })
  
        hammertime.on("pandown", () => {
            if (!triceratops) return;
            xrot = true;
            modtri.position.y -= 10 * Math.PI / 360;
        })
  
  
        hammertime.on("panend", () => this.isPanning = false, xrot = false)
        hammertime.on("pancancel", () => this.isPanning = false, xrot = false)
  
        hammertime.on("swipeleft", ({ velocity }) => {
            if (!triceratops) return;
            console.log("swipeeee");
            this.swipeVelocity = velocity
        })
        hammertime.on("swiperight", ({ velocity }) => {
            if (!triceratops) return;
            this.swipeVelocity = velocity
        })
        hammertime.on("swipeup", ({ velocity }) => {
            if (!triceratops) return;
            this.swipeVelocity = velocity
        })
        hammertime.on("swipedown", ({ velocity }) => {
            if (!triceratops) return;
            this.swipeVelocity = velocity
        })
      }
  },
  tick: function () {
      if (!(triceratops && this.swipeVelocity && !this.isPanning)){
          return;
      }else{
          modtri.position.y += this.swipeVelocity * 4 * Math.PI / 360;
          //this.mesh.position.x += this.swipeVelocity * 4 * Math.PI / 360;
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
            if (!velociraptor) return;
            modvelo.scale.multiplyScalar(0).addScalar(ev.scale * currentScale);
        });
  
        // position
        // pan left/right for rotation
        this.isPanning = false;
        var xrot = false;
        hammertime.on("panleft", () => {
            if (!velociraptor) return;
            this.isPanning = true
            modvelo.position.x += 4 * Math.PI / 360;
        })
  
        hammertime.on("panright", () => {
            if (!velociraptor) return;
            this.isPanning = true
            modvelo.position.x -= 4 * Math.PI / 360;
        })
  
        hammertime.on("panup", () => {
            if (!velociraptor) return;
            xrot = true;
            modvelo.position.y += 4 * Math.PI / 360;
        })
  
        hammertime.on("pandown", () => {
            if (!velociraptor) return;
            xrot = true;
            modvelo.position.y -= 4 * Math.PI / 360;
        })
  
  
        hammertime.on("panend", () => this.isPanning = false, xrot = false)
        hammertime.on("pancancel", () => this.isPanning = false, xrot = false)
  
        hammertime.on("swipeleft", ({ velocity }) => {
            if (!velociraptor) return;
            console.log("swipeeee");
            this.swipeVelocity = velocity
        })
        hammertime.on("swiperight", ({ velocity }) => {
            if (!velociraptor) return;
            this.swipeVelocity = velocity
        })
        hammertime.on("swipeup", ({ velocity }) => {
            if (!velociraptor) return;
            this.swipeVelocity = velocity
        })
        hammertime.on("swipedown", ({ velocity }) => {
            if (!velociraptor) return;
            this.swipeVelocity = velocity
        })
      }
  },
  tick: function () {
      if (!(velociraptor && this.swipeVelocity && !this.isPanning)){
          return;
      }else{
          modvelo.position.y += this.swipeVelocity * 4 * Math.PI / 360;
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
      brachi = false;
      mesasa = false;
      pterodactyl = false;
      dinosaur = false;
      trex = true;
      triceratops = false;
      velociraptor = false;
      mega = false;
      break;
    case 2:
      document.querySelector('a-scene').setAttribute('movbra', '');
      brachi = true;
      mesasa = false;
      pterodactyl = false;
      dinosaur = false;
      trex = false;
      triceratops = false;
      velociraptor = false;
      mega = false;
      break;
    case 3:
      document.querySelector('a-scene').setAttribute('movdino', '');
      brachi = false;
      mesasa = false;
      pterodactyl = false;
      dinosaur = true;
      trex = false;
      triceratops = false;
      velociraptor = false;
      mega = false;
      break;
    case 4:
      document.querySelector('a-scene').setAttribute('movpte', '');
      brachi = false;
      mesasa = false;
      pterodactyl = true;
      dinosaur = false;
      trex = false;
      triceratops = false;
      velociraptor = false;
      mega = false;
      break;
    case 5:
      document.querySelector('a-scene').setAttribute('movmega', '');
      brachi = false;
      mesasa = false;
      pterodactyl = false;
      dinosaur = false;
      trex = false;
      triceratops = false;
      velociraptor = false;
      mega = true;
      break;
    case 6:
      document.querySelector('a-scene').setAttribute('movmesasa', '');
      brachi = false;
      mesasa = true;
      pterodactyl = false;
      dinosaur = false;
      trex = false;
      triceratops = false;
      velociraptor = false;
      mega = false;
      break;
    case 7:
      document.querySelector('a-scene').setAttribute('movtri', '');
      brachi = false;
      mesasa = false;
      pterodactyl = false;
      dinosaur = false;
      trex = false;
      triceratops = true;
      velociraptor = false;
      mega = false;
      break;
    case 8:
      document.querySelector('a-scene').setAttribute('movvelo', '');
      brachi = false;
      mesasa = false;
      pterodactyl = false;
      dinosaur = false;
      trex = false;
      triceratops = false;
      velociraptor = true;
      mega = false;
      break;
  }
}

function f(){
    html2canvas(document.querySelector("#cuerpo")).then(canvas => {
        return Canvas2Image.saveAsImage(canvas, null, null, "png", "img");
    });
}
