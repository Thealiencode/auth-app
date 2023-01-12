import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate  } from 'react-router-dom';

import { login } from "../actions/auth";


const Login = () => {
    let navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { isLoggedIn } = useSelector(state => state.auth);
    const { message } = useSelector(state => state.message);

    if (isLoggedIn) {
        return <Navigate to="/" />;
    }


  const dispatch = useDispatch();


    const handleLogin = async(e) => {
        e.preventDefault();
        try{
            await dispatch(login(email, password))
            navigate("/");
            window.location.reload();

        } catch(error){
        }
       
    }

  return (
    <div className="app">
         <div className="card">
            <h1 className="header">Login</h1>
            {message && message.message &&  (
                <div className="alert danger">
                    {message.message}
                </div>
            )}

            <form  onSubmit={handleLogin}>
                <div className="form-group">
                    <label>Email</label>
                    <input className={message  && message.email && 'unvalidated'} type="text" placeholder="Enter your email Address" onChange={({target}) => setEmail(target.value)}/>
                    {message  && message.email && (
                        <small className="validation-error">
                            {message.email }
                        </small>
                    )}
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className={message  && message.password && 'unvalidated'} onChange={({target}) => setPassword(target.value)} placeholder="Enter Password"/>
                    {message && message.password && (
                        <small className="validation-error">
                            {message.password}
                        </small>
                    )}
                </div>

                <div className="submit-btn-wrapper">
                    <button className="submit-btn">Login</button>
                </div>
            </form>
            <p className="text-center">Dont have an account <a href="/register">Register</a></p>

        
        </div>
    </div>
  )
}

export default Login