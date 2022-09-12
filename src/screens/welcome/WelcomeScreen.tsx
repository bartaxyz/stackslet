import { Canvas, useFrame } from "@react-three/fiber/native";
import { Displace as DisplaceType } from "lamina/vanilla";
import { useRef, useState } from "react";
import { Button, SafeAreaView, Text } from "react-native";
import { usePrice } from "../../contexts/PriceContext";

const Box = (props) => {
  const mesh = useRef(null);
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  useFrame((state, delta) => (mesh.current.rotation.x += 0.01));

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
};

const primaryColor = "#FDC830";
const secondaryColor = "#F37335";

interface GlassCylinderProps {
  position?: [number, number, number];
  scale?: [number, number, number];
  parallaxMultiplier?: number;
}

const DistortedSphere: React.FC<
  React.PropsWithChildren<GlassCylinderProps>
> = ({ position = [0, 0, 0], scale = [1, 1, 1], parallaxMultiplier = 1 }) => {
  const cylinderRef = useRef<THREE.Mesh>(null);
  const displaceRef = useRef<
    DisplaceType & { strength: number; offset: THREE.Vector3 }
  >(null);

  useFrame(({ clock }, delta) => {
    if (!cylinderRef.current) return;

    if (displaceRef.current) {
      displaceRef.current.offset.x += 0.1 * delta;
    }
  });

  return (
    <mesh
      ref={cylinderRef}
      position={position}
      scale={scale}
      rotation={[-Math.PI / 2, 0, 0]}
      receiveShadow={true}
      castShadow={true}
    >
      {/* <cylinderBufferGeometry attach="geometry" args={[1, 1, 0.025, 64]} /> */}
      {/** Sphere */}
      <icosahedronBufferGeometry attach="geometry" args={[1, 24]} />
      <meshPhongMaterial
        attach="material"
        color={secondaryColor}
        shininess={100}
        specular={primaryColor}
      />

      {/* <LayerMaterial
        color={primaryColor}
        lighting="physical"
        transmission={0.5}
        roughness={1.35}
        envMapIntensity={4}
        {...({} as any)}
      >
        <Gradient
          colorA={primaryColor}
          colorB={secondaryColor}
          alpha={0.5}
          mapping="local"
        />
        <Displace
          ref={displaceRef}
          offset={new Vector3(MathUtils.randFloat(0, 100), 0, 0)}
        />
      </LayerMaterial> */}
    </mesh>
  );
};

export const Background: React.FC<React.PropsWithChildren<any>> = ({
  ...props
}) => {
  const count = 10;

  return (
    <Canvas {...props}>
      <ambientLight />
      {/* <pointLight castShadow position={[5, 5, 50]} /> */}

      {/* <OrbitControls /> */}

      {/** Plane that fills out the camera view */}
      <mesh position={[0, 0, -100]}>
        {/* <sphereBufferGeometry attach="geometry" args={[100, 64, 64]} /> */}
        <planeBufferGeometry attach="geometry" args={[1000, 1000]} />
        <meshStandardMaterial color={primaryColor} />
        {/* <LayerMaterial
          color={primaryColor}
          lighting="physical"
          transmission={0.7}
          roughness={1.35}
          envMapIntensity={4}
          {...({} as any)}
        >
          <Gradient
            colorA={primaryColor}
            colorB={secondaryColor}
            alpha={0.7}
            mapping="uv"
          />
        </LayerMaterial> */}
      </mesh>

      <DistortedSphere
        position={[2, -3, 0]}
        scale={[3, 3, 3]}
        parallaxMultiplier={1}
      />

      <DistortedSphere
        position={[-2, 6, 0]}
        scale={[3, 3, 3]}
        parallaxMultiplier={1}
      />
      {/* <AdaptivePixelRatio /> */}
    </Canvas>
  );
};

export const WelcomeScreen = () => {
  const { price } = usePrice();

  return (
    <SafeAreaView style={{ flexGrow: 1 }}>
      <Text>Welcome Screen</Text>
      <Text>Current STX price is {price}</Text>

      <Background />

      <Button title="Create Wallet" />
    </SafeAreaView>
  );
};
