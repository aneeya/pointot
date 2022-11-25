import { useEffect, useState } from "react"
import styled from "styled-components"
import { useReserveList } from "../../API/TravelMange_axios"
import { Reserve } from "../../types"
import NoitceSelectedSchedule from "./NoitceSelectedSchedule"
import ReservedRoomBox from "./ReservedRoomBox"



export default function ReservedRoomTab() {
  const [ reserves, setReserves ] = useState<Reserve[] | []>([])

  const ended = window.localStorage.getItem('ended')

  const { data, status } = useReserveList()
  
  useEffect(() => {
    if(status === 'success' && Number(ended) >= 0) 
    setReserves(data.data.reserves)
  })

  return (
    <>
      <NoitceSelectedSchedule ended={Number(ended)} isReserved={reserves.length}/>
      {
        reserves.length !== 0
        ?
        <S.Rayout> 
          <S.H2>예약목록</S.H2>
          <S.Reserves>
            {
              reserves.map( reserve => 
                <S.List key={reserve.hostName}>
                  <S.Date>
                    <span>{reserve.checkIn?.replace(/\-/g, ".")}</span>
                    <span>~</span>
                    <span>{reserve.checkOut?.replace(/\-/g, ".")}</span>
                  </S.Date>
                  <ReservedRoomBox list={reserve}/>
                </S.List>)
            }
          </S.Reserves>
      </S.Rayout>
      :
      <S.Messge> { Number(ended) < 0 ? '여행 일정이 끝났습니다' : '아직 예약한 리스트가 없습니다!'}</S.Messge>
      }
    </>
  )
}

//style

const S: any = {}

S.Rayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90rem; 
`

S.ButtonArea = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-bottom: 2rem;
`

S.H2 = styled.h2`
  width: 50rem;
  margin-bottom: 4rem;
  font-size: 2rem;
  font-weight: 600;
`
S.Reserves = styled.ul`
  
`
S.List = styled.li`
  width: 50rem;
  margin: 0 auto;
  margin-bottom: 2.2rem;
`
S.Date = styled.div`
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 18rem;
`
S.Messge = styled.div`
  width: 30rem;
  margin: 0 auto;
  margin-bottom: 5rem;
  color: var(--main-color1);
  font-weight: 600;
  font-size: 2rem;
`