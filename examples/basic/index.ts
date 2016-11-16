import { create } from '../../src'

create(document.getElementById('root') || document.body, {
  id: 'basic-example',
  files: {
    id: 0,
    type: 0,
    children: [
      {
        id: 1,
        type: 1,
        name: 'public',
        children: [
          {
            id: 2,
            type: 3,
            name: 'example2.js'
          }
        ]
      },
      {
        id: 3,
        type: 3,
        name: 'example.js'
      },
      {
        id: 4,
        type: 2,
        name: 'example.playground'
      }
    ]
  }
})
