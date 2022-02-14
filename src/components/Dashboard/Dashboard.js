import React from 'react';
import './Dashboard.scss';

import Sidebar from '../Sidebar/Sidebar';
import TotalEarningsCard from './DashboardCard/DashboardCard';
import money from '../../images/money.png';
import tick from '../../images/tick.png';
import BookingCard from './BookingCard/BookingCard';

const Dashboard = () => {
  return (
    <>
      <Sidebar>
        <div className='dashboard-wrapper'>
          <div className='row'>
            <div className='col-sm-12 col-md-6 col-lg-6'>
              <TotalEarningsCard img={tick} title='Competed Bookings' />
            </div>
            <div className='col-sm-12 col-md-6 col-lg-6'>
              <TotalEarningsCard img={money} title='Total Earnings' />
            </div>
            <div className='long-card'>My Booking</div>
            <div className='col-sm-12 col-md-8 col-lg-8'>
              <div style={{ marginBottom: '50px' }}>
                <BookingCard />
              </div>

              <div style={{ marginBottom: '50px' }}>
                <BookingCard />
              </div>
            </div>

            <div className='col-sm-12 col-md-4 col-lg-4'>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi,
              minima.
            </div>
          </div>
        </div>
      </Sidebar>
    </>
  );
};

export default Dashboard;
