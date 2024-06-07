import { useQuery } from "react-query";
import IncidentsRepository from "@repositories/IncidentsRepository";

function useGetIncidents() {
  return useQuery(["useGetIncidents"], () => IncidentsRepository.getAllReports());
}
export { useGetIncidents};
