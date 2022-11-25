import { useQueryClient } from "@tanstack/react-query";
export default function useGetData() {
  const query = useQueryClient()

  const pined = (query.getQueryData(['@pined']) as any).data

  return { pined }
} 