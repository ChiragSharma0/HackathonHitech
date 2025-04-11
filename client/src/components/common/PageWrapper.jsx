import React from "react";
import { useNavigate } from "react-router-dom";

const PageWrapper = ({ children }) => {
    const navigate = useNavigate();

    const handleLeave = () => {
        // Optional: reset local state/context here
        navigate("/"); // or navigate back: navigate(-1);
    };

    return (
        <div className="p-6 bg-white rounded-xl shadow-md relative contentcontainer">
            <div className="content">
                {children}
            </div>
            <div className="contentbtn"  >
                <button
                    onClick={handleLeave}
                    className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                    Leave
                </button>
            </div>
        </div>
    );
};

export default PageWrapper;
