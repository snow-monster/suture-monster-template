import { ref } from 'vue'
import type { Ref } from 'vue'
import { isFunction } from '../utils/is'
function useState<T, R>(initialState: T | (() => T)) {
    const innerState = isFunction(initialState)
        ? (initialState as any)()
        : initialState
    const state = ref(innerState) as Ref<T>
    const setState = (newValue: T) => (state.value = newValue)
    return [state, setState]
}
export default useState
