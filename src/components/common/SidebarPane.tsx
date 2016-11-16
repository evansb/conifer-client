import * as React from 'react'
import { Button } from '@blueprintjs/core'
import './SidebarPane.scss'

export interface ISidebarPaneProps {
  title: string
  icons: React.ReactElement<any>
}

export class SidebarPane extends React.Component<ISidebarPaneProps, void> {
  render () {
    return (
      <div className='ss-sidebar-pane'>
        <div className='row title pt-light'>
          <div className='col-xs-6 header'>
            { this.props.title }
          </div>
          <div className='col-xs-6 icons'>
            { this.props.icons }
          </div>
        </div>
        <div className='row content'>
          { this.props.children }
        </div>
      </div>
    )
  }
}
