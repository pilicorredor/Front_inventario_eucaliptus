import React, { useState } from 'react';
import "./Dropdown.css";
import DropdownButton from "../DropdownButton/DropdownButton";
import DropdownContent from '../DropdownContent/DropdownContent';

const Dropdown = ({ buttonText, content }) => {

    const [open, setOpen] = useState(false);
    
    const toggleDropdown = () => {
        setOpen((open) => !open);
    };

    return (
        <div className='dropdown'>
            <DropdownButton toggle={toggleDropdown} open={open}>
                {buttonText}
            </DropdownButton>

            <DropdownContent open={open}>
                {content}
            </DropdownContent>
        </div>
    )
}

export default Dropdown;

//rafce
