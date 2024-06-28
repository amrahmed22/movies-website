// import React from 'react';
// import { Link , NavLink } from 'react-router-dom';

// const Navbar = ({ userData, logOut }) => {
//     return <>
//         <nav className="navbar navbar-expand-lg bg-dark">
//             <div className="container">

//                 {userData ? <Link className="navbar-brand" to='home'><img src="https://desney-clone-tau.vercel.app/images/logo.svg" className='logo' alt="" /></Link> : <Link className="navbar-brand" to="/">
//                         <img src="https://desney-clone-tau.vercel.app/images/logo.svg" className='logo' alt="" />
//                         </Link>}
//                 <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//                     <i className='fa fa-bars-staggered fw-bold text-white fs-1'></i>
//                 </button>
//                 <div className="collapse navbar-collapse text-center mt-2" id="navbarSupportedContent">
//                     {userData ? <ul className="navbar-nav me-auto">
//                     <li className="nav-item mx-3">
//                             <Link className="nav-link" to="home">
//                              <i className='fa fa-home'></i>   Home</Link>
//                         </li>
//                         <li className="nav-item mx-3">
//                             <Link className="nav-link" to="movies">
//                             <i className='fa fa-film'></i> Movies</Link>
//                         </li>
//                         <li className="nav-item mx-3">
//                             <Link className="nav-link" to="tv">
//                             <i className='fa fa-tv'></i> TV</Link>
//                         </li>
//                         <li className="nav-item mx-3">
//                             <Link className="nav-link" to="people">
//                             <i className='fa fa-person'></i> People</Link>
//                         </li>

//                     </ul> : ''}
//                     <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">
//                         <ul className="navbar-nav m-auto x">
//                             <li className="nav-item">
//                                 <Link to="https://www.facebook.com/"><i className='fab fa-facebook nav-link' ></i></Link>
//                             </li>
//                             <li className="nav-item">
//                                 <Link to="https://www.twitter.com/"><i className='fab fa-twitter nav-link' ></i></Link>
//                             </li>
//                             <li className="nav-item">
//                                 <Link to="https://www.spotify.com/"><i className='fab fa-spotify nav-link' ></i></Link>
//                             </li>
//                             <li className="nav-item">
//                                 <Link to="https://www.instagram.com/"><i className='fab fa-instagram nav-link' ></i></Link>
//                             </li>
//                         </ul>
//                         {userData ? <>
//                             <li className="nav-item container">
//                                 <Link className="nav-link" to="profile">Profile</Link>
//                             </li>
//                             <li className="nav-item container">
//                                 <Link className="nav-link" to="login" onClick={logOut}>logOut</Link>
//                             </li>
//                         </> : <>
//                             <li className="nav-item container">
//                                 <Link className="nav-link" to="login">Login</Link>
//                             </li>
//                             <li className="nav-item container">
//                                 <Link className="nav-link" to="/">Register</Link>
//                             </li>
//                         </>}


//                     </ul>
//                 </div>
//             </div>
//         </nav>


//     </>
// }

// export default Navbar;





import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ userData, logOut }) => {
    let location = useLocation()
    function open() {
        document.querySelector('.menu').style.right = '0'

    }

    function close() {
        document.querySelector('.menu').style.right = '-100%'
    }


    return <>



        <nav className='overflow-hidden fixed-top'>
            <ul className='nav-bar container'>
                {userData ? <Link className="navbar-brand" to='/'><img src="https://desney-clone-tau.vercel.app/images/logo.svg" className='logo' alt="" /></Link> : <Link className="navbar-brand" to="/">
                         <img src="https://desney-clone-tau.vercel.app/images/logo.svg" className='logo' alt="" />
                         </Link>}
                    <span className="menu me-0">
                   {userData?<> <li onClick={close}><Link className={location.pathname =='/'?'nav-item py-2 active-link':'nav-item py-2'} to={'/'}>Home</Link></li>
                    <li onClick={close}><Link  className={location.pathname.includes('/movies')||location.pathname.includes('/movie')?'nav-item py-2 active-link':'nav-item py-2'} to={'/movies'}>movies</Link></li>
                    <li onClick={close}><Link className={location.pathname.includes('/tv')?'nav-item py-2 active-link':'nav-item py-2'} to={'/tv'}>TV</Link></li>
                    <li onClick={close}><Link className={location.pathname.includes('/people')||location.pathname.includes('/person')?'nav-item py-2 active-link':'nav-item py-2'} to={'/people'}>people</Link></li></>:""}
                    {userData ? <>
                             <li onClick={close} className="nav-item">
                                 <Link className=" btn btn-info" to="profile">Profile</Link>
                             </li>
                             <li onClick={close} className="nav-item">
                                 <Link className=" btn btn-info " to="login" onClick={logOut}>logOut</Link>
                             </li>
                         </> : <>
                             <li onClick={close} className="nav-item">
                                 <Link className=" btn btn-info" to="login">Login</Link>
                             </li>
                             <li onClick={close} className="nav-item">
                                 <Link className="  btn btn-info" to="register">Register</Link>
                             </li>
                         </>}


                    <span onClick={close} className="close-menu"><i className="fas fa-times fs-1"></i></span>
                </span>
                <span onClick={open} className="open-menu"><i className="fa-solid fa-bars-staggered fs-1"></i></span>
            </ul>
        </nav>
    </>

}

export default Navbar;

