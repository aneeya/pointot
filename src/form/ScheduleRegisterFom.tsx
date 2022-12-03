import { ChangeEvent, MouseEvent, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import styled from "styled-components"

import Calendar from "../components/common/Calendar"

import { useAddSchedule } from "../API/TravelSchedule_axios"

import ico from "../assets/icons/calendar.png"
import { cityList } from "../components/storedData/cityList"
import { getUser } from "../components/storedData/localStorage"

const initValue = {
  email: getUser().email,
  title: "",
  city: "",
  startDate: "",
  endDate: ""
}

export default function ScheduleRegisterFom() {
  const [ schedule, setSchedule ] = useState(initValue) 
  const [ message, setMesseage ] = useState('')

  const addMutation = useAddSchedule(schedule)

  const nav = useNavigate()

  const changeValue = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setSchedule({ ...schedule, [name]: value})
  }

  const clickButtonAbled = () => {
    const values = Object.values(schedule)
    if( values.includes("")) {
      setMesseage("아직 입력하지 않은 값이 있습니다!")
      return
    }
  }

  const submitValue = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    addMutation.mutate()
  }

  const startPickOpen = () => {
    const isCalendar = document.querySelector('#calendar') as HTMLDivElement
    isCalendar.style!.display = 'block'
  }

  const endPickOpen = () => {
    const isCalendar = document.querySelector('#calendar') as HTMLDivElement
    if(schedule.startDate === '') {
      alert('여행시작일을 먼저 선택해 주세요~')
      return
    }
    isCalendar.style!.display = 'block'
  }

  const pickData = (pickdate: string) => {
    const isCalendar = document.querySelector('#calendar') as HTMLDivElement
    const startDate = schedule.startDate.replace(/\-/g, '')
    const newDate = pickdate.replace(/\-/g, '')

    if(schedule.startDate === '' && schedule.endDate === '') {
      setSchedule({ ...schedule, startDate: pickdate })
    } else if(schedule.startDate !== '' && schedule.endDate === '') {
      if(Number(startDate) <= Number(newDate)) {
        setSchedule({ ...schedule, endDate: pickdate })
      } else alert('여행시작일 보다 이전입니다')
    } else if(schedule.startDate !== '' && schedule.endDate !== '') {
      setSchedule({ ...schedule, startDate: pickdate, endDate: '' })
    }
    
    isCalendar.style!.display = 'none'
  }
  

//만약에 돔이 이곳에 document를 작성할경우, style값이 읽히지 않음 이벤트가 함수가 먼저 선언되고 dom이 그려짐
// 즉 해당 값이 읽이지 않음 if문을 통해 값이 존재할 경우에 이벤트를 호출해야함
 
useEffect(() => {
  const values = Object.values(schedule)
  
  if( !values.includes("")) setMesseage("")
}, [schedule])

  return (
    <>
      <S.Form onSubmit={submitValue}>
        <S.FormlDiv>
          <S.Label>
            여행 주제
            <S.Input 
              type="text" 
              name="title"
              required
              onChange={changeValue}/>
          </S.Label>
          <S.Label>
            여행지
            <S.SelectDiv>
              <S.Select as="select" name="city" required onChange={changeValue}>
                <option selected>여행지를 선택하세요!</option>
                {cityList.map((data: { cityE: string ; city: string }) => {
                  return <option key={data.cityE} value={data.city}>{data.city}</option>
                })}
              </S.Select>
              <S.OptionIco></S.OptionIco>
            </S.SelectDiv>
          </S.Label>
          <S.Dates>
            <S.DateLabel>
              시작일
              <S.SelectDate>
                <S.DateButton role="button" id="date" src={ico} alt="여행 시작 날짜를 선택하세요" onClick={startPickOpen}/>
                <S.DateInput type="text" id="startDate" name="startDate" defaultValue={schedule.startDate}/>
              </S.SelectDate>  
            </S.DateLabel>
            <S.DateLabel>
              마지막일
              <S.SelectDate>
                <S.DateButton role="button" id="date" src={ico} alt="여행 마지막 날짜를 선택하세요" onClick={endPickOpen}/>
                <S.DateInput type="text" id="endDate" name="endDate" defaultValue={schedule.endDate}/>
              </S.SelectDate>
            </S.DateLabel>
            <S.Calendar id="calendar"><Calendar pickData={pickData}/></S.Calendar>
          </S.Dates>
        </S.FormlDiv>
        <S.Messge>{message}</S.Messge>
        <S.ButtonDiv>
          <S.Button type="submit" onClick={clickButtonAbled}>등록</S.Button>
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
  flex-wrap: wrap;
  width: 60rem;
  height: 28rem;
  margin-left: 3rem;
`
S.Label = styled.label`
  display: flex;
  flex-direction: column;
  width: 25rem;
  height: 8.8rem;
  margin-right: 5rem;
  margin-bottom: 3rem;
  font-size: 2rem;
  font-weight: 600;
`
S.DateLabel = styled(S.Label)`
  position: relative;
`

S.Input = styled.input`
  width: 24rem;
  height: 4rem;
  margin-top: 1rem;
  padding: 1rem;
  font-size: 1.6rem;
  border: none;
  border-bottom: 1px solid var(--color-gray1);
  cursor: ${(props) => props.theme ? `${props.theme}` : 'none'}
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
  margin-right: 2rem;
`
S.DateInput = styled.input`
  width: 21.5rem;
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
  display: none;
  position: absolute;
  top: rem;
  right: -30rem;
  z-index: 10;
  width: 33rem;
  height: 34rem;
`
S.Cost = styled.div`
  display: flex;
  width:30rem;
  justify-content: space-between;
  font-size: 1.8rem;
  color: var(--main-color1-1);
`
S.SelectDiv = styled.div`
  position: relative;
  background: rgba(0, 0, 0, 0);
`
S.Select = styled(S.Input)`
  -o-appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  position: relative;
  z-index: 3;
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

S.Messge = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 28rem;
  height: 5rem;
  font-weight: 600;
  color: var(--color-red);
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