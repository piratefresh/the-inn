import React from "react";
import { Mesh } from "three";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

extend({ OrbitControls });

export const ThreeDice = () => {
  return (
    <Canvas>
      <Experience />
    </Canvas>
  );
};

export const Experience = () => {
  const groupRef = React.useRef<Mesh>(null!);
  const cubeRef = React.useRef<Mesh>(null!);
  useFrame((state, delta) => {
    console.log("tick");
    if (cubeRef.current) cubeRef.current.rotation.y += delta;
    if (groupRef.current) groupRef.current.rotation.y += delta;
  });
  return (
    <>
      <OrbitControls />
      <group ref={groupRef}>
        <mesh position-x={-2}>
          <sphereGeometry />
          <meshBasicMaterial color="orange" />
        </mesh>
        <mesh
          ref={cubeRef}
          rotation-y={Math.PI * 0.25}
          position-x={2}
          scale={1.5}
        >
          <boxGeometry scale={1.5} />
          <meshBasicMaterial color="mediumpurple" />
        </mesh>
      </group>

      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshBasicMaterial color="greenyellow" />
      </mesh>
    </>
  );
};
