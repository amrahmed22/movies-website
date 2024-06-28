import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import joi from 'joi'
import { Helmet } from 'react-helmet';

const Register = () => {
    let navigate = useNavigate();
    const [validationError, setValidationError] = useState([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState({
        first_name: '',
        last_name: '',
        age: 0,
        email: '',
        password: ''
    });

    function getUserData(eventInfo) {
        let myUser = { ...user }
        myUser[eventInfo.target.name] = eventInfo.target.value;

        setUser(myUser)

        console.log(myUser);
    }

    function validation() {
        let schema = joi.object({
            first_name: joi.string().min(3).max(10).required(),
            last_name: joi.string().min(3).max(10).required(),
            age: joi.number().min(16).max(60).required(),
            email: joi.string().email({ tlds: { allow: ['com', 'net'] } }).required(),
            password: joi.string().pattern(/^[a-zA-Z0-9!@#$%^&*]{6,16}$/)
        })


        return schema.validate(user, { abortEarly: false })
    }

    async function sendDataToAPi() {
        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
            }
        };
        let { data } = await axios.post('https://movies-api.routemisr.com/signUp', user)


        if (data.message == 'success') {
            navigate('/login')

            setIsLoading(false)

        }
        else {
            setError(data.message)
            setIsLoading(false)

        }
    }



    function submitData(e) {
        setIsLoading(true)
        e.preventDefault();


        let validate = validation()

        if (validate.error) {

            setValidationError(validate.error.details)
            console.log(validate.error.details[0].context.label );
            setIsLoading(false)


        }
        else {
            sendDataToAPi()
        }


        // sendDataToAPi()

    }



    return <>
       <Helmet>
                <title>Register</title>
                <meta name="description" content="Helmet application" />
                
        </Helmet>
    <div className="container">
    {error.length > 0 ? <div className="alert alert-danger mt-2">{error}</div> : ''}
        {
        }
        <form onSubmit={submitData}>
            <label htmlFor="first_name" className='mt-2'>First Name : </label>
            <input onChange={getUserData} type="text" className='form-control my-2' id='first_name' name='first_name' />
           {validationError.filter((error)=>error.context.label == 'first_name').map((error ,index)=><div key={index} className="alert alert-danger mt-2">{error.message}</div>)}

            <label htmlFor="last_name">Last Name : </label>
            <input onChange={getUserData} type="text" className='form-control my-2' id='last_name' name='last_name' />
            {validationError.filter((error)=>error.context.label == 'last_name').map((error ,index)=><div key={index} className="alert alert-danger mt-2">{error.message}</div>)}
           
            <label htmlFor="age">age : </label>
            <input onChange={getUserData} type="number" className='form-control my-2' id='age' name='age' />
            {validationError.filter((error)=>error.context.label == 'age').map((error ,index)=><div key={index} className="alert alert-danger mt-2">{error.message}</div>)}
           
            <label htmlFor="email">email : </label>
            <input onChange={getUserData} type="email" className='form-control my-2' id='email' name='email' />
            {validationError.filter((error)=>error.context.label == 'email').map((error ,index)=><div key={index} className="alert alert-danger mt-2">{error.message}</div>)}
            
            <label htmlFor="password">password : </label>
            <input onChange={getUserData}
                type="password" className='form-control my-2' id='password' name='password' />
            {validationError.filter((error)=>error.context.label == 'password').map((error ,index)=><div key={index} className="alert alert-danger mt-2">Not valid Password</div>)}

            <button type='submit' className='btn btn-outline-info my-3 px-5'>
                {isLoading ? <i className='fa fa-spinner fa-spin'></i> : "Register"}
            </button>

        </form>

    </div>
    </>
}

export default Register;
