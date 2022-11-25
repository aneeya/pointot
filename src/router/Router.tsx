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
	const queryClient = useQueryClient()
	const [ active, setActive ] =  useState(false)
	
	useEffect(() => {
		const key = window.localStorage.getItem('key')
		if(key !== null) {
			setActive(true)
		}
		else {
			setActive(false)
		}
	}, [])

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Header active={active}/>}>
					<Route path="/" element={<MainPage active={active}/>}/>
					<Route path="join" element={<FormLayout title='회원가입' render={<JoinForm />} />} />
					<Route path="scheduleResister" element={<FormLayout title='여행 일정 등록' render={<ScheduleRegisterFom/>} />} />
					<Route path="scheduleModify" element={<FormLayout title='여행 일정 수정' render={<ScheduleModifyForm/>}/>}/>
					<Route path=":room" element={<RoomPage/>} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default Router
