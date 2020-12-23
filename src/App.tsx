import React, { useRef, useLayoutEffect, useState } from 'react';

const rainbow = [
  [255, 0, 0], // red
  [255, 165, 0], // orange
  [255, 255, 0], // yellow
  [0, 255, 0], // green
  [0, 0, 255], // blue
  [75, 0, 130], // indigo
  [238, 130, 238], // violet
];

function getGradientAt(percent: number): number {
  const steps = rainbow.length;
  const stepPercent = 1 / steps;
  const startIndex = Math.floor(steps * percent);
  const mixPercent = percent - startIndex * stepPercent;

  return 0;
}

const START = Date.now();
const rotateDuration = 10 * 1000;

function App() {
  const height = document.body.clientHeight;
  const width = document.body.clientWidth;
  const size = Math.sqrt(height * height + width * width);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rotate = useRef(0);

  const [time, setTime] = useState(START);

  const tick = () => {
    requestAnimationFrame(() => {
      setTime(Date.now());
      tick();
    });
  };

  useLayoutEffect(tick, []);

  useLayoutEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');

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

    var grd = ctx.createLinearGradient(0, 0, size, size);
    grd.addColorStop(0, 'rgba(' + rainbow[0].join(',') + ', .4)');
    grd.addColorStop(1 / 5, 'rgba(' + rainbow[1].join(',') + ', .4)');
    grd.addColorStop(1, 'rgba(' + rainbow[2].join(',') + ', .4)');

    // Fill with gradient
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, size * 40, size * 999);

    rotate.current = rotateRad;
  }, [time]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* <div
        className={css`
          animation: ${bg} 120s linear infinite;
          opacity: 0.4;
          position: fixed;
          inset: -20%;
          background-image: linear-gradient(
            to right,
            red,
            orange,
            yellow,
            green,
            blue,
            indigo,
            violet,
            red
          );
          background-size: 400% 100%;
          background-repeat: repeat-x;
        `}
      ></div> */}

      <canvas ref={canvasRef} height={size} width={size}></canvas>
    </div>
  );
}

export default App;
