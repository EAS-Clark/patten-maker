import './App.css';

import Blocks from './components/Blocks'
import Workflow from './components/Workflow'
import InfoBox from './components/InfoBox'

function App() {

  return (<div className='content-container'>
    <Workflow />
    <InfoBox />
    <Blocks />
  </div>);
}

export default App;
