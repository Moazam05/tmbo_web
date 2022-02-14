import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRoutes = () => {
  const user = JSON.parse(localStorage.getItem('userInfo'));
  // console.log('user', user);
  return (
    <>
      {user && user.message === 'Logged In Successfully!' ? (
        <Outlet />
      ) : (
        <Navigate to='/' />
      )}
    </>
  );
};

export default ProtectedRoutes;
