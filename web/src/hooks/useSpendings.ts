import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_NAME } from "./queryNames";
import { request } from "../api";
import type { SpendingDB, Spending } from "../types/spendings";

export function useSpendings() {
  const queryClient = useQueryClient();

  const { data, error, isLoading } = useQuery<SpendingDB[]>(
    [QUERY_NAME.spendings],
    async () => {
      return request.get<SpendingDB[]>("/spendings");
    }
  );

  const { mutateAsync: mutateAddSpending } = useMutation(
    async (spending: Spending) => {
      return request.post<Spending>("/spendings", spending);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([QUERY_NAME.spendings]);
      },
    }
  );

  return {
    data,
    error,
    isLoading,
    addSpending: mutateAddSpending,
  };
}
