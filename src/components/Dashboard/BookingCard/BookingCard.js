import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import './BookingCard.scss';

import boat from '../../../images/boat-circle.png';
import Rating from '../Rating';

const BookingCard = () => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent style={{ padding: '20px 30px' }}>
        <div className='img-city-booking'>
          <div className='outer-city'>
            <img src={boat} alt='not found' />
            <div className='inner-city'>
              <div>Catalina 12.5 Expo</div>
              <div>New York</div>
            </div>
          </div>

          <div className='show-details'>Show details</div>
        </div>
        <div className='border-card-booking'></div>
        <div className='star-date-booking'>
          <Rating value={4} />
          <div className='date'>15 Oct to 20 Oct 2021</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingCard;
