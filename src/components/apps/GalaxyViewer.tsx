import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars, OrbitControls } from '@react-three/drei';
import { useAppContext } from '../../contexts/AppContext';

const GalaxyViewer: React.FC = () => {
  const { brightness, speed, isReducedMotion } = useAppContext();

  return (
    <div className="absolute top-0 left-0 w-full h-full bg-black">
      <Canvas camera={{ position: [0, 0, 10] }}>
        <ambientLight intensity={brightness / 100} />
        <pointLight position={[10, 10, 10]} />
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade={true}
          speed={isReducedMotion ? 0 : speed / 10}
        />
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          autoRotate={!isReducedMotion}
          autoRotateSpeed={speed / 10}
        />
      </Canvas>
    </div>
  );
};

export default GalaxyViewer;