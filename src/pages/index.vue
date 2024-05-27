<script setup lang="ts">
import { queryProse } from '@/api/index'

definePage({
  name: 'home',
  meta: {
    level: 1,
  },
})

const message = ref('')
function getProse() {
  queryProse().then((res: any) => {
    if (res.code === 0)
      message.value = res.result
  })
}
getProse()
</script>

<template>
  <div class="h-200vh pt-80 text-center text-20">
    index
    <div class="color-yellow">
      {{ message }}
    </div>
  </div>
</template>
