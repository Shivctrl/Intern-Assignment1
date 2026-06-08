import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../services/auth.service';

function PrivateRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
