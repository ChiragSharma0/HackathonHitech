import logo from './logo.svg';
import './App.css';
import './Style/Spline.css'
import './Style/common.css'
import './Style/Page.css'

import SplineComp from './components/Spline/Spline'
import Page from './components/Pages/Page';
import { JumpscareProvider } from './context/Jumpcontext';
import { SplineProvider } from './context/splinecontext';

function App() {
  return (
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
  );
}

export default App;
