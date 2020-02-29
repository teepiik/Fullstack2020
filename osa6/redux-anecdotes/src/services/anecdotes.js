import axios from 'axios'
const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const res = await axios.get(baseUrl)
    return res.data
}

const create = content => {
    const newObject = { content, votes: 0}
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

export default { getAll, create, update }