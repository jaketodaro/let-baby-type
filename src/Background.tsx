import React, { useRef, useLayoutEffect, useState, useCallback } from "react";
import BouncyBoi from "./BouncyBoi";

const START = Date.now();
const rotateDuration = 60 * 1000;

const rainbow = [
  [255, 0, 0], // red
  [255, 165, 0], // orange
  [255, 255, 0], // yellow
  [0, 255, 0], // green
  [0, 0, 255], // blue
  [75, 0, 130], // indigo
  [238, 130, 238], // violet
];
const numSteps = rainbow.length;
const stepPercent = 1 / numSteps;

function blend(a: number, b: number, percent: number) {
  return a + (b - a) * percent;
}

function getGradientAt(percent: number): [number, number, number] {
  const startIndex = Math.floor(numSteps * percent);
  const startPercent = startIndex * stepPercent;
  const endIndex = startIndex <= rainbow.length - 2 ? startIndex + 1 : 0;
  const mixPercent = (percent - startPercent) / stepPercent;
  const r = blend(rainbow[startIndex][0], rainbow[endIndex][0], mixPercent);
  const g = blend(rainbow[startIndex][1], rainbow[endIndex][1], mixPercent);
  const b = blend(rainbow[startIndex][2], rainbow[endIndex][2], mixPercent);

  return [r, g, b];
}

function fillGradient(
  ctx: CanvasRenderingContext2D,
  size: number,
  progress: number
) {
  const grd = ctx.createLinearGradient(0, 0, size, size);
  grd.addColorStop(0, "rgba(" + getGradientAt(progress).join(",") + ", .4)");
  grd.addColorStop(
    1 / 5,
    "rgba(" + getGradientAt((progress + stepPercent) % 1).join(",") + ", .4)"
  );
  grd.addColorStop(
    1,
    "rgba(" +
      getGradientAt((progress + stepPercent + stepPercent) % 1).join(",") +
      ", .4)"
  );

  // Fill with gradient
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, size * 40, size * 999);
}

function App() {
  const height = document.body.clientHeight;
  const width = document.body.clientWidth;
  const size = Math.sqrt(height * height + width * width);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rotate = useRef(0);

  const [time, setTime] = useState(START);

  const tick = useCallback(() => {
    requestAnimationFrame(() => {
      setTime(Date.now());
      tick();
    });
  }, []);

  // Kick things off
  useLayoutEffect(tick, [tick]);

  useLayoutEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");

    if (ctx == null) {
      return;
    }

    const height = document.body.clientHeight;
    const width = document.body.clientWidth;
    const size = Math.sqrt(height * height + width * width);

    const progress = ((time - START) % rotateDuration) / rotateDuration;
    const rotateRad = progress * 360 * (Math.PI / 180);

    ctx.clearRect(-size, -size, size, 2 * size);
    ctx.translate(size / 2, size / 2);
    ctx.rotate(rotateRad - rotate.current);
    ctx.translate(-size / 2, -size / 2);

    fillGradient(ctx, size, progress);

    rotate.current = rotateRad;
  }, [time]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <canvas ref={canvasRef} height={size} width={size}></canvas>

      {new Array(30).fill("").map((_, i) => (
        <BouncyBoi key={i} />
      ))}
    </div>
  );
}

export default App;
