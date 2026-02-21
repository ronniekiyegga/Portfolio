import LightPillar from "../../LightPillar";

const LightPillarComponent = () => {
  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <LightPillar
        topColor="#5227FF"
        bottomColor="#FF9FFC"
        intensity={1}
        rotationSpeed={0.3}
        glowAmount={0.002}
        pillarWidth={3}
        pillarHeight={0.4}
        noiseIntensity={0.5}
        pillarRotation={25}
        interactive={false}
        mixBlendMode="screen"
        quality="high"
      />
    </div>
  );
};

export default LightPillarComponent;
