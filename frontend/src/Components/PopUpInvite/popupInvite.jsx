import React from 'react';
import './popupInvite.css';
import { AiFillCloseCircle } from "react-icons/ai";

function popupInvite(props) {

 return (props.triger) ? (
    <div className='inviteBox'>
        <div className='box'>

            <div className='close-btn'>
                <span onClick={() => props.setTriger(false)}><AiFillCloseCircle className='icn'/></span>
                { props.children }
            </div>

            <div className='popup-invite'>
                <h1>Invite to Members</h1>
            </div>

            <div className='inputBox-invite'>
                <input type='text' placeholder='Enter the Email' />
            </div>

            <div className='create-btn'>
                <button onClick={() => props.setTriger(false)}>Invite</button>
            </div>

        </div>
    </div>
  ) : '';
 
}

export default popupInvite;