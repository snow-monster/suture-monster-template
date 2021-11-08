import { Ref } from 'vue'
export type QueryItem = {
    label: string
    required?: boolean
    'x-component': string
    'x-component-props': any
}
export type MaybeRef<T> = T | Ref<T>
