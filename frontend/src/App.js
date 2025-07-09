import {BrowserRouter, Routes, Route} from 'react-router-dom'
import LibraryPage from './pages/LibraryPage';
import Header from './components/Header';
import ReadingListPage from './pages/ReadingListPage';

function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/library" element={<LibraryPage/>}></Route>
      <Route path="/reading-list" element={<ReadingListPage/>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App;
