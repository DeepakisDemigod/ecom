/*import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { loading, isAuthenticated, user } = useSelector(state => state.user);
  const navigate = useNavigate();
  return (
    <>
      {!loading && (
        <Route
          {...rest}
          render={props => {
            if (!isAuthenticated) {
              return <Navigate to='/login' />;
            }
            return <Component {...props} />;
          }}
        ></Route>
      )}
    </>
  );
};

export default ProtectedRoute;*/

// everthing not working but not broken

import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = () => {
  const { loading, isAuthenticated } = useSelector(state => state.user);

  if (loading) {
    return <h1>Loading...</h1>; // Or a spinner if you want to show a loading state
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
