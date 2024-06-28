import React from 'react';
import { useState } from 'react';
import joi from 'joi'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet';



const Login = ({saveUserData}) => {

    let navigate = useNavigate()
    const [islLoading, setIsLoading] = useState(false);
    const [validationError, setValidationError] = useState([]);
    const [error, setError] = useState('');
    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    function getData(e) {
        let myUser = { ...user }
        myUser[e.target.name] = e.target.value

        setUser(myUser)

        console.log(user);

    }

    async function sendDataToApi() {
        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
            }
        };
        let { data } = await axios.post('https://movies-api.routemisr.com/signIn', user)

        if (data.message == 'success') {
            navigate('/')
            setIsLoading(false)
            localStorage.setItem("userToken" , data.token)
            saveUserData()
        }
        else {
            console.log(data.message);
            setIsLoading(false)
            setError(data.message)

        }

    }

    function validation() {
        let schema = joi.object({
            email: joi.string().email({ tlds: { allow: ['com', 'net'] } }).required(),
            password: joi.string().pattern(/^[a-zA-Z0-9!@#$%^&*]{6,16}$/).required()
        })

        return schema.validate(user, { abortEarly: false })

    }

    function submit(e) {
        setIsLoading(true)
        e.preventDefault()
        let x = validation()
        if (x.error) {
            setIsLoading(false)
            setValidationError(x.error.details)
        }
        else{
            sendDataToApi()

        }
    }



    return <>
         <Helmet>
                <title>Login</title>
                <meta name="description" content="Helmet application" />
                
        </Helmet>
      <div className='container pt-5'>
      <form className='my-5 w-100' onSubmit={submit}>
            {error.length > 0 ? <div className='alert alert-danger'>{error}</div> : ''}

            <label htmlFor="email" className=''>Email : </label>
            <input onChange={getData} type="email" className='form-control my-2' id='email' name='email' />
           {validationError.filter((error)=>error.context.label == 'email').map((error ,index)=><div key={index} className="alert alert-danger mt-2">In-valid Email</div>)}


            <label htmlFor="password">Password : </label>
            <input onChange={getData} type="password" className='form-control my-2' id='password' name='password' />
           {validationError.filter((error)=>error.context.label == 'password').map((error ,index)=><div key={index} className="alert alert-danger mt-2">In-valid Password</div>)}



            <button type='submit' className='btn btn-outline-info mt-3 px-5'> 
            {islLoading ? <i className='fa fa-spinner fa-spin'></i> : "Login"}
            </button>

        </form>
      </div>


    </>
}

export default Login;
