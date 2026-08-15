<script setup lang="ts">
</script>
<template>
    <div class="grid grid-cols-4 gap-4 h-full items-stretch w-full">
        <StatsCard 
        label="Study time" 
        value="2h 20 m"
        icon="i-lucide-clock"
        trend="up"
        delta="18%"
        footnote="vs yesterday"/>
         <StatsCard 
        label="Sessions" 
        value="3"
        icon="i-lucide-alarm-clock-check"
        trend="flat"
        footnote="as daily average"/>
         <StatsCard 
        label="Task completed" 
        value="5"
        icon="i-lucide-square-check-big"
        trend="up"
        delta="2"
        footnote="more than yesterday"/>
        <StatsCard 
        label="Current streak" 
        value="9"
        icon="i-lucide-flame"
        trend="up"
        color="amber"/>
    </div>
       


</template>