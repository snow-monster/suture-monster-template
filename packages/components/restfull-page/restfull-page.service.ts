import { Ref } from 'vue'
import axios from 'axios'
import QS from 'qs'
import { useRequest } from '@/hooks/use-request'

export function useServiceQuery(url: string, state: Ref) {
    return useRequest<unknown[]>(
        () => {
            return axios.get(url, {
                params: { ...state.value },
                paramsSerializer: function (params) {
                    return QS.stringify(params, { arrayFormat: 'repeat' })
                },
            })
        },
        {
            manual: true,
            ready: true,
            formatResult(data) {
                return data
            },
        }
    )
}
