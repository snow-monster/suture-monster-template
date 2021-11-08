<template>
    <component :is="is"></component>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    props: {
        is: {
            type: String,
            required: true,
        },
    },
})
</script>
