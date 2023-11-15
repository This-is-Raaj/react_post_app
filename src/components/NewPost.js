import React from 'react'

function NewPost({ handleSubmit, postTitle, setPostTitle, postBody, setPostBody }) {
    return (
        <main className='NewPost'>
            <h2>New Post</h2>
            <form className='newPostForm' onSubmit={handleSubmit}>
                <label>Title:</label>
                <input
                    type='text'
                    id='postTitle'
                    value={postTitle}
                    required
                    onChange={(e) => setPostTitle(e.target.value)}
                />
                <label>Post:</label>
                <textarea
                    type='text'
                    id='postBody'
                    value={postBody}
                    required
                    onChange={(e) => setPostBody(e.target.value)}
                />
                <button type='submit'>Submit</button>
            </form>
        </main>
    )
}

export default NewPost
