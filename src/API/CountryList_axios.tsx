import { useQueries, useQuery } from "@tanstack/react-query"
import axios from "axios"

const getCountries = async() => {
  return await axios.get('http://localhost:4000/countries')
}

export const useCountries = () => {
  return useQuery(['@countries'], getCountries, {

		onError: (e: any) => {
			alert(`${e.message}여행지역들을 로드하지 못했습니다.`)
		}
  })
}