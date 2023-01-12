import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate  } from 'react-router-dom';

import { register } from "../redux/actions/auth";


const Register = () => {
    const { isLoggedIn } = useSelector(state => state.auth);
    
    if (isLoggedIn) {
      return <Navigate to="/" />;
    }

    const [email, setEmail] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [successful, setSuccessful] = useState("");

    const { message } = useSelector(state => state.message);
    const [errors, setErrors] = useState({});

    const dispatch = useDispatch();

    const form = useRef(null)

    const handleRegister = async(e) => {
        e.preventDefault();
        var errorArr = {};

        if(firstname == ''){
          errorArr['firstname'] = "The firstname Field is required"
        }
        if(lastname == ''){
          errorArr['lastname'] = "The lastname Field is required"
       }
       if(password == ''){
         errorArr['password'] = "The Password field is required"
       } else if(password != confirmPassword){
          errorArr['password'] = "The Password and confirm Password should match"
       }
       var emailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
       if(!email.match(emailformat)){
          errorArr['email'] = "Enter a valid email"
       }

       setErrors(errorArr);
        if(errorArr.email || errorArr.password || errorArr.firstname || errorArr.lastname)return 

        try{
            await dispatch(register(firstname, lastname,email, password, confirmPassword))
            setSuccessful(true)
            form.current.reset()

        } catch(error){
          setSuccessful(false)
        }
    }

  return (
    <div className="app">
         <div className="card">
            <h1 className="header">Register</h1>
            {successful ?  (
              <>
                <div className="alert success">
                    {message}
                </div>
                <p className="text-center"><a href="login">LOGIN</a></p>
              </>
              )
              :
              (
                <>
                
                <form  onSubmit={handleRegister} ref={form}>
  
                    <div className="form-group">
                        <label>First Name</label>
                        <input className={((message  && message.firstname) || (errors && errors.firstname)) && 'unvalidated'} type="text" placeholder="Enter your first name" onChange={({target}) => setFirstname(target.value)} />
                        {message  && message.firstname && (
                            <small className="validation-error">
                                {message.firstname }
                            </small>
                        )}
                        {errors && errors.firstname && (
                          <small className="validation-error">
                              {errors.firstname}
                          </small>
                        )}
                    </div>
                    <div className="form-group">
                        <label>Last Name</label>
                        <input className={((message  && message.lastname) || (errors && errors.lastname)) && 'unvalidated'} type="text" placeholder="Enter your last name" onChange={({target}) => setLastname(target.value)} />
                        {message  && message.lastname && (
                            <small className="validation-error">
                                {message.lastname }
                            </small>
                        )}
                          {errors && errors.lastname && (
                          <small className="validation-error">
                              {errors.lastname}
                          </small>
                        )}
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input className={((message  && message.email) || (errors && errors.email) )&& 'unvalidated'} type="text" placeholder="Enter your email Address" onChange={({target}) => setEmail(target.value)}/>
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
  
                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input type="password" className={((message  && message.password) || (errors && errors.password)) && 'unvalidated'} onChange={({target}) => setConfirmPassword(target.value)} placeholder="Confirm Password"/>
                        {message && message.password_confirmation && (
                            <small className="validation-error">
                                {message.password_confirmation}
                            </small>
                        )}
                         {errors && errors.password && (
                          <small className="validation-error">
                              {errors.password}
                          </small>
                        )}
                    </div>
                  
  
                    <div className="submit-btn-wrapper">
                        <button className="submit-btn">Register</button>
                    </div>
                </form>
              <p className="text-center">Already have an account <a href="/login">Login</a></p>
              </>
            )}

        
        </div>
    </div>
  )
}

export default Register