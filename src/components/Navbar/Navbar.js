import React from 'react';
import './Navbar.scss';

import Logo from '../../images/Main-logo.png';
import { Link } from 'react-router-dom';

const Navbar = ({ buttonName, pageRoute }) => {
  return (
    <>
      <nav className='navbar navbar-light main-color'>
        <div className='container-fluid'>
          <Link className='navbar-brand ms-5' to='/'>
            <img
              src={Logo}
              // width='30' height='30'
              alt=''
            />
          </Link>
          <form className='d-flex mx-5'>
            <Link
              // to='/signup'
              to={pageRoute}
              className='main-button'
              type='button'
            >
              {/* Sign Up */}
              {buttonName}
            </Link>
          </form>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
