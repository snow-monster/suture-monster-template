import moment from 'moment'
export default function App() {
    const columns = [
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: '住址',
            dataIndex: 'address',
            key: 'address',
        },
    ]
    return (
        <div>
            <snowed-restfull-page
                action="/testadadsadadadasd/sadadadsa"
                queryItems={[
                    {
                        label: '输入名称',
                        required: true,
                        key: 'date',
                        'x-component': 'a-input',
                        'x-component-props': {
                            placeholder: '请输入名称',
                            defaultValue: 2313131,
                        },
                    },
                    {
                        label: '选择日期',
                        required: true,
                        'x-component': 'a-date-picker',
                        'x-component-props': {
                            placeholder: '请输入名称',
                        },
                    },
                ]}
                columns={columns}
                size="small"
                bordered
            />
        </div>
    )
}
