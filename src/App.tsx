import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Canvas, useFrame } from '@react-three/fiber'
import { BufferAttribute, LinearEncoding, Mesh, PointLight, PointLightHelper, Vector2} from 'three'
import { Environment, OrbitControls, PerspectiveCamera, Plane, Point, useEnvironment, useHelper, useTexture } from '@react-three/drei'
import { useControls } from "leva";


function Terrain(){
  const terrainTextures = useTexture({
    map:'./textures/aerial_rocks_02_diff_4k.jpg',
    displacementMap: './textures/aerial_rocks_02_disp_4k.jpg',
    aoMap:'./textures/aerial_rocks_02_ao_4k.jpg',
    roughnessMap:'./textures/aerial_rocks_02_rough_4k.jpg',
    metalnessMap:'./textures/aerial_rocks_02_arm_4k_metalness.jpg',
    normalMap:'./textures/aerial_rocks_02_nor_gl_4k.jpg',
    alphaMap:'./textures/alpha.png',
  });



  const {displacementScale,aoMapIntensity,roughness,metalness,normalScale} = useControls({
    displacementScale:{
      value:1,
      min:-2,
      max:2,
    },
    aoMapIntensity:{
      value:1,
      min:0,
      max:10,
    },
    roughness:{
      value:1,
      min:0,
      max:1,
    },
    metalness:{
      value:0,
      min:0,
      max:1,
    },
    normalScale:[1,1],
  });

  const mesh = useRef<Mesh>(null!);
  
  
  return(
    <Plane args={[10,10,128,128]} rotation-x={-Math.PI / 2} ref={mesh}>
      <meshStandardMaterial
      {...terrainTextures}
      normalMap-encoding={(LinearEncoding)}
      displacementScale = {displacementScale}
      aoMapIntensity={aoMapIntensity}
      roughness={roughness}
      metalness={metalness}
      metalnessMap={null}
      normalScale={new Vector2(normalScale[0],normalScale[1])}
      transparent
      />
    </Plane>
    );
}

function ThreeContent(){
  const envMap = useEnvironment({files:"./textures/clarens_night_02_4k.hdr"});
  const lightRef = useRef<PointLight>(null!);
  useHelper(lightRef,PointLightHelper,1,"red");
  return(
    <>
      <ambientLight />
      <pointLight ref={lightRef} position={[5,5,0]} intensity={2} />
      <OrbitControls />
      <Terrain />
      <Environment map={envMap} background />
    </>
    );
}

  

function ThreeScene(){

  return(
    <Canvas id='Canvas' camera={{position:[0,10,5]}} >
    <ThreeContent />
    </Canvas>

    );
}


function App() {

  return (
    <div className='App h-screen'>
      <ThreeScene />
    </div>
  );
}

export default App
