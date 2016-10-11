import { observable, toJS, computed, IObservableArray } from 'mobx'
import { AbstractStore } from './AbstractStore'

export class EditorStore extends AbstractStore<string[]> {
  name = 'editor'

  private editors: IObservableArray<string> = observable([])

  createEditor(text: string) {
    this.editors.push(text)
  }

  @computed get all() {
    return this.editors
  }

  deserialize(editors: string[]) {
    this.editors.replace(editors)
  }

  serialize(): string[] {
    return toJS(this.editors)
  }
}

declare module './Store' {
  export interface Store {
    editors: EditorStore
  }

  export interface IStoreState {
    editor: string[]
  }
}
