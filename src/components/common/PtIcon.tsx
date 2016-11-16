import * as React from 'react'
import classnames from 'classnames'

export function PtIcon({ icon, size }) {
  const className = classnames('pt-icon-' + icon,
    'pt-icon-' + (size || 'standard')
  )
  return <span className={className} />
}
