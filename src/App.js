import './App.scss';
import Home from './pages/Home/Home';
import Sign from './pages/Sign/Sign';
import Nav from './components/Nav/Nav';
import Footer from './components/Footer/Footer';
import { Routes, Route, Navigate} from 'react-router-dom';
import Protected from './pages/Protected/Protected';
import Dashboard from './pages/Protected/Dashboard/Dashboard';
import Garden from './pages/Protected/Garden/Garden';
import Profile from './pages/Protected/Profile/Profile';
import Plant from './pages/Protected/Plant/Plant';
import Page404 from './pages/Page404';


function App() {

  return (
    <div className="App">
      <Nav />
      <Routes>  
      {/* <Route path='/' element={auth.currentUser ? <Navigate to='/user/dashboard' replace/> : <Home />} />
         */}
         <Route path='/' element={<Home/>} />
        
        <Route path='/signing' element={<Sign />} />
        <Route path='/user' element={<Protected />}>
          <Route path='/user/dashboard' element={<Dashboard />} />
          <Route path='/user/garden' element={<Garden />} />
          <Route path='/user/garden/plant/:id' element={<Plant />} /> 
          <Route path='/user/profile' element={<Profile />} />
        </Route>
        <Route path="*" element={<Page404/>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
