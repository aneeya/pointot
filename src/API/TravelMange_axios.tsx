import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { getSelected, getTravelId, getUser } from "../storedData/localStorage"
import { Diary, Reserve, Room, Schedule } from "../types"


//등록한 여행일정 리스트 불러오기 
const getStoredDates = async() => {
  const { email } = getUser()
  const res = await axios.get(` http://localhost:4000/travels?email=${email}`)
  return res.data
}

export const useStoredDates = () => {
  const query = useQueryClient()
  return useQuery(['@schedules'], getStoredDates, {
    onError: (e: any) => {
			alert(`${e.message}저장된 날짜들을 로드하지 못했습니다 ㅠㅠ`)
		}
  })
}



//예약가능한 방 불러오기

export const getReservable = async() => {
  const { city } = getSelected()
  const res =  await axios.get(`http://localhost:4000/rooms?city=${city}`)
  return res.data
}

export const useReservableList = () => {
  return useQuery(['@ReservableList'], getReservable, {
    onError: (e: any) => {
      alert(`${e.message}예약 가능한 숙소를 로드하지 못했습니다`)
    }
  })
}

//핀리스트 추가
 const postPinedRoom = async(data: Room) => {
  const travelId = getTravelId()
  data.travelId = Number(travelId)
  return await axios.post(`http://localhost:4000/pineds`, data)
} 

//핀리스트 수정(메모)
const patchPinedMemo = async(id: number, memo: string) => {
  return await axios.patch(`http://localhost:4000/pineds/${id}`, {memo: memo})
}

export const useEditMemo = (id: number, memo: string) => {
  const query = useQueryClient()
  return useMutation(() => patchPinedMemo(id, memo), {
    onError: (e: any) => {
      alert(`${e.message} 메모를 수정하지 못했습니다`)
    },
    onSuccess: () => {
      query.invalidateQueries(['@pined'])
    }
  })
}


//저장한 핀리스트 불러오기
export const getPinedList = async() => {
  const travelId = getTravelId()
  const res = await axios.get(`http://localhost:4000/pineds?travelId=${travelId}`)
  return res.data
}

export const useGetPinedList = () => {
  return useQuery(['@pined'], () => getPinedList())
}

//핀리스트 추가하기
export const useAddPined = (data: Room) => {
  const query = useQueryClient()

  return useMutation(() => postPinedRoom(data), {
    onError: (e: any) => {
      alert(`${e.message}핀을 저장하지 못했습니다`)
    },
    onSuccess: () => {
      query.invalidateQueries(['@pined'])
    }
  })
}

//핀리스트 삭제
const deletePined = async(id: number) => {
  return await axios.delete(`http://localhost:4000/pineds/${id}`)
} 

export const useDeletePined = (id: number) => {
  const query = useQueryClient()

  return useMutation(() => deletePined(id), {
    onSuccess: () => {
      query.invalidateQueries(['@pined'])
    },
    onError: (e: any) => {
      alert(`해당 항목을 삭제하지 못했습니다 다시 시도해주세요!`)
    }
  })
}


//방 상세보기 
const getDetailView = async(id: number) => {
  const res = await axios.get(`http://localhost:4000/rooms/${id}`)
  return res.data
} 

export const useDetailView = (id: number) => {
  return useQuery([], () => getDetailView(id), {
    onError: (e: any) => {
      alert(e.message)
    }
  })
}

//예약하기

const postReserve = async(data: Reserve, travelId: string) => {
  data.travelId = Number(travelId)
  return await axios.post('http://localhost:4000/reserves', data)
}

export const useReserve = (data: Reserve, travelId: string) => {
  const nav = useNavigate()
  const query = useQueryClient()
  return useMutation(() => postReserve(data, travelId), {
    onError: (e: any) => {
      alert(`${e.message} 예약하는데 실패했습니다`)
    },
    onSuccess: () => {
      query.invalidateQueries(['@reserve'])
      alert('예약이 완료 되었습니다!')
      nav('/')
      query.refetchQueries(['@reserve'])
    }
  })
}

//예약목록

const getReserve = async() => {
  const travelId = getTravelId()
  const res = await axios.get(`http://localhost:4000/travels/${travelId}?_embed=reserves`)

  return res.data
}

export const useReserveList = () => {
  return useQuery(['@reserve'], () => getReserve(), {
    onError: (e: any) => {
      alert(`${e.message} 예약목록을 가져오지 못했습니다`)
    }
  })
}

//예약삭제
const deleteReserve = async(id: number) => {
  return await axios.delete(`http://localhost:4000/reserves/${id}`)
}

export const useReserveDelete = (id: number) => {
  const query = useQueryClient()
  return useMutation(() => deleteReserve(id), {
    onSuccess: () => {
      query.invalidateQueries(['@reserve'])
      alert('예약이 취소 되었습니다!')
      query.refetchQueries(['@reserve'])
    }
  })
}

//여행기록 남기기

const postDiary = async(data: Diary) => {
  return await axios.post(`http://localhost:4000/pasts`, data)
}

export const useDiaryRegist = (data: Diary) => {
  const query = useQueryClient()
  const nav = useNavigate()

  return useMutation(() => postDiary(data), {
    onError: (e: any) => {
      alert(`${e.message}다시 시도해주세요ㅠ`)
    },
    onSuccess: () => {
      query.refetchQueries(['@travelDiary'])
      alert('등록이 완료되었습니다')
      nav('/')
    }
  })
}

//여행기록 리스트 불러오기
const getDiary = async(id: number) => {
  const res = await axios.get(`http://localhost:4000/pasts?roomId=${id}`)
  return res.data
}

export const useDiaryList = (id: number) => {
  const query = useQueryClient()
  return useQuery(['@travelDiary'], () => getDiary(id), {
    onError: (e: any) => {
      alert(`${e.message}등록한 기록들을 로드하지 못했습니다`)
    },
    onSuccess: (data) => {
      const recommends = data
      query.setQueryData(['@travelDiary', '맛집'], recommends.filter( (list: { theme: string }) => list.theme === '맛집'))
      query.setQueryData(['@travelDiary', '카페'], recommends.filter( (list: { theme: string }) => list.theme === '카페'))
      query.setQueryData(['@travelDiary', '문화'], recommends.filter( (list: { theme: string }) => list.theme === '문화'))
      query.setQueryData(['@travelDiary', '행사'], recommends.filter( (list: { theme: string }) => list.theme === '행사'))
      query.setQueryData(['@travelDiary', '기타'], recommends.filter( (list: { theme: string }) => list.theme === '기타'))
    }
  })
}

//여행기록 리스트 삭제
const deleteDiary =  async(id: number) => {
  return await axios.delete(`http://localhost:4000/pasts/${id}`)
}

export const useDeleteDiary = (id: number) => {
  const query = useQueryClient()
  return useMutation(() => deleteDiary(id), {
    onError: (e: any) => {
      alert(`${e.message}다시 시도해주세요`)
    },
    onSuccess: () => {
      query.invalidateQueries(['@travelDiary'])
      alert('삭제되었습니다!')
    }
  })
}