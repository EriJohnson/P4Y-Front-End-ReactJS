import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles({
  root: {
    background: props =>
      props.type === 'contained' ? '#8c0000' : 'transparent',
    border: props => (props.type === 'contained' ? 0 : '1px solid #8c0000'),
    borderRadius: 20,
    color: props => (props.type === 'contained' ? 'white' : '#8c0000'),
    height: 40,
    padding: '0 24px',
    margin: 8,
    marginBottom: 12,
    '&:hover': {
      backgroundColor: props =>
        props.type === 'contained' ? '#620000' : 'rgba(163,51,51,0.1)',
      borderColor: '#620000',
    },
  },
})

DialogButton.propTypes = {
  type: PropTypes.oneOf(['contained', 'outlined']).isRequired,
}

export default function DialogButton(props) {
  const { type, handleConfirm, ...other } = props
  const classes = useStyles(props)
  return <Button className={classes.root} {...other} onClick={handleConfirm} />
}
