import { computed, observable, toJS, IObservableArray } from 'mobx'
import { AbstractStore } from './AbstractStore'


export interface Tab {
  id: number
}

export type TabGroup = Tab[]

export interface LayoutState {
  focusedGroup: number
  focusedTab?: number
  tabGroups: TabGroup[]
}

export class LayoutStore extends AbstractStore<LayoutState> {
  name = 'layout'

  tabGroups: IObservableArray<TabGroup> = observable([[]])

  @observable focusedGroup = 0
  @observable focusedTab?: number = undefined

  constructor (parent: AbstractStore<any>) {
    super(parent)
  }

  @computed get multiplier() {
    return 12 / this.tabGroups.length
  }

  splitGroup(index: number) {
    if (this.tabGroups.length <= 2) {
      this.tabGroups.splice(index - 1, 0, [])
    }
  }

  unsplitGroup(index: number) {
    if (this.tabGroups.length >= 2) {
      this.tabGroups.splice(index, 1)
    }
  }

  deserialize({ tabGroups, focusedTab, focusedGroup }: LayoutState) {
    this.focusedTab = focusedTab
    this.focusedGroup = focusedGroup
    this.tabGroups.replace(tabGroups)
  }

  serialize(): LayoutState {
    return toJS({
      focusedTab: this.focusedTab,
      focusedGroup: this.focusedGroup,
      tabGroups: this.tabGroups
    })
  }
}

declare module './Store' {
  export interface Store {
    layout: LayoutStore
  }

  export interface IStoreState {
    layout: LayoutStore
  }
}
