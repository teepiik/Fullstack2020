const anecdoteReducer = (state = [], action) => {
  	console.log('state now: ', state)
  	console.log('action', action)
  	switch(action.type) {
  	  	case 'NEW_ANECDOTE':
			state = [...state, action.data]
			return state.sort((a, b) => b.votes - a.votes)
		case 'INIT_ANECDOTES':
			return action.data
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

export const createAnecdote = (data) => {
    return {
      	type: 'NEW_ANECDOTE',
      	data
    }
}

export const handleVote = (id) => {
	return {
		type: 'VOTE',
		data: {id}
	}
}

export const initializeAnecdotes = (anecs) => {
	return {
		type: 'INIT_ANECDOTES',
		data: anecs
	}
}

export default anecdoteReducer