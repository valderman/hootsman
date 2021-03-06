import React from 'react';
import { Link } from 'react-router-dom';
import { googleSignOut } from './GoogleSignIn.jsx';
import './css/Header.css';

function Header(props) {
    const signOut = () => {
        googleSignOut(() => {
            if(props.onSignOut) {
                props.onSignOut();
            }
        });
    };
    const menuClass = props.hide ? "topMenu hide" : "topMenu";
    return (
        <menu type="toolbar" className={menuClass}>
            <li>
                <Link to="/">Home</Link>
            </li>
            {props.user &&
             <li>
                <button onClick={signOut}>Sign out</button>
             </li>
            }
            {props.user && props.user.isAdmin &&
             <li>
                 <Link to="/admin">Admin</Link>
             </li>
            }
        </menu>
    );
}

export default Header;
