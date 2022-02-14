import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import LinearProgress, {
  linearProgressClasses,
} from '@mui/material/LinearProgress';

const DashboardCard = (props) => {
  const { img, title } = props;
  return (
    <div className='dashboard-card-wrapper'>
      <Card
        sx={{
          minWidth: 275,
          background: '#f9f9fb',
        }}
      >
        <CardContent style={{ padding: '20px 30px' }}>
          <img src={img} alt='not found'  height={50} />
          <Typography
            variant='h6'
            className='my-3'
            component='div'
            style={{ color: '#5A5E7C' }}
          >
            {title}
          </Typography>
          <div>
            <Box sx={{ flexGrow: 1 }}>
              {title === 'Competed Bookings' ? (
                <BorderLinearProgress
                  variant='determinate'
                  value={25}
                  style={{ background: '#DCE7F7' }}
                />
              ) : (
                <BorderLinearProgressTwo
                  variant='determinate'
                  value={60}
                  style={{ background: '#D8FDD5' }}
                />
              )}

              {title === 'Competed Bookings' ? (
                <div
                  className='mt-3'
                  style={{
                    fontWeight: 'bold',
                    fontSize: '20px',
                    color: '#544D56',
                  }}
                >
                  50
                </div>
              ) : (
                <div
                  className='mt-3'
                  style={{
                    fontWeight: 'bold',
                    fontSize: '20px',
                    color: '#544D56',
                  }}
                >
                  $70,00,000
                </div>
              )}
            </Box>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardCard;

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#4581DD' : '#4581DD',
  },
}));

const BorderLinearProgressTwo = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#75E76B' : '#75E76B',
  },
}));
