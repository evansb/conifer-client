import { observable, toJS, computed, IObservableValue } from 'mobx'
import { AbstractStore } from './AbstractStore'

export interface SidebarState {
  toggled: boolean
}

export class SidebarStore extends AbstractStore<SidebarState> {
  name = 'sidebar'

  toggled: IObservableValue<boolean> = observable(false)

  deserialize(state: SidebarState) {
    this.toggled.set(state.toggled)
  }

  serialize(): SidebarState {
    return {
      toggled: toJS(this.toggled)
    }
  }
}

declare module './Store' {
  export interface Store {
    sidebar: SidebarStore
  }

  export interface IStoreState {
    sidebar: SidebarState
  }
}
