import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { getSelected, getTravelId } from "../storedData/localStorage"
import { EditSchedule, Schedule } from "../types"


// 스케줄 등록하기

const postSchedule = async(data: Schedule) => {
  return await axios.post(`http://localhost:4000/travels`, data)
}

export const useAddSchedule = (data: Schedule) => {
  const query = useQueryClient()
  const nav = useNavigate()
  return useMutation(() => postSchedule(data), {
    onSuccess: () => {
      query.invalidateQueries(['@schedules'])
      alert('여행일정이 등록되었습니다!')
      nav('/')
    },
    onError: (e: any) => {
      alert(`${e.message} 다시시도해주세요`)
    }
  })
}

//스케줄 편집하기

const editTitle = async(data: string) => {
  const travelId = getTravelId()
  return await axios.patch(`http://localhost:4000/travels/${travelId}`, {title: data})
}

export const useEditTitle = (data: string, edits: EditSchedule, callback: () => void) => {
  const query = useQueryClient()
  return useMutation(() => editTitle(data), {
    onError: (e: any) => {
      alert(`${e.message} 다시시도해주세요`)
    },
    onSuccess: () => {
      query.invalidateQueries(['@reserve'])
      const editContet = { ...edits, title: data}
      window.localStorage.setItem('selectedSchedule', JSON.stringify(editContet))
      callback()
    }
  })
}


const editSchedule = async(data: EditSchedule) => {
  const travelId = getTravelId()
  return await axios.patch(`http://localhost:4000/travels/${travelId}`, data)
}

export const useEditSchedule = (data: EditSchedule) => {
  const  { city, startDate, endDate } = data
  const query = useQueryClient()
  const nav = useNavigate()

  return useMutation(() => editSchedule(data), {
    onSuccess: () => {
      query.invalidateQueries(['@reserve'])
      query.refetchQueries(['@reserve'])
      const editContet = { ...getSelected(), city, startDate, endDate}
      window.localStorage.setItem('selectedSchedule', JSON.stringify(editContet))
      nav('/')
    },
    onError: (e: any) => {
      alert(`${e.message} 다시시도해주세요`)
    }
  })
}

//스케줄 삭제하기

const deleteschedule = async() => {
  const travelId = getTravelId()
  return await axios.delete(`http://localhost:4000/travels/${travelId}`)
}

export const useDeleteSchedule = () => {
  const query = useQueryClient()
  return useMutation(() => deleteschedule(), {
    onError: (e: any) => {
      alert(`${e.message}다시 시도해주세요`)
    },
    onSuccess: () => {
      alert('일정이 삭제되었습니다!')
      query.invalidateQueries(['@schedules'])
      window.localStorage.removeItem('travelId')
      window.localStorage.removeItem('selectedSchedule')
      window.localStorage.removeItem('ended')
      window.location.reload()
    }
  })
}