import './App.css';
import './Style/Spline.css'
import './Style/common.css'
import './Style/Page.css'
import './Style/Zombie.css'
import './Style/Auth.css'

import SplineComp from './components/Spline/Spline'
import Page from './components/Pages/Page';
import { JumpscareProvider } from './context/Jumpcontext';
import { SplineProvider } from './context/splinecontext';
import { AuthProvider } from './context/Authcontext';

const App = () => {
  return (
    
    <JumpscareProvider>

      <SplineProvider>

    <AuthProvider>
        <div className='App'>
          <div className='SplineContainer' >
            <SplineComp />
          </div>
          <div className='PageContainer' >

            <Page />

          </div>
        </div>
</AuthProvider>
          </SplineProvider>
    </JumpscareProvider>

  );
};

export default App;
