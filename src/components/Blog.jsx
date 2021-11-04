import React from "react"
import Posts from "./Posts"
import Post from "./Post"
import NotFound from "./NotFound"
import { Routes, Route } from "react-router-dom"
import styled from "styled-components"
import { Container } from "react-bootstrap"
import About from "./About"

function Blog() {
	return (
		<Container fluid>
			<Wrapper>
				<Routes>
					<Route path="/react-blog" element={<Posts />} />
					<Route path="/react-blog/posts/:postId" element={<Post />} />
					<Route path="/react-blog/about" element={<About />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Wrapper>
		</Container>
	)
}

const Wrapper = styled.div`
	width: 80vw;
	margin: 0 auto;
	min-height: calc(100vh - 120px);
`

export default Blog
