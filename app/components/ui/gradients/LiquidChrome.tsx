import { LiquidChrome } from "@/app/components/LiquidChrome";

const LiquidChromeComponent = () => {
  return (
    <div style={{ width: "100%", height: "600px", position: "relative" }}>
      <LiquidChrome
        baseColor={[0.1, 0.1, 0.1]}
        speed={0.2}
        amplitude={0.6}
        interactive={true}
      />
    </div>
  );
};

export default LiquidChromeComponent;
