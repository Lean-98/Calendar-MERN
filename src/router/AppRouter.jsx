import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from '../auth/';
import { CalendarPage } from '../calendar';
import { useAuthStore } from '../hooks';

export const AppRouter = () => {

  const { checkAuthToken, status } = useAuthStore();
  // const authStatus = 'not-authenticated';  // authenticated 'not-authenticated';

  useEffect(() => {
    checkAuthToken();
  }, [])
  

  if( status === 'checking') {
    return (
      <div className="text-center">
        <span className="loader"></span>
      </div>
    )
  }

  return (
    <Routes>
        {
          ( status === 'authenticated')
          ? 
            (
            <>
              <Route path="/" element={ <CalendarPage /> } />
              <Route path="/*" element={ <Navigate to="/" /> } />
            </>
            ) 
          : 
            (
            <>
              <Route path="/auth/*" element={ <LoginPage /> } />
              <Route path="/*" element={ <Navigate to="/auth/login" /> } />
            </>
            )
        }
         
    </Routes>
  )
}
