import './App.scss';
import Home from './pages/Home/Home';
import Sign from './pages/Sign/Sign';
import Nav from './components/Nav/Nav';
import Footer from './components/Footer/Footer';
import { Routes, Route} from 'react-router-dom';
import Protected from './pages/Protected/Protected';
import  Dashboard from './pages/Protected/Dashboard/Dashboard'


function App() {

  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/signing' element={ <Sign/>}/>
        <Route path='/user' element={ <Protected/>}>
            <Route path='/user/dashboard' element={ <Dashboard/>}/>
        </Route>
      </Routes>
    <Footer/>
    </div>
  );
}

export default App;
