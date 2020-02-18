import axios from 'axios'
const baseUrl = '/api/blogs'

let config = null

const setToken = newToken => {
    config = { headers: { Authorization: `bearer ${newToken}` } }
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject, config)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject, config)
    return request.then(response => response.data)
}

const destroy = id => {
    const request = axios.delete(`${baseUrl}/${id}`, config)
    return request.then(response => response.data)
}

export default { getAll, create, update, destroy, setToken }