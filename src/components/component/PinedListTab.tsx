import React from "react"
import { useState } from "react"
import styled from "styled-components"
import useGetData from "../queryData/queryHooks"
import { Room } from "../../types"
import PinedListBox from "./PinedListBox"



export default function PinedListTab() {
  const queryData = useGetData().pined
  const pineds = queryData.pineds

  const [ pinedList, setPinedList ] = useState(pineds)  

  const ended = window.localStorage.getItem('ended')

  const clickUpdate = (id: number) => {
   const newList = [ ...pinedList ].filter(list => list.id !== id)
   setPinedList(newList)
  }

  return (
    <>
      {pineds.length !== 0
        ? pinedList.map((list: Room) => {
          return (
            <>
              <PinedListBox 
                key={list.name}
                list={list}  
                clickUpdate={clickUpdate}/>
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