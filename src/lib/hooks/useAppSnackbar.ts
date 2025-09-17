import { useSnackbar } from 'notistack'

export const useAppSnackbar = () => {
  const { enqueueSnackbar } = useSnackbar()

  const showSuccess = (message: string, options = {}) =>
    enqueueSnackbar(message, {
      variant: 'success',
      autoHideDuration: 3000,
      ...options,
    })

  const showError = (message: string, options = {}) =>
    enqueueSnackbar(message, {
      variant: 'error',
      autoHideDuration: 4000,
      ...options,
    })

  return { showSuccess, showError }
}
