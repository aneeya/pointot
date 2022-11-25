import styled from "styled-components"
import dday from "../../assets/icons/dday3.png"
import getdDay from "../../functions/getdDay"

export default function NoticeDday() {
  const getSelected = window.localStorage.getItem('selectedSchedule')
  const selected = JSON.parse(getSelected!) 
  
  const dDay = getdDay(selected.startDate)
  const ended = getdDay(selected.endDate)
                
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
  right: 25%;
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