import React from 'react';
import './index.css';
import Logo from '../../Assets/logo1.png';
import Pluse from '../../Assets/plusmath.png';
import Next from '../../Assets/nextpage.png';
import Search from '../../Assets/search.png';
import User from '../../Assets/user.png';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {

    const navigate = useNavigate();

    const workspaces = () => {
        navigate('/workspace');
    }

    const pluse = () => {
        navigate('/pluse');
    }
    
  return (
        <div className='sidebar'>
            <div className='top_section'>

                <div className='logo'>
                    <img src={Logo} alt='' />
                </div>

                <div className='title'>
                    <h3>IntegraAllay</h3>
                </div>
                
            </div>

           <div className='workplace1'>

                <div className='work'>
                    <h3>Workplaces</h3>
                </div>

                <div className='pluse'>
                    <img src={Pluse} alt='' onClick={workspaces} />
                </div>
                
            </div>

            <hr className='hr' />
            
            <div className='collectionSection'>
                <div className='collectionRight'>
                    <div className='top'>
                        <div className='pluse1' >
                            <img src={Pluse} alt='' onClick={pluse} />
                        </div>

                        <div className='search'>
                            <img src={Search} alt='' />
                        </div>
                    </div>

                    <div className='right'>
                        <div className='content'>
                            <div className='icon1'>
                                <img src={Next} alt='' />
                            </div>

                            <div className='name'>
                                <span>Project1</span>
                            </div>

                        </div>

                        <div className='content'>
                            <div className='icon1'>
                                <img src={Next} alt='' />
                            </div>

                            <div className='name'>
                                <span>Project2</span>
                            </div>

                        </div>

                    </div>
                </div>
            </div>

            <div className='userSection'>
                <div className='user'>
                    <div className='userImage'>
                        <img src={User} alt='' />
                    </div>

                    <div className='userName'>
                        <h3>Hashara Nethmi</h3>
                        <span>hasharanethmi2020@gmail.com</span>
                    </div>
                </div>
            </div>

        </div>
  )
}

export default Sidebar;