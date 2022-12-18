import { useEffect, useState } from "react";
import styled from "styled-components";
import { useGetPinedList, useReservableList } from "../API/TravelMange_axios";
import { Room } from "../types";



import ReservableBox from "./ReservableBox";

interface Props {
  ended: number
}
export default function ReservableTab({ended}: Props) {
  const [ reservable, setReservable ] = useState<Room[] | []>([])

  const { data, status } = useReservableList()
  const pinedList = useGetPinedList()

  useEffect(() => {
    if(status === 'success' 
        && pinedList.status ==='success'
        && ended >= 0) setReservable(data)
  })
  
  return (
    <>
    {reservable.length !== 0
     ?
      reservable.map((list: Room) => {
        const pineds = pinedList.data
        const pinedIds = pineds.map( (list: Room) => list.id)
        const isPined = pinedIds.includes(list.id) 
        return (
          <>
          <S.Div key={list.name}>
            <ReservableBox list={list} isPined={isPined}/>
          </S.Div>
          </>
        )
      })
     :
     <S.Messge>예약가능한 숙소가 없습니다.</S.Messge>
    }
    </>
  )
}

//style

const S: any = {}

S.Div = styled.div`
  margin-bottom: 2rem;
`
S.Messge = styled.div`
  width: 30rem;
  margin: 0 auto;
  margin-bottom: 5rem;
  color: var(--main-color1);
  font-weight: 600;
  font-size: 2rem;
`