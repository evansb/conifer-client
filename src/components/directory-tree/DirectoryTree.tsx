import * as React from 'react'
import { Button } from '@blueprintjs/core'
import { SidebarPane } from '../common/SidebarPane'
import './DirectoryTree.scss'

export function DirectoryTree() {
  const icons = (
    <div className='pt-button-group'>
      <Button iconName='document' className='pt-minimal'></Button>
      <Button iconName='folder-close' className='pt-minimal'></Button>
    </div>
   )
  return (
    <SidebarPane title='File Explorer' icons={icons}>
      <div className='ss-directory-tree'>
        <h2>File Explorer</h2>
      </div>
    </SidebarPane>
  )
}
