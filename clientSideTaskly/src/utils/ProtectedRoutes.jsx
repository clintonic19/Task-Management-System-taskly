// import 'react'
// import { Outlet, Navigate, useLocation } from 'react-router-dom'
// import Sidebar from '../components/Sidebar';
// import Navbar from '../components/Navbar';
// import { useSelector } from 'react-redux';

// const ProtectedRoutes = () => {
//     // const user = null;
//     const {user} = useSelector(state => state.auth);
//     const location = useLocation();
//   return user ? (
//     <>
//       {/* <div className='w-full h-screen flex flex-col md:flex-row'>
//     <div className='w-1/5 h-screen bg-white sticky top-0 hidden md:block'> 
//     <Sidebar/>      
// </div> */}


// {/* <MobileSidebar/> */}

// {/* <div className="flex-1 overflow-y-auto">
//  <Navbar/>         
//  </div> */}

// <div className='p-4 2xl:px-10'> 
// <Outlet/> : <Navigate to="/login" />
//  </div>
// {/* </div> */}
//     </>
//   ):(
//     <Navigate to="/login" />
//   )
// };

// export default ProtectedRoutes;
