import React, { CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";
const override: CSSProperties = {
  display: "block",
  position: "absolute",
  top: "50vh",
  left: "50vw",
  transform: "translate(-50%, -50%)",
};
const Loading = () => {
  return (
    <div className="relative w-full h-100vh flex items-center justify-center">
      <ClipLoader
        color={"#ed691c"}
        loading={true}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loading;
