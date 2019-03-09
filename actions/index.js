import * as types from '../contants/ActionTypes'

export const addTodo = text => ({
	type: types.ADD_TODO,
	text
})