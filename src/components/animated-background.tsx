import Particles from './ui/particles'

export function AnimatedBackground() {
  return (
    <>
      <div className="fixed inset-0 -z-10 bg-linear-to-br from-slate-950 via-slate-900 to-indigo-950" />

      <div className="fixed inset-0 -z-10">
        <Particles
          particleCount={250}
          particleSpread={15}
          speed={0.04}
          particleColors={['#6366f1', '#8b5cf6', '#a855f7', '#3b82f6']}
          moveParticlesOnHover={true}
          particleHoverFactor={2}
          alphaParticles={true}
          particleBaseSize={200}
          sizeRandomness={1.5}
          cameraDistance={20}
          disableRotation={false}
          pixelRatio={Math.min(window.devicePixelRatio, 2)}
        />
      </div>

      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]" />
    </>
  )
}
