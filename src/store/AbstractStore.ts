
export abstract class AbstractStore<T> {
  static Root: AbstractStore<any>

  protected childStores: { [name: string]: AbstractStore<any> } = {}

  abstract name: string
  abstract serialize(): T
  abstract deserialize(state: T)

  constructor(parentStore?: AbstractStore<any>) {
    if (parentStore) {
      parentStore.addChildStore(this)
    }
  }

  protected visitChildStores(visitor: (store: AbstractStore<any>) => any) {
    const storeNames = Object.keys(this.childStores)
    for (let storeName of storeNames) {
      if (this.childStores.hasOwnProperty(storeName)) {
        visitor(this.childStores[storeName])
      }
    }
  }

  addChildStore(store: AbstractStore<any>) {
    this.childStores[store.name] = store
  }
}
