<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { darkTheme, dateZhCN, zhCN } from 'naive-ui'
import useAppStore from '@/stores/modules/app'
import useRouteCache from '@/stores/modules/routeCache'
import useAutoThemeSwitcher from '@/hooks/useAutoThemeSwitcher'
import { locale } from '@/utils/i18n'

useHead({
  title: 'Vue3 Naiveui PC',
  meta: [
    {
      name: 'description',
      content: 'Vue + Vite PC Starter Template',
    },
    {
      name: 'theme-color',
      content: () => isDark.value ? '#00aba9' : '#ffffff',
    },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: () => preferredDark.value ? '/favicon-dark.svg' : '/favicon.svg',
    },
  ],
})

const appStore = useAppStore()
const { mode } = storeToRefs(appStore)

const { initializeThemeSwitcher } = useAutoThemeSwitcher(appStore)

const keepAliveRouteNames = computed(() => {
  return useRouteCache().routeCaches as string[]
})

const language = computed(() => {
  return locale.value === 'zhCN' ? zhCN : null
})
const dateLanguage = computed(() => {
  return locale.value === 'zhCN' ? dateZhCN : null
})
const theme = computed(() => {
  return mode.value === 'dark' ? darkTheme : null
})

onMounted(() => {
  initializeThemeSwitcher()
})
</script>

<template>
  <NMessageProvider>
    <MessageApi />
  </NMessageProvider>

  <NConfigProvider :locale="language" :date-locale="dateLanguage" :theme="theme">
    <TopNav />
    <router-view v-slot="{ Component, route }">
      <transition name="fade" mode="out-in">
        <keep-alive :include="keepAliveRouteNames">
          <component :is="Component" :key="route.name" />
        </keep-alive>
      </transition>
    </router-view>
    <n-global-style />
  </NConfigProvider>

  <n-back-top :right="100" />
</template>
