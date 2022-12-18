import { useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from "../areas/Header"
import MainPage from "../pages/MainPage"
import RoomPage from "../pages/RoomPage"
import RegisterDiaryPage from "../pages/RegisterDiaryPage"
import JoinPage from "../pages/JoinPage"
import LoginPage from "../pages/LoginPage"
import RegisterSchedulePage from "../pages/RegisterSchedulePage"
import ModifySchedulePage from "../pages/ModifySchedulePage"

const Router = () => {
	const key = window.localStorage.getItem('user')
	const [ logined, setLogined ] =  useState(key !== null)
	
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Header logined={logined} isLogined={() => setLogined(false)}/>}>
					<Route path="/" element={<MainPage logined={logined}/>}/>
					<Route path="join" element={<JoinPage/>} />
					<Route path="login" element={<LoginPage/>} />
					<Route path="scheduleRegister" element={<RegisterSchedulePage/>} />
					<Route path="scheduleModify" element={<ModifySchedulePage/>}/>
					<Route path=":room" element={<RoomPage logined={logined}/>} />
					<Route path="diaryRegister">
					<Route path=":roomName" element={<RegisterDiaryPage/>} />
					</Route>
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default Router
