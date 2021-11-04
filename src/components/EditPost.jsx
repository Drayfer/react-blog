import React, { useState } from "react"
import styled from "styled-components"
import { useDispatch } from "react-redux"
import { editPost } from "../store/stateSlice"
import { useForm } from "react-hook-form"
import { PencilSquare } from "react-bootstrap-icons"
import { Button } from "react-bootstrap"

function EditPost({ post }) {
	const dispatch = useDispatch()
	const [showModal, setShowModal] = useState(false)

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm()

	const onSubmit = data => {
		if (data) {
			dispatch(editPost({ data, id: post.id }))
			setShowModal(false)
		}
		reset({})
	}
	const closeModal = () => {
		reset()
		setShowModal(false)
	}

	return (
		<div>
			<EditBtn onClick={() => setShowModal(!showModal)}>
				<PencilSquare />
			</EditBtn>
			{showModal && (
				<Modal>
					<ModalBody>
						<Form onSubmit={handleSubmit(onSubmit)}>
							<Title
								defaultValue={post.title}
								{...register("title", {
									required: true,
									minLength: 2,
								})}
							/>
							{errors?.title?.type === "required" && (
								<ErrorString>Enter the title of the article</ErrorString>
							)}
							{errors.title && errors.title.type === "minLength" && (
								<ErrorString>Title must be more than 2 characters</ErrorString>
							)}

							<TextArea
								defaultValue={post.body}
								{...register("body", {
									required: true,
									minLength: 10,
								})}
							/>
							{errors?.body?.type === "required" && (
								<ErrorString>Enter article description</ErrorString>
							)}
							{errors.body && errors.body.type === "minLength" && (
								<ErrorString>
									Description must be more than 10 characters
								</ErrorString>
							)}

							<hr />
							<div className="d-flex justify-content-end">
								<Button variant="primary" type="submit">
									Submit
								</Button>
								&nbsp;
								<Button variant="dark" onClick={() => closeModal()}>
									Close
								</Button>
							</div>
						</Form>
					</ModalBody>
				</Modal>
			)}
		</div>
	)
}

export default EditPost

const EditBtn = styled.div`
	font-size: 1.5rem;
	color: orange;
	cursor: pointer;
	&:hover {
		color: #d18902;
	}
`

const Modal = styled.div`
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	background: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	padding-top: 5rem;
`
const ModalBody = styled.div`
	padding: 2rem;
	width: 500px;
	border-radius: 5px;
	background: #fff;
	height: 400px;
`
const Title = styled.input`
	padding: 0.5rem;
	border-radius: 10px;
	margin-bottom: 1rem;
	border: 1px solid;
`

const TextArea = styled.textarea`
	height: 150px;
	padding: 0.5rem;
	border-radius: 10px;
	margin-bottom: 0.5rem;
	border: 1px solid;
	resize: none;
`
const Form = styled.form`
	display: flex;
	flex-direction: column;
	width: 100%;
`
const ErrorString = styled.p`
	font-size: 12px;
	color: red;
`
