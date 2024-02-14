import {
  MotionStyle,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import "../styles/Landing.css";

import { ArrowDown, LogInOutline } from "react-ionicons";
import { useEffect, useRef, useState } from "react";
import calendar from "../images/calendar.png";
import { NavbarsAuth } from "../components/NavbarsAuth";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { useMediaQuery } from "react-responsive";

import { useDocumentTitle } from "../hooks/useDocumentTitle";

const calendarParentVariant = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5, // Adjust the stagger delay as needed
    },
  },
};

const calendarChildrenVariant = {
  hidden: {
    pathLength: 0,
  },
  visible: {
    pathLength: 1,
    transition: {
      duration: 0.5,
    },
  },
};

const textVariant = {
  hidden: {
    opacity: 0,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 1,
      duration: 1,
    },
  },
};

const textUpVariant = {
  hidden: {
    opacity: 0,
    y: "2vh",
  },
  visible: {
    opacity: 1,
    y: "0",
    transition: {
      delay: 1.8,
      duration: 1,
    },
  },
};

const textButtonVariant = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 1.8,
      duration: 1,
    },
  },
};

const textSloganVariant = {
  hidden: {
    opacity: 0,
    y: "-2vh",
  },
  visible: {
    opacity: 1,
    y: "0",
    transition: {
      delay: 1.3,
      duration: 1,
    },
  },
};

const MASK_SIZE = 100;

export const Landing = () => {
  useDocumentTitle("Landing - Noteify");
  const isPc = useMediaQuery({ query: "(min-width: 600px)" });

  // INITIAL WAIT
  const [scrollLocked, setScrollLocked] = useState(true);

  useEffect(() => {
    if (scrollLocked) {
      // Lock scrolling
      document.body.style.overflow = "hidden";
      // Unlock scrolling after 3s seconds (adjust the duration as needed)
      const timeoutId = setTimeout(() => {
        setScrollLocked(false);
      }, 3000);

      return () => {
        clearTimeout(timeoutId);
      };
    } else {
      // Unlock scrolling
      document.body.style.overflow = "auto";
    }
  }, [scrollLocked]);

  // REF LIST
  const firstTarget = useRef<HTMLDivElement | null>(null);
  const secondTarget = useRef<HTMLDivElement | null>(null);
  const fourthTarget = useRef<HTMLDivElement | null>(null);

  // FIRST SECTION ANIMATION
  const { scrollYProgress: scrollFirstProgress } = useScroll({
    target: firstTarget,
    offset: ["start start", "end end"],
  });
  const scale1 = useTransform(
    scrollFirstProgress,
    [0, 0.6, 1],
    ["100%", "500%", "13000%"]
  );
  const opacity1 = useTransform(scrollFirstProgress, [0, 0.2], [1, 0]);
  const opacityLogo1 = useTransform(
    scrollFirstProgress,
    [0, 0.99, 1],
    [1, 1, 0]
  );
  const ydown1 = useTransform(scrollFirstProgress, [0, 0.2], ["0%", "60%"]);
  const yup1 = useTransform(scrollFirstProgress, [0, 0.2], ["0%", "-60%"]);
  const xin1 = useTransform(
    scrollFirstProgress,
    [0, 0.6, 1],
    ["0%", "-50%", "-350%"]
  );
  const reverseOpacity1 = useTransform(scrollFirstProgress, [0.1, 1], [0, 2]);

  // SECOND SECTION ANIMATION
  const { scrollYProgress: scrollSecondProgress } = useScroll({
    target: secondTarget,
    offset: ["start end", "end end"],
  });
  useMotionValueEvent(scrollSecondProgress, "change", (value) => {
    if (value >= 0.55 && value <= 0.6) setDark(1 - (value - 0.55) * 17);
    else if (value < 0.55) setDark(1);

    if (value >= 0.3 && value <= 0.4) setGlow1(true);
    else setGlow1(false);

    if (value >= 0.33 && value <= 0.43) setGlow2(true);
    else setGlow2(false);

    if (value >= 0.36 && value <= 0.46) setGlow3(true);
    else setGlow3(false);

    if (value >= 0.99) setZoomOut(true);
    else setZoomOut(false);
  });
  const scale2 = useTransform(
    scrollSecondProgress,
    [0, 0.1, 0.2],
    ["5000%", "300%", "100%"]
  );
  const opacity2 = useTransform(scrollSecondProgress, [0, 0.000000001], [0, 1]);
  const opacityother2 = useTransform(scrollSecondProgress, [0.2, 0.3], [0, 1]);
  const yup2 = useTransform(scrollSecondProgress, [0.2, 0.25], ["5%", "0%"]);

  const [glow1, setGlow1] = useState(false);
  const dragx1 = useTransform(scrollSecondProgress, [0.3, 0.4], ["0%", "345%"]);
  const dragy1 = useTransform(scrollSecondProgress, [0.3, 0.4], ["0%", "330%"]);

  const [glow2, setGlow2] = useState(false);
  const dragx2 = useTransform(
    scrollSecondProgress,
    [0.33, 0.43],
    ["0%", "20%"]
  );
  const dragy2 = useTransform(
    scrollSecondProgress,
    [0.33, 0.43],
    ["0%", "630%"]
  );

  const [glow3, setGlow3] = useState(false);
  const dragx3 = useTransform(
    scrollSecondProgress,
    [0.36, 0.46],
    ["0%", "-310%"]
  );
  const dragy3 = useTransform(
    scrollSecondProgress,
    [0.36, 0.46],
    ["0%", "530%"]
  );

  const ymiddle2 = useTransform(
    scrollSecondProgress,
    [0.5, 0.55, 0.85, 0.93],
    ["0%", "-10%", "-10%", "-20%"]
  );

  const [dark, setDark] = useState(1);

  // FOURTH SECTION ANIMATION
  const { scrollYProgress: scrollFourthProgress } = useScroll({
    target: fourthTarget,
    offset: ["start start", "end end"],
  });
  const [zoomOut, setZoomOut] = useState(false);
  const scale4 = useTransform(
    scrollFourthProgress,
    [0, 0.4, 1],
    ["13000%", "500%", "100%"]
  );
  const opacity4 = useTransform(scrollFourthProgress, [0, 0.3, 0.8], [0, 0, 1]);
  const opacityLogo4 = useTransform(
    scrollFourthProgress,
    [0, 0.01, 1],
    [0, 1, 1]
  );
  const ydown4 = useTransform(scrollFourthProgress, [0, 0.8], ["60%", "0%"]);
  const yup4 = useTransform(scrollFourthProgress, [0, 0.8], ["-60%", "0%"]);

  const xin4 = useTransform(
    scrollFourthProgress,
    [0, 0.4, 1],
    ["-350%", "-50%", "0%"]
  );

  const reverseOpacity4 = useTransform(scrollFourthProgress, [0, 0.3], [2, 0]);

  // TEXT POPUP
  const opacitytext1 = useTransform(
    scrollSecondProgress,
    [0.6, 0.62, 0.63, 0.65],
    [0, 1, 1, 0]
  );
  const upinit1 = useTransform(
    scrollSecondProgress,
    [0.6, 0.63, 0.65],
    ["0%", "-10%", "-50%"]
  );

  const opacitytext2 = useTransform(
    scrollSecondProgress,
    [0.65, 0.67, 0.68, 0.7],
    [0, 1, 1, 0]
  );
  const upinit2 = useTransform(
    scrollSecondProgress,
    [0.65, 0.68, 0.7],
    ["0%", "-10%", "-50%"]
  );

  const opacitytext3 = useTransform(
    scrollSecondProgress,
    [0.7, 0.72, 0.73, 0.75],
    [0, 1, 1, 0]
  );
  const upinit3 = useTransform(
    scrollSecondProgress,
    [0.7, 0.73, 0.75],
    ["0%", "-10%", "-50%"]
  );

  const opacitytext4 = useTransform(
    scrollSecondProgress,
    [0.75, 0.77, 0.78, 0.8],
    [0, 1, 1, 0]
  );
  const upinit4 = useTransform(
    scrollSecondProgress,
    [0.75, 0.78, 0.8],
    ["0%", "-10%", "-50%"]
  );

  const opacitytext5 = useTransform(
    scrollSecondProgress,
    [0.8, 0.82, 0.83, 0.85],
    [0, 1, 1, 0]
  );
  const upinit5 = useTransform(
    scrollSecondProgress,
    [0.8, 0.9, 0.1],
    ["0%", "-10%", "-50%"]
  );

  const opacitywhole2 = useTransform(scrollSecondProgress, [0.85, 1], [1, 0]);

  // TEXT MASK
  const ref = useRef<HTMLHeadingElement | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      if (window) {
        window.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  const extendedStyle: MotionStyle = {
    clipPath: `circle(${MASK_SIZE}px at ${mousePosition.x}px ${mousePosition.y}px)`,
    pointerEvents: "none",
    backgroundClip: "text",

    // filter: "blur(10px)",
  };

  return (
    <>
      <NavbarsAuth />
      <motion.section className="landing">
        <motion.div
          className="position-fixed w-100 bg"
          style={{
            height: "100lvh",
            zIndex: "-1",
          }}
        ></motion.div>

        <motion.div
          className="position-fixed w-100 bg-red"
          style={{
            opacity: !zoomOut ? reverseOpacity1 : reverseOpacity4,
            height: "100lvh",
          }}
        ></motion.div>

        <motion.div className="firstSection" ref={firstTarget}>
          <div
            className="position-sticky w-100"
            style={{
              height: "100lvh",
              top: "23vh",
            }}
          >
            <motion.p
              variants={textSloganVariant}
              initial="hidden"
              animate="visible"
              className="text-center text-white fw-semibold mb-5"
              style={{
                letterSpacing: ".2em",
                opacity: opacity1,
                y: yup1,
                fontSize: isPc ? ".9em" : ".7em",
              }}
            >
              <span className="text-orange">STICK YOUR GOALS! </span>ONE AT A
              TIME
            </motion.p>
            <motion.div
              className="logo m-auto d-flex align-items-center"
              style={{
                width: "fit-content",
                scale: scale1,
                x: xin1,
                opacity: opacityLogo1,
              }}
            >
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke="white"
                fill="transparent"
                width={isPc ? "140px" : "90px"}
                variants={calendarParentVariant}
                initial="hidden"
                animate="visible"
              >
                {/* Calendar icon */}
                <motion.rect
                  variants={calendarChildrenVariant}
                  x="3"
                  y="4"
                  width={isPc ? "17" : "16"}
                  height={isPc ? "17" : "16"}
                  rx="2"
                  ry="3"
                ></motion.rect>
                <motion.line
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1 }}
                  x1="16"
                  y1="2"
                  x2="16"
                  y2="6"
                ></motion.line>
                <motion.line
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1 }}
                  x1="8"
                  y1="2"
                  x2="8"
                  y2="6"
                ></motion.line>
                {/* Erasing the horizontal line that intersects with the checkmark */}
                <motion.line
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1 }}
                  x1="3"
                  y1="10"
                  x2="21"
                  y2="10"
                  stroke="transparent"
                ></motion.line>

                {/* Checkmark icon */}
                <motion.path
                  variants={calendarChildrenVariant}
                  d="M8,12 L11,15 L15,8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></motion.path>
              </motion.svg>
              <motion.h1
                ref={ref}
                variants={textVariant}
                initial="hidden"
                animate="visible"
                className={`d-inline-block fw-bold ${
                  isPc ? "text-orange" : "text-white"
                }`}
                style={{
                  fontSize: isPc ? "5em" : "3em",
                  ...extendedStyle,
                }}
              >
                Noteify
              </motion.h1>
              <motion.h1
                variants={textVariant}
                initial="hidden"
                animate="visible"
                className="fw-bold position-absolute text-white"
                style={{
                  left: isPc ? "1.75em" : "1.875em",
                  fontSize: isPc ? "5em" : "3em",
                  zIndex: "-1",
                }}
              >
                Noteify
              </motion.h1>
            </motion.div>
            <motion.h6
              variants={textUpVariant}
              initial="hidden"
              animate="visible"
              className="text-center text-white fw-semibold m-auto mt-4"
              style={{
                maxWidth: isPc ? "40vw" : "80vw",
                fontSize: isPc ? "1em" : "0.7em",
                lineHeight: "2em",
                opacity: opacity1,
                y: ydown1,
              }}
            >
              Unlock the full potential of your productivity with Noteify, the
              all-in-one digital planner designed to elevate your planning
              experience.
            </motion.h6>

            <motion.button
              variants={textButtonVariant}
              initial="hidden"
              animate="visible"
              whileHover={{
                backgroundColor: "rgba(0,0,0,.3)",
                scale: ".98",
              }}
              className="m-auto d-block text-white text-uppercase fw-semibold mt-5 px-3"
              style={{
                width: isPc ? "24em" : "fit-content",
                fontSize: isPc ? "1em" : ".8em",
                letterSpacing: ".5em",
                wordSpacing: ".2em",
                opacity: opacity1,
                y: ydown1,
              }}
            >
              <ArrowDown width="2em" height="2em" color="#f2ae44" />
              <p className="d-inline ms-4 z-10">SCROLL DOWN</p>
            </motion.button>
          </div>
        </motion.div>

        <motion.div className="secondSection bg-darks" ref={secondTarget}>
          <motion.div
            className="position-sticky w-100 d-flex"
            style={{
              height: "100dvh",
              top: "0",
            }}
          >
            <motion.div
              style={{
                y: ymiddle2,
                opacity: opacitywhole2,
              }}
              className="m-auto"
            >
              <div
                className="d-flex justify-content-center h-100 position-relative"
                style={{ zIndex: 1 }}
              >
                <motion.div
                  className={`cards bg-red text-white mx-4 ${
                    glow1 ? "glow" : ""
                  }`}
                  style={{
                    scale: scale2,
                    opacity: opacity2,
                    left: "40vw",
                    x: dragx1,
                    y: dragy1,
                    boxShadow: glow1 ? "glow" : "",
                    filter: `brightness(${dark})`,
                  }}
                ></motion.div>

                <motion.div
                  className={`cards bg-orange text-white mx-4 ${
                    glow2 ? "glow" : ""
                  }`}
                  style={{
                    x: dragx2,
                    y: dragy2,
                    opacity: opacityother2,
                    left: "50vw",
                    filter: `brightness(${dark})`,
                  }}
                ></motion.div>

                <motion.div
                  className={`cards bg-orange text-white mx-4 ${
                    glow3 ? "glow" : ""
                  }`}
                  style={{
                    opacity: opacityother2,
                    left: "60vw",
                    x: dragx3,
                    y: dragy3,
                    filter: `brightness(${dark})`,
                  }}
                ></motion.div>
              </div>
              <motion.div
                className="d-flex mt-5 h-100"
                style={{
                  width: isPc ? "100%" : "100vw",
                  boxShadow:
                    dark < 0.6 ? "0px 0px 12px 6px rgb(255,255,255)" : "",
                }}
              >
                <motion.img
                  className="bg-red text-white m-auto"
                  src={calendar}
                  style={{
                    width: "700px",
                    y: yup2,
                    opacity: opacityother2,
                    filter: `brightness(${dark})`,
                  }}
                />
              </motion.div>
            </motion.div>
            <motion.div
              className="position-absolute text-start"
              style={{
                left: "50%",
                top: "43%",
                transform: "translate(-50%,-50%)",
              }}
            >
              <motion.div
                className="text-white textPopup"
                style={{ marginTop: "7em" }}
              >
                <motion.h1
                  style={{
                    opacity: opacitytext1,
                    y: upinit1,
                    fontSize: isPc ? "3.5em" : "2.5em",
                  }}
                  className="fw-semibold"
                >
                  User friendly UI
                </motion.h1>
              </motion.div>
              <motion.div className="text-white textPopup">
                <motion.h1
                  style={{
                    opacity: opacitytext2,
                    y: upinit2,
                    fontSize: isPc ? "3.5em" : "2.5em",
                  }}
                  className="fw-semibold"
                >
                  Drag n' drop
                </motion.h1>
              </motion.div>
              <motion.div className="text-white textPopup">
                <motion.h1
                  style={{
                    opacity: opacitytext3,
                    y: upinit3,
                    fontSize: isPc ? "3.5em" : "2.5em",
                  }}
                  className="fw-semibold"
                >
                  Easy tracking
                </motion.h1>
              </motion.div>
              <motion.div className="text-white textPopup">
                <motion.h1
                  style={{
                    opacity: opacitytext4,
                    y: upinit4,
                    fontSize: isPc ? "3.5em" : "2.5em",
                  }}
                  className="fw-semibold"
                >
                  Sticky note based
                </motion.h1>
              </motion.div>
              <motion.div className="text-white textPopup">
                <motion.h1
                  style={{
                    opacity: opacitytext5,
                    y: upinit5,
                    fontSize: isPc ? "3.5em" : "2.5em",
                  }}
                  className="fw-semibold"
                >
                  Custom calendar
                </motion.h1>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
        <div className="thirdSection w-100 text-white">
          <div className="gridOne"></div>
          <div className="gridTwo d-flex">
            <div className="m-auto" style={{ width: "80%" }}>
              <p style={{ letterSpacing: ".2em" }}>AVAILABLE ON APP</p>
              <h1
                className="fw-semibold mt-5"
                style={{
                  fontSize: isPc ? "3em" : "2.5em",
                  letterSpacing: ".05em",
                }}
              >
                Weather Forecast
              </h1>
              <h5
                className="mt-5"
                style={{
                  lineHeight: "1.5em",
                  fontSize: isPc ? "" : "1em",
                }}
              >
                Whenever you're planning your day, our app provides you with
                reliable and up-to-date weather forecasts to help you make
                informed decisions.
              </h5>
            </div>
          </div>

          <div className="gridThree text-end d-flex ">
            <div className="m-auto" style={{ width: "80%" }}>
              <p style={{ letterSpacing: ".2em" }}>AVAILABLE ON APP</p>
              <h1
                className="fw-semibold mt-5"
                style={{
                  fontSize: isPc ? "3em" : "2.5em",
                  letterSpacing: ".05em",
                }}
              >
                Realtime Clock
              </h1>
              <h5
                className="mt-5"
                style={{ lineHeight: "1.5em", fontSize: isPc ? "" : "1em" }}
              >
                Seamlessly integrated into our app, this innovative tool offers
                more than just the time – it's your personal timekeeper,
                calendar, and scheduler all rolled into one.
              </h5>
            </div>
          </div>
          <div className="gridFour"></div>

          <div className="gridFive"></div>
          <div className="gridSix d-flex">
            <div className="m-auto" style={{ width: "80%" }}>
              <p style={{ letterSpacing: ".2em" }}>AVAILABLE ON APP</p>
              <h1
                className="fw-semibold mt-5"
                style={{
                  fontSize: isPc ? "3em" : "2.5em",
                  letterSpacing: ".05em",
                }}
              >
                Location Tracker
              </h1>
              <h5
                className="mt-5"
                style={{ lineHeight: "1.5em", fontSize: isPc ? "" : "1em" }}
              >
                Whether you're commuting to work, running errands, or simply
                enjoying your local surroundings, our app keeps you informed
                about your current country location with precision and
                simplicity.
              </h5>
            </div>
          </div>
        </div>

        <motion.div className="firstSection" ref={fourthTarget}>
          <div
            className="position-sticky w-100"
            style={{ height: "75dvh", top: "23vh" }}
          >
            <motion.p
              className="text-center text-white fw-semibold mb-5"
              style={{
                letterSpacing: ".2em",
                opacity: opacity4,
                y: yup4,
                fontSize: isPc ? ".9em" : ".7em",
              }}
            >
              <span className="text-orange">STICK YOUR GOALS! </span>ONE AT A
              TIME
            </motion.p>
            <motion.div
              className="logo m-auto d-flex align-items-center"
              style={{
                width: "fit-content",
                scale: scale4,
                x: xin4,
                opacity: opacityLogo4,
              }}
            >
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke="white"
                fill="transparent"
                width={isPc ? "140px" : "90px"}
              >
                {/* Calendar icon */}
                <motion.rect
                  x="3"
                  y="4"
                  width={isPc ? "17" : "16"}
                  height={isPc ? "17" : "16"}
                  rx="2"
                  ry="3"
                ></motion.rect>
                <motion.line
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1 }}
                  x1="16"
                  y1="2"
                  x2="16"
                  y2="6"
                ></motion.line>
                <motion.line
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1 }}
                  x1="8"
                  y1="2"
                  x2="8"
                  y2="6"
                ></motion.line>
                {/* Erasing the horizontal line that intersects with the checkmark */}
                <motion.line
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1 }}
                  x1="3"
                  y1="10"
                  x2="21"
                  y2="10"
                  stroke="transparent"
                ></motion.line>

                {/* Checkmark icon */}
                <motion.path
                  d="M8,12 L11,15 L15,8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></motion.path>
              </motion.svg>
              <motion.h1
                ref={ref}
                className={`d-inline-block fw-bold ${
                  isPc ? "text-orange" : "text-white"
                }`}
                style={{
                  fontSize: isPc ? "5em" : "3em",
                  ...extendedStyle,
                }}
              >
                Noteify
              </motion.h1>
              <motion.h1
                className="fw-bold position-absolute text-white"
                style={{
                  left: isPc ? "1.75em" : "1.875em",
                  fontSize: isPc ? "5em" : "3em",
                  zIndex: "-1",
                }}
              >
                Noteify
              </motion.h1>
            </motion.div>
            <motion.h6
              className="text-center text-white fw-semibold m-auto mt-4"
              style={{
                maxWidth: isPc ? "40vw" : "80vw",
                fontSize: isPc ? "1em" : "0.7em",
                lineHeight: "2em",
                opacity: opacity4,
                y: ydown4,
              }}
            >
              Unlock the full potential of your productivity with Noteify, the
              all-in-one digital planner designed to elevate your planning
              experience.
            </motion.h6>

            <motion.button
              whileHover={{
                backgroundColor: "rgba(0,0,0,.3)",
                scale: ".98",
              }}
              className="m-auto d-block text-white text-uppercase fw-semibold mt-5 px-3"
              style={{
                width: isPc ? "24em" : "fit-content",
                fontSize: isPc ? "1em" : ".8em",
                letterSpacing: ".4em",
                wordSpacing: ".1em",
                opacity: opacity4,
                y: ydown4,
              }}
            >
              <LogInOutline width="2em" height="2em" color="#f2ae44" />
              <Link
                to="/login"
                className="d-inline ms-4 z-10 text-white text-decoration-none "
              >
                Getting Started
              </Link>
            </motion.button>
          </div>
        </motion.div>
      </motion.section>
      <Footer />
    </>
  );
};
