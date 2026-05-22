/**
 * 四个导航方案的数据定义
 * 每个方案包含：label / nav / logicTitle / logic / points / direction
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

const SCHEMES = [
  // ================================================================
  // 现有结构
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
  // 方案一：按工作目标 ★ 推荐
  // ================================================================
  {
    key: 'goal',
    label: '方案一｜按工作目标',
    logicTitle: '方案逻辑说明',
    logic: '这个方案的核心是降低理解成本，先解决"入口到底属于哪类工作"。根据实际服务目录重新整理分组，去掉了产品文档中不存在于系统的虚构菜单名。',
    points: [
      '分类标准清楚：一级菜单统一按工作入口划分，总览首页、组织架构、监管对象、业务办理各司其职',
      '与实际服务目录对齐：每个分组和菜单项都对应服务目录中的真实功能，不再使用虚构的菜单名',
      '适合第一版落地：功能已按真实业务归类，用户能找到、研发能对应',
    ],
    direction: '按工作入口重组，适合第一版落地｜后续可根据业务对象或任务链路演进',
    nav: g([
      {
        title: '总览首页',
        items: wi([
          { id: 'briefing', label: '工作简报' },
          { id: 'cockpit', label: '数据驾驶舱' },
          { id: 'monthly', label: '安全月报' },
          { id: 'dashboard', label: '数据看板' },
        ]),
      },
      {
        title: '组织架构',
        items: wi([
          { id: 'liangzhu', label: '良渚街道' },
        ]),
      },
      {
        title: '监管对象',
        items: wi([
          { id: 'unit-contacts', label: '服务单位通讯录' },
          { id: 'enterprise-contacts', label: '企业通讯录' },
          { id: 'nine-small-contacts', label: '九小场所通讯录' },
          { id: 'household-query', label: '一户式查询' },
          { id: 'whistle-contacts', label: '吹哨小分队通讯录' },
          { id: 'tags', label: '标签管理' },
        ]),
      },
      {
        title: '业务办理',
        items: wi([
          { id: 'daily-supervise', label: '日常监管' },
          { id: 'inspect-check', label: '监督检查' },
          { id: 'work-ticket', label: '作业票报备' },
          { id: 'hazard-rectify', label: '隐患监督整改', badge: '8' },
          { id: 'audit-center', label: '审核中心', badge: '5' },
          { id: 'my-signature', label: '我的签名' },
        ]),
      },
      {
        title: '协同联动',
        items: wi([
          { id: 'joint-defense', label: '防消联勤' },
          { id: 'precise-push', label: '精准推送' },
        ]),
      },
      {
        title: '宣教培训',
        items: wi([
          { id: 'emergency-cloud', label: '应急云学堂' },
          { id: 'consolidate', label: '固本强基' },
        ]),
      },
      {
        title: '统计分析',
        items: wi([
          { id: 'stats', label: '数据统计' },
          { id: 'work-eval', label: '工作评价' },
          { id: 'digital-cockpit', label: '数字驾驶舱' },
        ]),
      },
      {
        title: '系统管理',
        items: wi([
          { id: 'org-settings', label: '组织设置' },
          { id: 'admin-change', label: '主管理员变更' },
          { id: 'account-mgmt', label: '后台账号管理' },
          { id: 'role-mgmt', label: '角色管理' },
          { id: 'menu-mgmt', label: '菜单管理' },
          { id: 'home-config', label: '主页配置' },
        ]),
      },
    ]),
  },

  // ================================================================
  // 方案二：按业务对象
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
  // 方案三：按任务链路
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
]

export default SCHEMES
