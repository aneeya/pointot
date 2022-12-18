import { useState, MouseEvent, ReactNode } from "react";
import styled from "styled-components";
import PinedListTab from "../components/PinedListTab";
import ReservableTab from "../components/ReservableTab";
import ReservedRoomTab from "../components/ReservedRoomTab";
import TravelDiaryTab from "../components/TravelDiaryTab";
import {  getEnded, getTravelId } from "../storedData/localStorage";

export default function TabList() {
  const travelId = getTravelId()
  const ended = getEnded() 

  const [ tab, setTab ] = useState<ReactNode>(travelId === null ? "" : <ReservedRoomTab ended={ended}/>)
  
  const clickTab = (e: MouseEvent<HTMLLIElement>) => {
    const targat = e.target as HTMLLIElement
    const targetName = targat.innerText
    if(travelId === null) {
      alert('여행일정을 선택해 주세요!') 
      return
    } // 애니메이션 컴포넌트 만들어보기

    switch(targetName) {
      case "일정 관리":
        setTab(<ReservedRoomTab ended={ended}/>)
        return
      case "예약가능 숙소": 
        setTab(<ReservableTab ended={ended}/>)
        return
      case "찜 리스트":
        setTab(<PinedListTab ended={ended}/>)
        return
      case "여행지 추천":
        setTab(<TravelDiaryTab ended={ended}/>)
    }
    
  }


  return (
    <>
      <S.Nav>
        <S.Ul id='tabList'>
          <S.Li onClick={clickTab}>
            일정 관리
          </S.Li >
          <S.Li onClick={clickTab}>
            예약가능 숙소
          </S.Li> 
          <S.Li onClick={clickTab}>
            찜 리스트
          </S.Li>
          <S.Li onClick={clickTab}>
            여행지 추천
          </S.Li>
        </S.Ul>
        <S.Line/>
      </S.Nav>
      <S.Section>
        {tab}
      </S.Section>
    </>
  )
}


const S: any = {};

S.Nav = styled.nav`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 8rem;
  padding-top: 1.5rem;
`
S.Line = styled.div`
  width: 110rem;
  height: 0.1rem;
  background: var(--main-color1);
`
S.Ul = styled.ul`
  display: flex;
  justify-content: space-between;
  width: 95rem;
  height: 7rem;
  margin: 0 auto;
  font-size: 1.7rem;
  color: var(--main-color1);
`
S.Li = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 14.6rem;
  height: 5rem;
  &:hover,
  &:focus {
    font-weight: bolder;
  } 
  &:active {
    background: var(--main-color1);
    color: var(--color-white);
    border-radius: 2rem;
  }
  cursor: pointer;
`

S.Section = styled.section`
  width: 90rem;
  margin: 0 auto;
  margin-top: 5rem;
`