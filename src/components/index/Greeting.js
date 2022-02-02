import React, { useRef } from "react";
import Gltf from "../models/Gltf";
import useScroll from "../models/useScroll";

function InnerLogo(props) {
  const model = useRef();

  useScroll((scroll, height) => {
    const movement_start = height * (0 / 6);
    const movement_end = height * (4 / 6);

    const final_position = -height / 400;

    if (model.current) {
      if (scroll < movement_start) {
        model.current.position.set(0, 0, 0);
      } else if (scroll < movement_end) {
        const movement_progress =
          (scroll - movement_start) / (movement_end - movement_start);

        const wave_position = movement_progress * Math.PI + Math.PI / 2;

        model.current.position.set(
          (final_position / 2) * -(Math.sin(wave_position) - 1),
          0,
          0
        );
      } else {
        model.current.position.set(final_position, 0, 0);
      }

      model.current.rotation.y = 2e-3 * scroll;
    }
  }, model);

  return (
    <Gltf
      url="/models/inner_logo.glb"
      ref={model}
      scale={[0.5, 0.5, 0.5]}
      visible={props.visible}
      onLoad={props.onLoad}
    />
  );
}

function DimmingLight({ color, angle, visible }) {
  const position = [10 * Math.cos(angle), 10 * Math.sin(angle), 10];
  const light = useRef();

  useScroll((scroll) => {
    if (light.current) {
      light.current.intensity = Math.max(1 - scroll / window.innerHeight, 0);
    }
  });

  return (
    <spotLight
      color={color}
      position={position}
      ref={light}
      visible={visible}
    />
  );
}

function ThreeLights({ visible }) {
  return (
    <>
      <DimmingLight
        color={0xff1b8d}
        angle={(Math.PI * 3) / 6}
        visible={visible}
      />
      <DimmingLight
        color={0xffda00}
        angle={(Math.PI * 7) / 6}
        visible={visible}
      />
      <DimmingLight
        color={0x1bb3ff}
        angle={(Math.PI * 11) / 6}
        visible={visible}
      />
    </>
  );
}

export default function Greeting({ visible, onLoad }) {
  return (
    <>
      <InnerLogo visible={visible} onLoad={onLoad} />
      <ThreeLights visible={visible} />
    </>
  );
}
