import * as React from 'react'
import classnames from 'classnames'
import { AnchorButton, Button, Intent,
    Tooltip, Position } from '@blueprintjs/core'
import { observer } from 'mobx-react'
import { Store } from '../../store/Store'
import './Navbar.scss'

export interface INavbarProps {
  store: Store
}

export const Navbar = observer(
  function Navbar({ store }: INavbarProps) {

    const isSidebarToggled = store.config.current.layout.left.active

    const toggleSidebar = () => {
      console.log('called')
      store.config.current.layout.left.active =
        !store.config.current.layout.left.active
    }

    const toggleSidebarButtonClassNames =
      classnames('pt-minimal', {
        'pt-active': isSidebarToggled
      })

    const toggleSidebarButton = (
      <Tooltip content='Toggle Sidebar' position={Position.RIGHT_BOTTOM}>
        <AnchorButton iconName='control' intent={Intent.PRIMARY}
            onClick={toggleSidebar} className={toggleSidebarButtonClassNames}>
        </AnchorButton>
      </Tooltip>
    )

    return (
      <div className='ss-navbar pt-dark'>
        <div className='row'>
          <div className='col-xs-4 left'>
            {toggleSidebarButton}
            <Button className='pt-minimal'>
              SourceSpace
            </Button>
          </div>
          <div className='col-xs-8 right'>
            <div className='pt-button-group pt-minimal'>
              <Button intent={Intent.SUCCESS}
                      iconName='new-object'>Create</Button>
              <Button iconName='fork'>Fork</Button>
              <Button iconName='social-media'>
                Share
              </Button>
              <Button iconName='dollar'>Donate</Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
)
