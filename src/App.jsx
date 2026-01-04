import { useState } from "react";
import RoutingCom from "./component/RoutingCom";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <>
      <ToastContainer />
      <RoutingCom></RoutingCom>
      {/* <SignUp></SignUp> */}
    </>
  );
}

export default App;
