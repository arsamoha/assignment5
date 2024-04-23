import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';

function main() {
  const canvas = document.querySelector("#c");
  const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });

  const fov = 45;
  const aspect = 2;
  const near = 0.1;
  const far = 100;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 10, 20);

  const controls = new OrbitControls(camera, canvas);
  controls.target.set(0, 5, 0);
  controls.update();

  const scene = new THREE.Scene();
  scene.background = new THREE.Color("gray");

  const boxWidth = 1;
  const boxHeight = 1;
  const boxDepth = 1;
  const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
  const material = new THREE.MeshPhongMaterial({ color: 0x44aa88 });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
  cube.position.x = 0;

  const geometryCone = new THREE.ConeGeometry(1, 2, 32);
  const materialCone = new THREE.MeshPhongMaterial({ color: 0xffff00 });
  const cone = new THREE.Mesh(geometryCone, materialCone);
  scene.add(cone);
  cone.position.x = -3;

  const geometrySphere = new THREE.SphereGeometry(1, 34, 22);
  const loader = new THREE.TextureLoader();
  const texture = loader.load("resources/images/flower-1.jpg");
  texture.colorSpace = THREE.SRGBColorSpace;
  const materialSphere = new THREE.MeshBasicMaterial({
    map: texture,
  });
  const sphere = new THREE.Mesh(geometrySphere, materialSphere);
  scene.add(sphere);
  sphere.position.x = 3;

  {
    const color = 0xffffff;
    const intensity = 2.5;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(5, 10, 2);
    scene.add(light);
    scene.add(light.target);
  }

  function frameArea(sizeToFitOnScreen, boxSize, boxCenter, camera) {
    const halfSizeToFitOnScreen = sizeToFitOnScreen * 0.5;
    const halfFovY = THREE.MathUtils.degToRad(camera.fov * 0.5);
    const distance = halfSizeToFitOnScreen / Math.tan(halfFovY);

    const direction = new THREE.Vector3()
      .subVectors(camera.position, boxCenter)
      .multiply(new THREE.Vector3(1, 0, 1))
      .normalize();

    camera.position.copy(direction.multiplyScalar(distance).add(boxCenter));
    camera.near = boxSize / 100;
    camera.far = boxSize * 100;

    camera.updateProjectionMatrix();
    camera.lookAt(boxCenter.x, boxCenter.y, boxCenter.z);
  }

  {

    const mtlLoader = new MTLLoader();
    mtlLoader.load( 'resources/models/plant/plant.mtl', ( mtl ) => {

        mtl.preload();
        const objLoader = new OBJLoader();
        objLoader.setMaterials( mtl );
        objLoader.load( 'resources/models/plant/plant.obj', ( root ) => {

            scene.add( root );
            root.position.x = 8;
            root.position.z = 3;
            const box = new THREE.Box3().setFromObject( root );

            const boxSize = box.getSize( new THREE.Vector3() ).length();
            const boxCenter = box.getCenter( new THREE.Vector3() );

            frameArea( boxSize * 1.2, boxSize, boxCenter, camera );

            controls.maxDistance = boxSize * 10;
            controls.target.copy( boxCenter );
            controls.update();

        } );

    } );

}

  function render(time) {
    time *= 0.001;

    cube.rotation.x = time;
    cube.rotation.y = time;
    cone.rotation.y = time;
    cone.rotation.z = time;
    sphere.rotation.x = time;
    sphere.rotation.y = time;

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

main();
