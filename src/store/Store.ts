import { AbstractStore } from './AbstractStore'

export interface IStoreState {
  id: string
}

export class Store extends AbstractStore<any> {
  name = 'root'

  constructor(public readonly id: string) {
    super()
    Store.Root = this
  }

  serialize() {
    const serializedState = {
      id: this.id
    }
    this.visitChildStores((store) => {
      serializedState[store.name] = store.serialize()
    })
    return serializedState
  }

  deserialize(state: any) {
    this.visitChildStores((store) => {
      store.deserialize(state[store.name])
    })
  }
}
