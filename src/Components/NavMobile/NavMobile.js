import React, { useState } from 'react';
import './NavMobile.css';

import Playlist from '../Playlist/Playlist';

function NavMobile(props) {

    const [open, setOpen] = useState(false);

    function toggleOpen() {
        setOpen(!open);
    }

    function navClose() {
        return (
            <div className="NavClose">
                <h1>Ta<span className="highlight">ggg</span>ing</h1>
                <div className="Menu-open" onClick={toggleOpen}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        )
    }

    function navOpen() {
        return (
            <div className="NavOpen">
                <div class="Menu-close" onClick={toggleOpen}>
                   <h1>X</h1>
                </div>
            {
                props.playlists.map((playlist) => {
                    return <Playlist playlist={playlist}
                            key={playlist.key}
                            isAddition={false} />
                })
            }
            </div>
        )
    }

    return (
       <div className="NavMobile">
            {open ? navOpen() : navClose()}
       </div>
    )
}

export default NavMobile