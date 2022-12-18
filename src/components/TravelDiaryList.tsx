import { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { useDeleteDiary } from "../API/TravelMange_axios"
import ConfirmLayout from "../layout/ConfirmLayout"
import Portal from "../Portal"
import { Diary } from "../types"

interface Props {
  recommended: Diary | undefined
}
export default function TravelDiaryList({recommended}: Props) {
  const { id, images, name, theme} = recommended!
  const [ confirm, setConfirm ] = useState(false)


  const idRef = useRef<number | undefined>()
  const deleteMutation = useDeleteDiary(idRef.current!)
  
  

  return (
    <>
      <Portal>
        {confirm 
          && 
          <ConfirmLayout 
            message="정말로 삭제 하시겠습니까?" 
            confirm={() => deleteMutation.mutate()} 
            cancel={() => setConfirm(false)}/>}
      </Portal>
      <R.Layout ref={() => idRef.current = id!}>
        <R.ImgFrame>
          <R.Img src={images[0]} alt={`${name}이미지`}/>
        </R.ImgFrame>
        <R.Content>
          <R.Theme>{theme}</R.Theme>
          <R.Name>{name}</R.Name>
        </R.Content>
        <R.Delete type="button" onClick={() => setConfirm(true)}>삭제</R.Delete>
      </R.Layout>   
    </>
  )
}


//style

const R: any = {}

R.Layout = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 38rem;
  height: 6.5rem;
  margin-top: 2rem;
`
R.ImgFrame = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 6rem;
  height: 6rem;
  margin-right: 1.8rem;
  border-radius: 50%;
  background: var(--color-gray0);
  overflow: hidden;
`
R.Img = styled.img`
  width: 6rem;
  font-size: 1rem;
`

R.Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 6rem;
`
R.Theme = styled.span`
  font-weight: 600;
`
R.Name = styled.span`
  font-size: 1.4rem;
`
R.Delete = styled.button`
  position: absolute;
  bottom: 0;
  right: 0;
  border: none;
  background: none;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-red);
`