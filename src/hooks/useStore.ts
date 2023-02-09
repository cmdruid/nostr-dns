import { useStoreContext } from '@/context/StoreContext'

// interface StoreController {
//   store    : StoreSchema
//   dispatch : Dispatch<Action>
//   set      : (key   : string, value : any) => void
//   update   : (store : any)      => void
//   del      : (key   : string)   => void
//   clear    : (keys  : string[]) => void
// }

export default function useStore() {
  const { store, dispatch } = useStoreContext()
  const methods = {
    set: (key : string, value : any) => {
      dispatch({ type: 'set', key, value })
    },
    update: (store : Record<string, any>) => {
      dispatch({ type: 'update', value: store })
    },
    del: (key : string) => {
      dispatch({ type: 'delete', key })
    },
    clear: (keys : string[]) => {
      dispatch({ type: 'delete', keys })
    }
  }
  return { store, dispatch, ...methods }
}
