import { motion, useAnimation } from "framer-motion";
import { useState } from "react";

const Svg = () => {
  const controls = useAnimation()
  const [on, setOn] = useState(false)
  const transition = {
    type: "spring",
    delay: 0,
    stiffness: 1000,
    damping: 200,
    mass: 1,
    restDelta: 0.0001
  }

  const handleClick = () => {
    setOn(!on)
    if (on) controls.start("in")
    else controls.set("out")
  }

  const parentAnimation = {
    transition: {
      ...transition,
      staggerChildren: 0.05,
      opacity: { duration: 0.05 }
    },
    variants: {
      out: { scale: 0.1, opacity: 0 },
      in: { scale: 1, opacity: 1 }
    },
  }
  const childAnimations = {
    transition,
    variants: {
      out: {
        scale: 0,
        y: 50
      },
      in: (i) => ({
        scale: 1,
        y: 0,
        transition: {
          ...transition,
          delay: 0.2 * i
        }
      }),
    }
  }
  const graphicAnimations = {
    transition: {
      ...transition,
      stiffness: 1000,
      damping: 200,
      y: {
        ease: 'circOut',
        duration: 15
      }
    },
    variants: {
      out: { scale: 4, y: 50 },
      in: { scale: 1, y: -30 }
    },
  }
  const graphicChildAnimations = {
    transition: {
      ease: 'linear',
      duration: 30
    },
    variants: {
      out: (i) => ({ rotate: 0 + i }),
      in: (i) => ({ rotate: 360 * (1 - Math.random()) * i })
    },
  }

  return (
    <>
      <button style={{ padding: '20px 150px' }} onClick={handleClick}>
        {on ? 'on' : 'off'}
      </button>
      <br />
      <motion.svg
        width="420"
        height="120"
        fill="none"
        viewBox="0 0 160 160"
        animate={controls}
      >
        <mask
          id="mask0"
          width="160"
          height="160"
          x="0"
          y="0"
          maskUnits="userSpaceOnUse"
        >
          <motion.g {...parentAnimation}>
            <motion.path custom={0} {...childAnimations} fill-rule="evenodd" clip-rule="evenodd" d="M53.3751 18L79.7126 29.4347L106.05 18L134.425 31.4215V59.499L79.7126 84.2143L25 59.499V31.4215L53.3751 18ZM53.6172 32.9988L38.6782 40.065V50.6866L79.7126 69.2232L120.747 50.6866V40.065L105.808 32.9988L79.7126 44.3283L53.6172 32.9988Z" fill="white" />
            <motion.path custom={1} {...childAnimations} fill-rule="evenodd" clip-rule="evenodd" d="M25 70.778V85.8734L79.7126 111.583L134.425 85.8734V70.778L79.7126 96.4881L25 70.778Z" fill="white" />
            <motion.path custom={2} {...childAnimations} fill-rule="evenodd" clip-rule="evenodd" d="M25 98.095V113.19L79.7126 138.9L134.425 113.19V98.095L79.7126 123.805L25 98.095Z" fill="white" />
          </motion.g>
        </mask>
        <g mask="url(#mask0)">
          <motion.g {...graphicAnimations}>
            <motion.path
              custom={0}
              fill="#FF9000"
              {...graphicChildAnimations}
              style={{ mixBlendMode: 'screen' }}
              d="M118.29-12.667c-19.277 0-45.885-3.998-58.56 15.718-13.692 21.3-7.43 69.935 22.937 71.155 27.45 1.103 48.478 5.345 71.982-6.749 5.657-2.91 17.832-12.675 14.72-20.622-1.82-4.646-6.867-7.209-10.002-11.075C136.496 7.554 136.484 3.435 100.808.66"
            />
            <motion.path
              custom={1}
              fill="#FFCD00"
              {...graphicChildAnimations}
              style={{ mixBlendMode: 'screen' }}
              d="M110.968 47.858c-20.394 0-48.545-4.23-61.954 16.63-14.487 22.534-7.863 73.988 24.266 75.279 29.041 1.167 51.288 5.656 76.155-7.14 5.984-3.079 18.865-13.41 15.573-21.817-1.925-4.916-7.265-7.627-10.582-11.717-24.197-29.842-24.209-34.2-61.953-37.136"
            />
            <motion.path
              custom={2}
              fill="#FFCD00"
              {...graphicChildAnimations}
              style={{ mixBlendMode: 'screen' }}
              d="M110.968 99.352c-20.394 0-48.545-4.23-61.954 16.63-14.487 22.535-7.863 73.988 24.266 75.279 29.041 1.167 51.288 5.656 76.155-7.139 5.984-3.08 18.865-13.411 15.573-21.818-1.925-4.915-7.265-7.627-10.582-11.717-24.197-29.842-24.209-34.199-61.953-37.136"
            />
            <motion.path
              custom={3}
              fill="#F00"
              {...graphicChildAnimations}
              style={{ mixBlendMode: 'screen' }}
              d="M12.689 57.265c14.233-8.07 32.19-22.078 49.871-13.228 19.1 9.56 35.006 47.098 13.1 60.686-19.801 12.282-33.536 24.13-55.995 25.286-5.405.278-18.516-1.637-19.572-8.644-.618-4.098 2.027-8.051 2.71-12.138 4.98-29.824 3.25-32.786 28.419-49.712"
            />
            <motion.path
              custom={3}
              fill="#00FDFF"
              {...graphicChildAnimations}
              style={{ mixBlendMode: 'screen' }}
              d="M74.667 35.355C67.117 22.07 59.383 2.16 41.178 1.195 21.511.15-8.7 23.625 2.371 45.03c10.008 19.35 15.393 35.511 32.72 46.943 4.17 2.751 15.496 7.294 19.614 2.019 2.408-3.084 2.153-7.572 3.522-11.255 9.988-26.872 12.75-28.503.643-54.18"
            />
            <motion.path
              custom={4}
              fill="#00FDFF"
              {...graphicChildAnimations}
              style={{ mixBlendMode: 'screen', scale: 1.2 }}
              d="M83.384 149.929c-7.548-13.283-15.283-33.193-33.488-34.16-19.667-1.044-49.88 22.43-38.807 43.837 10.008 19.349 15.393 35.511 32.72 46.943 4.17 2.751 15.496 7.293 19.614 2.019 2.408-3.085 2.153-7.572 3.522-11.255 9.988-26.873 12.75-28.503.643-54.18"
            />
          </motion.g>
        </g>
      </motion.svg>
    </>
  );
}

export default Svg