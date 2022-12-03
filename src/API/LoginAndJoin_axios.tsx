import axios from "axios" 


export interface NewUser {
  email: string,
  name: string,
  password: string,
}

export interface Login {
  email: string,
  password: string,
}

const baseURL = `http://localhost:4000/users`
//login
export const getUsers = async(user: Login) => {
 const {data, status} = await axios.get(baseURL)
 if(status === 500 ) {
  alert('다시 시도해주세요!')
  return
}
 const userInfo = data.find(({ email, password }: Login) => email === user.email && password === user.password)
 if(userInfo !== undefined) {
  const setUser = { ...userInfo }
  delete setUser.password
  return setUser
 } else alert('아이디 및 패스워드가 일치하지 않습니다')
}

//join
export const JoinUser = async(data: NewUser) => {
  try{
    return await axios.post(baseURL, data)
  } catch(e: any){
    alert(`${e.message} 다시 시도해주세요`)
  }
};


