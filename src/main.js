import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";
import { MTLLoader } from "three/addons/loaders/MTLLoader.js";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";
import { Water } from 'three/addons/objects/Water2.js';

let water;

function main() {
  const canvas = document.querySelector("#c");
  const view1Elem = document.querySelector("#view1");
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas,
    logarithmicDepthBuffer: true,
    alpha: true,
  });

  const fov = 45;
  const aspect = 2; // the canvas default
  const near = 0.00001;
  const far = 100;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 10, 20);

  const cameraHelper = new THREE.CameraHelper(camera);

  const scene = new THREE.Scene();

  class MinMaxGUIHelper {
    constructor(obj, minProp, maxProp, minDif) {
      this.obj = obj;
      this.minProp = minProp;
      this.maxProp = maxProp;
      this.minDif = minDif;
    }
    get min() {
      return this.obj[this.minProp];
    }
    set min(v) {
      this.obj[this.minProp] = v;
      this.obj[this.maxProp] = Math.max(
        this.obj[this.maxProp],
        v + this.minDif
      );
    }
    get max() {
      return this.obj[this.maxProp];
    }
    set max(v) {
      this.obj[this.maxProp] = v;
      this.min = this.min; // this will call the min setter
    }
  }

  function updateCamera() {

		camera.updateProjectionMatrix();

	}

  const gui = new GUI();
  gui.add(camera, "fov", 1, 180);
  const minMaxGUIHelper = new MinMaxGUIHelper(camera, "near", "far", 0.1);
  gui.add(minMaxGUIHelper, 'min', 0.00001, 50, 0.00001).name('near').onChange(updateCamera);
  gui.add(minMaxGUIHelper, "max", 0.1, 50, 0.1).name("far");

  const controls = new OrbitControls(camera, view1Elem);
  controls.target.set(0, 5, 0);
  controls.update();

  {
    const planeSize = 60;

    const geometry = new THREE.PlaneGeometry( planeSize, planeSize );
    const material = new THREE.MeshPhongMaterial( {color: 0x556da8, side: THREE.DoubleSide} );
    const plane = new THREE.Mesh( geometry, material );
    plane.rotation.x = Math.PI * -0.5;
    scene.add( plane );
  }

  {
    const waterGeometry = new THREE.PlaneGeometry( 60, 60 );

				water = new Water( waterGeometry, {
					color: 0xffffff,
					scale: 10,
					flowDirection: new THREE.Vector2( -1, -1 ),
					textureWidth: 1024,
					textureHeight: 1024
				} );

				water.position.y = 1;
				water.rotation.x = Math.PI * - 0.5;
				scene.add( water );
  }

  // Train Bodies
  {
    const length = 15, width = 8;

    const shape = new THREE.Shape();
    shape.moveTo( 0,0 );
    shape.lineTo( 0, width );
    shape.lineTo( length, width );
    shape.lineTo( length, 0 );
    shape.lineTo( 0, 0 );

    const extrudeSettings = {
      steps: 3,
      depth: 20,
      bevelEnabled: true,
      bevelThickness: 5,
      bevelSize: 1,
      bevelOffset: -1,
      bevelSegments: 4
    };

    const geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
    const material = new THREE.MeshPhongMaterial( { color: 0xc27c5e } );
    
    const scaleFactor = 0.3;

    const mesh1 = new THREE.Mesh(geometry, material);
    mesh1.position.set(0, 0.5, -8);
    mesh1.rotation.y = Math.PI / 2;
    mesh1.scale.set(scaleFactor, scaleFactor, scaleFactor);

    const mesh2 = new THREE.Mesh(geometry, material);
    mesh2.position.set(-9, 0.5, -8);
    mesh2.rotation.y = Math.PI / 2;
    mesh2.scale.set(scaleFactor, scaleFactor, scaleFactor);

    scene.add(mesh1);
    scene.add(mesh2);
  }

  // Wheels
  {
    const scaleFactor = 0.05;

    const geometry = new THREE.CylinderGeometry( 5, 5, 3.038, 36 ); 
    const material = new THREE.MeshPhongMaterial( {color: 0x242424} );

    const cylinder1 = new THREE.Mesh( geometry, material ); 
    cylinder1.scale.set(scaleFactor, scaleFactor, scaleFactor);
    cylinder1.rotation.x = Math.PI / 2;
    cylinder1.position.set(-9,1,-8);
    scene.add( cylinder1 );

    const cylinder2 = new THREE.Mesh( geometry, material ); 
    cylinder2.scale.set(scaleFactor, scaleFactor, scaleFactor);
    cylinder2.rotation.x = Math.PI / 2;
    cylinder2.position.set(-8.5,1,-8);
    scene.add( cylinder2 );

    const cylinder3 = new THREE.Mesh( geometry, material ); 
    cylinder3.scale.set(scaleFactor, scaleFactor, scaleFactor);
    cylinder3.rotation.x = Math.PI / 2;
    cylinder3.position.set(-3.5,1,-8);
    scene.add( cylinder3 );

    const cylinder4 = new THREE.Mesh( geometry, material ); 
    cylinder4.scale.set(scaleFactor, scaleFactor, scaleFactor);
    cylinder4.rotation.x = Math.PI / 2;
    cylinder4.position.set(-3,1,-8);
    scene.add( cylinder4 );

    const cylinder5 = new THREE.Mesh( geometry, material ); 
    cylinder5.scale.set(scaleFactor, scaleFactor, scaleFactor);
    cylinder5.rotation.x = Math.PI / 2;
    cylinder5.position.set(0,1,-8);
    scene.add( cylinder5 );

    const cylinder6 = new THREE.Mesh( geometry, material ); 
    cylinder6.scale.set(scaleFactor, scaleFactor, scaleFactor);
    cylinder6.rotation.x = Math.PI / 2;
    cylinder6.position.set(0.5,1,-8);
    scene.add( cylinder6 );

    const cylinder7 = new THREE.Mesh( geometry, material ); 
    cylinder7.scale.set(scaleFactor, scaleFactor, scaleFactor);
    cylinder7.rotation.x = Math.PI / 2;
    cylinder7.position.set(5.5,1,-8);
    scene.add( cylinder7 );

    const cylinder8 = new THREE.Mesh( geometry, material ); 
    cylinder8.scale.set(scaleFactor, scaleFactor, scaleFactor);
    cylinder8.rotation.x = Math.PI / 2;
    cylinder8.position.set(6,1,-8);
    scene.add( cylinder8 );
  }

  // Metal Connectors for Wheels
  {
    const scaleFactor = 0.1;

    const geometry = new THREE.BoxGeometry( 1, 1, 8 ); 
    const material = new THREE.MeshPhongMaterial( {color: 0x858585} ); 

    const cube1 = new THREE.Mesh( geometry, material ); 
    cube1.rotation.y = Math.PI / 2;
    cube1.scale.set(scaleFactor, scaleFactor, scaleFactor);
    cube1.position.set(5.75,1,-7.9);
    scene.add( cube1 );

    const cube2 = new THREE.Mesh( geometry, material ); 
    cube2.rotation.y = Math.PI / 2;
    cube2.scale.set(scaleFactor, scaleFactor, scaleFactor);
    cube2.position.set(0.25,1,-7.9);
    scene.add( cube2 );

    const cube3 = new THREE.Mesh( geometry, material ); 
    cube3.rotation.y = Math.PI / 2;
    cube3.scale.set(scaleFactor, scaleFactor, scaleFactor);
    cube3.position.set(-3.25,1,-7.9);
    scene.add( cube3 );

    const cube4 = new THREE.Mesh( geometry, material ); 
    cube4.rotation.y = Math.PI / 2;
    cube4.scale.set(scaleFactor, scaleFactor, scaleFactor);
    cube4.position.set(-8.75,1,-7.9);
    scene.add( cube4 );
  }

  // Front and Back Windows
  {
    const scaleFactor = 0.2;

    const geometry = new THREE.BoxGeometry( 7.338, 1, 14.674 );
    const material = new THREE.MeshPhongMaterial( {color: 0xd1cac6} );
    
    const cube1 = new THREE.Mesh( geometry, material );
    cube1.rotation.z = Math.PI / 2;
    cube1.scale.set(scaleFactor, scaleFactor, scaleFactor);
    cube1.position.set(7.6, 1.6, -10.3);
    scene.add( cube1 );

    const cube2 = new THREE.Mesh( geometry, material );
    cube2.rotation.z = Math.PI / 2;
    cube2.scale.set(scaleFactor, scaleFactor, scaleFactor);
    cube2.position.set(-10.6, 1.6, -10.3);
    scene.add( cube2 );
  }

  // Side Windows
  {
    const scaleFactor = 0.2;

    const geometry = new THREE.PlaneGeometry( 43, 4.771 );
    const material = new THREE.MeshPhongMaterial( {color: 0xdfa651, side: THREE.DoubleSide} );

    const plane1 = new THREE.Mesh( geometry, material );
    plane1.scale.set(scaleFactor, scaleFactor, scaleFactor);
    plane1.position.set(3, 2, -7.99);
    scene.add( plane1 );

    const plane2 = new THREE.Mesh( geometry, material );
    plane2.scale.set(scaleFactor, scaleFactor, scaleFactor);
    plane2.position.set(-6, 2, -7.99);
    scene.add( plane2 );
  }

  class ColorGUIHelper {
    constructor(object, prop) {
      this.object = object;
      this.prop = prop;
    }
    get value() {
      return `#${this.object[this.prop].getHexString()}`;
    }
    set value(hexString) {
      this.object[this.prop].set(hexString);
    }
  }

  function makeXYZGUI( gui, vector3, name, onChangeFn ) {

		const folder = gui.addFolder( name );
		folder.add( vector3, 'x', - 10, 10 ).onChange( onChangeFn );
		folder.add( vector3, 'y', 0, 10 ).onChange( onChangeFn );
		folder.add( vector3, 'z', - 10, 10 ).onChange( onChangeFn );
		folder.open();

	}

  {

		const color = 0xFFFFFF;
		const intensity = 1;
		const light = new THREE.DirectionalLight( color, intensity );
		light.position.set( 0, 10, 0 );
		light.target.position.set( - 5, 0, 0 );
		scene.add( light );
		scene.add( light.target );

		const helper = new THREE.DirectionalLightHelper( light );
		scene.add( helper );

		function updateLight() {

			light.target.updateMatrixWorld();
			helper.update();

		}

		updateLight();

		gui.addColor( new ColorGUIHelper( light, 'color' ), 'value' ).name( 'color' );
		gui.add( light, 'intensity', 0, 5, 0.01 );

		makeXYZGUI( gui, light.position, 'position', updateLight );
		makeXYZGUI( gui, light.target.position, 'target', updateLight );

	}

  {
    const color = 0xFFFFFF;
		const intensity = 1;
		const light = new THREE.AmbientLight( color, intensity );
		scene.add( light );

		gui.addColor( new ColorGUIHelper( light, 'color' ), 'value' ).name( 'color' );
		gui.add( light, 'intensity', 0, 5, 0.01 );
  }

  {
    const skyColor = 0xB1E1FF;
    const groundColor = 0xB97A20;
    const intensity = 1;
    const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
    scene.add(light);

		gui.addColor(new ColorGUIHelper(light, 'color'), 'value').name('skyColor');
    gui.addColor(new ColorGUIHelper(light, 'groundColor'), 'value').name('groundColor');
		gui.add( light, 'intensity', 0, 5, 0.01 );
  }

  {
		const loader = new THREE.CubeTextureLoader();
		const texture = loader.load( [
			'resources/images/cubemaps/sky/px.png',
			'resources/images/cubemaps/sky/nx.png',
			'resources/images/cubemaps/sky/py.png',
			'resources/images/cubemaps/sky/ny.png',
			'resources/images/cubemaps/sky/pz.png',
			'resources/images/cubemaps/sky/nz.png',
		] );
		scene.background = texture;
	}

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }

    return needResize;
  }

  function setScissorForElement(elem) {
    const canvasRect = canvas.getBoundingClientRect();
    const elemRect = elem.getBoundingClientRect();

    // compute a canvas relative rectangle
    const right = Math.min(elemRect.right, canvasRect.right) - canvasRect.left;
    const left = Math.max(0, elemRect.left - canvasRect.left);
    const bottom =
      Math.min(elemRect.bottom, canvasRect.bottom) - canvasRect.top;
    const top = Math.max(0, elemRect.top - canvasRect.top);

    const width = Math.min(canvasRect.width, right - left);
    const height = Math.min(canvasRect.height, bottom - top);

    // setup the scissor to only render to that part of the canvas
    const positiveYUpBottom = canvasRect.height - bottom;
    renderer.setScissor(left, positiveYUpBottom, width, height);
    renderer.setViewport(left, positiveYUpBottom, width, height);

    // return the aspect
    return width / height;
  }

  function render() {
    resizeRendererToDisplaySize(renderer);

    // turn on the scissor
    renderer.setScissorTest(true);

    // render the original view
    {
      const aspect = setScissorForElement(view1Elem);

      // adjust the camera for this aspect
      camera.aspect = aspect;
      camera.updateProjectionMatrix();
      cameraHelper.update();

      // don't draw the camera helper in the original view
      cameraHelper.visible = false;

      // render
      renderer.render(scene, camera);
    }

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

main();
