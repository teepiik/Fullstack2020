import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  	//console.log('state now: ', state)
  	//console.log('action', action)
  	switch(action.type) {
  	  	case 'NEW_ANECDOTE':
			state = [...state, action.data]
			return state.sort((a, b) => b.votes - a.votes)
		case 'INIT_ANECDOTES':
			return action.data.sort((a, b) => b.votes - a.votes)
  	  	case 'VOTE':
			const id = action.data.id
			const oneToVote = state.find(a => a.id === id)
			const votedOne = {
				...oneToVote,
				votes: oneToVote.votes + 1
			}
			state = state.map(an => an.id !== id ? an : votedOne)
			return state.sort((a, b) => b.votes - a.votes)
  	  	default:
  	  	  	return state
  	}
}

export const createAnecdote = (content) => {
    return async dispatch => {
		const newAnecdote = await anecdoteService.create(content)
		dispatch({
			type: 'NEW_ANECDOTE',
			data: newAnecdote
		})
	}
}

export const handleVote = (anecToVote) => {
	return async dispatch => {
		const forVote = {
			...anecToVote,
			votes: anecToVote.votes + 1
		}
		const voted = await anecdoteService.update(anecToVote.id, forVote)
		const id = voted.id
		dispatch({
			type: 'VOTE',
			data: {id}
		})
	}
}

export const initializeAnecdotes = () => {
	return async dispatch => {
		const anecs = await anecdoteService.getAll()
		dispatch({
			type: 'INIT_ANECDOTES',
			data: anecs
		})
	}
}

export default anecdoteReducer