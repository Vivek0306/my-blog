import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function Navbar({ isAuth, signUserOut }) {

    return (
        <div>
            <nav>
                <Link to="/"> Home </Link>

                {!isAuth ? (
                    <Link to="/login"> Login </Link>
                ) : (
                    <>
                        <Link to="/createpost"> Create Post </Link>
                        <button onClick={signUserOut}> Log Out</button>
                    </>
                )}
            </nav>
        </div>
    )
}

export default Navbar;