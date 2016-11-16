import * as React from 'react'
import { CollapsibleTitle } from '../common/CollapsibleTitle'

@CollapsibleTitle({ title: 'File Explorer', icon: 'folder-close'})
export class DirectoryTree extends React.Component<{}, void> {
  render () {
    return (
      <div className='ss-file-explorer'>
        <h2>File Explorer</h2>
      </div>
    )
  }
}
