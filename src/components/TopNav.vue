<script setup lang="ts">
import useAppStore from '@/stores/modules/app'

const appStore = useAppStore()
const route = useRoute()
const { t } = useI18n()

const topNavList = [
  {
    id: 1,
    name: t('topNav.home'),
    path: '/',
  },
  {
    id: 2,
    name: t('topNav.mine'),
    path: '/mine',
  },
  {
    id: 3,
    name: t('topNav.about'),
    path: '/about',
  },
]
const display = computed(() => {
  if (route.meta.level && route.meta.level !== 2)
    return true
  return false
})

const mode = computed(() => {
  return appStore.mode === 'dark'
})
function swithMode() {
  toggleDark()
  appStore.swithMode(appStore.mode === 'dark' ? 'light' : 'dark')
}
</script>

<template>
  <transition name="fade" mode="out-in" class="duration-200">
    <div
      v-show="display" class="flex-center-center fixed left-50% h-60 w-1700 bg-white pt-20 shadow -translate-x-1/2"
    >
      <div
        v-for="item in topNavList" :key="item.id" class="mx-10 cursor-pointer text-24"
        :class="route.path === item.path ? 'text-blue' : 'text-black'"
        @click="$router.push(item.path)"
      >
        {{ item.name }}
      </div>
    </div>
  </transition>

  <div class="fixed right-20 top-20">
    <n-switch v-model:value="mode" size="large" @update:value="swithMode">
      <template #checked-icon>
        <div class="i-carbon:light h-1em w-1em" />
      </template>
      <template #unchecked-icon>
        <div class="i-carbon:moon h-1em w-1em" />
      </template>
    </n-switch>
  </div>
</template>
