import * as React from 'react'
import { Button } from '@blueprintjs/core'
import './SidebarPane.scss'

export interface ISidebarPaneProps {
  title: string
  icon: string
}

export class SidebarPane extends React.Component<ISidebarPaneProps, void> {
  render () {
    return (
      <div className='ss-sidebar-pane'>
        <div className='row title pt-light'>
          <div className='col-xs-1'>
            <Button iconName={this.props.icon} className='pt-minimal'>
            </Button>
          </div>
          <div className='col-xs-10 header'>
            { this.props.title }
          </div>
        </div>
        <div className='row content'>
          { this.props.children }
        </div>
      </div>
    )
  }
}
