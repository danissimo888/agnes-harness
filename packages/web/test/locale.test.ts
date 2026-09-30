/** @vitest-environment happy-dom */
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import {
  bindWebLocaleSelector,
  disposeWebLocale,
  initializeWebLocale,
  readWebLocale,
  setWebLocale,
  WEB_LOCALE_STORAGE_KEY,
  writeWebLocale,
} from '../src/locale.js'

function fakeStorage(initial: Record<string, string> = {}) {
  const values = new Map(Object.entries(initial))
  return {
    getItem(key: string): string | null {
      return values.get(key) ?? null
    },
    setItem(key: string, value: string): void {
      values.set(key, value)
    },
    value(key: string): string | undefined {
      return values.get(key)
    },
  }
}

beforeEach(() => {
  document.documentElement.innerHTML = `
    <head></head>
    <body>
      <button id="cancel">取消</button>
      <select id="agnes-locale"><option value="zh-CN">简体中文</option><option value="en">English</option></select>
      <section id="conversation-shell"><p>取消</p><p>模型回复不应翻译</p></section>
      <span class="session-title">设置</span>
    </body>
  `
})

afterEach(() => disposeWebLocale())

describe('web locale persistence', () => {
  it('validates stored values and writes the selected locale', () => {
    const storage = fakeStorage({ [WEB_LOCALE_STORAGE_KEY]: 'en' })
    expect(readWebLocale(storage)).toBe('en')
    writeWebLocale(storage, 'zh-CN')
    expect(storage.value(WEB_LOCALE_STORAGE_KEY)).toBe('zh-CN')
    expect(readWebLocale(fakeStorage({ [WEB_LOCALE_STORAGE_KEY]: 'fr' }))).toBe('zh-CN')
  })

  it('switches the interface immediately and restores it without a reload', () => {
    const storage = fakeStorage()
    initializeWebLocale(storage)
    const disposeSelector = bindWebLocaleSelector()

    setWebLocale('en')
    expect(document.documentElement.lang).toBe('en')
    expect(document.getElementById('cancel')?.textContent).toBe('Cancel')
    expect(storage.value(WEB_LOCALE_STORAGE_KEY)).toBe('en')

    setWebLocale('zh-CN')
    expect(document.documentElement.lang).toBe('zh-CN')
    expect(document.getElementById('cancel')?.textContent).toBe('取消')
    expect((document.getElementById('agnes-locale') as HTMLSelectElement).value).toBe('zh-CN')
    disposeSelector()
  })

  it('applies a stored locale when the page initializes', () => {
    const storage = fakeStorage({ [WEB_LOCALE_STORAGE_KEY]: 'en' })
    initializeWebLocale(storage)
    bindWebLocaleSelector()
    expect(document.documentElement.lang).toBe('en')
    expect(document.getElementById('cancel')?.textContent).toBe('Cancel')
    expect((document.getElementById('agnes-locale') as HTMLSelectElement).value).toBe('en')
  })

  it('does not translate conversation text or user-authored session names', () => {
    initializeWebLocale(fakeStorage())
    setWebLocale('en')
    expect(document.querySelector('#conversation-shell')?.textContent).toContain('取消')
    expect(document.querySelector('.session-title')?.textContent).toBe('设置')
  })

  it('translates interface nodes added after the language switch', async () => {
    initializeWebLocale(fakeStorage())
    setWebLocale('en')
    const button = document.createElement('button')
    button.textContent = '取消'
    document.body.append(button)
    await Promise.resolve()
    expect(button.textContent).toBe('Cancel')
  })
})
