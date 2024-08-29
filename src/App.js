
import { Routes,Route } from 'react-router-dom';
import AppLayout from './layout/AppLayout';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Homepage from './pages/Homepage/Homepage';
import MoviePage from './pages/Movies/MoviePage';
import MovieDetailPage from './pages/MovieDetail/MovieDetailPage';
import NotFoundPage from './pages/NotFoundpage/NotFoundPage';


// 1. 홈페이지  주소 "/"
//2. 영화 전체 보여주는 페이지 +서치  "/movies"
//3. 영화 디테일 페이지 /movies/:id



function App() {
  return (
    <div className="App">
    <Routes>

    {/* 라우터 설정  */}
      <Route path="/" element={<AppLayout />}>  

        <Route index element ={<Homepage />}/>  {/** index는 부모의 path를 동일하게 사용 */}

        <Route path='movies'>
          {/* nested route (sub route) */}
          <Route index element={<MoviePage/>}/>
          <Route path=':id' element={<MovieDetailPage/>}/>
          
        </Route>
        
{/* path 에 반복되는 movies를 하나로 묶어서 위에 처럼 nested route 로 만들 수 있다  */}
        {/* <Route path='/movies' element={<MoviePage/>}/>
        <Route path='/moview/:id' element={<MovieDetailPage/>}/> */}

          <Route path='*' element={<NotFoundPage/>}/>

      </Route>




    </Routes>
      
    </div>
  );
}

export default App;
