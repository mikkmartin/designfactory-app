import { FC, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import styled from 'styled-components'

export const LoadingBar: FC<{ loading: boolean }> = ({ loading }) => {
  const controls = useAnimation();

  const animate = () => {
    controls.start({
      scaleX: [0, 1, 0],
      x: ["-100%", "0%", "100%"]
    });
  };

  const onAnimationComplete = () => {
    if (loading) animate();
  };

  useEffect(() => {
    if (loading) animate();
  }, [loading]);

  return (
    <Container>
      <motion.div
        animate={controls}
        onAnimationComplete={onAnimationComplete}
      />
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  height: 1.5px;
  width: 100%;
  overflow: hidden;
  div {
    height: 100%;
    width: 100%;
    background: var(--highlight);
  }
`;