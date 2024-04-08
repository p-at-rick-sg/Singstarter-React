import {useEffect, useState, Fragment} from 'react';
import {Route, Routes, Navigate, NavLink} from 'react-router-dom';

///Component Imports
import LandingPage from './pages/LandingPage';
import MemberPage from './pages/MemberPage';
import NotFoundPage from './pages/NotFoundPage';
import ProjectPage from './pages/ProjectPage';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Success from './components/Success';
import Cancel from './components/Cancel';
import AddProject from './components/AddProject';
import ProfileManager from './components/ProfileManager';
import AdminPage from './pages/AdminPage';

//Context Imports (may need to set the theme here if we want light/dark mode setup)
import {useUser} from './hooks/useUser';
//MUI Stuff
//Create the theme and apply it around the whole app
import {createTheme, ThemeProvider} from '@mui/material';
import {LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';

const userTheme = createTheme({
  palette: {
    primary: {
      main: '#ef0dbf',
    },
    secondary: {
      main: '#0def3e',
    },
    footer: {
      main: '#fee0f4',
      text: '#ca009f',
    },
  },
});

function App() {
  const {user, checkSession} = useUser();

  useEffect(() => {
    checkSession();
  }, []);

  if (user.role === 'contributor') {
    return (
      <ThemeProvider theme={userTheme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Fragment>
            <NavBar />
            <Routes>
              <Route path="/" element={<Navigate to="home" />} />
              <Route path="home" element={<LandingPage />} />
              <Route path="*" element={<NotFoundPage />} />
              <Route path="/member" element={<MemberPage />} />
              <Route path="/member/add" element={<AddProject />} />
              <Route path="/project/:id" element={<ProjectPage />} />
              <Route path="/profile" element={<ProfileManager />} />
              <Route path="/success" element={<Success />} />
              <Route path="/cancel" element={<Cancel />} />
            </Routes>
            <Footer />
          </Fragment>
        </LocalizationProvider>
      </ThemeProvider>
    );
  } else if (user.role === 'user') {
    return (
      <ThemeProvider theme={userTheme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Fragment>
            <NavBar />
            <Routes>
              <Route path="/" element={<Navigate to="home" />} />
              <Route path="home" element={<LandingPage />} />
              <Route path="*" element={<NotFoundPage />} />
              <Route path="/project" element={<ProjectPage />} />
              <Route path="/profile" element={<ProfileManager />} />
              {/* move these routes to be under the a master member page?? */}
              <Route path="/success" element={<Success />} />
              <Route path="/cancel" element={<Cancel />} />
            </Routes>
            <Footer />
          </Fragment>
        </LocalizationProvider>
      </ThemeProvider>
    );
  } else if (user.role === 'admin') {
    return (
      <ThemeProvider theme={userTheme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Fragment>
            <NavBar />
            <Routes>
              <Route path="/" element={<Navigate to="home" />} />
              <Route path="home" element={<LandingPage />} />
              <Route path="*" element={<NotFoundPage />} />
              {/* move these routes to be under the a master member page?? */}
              <Route path="/success" element={<Success />} />
              <Route path="/cancel" element={<Cancel />} />
              <Route path="/admin/dashboard" element={<AdminPage />} />
            </Routes>
            <Footer />
          </Fragment>
        </LocalizationProvider>
      </ThemeProvider>
    );
  } else {
    return (
      <ThemeProvider theme={userTheme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Fragment>
            <NavBar />
            <Routes>
              <Route path="/" element={<Navigate to="home" />} />
              <Route path="home" element={<LandingPage />} />
              <Route path="signup" element={<Signup />} />
              <Route path="signin" element={<Signin />} />
              <Route path="/project" element={<ProjectPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <Footer />
          </Fragment>
        </LocalizationProvider>
      </ThemeProvider>
    );
  }
}

export default App;
