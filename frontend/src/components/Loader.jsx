import React from "react";
import Spinner from "react-spinkit";
const Loader = () => {
  return (
    <div className="h-screen grid place-items-center">
      <div className="flex flex-col items-center text-center">
        <Spinner name="ball-spin-fade-loader" color="purple" fadeIn="none" />
      </div>
    </div>
  );
};

export default Loader;
