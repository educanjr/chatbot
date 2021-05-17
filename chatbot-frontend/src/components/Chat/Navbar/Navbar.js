import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { logout } from '../../../store/actions/auth';

import './Navbar.scss';

const Navbar = () => {
    const distpach = useDispatch();

    const [showOptions, setShowOptions] = useState(false);

    const user = useSelector(state => state.authReducer.user);

    return (
        <div id='navbar' className='card-shadow'>
            <h2>Chat</h2>
            <div id='profile-menu' onClick={ () => setShowOptions(!showOptions) }>
                <img width='40' height='40' src={user.avatar} alt='Avatar' />
                <p>
                    { user.firstName } { user.lastName }
                    {
                        !showOptions ?
                        <FontAwesomeIcon icon='caret-down' className='fa-icon' />
                        :
                        <FontAwesomeIcon icon='caret-up' className='fa-icon' />
                    }
                    
                </p>
                {
                    showOptions &&
                    (<div id='profile-options'>
                        <p>Update Profile</p>
                        <p onClick={ () => distpach(logout()) }>Logout</p>
                    </div>)
                }
            </div>
        </div>
    )
}

export default Navbar;