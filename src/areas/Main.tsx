import { useState } from "react"
import { useNavigate } from "react-router-dom"

import styled from "styled-components"

import logo from "../assets/logo.png"
import carrier from "../assets/icons/carrier.png"
import mainimg from "../assets/mainimg.jpg"

import { Active } from "./Header"
import PopupLayout from "../layout/PopupLayout"
import { getTravelId } from "../storedData/localStorage"
import Portal from "../Portal"
import SelectingDates from "../components/SelectingDates"
import NoticeDday from "../components/NoticeDday"

export default function Main({logined}: Active) {
  const [ storedSchedules, setStoredSchedules ] = useState(false)
  const nav = useNavigate()
  const travelId = getTravelId()

  const clickReigstSchedule = () => {
    if(logined) nav('/scheduleRegister')
    else alert('로그인해주세요!')
  }
    
  const clickSelectingSchedule = () => {
    if(logined) setStoredSchedules(true)
    else alert('로그인해주세요!')
  }

  return (
    <>
      <Portal>
      {storedSchedules && <PopupLayout render={<SelectingDates onClick={() => setStoredSchedules(false)}/>}/>}
      </Portal>

      <S.Main theme={mainimg}>
         <S.Background theme={mainimg}/>
         <S.Guide type='button'>
          <S.GuideText >zerobnb</S.GuideText>
          <S.GuideText >이용가이드</S.GuideText>
         </S.Guide>
         <S.MainDiv>
          <S.H2>
            <S.Logo src={logo} alt="zerobnb"/>
            <S.DesDiv>
              <S.Des>여행 일정을 등록하고</S.Des>
              <S.Des>원하는 숙소를 찾아</S.Des>
              <S.Des>예약하세요</S.Des>
            </S.DesDiv>
          </S.H2>
          <S.AddButton type="button" onClick={clickReigstSchedule}>
            <S.PlusText>+</S.PlusText>
            여행 일정 등록
          </S.AddButton>
          <S.SelectButton type="button" onClick={clickSelectingSchedule}><S.Ico src={carrier} alt="아이콘"/>나의 일정 선택</S.SelectButton>
         </S.MainDiv>
         {travelId !== null ? <NoticeDday/> : null}
      </S.Main>
    </>
  )
}

const S: any = {}

S.Main = styled.main`
  position: relative;
  width: 100%;
  height: 79.9rem;
  padding-top: 20rem;
`

S.Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: -999;
  width: 100%;
  height: 79.9rem;
  background: ${(prop) => `url(${prop.theme}) left bottom / cover no-repeat`};
  opacity: 0.3;
`

S.MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
S.H2 = styled.h2`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 7rem;
`
S.Logo = styled.img`
  width: 34rem;
  margin-bottom: 7rem;
`
S.DesDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
S.Des = styled.div`
  font-size: 2.4rem;
  font-family: var(--font-family);
  line-height: 1.8;
`
S.Ico = styled.img`
  height: 2.3rem;
`
S.AddButton = styled.button`
  width: 22rem;
  height: 6.5rem;
  margin-bottom: 5rem;
  background: var(--main-color1);
  border: none;
  border-radius: 3rem;
  font-size: 2rem;
  font-weight: 600;
  color: var(--color-white);
  box-shadow: 1.5px 2px  var(--main-color1-1);
  &:hover,
  &:focus {
    border: 2px solid var(--main-color1-1);
  }
`
S.PlusText = styled.span`
  margin-right: 1.2rem;
`
S.SelectButton = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  font-size: 1.6rem;
  color: var(--main-color1-1);
  &:hover {
    font-weight: 600;
  }
`

S.Guide = styled.button`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5.2rem;
  height: 20.9rem;
  background: var(--color-white);
  border-top-right-radius: 2.5rem;
  border-bottom-right-radius: 2.5rem; 
  border: none;
  border-right: 4px solid var(--main-color1-1);
  border-bottom: 5px solid var(--main-color1-1);
`

S.GuideText = styled.span`
font-size: 1.2rem;
font-weight: 600;
writing-mode: vertical-rl;
text-orientation: upright;
`