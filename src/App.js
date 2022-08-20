import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './routes/Home';


function App() 
{
  return (
    <>
      <Header />
      <div className='container my-3'>
        <Routes>
          <Route path='/' element={<Home />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
