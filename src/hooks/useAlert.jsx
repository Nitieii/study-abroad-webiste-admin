import { useSnackbar } from "notistack";

const useAlert = () => {
  const { enqueueSnackbar } = useSnackbar();

  return { enqueueSnackbar };
};

export default useAlert;
