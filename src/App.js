import React, { useEffect, useState } from "react";
import './App.css';
import Nav from './components/Nav';
import Header from './components/Header';
import Home from "./components/Home";
import NewPost from './components/NewPost';
import About from './components/About';
import Footer from './components/Footer';
import Missing from './components/Missing';
import { Route, Routes, useNavigate } from "react-router-dom";
import PostPage from './components/PostPage';
import { format } from "date-fns";
import api from './api/Posts';
import EditPosts from "./components/EditPosts";


function App() {
  const navigate = useNavigate()

  const [posts, setPosts] = useState([])

  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [postTitle, setPostTitle] = useState('')
  const [postBody, setPostBody] = useState('')
  const [editTitle, setEditTitle] = useState('')
  const [editBody, setEditBody] = useState('')


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/posts')
        setPosts(response.data)
      }
      catch (err) {
        if (err.response) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(`Error:${err.message}`);
        }
      }
    }
    fetchPosts()
  }, [])

  useEffect(() => {
    const filterResults = posts.filter((post) => ((post.body).toLowerCase()).includes(search.toLowerCase()) || ((post.title).toLowerCase()).includes(search.toLowerCase()))
    setSearchResults(filterResults.reverse())
  }, [posts, search])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp')
    const newPost = { id, title: postTitle, datetime, body: postBody }
    const response = await api.post('/posts', newPost)
    const addPosts = [...posts, response.data]
    setPosts(addPosts)
    setPostBody('')
    setPostTitle('')
    navigate('/')
  }

  const handleEdit = async (id) => {
    const datetime = format(new Date(), 'MMMM dd, yyyy pp')
    const updatedPost = { id, title: editTitle, datetime, body: editBody }
    const response = await api.put(`posts/${id}`, updatedPost)
    setPosts(posts.map((post) => (post.id === id ? { ...response.data } : post)))
    setEditBody('')
    setEditTitle('')
    navigate('/')
  }
  const handleDelete = async (id) => {
    await api.delete(`posts/${id}`)
    const filteredArray = posts.filter((post) => post.id !== id)
    setPosts(filteredArray)
    navigate('/')
  }

  return (
    <div className="App">
      <Header />
      <Nav search={search} setSearch={setSearch} />
      <Routes>

        <Route path='/' element={<Home posts={searchResults} />} />
        <Route path='/about' element={<About />} />


        <Route path='/post' >
          <Route index element={<NewPost postBody={postBody} setPostBody={setPostBody} postTitle={postTitle} setPostTitle={setPostTitle} handleSubmit={handleSubmit} />} />
          <Route path=':id' element={<PostPage posts={posts} handleDelete={handleDelete} />} />
        </Route>

        <Route path='edit/:id' element={<EditPosts posts={posts} handleEdit={handleEdit} editBody={editBody} editTitle={editTitle} setEditBody={setEditBody} setEditTitle={setEditTitle} />} />
        <Route path='*' element={<Missing />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
