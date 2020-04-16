import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import gsap from 'gsap';

const Wrapper = styled.div`
  position: absolute;
  height: 100%;
  left: 0%;
  top: 0%;
  background-color: ${({ theme }) => theme.color.red[0]};
`;

export interface BarProps {
  from: number;
  to: number;
  duration: number;
}

const Bar: React.SFC<BarProps> = ({ from, to, duration }) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const start = Number(((from / duration) * 100).toFixed(2));
    const end = Number(((to - from / duration) * 100).toFixed(2));
    console.log(start);
    console.log(end);
    gsap.set(ref.current, {
      left: `${start}%`,
      right: `${end + start}%`,
    });
  }, [duration]);

  return <Wrapper ref={ref}></Wrapper>;
};

export default Bar;
