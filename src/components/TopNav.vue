<script setup lang="ts">
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
</script>

<template>
  <transition name="fade" mode="out-in">
    <div v-show="display" class="topNav flex-center-center h-60 max-w-1200">
      <div
        v-for="item in topNavList" :key="item.id" class="item mx-10 cursor-pointer text-24"
        @click="$router.push(item.path)"
      >
        {{ item.name }}
      </div>
    </div>
  </transition>
</template>

<style lang="less" scoped>
.topNav {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);

  transition: all 1s;
}

.item {
}
</style>
