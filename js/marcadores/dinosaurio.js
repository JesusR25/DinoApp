let index = -1;
const modelos = ["brachi",  "mesasa", "pterodactyl", "dinosaur", "trex", "triceratops", "velociraptor", "mega"];
const fichas = ["Brachiosaurus.png", "Mosasaurus.png", "Pterodactylo.png", "Stegosaurus.png", "TRex.png", "Triceratops.png", "Velociraptor.png", "Megalodon.png"];
//Variables para saber si esta visible
let brachi = false;
let mesasa = false;
let pterodactyl = false;
let dinosaur = false;
let trex = false;
let triceratops = false;
let velociraptor = false;
let mega = false;

let modbrachi;
let modmesa;
let modpte;
let moddino;
let modtrex;
let modtri;
let modvelo;
let modmega;

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
    document.getElementById("inf").removeAttribute('src');
    if (document.getElementById("ch").checked) {
      document.getElementById("inf").src =
        "../../assets/Fichas/" + `${provimg[index]}`;
      document.getElementById("imagenes").style.display = "block";
    }
    modelom(index);
  } else {
    index++;
    for (var i = 0; i < modelos.length; i++) {
        console.log(index);
      if (i == index) {
        document.querySelector(`#${provmod[i]}`).setAttribute("visible", true);
      } else {
        document.querySelector(`#${provmod[i]}`).setAttribute("visible", false);
      }
      document.getElementById("inf").removeAttribute('src');
      if (document.getElementById("ch").checked) {
        document.getElementById("inf").src =
          "../../assets/Fichas/" + `${provimg[index]}`;
        document.getElementById("imagenes").style.display = "block";
        
      }
    }
    modelom(index);
  }
}

function anterior() {
  let provmod = modelos;
  let provimg = fichas;
  if (index <= 0) {
    index = 7;
    document.querySelector(`#${provmod[index]}`).setAttribute("visible", true);
    document.querySelector(`#${provmod[0]}`).setAttribute("visible", false);
    document.getElementById("inf").removeAttribute('src');
    if (document.getElementById("ch").checked) {
      document.getElementById("inf").src =
        "../../assets/Fichas/" + `${provimg[index]}`;
      document.getElementById("imagenes").style.display = "block";
    }
    modelom(index);
  } else {
    index--;
    for (var i = 0; i < modelos.length; i++) {
      if (i == index) {
        document.querySelector(`#${provmod[i]}`).setAttribute("visible", true);
      } else {
        document.querySelector(`#${provmod[i]}`).setAttribute("visible", false);
      }
    }
    document.getElementById("inf").removeAttribute('src');
    if (document.getElementById("ch").checked) {
      document.getElementById("inf").src =
        "../../assets/Fichas/" + `${provimg[index]}`;
      document.getElementById("imagenes").style.display = "block";
    }
    modelom(index);
  }
}

function volver(){
  window.location.href = "../Paginas/Menu.html";
}

function ocultar(){
  document.getElementById('imagenes').style.display = "none";
}

function modelom(index) {
  switch (index) {
    case 0:
      brachi = true;
      mesasa = false;
      pterodactyl = false;
      dinosaur = false;
      trex = false;
      triceratops = false;
      velociraptor = false;
      mega = false;
      modbrachi.scale.multiplyScalar(0).addScalar(1);
      modbrachi.rotation.y = 0;
      modbrachi.rotation.x = 0;
      break;
    case 1:
      brachi = false;
      mesasa = true;
      pterodactyl = false;
      dinosaur = false;
      trex = false;
      triceratops = false;
      velociraptor = false;
      mega = false;
      modmesa.scale.multiplyScalar(0).addScalar(1);
      modmesa.rotation.y = 0;
      modmesa.rotation.x = 0;
      break;
    case 2:
      brachi = false;
      mesasa = false;
      pterodactyl = true;
      dinosaur = false;
      trex = false;
      triceratops = false;
      velociraptor = false;
      mega = false;
      modpte.scale.multiplyScalar(0).addScalar(1);
      modpte.rotation.y = 0;
      modpte.rotation.x = 0;
      break;
    case 3:
      brachi = false;
      mesasa = false;
      pterodactyl = false;
      dinosaur = true;
      trex = false;
      triceratops = false;
      velociraptor = false;
      mega = false;
      moddino.scale.multiplyScalar(0).addScalar(1);
      moddino.rotation.y = 0;
      moddino.rotation.x = 0;
      break;
    case 4:
      brachi = false;
      mesasa = false;
      pterodactyl = false;
      dinosaur = false;
      trex = true;
      triceratops = false;
      velociraptor = false;
      mega = false;
      modtrex.scale.multiplyScalar(0).addScalar(1);
      modtrex.rotation.y = 0;
      modtrex.rotation.x = 0;
      break;
    case 5:
      brachi = false;
      mesasa = false;
      pterodactyl = false;
      dinosaur = false;
      trex = false;
      triceratops = true;
      velociraptor = false;
      mega = false;
      modtri.scale.multiplyScalar(0).addScalar(1);
      modtri.rotation.y = 0;
      modtri.rotation.x = 0;
      break;
    case 6:
      brachi = false;
      mesasa = false;
      pterodactyl = false;
      dinosaur = false;
      trex = false;
      triceratops = false;
      velociraptor = true;
      mega = false;
      modvelo.scale.multiplyScalar(0).addScalar(1);
      modvelo.rotation.y = 0;
      modvelo.rotation.x = 0;
      break;
    case 7:
      brachi = false;
      mesasa = false;
      pterodactyl = false;
      dinosaur = false;
      trex = false;
      triceratops = false;
      velociraptor = false;
      mega = true;
      modmega.scale.multiplyScalar(0).addScalar(1);
      modmega.rotation.y = 0;
      modmega.rotation.x = 0;
      break;
  }
}

//Controlador para Brachi
AFRAME.registerComponent("brachi", {
  init: function () {
      // track markerFound/markerLost
      // grab the model reference
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
          currentScale = modbrachi.scale.x;
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
          modbrachi.rotation.y -= 4 * Math.PI / 360;
      })

      hammertime.on("panright", () => {
          if (!brachi) return;
          this.isPanning = true
          modbrachi.rotation.y += 4 * Math.PI / 360;
      })

      hammertime.on("panup", () => {
          if (!brachi) return;
          xrot = true;
          modbrachi.rotation.x -= 4 * Math.PI / 360;
      })

      hammertime.on("pandown", () => {
          if (!brachi) return;
          xrot = true;
          modbrachi.rotation.x += 4 * Math.PI / 360;
      })


      hammertime.on("panend", () => this.isPanning = false, xrot = false)
      hammertime.on("pancancel", () => this.isPanning = false, xrot = false)

      hammertime.on("swipeleft", ({ velocity }) => {
          if (!brachi) return;
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
  },
  tick: function () {
      if (!(brachi && this.swipeVelocity && !this.isPanning)){
          return;
      }else{
        modbrachi.rotation.y += this.swipeVelocity * 4 * Math.PI / 360;
          //this.mesh.rotation.x += this.swipeVelocity * 4 * Math.PI / 360;
          this.swipeVelocity *= 0.93;
          if (Math.abs(this.swipeVelocity) <= 0.1) this.swipeVelocity = 0;
      }
      
      
  }
})

//Controlador para Mesasa
AFRAME.registerComponent("mesa", {
  init: function () {
      // track markerFound/markerLost
      // grab the model reference
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
          currentScale = modmesa.scale.x;
      })
      hammertime.on("pinchmove", (ev) => {
          if (!mesasa) return;
          modmesa.scale.multiplyScalar(0).addScalar(ev.scale * currentScale);
      });

      // rotation
      // pan left/right for rotation
      this.isPanning = false;
      var xrot = false;
      hammertime.on("panleft", () => {
          if (!mesasa) return;
          this.isPanning = true
          modmesa.rotation.y -= 4 * Math.PI / 360;
      })

      hammertime.on("panright", () => {
          if (!mesasa) return;
          this.isPanning = true
          modmesa.rotation.y += 4 * Math.PI / 360;
      })

      hammertime.on("panup", () => {
          if (!mesasa) return;
          xrot = true;
          modmesa.rotation.x -= 4 * Math.PI / 360;
      })

      hammertime.on("pandown", () => {
          if (!mesasa) return;
          xrot = true;
          modmesa.rotation.x += 4 * Math.PI / 360;
      })


      hammertime.on("panend", () => this.isPanning = false, xrot = false)
      hammertime.on("pancancel", () => this.isPanning = false, xrot = false)

      hammertime.on("swipeleft", ({ velocity }) => {
          if (!mesasa) return;
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
  },
  tick: function () {
      if (!(mesasa && this.swipeVelocity && !this.isPanning)){
          return;
      }else{
        modmesa.rotation.y += this.swipeVelocity * 4 * Math.PI / 360;
          //this.mesh.rotation.x += this.swipeVelocity * 4 * Math.PI / 360;
          this.swipeVelocity *= 0.93;
          if (Math.abs(this.swipeVelocity) <= 0.1) this.swipeVelocity = 0;
      }
      
      
  }
})

//Controlador para Pterodactyl
AFRAME.registerComponent("pte", {
  init: function () {
      // track markerFound/markerLost
      // grab the model reference
      document.querySelector("#pterodactyl").addEventListener("model-loaded", evt => {
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
          currentScale = modpte.scale.x;
      })
      hammertime.on("pinchmove", (ev) => {
          if (!pterodactyl) return;
          modpte.scale.multiplyScalar(0).addScalar(ev.scale * currentScale);
      });

      // rotation
      // pan left/right for rotation
      this.isPanning = false;
      var xrot = false;
      hammertime.on("panleft", () => {
          if (!pterodactyl) return;
          this.isPanning = true
          modpte.rotation.y -= 4 * Math.PI / 360;
      })

      hammertime.on("panright", () => {
          if (!pterodactyl) return;
          this.isPanning = true
          modpte.rotation.y += 4 * Math.PI / 360;
      })

      hammertime.on("panup", () => {
          if (!pterodactyl) return;
          xrot = true;
          modpte.rotation.x -= 4 * Math.PI / 360;
      })

      hammertime.on("pandown", () => {
          if (!pterodactyl) return;
          xrot = true;
          modpte.rotation.x += 4 * Math.PI / 360;
      })


      hammertime.on("panend", () => this.isPanning = false, xrot = false)
      hammertime.on("pancancel", () => this.isPanning = false, xrot = false)

      hammertime.on("swipeleft", ({ velocity }) => {
          if (!pterodactyl) return;
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
  },
  tick: function () {
      if (!(pterodactyl && this.swipeVelocity && !this.isPanning)){
          return;
      }else{
        modpte.rotation.y += this.swipeVelocity * 4 * Math.PI / 360;
          //this.mesh.rotation.x += this.swipeVelocity * 4 * Math.PI / 360;
          this.swipeVelocity *= 0.93;
          if (Math.abs(this.swipeVelocity) <= 0.1) this.swipeVelocity = 0;
      }
  }
})

//Controlador para Dinosaur
AFRAME.registerComponent("dino", {
  init: function () {
      // track markerFound/markerLost
      // grab the model reference
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
          currentScale = moddino.scale.x;
      })
      hammertime.on("pinchmove", (ev) => {
          if (!dinosaur) return;
          moddino.scale.multiplyScalar(0).addScalar(ev.scale * currentScale);
      });

      // rotation
      // pan left/right for rotation
      this.isPanning = false;
      var xrot = false;
      hammertime.on("panleft", () => {
          if (!dinosaur) return;
          this.isPanning = true
          moddino.rotation.y -= 4 * Math.PI / 360;
      })

      hammertime.on("panright", () => {
          if (!dinosaur) return;
          this.isPanning = true
          moddino.rotation.y += 4 * Math.PI / 360;
      })

      hammertime.on("panup", () => {
          if (!dinosaur) return;
          xrot = true;
          moddino.rotation.x -= 4 * Math.PI / 360;
      })

      hammertime.on("pandown", () => {
          if (!dinosaur) return;
          xrot = true;
          moddino.rotation.x += 4 * Math.PI / 360;
      })


      hammertime.on("panend", () => this.isPanning = false, xrot = false)
      hammertime.on("pancancel", () => this.isPanning = false, xrot = false)

      hammertime.on("swipeleft", ({ velocity }) => {
          if (!dinosaur) return;
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
  },
  tick: function () {
      if (!(dinosaur && this.swipeVelocity && !this.isPanning)){
          return;
      }else{
        moddino.rotation.y += this.swipeVelocity * 4 * Math.PI / 360;
          //this.mesh.rotation.x += this.swipeVelocity * 4 * Math.PI / 360;
          this.swipeVelocity *= 0.93;
          if (Math.abs(this.swipeVelocity) <= 0.1) this.swipeVelocity = 0;
      }
  }
})

//Controlador Trex
AFRAME.registerComponent("trex", {
  init: function () {
      // track markerFound/markerLost
      // grab the model reference
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
          currentScale = modtrex.scale.x;
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
          modtrex.rotation.y -= 4 * Math.PI / 360;
      })

      hammertime.on("panright", () => {
          if (!trex) return;
          this.isPanning = true
          modtrex.rotation.y += 4 * Math.PI / 360;
      })

      hammertime.on("panup", () => {
          if (!trex) return;
          xrot = true;
          modtrex.rotation.x -= 4 * Math.PI / 360;
      })

      hammertime.on("pandown", () => {
          if (!trex) return;
          xrot = true;
          modtrex.rotation.x += 4 * Math.PI / 360;
      })


      hammertime.on("panend", () => this.isPanning = false, xrot = false)
      hammertime.on("pancancel", () => this.isPanning = false, xrot = false)

      hammertime.on("swipeleft", ({ velocity }) => {
          if (!trex) return;
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
  },
  tick: function () {
      if (!(trex && this.swipeVelocity && !this.isPanning)){
          return;
      }else{
        modtrex.rotation.y += this.swipeVelocity * 4 * Math.PI / 360;
          //this.mesh.rotation.x += this.swipeVelocity * 4 * Math.PI / 360;
          this.swipeVelocity *= 0.93;
          if (Math.abs(this.swipeVelocity) <= 0.1) this.swipeVelocity = 0;
      }
  }
})

//Controlador Triceratops
AFRAME.registerComponent("tri", {
  init: function () {
      // track markerFound/markerLost
      // grab the model reference
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
          currentScale = modtri.scale.x;
      })
      hammertime.on("pinchmove", (ev) => {
          if (!triceratops) return;
          modtri.scale.multiplyScalar(0).addScalar(ev.scale * currentScale);
      });

      // rotation
      // pan left/right for rotation
      this.isPanning = false;
      var xrot = false;
      hammertime.on("panleft", () => {
          if (!triceratops) return;
          this.isPanning = true
          modtri.rotation.y -= 4 * Math.PI / 360;
      })

      hammertime.on("panright", () => {
          if (!triceratops) return;
          this.isPanning = true
          modtri.rotation.y += 4 * Math.PI / 360;
      })

      hammertime.on("panup", () => {
          if (!triceratops) return;
          xrot = true;
          modtri.rotation.x -= 4 * Math.PI / 360;
      })

      hammertime.on("pandown", () => {
          if (!triceratops) return;
          xrot = true;
          modtri.rotation.x += 4 * Math.PI / 360;
      })


      hammertime.on("panend", () => this.isPanning = false, xrot = false)
      hammertime.on("pancancel", () => this.isPanning = false, xrot = false)

      hammertime.on("swipeleft", ({ velocity }) => {
          if (!triceratops) return;
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
  },
  tick: function () {
      if (!(triceratops && this.swipeVelocity && !this.isPanning)){
          return;
      }else{
        modtri.rotation.y += this.swipeVelocity * 4 * Math.PI / 360;
          //this.mesh.rotation.x += this.swipeVelocity * 4 * Math.PI / 360;
          this.swipeVelocity *= 0.93;
          if (Math.abs(this.swipeVelocity) <= 0.1) this.swipeVelocity = 0;
      }
  }
})

//Controlador Velociraptor
AFRAME.registerComponent("velo", {
  init: function () {
      // track markerFound/markerLost
      // grab the model reference
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
          currentScale = modvelo.scale.x;
      })
      hammertime.on("pinchmove", (ev) => {
          if (!velociraptor) return;
          modvelo.scale.multiplyScalar(0).addScalar(ev.scale * currentScale);
      });

      // rotation
      // pan left/right for rotation
      this.isPanning = false;
      var xrot = false;
      hammertime.on("panleft", () => {
          if (!velociraptor) return;
          this.isPanning = true
          modvelo.rotation.y -= 4 * Math.PI / 360;
      })

      hammertime.on("panright", () => {
          if (!velociraptor) return;
          this.isPanning = true
          modvelo.rotation.y += 4 * Math.PI / 360;
      })

      hammertime.on("panup", () => {
          if (!velociraptor) return;
          xrot = true;
          modvelo.rotation.x -= 4 * Math.PI / 360;
      })

      hammertime.on("pandown", () => {
          if (!velociraptor) return;
          xrot = true;
          modvelo.rotation.x += 4 * Math.PI / 360;
      })


      hammertime.on("panend", () => this.isPanning = false, xrot = false)
      hammertime.on("pancancel", () => this.isPanning = false, xrot = false)

      hammertime.on("swipeleft", ({ velocity }) => {
          if (!velociraptor) return;
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
  },
  tick: function () {
      if (!(velociraptor && this.swipeVelocity && !this.isPanning)){
          return;
      }else{
        modvelo.rotation.y += this.swipeVelocity * 4 * Math.PI / 360;
          //this.mesh.rotation.x += this.swipeVelocity * 4 * Math.PI / 360;
          this.swipeVelocity *= 0.93;
          if (Math.abs(this.swipeVelocity) <= 0.1) this.swipeVelocity = 0;
      }
  }
})


//Controlador Megadolon
AFRAME.registerComponent("mega", {
  init: function () {
      // track markerFound/markerLost
      // grab the model reference
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
          currentScale = modmega.scale.x;
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