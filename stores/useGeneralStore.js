export const useGeneralStore = defineStore("general", () => {
  const toast = useToast();

  async function deleteRecord(url) {
    const { data, error, status } = await useApiFetch(url, {
      method: "DELETE",
    });

    evaluateResponde({
      data,
      error,
      status,
      showSuccessMessage: true,
      customMessage: "Registro eliminado.",
    });
  }

  function formatDate(ISODate, withTime = false) {
    const date = new Date(ISODate);

    const day = date.getDate();
    const month = date.getMonth() + 1; // Los meses en JavaScript van de 0 a 11, por lo que hay que sumar 1
    const year = date.getFullYear();
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const meridiano = hour >= 12 ? "PM" : "AM";

    let dateFormated = `${day}/${month}/${year}`;

    if (withTime) {
      dateFormated = `${dateFormated} ${hour}:${
        minutes > 9 ? minutes : "0" + minutes
      } ${meridiano}`;
    }

    return dateFormated;
  }

  function hasError(error) {
    if (error.statusCode === 401) {
      toast.add({ title: "Acceso no autorizado", color: "red", timeout: 1500 });
      return true;
    }

    if (error.statusCode === 409) {
      toast.add({ title: "Error en el servidor", color: "red", timeout: 1500 });
      return true;
    }

    if (error.statusCode === 422) {
      const errs = error.data.errors;

      Object.keys(errs).forEach((key) => {
        errors[key] = errs[key][0];
      });
      return true;
    }
    return false;
  }

  function evaluateResponde({
    data,
    error,
    status,
    showSuccessMessage = true,
    customMessage = null,
  }) {
    if (!status.ok) {
      hasError(error);
      return false;
    }

    if (showSuccessMessage) {
      toast.add({ title: customMessage ? customMessage : "Operación exitosa", timeout: 1500 });
    }

    return true;
  }

  return { deleteRecord, formatDate, hasError, evaluateResponde };
});
