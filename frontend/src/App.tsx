import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signup } from './pages/Signup.tsx'
import { Signin } from './pages/Signin.tsx'
import { FullBlog } from './pages/Blog.tsx' 
import { Blogs } from './pages/Blogs.tsx'
import { Publish } from './pages/Publish.tsx'
import "./index.css"
import "./App.css"
import { EditBlog } from './pages/EditBlog.tsx'
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blog/:id" element={<FullBlog />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/publish" element={<Publish />} />
          <Route path="/editblog/:id" element={<EditBlog />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App