import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = (props) => {
    if (!localStorage.getItem('userToken')) {
        return <Navigate to={'/login'}/>
    }
    else
    {
        return props.children
    }
    return <>

    
    
    </>
}

export default ProtectedRoute;
