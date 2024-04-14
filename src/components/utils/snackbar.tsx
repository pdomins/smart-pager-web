import * as React from 'react'
import Box from '@mui/material/Box'
import { Snackbar as SnackbarMUI } from '@mui/material'
import Grow from '@mui/material/Grow'
import Alert from '@mui/material/Alert'

export default function Snackbar({
  isOpen,
  setIsOpen,
  text,
  type,
  variant = 'standard',
}: {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  text: string
  type: 'error' | 'info' | 'success' | 'warning'
  variant?: 'filled' | 'standard' | 'outlined'
}) {
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return
    }

    setIsOpen(false)
  }

  return (
    <Box sx={{ width: 500 }}>
      <SnackbarMUI
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={isOpen}
        onClose={handleClose}
        TransitionComponent={Grow}
        autoHideDuration={8000}
      >
        <Alert
          severity={type}
          variant={variant}
          sx={{ bgcolor: `${variant === 'outlined' && 'background.paper'}` }}
          onClose={() => setIsOpen(false)}
        >
          {text}
        </Alert>
      </SnackbarMUI>
    </Box>
  )
}
