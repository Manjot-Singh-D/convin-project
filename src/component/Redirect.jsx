import React from "react";

const Redirect = () => {
  window.location.replace(window.location.origin);
  return <div>Redirect</div>;
};

export default Redirect;
