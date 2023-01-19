import React from "react";
import { Mesh } from "three";
import {
  Canvas,
  useFrame,
  extend,
  useThree,
  Object3DNode,
} from "@react-three/fiber";
import { MeshReflectorMaterial, OrbitControls, Text } from "@react-three/drei";

import { CustomObject } from "./CustomObject";

const cameraSettings = {
  fov: 45,
  near: 0.1,
  far: 500,
  position: [3, 2, 6],
};

export const ThreeDice = () => {
  return (
    <Canvas orthographic gl={{ antialias: true }} camera={cameraSettings}>
      <Experience />
    </Canvas>
  );
};

export const Experience = () => {
  const groupRef = React.useRef<Mesh>(null!);
  const cubeRef = React.useRef<Mesh>(null!);
  const { camera, gl } = useThree();
  useFrame((state, delta) => {
    if (cubeRef.current) cubeRef.current.rotation.y += delta;
    // if (groupRef.current) groupRef.current.rotation.y += delta;
  });
  return (
    <>
      <OrbitControls makeDefault />
      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />
      <group ref={groupRef}>
        <mesh position-x={-2}>
          <sphereGeometry />
          <meshStandardMaterial color="orange" />
        </mesh>
        <mesh
          ref={cubeRef}
          rotation-y={Math.PI * 0.25}
          position-x={2}
          scale={1.5}
        >
          <boxGeometry scale={1.5} />
          <meshStandardMaterial color="mediumpurple" />
        </mesh>
      </group>

      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        {/* <meshBasicMaterial color="greenyellow" /> */}
        <MeshReflectorMaterial mirror={0.75} />
      </mesh>

      <Text fontSize={1} color="salmon" position-y={2}>
        I Love R3F
      </Text>
    </>
  );
};
