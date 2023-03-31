import React from 'react';
import { CSSTransition } from 'react-transition-group';
import './NavMobile.css';

function NavMobile(props) {

    return (
        <div className="NavMobile">
            <h1>Ta<span className="highlight">ggg</span>ing</h1>
            <div className="Button-open" onClick={props.toggleOpen} >
                <div></div>
                <div></div>
                <div></div>
            </div>
            {props.children}
        </div>
    )
}

export default NavMobile