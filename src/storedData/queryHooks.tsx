import { useQueryClient } from "@tanstack/react-query";
import { Room } from "../types";
export default function useGetData() {
  const query = useQueryClient()

  const selectedSchedule = (query.getQueryData(['@pined']) as any)![0][1]
  const pined = (query.getQueryData(['@pined']) as any).data

  return { pined, selectedSchedule }
} 

export function useDiaryTitle(roomName: string) {
  const query = useQueryClient()

  const reserveds = (query.getQueryData(['@reserve']) as any).reserves
  const selected = reserveds.filter((list: Room) => list.name === roomName)
  return selected[0]
}