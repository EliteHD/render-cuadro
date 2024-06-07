import { useMutation } from "react-query";
import IncidentsRepository from "@repositories/IncidentsRepository";
import { notification } from "antd";

function useAddIncident() {
  const mutation = useMutation(IncidentsRepository.postIncidentHistoryr);

  const addIncident = async (data) => {
    try {
      const response = await mutation.mutateAsync(data);

      notification.success({
        message: "Incidencia agregada",
        description: "La incidencia ha sido agregado exitosamente.",
        placement: "topRight",
      });

      return response;
    } catch (error) {
      console.log(error);
      notification.error({
        message: "Error al agregar la incidencia",
        description: `Ha ocurrido un error al intentar agregar la incidencia ${error?.response?.data?.error}`,
        placement: "topRight",
      });

      return null;
    }
  };

  return { addIncident, isLoading: mutation.isLoading };
}

export { useAddIncident };
