import React from "react"
import styled from "styled-components"

const STACK = [
	"React.JS",
	"React Hooks",
	"Redux Toolkit",
	"Thunk middleware",
	"Bootstrap",
	"Styled-components",
	"React Router Dom",
	"React Hook Form",
	"API"
]

const DEVELOPER = [
	<a href="https://github.com/Drayfer">Oleh Mikhailychenko</a>,
	<a href="mailto:devlydexter@gmail.com">devlydexter@gmail.com</a>,
]

function About() {
	return (
		<Wrapper>
			<h1>Stack:</h1>
			<ListWrapper>
				{STACK.map(item => (
					<li>{item}</li>
				))}
			</ListWrapper>
			<h1>Front End Developer:</h1>
			<ListWrapper>
				{DEVELOPER.map(item => (
					<li>{item}</li>
				))}
			</ListWrapper>
		</Wrapper>
	)
}

export default About

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-top: 3rem;
`
const ListWrapper = styled.ul`
	width: 500px;
	border: 1px solid #98b3cf;
	border-radius: 10px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 2rem;
`
