import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import './styles.css'
import '../../global.css'

import logoImg from '../../assets/logo.svg'

import api from '../../services/api'

export default function Logon() {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()

  async function handleLogin(e) {
    e.preventDefault()

    try {
      const response = await api.post('users/login', { name, password })
      localStorage.setItem('name', response.data.user.name)
      localStorage.setItem('sessionToken', response.data.token)
      history.push('/pedidos')
    } catch (err) {
      alert('Falha no login, por favor tente novamente')
    }
  }

  return (
    <div className='logon-container'>
      <div className='logo'>
        <img src={logoImg} alt='Be The Hero' />
      </div>

      <section className='form'>
        <form onSubmit={handleLogin}>
          <div className='boasVindas'>
            <p className='titulo'>Bem-vindo(a) ao</p>
            <p className='subtitulo'>
              aplicativo de pedidos de orações da Maanaim
            </p>
          </div>

          <input
            placeholder='Usuário'
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            placeholder='Senha'
            type='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button className='button' type='submit'>
            Entrar
          </button>
          {/* <Link className='back-link' to='/registrar'>
            <FiLogIn size={16} color='#C2272D' />
            Não tenho cadastro
          </Link> */}
        </form>
      </section>

      {/* <img src={heroesImg} alt="Heroes" /> */}
    </div>
  )
}
