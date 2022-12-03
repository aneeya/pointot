import { useQuery, useQueryClient } from "@tanstack/react-query"
import { ChangeEvent, useState } from "react"
import styled from "styled-components"
import { useStoredDates } from "../../API/TravelMange_axios"
import Button from "../common/Button"

import logo from "../../assets/logo.png"
import spring from "../../assets/icons/spring.png"
import { Schedule } from "../../types"

interface Props {
  onClick: () => void
}

export default function SelectingDates({onClick}: Props) {
  const { data, status } = useStoredDates()
  
  const changeValue = (schedule: Schedule) => {
    const { city, id, startDate, endDate, title } = schedule
    window.localStorage.setItem('travelId', String(id))
    window.localStorage.setItem('selectedSchedule', JSON.stringify({title, city, startDate, endDate}))
  }
  
  const submintValue = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    window.location.reload()
    onClick()
  }

  return (
    <>
      <S.Layout> 
        <S.Spring></S.Spring>
        <S.DateList>
          <S.Logo src={logo} alt="zerobnb"/>
          <S.Form onSubmit={submintValue}>
            <S.SelectDiv>
              {
                status === 'success' 
                &&
                data.map((select: Schedule) => {
                  const { title, id, startDate, endDate } = select
                  const key = title + id
                  return (
                    <>
                      <S.Label key={key}>
                        <S.Input type="radio" name="selectdDate" onChange={() => changeValue(select)}/>
                        <S.Title>{title}</S.Title>
                        <S.Date>{startDate} ~ {endDate}</S.Date>
                      </S.Label>
                    </>
                  )
                })
              }
            </S.SelectDiv>
            <S.ButtonDiv>
              <Button type="submit" text="확인"/>
              <Button type="button" text="취소" onClick={onClick}/>
            </S.ButtonDiv>
          </S.Form>
        </S.DateList>
      </S.Layout>
    </>
  )
}

//style

const S: any = {}

S.Layout = styled.div`
  width: 42rem;
`
S.Spring = styled.div`
  width: 40rem;
  height: 2.5rem;
  margin: 0 auto;
  margin-top: -1rem;
  background: url(${spring}) 0.5rem /4rem repeat-x;
`
S.DateList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3rem;
`
S.Logo = styled.img`
  width: 15rem;
  margin-bottom: 3rem;
`
S.Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`
S.SelectDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 35rem;
  height: 28rem;
  margin-bottom: 2.5rem;
  overflow: auto;
  
`
S.Label = styled.label`
  display: flex;
  align-items: center;
  margin-left: 1.8rem;
  margin-bottom: 1.8rem;
`
S.Input = styled.input`
  margin-right: 1rem;
`
S.Title = styled.span`
  margin-right: 1rem;
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--main-color1);
`
S.Date = styled.span`
  font-size: 1.4rem;
  color: var(--main-color1-1);
`
S.ButtonDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 17rem;
`