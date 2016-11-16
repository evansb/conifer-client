import * as React from 'react'
import { Button } from '@blueprintjs/core'
import { SidebarPane } from '../common/SidebarPane'

export function UserList() {
  const icons = <Button iconName='cog' className='pt-minimal'></Button>
  return (
    <SidebarPane title='Participants' icons={icons}>
      <div className='ss-user-list'>
        <h2>User List</h2>
      </div>
    </SidebarPane>
  )
}
