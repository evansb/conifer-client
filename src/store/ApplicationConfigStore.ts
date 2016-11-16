import { observable, toJS, extendObservable } from 'mobx'
import { AbstractStore } from './AbstractStore'

const defaultConfig = require('./DefaultConfig.json')

export interface ApplicationConfig {
  name: string,
  version: string
}

export class ApplicationConfigStore extends AbstractStore<ApplicationConfig> {
  name = 'editor'

  @observable private config: ApplicationConfig

  constructor (parent: AbstractStore<any>, overrides?: ApplicationConfig) {
    super(parent)
    this.config = defaultConfig
    if (overrides) {
      extendObservable(this.config, overrides)
    }
  }

  current () {
    return toJS(this.config)
  }

  deserialize(config: ApplicationConfig) {
    extendObservable(this.config, config)
  }

  serialize(): ApplicationConfig {
    return toJS(this.config)
  }
}

declare module './Store' {
  export interface Store {
    config: ApplicationConfigStore
  }

  export interface IStoreState {
    config: ApplicationConfig
  }
}
