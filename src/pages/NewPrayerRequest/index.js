import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import '../../global.css'
import './styles.css'

import api from '../../services/api'

export default function NewIncident() {
  const [author, setAuthor] = useState('')
  const [content, setContent] = useState('')
  const sessionToken = localStorage.getItem('sessionToken')
  const history = useHistory()

  async function handleNewRequest(e) {
    e.preventDefault()

    const data = {
      author,
      content,
    }

    try {
      await api.post('/prayer-requests', data, {
        headers: { Authorization: sessionToken },
      })
      history.push('/pedidos')
    } catch (err) {
      alert('Erro ao cadastrar, por favor tente novamente')
    }
  }

  return (
    <div className='new-incident-container'>
      <div className='content'>
        <section>
          <h1>Cadastrar novo pedido</h1>
          <p>
            Descreva o seu pedido de oração para que toda a igreja possa orar
            juntos
          </p>
        </section>

        <form onSubmit={handleNewRequest}>
          <input
            placeholder='Nome'
            value={author}
            onChange={e => setAuthor(e.target.value)}
          />
          <textarea
            placeholder='Descreva o seu pedido de oração...'
            value={content}
            onChange={e => setContent(e.target.value)}
          />

          <button className='button' type='submit'>
            Cadastrar
          </button>
          <Link className='back-link' to='/pedidos'>
            <FiArrowLeft size={16} color='#8c0000' />
            Voltar para todos os pedidos
          </Link>
        </form>
      </div>
    </div>
  )
}
