import { AxiosResponse } from "axios";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../common/Button";
import { JoinUser } from "../API/LoginAndJoin_axios";

export default function JoinForm() {
  const [ newUser, setNewUser ] = useState({email: "", name: "", password: ""})
  const nav = useNavigate()

  const changeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value})
  }
  const submitValue = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    const post = JoinUser(newUser) as Promise<AxiosResponse<any, any>>
    if((await post).data) {
      alert('축하합니다! 가입이 완료되었습니다!')
      nav('/')
    }
  }

  return (
    <>
      <S.Form onSubmit={submitValue}>
        <div>
          <S.Label>
            이메일
            <S.Input 
              type="email" 
              placeholder="abc@pointot.com" 
              name="email"
              required
              onChange={changeValue}/>
          </S.Label>
          <S.Label>
            닉네임
            <S.Input 
              type="text" 
              placeholder="pointot" 
              name="name"
              required
              onChange={changeValue}/>
          </S.Label>
          <S.Label>
            비밀번호
            <S.Input 
            type="password"
            placeholder="비밀번호를 입력하세요" 
            maxLength={10} 
            name="password"
            required
            onChange={changeValue}/>
          </S.Label>
        </div>
        <S.ButtonDiv>
          <Button type="submit" text="등록"/>
          <Button type="button" text="취소" onClick={() => nav('/')}/>
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
`
S.Label = styled.label`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  font-size: 1.8rem;
  font-weight: 600;
`
S.Input = styled.input`
  width: 30rem;
  height: 5.5rem;
  margin-top: 1.5rem;
  padding: 1rem;
  font-size: 1.6rem;
  border: 1px solid var(--color-gray1);
  border-radius: 1.3rem;
  &::placeholder {
    font-size: 1.4rem;
    color: var(--color-gray1);
  }
`
S.ButtonDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 17rem;
  margin-top: 2rem;
`