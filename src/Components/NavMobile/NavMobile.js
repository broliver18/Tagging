import React, { useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import './NavMobile.css';

function NavMobile(props) {
    useEffect(() => {
        window.addEventListener("click", props.closeNav);
        return () => {
            window.removeEventListener("click", props.closeNav);
        }
    })

    return (
        <div className="NavMobile">
            <h1>Ta<span className="highlight">ggg</span>ing</h1>
            <div className={props.isActive ? "change" : "Button-open"} onClick={(e) => {
                props.toggleClass();
                props.toggleOpen();
                e.stopPropagation();
            }}>
                <div className="bar1"></div>
                <div className="bar2"></div>
                <div className="bar3"></div>
            </div>
            <CSSTransition 
            in={props.open}
            timeout={300}
            classNames="Playlist-open"
            unmountOnExit>
                {props.children}
            </CSSTransition>
        </div>
    )
}

export default NavMobile