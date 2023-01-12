import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate  } from 'react-router-dom';

import { login } from "../redux/actions/auth";


const Login = () => {
    let navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { isLoggedIn } = useSelector(state => state.auth);
    const { message } = useSelector(state => state.message);
    const [errors, setErrors] = useState({});

    if (isLoggedIn) {
        return <Navigate to="/" />;
    }


  const dispatch = useDispatch();



    const handleLogin = async(e) => {
        e.preventDefault();
        var errorArr = {};
        var emailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(!email.match(emailformat)){
           errorArr['email'] = "Enter a valid email"
        }
        if(password == ''){
           errorArr['password'] = "The password Field is required"
        }
        setErrors(errorArr);
        if(errorArr.email || errorArr.password)return 

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
                    <input className={((message  && message.email) || (errors && errors.email)) && 'unvalidated'} type="text" placeholder="Enter your email Address" onChange={({target}) => setEmail(target.value)}/>
                    {message  && message.email && (
                        <small className="validation-error">
                            {message.email }
                        </small>
                    )}
                    {errors && errors.email && (
                        <small className="validation-error">
                            {errors.email}
                        </small>
                    )}
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className={((message  && message.password) || (errors && errors.password)) && 'unvalidated'} onChange={({target}) => setPassword(target.value)} placeholder="Enter Password"/>
                    {message && message.password && (
                        <small className="validation-error">
                            {message.password}
                        </small>
                    )}
                      {errors && errors.password && (
                        <small className="validation-error">
                            {errors.password}
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