import React, { useState, useRef, useEffect } from 'react';
import './NewPlaylist.css';

function NewPlaylist(props) {
    const [showMenu, setShowMenu] = useState(false);
    const [playlistName, setPlaylistName] = useState('');
    const [isSelected, setIsSelected] = useState(false);

    const inputRef = useRef();

    const handleChange = e => setPlaylistName(e.target.value);

    useEffect(() => {
        const handler = () => setShowMenu(false);

        window.addEventListener("click", handler);
        return () => {
            window.removeEventListener("click", handler);
        };
    });

    useEffect(() => {
        if (showMenu && inputRef.current) inputRef.current.focus();
    }, [showMenu]);

    function toggleMenu(e) {
        e.stopPropagation();
        setShowMenu(true);
    };

    function toggleSelect(e) {
        e.stopPropagation();
        if (playlistName.length) {
            setIsSelected(true);
            setTimeout(() => {
                setIsSelected(false);
                setShowMenu(false);
                setPlaylistName('');
            }, 500)
        };
    };

    function onEnter(e) {
        const { key } = e; 
        if (key === 'Enter') {
            e.preventDefault();
            toggleSelect(e);
        };
    };

    function renderInput() {
        if (!showMenu) {
            return (
                <div className="New-playlist-information">
                    <h3>New Playlist</h3>
                </div>
            )
        } else {
            return (
                <div className="Create-playlist">
                    <input
                        value={playlistName}
                        placeholder="Enter playlist name" 
                        onChange={handleChange}
                        onKeyDown={onEnter} 
                        onClick={(e) => e.stopPropagation()}
                        ref={inputRef} />
                </div>
            )
        }
    };

    function renderSelect() {
        if (!showMenu) {
            return <button className="Add-button" onClick={toggleMenu}>+</button>
        } else {
            if (isSelected) {
                return <button className="no-hover">&#10003;</button>
            } else {
                return <button className="Create-playlist-button" onClick={toggleSelect}>+</button>
            }
        };
    };

    return (
        <div className="New-playlist">
            {renderInput()}
            {renderSelect()}
        </div>
    )
}

export default NewPlaylist;