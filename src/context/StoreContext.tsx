import {
  createContext,
  Dispatch,
  ReactElement,
  useContext,
  useEffect,
  useReducer
} from 'react'

interface Props {
  children : ReactElement | ReactElement[]
}

interface Action {
  type   : string
  key   ?: string
  keys  ?: string[]
  value ?: any
}

interface StoreContext {
  store    : StoreSchema
  dispatch : Dispatch<Action>
}

interface StoreSchema {
  [ k : string ] : any
}

const initialStore = {
  nickname    : undefined,
  isAvailable : false,
  pending     : {},
  status      : 'new'
}

const context = createContext<StoreContext | undefined>(undefined)

const reducer = (
  store  : StoreSchema,
  action : Action
) : StoreSchema => {
  switch (action.type) {
    case 'set':
      if (action.key !== undefined) {
        return { ...store, [action.key]: action.value }
      } else { return store }
    case 'update':
      return { ...store, ...action.value }
    case 'delete':
      if (Array.isArray(action.keys)) {
        for (const key of action.keys) {
          store[key] = undefined
        }
      } else if (action.key !== undefined) { 
        store[action.key] = undefined 
      }
      return { ...store }
    default:
      throw new Error('Invalid action!')
  }
}

export function StoreProvider (
  { children } : Props
) : ReactElement {
  const [ store, dispatch ] = useReducer(reducer, initialStore)

  useEffect(() => {
    console.log('Store:', store)
  }, [ store ])

  return (
    <context.Provider value={{ store, dispatch }}>
        {children}
    </context.Provider>
  )
}

export function useStoreContext () : StoreContext {
  const storeContext = useContext(context)
  if (storeContext === undefined) {
    throw new Error('Store is undefined!')
  }
  return storeContext
}
