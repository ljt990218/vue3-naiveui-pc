import { createI18n } from 'vue-i18n'

/**
 * All i18n resources specified in the plugin `include` option can be loaded
 * at once using the import syntax
 */
import messages from '@intlify/unplugin-vue-i18n/messages'

/** 默认语言包名称 */
const FALLBACK_LOCALE = 'zhCN'

/** 多语言 picker columns */
export const languageColumns = [
  { text: '简体中文', value: 'zhCN' },
  { text: 'English', value: 'enUS' },
]

/** 获取当前语言对应的语言包名称 */
function getI18nLocale() {
  const locale = localStorage.getItem('language') || navigator.language
  for (const l of languageColumns) {
    const value = l.value as string
    if (value === locale)
      return locale // 存在当前语言的语言包
    else if (value.indexOf(locale) === 0)
      return value // 存在当前语言的任意地区的语言包
  }
  return FALLBACK_LOCALE // 使用默认语言包
}

export const i18n = createI18n({
  locale: getI18nLocale(),
  legacy: false,
  messages,
})

/** 当前语言 */
// locale.value = locale.value === 'zhCN' ? 'enUS' : 'zhCN'
export const locale = computed({
  get() {
    return i18n.global.locale.value
  },
  set(language: string) {
    localStorage.setItem('language', language)
    i18n.global.locale.value = language
  },
})
