import React, { useState, useEffect } from "react";

function Header() {

const Name = "Chirag";
const islogin = true;
    return (
        <header>
            <div className="header">
                <div className="Headerleft">
                    <img src="/avatar.jpg" className="avatar"/>
                    <h2>{Name}</h2>
                </div>
                <div className="Headercenter">
                    <img src="/logo1.png" className="headerimg"/>
                </div>
                <div className="Headerright">
                    {islogin ?
                           (<button className="Loginbuttn">Login</button>):
                     
                           (<button  className="Logoutbuttn">Logout</button>)
                     
                     
                     
                     }
                </div>
            </div>
        </header>
    );
}


export default Header; 