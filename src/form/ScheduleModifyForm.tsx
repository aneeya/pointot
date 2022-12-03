import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useEditSchedule } from "../API/TravelSchedule_axios";
import Calendar from "../components/common/Calendar";
import { cityList } from "../components/storedData/cityList";
import { getSelected } from "../components/storedData/localStorage";


export default function ScheduleModifyForm() {
  const { city, startDate, endDate } = getSelected()

  const initValue = { city, startDate, endDate }

  const [ schedule, setSchedule ] = useState(initValue)

  const nav = useNavigate()

  const editMutation = useEditSchedule(schedule)

  const pickDate = (pickdate: string) => {
    const startDate = schedule.startDate.replace(/\-/g, '')
    const newDate = pickdate.replace(/\-/g, '')

    if(schedule.startDate === '' && schedule.endDate === '') {
      setSchedule({ ...schedule, startDate: pickdate })
    } else if(schedule.startDate !== '' && schedule.endDate === '') {
      if(Number(startDate) < Number(newDate)) {
        setSchedule({ ...schedule, endDate: pickdate })
      } else alert('여행시작일 보다 이전입니다')
    } else if(schedule.startDate !== '' && schedule.endDate !== '') {
      setSchedule({ ...schedule, startDate: pickdate, endDate: '' })
    } 
    
  }

  const changeValue = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setSchedule({ ...schedule, [name]: value})
  }

  const submitValue = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    editMutation.mutate()
  }


  return (
    <>
      <S.Form onSubmit={submitValue}>
        <S.FormlDiv>
          <S.Label>
            여행지
            <S.SelectDiv>
              <S.Select name="city" onChange={changeValue} defaultValue={city}>
                {cityList.map((list: { cityE: string ; city: string }) => {
                  return <option key={list.cityE} value={list.city}>{list.city}</option>
                })}
              </S.Select>
              <S.OptionIco></S.OptionIco>
            </S.SelectDiv>
          </S.Label>
          <S.Dates>
            <S.DateLabel>
              시작일
              <S.SelectDate>
                <S.DateInput type="text" id="startDate" name="startDate" value={schedule.startDate} readOnly />
              </S.SelectDate>  
            </S.DateLabel>
            <S.DateLabel>
              마지막일
              <S.SelectDate>
                <S.DateInput type="text" id="endDate" name="endDate" value={schedule.endDate} readOnly />
              </S.SelectDate>
            </S.DateLabel>
            <S.Calendar id="calendar"><Calendar pickData={pickDate}/></S.Calendar>
          </S.Dates>
        </S.FormlDiv>
        <S.ButtonDiv>
          <S.Button type="submit">수정</S.Button>
          <S.Button type="button" onClick={() => nav('/')}>취소</S.Button>
        </S.ButtonDiv>
      </S.Form>
    </>
  )
}



//style

const S: any = {}

S.Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 45rem;
  margin-top: 5rem;
`
S.FormlDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 60rem;
  height: 28rem;
`
S.Label = styled.label`
  display: flex;
  flex-direction: column;
  width: 24rem;
  height: 8.8rem;
  margin-right: 5rem;
  margin-bottom: 3rem;
  font-size: 2rem;
  font-weight: 600;
`
S.DateLabel = styled(S.Label)`
  position: relative;
`

S.Dates = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: cneter;
`
S.SelectDate = styled.div`
  display: inline-flex;
  align-items: end;
  justiy-content: space-between;
  margin-top: 1.5rem;
`
S.DateInput = styled.input`
  width: 24rem;
  height: 3rem;
  padding-left: 1rem;
  border: 0;
  border-bottom: 1px solid var(--color-gray1);
  font-size: 1.5rem;
  &::-webkit-calendar-picker-indicator {
    -webkit-appearance: none;
    appearance: none;
  }
`
S.DateButton = styled.img`
  width: 1.6rem;
  margin-right: 0.8rem;
  cursor: pointer;
`
S.Calendar = styled.div`
  position: absolute;
  top: -50%;
  right: -3%;
  width: 33rem;
  height: 34rem;
`

S.SelectDiv = styled.div`
  position: relative;
  background: rgba(0, 0, 0, 0);
`
S.Select = styled.select`
  position: relative;
  z-index: 3;
  width: 24rem;
  height: 4rem;
  margin-top: 1rem;
  padding: 1rem;
  font-size: 1.6rem;
  border: none;
  border-bottom: 1px solid var(--color-gray1);
  -o-appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: rgba(0, 0, 0, 0);
  cursor: pointer;
`
S.OptionIco = styled.span`
  position: absolute;
  bottom: 1rem;
  right: 2rem;
  display: block;
  width: 1.3rem;
  height: 1.3rem;
  background: var(--color-gray1);
  clip-path: polygon(0 0, 100% 0, 50% 80%);
`

S.ButtonDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 16.5rem;
`
S.Button = styled.button`
	width: 8rem;
	height: 4.5rem;
	background: var(--main-color1);
  border: none;
	border-radius: 2rem;
	color: var(--color-white);
	font-size: 1.6rem;
	font-weight: 600;
	cursor: pointer;
	&:hover,
	&:focus {
		box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.3)
	}
`