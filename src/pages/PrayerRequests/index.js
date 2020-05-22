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
  const [isLoading, setIsLoading] = useState(false)

  const shouldDisplayLoader = isLoading
  const shouldDisplayNoResults = !isLoading && !requestsList.length
  const shouldDisplayList = !isLoading && requestsList.length > 0

  useEffect(() => {
    setIsLoading(true)
    api
      .get('/prayer-requests', { headers: { Authorization: sessionToken } })
      .then(response => {
        setRequestsList(response.data)
        setIsLoading(false)
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
      </header>
      <Link className='AddNewPrayerRequest' to='/novo-pedido'>
        Cadastrar pedido
      </Link>
      {shouldDisplayLoader && <h2>Aguarde um momento...</h2>}
      {shouldDisplayNoResults && <h2>Nenhum pedido foi encontrado!</h2>}
      {shouldDisplayList && <h2>Pedidos Cadastrados</h2>}

      <ul>
        {requestsList.map(request => (
          <li key={request._id}>
            <strong>{request.author}</strong>

            <p>{request.content}</p>
            <span className='relativeTime'>
              {moment(request.createdAt).startOf('minutes').fromNow()}
            </span>
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
