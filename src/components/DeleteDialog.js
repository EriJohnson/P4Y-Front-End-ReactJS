import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { FiTrash2 } from 'react-icons/fi'
import DialogButton from './DialogButton'

export default function DeleteDialog(props) {
  const [open, setOpen] = useState(props.open)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleConfirm = () => {
    props.handleConfirm()
    setOpen(false)
  }

  return (
    <>
      <Button variant='outlined' onClick={handleClickOpen}>
        <FiTrash2 size={16} color='##474753' />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          {'Apagar pedido de Oração?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Somente apague um pedido se o mesmo pertencer a você.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <DialogButton type='contained' handleConfirm={handleClose}>
            Cancelar
          </DialogButton>
          <DialogButton type='outlined' handleConfirm={() => handleConfirm()}>
            Apagar
          </DialogButton>
        </DialogActions>
      </Dialog>
    </>
  )
}
