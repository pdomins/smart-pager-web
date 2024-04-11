import * as React from 'react'
import Box from '@mui/material/Box'
import Snackbar from '@mui/material/Snackbar'
import Grow from '@mui/material/Grow'
import Alert from '@mui/material/Alert'

export default function ErrorSnackbar({
  isOpen,
  setIsOpen,
  text,
}: {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  text: string
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
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={isOpen}
        onClose={handleClose}
        TransitionComponent={Grow}
        autoHideDuration={8000}
      >
        <Alert
          severity="error"
          variant="outlined"
          sx={{ bgcolor: 'background.paper' }}
          onClose={() => setIsOpen(false)}
        >
          {text}
        </Alert>
      </Snackbar>
    </Box>
  )
}
