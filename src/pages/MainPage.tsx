import Header, { Active } from "../components/areas/Header";
import Main from "../components/areas/Main";
import MainTab from "../components/areas/MainTab";


export default function({logined}: Active) {
  return (
    <>
      <Main logined={logined}/>
      {logined && <MainTab/>}
    </>
  )
}