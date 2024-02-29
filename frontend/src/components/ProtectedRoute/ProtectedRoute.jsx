import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...props }) => {
  if (props.loggedIn) return <Component {...props} />;
  else return <Navigate to="/" replace />;
};

export default ProtectedRoute;
