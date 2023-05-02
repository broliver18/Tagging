import React, { useState, useRef, useEffect } from 'react';
import './Tags.css';

function Icon() {
    return(
        <svg className="svg" height="20" width="20" viewBox="0 0 20 20">
            <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
        </svg>
    );
};

function CloseTagIcon() {
    return (
        <div className="Close-button-tag">
            <svg height="20" width="20" viewBox="0 0 20 20">
                <path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"></path>
            </svg>
        </div>
    );
};

function CloseOptionIcon() {
    return (
        <div className="Close-button-option">
            <svg height="20" width="20" viewBox="0 0 20 20">
                <path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"></path>
            </svg>
        </div>
    );
};

function Tags(props) {
    const [input, setInput] = useState('');
    const [showMenu, setShowMenu] = useState(false);
    const [tags, setTags] = useState(props.isMulti ? [] : null);

    const inputRef = useRef();

    const handleChange = e => setInput(e.target.value);

    useEffect(() => {
        const handler = () => setShowMenu(false);

        window.addEventListener("click", handler);
        return () => {
            window.removeEventListener("click", handler);
        };
    });

    useEffect(() => {
        if (showMenu && inputRef.current) inputRef.current.focus();
    }, [showMenu])

    function createTags(e) {
        const { key } = e;
        const trimmedInput = input.trim();
        const tag = { value: trimmedInput, label: trimmedInput }

        if ((key === ',' || key === 'Enter') && trimmedInput.length && !tags.some(option => option.value.toLowerCase() === trimmedInput.toLowerCase())) {
            e.preventDefault();
            setTags(prevState => [...prevState, tag]);
            props.onCreate(tag);
            setInput('');
        }

        if (key === 'Backspace' && !input.length && tags.length) {
            e.preventDefault();
            const tagsCopy = [...tags];
            const poppedTagObject = tagsCopy.pop();

            setTags(tagsCopy);
            setInput(poppedTagObject.label);
        }
    };

    function toggleMenu(e) {
        e.stopPropagation();
        setShowMenu(!showMenu);
    };

    function getDisplay() {
        if (props.isMulti) {
            return (
                <div className="Dropdown-tags">
                    {tags.map(option => {
                        return (
                            <div className="Dropdown-tag-item" key={option.value}>
                                {option.label}
                                <span className="Dropdown-tag-close"
                                    onClick={(e) => {onTagRemove(e, option)}}><CloseTagIcon/>
                                </span>
                            </div>
                        )        
                    })}
                    <input
                        value={input}
                        placeholder="Enter a tag"
                        onKeyDown={createTags}
                        onChange={handleChange} 
                        onClick={(e) => e.stopPropagation()}
                        ref={inputRef} />
                </div>
            )     
        };
    };

    function removeOption(option) {
        return tags.filter(o => o.value !== option.value);
    };

    function onTagRemove(e, option) {
        e.stopPropagation();
        setTags(removeOption(option));
    };

    function onItemClick(e, option) {
        e.stopPropagation();
        let newValue;
        if (props.isMulti) {
            if (tags.findIndex(o => o.value === option.value) >= 0) {
                newValue = removeOption(option);
            } else {
                newValue = [...tags, option];
            } 
        } else {
            newValue = option;
        }
        setTags(newValue);
    };

    return (
        <div className="Dropdown-container">
            <div className="Dropdown-input" onClick={toggleMenu}>
                <div className="Dropdown-placeholder">{props.placeHolder}</div>
                <div className="Dropdown-tools">
                    <div className="Dropdown-tool">
                        <Icon/>
                    </div>
                </div>
            </div>
            {showMenu && (
            <div className="Dropdown-menu-container">    
                <div className="Dropdown-menu">
                    <div className="Dropdown-selected-value">{getDisplay()}</div>
                    {props.tagOptions.map(option => (
                        <div 
                            className="Dropdown-item" 
                            onClick={(e) => onItemClick(e, option)}
                            key={option.value}>
                            {option.label}
                            <span className="Dropdown-option-close"
                                onClick={(e) => 
                                    props.onOptionRemove(e, option)}
                                ><CloseOptionIcon/>
                            </span>
                        </div> 
                    ))}
                
                </div>
                <div className="Dropdown-extra-space"></div>
            </div>
            )}
        </div>
    )
}

export default Tags;