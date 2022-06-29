import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { SyncOutlined } from "@ant-design/icons"
import Link from "next/link"
import { useRouter } from "next/router"
import { Context } from "../context"

export default () => {
	const [name, setName] = useState("test-user")
	const [password, setPassword] = useState("password")
	const [email, setEmail] = useState("email@email.com")
	const [loading, setLoading] = useState(false)

	const {state, dispatch } = useContext(Context);
	const {user} = state || {}
	// if already logged in
	const router = useRouter();
	useEffect(() => {
	  if (user !== null)
		router.push("/")
	}, [user])

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		try {
			setLoading(true)
			// Preventing the page from reloading
			event.preventDefault()
			// console.table({name, email, password})

			const { data } = await axios.post(`/api/register`, {
				name,
				password,
				email,
			})
			toast("Registration successful. Please login.")
			// console.log("REGISTER RESPONE", data)
		} catch (err: any) {
			toast(err["response"]["data"])
		}
		setLoading(false)
	}

	return (
		<>
			<h1 className="jumbotron text-center bg-primary sqaure">Register</h1>
			<div className="container col-md-4 offset-md-4 pb-5">
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						className="form-controk mb-4 p-4"
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder="Name"
						required
					/>

					<input
						type="email"
						className="form-controk mb-4 p-4"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Email"
						required
					/>

					<input
						type="password"
						className="form-controk mb-4 p-4"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Password"
						required
					/>
					<br />
					<button
						type="submit"
						className="btn btn-block btn-primary"
						disabled={!name || !email || !password || loading}
					>
						{loading ? <SyncOutlined /> : "Submit"}
					</button>
				</form>

				<p className="text-center p-3">
					Already registered?
					<Link href={"/login"}><a> Login</a></Link>
				</p>
			</div>
		</>
	)
}
