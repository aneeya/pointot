import { ReactElement } from "react";
import styled from "styled-components";

import logo from "../assets/logo.png"

interface Props {
  title: string,
  render: ReactElement
}

export default function FormLayout({title, render}: Props) {
  return (
    <>
      <S.Back>
        <S.Logo src={logo} alt="zerobnb"/>
        <S.Layout>
          <S.H2>{title}</S.H2>
          <S.RDiv>{render}</S.RDiv>
        </S.Layout>
      </S.Back>
    </>
  )
}

const S: any = {};

S.Back = styled.div`
  width: 100%;
  height: 100vh;
  padding-top: 12rem;
  background: var(--color-white);
`
S.Logo = styled.img`
  display: block;
  width: 25rem;
  margin: 5rem auto 2rem;
`
S.Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80rem;
  height: 70rem;
  margin: 0 auto;
  padding-top: 3rem;
  background: var(--color-white);
  border-radius: 3rem;
`
S.H2 = styled.h2`
  font-size: 2.8rem;
  font-weight: 600;
`
S.RDiv = styled.div`
  margin-top: 5rem;
`