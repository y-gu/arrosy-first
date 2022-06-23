import './App.scss';
import HomeFirst from './pages/HomeFirst/HomeFirst';
import Sign from './pages/Sign/Sign';
import Nav from './components/Nav/Nav';
import Footer from './components/Footer/Footer';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path='/' element={<HomeFirst />} />
        <Route path='/signing' element={<Sign/>}/>
      </Routes>
    <Footer/>
    </div>
  );
}

export default App;
