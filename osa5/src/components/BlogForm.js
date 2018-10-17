import React from 'react'
import Blog from './Blog'

const BlogForm = ({ onSubmit, handleChange, blogs, addLikeHandle, removeHandle }) => {
    return (
        <div className="blogForm">
            <h2>blogs</h2>

            <div>
                <h2>create new</h2>
                <div>
                    <form onSubmit={onSubmit}>
                        <div>
                            title
                            <input
                                type="text"
                                name="title"
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            author
                            <input
                                type="text"
                                name="author"
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            url
                            <input
                                type="text"
                                name="url"
                                onChange={handleChange}
                            />
                        </div>
                        <button>create</button>
                    </form>
                </div>
            </div>

            {blogs.sort(function(a, b){return b.likes-a.likes}).map(blog =>
                <Blog key={blog._id} blog={blog} addLikeHandle={addLikeHandle} removeHandle={removeHandle} />
            )}
</div>
    )
}

export default BlogForm