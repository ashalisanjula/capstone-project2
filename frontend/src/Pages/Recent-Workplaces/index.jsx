import React from 'react';
import './index.css';
import Logo from '../../Assets/logo.png';
import Pluse from '../../Assets/plusmath.png';
import User from '../../Assets/user.png';
import Trash from '../../Assets/fullTrash.png';
import Navbar from '../../Components/NavBar';

const Recent_Workplaces = () => {

    return (
    <div className='container1'>
        <div className='sidebar1'>
            <div className='top_section1'>

                <div className='logo1'>
                    <img src={Logo} alt='' />
                </div>

                <div className='title1'>
                    <h3>IntegraAlly</h3>
                </div>
                
            </div>

            <div className='addImage'>
                <div className='image'>
                    <a href='#'>
                        <img src={Pluse} alt='' />
                        <span>Add Image</span>
                    </a>
                </div>
            </div>
            
            <div className='functionSection'>
                <div className='functionTitle'>
                    <span>Create new team</span>
                </div>

                <hr className='hr2' />       

                <div className='function'>
                    <img src={Pluse} alt='' />
                    <span>Functions</span>
                </div>

                <div className='function'>
                    <img src={Pluse} alt='' />
                    <span>Functions</span>
                </div>

                <div className='function'>
                    <img src={Pluse} alt='' />
                    <span>Functions</span>
                </div>

                <div className='function'>
                    <img src={Pluse} alt='' />
                    <span>Functions</span>
                </div>

            </div>

            <div className='userSection1'>
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

        <div className='navbarSide'>
            
            <Navbar />

            <div className='recentSection'>
                <div className='recentTitle'>
                    <span>Recently Visited Workplaces</span>
                </div>

                <div className='recentWork'>
                    <div className='recent'>
                        <div className='work'>
                            <input type='text' placeholder='MyWork' />
                        </div>

                        <div className='delete'>
                            <img src={Trash} alt='' />
                        </div>
                    </div>

                    <div className='recent'>
                        <div className='work'>
                            <input type='text' placeholder='NewWorkplace' />
                        </div>

                        <div className='delete'>
                            <img src={Trash} alt='' />
                        </div>
                    </div>

                    <div className='recent'>
                        <div className='work'>
                            <input type='text' placeholder='NewWorkplace2' />
                        </div>

                        <div className='delete'>
                            <img src={Trash} alt='' />
                        </div>
                    </div>
                </div>

                <div className='createSection'>
                    <div className='createTitle'>
                        <span>Create New Workplace</span>
                    </div>

                    <div className='createImg'>
                        <img src={Pluse} alt='' />
                    </div>
                </div>

            </div>

        </div>
    

        
  </div>
  )
}

export default Recent_Workplaces;