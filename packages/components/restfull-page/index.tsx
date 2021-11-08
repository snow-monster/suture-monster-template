import { defineComponent, reactive, computed, h } from 'vue'
import type { PropType } from 'vue'
import { Spin, Table, Form, Button } from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import type { QueryItem } from '@/types/index'
import Component from './Component.vue'
const FormItem = Form.Item

import { useServiceQuery } from './restfull-page.service'

const createQueryFormItem = (queryItems: QueryItem[]) => {
    return queryItems.map((item) => {
        const label = item.label
        const required = item?.required
        const componentName = item['x-component']
        const componentProps = item['x-component-props']
        return (
            <FormItem label={label} required={required}>
                {h(Component, {
                    is: componentName,
                    ...componentProps,
                })}
            </FormItem>
        )
    })
}
export default defineComponent({
    name: 'SnowedRestfullPage',
    props: {
        action: {
            type: String,
            required: true,
        },
        queryItems: {
            type: Array as PropType<QueryItem[]>,
            required: true,
        },
        columns: {
            type: Array,
            requrey: true,
        },
    },
    setup(props, { attrs }) {
        const state = reactive({})
        const queryState = computed(() => state)
        const { loading, data, error, run } = useServiceQuery(
            props.action,
            queryState
        )
        return () => {
            return (
                <Spin spinning={loading.value}>
                    <Form layout="inline" style={{ margin: '16px' }}>
                        {props.queryItems.map((item) => {
                            const label = item.label
                            const required = item?.required
                            const componentName = item['x-component']
                            const componentProps = item['x-component-props']
                            return (
                                <FormItem label={label} required={required}>
                                    {h(Component, {
                                        is: componentName,
                                        ...componentProps,
                                    })}
                                </FormItem>
                            )
                        })}
                        <FormItem>
                            <Button onClick={run.value} type="primary">
                                查询
                            </Button>
                        </FormItem>
                        <FormItem>
                            <Button onClick={run.value} type="primary">
                                新建
                            </Button>
                        </FormItem>
                    </Form>
                    <Table
                        columns={props.columns}
                        dataSource={data.value}
                        {...attrs}
                    ></Table>
                    {props.columns}
                </Spin>
            )
        }
    },
})
