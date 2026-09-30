import { ADDITIONAL_TRANSLATIONS } from './locale-catalog.js'
import { createUiPatternTranslator } from './locale-patterns.js'
import { safeThemeStorage } from './theme.js'

export type WebLocale = 'zh-CN' | 'en'

export const WEB_LOCALE_STORAGE_KEY = 'agnes-web-locale'
export const WEB_LOCALE_CHANGED_EVENT = 'agnes:locale-changed'

const TRANSLATIONS: Readonly<Record<string, string>> = {
  ...ADDITIONAL_TRANSLATIONS,
  跳至主要内容: 'Skip to main content',
  跳至插件列表: 'Skip to plugin list',
  跳至资源列表: 'Skip to resource list',
  关闭导航: 'Close navigation',
  打开导航: 'Open navigation',
  收起导航: 'Collapse navigation',
  会话导航: 'Session navigation',
  会话视图: 'Session view',
  对话: 'Chat',
  轨迹: 'Trajectory',
  报告问题: 'Report a problem',
  运行轨迹: 'Run trace',
  扩展面板: 'Extensions panel',
  新会话: 'New task',
  新建任务: 'New task',
  新会话已创建: 'New task created',
  选择工作区: 'Choose workspace',
  最近工作区: 'Recent workspaces',
  '选择文件夹…': 'Choose folder…',
  '正在检查系统目录选择器…': 'Checking the system directory picker…',
  手动输入路径: 'Enter a path manually',
  目录路径: 'Directory path',
  项目文件夹的完整路径: 'Full path to the project folder',
  '请输入运行 agnes serve 的机器可访问的绝对目录路径。':
    'Enter an absolute directory path accessible to the machine running agnes serve.',
  取消: 'Cancel',
  使用此工作区: 'Use this workspace',
  安装前检查: 'Pre-install check',
  从来源检查插件: 'Inspect plugin source',
  '检查不会安装或启用插件。确认预览中的完整性摘要后，才能继续安装。':
    'Inspection does not install or enable a plugin. Confirm the integrity summary before continuing.',
  来源类型: 'Source type',
  本地相对路径: 'Local relative path',
  工作区扩展: 'Workspace extension',
  固定Git提交: 'Pinned Git commit',
  '固定 Git 提交': 'Pinned Git commit',
  来源引用: 'Source reference',
  '来源格式由后台严格校验；不要在这里粘贴凭据。':
    'The source format is strictly validated by the backend; do not paste credentials here.',
  检查内容: 'Inspect content',
  检查来源: 'Inspect source',
  '正在检查…': 'Inspecting…',
  需要确认: 'Confirmation required',
  确认操作: 'Confirm action',
  确认: 'Confirm',
  受控连接: 'Controlled connection',
  '添加 MCP 服务': 'Add MCP service',
  '只可填写受控 transport 和已有 secret:// 引用。密钥值不会进入本页。':
    'Only controlled transports and existing secret:// references may be entered. Secret values never enter this page.',
  服务ID: 'Service ID',
  '服务 ID': 'Service ID',
  显示名称: 'Display name',
  传输: 'Transport',
  '本地 stdio': 'Local stdio',
  'HTTPS / 本地 HTTP': 'HTTPS / local HTTP',
  可执行文件: 'Executable',
  '参数（每行一个）': 'Arguments (one per line)',
  'HTTPS 或本地 loopback 地址': 'HTTPS or local loopback address',
  凭据方式: 'Credential method',
  无凭据: 'No credentials',
  'stdio 环境变量': 'stdio environment variable',
  'HTTP API Key': 'HTTP API key',
  'SecretRef / 环境变量映射': 'SecretRef / environment variable mapping',
  '允许工具（每行一个，可留空）': 'Allowed tools (one per line, optional)',
  创建并等待确认: 'Create and wait for confirmation',
  系统设置: 'System settings',
  资源类型: 'Resource type',
  资源目录: 'Resource catalog',
  技能: 'Skills',
  '技能与 MCP': 'Skills & MCP',
  刷新技能目录: 'Refresh Skills catalog',
  '添加 MCP': 'Add MCP',
  返回工作台: 'Back to workbench',
  设置分类: 'Settings categories',
  设置: 'Settings',
  关闭设置: 'Close settings',
  基础设置: 'Basic settings',
  模型与账户: 'Models & accounts',
  插件管理: 'Plugin management',
  已归档会话: 'Archived tasks',
  通用: 'General',
  连接设置: 'Connection settings',
  模型账户: 'Model accounts',
  '管理 Provider 连接和默认模型。保存后，新建任务会使用更新后的配置。':
    'Manage Provider connections and the default model. New tasks use the updated configuration after saving.',
  已保存的模型账户: 'Saved model accounts',
  我的账户: 'My accounts',
  '每个账户独立保存地址、密钥和模型。': 'Each account stores its address, key, and model independently.',
  添加账户: 'Add account',
  '会话可在已启用账户提供的模型之间切换。': 'Tasks can switch between models provided by enabled accounts.',
  插件: 'Plugins',
  '安装、启用和检查 Agnes 的本地插件。': 'Install, enable, and inspect local Agnes plugins.',
  恢复模式: 'Recovery mode',
  只读恢复模式: 'Read-only recovery mode',
  '管理页仍可显示安全状态；恢复完成前，所有检查和变更操作均已停用。':
    'The management page can still show safety status; checks and changes are disabled until recovery finishes.',
  '存在未释放的孤儿运行时 pin': 'Unreleased orphan runtime pins exist',
  全部释放: 'Release all',
  已安装: 'Installed',
  发现: 'Discover',
  搜索插件: 'Search plugins',
  筛选当前已安装列表: 'Filter installed plugins',
  从来源安装: 'Install from source',
  通用设置: 'General settings',
  '调整界面配色与字号。设置只保存在本机浏览器中。':
    'Adjust colors and font size. These settings are stored only in this browser.',
  配色: 'Theme',
  跟随系统: 'Follow system',
  随操作系统的深浅色设置自动切换: 'Automatically follow the operating system theme',
  浅色: 'Light',
  始终使用浅色界面: 'Always use the light theme',
  深色: 'Dark',
  始终使用深色界面: 'Always use the dark theme',
  皮肤: 'Skin',
  '跟随主题（默认）': 'Follow theme (default)',
  '只使用内置配色，不加载任何皮肤': 'Use only the built-in colors; do not load a skin',
  '皮肤清单读取失败。': 'Unable to read the skin catalog.',
  重试: 'Retry',
  '这份皮肤没有生效，已保留原选择。': 'This skin did not apply; the previous selection was kept.',
  字号: 'Font size',
  小: 'Small',
  界面整体缩小一档: 'Scale the interface down one step',
  标准: 'Standard',
  默认字号: 'Default font size',
  大: 'Large',
  界面整体放大一档: 'Scale the interface up one step',
  界面语言: 'Interface language',
  '语言选择会立即生效，并在刷新后保留。': 'Language changes apply immediately and persist after refresh.',
  简体中文: 'Simplified Chinese',
  账户配置: 'Account configuration',
  账户详情: 'Account details',
  编辑连接与默认模型: 'Edit connection and default model',
  连接信息: 'Connection details',
  账户名称: 'Account name',
  认证方式: 'Authentication method',
  输入新密钥或保留当前密钥: 'Enter a new key or keep the current key',
  验证与默认模型: 'Validation & default model',
  默认模型: 'Default model',
  选择要保存的默认模型: 'Choose the default model to save',
  '先测试 Provider，再选择默认模型': 'Test the Provider first, then choose the default model',
  测试连接: 'Test connection',
  重试读取配置: 'Retry loading configuration',
  '默认账户不可停用或删除；如需调整，请先将其他已启用账户设为默认。':
    'The default account cannot be disabled or deleted; set another enabled account as default first.',
  保存账户: 'Save account',
  编辑: 'Edit',
  停用: 'Disable',
  启用: 'Enable',
  设为默认: 'Set as default',
  删除: 'Delete',
  确认删除: 'Confirm delete',
  取消删除: 'Cancel delete',
  已启用: 'Enabled',
  已停用: 'Disabled',
  默认: 'Default',
  'Computer Use': 'Computer Use',
  '让 Agnes 查看屏幕并操作应用。需要使用支持图片的模型。':
    'Let Agnes view the screen and operate applications. A vision-capable model is required.',
  刷新状态: 'Refresh status',
  使用状态: 'Usage status',
  系统权限: 'System permissions',
  驱动诊断: 'Driver diagnostics',
  安装与维护: 'Installation & maintenance',
  等待检查: 'Waiting for check',
  '正在等待连接本地后台。': 'Waiting to connect to the local backend.',
  '驱动就绪后显示当前系统所需的权限。': 'The required system permissions appear when the driver is ready.',
  '打开 macOS 授权': 'Open macOS permissions',
  '检查本机驱动是否正常。': 'Check whether the local driver is working.',
  运行诊断: 'Run diagnostics',
  没有记录: 'No record',
  '打开面板后读取本机状态。': 'Local status is read when the panel opens.',
  '本机没有可显示的驱动操作。': 'There are no local driver operations to display.',
  等待执行: 'Waiting to run',
  '驱动操作已进入本机队列。': 'The driver operation entered the local queue.',
  正在重启: 'Restarting',
  正在安装: 'Installing',
  '正在检查已有驱动；缺失时会下载并验证。网络较慢时需要等待，可取消后重试。':
    'Checking the existing driver; it will be downloaded and verified if missing. A slow network may take time; cancel and retry if needed.',
  正在取消: 'Canceling',
  '已请求取消；正在等待当前安全步骤结束。':
    'Cancellation requested; waiting for the current safety step to finish.',
  操作完成: 'Operation complete',
  '驱动已经安装并通过验证。': 'The driver was installed and verified.',
  '当前驱动已经是锁定版本。': 'The current driver is already the locked version.',
  '驱动已经修复并通过验证。': 'The driver was repaired and verified.',
  '驱动已经安全重启。': 'The driver restarted safely.',
  '新驱动未通过验证，已恢复上一可用版本。':
    'The new driver failed verification; the previous usable version was restored.',
  '驱动操作已经完成。': 'The driver operation is complete.',
  已取消: 'Canceled',
  '驱动操作已取消，未继续执行后续步骤。': 'The driver operation was canceled; later steps were not run.',
  操作失败: 'Operation failed',
  '驱动准备或维护未完成。请检查网络或安装环境后重试。':
    'Driver preparation or maintenance did not complete. Check the network or installation environment and retry.',
  无法读取进度: 'Unable to read progress',
  '驱动操作可能仍在后台执行，请稍后刷新进度。':
    'The driver operation may still be running in the background. Refresh progress later.',
  仍在执行: 'Still running',
  '等待时间较长，驱动操作仍可能在后台执行，请稍后刷新进度。':
    'This is taking longer than expected; the driver operation may still be running in the background. Refresh progress later.',
  正在提交: 'Submitting',
  '正在向本机 Host 提交驱动操作。': 'Submitting the driver operation to the local Host.',
  无法确认是否开始: 'Unable to confirm start',
  '无法确认提交结果；操作可能已在后台开始，请刷新进度后再试。':
    'Unable to confirm the submission result; the operation may have started in the background. Refresh progress and try again.',
  正在读取: 'Reading',
  '正在读取最近一次驱动操作。': 'Reading the most recent driver operation.',
  无法读取: 'Unable to read',
  '暂时无法读取进度；操作可能仍在后台执行。':
    'Progress is temporarily unavailable; the operation may still be running in the background.',
  '暂时无法读取驱动操作进度。': 'Driver operation progress is temporarily unavailable.',
  '正在请求本机 Host 停止驱动操作。': 'Requesting that the local Host stop the driver operation.',
  取消失败: 'Cancel failed',
  '无法确认取消结果，请刷新进度后再试。': 'Unable to confirm cancellation. Refresh progress and try again.',
  无需系统授权: 'No system permission required',
  'Linux 不使用 macOS 的辅助功能和录屏授权；桌面会话能力由驱动健康检查验证。':
    'Linux does not use macOS accessibility or screen-recording permissions; desktop-session capability is verified by driver health checks.',
  'Windows 无需额外的录屏或辅助功能授权。':
    'Windows does not require additional screen-recording or accessibility permission.',
  已授权: 'Authorized',
  '辅助功能和屏幕录制均已授权。': 'Accessibility and screen recording are authorized.',
  需要授权: 'Permission required',
  辅助功能: 'Accessibility',
  屏幕录制: 'Screen recording',
  '无法从已验签驱动读取 macOS 权限，请刷新后重试。':
    'Unable to read macOS permissions from the verified driver. Refresh and try again.',
  不可用: 'Unavailable',
  '生产驱动尚未通过准入，未检查系统权限。':
    'The production driver has not passed admission; system permissions were not checked.',
  '暂时无法读取系统权限；没有发起授权。':
    'System permissions are temporarily unavailable; no authorization was started.',
  正在检查: 'Checking',
  '正在读取本机 Computer Use 安全门状态。': 'Reading the local Computer Use safety-gate status.',
  运行中: 'Running',
  可用: 'Available',
  已关闭: 'Disabled',
  暂不支持: 'Not supported',
  准备中: 'Preparing',
  准备失败: 'Preparation failed',
  首次使用自动准备: 'Prepared automatically on first use',
  '请刷新状态后重试。': 'Refresh the status and try again.',
  '电脑操作需要支持图片的模型；普通聊天不受影响。':
    'Computer Use requires a vision-capable model; ordinary chat is unaffected.',
  等待驱动就绪: 'Waiting for the driver',
  已阻止: 'Blocked',
  '当前平台的生产驱动准入保持关闭。': 'Production-driver admission is disabled on this platform.',
  '运行时：未启动，且未尝试启动': 'Runtime: not started and not attempted',
  '暂时无法读取 Computer Use 状态；未执行任何驱动操作。':
    'Computer Use status is temporarily unavailable; no driver operation was performed.',
  等待系统授权: 'Waiting for system permission',
  '请在 macOS 系统界面完成辅助功能和屏幕录制授权。':
    'Complete accessibility and screen-recording authorization in the macOS system interface.',
  授权未完成: 'Authorization incomplete',
  '系统授权未完成或无法验证，请检查系统设置后刷新。':
    'System authorization is incomplete or could not be verified. Check System Settings and refresh.',
  '正在验证驱动健康状态和签名身份。': 'Verifying driver health and signing identity.',
  检查通过: 'Check passed',
  'macOS 驱动健康状态和签名身份均已验证。': 'macOS driver health and signing identity are verified.',
  'Linux 驱动健康状态、来源身份和桌面会话均已验证。':
    'Linux driver health, source identity, and desktop session are verified.',
  'Windows 驱动健康状态和签名身份均已验证。': 'Windows driver health and signing identity are verified.',
  检查失败: 'Check failed',
  '驱动健康状态或签名身份已经变化，请修复或重新安装后再试。':
    'Driver health or signing identity changed. Repair or reinstall, then try again.',
  '实时驱动诊断入口不可用，请重新启动或修复驱动。':
    'The live driver diagnostics entry point is unavailable. Restart or repair the driver.',
  未执行: 'Not run',
  '无法执行健康检查。': 'The health check cannot run.',
  '暂时无法完成健康检查；没有启动或修复驱动。':
    'The health check could not complete; no driver was started or repaired.',
  驱动发布来源与完整性证据尚未锁定: 'Driver release provenance and integrity evidence are not locked.',
  固定版本兼容性证据尚未完成: 'Pinned-version compatibility evidence is incomplete.',
  平台实机验收尚未完成: 'Platform acceptance testing is incomplete.',
  '当前配置已关闭电脑操作，请检查本地配置中的 computerUse.enabled。':
    'Computer Use is disabled in the current configuration. Check computerUse.enabled in the local configuration.',
  '当前系统或处理器暂不支持电脑操作。': 'Computer Use is not supported on the current system or processor.',
  '首次使用时会自动准备驱动，也可以点击“准备驱动”。':
    'The driver is prepared automatically on first use, or you can click “Prepare driver”.',
  '正在准备驱动，请稍候。': 'Preparing the driver. Please wait.',
  '驱动准备未完成。请检查网络或安装环境，然后点击“准备驱动”重试。':
    'Driver preparation did not complete. Check the network or installation environment, then click “Prepare driver” to retry.',
  '首次使用会自动准备驱动；已有安装会先验证并复用。':
    'The driver is prepared on first use; existing installations are verified and reused.',
  准备驱动: 'Prepare driver',
  更新驱动: 'Update driver',
  重启驱动: 'Restart driver',
  刷新进度: 'Refresh progress',
  取消操作: 'Cancel operation',
  刷新列表: 'Refresh list',
  搜索名称或工作区: 'Search name or workspace',
  搜索已归档会话: 'Search archived tasks',
  '查看已暂时收起的会话，需要时可以恢复到工作区。':
    'View temporarily archived tasks and restore them to the workspace when needed.',
  任务列表: 'Task list',
  工作区与会话: 'Workspaces & tasks',
  添加工作区: 'Add workspace',
  加载更多任务: 'Load more tasks',
  未分类: 'Uncategorized',
  没有工作区归属的历史会话: 'Archived task history without a workspace',
  选择当前会话模型: 'Choose the model for this task',
  选择模型: 'Choose model',
  可用模型: 'Available models',
  已配置账户: 'Configured account',
  选择此任务使用的模型: 'Choose the model for this task',
  选择本会话权限: 'Choose permissions for this task',
  本会话允许: 'Allow for this task',
  工作区内修改: 'Workspace changes',
  完全权限: 'Full permissions',
  仅可查看: 'View only',
  本会话弹出的命令审批一律拒绝: 'Reject all command approvals for this task',
  '工作区读写按默认策略；跑命令仍要审批':
    'Workspace reads/writes follow the default policy; commands still require approval',
  本会话跳过其余审批: 'Skip remaining approvals for this task',
  停止: 'Stop',
  发送: 'Send',
  '发送（Enter）': 'Send (Enter)',
  连接后台后开始: 'Connect to the backend to begin',
  '描述你想完成的事…': 'Describe what you want to accomplish…',
  任务内容: 'Task content',
  上下文用量: 'Context usage',
  有新内容: 'New content',
  '正在准备…': 'Preparing…',
  准备新任务: 'Prepare a new task',
  '正在请求停止…': 'Requesting stop…',
  可补充下一轮: 'Ready for the next turn',
  'Enter 发送，Shift+Enter 换行': 'Enter to send, Shift+Enter for a new line',
  '正在准备会话…': 'Preparing task…',
  '正在提交…': 'Submitting…',
  加入下一轮: 'Add to next turn',
  配置模型后开始: 'Configure a model to begin',
  '让每一个模型，都能成为会做事的智能体。': 'Turn every model into an agent that gets things done.',
  '先配置模型，即可开始第一个任务。': 'Configure a model to start your first task.',
  '后台已恢复，正在重新载入页面…': 'The backend is back; reloading the page…',
  重试连接: 'Retry connection',
  '后台暂未恢复。确认后台和 Web 启动命令都已重新运行后，可以重试连接。 ':
    'The backend is not ready yet. Restart the backend and Web command, then retry. ',
  '尚无启用的模型账户。请在设置中添加或启用账户。':
    'No enabled model accounts. Add or enable an account in Settings.',
  '当前模型已不可用，请重新选择模型': 'The current model is unavailable. Choose another model.',
  '该会话由旧版本创建，当前版本无法打开，请新建会话。':
    'This task was created by an older version and cannot be opened. Create a new task.',
  '模型凭据已失效或被上游拒绝，请在设置中重新配置或登录该模型账号。':
    'The model credentials are invalid or were rejected upstream. Reconfigure or sign in to this model account in Settings.',
  '工作目录不存在，请检查路径后重试。':
    'The workspace directory does not exist. Check the path and try again.',
  '所选路径不是目录，请选择一个文件夹。': 'The selected path is not a directory. Choose a folder.',
  '无法访问此工作目录，请检查权限后重试。':
    'This workspace directory is inaccessible. Check permissions and try again.',
  '请输入工作目录的绝对路径。': 'Enter an absolute path for the workspace directory.',
  '无法使用此工作目录，请检查路径是否存在及访问权限。':
    'This workspace directory cannot be used. Check that the path exists and is accessible.',
  '无法打开系统目录选择器，请手动输入工作区路径。':
    'Unable to open the system directory picker. Enter the workspace path manually.',
  '当前后台中找不到这个任务。请从侧栏选择，或新建任务。':
    'This task was not found in the current backend. Choose one from the sidebar or create a new task.',
  '打开管理面板失败，请重试。': 'Unable to open the management pane. Please retry.',
  '管理后台暂时不可用，请稍后重试。':
    'The management backend is temporarily unavailable. Please retry later.',
  '没有插件管理权限。': 'You do not have plugin management permission.',
  '无法连接插件管理后台。已保留当前页面内容。':
    'Unable to connect to the plugin management backend. The current page was kept.',
  '插件 UI 入口加载失败，可重试': 'Plugin UI entry failed to load; retry available',
  '插件 UI 样式加载失败，可重试': 'Plugin UI styles failed to load; retry available',
  '插件 UI 渲染失败，可重试': 'Plugin UI rendering failed; retry available',
  '插件 UI 使用了当前宿主未实现的槽位': 'The plugin UI uses a slot that this host does not implement',
  '插件 UI 模块格式无效，可重试': 'The plugin UI module format is invalid; retry available',
  '插件 UI 启动失败，可重试': 'The plugin UI failed to start; retry available',
  '插件 UI 卸载失败，后台清理中，可重试':
    'The plugin UI failed to unload; the backend is cleaning up; retry available',
  '插件 UI 操作超时，后台清理中，可重试':
    'The plugin UI operation timed out; the backend is cleaning up; retry available',
  '插件 UI 行身份迁移不明确，已停止激活': 'Plugin UI row identity migration is ambiguous; activation stopped',
  '插件 UI 名册暂不可用，可重试': 'The plugin UI roster is temporarily unavailable; retry available',
  此卡片的插件未就绪: 'The plugin for this card is not ready',
  '资源目录读取失败。': 'Unable to read the resource catalog.',
  重试读取: 'Retry reading',
  加载更多: 'Load more',
  '正在读取本地资源目录…': 'Reading the local resource catalog…',
  '正在读取插件状态…': 'Reading plugin status…',
  尚未安装插件: 'No plugins installed',
  目录暂时没有可显示的插件: 'The catalog has no plugins to display',
  没有匹配的目录条目: 'No matching catalog entries',
  '可以浏览目录，或从已知来源检查一个插件。': 'Browse the catalog or inspect a plugin from a known source.',
  '请调整搜索词，或确认目录连接后重试。': 'Adjust the search term or check the catalog connection and retry.',
  '查看来源、信任和运行状态；凭据只以 SecretRef 引用保存。':
    'View source, trust, and runtime status; credentials are stored only as SecretRef references.',
  '想添加 MCP？在聊天中说“帮我接入这个 MCP”，并提供服务地址或连接信息。':
    'To add MCP, say “connect this MCP for me” in chat and provide the service address or connection details.',
  关闭详情: 'Close details',
  最近完成的操作: 'Recently completed operations',
  正在进行的操作: 'Operations in progress',
  后台允许重试: 'The backend allows retry',
  请求取消: 'Request cancelation',
  选择要包含的内容: 'Choose what to include',
  诊断包已生成: 'Diagnostic bundle generated',
  诊断文件已保存: 'Diagnostic file saved',
  '问题包已导出，部分资料不完整': 'Issue bundle exported; some information is incomplete',
  会话名称: 'Task name',
  重命名会话: 'Rename task',
  分叉会话: 'Fork task',
  归档会话: 'Archive task',
  取消归档: 'Unarchive task',
  '没有匹配的已归档会话。': 'No archived tasks match.',
  '暂无已归档会话。': 'No archived tasks.',
  '运行结束后再分叉。': 'Wait for the task to finish before forking.',
  重命名: 'Rename',
  '操作失败，请重试。': 'The operation failed. Please try again.',
  '请输入 1–80 个字符的单行名称。': 'Enter a single-line name between 1 and 80 characters.',
  重试刷新: 'Retry refresh',
  未命名会话: 'Untitled task',
  '会话列表分页未推进，请重试。': 'The task list did not advance to the next page. Please try again.',
  '列表刷新失败：': 'List refresh failed: ',
  '名称已保存，但列表刷新失败：': 'The name was saved, but the list failed to refresh: ',
  '正在恢复…': 'Restoring…',
  '配置读取失败，请重试。': 'Unable to read configuration. Please try again.',
  '正在读取配置…': 'Reading configuration…',
  '登录未完成，请重试或使用设备码登录。':
    'Sign-in did not complete. Please retry or use device-code sign-in.',
  '登录操作已过期，请重新登录。': 'The sign-in operation expired. Please sign in again.',
  '正在处理登录，请稍后重试。': 'Sign-in is being processed. Please try again later.',
  '配置输入无效，请检查 Provider、Base URL、密钥和模型。':
    'The configuration input is invalid. Check the Provider, Base URL, key, and model.',
  '所选 Provider 不可用，请重新选择。': 'The selected Provider is unavailable. Choose another one.',
  '该 Provider 不支持自定义 Base URL，请恢复默认地址。':
    'This Provider does not support a custom Base URL. Restore the default address.',
  '需要 API key，请输入密钥后重试。': 'An API key is required. Enter the key and try again.',
  '本地凭据存储不可用，请检查本机配置。':
    'Local credential storage is unavailable. Check the local configuration.',
  'Provider 模型目录不可用，请检查网络或 Base URL。':
    'The Provider model catalog is unavailable. Check the network or Base URL.',
  'Provider 连接测试未通过，请检查地址和密钥。':
    'The Provider connection test failed. Check the address and key.',
  '上游拒绝了订阅授权或访问权限，请重新授权并核对登录账号。':
    'The upstream service rejected subscription authorization or access. Reauthorize and verify the signed-in account.',
  '上游报告额度或余额不足，请检查订阅用量。':
    'The upstream service reported insufficient quota or balance. Check subscription usage.',
  '上游请求限流，请稍后重试。': 'The upstream service is rate-limiting requests. Please try again later.',
  '模型测试超时，请检查网络后重试。': 'The model test timed out. Check the network and try again.',
  '上游未找到所选模型，请选择其他模型重试。':
    'The upstream service could not find the selected model. Choose another model and try again.',
  '授权已完成，但所选模型的推理测试失败；请重试或改选模型。账户尚未保存。':
    'Authorization completed, but inference testing failed for the selected model. Retry or choose another model; the account was not saved.',
  '所选模型不可用，请重新测试并选择返回的模型。':
    'The selected model is unavailable. Test again and choose a returned model.',
  '配置已被其他客户端修改，请重新打开设置后再试。':
    'The configuration was changed by another client. Reopen Settings and try again.',
  '配置保存失败，请稍后重试。': 'The configuration could not be saved. Please try again later.',
  '本地配置状态无效，请检查配置文件。':
    'The local configuration state is invalid. Check the configuration file.',
  '配置请求失败，请稍后重试。': 'The configuration request failed. Please try again later.',
  '正在等待订阅授权。': 'Waiting for subscription authorization.',
  '登录已取消。': 'Sign-in was canceled.',
  '使用当前 Provider 的订阅授权，无需 API key。':
    'Use this Provider subscription authorization; no API key is required.',
  '已保存 API key。留空会继续使用它；输入新值可替换。页面不会显示已保存的密钥。':
    'An API key is saved. Leave this blank to keep it, or enter a new value to replace it. The saved key is never shown.',
  '请输入 API key 进行测试和保存。关闭设置会清除本次输入。':
    'Enter an API key to test and save. Closing Settings clears this input.',
  '后台未连接，页面已清除本次输入。': 'The backend is disconnected, so this input was cleared.',
  订阅登录: 'Subscription sign-in',
  'API Key': 'API key',
  '选择 Provider': 'Choose a Provider',
  '无可用 Provider': 'No Provider available',
  '连接信息已变更。请重新测试 Provider；此前的模型列表已失效。':
    'Connection details changed. Test the Provider again; the previous model list is no longer valid.',
  '请选择 Provider': 'Choose a Provider',
  '从订阅登录切换为 API Key 时，请输入新的 API key':
    'Enter a new API key when switching from subscription sign-in to API key.',
  '已加载保存的 Provider 与默认模型。测试连接后可更新默认模型；当前会话模型不会在此更改。':
    'The saved Provider and default model are loaded. Test the connection to update the default model; this does not change the current task model.',
  '正在测试所选订阅模型…': 'Testing the selected subscription model…',
  '所选模型测试通过，可以保存账户。': 'The selected model passed its test. The account can be saved.',
  'Provider 未返回可验证的模型目录': 'The Provider did not return a verifiable model catalog.',
  请填写账户名称: 'Enter an account name.',
  '正在保存默认配置…': 'Saving the default configuration…',
  登录保存未完成: 'Sign-in save did not complete.',
  '已保存；需要重启后台后生效。': 'Saved; restart the backend for this to take effect.',
  '已保存；对新会话生效，已有会话保持原配置。':
    'Saved; this applies to new tasks while existing tasks keep their current configuration.',
  '正在编辑账户。测试后保存；修改只对新会话生效。':
    'Editing an account. Test before saving; changes apply only to new tasks.',
  '添加模型账户；每个账户单独保存地址与密钥。':
    'Add a model account; each account stores its address and key separately.',
  填写连接信息后测试并保存: 'Enter the connection details, then test and save.',
  '授权完成；选择模型并保存，保存前会验证所选模型。':
    'Authorization complete. Choose a model and save; the selected model is verified before saving.',
  '第 2 步：正在测试 Provider…': 'Step 2: testing the Provider…',
  后台未连接: 'The backend is disconnected.',
  '新会话将使用所选模型。': 'The new task will use the selected model.',
  '模型已更新，后续请求将使用所选模型。':
    'The model was updated; subsequent requests will use the selected model.',
  '配置已保存，但尚未生效；当前继续使用已生效的模型。请在设置中重试保存。':
    'The configuration was saved but is not active yet. The current model remains in use; retry saving in Settings.',
  '模型配置已更新。新会话沿用上次使用的模型；尚未选过时使用新的默认模型。':
    'Model configuration updated. New tasks keep the last-used model, or use the new default if none has been selected.',
  '无法读取工作区列表，请稍后重试或直接添加工作目录。':
    'Unable to read the workspace list. Try again later or add a workspace directory directly.',
  '新会话已创建，但名称保存失败；请在新会话菜单中重命名。':
    'The new task was created, but its name could not be saved. Rename it from the task menu.',
  '只有已完成且当前空闲的回合可以分支。': 'Only completed, currently idle turns can be forked.',
  '此会话还没有可分叉的已完成回合。': 'This task has no completed turn that can be forked.',
  '已从所选回合创建新聊天。原聊天保持不变。':
    'Created a new chat from the selected turn. The original chat is unchanged.',
  '旧会话仍在关闭，新会话已继续准备。':
    'The previous task is still closing; the new task is continuing to prepare.',
  '正在打开…': 'Opening…',
  '从这台机器选择一个目录。': 'Choose a directory from this machine.',
  '请在系统窗口中选择工作区。': 'Choose a workspace in the system window.',
  '当前环境无法打开目录选择器，请手动输入目录路径。':
    'This environment cannot open the directory picker. Enter the directory path manually.',
  '连接已关闭；任务是否结束请以后台状态为准。重新运行 Web 启动命令并打开其地址即可恢复查看。':
    'The connection is closed; use backend status to determine whether the task finished. Rerun the Web command and open its address to resume viewing.',
  '与后台的连接已断开；任务是否结束请以后台状态为准。':
    'The backend connection was lost; use backend status to determine whether the task finished.',
  '部分历史事件已不可回放，正在读取后台现有投影。':
    'Some historical events cannot be replayed. Reading the backend’s current projection.',
  'WebSocket 连接地址不可用。': 'The WebSocket connection address is unavailable.',
  '会话创建失败。': 'Task creation failed.',
  '会话选择已改变。': 'The selected task changed.',
  '新会话已创建，但页面刷新失败。请刷新页面查找会话：':
    'The new task was created, but the page failed to refresh. Reload the page to find it: ',
  等待审批: 'Waiting for approval',
  有一项审批等待处理: 'An approval is waiting for your decision',
  '正在加载更早的记录。': 'Loading earlier records.',
  定位审批: 'Locate approval',
  '允许执行此操作？': 'Allow this action?',
  可能修改或删除内容: 'May modify or delete content',
  此操作需要明确确认: 'This action requires explicit confirmation',
  涉及预算使用: 'Uses budget',
  影响范围需要确认: 'Impact requires confirmation',
  '请核对工具及参数后决定是否继续。': 'Review the tool and arguments before deciding whether to continue.',
  '将在此任务的工作目录执行命令。请核对命令后决定。':
    'This command will run in the task workspace. Review it before deciding.',
  仅允许这次: 'Allow once',
  拒绝: 'Reject',
  始终拒绝: 'Always reject',
  需要你的确认: 'Your confirmation is required',
}

const PREFIX_TRANSLATIONS: ReadonlyArray<readonly [string, string]> = [
  ['来自 ', 'From '],
  ['macOS 仍需授权：', 'macOS still requires permission: '],
  ['运行时：', 'Runtime: '],
  ['后台未能完成请求，请稍后重试。', 'The backend could not complete the request. Please try again. '],
  ['诊断编号：', 'Diagnostic ID: '],
  ['会话操作 ', 'Task actions for '],
  ['编辑 ', 'Edit '],
  ['设为默认 ', 'Set as default for '],
  ['确认删除 ', 'Confirm delete '],
  ['删除 ', 'Delete '],
  ['请求停用 ', 'Request disable '],
  ['请求启用 ', 'Request enable '],
  ['取消归档 ', 'Unarchive '],
  ['名称已保存，但列表刷新失败：', 'The name was saved, but the list failed to refresh: '],
  ['已取消归档，但列表刷新失败：', 'Unarchived, but the list failed to refresh: '],
  ['已归档，但列表刷新失败，请刷新页面：', 'Archived, but the list failed to refresh. Reload the page: '],
  ['当前会话模型：', 'Current task model: '],
  ['第 3 步：连接成功，发现 ', 'Step 3: connection succeeded; found '],
  [
    ' 个模型。确认或选择默认模型后保存；当前会话模型不会改变。',
    ' models. Confirm or choose the default model, then save; the current task model will not change.',
  ],
  [
    '新会话已创建，但页面刷新失败。请刷新页面查找会话：',
    'The new task was created, but the page failed to refresh. Reload the page to find it: ',
  ],
  ['这项审批在较早的记录里，过期时间 ', 'This approval is in an earlier record and expires at '],
  ['新会话将使用「', 'The new task will use “'],
  ['」。', '”.'],
  ['本会话权限已设为「', 'Task permissions are now “'],
  [
    '第 1 步：选择 Provider 并测试连接；验证后才能选择默认模型。',
    'Step 1: select a Provider and test the connection; the default model is available after validation.',
  ],
  ['第 2 步：', 'Step 2: '],
  ['第 1 步：', 'Step 1: '],
]

const LOCALE_VALUES: readonly WebLocale[] = ['zh-CN', 'en']
const translateUiPattern = createUiPatternTranslator((text) => TRANSLATIONS[text] ?? text)

export function isWebLocale(value: unknown): value is WebLocale {
  return typeof value === 'string' && LOCALE_VALUES.includes(value as WebLocale)
}

export function readWebLocale(storage: Pick<Storage, 'getItem'>): WebLocale {
  try {
    const value = storage.getItem(WEB_LOCALE_STORAGE_KEY)
    return isWebLocale(value) ? value : 'zh-CN'
  } catch {
    return 'zh-CN'
  }
}

export function writeWebLocale(storage: Pick<Storage, 'setItem'>, locale: WebLocale): void {
  try {
    storage.setItem(WEB_LOCALE_STORAGE_KEY, locale)
  } catch {
    // A storage failure only removes persistence; the current page still changes language.
  }
}

function translateSource(source: string, locale: WebLocale): string {
  if (locale === 'zh-CN') return source
  const content = source.trim()
  const translated = translateContent(content)
  if (translated === content) return source
  const start = source.indexOf(content)
  return source.slice(0, start) + translated + source.slice(start + content.length)
}

function translateContent(source: string): string {
  const exact = TRANSLATIONS[source] ?? TRANSLATIONS[source.replace(/\s+/g, ' ')]
  if (exact !== undefined) return exact
  const patterned = translateUiPattern(source)
  if (patterned !== undefined) return patterned
  const activeSessions = /^运行时：(\d+) 个活动会话$/.exec(source)
  if (activeSessions)
    return `Runtime: ${activeSessions[1]} active session${activeSessions[1] === '1' ? '' : 's'}`
  const readyDriver = /^(macOS|Linux|Windows) 驱动 (.+) 已就绪。请在对话中使用支持图片的模型操作电脑。$/.exec(
    source,
  )
  if (readyDriver) {
    return `${readyDriver[1]} driver ${readyDriver[2]} is ready. Use a vision-capable model in chat to operate the computer.`
  }
  for (const [prefix, replacement] of PREFIX_TRANSLATIONS) {
    if (source.startsWith(prefix)) return replacement + source.slice(prefix.length)
  }
  return source
}

function excluded(element: Element | null, attribute = false): boolean {
  if (!element) return true
  if (element.closest('script, style, template, [data-locale-exempt]')) return true
  if (!attribute && element.closest('textarea')) return true
  if (
    attribute &&
    element.matches(
      '#transcript, #trace-panel, #rightbar-panel, [data-document-preview], .table-scroll, .timeline-node.tool, .timeline-node.approval',
    )
  )
    return false
  const payload = element.closest(
    '.session-title, .workspace-name, .workspace-option-name, .workspace-option-path, .config-account-select, .node-body, .thinking-content, .tool-name, .tool-summary, .approval-summary, .markdown, .trace-row-preview, .trace-pre, .trace-field-value[data-locale-value="literal"], [data-document-preview]',
  )
  const ui = element.closest(
    '[data-locale-ui], .code-copy, .node-label, .tool-status, .tool-detail, .tool-detail-text, .thinking > summary, .turn-status, .process-label, .turn-footer, .call-usage, .transcript-earlier',
  )
  if (payload && (!ui || !payload.contains(ui))) return true
  if (ui) return false
  return element.closest('#transcript, #trace-panel, #rightbar-panel') !== null
}

const textSources = new WeakMap<Text, string>()
const textRenders = new WeakMap<Text, string>()
const attributeSources = new WeakMap<Element, Map<string, string>>()
const attributeRenders = new WeakMap<Element, Map<string, string>>()
let activeLocale: WebLocale = 'zh-CN'
let activeStorage: Pick<Storage, 'getItem' | 'setItem'> = safeThemeStorage()
let observer: MutationObserver | undefined

function translateTextNode(node: Text): void {
  if (excluded(node.parentElement)) return
  const current = node.data
  const last = textRenders.get(node)
  if (last !== undefined && current !== last) textSources.set(node, current)
  const source = textSources.get(node) ?? current
  textSources.set(node, source)
  const rendered = translateSource(source, activeLocale)
  if (current !== rendered) node.data = rendered
  textRenders.set(node, rendered)
}

function translateElement(element: Element): void {
  if (excluded(element, true)) return
  const attributes = ['aria-label', 'aria-description', 'title', 'placeholder', 'aria-placeholder', 'alt']
  const sources = attributeSources.get(element) ?? new Map<string, string>()
  const renders = attributeRenders.get(element) ?? new Map<string, string>()
  for (const name of attributes) {
    const current = element.getAttribute(name)
    if (current === null) {
      sources.delete(name)
      renders.delete(name)
      continue
    }
    if (element.getAttribute('data-locale-preserve-attributes')?.split(' ').includes(name)) continue
    const last = renders.get(name)
    if (last !== undefined && current !== last) sources.set(name, current)
    const source = sources.get(name) ?? current
    sources.set(name, source)
    const rendered = translateSource(source, activeLocale)
    if (current !== rendered) element.setAttribute(name, rendered)
    renders.set(name, rendered)
  }
  attributeSources.set(element, sources)
  attributeRenders.set(element, renders)
}

export function translateWebDocument(root: ParentNode = document): void {
  if (root instanceof Element) translateElement(root)
  const elements = root.querySelectorAll('*')
  for (const element of elements) translateElement(element)
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
  let node: Node | null = walker.nextNode()
  while (node) {
    translateTextNode(node as Text)
    node = walker.nextNode()
  }
}

function applyLocale(locale: WebLocale, persist: boolean): void {
  activeLocale = locale
  if (persist) writeWebLocale(activeStorage, locale)
  document.documentElement.lang = locale
  translateWebDocument(document)
  window.dispatchEvent(new CustomEvent(WEB_LOCALE_CHANGED_EVENT, { detail: { locale } }))
}

export function initializeWebLocale(
  storage: Pick<Storage, 'getItem' | 'setItem'> = safeThemeStorage(),
): WebLocale {
  observer?.disconnect()
  window.removeEventListener('storage', handleStorage)
  activeStorage = storage
  activeLocale = readWebLocale(storage)
  document.documentElement.lang = activeLocale
  translateWebDocument(document)
  if (document.body) {
    observer = new MutationObserver((records) => {
      for (const record of records) {
        if (record.type === 'characterData') translateTextNode(record.target as Text)
        else if (record.type === 'attributes') translateElement(record.target as Element)
        else {
          for (const node of record.addedNodes) {
            if (node.nodeType === Node.ELEMENT_NODE) translateWebDocument(node as Element)
            else if (node.nodeType === Node.TEXT_NODE) translateTextNode(node as Text)
          }
          if (record.target instanceof Element) translateElement(record.target)
        }
      }
    })
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ['aria-label', 'aria-description', 'title', 'placeholder', 'aria-placeholder', 'alt'],
    })
  }
  window.addEventListener('storage', handleStorage)
  return activeLocale
}

function handleStorage(event: StorageEvent): void {
  if (event.key !== WEB_LOCALE_STORAGE_KEY || !isWebLocale(event.newValue)) return
  applyLocale(event.newValue, false)
}

export function setWebLocale(locale: WebLocale): void {
  applyLocale(locale, true)
}

export function getWebLocale(): WebLocale {
  return activeLocale
}

/** Native browser dialogs do not have DOM nodes for the observer to translate. */
export function translateWebText(source: string): string {
  return translateSource(source, activeLocale)
}

export function bindWebLocaleSelector(onChange?: (locale: WebLocale) => void): () => void {
  const select = document.getElementById('agnes-locale')
  if (!(select instanceof HTMLSelectElement)) return () => undefined
  const sync = (): void => {
    select.value = activeLocale
  }
  const onSelect = (): void => {
    if (!isWebLocale(select.value)) return
    setWebLocale(select.value)
    onChange?.(select.value)
  }
  const onLocale = (): void => sync()
  select.addEventListener('change', onSelect)
  window.addEventListener(WEB_LOCALE_CHANGED_EVENT, onLocale)
  sync()
  return () => {
    select.removeEventListener('change', onSelect)
    window.removeEventListener(WEB_LOCALE_CHANGED_EVENT, onLocale)
  }
}

export function disposeWebLocale(): void {
  observer?.disconnect()
  observer = undefined
  window.removeEventListener('storage', handleStorage)
}
