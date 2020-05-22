import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import '../../global.css'
import './styles.css'

import LogoImg from '../../assets/logo.svg'

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
      alert('Pedido cadastrado com sucesso!')
      history.push('/pedidos')
    } catch (err) {
      alert('Erro ao cadastrar, por favor tente novamente')
    }
  }

  return (
    <div className='new-incident-container'>
      <img
        className='logo'
        src={LogoImg}
        alt='Logo de uma mão em sinal de oração'
      />
      <section>
        <h1>Cadastre o seu pedido</h1>
        <p>Escreva o seu pedido de oração para que oremos juntos</p>
      </section>

      <form onSubmit={handleNewRequest}>
        <input
          placeholder='Nome'
          value={author}
          onChange={e => setAuthor(e.target.value)}
          maxLength='25'
        />
        <textarea
          placeholder='Pedido de oração...'
          value={content}
          onChange={e => setContent(e.target.value)}
          maxLength='320'
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
  )
}
