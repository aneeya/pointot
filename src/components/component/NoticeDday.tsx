import styled from "styled-components"
import dday from "../../assets/icons/dday3.png"
import getdDay from "../../functions/getdDay"
import { getSelected } from "../storedData/localStorage"

export default function NoticeDday() {
  const { startDate, endDate} = getSelected()
  
  const dDay = getdDay(startDate)
  const ended = getdDay(endDate)
                
  window.localStorage.setItem('ended', String(ended))

  return (
    <>
      <S.Layout>
        <S.Dday>
          <S.Img src={dday} alt="디데이"/>
          <S.Date>{dDay}</S.Date>
        </S.Dday>
      </S.Layout>
    </>
  )
}

//style

const S: any = {}

S.Layout = styled.div`
  position: fixed;
  top: 1.5rem;
  right: 28%;
  z-index: 99999;
`
S.Dday = styled.div`
  position: relative;
  width: 12rem;
`
S.Img = styled.img`
  width: 9rem;
`
S.Date = styled.div`
  position: absolute;
  top: 0rem;
  right: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4rem;
  height: 4rem;
  background: var(--color-red);
  border-radius: 50%;
  font-size: 2.2rem;
  font-weight: 600;
  color: var(--color-white);
`