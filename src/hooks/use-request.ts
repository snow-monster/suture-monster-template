import { ref, reactive, toRefs, onMounted, onBeforeUnmount, Ref } from 'vue'
import axios, { AxiosPromise, AxiosRequestConfig } from 'axios'
interface UseRequestService {
    (): AxiosPromise<any> | Promise<any>
}
interface UseRequestOptions {
    manual?: boolean
    pollingInterval?: number
    ready?: boolean
    formatResult?: (data: any) => any
    // 待实现 -s
    defaultParams?: any[]
    pollingWhenHidden?: boolean
    // 我们可以智能的实现在屏幕隐藏时，暂停轮询。等屏幕恢复可见时，继续请求，以节省资源。
    debounceInterval?: number
    // 节流与防抖是同样的道理，只需要配置了 throttleInterval ，即可实现节流功能。
    throttleInterval?: number
}
type MaybeRef<T> = Ref<T> | T
interface UseRequestState<T> {
    loading: MaybeRef<boolean>
    data: MaybeRef<T | undefined>
    error: MaybeRef<undefined | string | unknown>
    run: MaybeRef<any>
}
export function useRequest<T>(
    service: UseRequestService | string | AxiosRequestConfig,
    options?: UseRequestOptions
) {
    const state = reactive<UseRequestState<T>>({
        loading: false,
        data: undefined,
        error: undefined,
        run: function () {
            console.log('run need set options property manual true')
        },
    })
    const timer = ref()
    let promiseService: any
    if (typeof service === 'function') {
        // 该用法为 服务函数 示例
        promiseService = service
    }
    if (typeof service === 'string') {
        // 该用法为 /api/urls 示例
        promiseService = () => axios.get(service)
    }
    if (typeof service === 'object') {
        // 以下模块带改动，暂时不能使用
        promiseService = () => axios(service)
        // 该用法为 { url, }  axios的配置项示例
    }
    const serviceFn = async (values?: any) => {
        try {
            state.loading = true
            const { status, data, statusText } = await promiseService(values)
            if (status === 200) {
                if (options && options.formatResult) {
                    state.data = options.formatResult(data)
                } else {
                    state.data = data
                }
            } else {
                state.error = statusText
            }
        } catch (error) {
            state.error = error
            console.error(error)
        }
        state.loading = false
    }
    onMounted(() => {
        if (options && options.manual) {
            state.run = serviceFn
            if (options.ready) {
                serviceFn()
            }
        } else {
            serviceFn()
        }
        if (options && options.pollingInterval) {
            timer.value = setInterval(() => {
                serviceFn()
            }, options.pollingInterval)
        }
    })
    onBeforeUnmount(() => {
        clearInterval(timer.value)
        timer.value = null
    })
    return {
        ...toRefs(state),
    }
}
