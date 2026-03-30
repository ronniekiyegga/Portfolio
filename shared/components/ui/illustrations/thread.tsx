import Threads from "../../Threads";
const ThreadMotion = () => {
  return (
    <div style={{ width: "1080px", height: "1080px", position: "relative" }}>
      <Threads
        color={[0.17254901960784313, 0.023529411764705882, 0.7764705882352941]}
        amplitude={0.9}
        distance={0.2}
        enableMouseInteraction
      />
    </div>
  );
};

export default ThreadMotion;
