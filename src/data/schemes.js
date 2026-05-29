/**
 * 导航方案数据定义
 * 前4个方案为原有业务方案，后3个为导航架构方案（带 layoutType）
 * 每个方案包含：label / nav / logicTitle / logic / points / direction
 * layoutType: side | icon | top | mix
 * 一级菜单含 icon（@radix-ui/react-icons 名称），二级菜单无图标
 */

// Icon map for level-0 items
const I = {
  briefing: 'ReaderIcon',
  cockpit: 'BarChartIcon',
  monthly: 'CalendarIcon',
  dashboard: 'GridIcon',
  'org-structure': 'LayersIcon',
  liangzhu: 'HomeIcon',
  'unit-contacts': 'ClipboardIcon',
  'enterprise-contacts': 'HomeIcon',
  'whistle-contacts': 'PersonIcon',
  tags: 'DotsVerticalIcon',
  'household-query': 'MagnifyingGlassIcon',
  'nine-small-contacts': 'HomeIcon',
  'group-org': 'LayersIcon',
  'group-targets': 'PersonIcon',
  'group-work': 'ClipboardIcon',
  'group-education': 'BookmarkIcon',
  'group-stats': 'BarChartIcon',
  'group-settings': 'GearIcon',
  'business-work': 'ClipboardIcon',
  'daily-supervise': 'MagnifyingGlassIcon',
  'inspect-check': 'CheckCircledIcon',
  'work-eval': 'StarIcon',
  'work-assign': 'Share1Icon',
  'audit-center': 'CheckboxIcon',
  'work-ticket': 'Pencil2Icon',
  'hazard-rectify': 'ExclamationTriangleIcon',
  'my-signature': 'Pencil2Icon',
  stats: 'BarChartIcon',
  'town-check-stats': 'BarChartIcon',
  'joint-defense': 'LightningBoltIcon',
  'joint-defense-page': 'LightningBoltIcon',
  'digital-cockpit': 'BarChartIcon',
  education: 'BookmarkIcon',
  'emergency-cloud': 'BookmarkIcon',
  consolidate: 'StackIcon',
  messages: 'BellIcon',
  'precise-push': 'TargetIcon',
  settings: 'GearIcon',
  'org-settings': 'GearIcon',
  'admin-change': 'PersonIcon',
  'account-mgmt': 'PersonIcon',
  'role-mgmt': 'PersonIcon',
  'menu-mgmt': 'ListBulletIcon',
  'home-config': 'ReaderIcon',
  // New items in proposals
  'area-overview': 'LayersIcon',
  'risk-distribution': 'BarChartIcon',
  todo: 'CheckCircledIcon',
  'pending-audit': 'CheckboxIcon',
  'pending-rectify': 'ExclamationTriangleIcon',
  'pending-deliver': 'EnvelopeClosedIcon',
  'review-recheck': 'UpdateIcon',
  'closed-archive': 'ArchiveIcon',
  'training-record': 'BookmarkIcon',
  // Demo menu icons
  'demo-overview': 'ReaderIcon',
  'demo-user': 'PersonIcon',
  'demo-order': 'ClipboardIcon',
  'demo-content': 'BookmarkIcon',
  'demo-finance': 'BarChartIcon',
  'demo-setting': 'GearIcon',
}

// Helper: add icon to a nav item
function wi(items) {
  return items.map((item) => {
    const copy = { ...item, icon: I[item.id] || 'ReaderIcon' }
    if (copy.children) {
      copy.children = copy.children.map((c) => ({ ...c, icon: I[c.id] || 'ReaderIcon' }))
    }
    return copy
  })
}

// Group icon map for section-titles-turned-menu-items
const GI = {
  '总览首页': 'GridIcon',
  '总览': 'ReaderIcon',
  '组织架构': 'LayersIcon',
  '政府组织': 'LayersIcon',
  '服务对象': 'PersonIcon',
  '监管对象': 'PersonIcon',
  '业务办理': 'ClipboardIcon',
  '协同联动': 'Share1Icon',
  '宣教培训': 'BookmarkIcon',
  '统计分析': 'BarChartIcon',
  '系统管理': 'GearIcon',
  '辖区治理': 'LayersIcon',
  '服务单位': 'HomeIcon',
  '业务记录': 'ClipboardIcon',
  '培训记录': 'BookmarkIcon',
  '系统设置': 'GearIcon',
  '工作台': 'CheckCircledIcon',
  '监管检查': 'CheckCircledIcon',
  '隐患闭环': 'ExclamationTriangleIcon',
  '联勤联动': 'LightningBoltIcon',
  '对象查询': 'MagnifyingGlassIcon',
  '组织管理': 'LayersIcon',
  '分析报表': 'BarChartIcon',
}

// Transform grouped sections into collapsible first-level items
function g(sections) {
  return [{
    title: '',
    items: sections.map((sec) => ({
      id: 'g-' + sec.title.replace(/\s/g, ''),
      label: sec.title,
      icon: GI[sec.title] || 'ReaderIcon',
      children: sec.items.map((item) => ({
        ...item,
        icon: I[item.id] || 'ReaderIcon',
      })),
    })),
  }]
}

// ===== 通用示例菜单（给导航架构方案使用） =====
const DEMO_NAV = wi([
  { id: 'demo-overview', label: '总览', icon: 'ReaderIcon' },
  { id: 'demo-user', label: '用户管理', icon: 'PersonIcon', children: [
    { id: 'demo-user-list', label: '用户列表' },
    { id: 'demo-user-role', label: '角色管理' },
    { id: 'demo-user-perm', label: '权限配置' },
  ]},
  { id: 'demo-order', label: '订单管理', icon: 'ClipboardIcon', children: [
    { id: 'demo-order-list', label: '订单列表' },
    { id: 'demo-order-detail', label: '订单详情' },
    { id: 'demo-order-refund', label: '退款管理' },
  ]},
  { id: 'demo-content', label: '内容管理', icon: 'BookmarkIcon', children: [
    { id: 'demo-content-article', label: '文章管理' },
    { id: 'demo-content-category', label: '分类管理' },
    { id: 'demo-content-tag', label: '标签管理' },
  ]},
  { id: 'demo-finance', label: '财务管理', icon: 'BarChartIcon', children: [
    { id: 'demo-finance-income', label: '收入概览' },
    { id: 'demo-finance-bill', label: '账单管理' },
    { id: 'demo-finance-invoice', label: '发票管理' },
  ]},
  { id: 'demo-setting', label: '系统设置', icon: 'GearIcon', children: [
    { id: 'demo-setting-basic', label: '基础配置' },
    { id: 'demo-setting-log', label: '日志查看' },
    { id: 'demo-setting-notice', label: '系统公告' },
  ]},
])

/**
 * 辅助函数：展平嵌套的 nav 结构
 * 用于 top/mix 模式取第一级菜单列表
 */
function getFirstLevelItems(scheme) {
  const items = []
  for (const section of scheme.nav) {
    for (const item of section.items) {
      items.push(item)
    }
  }
  return items
}

const SCHEMES = [
  // ================================================================
  // 现有结构（原始方案，不修改）
  // ================================================================
  {
    key: 'current',
    label: '现有结构',
    logicTitle: '方案逻辑说明',
    logic: '这是当前系统在用的导航结构，按功能模块直接堆叠。一级菜单中混入了数据入口、政府组织、外部对象、业务动作、系统配置等不同性质的入口，分类标准不统一。',
    points: [
      '一级菜单分类标准不统一：数据入口、政府组织、外部对象、业务动作、系统配置混在同一层',
      '部分三级嵌套导致菜单层级过深，如 组织架构 → 服务单位通讯录 → 企业通讯录',
      '镇街检查统计为老页面，后续下线',
    ],
    direction: '当前结构保留展示，便于对比新方案的优化效果',
    nav: [
      {
        title: '',
        items: wi([
          { id: 'briefing', label: '工作简报' },
          { id: 'cockpit', label: '数据驾驶舱' },
          { id: 'monthly', label: '安全月报' },
          { id: 'dashboard', label: '数据看板' },
          { id: 'org-structure', label: '组织架构', children: [
            { id: 'liangzhu', label: '良渚街道' },
          ]},
          { id: 'unit-contacts', label: '服务单位通讯录', children: [
            { id: 'enterprise-contacts', label: '企业通讯录' },
            { id: 'whistle-contacts', label: '吹哨小分队通讯录' },
            { id: 'tags', label: '标签管理' },
            { id: 'household-query', label: '一户式查询' },
            { id: 'nine-small-contacts', label: '九小场所通讯录' },
          ]},
          { id: 'business-work', label: '业务工作', children: [
            { id: 'daily-supervise', label: '日常监管' },
            { id: 'inspect-check', label: '监督检查' },
            { id: 'work-eval', label: '工作评价' },
            { id: 'work-assign', label: '工作分配管理' },
            { id: 'audit-center', label: '审核中心', badge: '5' },
            { id: 'work-ticket', label: '作业票报备' },
            { id: 'hazard-rectify', label: '隐患监督整改', badge: '8' },
            { id: 'my-signature', label: '我的签名' },
          ]},
          { id: 'stats', label: '数据统计', children: [
            { id: 'town-check-stats', label: '镇街检查统计', deprecated: true },
          ]},
          { id: 'joint-defense', label: '防消联勤', children: [
            { id: 'joint-defense-page', label: '防消联勤' },
            { id: 'digital-cockpit', label: '数字驾驶舱' },
          ]},
          { id: 'education', label: '宣教培训', children: [
            { id: 'emergency-cloud', label: '应急云学堂' },
            { id: 'consolidate', label: '固本强基' },
          ]},
          { id: 'messages', label: '消息触达', children: [
            { id: 'precise-push', label: '精准推送' },
          ]},
          { id: 'settings', label: '设置', children: [
            { id: 'org-settings', label: '组织设置' },
            { id: 'admin-change', label: '主管理员变更' },
            { id: 'account-mgmt', label: '后台账号管理' },
            { id: 'role-mgmt', label: '角色管理' },
            { id: 'menu-mgmt', label: '菜单管理' },
            { id: 'home-config', label: '主页配置' },
          ]},
        ]),
      },
    ],
  },

  // ================================================================
  // 方案一：按工作目标 ★ 推荐（原始方案，不修改）
  // ================================================================
  {
    key: 'goal',
    label: '方案一｜按工作目标',
    logicTitle: '方案逻辑说明',
    logic: '依据实际服务目录按工作入口重组导航，数据驾驶舱作为首页着陆入口，工作简报即工作台。所有菜单项对应服务目录中的真实功能，不再使用虚构的菜单名。',
    points: [
      '数据驾驶舱作为一级入口：直接展示，不再藏在分组下',
      '业务办理整合完整链路：日常监管→监督检查→审核中心→隐患整改→作业票报备→工作分配→防消联勤，一条线贯通',
      '统计分析聚焦看数：安全月报、数据看板、镇街检查统计、工作评价',
      '系统管理收拢配置：组织设置、账号角色、菜单主页等全部集中',
    ],
    direction: '按工作入口重组，适合第一版落地｜后续可根据业务对象或任务链路演进',
    nav: [
      {
        title: '',
        items: wi([
          { id: 'cockpit', label: '数据驾驶舱' },
          { id: 'briefing', label: '工作简报（工作台）' },
          { id: 'org-structure', label: '组织架构' },
          { id: 'group-targets', label: '监管对象', children: [
            { id: 'enterprise-contacts', label: '责任主体通讯录（企业通讯录）' },
            { id: 'nine-small-contacts', label: '九小场所通讯录' },
            { id: 'tags', label: '标签管理' },
          ]},
          { id: 'group-work', label: '业务办理', children: [
            { id: 'daily-supervise', label: '日常监管' },
            { id: 'inspect-check', label: '监督检查' },
            { id: 'audit-center', label: '审核中心', badge: '5' },
            { id: 'hazard-rectify', label: '隐患监督整改', badge: '8' },
            { id: 'work-ticket', label: '作业票报备' },
            { id: 'work-assign', label: '工作分配管理' },
            { id: 'joint-defense', label: '防消联勤' },
          ]},
          { id: 'group-education', label: '宣教培训', children: [
            { id: 'emergency-cloud', label: '应急云学堂' },
            { id: 'consolidate', label: '固本强基培训' },
          ]},
          { id: 'precise-push', label: '精准推送' },
          { id: 'group-stats', label: '统计分析', children: [
            { id: 'monthly', label: '安全月报' },
            { id: 'dashboard', label: '数据看板' },
            { id: 'town-check-stats', label: '镇街检查统计', deprecated: true },
            { id: 'work-eval', label: '工作评价' },
          ]},
          { id: 'group-settings', label: '系统管理', children: [
            { id: 'org-settings', label: '组织设置' },
            { id: 'admin-change', label: '主管理员变更' },
            { id: 'account-mgmt', label: '后台账号管理' },
            { id: 'role-mgmt', label: '角色管理' },
            { id: 'menu-mgmt', label: '菜单管理' },
            { id: 'home-config', label: '主页配置' },
          ]},
        ]),
      },
    ],
  },

  // ================================================================
  // 方案二：按业务对象（原始方案，不修改）
  // ================================================================
  {
    key: 'object',
    label: '方案二｜按业务对象',
    logicTitle: '方案逻辑说明',
    logic: '这个方案的核心是把系统变成治理对象库，而不是菜单功能堆。',
    points: [
      '对象沉淀更强：政府组织、企业、九小场所、服务队伍分别形成档案，避免把内部组织和外部服务对象混成一类',
      '适合治理数据资产：业务动作不只是一次操作，而是沉淀到对象上的记录',
      '短期入口可能变深：如果用户只是想快速办一件事，按对象进入会多一层选择',
    ],
    direction: '适合做长期架构｜需要补齐对象模型｜高频业务入口要额外前置',
    nav: g([
      {
        title: '总览',
        items: wi([
          { id: 'cockpit', label: '数据驾驶舱' },
          { id: 'briefing', label: '工作简报' },
          { id: 'monthly', label: '安全月报' },
        ]),
      },
      {
        title: '政府组织',
        items: wi([
          { id: 'org-structure', label: '组织架构' },
          { id: 'liangzhu', label: '良渚街道' },
          { id: 'account-mgmt', label: '后台账号管理' },
          { id: 'role-mgmt', label: '角色管理' },
        ]),
      },
      {
        title: '辖区治理',
        items: wi([
          { id: 'area-overview', label: '区域概况' },
          { id: 'risk-distribution', label: '风险分布' },
          { id: 'dashboard', label: '数据看板' },
        ]),
      },
      {
        title: '服务单位',
        items: wi([
          { id: 'enterprise-contacts', label: '企业通讯录' },
          { id: 'nine-small-contacts', label: '九小场所通讯录' },
          { id: 'household-query', label: '一户式查询' },
          { id: 'tags', label: '标签管理' },
          { id: 'whistle-contacts', label: '吹哨小分队通讯录' },
        ]),
      },
      {
        title: '业务记录',
        items: wi([
          { id: 'daily-supervise', label: '日常监管' },
          { id: 'inspect-check', label: '监督检查' },
          { id: 'work-ticket', label: '作业票报备' },
          { id: 'hazard-rectify', label: '隐患监督整改', badge: '8' },
          { id: 'joint-defense', label: '防消联勤' },
        ]),
      },
      {
        title: '培训记录',
        items: wi([
          { id: 'emergency-cloud', label: '应急云学堂' },
          { id: 'consolidate', label: '固本强基' },
        ]),
      },
      {
        title: '系统设置',
        items: wi([
          { id: 'org-settings', label: '组织设置' },
          { id: 'menu-mgmt', label: '菜单管理' },
          { id: 'home-config', label: '主页配置' },
        ]),
      },
    ]),
  },

  // ================================================================
  // 方案三：按任务链路（原始方案，不修改）
  // ================================================================
  {
    key: 'task',
    label: '方案三｜按任务链路',
    logicTitle: '方案逻辑说明',
    logic: '这个方案最像真实工作台，但对业务理解要求最高。',
    points: [
      '高频任务更快：一线用户不需要先理解所有组织与对象分类，直接从待办、检查、整改、审核进入',
      '能暴露业务闭环：从任务接收、执行、整改、复核到归档，链路更完整',
      '不是简单改菜单：如果底层没有任务状态、流转状态、责任人机制，这个方案容易做成假工作台',
    ],
    direction: '适合第二阶段升级｜先验证高频任务链路｜不要只改菜单名，要改入口逻辑',
    nav: g([
      {
        title: '工作台',
        items: wi([
          { id: 'todo', label: '今日待办', badge: '16' },
          { id: 'pending-audit', label: '待审核', badge: '5' },
          { id: 'pending-rectify', label: '待整改', badge: '8' },
          { id: 'pending-deliver', label: '待送达' },
          { id: 'my-signature', label: '我的签名' },
        ]),
      },
      {
        title: '监管检查',
        items: wi([
          { id: 'daily-supervise', label: '日常监管' },
          { id: 'inspect-check', label: '监督检查' },
          { id: 'work-assign', label: '工作分配管理' },
          { id: 'work-eval', label: '工作评价' },
        ]),
      },
      {
        title: '隐患闭环',
        items: wi([
          { id: 'hazard-rectify', label: '隐患监督整改', badge: '8' },
          { id: 'audit-center', label: '审核中心', badge: '5' },
          { id: 'review-recheck', label: '整改复查' },
          { id: 'closed-archive', label: '闭环归档' },
        ]),
      },
      {
        title: '联勤联动',
        items: wi([
          { id: 'joint-defense', label: '防消联勤' },
          { id: 'digital-cockpit', label: '数字驾驶舱' },
          { id: 'whistle-contacts', label: '吹哨小分队通讯录' },
        ]),
      },
      {
        title: '宣教培训',
        items: wi([
          { id: 'emergency-cloud', label: '应急云学堂' },
          { id: 'consolidate', label: '固本强基' },
          { id: 'training-record', label: '培训记录' },
        ]),
      },
      {
        title: '对象查询',
        items: wi([
          { id: 'household-query', label: '一户式查询' },
          { id: 'enterprise-contacts', label: '企业通讯录' },
          { id: 'nine-small-contacts', label: '九小场所通讯录' },
          { id: 'unit-contacts', label: '服务单位通讯录' },
        ]),
      },
      {
        title: '组织管理',
        items: wi([
          { id: 'org-structure', label: '组织架构' },
          { id: 'liangzhu', label: '良渚街道' },
          { id: 'account-mgmt', label: '后台账号管理' },
          { id: 'role-mgmt', label: '角色管理' },
        ]),
      },
      {
        title: '分析报表',
        items: wi([
          { id: 'cockpit', label: '数据驾驶舱' },
          { id: 'briefing', label: '工作简报' },
          { id: 'monthly', label: '安全月报' },
          { id: 'stats', label: '数据统计' },
        ]),
      },
      {
        title: '系统管理',
        items: wi([
          { id: 'org-settings', label: '组织设置' },
          { id: 'account-mgmt', label: '后台账号管理' },
          { id: 'role-mgmt', label: '角色管理' },
          { id: 'menu-mgmt', label: '菜单管理' },
        ]),
      },
    ]),
  },

  // ================================================================
  // 方案五：图标侧栏（新架构）
  // 左侧仅显示图标，hover 展开显示文字
  // 类似 Vercel / Linear 风格
  // ================================================================
  {
    key: 'icon-sidebar',
    label: '方案五｜图标侧栏',
    layoutType: 'icon',
    logicTitle: '架构说明',
    logic: '左侧仅保留图标菜单，鼠标悬停时展开显示完整文字。最大化内容展示区域，适合高频操作的 SaaS 型后台。',
    points: [
      '默认只显示图标，节省横向空间',
      '鼠标悬停时展开完整菜单',
      '最大化内容区域，聚焦工作内容',
      '适合功能入口明确、操作频繁的系统',
    ],
    direction: '参考 Vercel / Linear / Supabase 等现代 SaaS 设计',
    nav: [
      {
        title: '',
        items: DEMO_NAV,
      },
    ],
  },

  // ================================================================
  // 方案六：顶部主导航（新架构）
  // 顶部一级导航，无侧边栏，内容区全宽
  // 类似 Salesforce / Atlassian 风格
  // ================================================================
  {
    key: 'top-nav',
    label: '方案六｜顶部主导航',
    layoutType: 'top',
    logicTitle: '架构说明',
    logic: '顶部放置一级导航菜单，无侧边栏。内容区全宽展示，适合模块数量少但每个模块功能深的系统。',
    points: [
      '顶部一级菜单清晰可见',
      '无侧边栏，内容区 100% 宽度',
      '二级菜单以下拉或子栏形式展示',
      '适合 CRM、项目管理等模块深而少的系统',
    ],
    direction: '参考 Salesforce / Jira / Atlassian 设计',
    nav: [
      {
        title: '',
        items: DEMO_NAV,
      },
    ],
  },

  // ================================================================
  // 方案七：混合导航（新架构）
  // 顶部一级菜单 + 左侧当前模块子菜单
  // 类似阿里云 / Ant Design Pro mix 风格
  // ================================================================
  {
    key: 'mix-nav',
    label: '方案七｜混合导航',
    layoutType: 'mix',
    logicTitle: '架构说明',
    logic: '顶部切换模块，左侧显示当前模块的完整功能树。适合模块多且每个模块内部结构复杂的专业系统。',
    points: [
      '顶部一级导航切换大模块',
      '左侧显示当前模块的完整子菜单',
      'Tab 工作区在子页面之间切换',
      '适合多模块专业平台（云平台/ERP）',
    ],
    direction: '参考阿里云控制台 / Ant Design Pro mix 布局',
    nav: [
      {
        title: '',
        items: DEMO_NAV,
      },
    ],
  },
]

export default SCHEMES
export { getFirstLevelItems }