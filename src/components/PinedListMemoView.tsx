import { useState } from "react"
import styled from "styled-components"
import { useEditMemo } from "../API/TravelMange_axios"
import { Room } from "../types"


interface Props {
  list: Room,
}
export default function PinedListMemoView({list}: Props) {
  const [ memo, setMemo ] = useState(false)
  const [ edit, setEdit ] = useState(false) 
  const [ content, setContent ] = useState(list.memo)

  const editMutation = useEditMemo(Number(list.id), content!)

  const changMemo = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let timer;
    if(timer) clearTimeout(timer)
    else timer = setTimeout(() => {
      setContent(e.target.value)
    },800)
  }

  const submitEditMemo = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    editMutation.mutate()
    if(!editMutation.error) {
      alert('수정되었습니다')
      setEdit(false)
    }
  }

  return (
    <>
      <S.Layout>
        <S.MemoButton onClick={() => setMemo(!memo)}>{memo? 'CLOSE' : 'MEMO'}</S.MemoButton>
        {
          memo &&
            <S.MemoDiv>
              <S.Memo>{content !== undefined ? content : '아직 메모한 내용이 없습니다😊'}</S.Memo>
              <S.Button type="button" onClick={() => setEdit(true)}>편집</S.Button>
              {
                edit &&
                <S.EditForm as="form" onSubmit={submitEditMemo}>
                  <S.Edit 
                    as='textarea' 
                    name="memo" 
                    placeholder={content!== undefined ? content : '마음에 드는 점을 간단하게 메모해 보세요😊'}
                    onChange={changMemo}/>
                  <S.Button type="submit" >완료</S.Button>
                  <S.Button type="button" onClick={() => setEdit(false)}>취소</S.Button>
                </S.EditForm>
        }
            </S.MemoDiv>
        }
        
      </S.Layout>
    </>
  )
}

//style

const S: any = {}

S.Layout = styled.div`
  margin-left: 2rem;
  margin-top: 0.5rem;
`
S.MemoButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 8rem;
  height: 4rem;
  background: var(--main-color1);
  color: var(--color-white);
  border: none;
  border-radius: 1rem;
`

S.MemoDiv = styled.div`
  position: relative;
  display: flex;
  align-items: end;
  margin-top: 1rem;
  margin-bottom: 2rem;
`
S.Memo = styled.div`
  width: 25rem;
  height: 12rem;
  margin-right: 2rem;
  padding: 1.2rem;
  background: #fffae3;
  border: 1px solid #ffc269;
  border-radius: 1.5rem;
  font-size: 1.4rem;
`
S.Button = styled.button`
  margin-right: 1rem;
  background: var(--color-white);
  border: none;
  font-size: 1.7rem;
  color: var(--main-color1);
  text-align: center;
  &:hover,
  &:focus {
    font-weight: bolder;
  }
`
S.Edit = styled(S.Memo)`
  resize: none;
  &::placeholder {
    font-size: 1.3rem;
    color: var(--color-gray2);
  }
`
S.EditForm = styled(S.MemoDiv)`
  position: absolute;
  top: -1rem;
  left: 0;
`
