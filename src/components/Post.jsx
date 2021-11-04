import React, { useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { fetchPost, deleteTodo } from "../store/stateSlice"
import { useSelector, useDispatch } from "react-redux"

import EditPost from "./EditPost"
import styled from "styled-components"
import { XSquare } from "react-bootstrap-icons"
import Comments from "./Comments"

const Post = () => {
	const dispatch = useDispatch()
	let navigate = useNavigate()
	let { postId } = useParams()
	const { post, error, status } = useSelector(state => state.state)

	useEffect(() => {
		dispatch(fetchPost(postId))
	}, [])

	const deletePost = id => {
		dispatch(deleteTodo(post.id))
		alert("Post deleted, you will be taken to the main page")
		navigate("/", { replace: true })
	}

	return (
		<div>
			<BackBtn>
				<Link to={`/`}>&#8592;Назад</Link>
			</BackBtn>

			{status === "loading" ? (
				<h2>Loading...</h2>
			) : error ? (
				<h2>An error occured: {error}</h2>
			) : (
				<div>
					<h1>{post.title}</h1>
					<Content>
						<Photo />
						<Text>
							<GroupBtns>
								<EditPost post={post} />
								<DeleteBtn onClick={() => deletePost(post.id)}>
									<XSquare />
								</DeleteBtn>
							</GroupBtns>

							<div>{post.body}</div>
						</Text>
					</Content>
					<Comments />
				</div>
			)}
		</div>
	)
}

export default Post

const Photo = styled.div`
	background-image: url("https://image.freepik.com/free-vector/product-hunt-concept-illustration_114360-594.jpg");
	background-repeat: no-repeat;
	background-size: 100% auto;
	height: 300px;
	width: 30%;
	box-sizing: border-box;
	margin-right: 20px;
`
const Content = styled.div`
	display: flex;
	justify-content: space-between;
	margin-bottom: 5rem;
`
const GroupBtns = styled.div`
	display: flex;
	justify-content: flex-end;
`
const DeleteBtn = styled.div`
	font-size: 1.5rem;
	color: red;
	cursor: pointer;
	margin-left: 10px;
	margin-bottom: 20px;
	&:hover {
		color: #f77e7e;
	}
`

const BackBtn = styled.p`
	margin-top: 3rem;
	a {
		text-decoration: none;
	}
`

const Text = styled.div`
	width: 69%;
`
