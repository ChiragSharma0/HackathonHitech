import logo from './logo.svg';
import './App.css';
import './Style/Spline.css'
import './Style/common.css'
import './Style/Page.css'
import './Style/Zombie.css'
import SplineComp from './components/Spline/Spline'
import Page from './components/Pages/Page';
import { JumpscareProvider } from './context/Jumpcontext';
import { SplineProvider } from './context/splinecontext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Pages/Login';
import Chat from './components/Pages/Chat';
import { AuthProvider } from './context/Authcontext';

const App = () => {
  return (

    <AuthProvider>
    <JumpscareProvider>
      <SplineProvider>
        <div className='App'>
          <div className='SplineContainer' >
            <SplineComp />
          </div>
          <div className='PageContainer' >

            <Page />

          </div>
        </div>
      </SplineProvider>
    </JumpscareProvider>
</AuthProvider>
    
  );
};

export default App;
