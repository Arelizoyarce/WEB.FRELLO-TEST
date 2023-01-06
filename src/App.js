import './App.css';
import { Route, Routes, BrowserRouter as Router,} from 'react-router-dom';
import LogIn from './components/LogIn';

function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route path="/status/:dni/:password" element={<LogIn></LogIn>}></Route>
      </Routes>
    </div>
    </Router>
  );
}

export default App;
