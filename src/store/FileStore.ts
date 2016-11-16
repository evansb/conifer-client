import { observable, toJS, asMap } from 'mobx'
import { AbstractStore } from './AbstractStore'

export enum FileType {
  ROOT = 0,
  DIRECTORY,
  PLAYGROUND,
  FILE
}

export interface IFileTree {
  id: number
  parent?: IFileTree
  type: FileType,
  name?: string,
  children?: IFileTree[]
}

export enum FileState {
  NONE = 0,
  EXPANDED,
  SELECTED,
  EXPANDED_AND_SELECTED
}

export interface FileStoreState {
  root: IFileTree,
  fileState: {
    [id: string]: FileState
  }
}

export class FileStore extends AbstractStore<FileStoreState> {
  name = 'file'

  @observable root: IFileTree

  fileState = observable(asMap<FileState>({}))

  constructor (parent: AbstractStore<any>, root?: IFileTree) {
    super(parent)
    this.root = root || {
      id: -1,
      type: FileType.ROOT,
      children: []
    }
  }

  clearSelection () {
    this.fileState.forEach((fs, key) => {
      if (fs === FileState.EXPANDED_AND_SELECTED) {
        this.fileState.set(key, FileState.EXPANDED)
      } else if (fs === FileState.SELECTED) {
        this.fileState.set(key, FileState.NONE)
      }
    })
  }

  createChild(parent: IFileTree, type: FileType, name: string) {
    const id = Math.floor(Math.random() * 1000) // TODO: Fix later
    if (parent.children instanceof Array) {
      parent.children.push({ id, type, name })
    }
  }

  deleteChild(parent: IFileTree, child: IFileTree) {
    if (parent.children instanceof Array) {
      parent.children.slice(1, parent.children.indexOf(child))
    }
  }

  deserialize({ root, fileState }: FileStoreState) {
    this.root = root
    for (let key in Object.keys(fileState)) {
      if (fileState.hasOwnProperty(key)) {
        this.fileState.set(key, fileState[key])
      }
    }
  }

  serialize(): FileStoreState {
    return toJS({
      root: this.root,
      fileState: this.fileState.toJS()
    })
  }
}

declare module './Store' {
  export interface Store {
    files: FileStore
  }

  export interface IStoreState {
    files: IFileTree
  }
}
