<template>
    <div class="grid mx-auto max-w-3xl">
        <p class="text-4xl text-highlighted">Today</p>
        <p class="text-2xl">{{ today }}</p>
    </div>
</template>
<script setup lang="ts">
    const today = ref('')
    
    function formatDate(date = new Date()) {
        const day = date.getDate()
        const month = date.toLocaleDateString('en-US', { month: 'long' })
        const year = date.getFullYear()
        const weekday = date.toLocaleDateString('en-US', { weekday: 'long' })
        // ordinal suffix
        const suffix = (d:number) => {
            if (d > 3 && d < 21) return 'th'
            switch (d % 10) {
            case 1: return 'st'
            case 2: return 'nd'
            case 3: return 'rd'
            default: return 'th'
            }
        }
        return `${day}${suffix(day)} ${month} ${year}`
        }
    
    onMounted(() => {
    today.value = formatDate()
    
    })
</script>