
import { Route, Routes } from 'react-router-dom'
import TopBar from './TopBar'
import ListProjects from './ListProjects'
import CreateForm from './components/create-project'
import EditForm from './components/edit-project'
import '../App.css'

export default function App() {
 
  return (
    <>
      <TopBar/>
      <Routes>
              <Route path="/" element={<ListProjects />} />
              <Route path="/add" element={<CreateForm />} />
              <Route path="/edit/:id" element={<EditForm />} />
            </Routes>
    </>
  )
}


