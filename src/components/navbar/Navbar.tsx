import * as React from 'react'
import './Navbar.scss'

export function Navbar() {
  return (
    <nav className='ss-navbar pt-navbar pt-dark'>
      <div>
        <div className='pt-navbar-group pt-align-left'>
          <div className='pt-navbar-heading'>Conifer</div>
        </div>
        <div className='pt-navbar-group pt-align-right'>
          <button className='pt-button pt-minimal pt-icon-notifications'>
          </button>
          <button className='pt-button pt-minimal pt-icon-user'></button>
        </div>
      </div>
    </nav>
  )
}
