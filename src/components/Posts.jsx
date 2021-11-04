import React, { useEffect } from "react"
import { fetchTodos } from "../store/stateSlice"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import styled from "styled-components"
import LoadingOrError from "./LoadingOrError"

function Posts() {
	const dispatch = useDispatch()

	const { value } = useSelector(state => state.state)

	useEffect(() => {
		dispatch(fetchTodos())
	}, [dispatch])

	return (
		<div>
			<h1 className="d-flex justify-content-center">All blog entries</h1>
			<LoadingOrError />
			<ul>
				{value
					.slice()
					.sort((a, b) => b.id - a.id)
					.map(post => (
						<PostWrapper>
							<PostConent>
								<Photo />

								<Text>
									<Title>
										<Link to={`/react-blog/posts/${post.id}`}>
											{post.title}
										</Link>
									</Title>

									<p>
										{post.body.length > 100
											? `${post.body.slice(0, 100)}...`
											: post.body}
									</p>
									<Divider />

									<Link to={`/react-blog/posts/${post.id}`}>
										<p>Read more...</p>
									</Link>
								</Text>
							</PostConent>
						</PostWrapper>
					))}
			</ul>
		</div>
	)
}

export default Posts

const PostWrapper = styled.li`
	list-style-type: none;
	padding: 10px 50px;
	margin: 1rem 0;
	border: 1px solid #e6e6e6;
	border-radius: 10px;
	min-height: 200px;
`
const Photo = styled.div`
	background-image: url("https://image.freepik.com/free-vector/product-hunt-concept-illustration_114360-594.jpg");
	background-repeat: no-repeat;
	background-size: 100% auto;
	height: 190px;
	width: 20%;
	box-sizing: border-box;
	margin-right: 20px;
`
const PostConent = styled.div`
	display: flex;
`
const Title = styled.h1`
	& a {
		text-decoration: none;
		color: #5a5a5a;
	}
`

const Text = styled.div`
	width: 79%;
`

const Divider = styled.div`
	height: 1px;
	background: #acacac;
	margin-bottom: 1rem;
`
