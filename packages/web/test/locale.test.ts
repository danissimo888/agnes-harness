/** @vitest-environment happy-dom */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  bindWebLocaleSelector,
  disposeWebLocale,
  initializeWebLocale,
  readWebLocale,
  setWebLocale,
  translateWebText,
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
      <span id="connection">本地后台已连接</span>
      <button id="disconnect" aria-label="断开连接" title="断开连接"></button>
      <span id="status">已完成</span>
      <textarea id="prompt" placeholder="描述你想完成的事…">取消</textarea>
      <select id="agnes-locale"><option value="zh-CN">简体中文</option><option value="en">English</option></select>
      <section id="conversation-shell"><div id="transcript"><p>取消</p><p>模型回复不应翻译</p></div></section>
      <section id="empty-state"><h2>Agnes Harness</h2><p>让每一个模型，都能成为会做事的智能体。</p></section>
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
    expect(document.getElementById('connection')?.textContent).toBe('Connected to the local backend')
    expect(document.getElementById('status')?.textContent).toBe('Completed')
    expect(document.getElementById('disconnect')?.getAttribute('title')).toBe('Disconnect')
    expect(document.getElementById('prompt')?.getAttribute('placeholder')).toBe(
      'Describe what you want to accomplish…',
    )
    expect(document.querySelector('#empty-state p')?.textContent).toBe(
      'Turn every model into an agent that gets things done.',
    )
    expect(storage.value(WEB_LOCALE_STORAGE_KEY)).toBe('en')

    setWebLocale('zh-CN')
    expect(document.documentElement.lang).toBe('zh-CN')
    expect(document.getElementById('cancel')?.textContent).toBe('取消')
    expect(document.getElementById('connection')?.textContent).toBe('本地后台已连接')
    expect(document.getElementById('status')?.textContent).toBe('已完成')
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
    const settings = document.createElement('div')
    settings.innerHTML = `
      <p class="dialog-intro">选择 Agnes 执行任务的目录。已有文件不会被移动或复制。</p>
      <section aria-label="孤儿运行时 pin"></section>
      <div class="plugin-tabs" role="tablist" aria-label="插件视图"></div>
      <input type="search" placeholder="筛选当前已安装列表" aria-label="筛选当前已安装列表">
      <article class="plugin-row" aria-label="查看 @agnes/mcp-helper 的详情">
        <h2 data-locale-exempt>@agnes/mcp-helper</h2><p>未报告贡献</p>
      </article>
      <summary>技能来源 6 个 · 已扫描 1 · 未发现技能 5</summary>
      <div class="resource-empty"><h2>还没有 MCP 服务</h2><p>添加一个 MCP 服务后，可以在这里查看连接和启用状态。</p></div>`
    document.body.append(settings)
    await vi.waitFor(() => {
      expect(settings.querySelector('.dialog-intro')?.textContent).toBe(
        'Choose the directory where Agnes runs tasks. Existing files will not be moved or copied.',
      )
      expect(settings.querySelector('section')?.getAttribute('aria-label')).toBe('Orphan runtime pins')
      expect(settings.querySelector('.plugin-tabs')?.getAttribute('aria-label')).toBe('Plugin view')
      expect(settings.querySelector('input')?.getAttribute('placeholder')).toBe('Filter installed plugins')
      expect(settings.querySelector('input')?.getAttribute('aria-label')).toBe('Filter installed plugins')
      expect(settings.querySelector('.plugin-row')?.getAttribute('aria-label')).toBe(
        'View details for @agnes/mcp-helper',
      )
      expect(settings.querySelector('.plugin-row p')?.textContent).toBe('No contributions reported')
      expect(settings.querySelector('summary')?.textContent).toBe('Skill sources 6 · scanned 1 · no Skills 5')
      expect(settings.querySelector('.resource-empty h2')?.textContent).toBe('No MCP services yet')
      expect(settings.querySelector('.resource-empty p')?.textContent).toBe(
        'Add an MCP service to view its connection and activation status here.',
      )
    })
  })

  it('translates live status, tooltip and placeholder updates and restores their latest sources', async () => {
    initializeWebLocale(fakeStorage({ [WEB_LOCALE_STORAGE_KEY]: 'en' }))
    const prompt = document.getElementById('prompt') as HTMLTextAreaElement
    const disconnect = document.getElementById('disconnect') as HTMLButtonElement
    const status = document.getElementById('status') as HTMLElement
    prompt.placeholder = '补充下一轮要做的事…'
    disconnect.title = '打开导航'
    status.textContent = '正在执行 · 生成回复'
    await vi.waitFor(() => {
      expect(prompt.placeholder).toBe('Add instructions for the next turn…')
      expect(disconnect.title).toBe('Open navigation')
      expect(status.textContent).toBe('Running · Generating a response')
    })
    setWebLocale('zh-CN')
    expect(prompt.placeholder).toBe('补充下一轮要做的事…')
    expect(disconnect.title).toBe('打开导航')
    expect(status.textContent).toBe('正在执行 · 生成回复')
    expect(prompt.value).toBe('取消')
  })

  it('translates conversation and trace controls while preserving message bodies and technical values', () => {
    const transcript = document.getElementById('transcript') as HTMLElement
    transcript.innerHTML = `
      <p class="node-label">你</p><div class="node-body markdown">已完成<button class="code-copy">复制</button></div>
      <p class="turn-status">已完成 · 用时 2 秒</p>
      <span data-locale-exempt>设置</span>`
    document.body.insertAdjacentHTML(
      'beforeend',
      `
      <section id="trace-panel"><div data-locale-ui>
        <button title="展开所有轮次">展开轮次</button><pre class="trace-pre">已完成</pre>
        <div class="trace-field-value" data-locale-value="literal">小</div>
      </div></section>`,
    )
    initializeWebLocale(fakeStorage({ [WEB_LOCALE_STORAGE_KEY]: 'en' }))
    expect(document.querySelector('.node-label')?.textContent).toBe('You')
    expect(document.querySelector('.node-body')?.textContent).toBe('已完成Copy')
    expect(document.querySelector('.turn-status')?.textContent).toBe('Completed · elapsed 2 s')
    expect(document.querySelector('[data-locale-exempt]')?.textContent).toBe('设置')
    expect(document.querySelector('#trace-panel button')?.getAttribute('title')).toBe('Expand all turns')
    expect(document.querySelector('.trace-pre')?.textContent).toBe('已完成')
    expect(document.querySelector('.trace-field-value')?.textContent).toBe('小')
  })

  it('translates native confirmations and interpolated UI grammar without changing identifiers', () => {
    initializeWebLocale(fakeStorage({ [WEB_LOCALE_STORAGE_KEY]: 'en' }))
    expect(translateWebText('是否允许插件 设置 执行命令“取消”（服务：小）？')).toBe(
      'Allow plugin 设置 to run “取消” (service: 小)?',
    )
    expect(
      translateWebText('第 3 步：连接成功，发现 2 个模型。确认或选择默认模型后保存；当前会话模型不会改变。'),
    ).toBe(
      'Step 3: connection succeeded; found 2 models. Choose the default model and save; the current task model will not change.',
    )
    expect(translateWebText('入口：C:\\设置\\取消.ts')).toBe('Entry: C:\\设置\\取消.ts')
    expect(translateWebText('当前会话模型：小')).toBe('Current task model: 小')
    expect(translateWebText('启用：已完成')).toBe('Enable: Completed')
    expect(translateWebText('技能来源 2 个 · 已扫描 1 · 未发现技能 1')).toBe(
      'Skill sources 2 · scanned 1 · no Skills 1',
    )
    expect(translateWebText('允许工具中有重复项：「取消」。')).toBe('Duplicate allowed tool: “取消”.')
    expect(translateWebText('参数最多 20 个，每行一个。')).toBe('At most 20 arguments, one per line.')
    expect(translateWebText('资源链接 · 未命名资源 · text/plain')).toBe(
      'Resource link · unnamed resource · text/plain',
    )
    expect(
      translateWebText(
        '启用 MCP「设置」\n版本：取消\n\n确认后将提交到本地后台，并按当前版本和策略完成安全校验。',
      ),
    ).toBe(
      'Enable MCP “设置”\nVersion: 取消\n\nConfirmation submits this to the local backend for safety checks against the current version and policy.',
    )
    expect(
      translateWebText('模型回复达到输出额度，本轮已停止。请要求分步生成，或调整请求输出额度后继续。'),
    ).toBe(
      'The model response reached the output allowance, so this turn stopped. Ask for output in smaller steps, or adjust the request output allowance before continuing.',
    )
    expect(
      translateWebText(
        '模型服务返回限流错误（HTTP 429）。请稍后重试；若持续出现，请检查该账号的服务额度或联系模型服务方。',
      ),
    ).toBe(
      "The model service returned a rate-limit error (HTTP 429). Please try again later. If it continues, check this account's service quota or contact the model service provider.",
    )
  })
})
