import React from "react"
import styled from "styled-components"
import { useSelector } from "react-redux"
import { Spinner } from "react-bootstrap"

function LoadingOrError() {
	const { status, error } = useSelector(state => state.state)
	return (
		<>
			{status === "loading" && (
				<Message>
					<Spinner animation="border" variant="primary" />
				</Message>
			)}
			{error && <Message>An error occured: {error}</Message>}
		</>
	)
}

export default LoadingOrError

const Message = styled.h1`
	text-align: center;
	margin-top: 3rem;
`
