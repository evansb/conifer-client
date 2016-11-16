import * as React from 'react'
import { Button } from '@blueprintjs/core'
import './CollapsibleTitle.scss'

export interface ICollapsibleTitleProps {
  title: string
  icon: string
}

export function CollapsibleTitle<T>(props: ICollapsibleTitleProps) {
  return (Content: React.ComponentClass<T>) => {
    return class CollapsibleContainer
           extends React.Component<T & ICollapsibleTitleProps, any> {
      render () {
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
                  <Button iconName='caret-down' className='pt-minimal'></Button>
                </div>
              </div>
              <div className='row'>
                <Content {...this.props} {...props} />
              </div>
            </div>
        )
      }
    }
  }
}
