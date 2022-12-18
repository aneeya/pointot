import { useParams } from "react-router-dom"
import styled from "styled-components"
import TravelDiaryForm from "../form/TravelDiaryForm"

export default function RegisterDiaryPage() {
  const param = useParams()
  return(
    <S.DiaryForm>
      <TravelDiaryForm name={param.roomName!} />
    </S.DiaryForm>
  )
}

//style

const S: any = {}

S.DiaryForm = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 100%;
background: var(--color-white);
overflow: hidden;
`