import { ChangeEvent, useCallback, useState } from "react"
import styled from "styled-components"
import { useDeletePined, useEditMemo } from "../../API/TravelMange_axios"
import { Room } from "../../types"

import haus from "../../assets/haus.png"
import pined from "../../assets/icons/pin2.png"
import ConfirmLayout from "../layout/ConfirmLayout"
import { useNavigate } from "react-router-dom"
import React from "react"
import PinedListMemoView from "./PinedListMemoView"

interface Props {
  list: Room,
}

export default React.memo(function PinedListBox({list}: Props) {
  const [ confirm, setConfirm ] = useState(false)
  const ended = window.localStorage.getItem('ended')
  console.log(list.name)
  
  const nav = useNavigate()

  const deleteMutation = useDeletePined(Number(list.id))
  if(Number(ended) < 0) deleteMutation.mutate()

  
  const clickConfirm = useCallback((() => setConfirm(true)),[list])
  const cancelConfirm = useCallback((() => setConfirm(false)),[list])
  const clickUpdates = () => {
    deleteMutation.mutate()
  }


  return (
    <>
      {confirm && <ConfirmLayout message="정말로 삭제하시겠습니까??" confirm={clickUpdates} cancel={cancelConfirm}/>}
      <R.Rayout>
        <R.Img></R.Img>
        <R.Content>
          <R.Pin role="button" aria-label="저장핀"  onClick={clickConfirm}/>
          <R.H3>{list.name}</R.H3>
          <R.Des>{list.description}</R.Des>
          <R.Button type="button" onClick={() => nav(String(list.id))}>상세보기</R.Button>
        </R.Content>
      </R.Rayout>
      <PinedListMemoView list={list}/>
    </>
  )
})

//style

const R: any = {}

R.Rayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80rem;
  height: 20rem;
`
R.Img = styled.div`
  width: 30rem;
  height: 18rem;
  margin-right: 2rem;
  background: var(--main-color1-1) url(${haus}) center / 15rem no-repeat;
  border-radius: 1.2rem;
`
R.Content = styled.div`
  position: relative;
  width: 45rem;
  height: 18rem;
  padding: 1rem;
`
R.Pin = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 2.5rem;
  height: 2.7rem;
  background: url(${pined}) center / 2.5rem no-repeat;
  cursor: pointer;
`
R.H3 = styled.h3`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1.8rem;
`
R.Des = styled.p`
  display: block;
  width: 40rem;
  height: 10rem;
  margin-left: 0.3rem;
  overflow-x: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	&::-webkit-scrollbar {
		display: none;
	}
`
R.Button = styled.button`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.4rem;
  color: var(--main-color1);
  &:hover,
  &:focus {
    font-weight: bolder;
  }
`
R.Confirm = styled.div`
  display: none;
`



