import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { useForm } from "react-hook-form"
import { createComment } from "../store/stateSlice"
import styled from "styled-components"
import { Button } from "react-bootstrap"

function Comments() {
	const dispatch = useDispatch()
	const { post } = useSelector(state => state.state)
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm()

	const onSubmit = data => {
		if (data) {
			dispatch(createComment({ data, id: post.id }))
		}
		reset({})
	}

	return (
		<div>
			<h2>Comments:</h2>
			<ul className="p-0">
				{post.comments?.map(comment => (
					<Comment>
						<div>{comment.body}</div>
					</Comment>
				))}
			</ul>
			<form onSubmit={handleSubmit(onSubmit)}>
				<TextField
					placeholder="Enter your comment"
					{...register("body", {
						required: true,
						minLength: 2,
					})}
				/>
				{errors?.body?.type === "required" && <ErrorString>Enter your comment</ErrorString>}
				{errors.body && errors.body.type === "minLength" && (
					<ErrorString>Your comment must be more than 2 characters</ErrorString>
				)}

				<br />

				<Button variant="outline-success" className="pl-5" type="submit">
					Send
				</Button>
			</form>
		</div>
	)
}

export default Comments

const Comment = styled.li`
	list-style-type: none;
	padding: 10px 10px;
	margin: 1rem 0;
	border: 1px solid #e6f4f8;
	border-radius: 10px;
`
const TextField = styled.textarea`
	width: 500px;
	height: 150px;
	padding: 1rem;
	border-radius: 10px;
`
const ErrorString = styled.p`
	font-size: 12px;
	color: red;
`