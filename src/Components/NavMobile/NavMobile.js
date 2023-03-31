import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import './NavMobile.css';

function NavMobile(props) {

    return (
        <div className="NavMobile">
            <h1>Ta<span className="highlight">ggg</span>ing</h1>
            <div className={props.isActive ? "change" : "Button-open"} onClick={() => {
                props.toggleClass();
                props.toggleOpen();
            }}>
                <div className="bar1"></div>
                <div className="bar2"></div>
                <div className="bar3"></div>
            </div>
            {props.open && props.children}
        </div>
    )
}

export default NavMobile