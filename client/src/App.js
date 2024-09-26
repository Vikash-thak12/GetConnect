import './App.css';
import HomePage from './scenes/HomePage/index.jsx';
import Navbar from './scenes/Navbar/index.jsx';
import ProfilePage from './scenes/ProfilePage/index.jsx';
import LoginPage from './scenes/LoginPage/index.jsx';

function App() {
  return (
    <div className="app">
      <Navbar />
      <LoginPage />
      <HomePage />
      <ProfilePage />
    </div>
  );
}

export default App;
