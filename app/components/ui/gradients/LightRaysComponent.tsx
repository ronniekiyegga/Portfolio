import LightRays from "@/shared/components/effects/LightRays";

const LightRaysComponent = () => {
  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <LightRays
        raysOrigin="top-center"
        raysColor="#ffffff"
        raysSpeed={1}
        lightSpread={0.5}
        rayLength={3}
        followMouse={true}
        mouseInfluence={0.1}
        noiseAmount={0}
        distortion={0}
        className="custom-rays"
        pulsating={false}
        fadeDistance={1}
        saturation={1}
      />
    </div>
  );
};

export default LightRaysComponent;
