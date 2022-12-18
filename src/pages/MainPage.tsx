import { Active } from "../areas/Header";
import Main from "../areas/Main";
import TabList from "../areas/TabList";


export default function({logined}: Active) {
  return (
    <>
      <Main logined={logined}/>
      {logined && <TabList/>}
    </>
  )
}