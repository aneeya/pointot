import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { useDeleteSchedule, useEditTitle } from "../API/TravelSchedule_axios"
import ico from "../assets/icons/edit.png"
import Portal from "../Portal"
import { ReservaionList } from "../types"
import ConfirmLayout from "../layout/ConfirmLayout"

interface Props {
  ended: number,
  scheduleInfo: ReservaionList
}
export default function NoitceSelectedSchedule({ended, scheduleInfo}: Props) {
  const [ editMode, setEditMode ] = useState(false)
  const [ confirm, setConfirm ] = useState(false)
  const [ editTitle, setEidtTitle ] = useState('')

  const nav = useNavigate()
  const { title, city, startDate, endDate, reserves } = scheduleInfo

  const clickEditSchedule = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement
    if(ended >=0 && reserves.length > 0) {
      alert('먼저 예약한 숙소들을 취소해주세요!')
      return
    }
    if(target.innerText === '일정 변경') nav('/scheduleModify')
    else if(target.innerText === '일정 삭제') setConfirm(true)
  }

  const selected = { title, city, startDate, endDate } 

  const deleteMutaition = useDeleteSchedule()
  const editMutation = useEditTitle(editTitle, selected, () => setEditMode(false))

  const changeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEidtTitle(e.target.value)
  }
  const submiteValue = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    editMutation.mutate()
  }

  return (
    <>
      <Portal>
      {confirm &&
       <ConfirmLayout 
        message="삭제하시겠습니까??🤔"
        confirm={() => deleteMutaition.mutate()} 
        cancel={() => setConfirm(false)} />}
      </Portal>
      <S.Layout>
        <S.BlueRound></S.BlueRound>
        <S.YellowRound></S.YellowRound>
        <S.OrangeRound></S.OrangeRound>
        <S.GreenRound></S.GreenRound>
        <S.Content>
          {
            !editMode ?
              <S.Title>
                {title}
                <S.EditButton 
                  role="button" 
                  aria-label="여행주제편집하기"
                  src={ico} onClick={() => setEditMode(true)}/>
              </S.Title>
            :
              <S.EditForm onSubmit={submiteValue}>
                <S.EditInput type="text" placeholder={title} onChange={changeValue}/>
                <S.ButtonDiv>
                  <S.Button type="submit">확인</S.Button>
                  <S.Button type="button" onClick={() => setEditMode(false)}>취소</S.Button>
                </S.ButtonDiv>
              </S.EditForm>

          }
          <S.ContentInfo>
            <S.City>{city}</S.City>
            <S.Date>{startDate.replace(/\-/g, ".")} ~ {endDate.replace(/\-/g, ".")}</S.Date>
          </S.ContentInfo>
          { ended > 0 
            &&
            <S.ScheduleEditBT>
            <S.EditBT type="button" onClick={clickEditSchedule}>일정 변경</S.EditBT>
            <S.DeleteBT type="button" onClick={clickEditSchedule}>일정 삭제</S.DeleteBT>
          </S.ScheduleEditBT>}
        </S.Content>
      </S.Layout>
    </>
  )
}

//style

const S: any = {}

S.Layout = styled.div`
  position: relative;
  width: 54rem;
  height: 18rem;
  margin: 0 auto;
  margin-bottom: 5rem;
  background: var(--color-white);
  border: 2px solid var(--main-color1);
  border-radius: 3rem;
  box-shadow: 2px 3px var(--main-color1);
`
S.BlueRound = styled.div`
  position: absolute;
  top: 10%;
  left: 3%;
  width: 1.5rem;
  height: 1.5rem;
  background: var(--main-color1-1);
  border-radius: 50%;
  border: 3px solid var(--main-color1);
`
S.YellowRound = styled(S.BlueRound)`
  left: 93%;
  border: 3px solid var(--color-yellow);
`
S.OrangeRound = styled(S.BlueRound)`
  top: 80%;
  border: 3px solid var(--color-orange);
`
S.GreenRound = styled(S.BlueRound)`
  top: 80%;
  left: 93%;
  border: 3px solid var(--color-green);
`

S.Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  height: 100%;
  padding: 3rem 0 2rem 5rem;
`
S.Title = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--main-color1);
`
S.EditButton = styled.img`
width: 1.3rem;
margin-left: 1rem;
cursor: pointer;
`
S.EditForm = styled.form`
display: flex;
align-items: end;
`
S.EditInput = styled.input`
width: 16rem;
height: 2rem;
border: none;
outline: none;
border-bottom: 1px solid var(--color-gray0);
font-size: 1.5rem;
&::placeholder {
  font-size: 1.5rem;
  font-family: var(--font-family);
  color: var(--color-gray1);
}
`
S.ButtonDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 7rem;
  margin-left: 1rem;
`
S.Button = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  color: var(--main-color1);
  font-weight: 600;
`
S.ContentInfo = styled.div`
  display: flex;
  align-items: center;
`
S.City = styled.div`
  margin-right: 3rem;
`
S.Date = styled.div`
`

S.ScheduleEditBT = styled.div`
  display: flex;
  justify-content: space-between;
  width: 17rem;
  margin-left: 26rem;
`
S.EditBT = styled.button`
  width: 8rem;
  height: 4rem;
  background: var(--main-color1);
  border: none;
  border-radius: 2rem;
  color: var(--main-color1-1);
  font-weight: 600;
  font-size: 1.4rem;
  &:hover,
  &:focus {
    border: 1px solid var(--main-color1-1);
    box-shadow: 1px 1px var(--main-color1-1);
  }
`
S.DeleteBT = styled(S.EditBT)`
  background: var(--color-orange);
`