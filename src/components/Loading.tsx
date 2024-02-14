import { motion } from "framer-motion";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

const DivStyle = {
  width: "100vw",
  height: "100vh",
};

const objectVariant = {
  visible: {
    scale: [1, 2, 2, 1, 1],
    rotate: [0, 0, 270, 270, 0],
    borderRadius: ["10%", "10%", "50%", "50%", "10%"],
    transition: {
      repeat: Infinity,
      repeatDelay: 1,
    },
  },
};

export const Loading = () => {
  useDocumentTitle("Loading..");

  return (
    <div
      className="d-flex bg-orange flex-column align-items-center justify-content-center "
      style={DivStyle}
    >
      <motion.div
        variants={objectVariant}
        animate="visible"
        className="bg-white d-block"
        style={{
          width: "5em",
          height: "5em",
        }}
      ></motion.div>
      <h6 className="text-white d-block mt-5 fw-semibold">
        Don't forget to set allow cookies!
      </h6>
    </div>
  );
};
