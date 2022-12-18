import { ChangeEvent, useState } from "react";
import styled from "styled-components";
import Button from "../common/Button";
import { getUsers } from "../API/LoginAndJoin_axios";
import { useNavigate } from "react-router-dom";


export default function LoginForm() {
  const [ user, setUser ] = useState({email: "", password: ""})
  const nav = useNavigate()

  const changeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const submitValue = async(e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    const userInfo = await getUsers(user)
    
    if(userInfo !== undefined) {
      window.localStorage.setItem('user', JSON.stringify(userInfo))
      window.location.replace('http://localhost:3000/')
    }
  }

  
  return (
    <>
      <S.Form onSubmit={submitValue}>
        <div>
          <S.Label>
            이메일
            <S.Input type="email" name="email" required onChange={changeValue}/>
          </S.Label>
          <S.Label>
            비밀번호
            <S.Input type="password" name="password" required onChange={changeValue}/>
          </S.Label>
        </div>
        <S.ButtonDiv>
          <Button type="submit" text="확인" />
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
  margin: 0 auto;
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
`
S.ButtonDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 17rem;
  margin-top: 1rem;
`