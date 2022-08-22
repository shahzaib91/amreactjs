import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './routes/Home';
import Article from './routes/Article';
import NotFound from './routes/NotFound';
import CreateArticle from './routes/CreateArticle';
import EditArticle from './routes/EditArticle';

function App() {
  return (
    <>
      <Header />
      <div className='container mb-3' style={{ marginTop: "80px" }}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/article/:id' element={<Article />} />
          <Route path='/createPost' element={<CreateArticle />} />
          <Route path='/editPost/:id' element={<EditArticle />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
