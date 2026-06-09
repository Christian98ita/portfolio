import { useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Environment } from '@react-three/drei'
import * as THREE from 'three'

const LIME = new THREE.Color('#a8e000')
const INK = new THREE.Color('#0d0d0b')
const PAPER = new THREE.Color('#f4f2ea')

// The hero "art object": a large glossy lime blob, slowly breathing and turning,
// orbited by two smaller satellite forms in ink and paper tones — a sculptural
// trio rather than a technical construct.
function BlobCluster({ pointer }) {
  const group = useRef(null)
  const satelliteA = useRef(null)
  const satelliteB = useRef(null)

  // On narrow/tall viewports the cluster would overpower the type — shrink it
  // and nudge it off-canvas so the headline stays the clear focal point.
  const { width, height } = useThree((state) => state.viewport)
  const aspect = width / height
  const scale = aspect < 0.7 ? 0.5 : aspect < 1.1 ? 0.72 : 1
  const offsetX = aspect < 1.1 ? width * 0.16 : 0

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime

    if (group.current) {
      const targetY = pointer.current.x * 0.42
      const targetX = -pointer.current.y * 0.22
      group.current.rotation.y += (targetY - group.current.rotation.y) * delta * 1.4
      group.current.rotation.x += (targetX + 0.1 - group.current.rotation.x) * delta * 1.4
    }
    if (satelliteA.current) {
      satelliteA.current.position.x = Math.cos(t * 0.32) * 2.55
      satelliteA.current.position.z = Math.sin(t * 0.32) * 2.55
      satelliteA.current.position.y = Math.sin(t * 0.5) * 0.4 - 0.6
    }
    if (satelliteB.current) {
      satelliteB.current.position.x = Math.cos(t * -0.24 + 2.4) * 3.3
      satelliteB.current.position.z = Math.sin(t * -0.24 + 2.4) * 3.3
      satelliteB.current.position.y = Math.cos(t * 0.4) * 0.5 + 0.9
    }
  })

  return (
    <group ref={group} scale={scale} position={[offsetX, 0, 0]}>
      <Float speed={1.4} rotationIntensity={0.5} floatIntensity={0.7}>
        <mesh scale={1.85}>
          <icosahedronGeometry args={[1, 64]} />
          <MeshDistortMaterial
            color={LIME}
            distort={0.38}
            speed={1.6}
            roughness={0.12}
            metalness={0.18}
            envMapIntensity={1.1}
          />
        </mesh>
      </Float>

      <mesh ref={satelliteA} scale={0.46}>
        <icosahedronGeometry args={[1, 32]} />
        <MeshDistortMaterial
          color={INK}
          distort={0.3}
          speed={1.1}
          roughness={0.2}
          metalness={0.4}
          envMapIntensity={1.4}
        />
      </mesh>

      <mesh ref={satelliteB} scale={0.3}>
        <sphereGeometry args={[1, 48, 48]} />
        <MeshDistortMaterial
          color={PAPER}
          distort={0.16}
          speed={0.8}
          roughness={0.05}
          metalness={0.05}
          envMapIntensity={1.6}
        />
      </mesh>
    </group>
  )
}

function Rig({ pointer }) {
  useFrame(({ camera }, delta) => {
    const targetX = pointer.current.x * 0.9
    const targetY = pointer.current.y * 0.45
    camera.position.x += (targetX - camera.position.x) * delta * 1.1
    camera.position.y += (targetY - camera.position.y) * delta * 1.1
    camera.lookAt(0, 0, 0)
  })
  return null
}

export default function Scene3D({ pointer }) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 7.2], fov: 38 }}
      gl={{ antialias: true, alpha: true }}
    >
      <color attach="background" args={['#0d0d0b']} />
      <ambientLight intensity={0.5} />
      <spotLight position={[6, 8, 6]} angle={0.4} penumbra={1} intensity={2.2} color="#ffffff" />
      <spotLight position={[-7, -3, 4]} angle={0.5} penumbra={1} intensity={1.4} color="#a8e000" />
      <pointLight position={[0, -4, -4]} intensity={0.6} color="#f4f2ea" />
      <Environment preset="studio" environmentIntensity={0.7} />
      <BlobCluster pointer={pointer} />
      <Rig pointer={pointer} />
    </Canvas>
  )
}
