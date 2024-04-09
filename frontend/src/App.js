import './App.css';
import My_Work from './Pages/My-Work';
import Recent_Workplaces from './Pages/Recent_Workplaces';
import Request from './Pages/Request-Page';
import Main from './Pages/Main';
import Routers from './Routes/Routers';
import Response from './Pages/Response-Page';
import store from './store.js';
import { Provider } from 'react-redux'

function App() {
  return (
    <div>
      {/* <Recent_Workplaces />  */}
      {/* <My_Work /> */}
      {/* <Request />  */}
      <Provider store={store}>
        <Routers /> 
      </Provider>
      
      {/* <Response />  */}
    </div>
  );
}

export default App;
