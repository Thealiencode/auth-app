import { useSelector } from "react-redux";
import { Navigate, useNavigate  } from 'react-router-dom';


const Home = () => {
    const { isLoggedIn } = useSelector(state => state.auth);
    let navigate = useNavigate();
    
    
    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    }
    
    const { user: currentUser } = useSelector((state) => state.auth);

  return (
    <div>Hello {currentUser.firstname} {currentUser.lastname} !</div>
  )
}

export default Home