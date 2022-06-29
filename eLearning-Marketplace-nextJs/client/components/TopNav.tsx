import { Menu } from "antd"
import Link from "next/link"
import { useState, useEffect, useContext } from "react"
import {
	AppstoreAddOutlined,
	AppstoreOutlined,
	CoffeeOutlined,
	LoginOutlined,
	LogoutOutlined,
	UserAddOutlined,
} from "@ant-design/icons"
import { Context } from "../context"
import axios from "axios"
import { toast } from "react-toastify"
import { useRouter } from "next/router"

const { Item, SubMenu, ItemGroup } = Menu

export default () => {
	const router = useRouter()

	const [curr, setCurr] = useState("")
	const { state, dispatch } = useContext(Context)

	const { user } = state || {}

	useEffect(() => {
		process.browser && setCurr(window.location.pathname)
	}, [process.browser && window.location.pathname])

	const logout = async () => {
		dispatch({ type: "LOGOUT" })
		window.localStorage.removeItem("user")
		const { data } = await axios.get(`/api/logout`)
		toast(data.message)
		router.push("/login")
	}

	const navObj = [
		{
			name: "Login",
			link: "/login",
			icon: <LoginOutlined />,
		},
		{
			name: "Register",
			link: "/register",
			icon: <UserAddOutlined />,
		},
	]

	// console.log(state)

	return (
		<Menu mode="horizontal" selectedKeys={[curr]}>
			<Item key="/" onClick={(e) => setCurr(e.key)} icon={<AppstoreOutlined />}>
				<Link href="/">
					<a>App</a>
				</Link>
			</Item>
			{user === null &&
				navObj.map((e) => (
					<Item key={e.link} onClick={(e) => setCurr(e.key)} icon={e.icon}>
						<Link href={e.link!}>
							<a>{e.name}</a>
						</Link>
					</Item>
				))}
			{user !== null && (
				<SubMenu
					icon={<CoffeeOutlined />}
					title={user && user.name}
					style={{ marginLeft: "auto" }}
				>
					<ItemGroup>
						<Item key="/user">
							<Link href="/user">
								<a>Dashboard</a>
							</Link>
						</Item>
						<Item onClick={logout} key="/logout" style={{ marginLeft: "auto" }}>
							Logout
						</Item>
					</ItemGroup>
				</SubMenu>
			)}
		</Menu>
	)
}
