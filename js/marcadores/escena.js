// Component that places cacti where the ground is clicked
export const tapPlaceComponent = {
    schema: {
      min: {default: 6},
      max: {default: 10},
    },
    init() {
      console.log("Hola");
      const ground = document.getElementById('ground')
      alert("Hola");
      ground.addEventListener('click', (event) => {
        // Create new entity for the new object
        const newElement = document.createElement('a-entity')
        // The raycaster gives a location of the touch in the scene
        const touchPoint = event.detail.intersection.point
        newElement.setAttribute('position', touchPoint)
        const randomYRotation = Math.random() * 360
        newElement.setAttribute('rotation', `0 ${randomYRotation} 0`)
        const randomScale = Math.floor(Math.random() * (Math.floor(this.data.max) - Math.ceil(this.data.min)) + Math.ceil(this.data.min))
        newElement.setAttribute('visible', 'false')
        newElement.setAttribute('scale', '0.2 0.2 0.2')
        newElement.setAttribute('shadow', {
          receive: false,
        })
        newElement.setAttribute('gltf-model', '#modelo')
        this.el.sceneEl.appendChild(newElement)
        newElement.addEventListener('model-loaded', () => {
          // Once the model is loaded, we are ready to show it popping in using an animation
          newElement.setAttribute('visible', 'true')
          newElement.setAttribute('animation', {
            property: 'scale',
            to: `${randomScale} ${randomScale} ${randomScale}`,
            easing: 'easeOutElastic',
            dur: 800,
          })
        })
      })
    },
  }