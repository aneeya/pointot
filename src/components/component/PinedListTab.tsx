import React, { useEffect } from "react"
import { useState } from "react"
import styled from "styled-components"
import useGetData from "../queryData/queryHooks"
import { Room } from "../../types"
import PinedListBox from "./PinedListBox"
import { useGetPinedList } from "../../API/TravelMange_axios"


// interface Props {
//   pineds: Room[]
// }

export default function PinedListTab() {
  const [ pineds, setPineds] = useState<Room[] | []>([])
  const {data, status} = useGetPinedList()

  const ended = window.localStorage.getItem('ended')

  useEffect(() => {
    if(status === 'success')
    setPineds(data.data)
  })

  return (
    <>
      { pineds.length !== 0
        ? pineds.map((list: Room) => {
          const key = list.city + list.name
          return (
            <>
              <PinedListBox key={key} list={list} />
            </>
          )
        })
        : <S.Messge>{Number(ended) < 0 ? '여행 일정이 끝났습니다' : '아직 저장한 리스트가 없습니다!'} </S.Messge>
      }
    </>
  )
}

//style

const S: any = {}

S.Messge = styled.div`
  width: 30rem;
  margin: 0 auto;
  margin-bottom: 5rem;
  color: var(--main-color1);
  font-weight: 600;
  font-size: 2rem;
`
S.Confirm = styled.div`
  display: none;
`