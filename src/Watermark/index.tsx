import React, { useEffect, useRef } from 'react';
import './index.scss';

const pixelRatio = window.devicePixelRatio || 1;

const WaterMarker = ({
  text,
}: {
  text: string;
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const width = document.body.scrollWidth;
    const height = document.body.scrollHeight;

    canvas.width = width;
    canvas.height = height;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    const context = canvas.getContext('2d');

    context.rotate(-6 * Math.PI / 180);
    context.font = "14px 'Chinese Quote', 'Segoe UI', Roboto, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif, 'Apple Color Emoji'";
    context.fillStyle = "#cccccc99";
    context.textAlign = 'center';
    context.textBaseline = 'Middle';

    for (let i = (width * 0.5) * -1; i < width * 1.5 ; i += 300) {
      for (let j = (height * 0.2) * -1; j < height * 1.2; j += 200) {
        // 填充文字，x 间距, y 间距
        context.fillText(text, i, j)
      }
    }
  }, [canvasRef]);

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
    }}>
      <canvas 
        ref={canvasRef} 
        className="watermarker" 
      />
    </div>
  );
}

export default WaterMarker;