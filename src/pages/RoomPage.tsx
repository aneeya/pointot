import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import styled from "styled-components"

import haus from "../assets/haus.png"
import smile from "../assets/smile.png"
import pin from "../assets/icons/pin.png"
import pined from "../assets/icons/pin2.png"

import { useDetailView, useGetPinedList, useDeletePined } from "../API/TravelMange_axios"
import PopupLayout from "../layout/PopupLayout"
import { Active } from "../areas/Header"
import PinedListMemo from "../components/PinedListMemo"
import RecommendationTab from "../components/RecommendationTab"
import ReservationUI from "../components/ReservationUI"



export default function RoomPage({logined}: Active) {
  if(!logined) return null
  const [ pinState, setPinState ] = useState(false)
  const [ memo, setMemo ] = useState(false)

  const param = useParams()
  
  const {data, status} = useDetailView(Number(param.room))
  const pineds = useGetPinedList()
  
  const subMutation = useDeletePined(Number(param.room))

  const clickPinHandle = () => {
    if(pinState) {
      subMutation.mutate()
    } else {
      setMemo(true)
    }
  }
  
  const clickMemo = () => {
    setMemo(false)
  }

  useEffect(() => {
    if(pineds.status === 'success') {
      const pinedList = pineds.data.find((list: { id: number }) => list.id === Number(param.room))
      const initPinState = pinedList !== undefined
      setPinState(initPinState)
    }
  })

  
  return (
    <>
    {
      status === 'success' 
      &&
      <>  
        {memo && <PopupLayout render={<PinedListMemo data={data} clickMemo={clickMemo}/>}/>}
        <S.Layout>
          <S.RoomImg></S.RoomImg>
          <S.Room>
            <S.Info>
              <S.Name>{data.name}</S.Name>
              <S.HostInfo>
                <S.HostH3>hostinfo</S.HostH3>
                <S.HostProfile>
                  <S.HostImg src={smile} alt="호스트이미지"/>
                  <S.HostName>{data.hostName}</S.HostName>
                </S.HostProfile>
                <S.HostContact>
                  <S.HostSpan>연락처</S.HostSpan>
                  <S.HostA href={`tel:+${data.phone}`}>{data.phone}</S.HostA>
                </S.HostContact>
              </S.HostInfo>
              <S.RoomInfo>
                <S.Pin role="button" aria-label="저장핀" theme={pinState? pined : pin} onClick={clickPinHandle}/>
                <S.RoomH3>roominfo</S.RoomH3>
                <S.RoomDes>
                  <S.RoomT>
                    <S.RoomH>주소</S.RoomH>
                    <S.RoomB as='span'>{data.city}...</S.RoomB>
                  </S.RoomT>
                  <S.RoomT>
                    <S.RoomH>예약가능수</S.RoomH>
                    <S.RoomB as='span'>{data.nthOfPeople}</S.RoomB>
                  </S.RoomT>
                  <S.RoomT>
                    <S.RoomH>1박요금</S.RoomH>
                    <S.RoomB as='span' style={{fontWeight: '600'}}>{getCost(data.price)}</S.RoomB>
                  </S.RoomT>
                  <S.RoomT>
                    <S.RoomH>홈페이지</S.RoomH>
                    <S.RoomA href={data.hompage}>{data.hompage}</S.RoomA>
                  </S.RoomT>
                  <S.RoomP>{data.description}</S.RoomP>
                </S.RoomDes>
              </S.RoomInfo>
              <RecommendationTab id={Number(param.room)}/>
            </S.Info>
            <ReservationUI room={data}/>
          </S.Room>
        </S.Layout>
      </>}
    </>
  )
}

//style

const S: any = {}

S.Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 82rem;
  margin: 0 auto;
  margin-top: 5rem;
`
S.RoomImg = styled.div`
  width: 80rem;
  height: 35rem;
  background: var(--main-color1-1) url(${haus}) center / 20rem no-repeat;
  border-radius: 1rem;
`

S.Room = styled.div`
  display: flex;
  jsutify-content: center;
  margin-top: 4rem;
`

S.Info = styled.div`
  margin-right: 3rem;
`
S.Name = styled.h2`
  margin-bottom: 3rem;
  font-size: 3rem;
  font-weight: 800;
`
S.HostInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-between;
  width: 20rem;
`
S.HostH3 = styled.h3`
  margin-bottom: 2.2rem;
  font-size: 2rem;
  font-weight: 600;
`
S.HostProfile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.2rem;
  margin-left: 1rem;
`
S.HostImg = styled.img`
  width: 6rem;
  margin-bottom: 1rem;
`
S.HostName = styled.span`
  font-size: 1.5rem;
  font-weight: 600;
`
S.HostContact = styled.div`
  display: flex;
  align-items: center;
  margin-left: 1rem;
  font-size: 1.5rem;
  font-weight: 600;
`
S.HostSpan = styled.span`
  margin-right: 1.2rem;
`
S.HostA = styled.a`
  color: var(--color-gray3);
  font-weight: 400;
`

S.RoomInfo = styled.div`
  position: relative;
  margin-top: 3rem;
`
S.Pin = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 2.5rem;
  height: 2.7rem;
  background: ${(props) => `url(${props.theme})`} center / 2.5rem no-repeat;
  cursor: pointer;
`
S.RoomH3 = styled(S.HostH3)`
`
S.RoomDes = styled.div`

`
S.RoomT = styled(S.HostContact)`
  margin-bottom: 1.5rem;
`
S.RoomH = styled(S.HostSpan)`
  width: 8rem;
`
S.RoomB = styled(S.HostA)`
  width: 30rem;
`
S.RoomA = styled(S.HostA)`
  width: 35rem;
  overflow-x: hidden;
	text-overflow: ellipsis;
  white-space: nowrap;
	&::-webkit-scrollbar {
		display: none;
	}
`
S.RoomP = styled.p`
width: 45rem;
margin-left: 1rem;
line-height: 1.4;
`


const getCost = (num: string) => {
  const value = Math.floor(Number(num))
  
  const cost = String(value).split('').reverse().join('').replace(/(.{3})/g,"$1,")
  let price = cost.split('').reverse().join('')
    if(price.indexOf(',') === 0 ) price = price.substring(1)

  return  `${price}원`
}
