import './App.scss';
import { Routes, Route } from 'react-router-dom';
import Home from '../../Pages/Home/Home';
import Budget from '../../Pages/Budget/Budget';
import Statistic from '../../Pages/Statistic/Statistic';
import Help from '../../Pages/Help/Help';
import Profile from '../../Pages/Profile/Profile';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import EditProfile from '../../Pages/EditProfile/EditProfile';

function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/budget" element={<Budget />} />
        <Route path="/statistic" element={<Statistic />} />
        <Route path="/help" element={<Help />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/editprofile" element={<EditProfile />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
