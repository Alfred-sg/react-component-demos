import React, { useState, useRef, useEffect } from 'react';
import './index.scss';

const getRandom = (max: number, min: number, num?: number) => {
  const asciiNum = ~~(Math.random() * (max - min + 1) + min)
  if (!num) return asciiNum;

  const arr = []
  for (let i = 0; i < num; i++) {
    arr.push(getRandom(max, min))
  }

  return arr
}

const VerifyCode = ({
  code,
  onRefresh,
}: {
    code: string,
    onRefresh?: () => void,
  }) => {
  const [rotate, setRotate] = useState(getRandom(15, -15, 4));
  const [color, setColor] = useState([
    getRandom(0, 255, 3), getRandom(0, 255, 3), getRandom(0, 255, 3), getRandom(0, 255, 3)
  ]);
  const canvasRef = useRef<any>(null);

  const refreshCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas && canvas.getContext) {
      let ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < 4; i++) {
        ctx.font = '80px Calibri'; //随机生成字体大小
        ctx.fillStyle = `rgb(${color[i].toString()})`; //随机生成字体颜色        
        let x = canvas.width / (5) * (i + 1);
        let y = canvas.height / 2;
        let deg = rotate[i];
        /**设置旋转角度和坐标原点**/
        ctx.translate(x, y);
        ctx.rotate(deg * Math.PI / 180);
        ctx.fillText(code[i], 0, 0);

        /**恢复旋转角度和坐标原点**/
        ctx.rotate(-deg * Math.PI / 180);
        ctx.translate(-x, -y);
      }

      /**绘制干扰线**/
      for (let i = 0; i < 4; i++) {
        ctx.strokeStyle = getRandom(100, 255, 3);
        ctx.beginPath();
        ctx.moveTo(getRandom(0, canvas.width), getRandom(0, canvas.height));
        ctx.lineTo(getRandom(0, canvas.width), getRandom(0, canvas.height));
        ctx.stroke();
      }

      /**绘制干扰点**/
      for (let i = 0; i < canvas.width / 4; i++) {
        ctx.fillStyle = getRandom(0, 255);
        ctx.beginPath();
        ctx.arc(getRandom(0, canvas.width), getRandom(0, canvas.height), 1, 0, 2 * Math.PI);
        ctx.fill();
      }
    }
  }

  useEffect(() => {
    refreshCanvas();
  }, [code]);

  const handleRefresh = () => {
    setRotate(getRandom(15, -15, 4));
    setColor([
      getRandom(0, 255, 3), getRandom(0, 255, 3), getRandom(0, 255, 3), getRandom(0, 255, 3)
    ]);
    onRefresh && onRefresh();
  }

  return (
    <div className="verify-code">
      <canvas className="verify-code-canvas" ref={canvasRef}></canvas>

      <div
        className="verify-code-refresh"
        onClick={() => {
          handleRefresh();
        }}
      >
        看不清？换一个
      </div>
    </div>
  )
}

export default VerifyCode;