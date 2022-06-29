import { SyncOutlined } from "@ant-design/icons"
import axios from "axios"
import Link from "next/link"
import { useState, useContext, useEffect } from "react"
import { toast } from "react-toastify"
import { Context } from "../context"
import { useRouter } from "next/router"

export default () => {
	const [email, setEmail] = useState("email@email.com")
	const [password, setPassword] = useState("password")
	const [loading, setLoading] = useState(false)

	// state
	const {state, dispatch } = useContext(Context);
	// console.log("STATE", state)
	const router = useRouter();
	const {user} = state || {}
	// if already logged in
	useEffect(() => {
	  if (user !== null)
		router.push("/")
	}, [user])
	

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		// console.table({ name, email, password });
		try {
			setLoading(true)
			const { data } = await axios.post(`/api/login`, {
				email,
				password,
			})
			//
			dispatch({
				type: "LOGIN",
				payload: data
			})
			// save in local storage
			window.localStorage.setItem("user", JSON.stringify(data))
			// redirect
			router.push("/");
			// console.log("LOGIN RESPONSE", data)
			// setLoading(false);
		} catch (err: any) {
			toast(err.response.data)
			setLoading(false)
		}
	}

	return (
		<>
			<h1 className="jumbotron text-center bg-primary square">Login</h1>

			<div className="container col-md-4 offset-md-4 pb-5">
				<form onSubmit={handleSubmit}>
					<input
						type="email"
						className="form-control mb-4 p-4"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Enter email"
						required
					/>

					<input
						type="password"
						className="form-control mb-4 p-4"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Enter password"
						required
					/>

					<button
						type="submit"
						className="btn btn-block btn-primary"
						disabled={!email || !password || loading}
					>
						{loading ? <SyncOutlined spin /> : "Submit"}
					</button>
				</form>

				<p className="text-center p-3">
					Not yet registered?{" "}
					<Link href="/register">
						<a>Register</a>
					</Link>
				</p>
			</div>
		</>
	)
}
