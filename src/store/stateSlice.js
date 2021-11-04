import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { URL } from "../const"

export const fetchTodos = createAsyncThunk(
	"state/fetchTodos",
	async function (_, { rejectWithValue }) {
		try {
			const response = await fetch(`${URL}/posts`)

			if (!response.ok) {
				throw new Error("Server Error!")
			}

			const data = await response.json()

			return data
		} catch (error) {
			return rejectWithValue(error.message)
		}
	}
)

export const deleteTodo = createAsyncThunk(
	"state/deleteTodo",
	async function (id, { rejectWithValue, dispatch }) {
		try {
			const response = await fetch(`${URL}/posts/${id}`, {
				method: "DELETE",
			})

			if (!response.ok) {
				throw new Error("Can't delete task. Server error.")
			}

			dispatch(removeTodo({ id }))
		} catch (error) {
			return rejectWithValue(error.message)
		}
	}
)

export const createPost = createAsyncThunk(
	"state/createPost",
	async function (data, { rejectWithValue, dispatch }) {
		const raw = JSON.stringify({
			title: data.title,
			body: data.body,
		})

		try {
			let myHeaders = new Headers()
			myHeaders.append("Content-Type", "application/json")

			const response = await fetch(`${URL}/posts`, {
				method: "POST",
				headers: myHeaders,
				body: raw,
				redirect: "follow",
			})

			if (!response.ok) {
				throw new Error("Can't create post. Server error.")
			}
			const serverData = await response.json()
			dispatch(addPost(serverData))
		} catch (error) {
			return rejectWithValue(error.message)
		}
	}
)

export const fetchPost = createAsyncThunk(
	"state/fetchPost",
	async function (id, { rejectWithValue }) {
		try {
			const response = await fetch(`${URL}/posts/${id}?_embed=comments`)

			if (!response.ok) {
				throw new Error("Server Error!")
			}

			const data = await response.json()

			return data
		} catch (error) {
			return rejectWithValue(error.message)
		}
	}
)

export const createComment = createAsyncThunk(
	"state/createComment",
	async function ({ data, id }, { rejectWithValue, dispatch }) {
		const raw = JSON.stringify({
			postId: id,
			body: data.body,
		})

		try {
			let myHeaders = new Headers()
			myHeaders.append("Content-Type", "application/json")

			const response = await fetch(`${URL}/comments`, {
				method: "POST",
				headers: myHeaders,
				body: raw,
				redirect: "follow",
			})

			if (!response.ok) {
				throw new Error("Can't create comment. Server error.")
			}
			const serverData = await response.json()
			dispatch(addComment(serverData))
		} catch (error) {
			return rejectWithValue(error.message)
		}
	}
)

export const editPost = createAsyncThunk(
	"state/editPost",
	async function ({ data, id }, { rejectWithValue, dispatch }) {
		let raw = JSON.stringify({
			title: data.title,
			body: data.body,
		})

		try {
			let myHeaders = new Headers()
			myHeaders.append("Content-Type", "application/json")

			const response = await fetch(`${URL}/posts/${id}`, {
				method: "PUT",
				headers: myHeaders,
				body: raw,
				redirect: "follow",
			})

			if (!response.ok) {
				throw new Error("Can't edit post. Server error.")
			}
			const serverData = await response.json()

			dispatch(editSinglePost(serverData))
		} catch (error) {
			return rejectWithValue(error.message)
		}
	}
)

const setError = (state, action) => {
	state.status = "rejected"
	state.error = action.payload
}

export const stateSlice = createSlice({
	name: "state",
	initialState: {
		value: [],
		post: {},
		status: null,
		error: null,
	},
	reducers: {
		addPost: (state, action) => {
			state.value.push(action.payload)
		},
		removeTodo: (state, action) => {
			state.value = state.value.filter(todo => todo.id !== action.payload.id)
		},
		addComment: (state, action) => {
			state.post.comments.push(action.payload)
		},
		editSinglePost: (state, action) => {
			const comments = state.post.comments
			state.post = { ...action.payload, comments }
		},
	},

	extraReducers: {
		[fetchTodos.pending]: state => {
			state.status = "loading"
			state.error = null
		},
		[fetchTodos.fulfilled]: (state, action) => {
			state.status = "resolved"
			state.value = action.payload
		},
		[fetchTodos.rejected]: setError,
		[deleteTodo.rejected]: setError,

		[fetchPost.pending]: state => {
			state.status = "loading"
			state.error = null
		},
		[fetchPost.fulfilled]: (state, action) => {
			state.status = "resolved"
			state.post = action.payload
		},
		[fetchPost.rejected]: setError,
		[fetchPost.rejected]: setError,
	},
})

// Action creators are generated for each case reducer function
export const { addPost, removeTodo, addComment, editSinglePost } =
	stateSlice.actions

export default stateSlice.reducer
