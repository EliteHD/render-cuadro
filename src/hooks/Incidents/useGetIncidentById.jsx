import { useQuery } from "react-query";
import IncidentsRepository from "@repositories/IncidentsRepository";

function useGetIncidentById(id) {
  const shouldFetch = id !== undefined && id !== null;

  return useQuery(
    ["useGetIncidentById", id],
    () => (shouldFetch ? IncidentsRepository.getIncidentById(id) : null),
    {
      enabled: shouldFetch,
    }
  );
}

export { useGetIncidentById };
