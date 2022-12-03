import { useQueryClient } from "@tanstack/react-query";
export default function useGetData() {
  const query = useQueryClient()

  const selectedSchedule = (query.getQueryData(['@pined']) as any)![0][1]
  const pined = (query.getQueryData(['@pined']) as any).data

  return { pined, selectedSchedule }
} 