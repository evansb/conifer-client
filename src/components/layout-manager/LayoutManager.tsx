import * as React from 'react'
import classnames from 'classnames'
import { observer } from 'mobx-react'
import { Button } from '@blueprintjs/core'
import { LayoutStore } from '../../store/LayoutStore'
import './LayoutManager.scss'

export interface ILayoutManagerProps {
  store: LayoutStore
}

export interface ITabGroupProps {
  index: number
  store: LayoutStore
}

function TabGroup({ store, index }: ITabGroupProps) {
  const multiplier = store.tabGroups.length
  const classNames = classnames('col-xs-' + (12 / multiplier), 'tab-group')
  return (
    <div className={classNames}>
      <div className='tab-list'>
        <div className='icons'>
          { (index !== 0) && (<Button
              onClick={() => store.unsplitGroup(index)}
              iconName='one-column'
              className='pt-minimal'>
          </Button>) }
          <Button
            disabled={multiplier >= 3}
            onClick={() => store.splitGroup(index)}
            iconName='two-columns'
            className='pt-minimal'>
          </Button>
        </div>
      </div>
      <div className='tab-content'></div>
    </div>
  )
}

export const LayoutManager = observer(
  function LayoutManager({ store }: ILayoutManagerProps) {
    return (
      <div className='ss-layout-manager pt-dark'>
        <div className='tab-group-container row'>
        { store.tabGroups.map((tg, idx) =>
            <TabGroup key={idx} index={idx} store={store} />) }
        </div>
      </div>
    )
  }
)
