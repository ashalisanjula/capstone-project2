import React from 'react';
import './index.css';

const Tabs = () => {
  return (
    <div>
        <div className='tabs'>

            <div className='tab'>
                <a href='#'>Description</a>
            </div>

            <div className='tab'>
                <a className='active' href='#'>Collection</a>
            </div>

            <div className='tab'>
                <a href='#'>New tabs</a>
            </div>

            <div className='tab'>
                <a href='#'>New tabs</a>
            </div>

        </div>
    </div>
  )
}

export default Tabs;