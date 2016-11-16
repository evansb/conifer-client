import * as React from 'react'
import { observer } from 'mobx-react'
import { Button, Tree, ITreeNode } from '@blueprintjs/core'
import { SidebarPane } from '../common/SidebarPane'
import { IFileTree, FileType, FileState, FileStore } from '../../store/FileStore'
import './DirectoryTree.scss'

export interface IDirectoryTreeProps {
  root: IFileTree,
  store: FileStore
}

function fileToTreeNode(file: IFileTree, store: FileStore): ITreeNode {
  let iconName: string = 'document'
  switch (file.type) {
    case FileType.DIRECTORY:
      iconName = 'folder-close'
      break
    case FileType.PLAYGROUND:
      iconName = 'path'
      break
    case FileType.FILE:
      iconName = 'document'
      break
    default:
      break
  }

  const state = store.fileState.get(file.id.toString())

  const isExpanded = state === FileState.EXPANDED ||
    state === FileState.EXPANDED_AND_SELECTED

  const isSelected = state === FileState.SELECTED ||
    state === FileState.EXPANDED_AND_SELECTED

  return {
    id: file.id,
    hasCaret: file.type === FileType.DIRECTORY,
    label: file.name,
    iconName,
    isExpanded,
    isSelected,
    childNodes: (file.children || []).map((v) => fileToTreeNode(v, store))
  }
}


function DirectoryTreeC({ root, store }: IDirectoryTreeProps) {
  const icons = (
    <div className='pt-button-group'>
      <Button iconName='document' className='pt-minimal'></Button>
      <Button iconName='folder-close' className='pt-minimal'></Button>
    </div>
   )

  const handleNodeCollapse = (nodeData: ITreeNode) => {
     const state = store.fileState.get(nodeData.id.toString())
     if (state === FileState.EXPANDED_AND_SELECTED) {
       store.fileState.set(nodeData.id + '', FileState.SELECTED)
     } else {
       store.fileState.set(nodeData.id + '', FileState.NONE)
     }
  }

  const handleNodeExpand = (nodeData: ITreeNode) => {
     const state = store.fileState.get(nodeData.id.toString())
     if (state === FileState.SELECTED) {
       store.fileState.set(nodeData.id + '', FileState.EXPANDED_AND_SELECTED)
     } else {
       store.fileState.set(nodeData.id + '', FileState.EXPANDED)
     }
  }

  const handleNodeSelect = (nodeData: ITreeNode) => {
     const state = store.fileState.get(nodeData.id.toString())
     store.clearSelection()
     if (state === FileState.EXPANDED) {
       store.fileState.set(nodeData.id + '', FileState.EXPANDED_AND_SELECTED)
     } else {
       store.fileState.set(nodeData.id + '', FileState.SELECTED)
     }
  }

  const contents = (root.children || []).map((v) => fileToTreeNode(v, store))
  const rootElement = <Tree
    onNodeExpand={handleNodeExpand}
    onNodeClick={handleNodeSelect}
    onNodeCollapse={handleNodeCollapse}
    contents={contents} />

  return (
    <SidebarPane title='File Explorer' icons={icons}>
      <div className='ss-directory-tree pt-dark'>
        { rootElement }
      </div>
    </SidebarPane>
  )
}

export const DirectoryTree = observer(DirectoryTreeC)
