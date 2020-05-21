import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Logon from './pages/Logon'
import Register from './pages/Register'
import PrayerRequests from './pages/PrayerRequests'
import NewPrayerRequest from './pages/NewPrayerRequest'

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Logon} />
        <Route path='/registrar' component={Register} />
        <Route path='/pedidos' component={PrayerRequests} />
        <Route path='/novo-pedido' component={NewPrayerRequest} />
      </Switch>
    </BrowserRouter>
  )
}
