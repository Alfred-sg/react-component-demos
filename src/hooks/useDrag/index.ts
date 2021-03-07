import { useRef, useCallback, useState, useEffect } from 'react';

type MinMaxRule = {
  min?: number; 
  max?: number; 
};

export type PositionRule = {
  left: MinMaxRule;
  top: MinMaxRule; 
};

type Options = {
  onMouseDown?: (event: any) => any;
  onMouseMove?: (event: any) => any;
  onMouseUp?: (event: any) => any;
  startPosition?: {
    left: number;
    top: number;
  },
  positionRule?: PositionRule;
};

const getRealEvent = (event: any) => {
  let realEvent;
  if (event.type.match(/touch/)) {
    if (event.touches.length > 1) {
      return;
    };
    realEvent = event.touches[0];
  } else {
    realEvent = event;
  };

  return realEvent;
};

const defaultXY = { x: 0, y: 0, };

const useMouseDrag = (options?: Options) => {
  const {
    onMouseDown: onMouseDownOpt,
    onMouseMove: onMouseMoveOpt,
    onMouseUp: onMouseUpOpt,
    startPosition,
    positionRule,
  } = options || {} as Options;

  const downingRef = useRef(false);
  const movedRef = useRef(false);
  const startXYRef = useRef(defaultXY);
  const [moveXY, setMoveXY] = useState(defaultXY);
  const [position, setPosition] = useState(startPosition || { left: 0, top: 0 });
  const positionRuleRef = useRef<PositionRule>(positionRule || {} as PositionRule);

  const onMouseDown = (event: React.SyntheticEvent) => {
    event.preventDefault();
    event.stopPropagation();
    const optResult = onMouseDownOpt && onMouseDownOpt(event);
    console.log(event)
    console.log(optResult)
    if (optResult === false) return;

    const realEvent = getRealEvent(event);
    downingRef.current = true;
    startXYRef.current = {
      x: realEvent.clientX,
      y: realEvent.clientY,
    };

    onMouseMove(event);
  }

  const onMouseUp = (event: React.SyntheticEvent) => {
    event.preventDefault();
    event.stopPropagation();
    const optResult = onMouseUpOpt && onMouseUpOpt(event);
    if (optResult === false) return;

    downingRef.current = false;
    movedRef.current = false;
    startXYRef.current = defaultXY;
  }

  const onMouseMove = (event: React.SyntheticEvent) => {
    event.preventDefault();
    event.stopPropagation();
    const optResult = onMouseMoveOpt && onMouseMoveOpt(event);
    if (optResult === false) return;
    if (!downingRef.current) return;

    movedRef.current = true;

    const realEvent = getRealEvent(event);
    const moveXY = {
      x: realEvent.clientX - startXYRef.current.x,
      y: realEvent.clientY - startXYRef.current.y,
    };

    setMoveXY(moveXY);
    requestAnimationFrame(() => {
      move(moveXY.x, moveXY.y);
    });
    return moveXY;
  };

  const move = useCallback((x: number, y: number) => {
    const { left, top } = position;
    const { left: leftRule, top: topRule } = positionRuleRef.current;

    let newLeft = left + x;
    if (leftRule && leftRule.min){
      if (newLeft < leftRule.min) newLeft = leftRule.min;
    };
    if (leftRule && leftRule.max){
      if (newLeft > leftRule.max) newLeft = leftRule.max;
    };

    let newTop = top + x;
    if (topRule && topRule.min){
      if (newTop < topRule.min) newTop = topRule.min;
    };
    if (topRule && topRule.max){
      if (newTop > topRule.max) newTop = topRule.max;
    };

    setPosition({
      left: newLeft,
      top: newTop,
    })
  }, [position, positionRuleRef]);

  const setPositionRule = (positionRule: PositionRule) => {
    positionRuleRef.current = positionRule;
  };

  return {
    startXY: startXYRef.current,
    moveXY,
    position,
    setPosition,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    setPositionRule,
  };
}

export default useMouseDrag;