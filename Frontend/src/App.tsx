import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Blog } from './pages/Blog'
import { Home } from './pages/Home'
import { Toaster } from 'react-hot-toast'
import { NewStory } from './pages/NewStory'
import { BlogDetails } from './pages/BlogDetails'

function App() {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/new-story" element={<NewStory />} />
          <Route path="/blog-details" element={<BlogDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
