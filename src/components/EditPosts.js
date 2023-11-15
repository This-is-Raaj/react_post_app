import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

function EditPosts({ posts, editTitle, editBody, setEditBody, setEditTitle, handleEdit }) {
    const { id } = useParams()
    const post = posts.find(post => (post.id).toString() === id)

    useEffect(() => {
        if (post) {
            setEditBody(post.body)
            setEditTitle(post.title)
        }
    }, [post, setEditTitle, setEditBody])

    return (
        <main className='NewPost'>
            <h2>New Post</h2>
            <form className='newPostForm' onSubmit={(e) => e.preventDefault()}>
                <label>Title:</label>
                <input
                    type='text'
                    id='postTitle'
                    value={editTitle}
                    required
                    onChange={(e) => setEditTitle(e.target.value)}
                />
                <label>Post:</label>
                <textarea
                    type='text'
                    id='postBody'
                    value={editBody}
                    required
                    onChange={(e) => setEditBody(e.target.value)}
                />
                <button type='submit' onClick={() => handleEdit(post.id)}>Submit</button>
            </form>
        </main>
    )
}

export default EditPosts
