// import "./App.css"
import React from "react"
import { BrowserRouter} from "react-router-dom"
import NavBar from "./components/NavBar"
import Footer from "./components/Footer"
import Blog from "./components/Blog"

function App() {
	return (
		<div>
			<BrowserRouter>
				<NavBar />
				<Blog />
				<Footer />
			</BrowserRouter>
		</div>
	)
}

export default App
