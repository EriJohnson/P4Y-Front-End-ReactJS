import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import 'moment/locale/pt-br'

import LogoImg from '../../assets/logo.svg'
import DeleteDialog from '../../components/DeleteDialog'

import '../../global.css'
import './styles.css'

import api from '../../services/api'

export default function PrayerRequests() {
  const [requestsList, setRequestsList] = useState([])
  const sessionToken = localStorage.getItem('sessionToken')

  useEffect(() => {
    api
      .get('/prayer-requests', { headers: { Authorization: sessionToken } })
      .then(response => {
        setRequestsList(response.data)
      })
  }, [sessionToken])

  async function handleDeleteRequest(id) {
    try {
      await api.delete(`prayer-requests/${id}`, {
        headers: {
          Authorization: sessionToken,
        },
      })
      setRequestsList(requestsList.filter(request => request._id !== id))
    } catch (err) {
      alert('Erro ao deletar, por favor tente novamente')
    }
  }

  return (
    <div className='requests-container'>
      <header>
        <img src={LogoImg} alt='Logo de uma mão em sinal de oração' />
        <span>Seja bem vindo(a)</span>
      </header>
      <Link className='AddNewPrayerRequest' to='/novo-pedido'>
        Cadastrar novo Pedido
      </Link>
      <h2>Pedidos Cadastrados</h2>
      <ul>
        {requestsList.map(request => (
          <li key={request._id}>
            <strong>NOME:</strong>
            <p>{request.author}</p>

            <strong>PEDIDO:</strong>
            <p>{request.content}</p>

            <strong>DATA:</strong>
            <p>{moment(request.createdAt).format('LLL')}</p>
            <p>{moment(request.createdAt).startOf('minutes').fromNow()}</p>
            <DeleteDialog
              open={false}
              handleConfirm={() => handleDeleteRequest(request._id)}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
