import React, { useState, useEffect } from "react";
import Header from "../common/Header";
import { JumpscareProvider } from "../../context/Jumpcontext";
import { SplineProvider } from "../../context/splinecontext";

function Page() {



    return (
        <div className="Page" style={{display:"flex",alignContent:"center",justifyContent:"center", zIndex:100}}>
           <Header/>
           <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Router>
        </div>
    );
}


export default Page;