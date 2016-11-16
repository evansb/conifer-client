import * as React from 'react'
import { Button, Collapse } from '@blueprintjs/core'
import './CollapsibleTitle.scss'

export interface ICollapsibleTitleProps {
  title: string
  icon: string
}

export interface ICollapsibleTitleState {
  isOpen: boolean
}

export function CollapsibleTitle<T>(props: ICollapsibleTitleProps) {
  return (Content: React.ComponentClass<T>) => {
    return class CollapsibleContainer
           extends React.Component<T & ICollapsibleTitleProps,
              ICollapsibleTitleState> {

      constructor (props, context) {
        super(props, context)
        this.state = { isOpen: true }
      }

      toggle = () => {
        this.setState({ isOpen: !this.state.isOpen })
      }

      render () {
        const buttonIcon = this.state.isOpen ? 'caret-down' : 'caret-right'

        return (
            <div>
              <div className='row ss-collapsible-title pt-light'>
                <div className='col-xs-1'>
                  <Button iconName={props.icon} className='pt-minimal'>
                  </Button>
                </div>
                <div className='col-xs-10 title'>
                  { props.title }
                </div>
                <div className='col-xs-1'>
                  <Button iconName={buttonIcon} className='pt-minimal'
                          onClick={this.toggle}>
                  </Button>
                </div>
              </div>
              <div className='row ss-collapsible-content'>
                <Collapse isOpen={this.state.isOpen}>
                  <Content {...this.props} {...props} />
                </Collapse>
              </div>
            </div>
        )
      }
    }
  }
}
