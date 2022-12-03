import { useQueryClient } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from "../components/areas/Header"
import FormLayout from "../components/layout/FormLayout"
import JoinForm from "../form/JoinForm"
import MainPage from "../pages/MainPage"
import RoomPage from "../pages/RoomPage"
import ScheduleRegisterFom from "../form/ScheduleRegisterFom"
import ScheduleModifyForm from "../form/ScheduleModifyForm"

const Router = () => {
	const key = window.localStorage.getItem('user')
	const [ logined, setLogined ] =  useState(key !== null)
	
	

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Header logined={logined} isLogined={() => setLogined(false)}/>}>
					<Route path="/" element={<MainPage logined={logined}/>}/>
					<Route path="join" element={<FormLayout title='회원가입' render={<JoinForm />} />} />
					<Route path="scheduleResister" element={<FormLayout title='여행 일정 등록' render={<ScheduleRegisterFom/>} />} />
					<Route path="scheduleModify" element={<FormLayout title='여행 일정 수정' render={<ScheduleModifyForm/>}/>}/>
					<Route path=":room" element={<RoomPage logined={logined}/>} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default Router
