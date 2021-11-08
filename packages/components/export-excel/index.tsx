import { defineComponent } from 'vue'

export default defineComponent({
    name: 'SnowedExportExcel',
    props: {
        action: {
            type: String,
            required: true,
        },
    },
    setup(props) {
        return () => {
            const url = props.action
            return <div>{url}</div>
        }
    },
})
