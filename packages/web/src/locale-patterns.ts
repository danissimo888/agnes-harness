/** Translate UI grammar around values without translating the values themselves. */
export function createUiPatternTranslator(
  label: (text: string) => string,
): (source: string) => string | undefined {
  const patterns: ReadonlyArray<readonly [RegExp, (...parts: string[]) => string]> = [
    [
      /^请求(启用|停用) (Skill|MCP)「(.+)」\n版本：([^\n]+)$/,
      (action, kind, name, version) =>
        `Request ${action === '启用' ? 'enable' : 'disable'} ${kind} “${name}”\nVersion: ${version}`,
    ],
    [
      /^(启用|停用|测试|重连|移除|更新) (Skill|MCP)「(.+)」\n版本：([^\n]+)(?:\n(.+))?$/,
      (action, kind, name, version, note) =>
        `${({ 启用: 'Enable', 停用: 'Disable', 测试: 'Test', 重连: 'Reconnect', 移除: 'Remove', 更新: 'Update' } as Record<string, string>)[action]} ${kind} “${name}”\nVersion: ${version}${note ? `\n${label(note)}` : ''}`,
    ],
    [
      /^创建 MCP「(.+)」\n它将以停用状态保存，可在检查后直接启用。$/,
      (name) => `Create MCP “${name}”\nIt will be saved as disabled and can be enabled after inspection.`,
    ],
    [
      /^MCP「(.+)」已创建，但尚未可用：请检查配置后点击「启用」。$/,
      (name) =>
        `MCP “${name}” was created but is not available yet. Check its configuration, then click “Enable”.`,
    ],
    [
      /^永久删除 Skill「(.+)」及目录中的全部文件。不可恢复；同名的其他来源可能接替生效。用户目录中的 Skill 可能也被其他应用使用。$/,
      (name) =>
        `Permanently delete Skill “${name}” and every file in its directory. This cannot be undone. Another source with the same name may take over. Other apps may also use this Skill in the user directory.`,
    ],
    [
      /^调整同名 Skill「(.+)」的覆盖优先级：(\d+) → (\d+)。不会改变启用状态。$/,
      (name, previous, next) =>
        `Change the override priority of Skill “${name}”: ${previous} → ${next}. Its enabled state is unchanged.`,
    ],
    [
      /^未识别的传输方式：(.+)，请刷新页面后重试。$/,
      (transport) => `Unknown transport: ${transport}. Refresh the page and try again.`,
    ],
    [/^参数最多 (\d+) 个，每行一个。$/, (n) => `At most ${n} arguments, one per line.`],
    [
      /^第 (\d+) 个参数不合法：不能是 -c 或 \/c，也不能为空。$/,
      (n) => `Argument ${n} is invalid: it cannot be -c, /c, or empty.`,
    ],
    [
      /^第 (\d+) 项环境变量名不合法：需大写字母开头（不能是 PATH\/HOME 等保留名）。$/,
      (n) =>
        `Environment variable ${n} is invalid: start with an uppercase letter and avoid reserved names such as PATH/HOME.`,
    ],
    [
      /^第 (\d+) 项需形如 TOKEN=secret:\/\/namespace\/name。$/,
      (n) => `Entry ${n} must use TOKEN=secret://namespace/name.`,
    ],
    [/^允许工具最多 (\d+) 个。$/, (n) => `At most ${n} allowed tools.`],
    [
      /^第 (\d+) 个工具名不合法：需以字母开头，只能含字母、数字、下划线、点、连字符。$/,
      (n) =>
        `Tool name ${n} is invalid: start with a letter and use only letters, numbers, underscores, dots, or hyphens.`,
    ],
    [/^允许工具中有重复项：「(.+)」。$/, (name) => `Duplicate allowed tool: “${name}”.`],
    [/^(\d+(?:\.\d+)?) 毫秒$/, (n) => `${n} ms`],
    [/^(\d+(?:\.\d+)?) 秒$/, (n) => `${n} s`],
    [/^(\d+) 分 (\d+) 秒$/, (m, s) => `${m} min ${s} s`],
    [
      /^(.+) · 用时 (.+)$/,
      (status, duration) => `${label(status)} · elapsed ${translateUiPattern(duration) ?? duration}`,
    ],
    [
      /^(正在执行) · (生成回复|执行工具|检查下一步|整理上下文|等待外部结果|处理停止请求|处理执行失败)$/,
      (status, phase) => `${label(status)} · ${label(phase)}`,
    ],
    [/^新会话将使用「(.+)」。$/, (permission) => `The new task will use “${label(permission)}”.`],
    [/^本会话权限已设为「(.+)」。$/, (permission) => `Task permissions are now “${label(permission)}”.`],
    [
      /^第 3 步：连接成功，发现 (\d+) 个模型。确认或选择默认模型后保存；当前会话模型不会改变。$/,
      (n) =>
        `Step 3: connection succeeded; found ${n} models. Choose the default model and save; the current task model will not change.`,
    ],
    [
      /^macOS 仍需授权：(.+)。点击后由系统设置窗口完成。$/,
      (permissions) =>
        `macOS still requires permission: ${permissions.split('、').map(label).join(', ')}. Complete authorization in System Settings.`,
    ],
    [
      /^(.+) 可以重试、选择侧栏其他任务，或新建任务。$/,
      (message) => `${label(message)} Retry, select another task in the sidebar, or create a task.`,
    ],
    [
      /^此类型的引用必须以“(.+)”开头，例如 (.+)$/,
      (prefix, example) => `This reference must start with “${prefix}”, for example ${example}`,
    ],
    [
      /^是否允许插件 (.+) 执行命令“(.+)”（服务：(.+)）？$/,
      (owner, command, service) => `Allow plugin ${owner} to run “${command}” (service: ${service})?`,
    ],
    [
      /^是否允许插件 (.+) 执行命令“(.+)”？$/,
      (owner, command) => `Allow plugin ${owner} to run “${command}”?`,
    ],
    [
      /^(查看|关闭) (.+) 的详情$/,
      (action, name) => `${action === '查看' ? 'View' : 'Close'} details for ${name}`,
    ],
    [/^打开 (.+) 的 (.+) 页面 (.+)$/, (name, page, version) => `Open ${page} page for ${name} ${version}`],
    [/^打开 (.+) 登录页面$/, (name) => `Open ${name} sign-in page`],
    [/^回滚 (.+) 到 (.+)$/, (name, version) => `Roll back ${name} to ${version}`],
    [/^释放全部孤儿 pin（共 (\d+) 个）$/, (n) => `Release all orphan pins (${n})`],
    [
      /^(\d+) 个 pin 已不再是孤儿，无需释放。$/,
      (n) => `${n} pins are no longer orphaned and do not need releasing.`,
    ],
    [/^(.+)。已读取最新状态。$/, (message) => `${label(message)}. The latest state has been loaded.`],
    [/^(.+) · 订阅登录$/, (name) => `${name} · subscription sign-in`],
    [/^(.+)，另有 (\d+) 项$/, (items, n) => `${items}; ${n} more`],
    [
      /^(期望启用|期望停用) · (.+?)( · 旧资源待清理)?$/,
      (desired, actual, cleanup) =>
        `${label(desired)} · ${label(actual)}${cleanup ? ' · old resources awaiting cleanup' : ''}`,
    ],
    [
      /^(预览|安装|启用前校验|安全状态更新|启用|停用|更新|回滚|卸载)：(.+?)( · 后台允许重试)?$/,
      (operation, status, retry) =>
        `${label(operation)}: ${label(status)}${retry ? ' · retry allowed by the backend' : ''}`,
    ],
    [
      /^(依赖关系|Profile 配置|运行代际|部署引用|安全策略|兼容性|未知贡献)阻止此操作(：.*)?$/,
      (kind, references) =>
        `${label(kind)} block this operation${references ? `: ${references.slice(1)}` : ''}`,
    ],
    [
      /^工具：前缀 (.+)；名称 (.+)$/,
      (prefix, names) => `Tools: prefix ${prefix === '（无前缀）' ? '(none)' : prefix}; names ${names}`,
    ],
    [
      /^工具：前缀 (.+)；未报告具体名称$/,
      (prefix) => `Tools: prefix ${prefix === '（无前缀）' ? '(none)' : prefix}; no specific names reported`,
    ],
    [
      /^(调用其他工具|事件|工件|公开网页读取|子代理)：(允许|不允许|允许（匿名、限额）)$/,
      (kind, allowed) =>
        `${({ 调用其他工具: 'Invoke other tools', 事件: 'Events', 工件: 'Artifacts', 公开网页读取: 'Public web reads', 子代理: 'Subagents' } as Record<string, string>)[kind]}: ${label(allowed)}`,
    ],
    [
      /^服务：(.+)（(.+)，超时 (\d+)ms）$/,
      (name, kind, timeout) => `Service: ${name} (${kind}, timeout ${timeout}ms)`,
    ],
    [
      /^投影：(.+)（输入 (.+)，状态上限 (\d+) B）$/,
      (name, input, size) => `Projection: ${name} (input ${input}, state limit ${size} B)`,
    ],
    [
      /^Web 宿主暂不支持：(.+)；安装后不会发布浏览器 UI。$/,
      (slots) =>
        `The Web host does not support: ${slots}; browser UI will not be published after installation.`,
    ],
    [/^被遮蔽的候选（(\d+)）$/, (n) => `Shadowed candidates (${n})`],
    [/^工具目录（(\d+)）$/, (n) => `Tool catalog (${n})`],
    [
      /^技能来源 (\d+) 个 · 已扫描 (\d+) · 未发现技能 (\d+)(?: · 失败 (\d+))?$/,
      (all, scanned, empty, failed) =>
        `Skill sources ${all} · scanned ${scanned} · no Skills ${empty}${failed ? ` · failed ${failed}` : ''}`,
    ],
    [
      /^(.+) · 优先级 (.+) · (当前 winner|非 winner)$/,
      (source, priority, winner) => `${source} · priority ${priority} · ${label(winner)}`,
    ],
    [/^凭据 (.+) · 允许 (\d+) 个工具$/, (credential, n) => `Credentials ${credential} · ${n} tools allowed`],
    [/^凭据 (.+) · 未限制工具$/, (credential) => `Credentials ${credential} · tools unrestricted`],
    [/^(.+) · 凭据：(.+)$/, (transport, credential) => `${transport} · credentials: ${credential}`],
    [/^(\d+) 张图片$/, (n) => `${n} image${n === '1' ? '' : 's'}`],
    [/^(\d+) 个资源链接$/, (n) => `${n} resource link${n === '1' ? '' : 's'}`],
    [/^资源链接 · 未命名资源( · .+)?$/, (mime) => `Resource link · unnamed resource${mime ?? ''}`],
    [/^第 (\d+) 轮输入 · 按轮次起点定位$/, (n) => `Turn ${n} input · placed at the start of the turn`],
    [/^(用户|上下文) · 按轮次起点定位$/, (kind) => `${label(kind)} · placed at the start of the turn`],
    [/^第 (\d+) 轮$/, (n) => `Turn ${n}`],
    [
      /^([▸▾] )?第 (\d+) 轮 · (\d+) 条记录(（已折叠）)?$/,
      (arrow, n, records, collapsed) =>
        `${arrow ?? ''}Turn ${n} · ${records} records${collapsed ? ' (collapsed)' : ''}`,
    ],
    [/^(\d+) 条记录 · 点击定位最近记录$/, (n) => `${n} records · click to locate the nearest record`],
    [/^第 (\d+) 轮 · (.+)$/, (n, note) => `Turn ${n} · ${translateUiPattern(note) ?? label(note)}`],
    [/^已省略 (.+) 个子步骤$/, (n) => `${n === '若干' ? 'Some' : n} child steps omitted`],
    [
      /^(输入|模型|工具)时间轴：拖动筛选，滚轮缩放，右键拖动平移$/,
      (lane) => `${label(lane)} timeline: drag to filter, scroll to zoom, right-drag to pan`,
    ],
    [
      /^(展开|折叠) (.+) 的子调用$/,
      (action, name) => `${action === '展开' ? 'Expand' : 'Collapse'} child calls for ${name}`,
    ],
    [
      /^(查看结果图片|工具结果图片|查看输入图片|输入图片) (\d+)$/,
      (kind, n) =>
        `${({ 查看结果图片: 'View result image', 工具结果图片: 'Tool result image', 查看输入图片: 'View input image', 输入图片: 'Input image' } as Record<string, string>)[kind]} ${n}`,
    ],
    [
      /^输入 (.+) · 输出 (.+) · 缓存读取 (.+) · 缓存写入 (.+) · 推理 (.+)$/,
      (input, output, read, write, reasoning) =>
        `Input ${label(input)} · output ${label(output)} · cache read ${label(read)} · cache write ${label(write)} · reasoning ${label(reasoning)}`,
    ],
    [
      /^(查看)?上下文约 (.+) \/ (.+) · ([\d.]+)%( · 上次同步)?$/,
      (view, used, window, pct, stale) =>
        `${view ? 'View ' : ''}context approximately ${used} / ${window} · ${pct}%${stale ? ' · last synchronized' : ''}`,
    ],
    [
      /^约 (.+) \/ (.+?)( · 上次同步)?$/,
      (used, window, stale) => `Approximately ${used} / ${window}${stale ? ' · last synchronized' : ''}`,
    ],
    [
      /^(_)?输出中断，至少 (\d+) 字未保存(_)?$/,
      (before, n, after) =>
        `${before ?? ''}Output interrupted; at least ${n} characters were not saved${after ?? ''}`,
    ],
    [/^已整理上下文（范围：(.+)）$/, (range) => `Context compacted (range: ${range})`],
    [
      /^这项审批在较早的记录里，过期时间 (.+)。$/,
      (date) => `This approval is in an earlier record and expires at ${date}.`,
    ],
    [
      /^后台未能完成请求，请稍后重试。(?: 诊断编号：(.+)| (诊断记录未能保存。))?$/,
      (id, unavailable) =>
        `The backend could not complete the request. Please try again.${id ? ` Diagnostic ID: ${id}` : unavailable ? ' The diagnostic record could not be saved.' : ''}`,
    ],
    [/^(.+)（(估算|网关记录)）$/, (amount, origin) => `${amount} (${label(origin)})`],
    [
      /^(.+) · (估算|网关记录)( · 订阅)?( · 已知部分| · 部分)?$/,
      (amount, origin, subscription, partial) =>
        `${amount} · ${label(origin)}${subscription ? ' · subscription' : ''}${partial ? ' · partial' : ''}`,
    ],
    [
      /^(.+) · (\d+(?:\.\d+)? 毫秒|\d+(?:\.\d+)? 秒|\d+ 分 \d+ 秒|时长未知)$/,
      (name, duration) => `${name} · ${translateUiPattern(duration) ?? label(duration)}`,
    ],
    [
      /^仅含已加载的最近 (\d+) 个节点，更早的历史未包含$/,
      (n) => `Contains only the ${n} most recently loaded nodes; earlier history is not included`,
    ],
  ]
  const prefixes: ReadonlyArray<readonly [string, string]> = [
    ['历史任务打开失败。', 'Failed to open the task history. '],
    ['生成诊断包失败：', 'Failed to generate the diagnostics bundle: '],
    ['保存诊断分享包失败：', 'Failed to save the diagnostics bundle: '],
    ['读取详情失败：', 'Failed to load details: '],
    ['诊断编号：', 'Diagnostic ID: '],
    ['从新来源更新 ', 'Update from a new source for '],
    ['打开页面 · ', 'Open page · '],
    ['版本 ', 'Version '],
    ['兼容性：', 'Compatibility: '],
    ['回滚到 ', 'Roll back to '],
    ['启用 ', 'Enable '],
    ['卸载 ', 'Uninstall '],
    ['释放 pin ', 'Release pin '],
    ['会话 ', 'Task '],
    ['工具：', 'Tool: '],
    ['工具 ', 'Tool '],
    ['工具 · ', 'Tool · '],
    ['用户 · ', 'User · '],
    ['图片 · ', 'Image · '],
    ['资源链接 · ', 'Resource link · '],
    ['请求 #', 'Request #'],
    ['钩子：', 'Hooks: '],
    ['界面插槽：', 'Interface slots: '],
    ['资源：', 'Resources: '],
    ['网络主机：', 'Network hosts: '],
    ['描述：', 'Descriptor: '],
    ['后端行：', 'Backend row: '],
    ['浏览器入口：', 'Browser entry: '],
    ['查询服务：', 'Query services: '],
    ['入口：', 'Entry: '],
    ['API 范围：', 'API range: '],
    ['运行方式：', 'Runtime support: '],
    ['浏览器 UI 槽位：', 'Browser UI slots: '],
    ['提供：', 'Provides: '],
    ['表面：', 'Surface: '],
    ['工件：', 'Artifact: '],
    ['健康检查：', 'Health check: '],
    ['所需服务：', 'Required service: '],
    ['新增能力：', 'Added capability: '],
    ['移除能力：', 'Removed capability: '],
    ['不再支持运行方式：', 'Removed runtime support: '],
    ['新增依赖：', 'Added dependency: '],
    ['新增服务授权：', 'Added service grant: '],
    ['新增 ', 'Added '],
    ['移除 ', 'Removed '],
    ['不再支持 ', 'No longer supported: '],
    ['新增依赖 ', 'Added dependency '],
    ['新增服务授权 ', 'Added service grant '],
    ['已整理上下文 ', 'Context compacted '],
  ]
  function translateUiPattern(source: string): string | undefined {
    const rootStatus =
      /^(.+)：(已扫描|未发现技能|刷新失败 · 正在使用上次成功的结果|刷新失败 · 本次没有可用结果)(?:（(.+)）)?$/.exec(
        source,
      )
    if (rootStatus)
      return `${rootStatus[1]}: ${label(rootStatus[2] ?? '')}${rootStatus[3] ? ` (${label(rootStatus[3])})` : ''}`
    const confirmationSuffix = '\n\n确认后将提交到本地后台，并按当前版本和策略完成安全校验。'
    if (source.endsWith(confirmationSuffix)) {
      const summary = source.slice(0, -confirmationSuffix.length)
      return `${translateUiPattern(summary) ?? label(summary)}\n\n${label(confirmationSuffix.trim())}`
    }
    if (source.startsWith('刷新 Skill 目录\n')) return source.split('\n').map(label).join('\n')
    for (const [pattern, render] of patterns) {
      const match = pattern.exec(source)
      if (match) return render(...match.slice(1))
    }
    const labelled = /^(审批|状态)：(.*)$/.exec(source)
    if (labelled) return `${label(labelled[1] ?? '')}: ${label(labelled[2] ?? '')}`
    const stat = /^(时长|轮次|调用|输入|输出|费用) ([\d.,KM]+(?: 毫秒| 秒| 分 \d+ 秒)?)$/.exec(source)
    if (stat) return `${label(stat[1] ?? '')} ${translateUiPattern(stat[2] ?? '') ?? stat[2]}`
    const statusSuffix =
      /^· (已取消|已中断|执行失败|执行受阻|等待处理|正在执行|订阅|已知部分|部分|上次同步|后台允许重试|旧资源待清理)$/.exec(
        source,
      )
    if (statusSuffix) return `· ${label(statusSuffix[1] ?? '')}`
    if (/^(输入 [\d.,KM]+|输出 [\d.,KM]+)/.test(source) && source.includes(' · '))
      return source
        .split(' · ')
        .map((part) => translateUiPattern(part) ?? label(part))
        .join(' · ')
    if (/^(新增 |移除 |不再支持 |新增依赖 |新增服务授权 )/.test(source) && source.includes('；'))
      return source
        .split('；')
        .map((part) => translateUiPattern(part) ?? part)
        .join('; ')
    const toolState = /^工具 (.+)：(等待执行|等待审批|正在执行|执行完成|执行失败|已取消)$/.exec(source)
    if (toolState) return `Tool ${toolState[1]}: ${label(toolState[2] ?? '')}`
    if (source.startsWith('取消正在执行的资源操作 '))
      return `Cancel resource operation ${source.slice('取消正在执行的资源操作 '.length)}`
    if (source.startsWith('正在执行 ')) return `Running ${source.slice('正在执行 '.length)}`
    for (const [prefix, replacement] of prefixes) {
      if (source.startsWith(prefix)) return replacement + source.slice(prefix.length)
    }
    return undefined
  }
  return translateUiPattern
}
