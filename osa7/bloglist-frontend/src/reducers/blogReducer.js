import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
    switch(action.type) {
    case 'NEW_BLOG':
        return  [...state, action.data]
    case 'INIT_BLOGS':
        return  action.data
    case 'LIKE_BLOG':
        let id = action.data
        const blogToLike = state.find(b => b.id === id)
        const liked = {
            ...blogToLike,
            likes: blogToLike.likes + 1
        }
        return  state.map(blog =>
            blog.id !== id ? blog : liked)
    case 'COMMENT_BLOG':
        const commented = action.data
        return state.map(blog =>
            blog.id !== commented.id ? blog : commented)
    case 'DELETE_BLOG':
        const delid = action.data
        return  state.filter(b => b.id !== delid)
    default:
        return state
    }
}

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT_BLOGS',
            data: blogs
        })
    }
}

export const create = (blog) => {
    return async dispatch => {
        const newBlog = await blogService.create(blog)
        dispatch({
            type: 'NEW_BLOG',
            data: newBlog
        })
    }
}

export const like = (blog) => {
    return async dispatch => {
        const toLike = {
            ...blog,
            likes: blog.likes + 1
        }
        const liked = await blogService.update(blog.id, toLike)
        dispatch({
            type: 'LIKE_BLOG',
            data: liked.id
        })
    }
}

export const makeComment = (id, comment) => {
    return async dispatch => {
        const commented = await blogService.comment(id, comment)
        dispatch({
            type: 'COMMENT_BLOG',
            data: commented
        })
    }
}

export const destroy = (id) => {
    return async dispatch => {
        await blogService.destroy(id)
        dispatch({
            type: 'DELETE_BLOG',
            data: id
        })
    }
}

export default blogReducer