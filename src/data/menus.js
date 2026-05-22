/**
 * 导航菜单数据 — 两层结构，无折叠
 */

const _CURRENT = {
  id: 'current',
  label: '当前结构',
  description: '系统现有导航结构',
  sections: [
    {
      title: '常用',
      items: [
        { id: 'briefing', label: '工作简报', icon: 'ReaderIcon' },
        { id: 'cockpit', label: '数据驾驶舱', icon: 'BarChartIcon' },
        { id: 'monthly', label: '安全月报', icon: 'CalendarIcon' },
        { id: 'dashboard', label: '数据看板', icon: 'GridIcon' },
      ],
    },
    {
      title: '组织',
      items: [
        { id: 'org-structure', label: '组织架构', icon: 'LayersIcon', children: [
          { id: 'liangzhu', label: '良渚街道', icon: 'HomeIcon' },
          { id: 'unit-contacts', label: '服务单位通讯录', icon: 'ClipboardIcon' },
          { id: 'enterprise-contacts', label: '企业通讯录', icon: 'HomeIcon' },
          { id: 'whistle-contacts', label: '吹哨小分队通讯录', icon: 'PersonIcon' },
          { id: 'tags', label: '标签管理', icon: 'DotsVerticalIcon' },
          { id: 'household-query', label: '一户式查询', icon: 'MagnifyingGlassIcon' },
          { id: 'nine-small-contacts', label: '九小场所通讯录', icon: 'HomeIcon' },
        ]},
      ],
    },
    {
      title: '业务工作',
      items: [
        { id: 'daily-supervise', label: '日常监管', icon: 'MagnifyingGlassIcon' },
        { id: 'inspect-check', label: '监督检查', icon: 'CheckCircledIcon' },
        { id: 'work-eval', label: '工作评价', icon: 'StarIcon' },
        { id: 'work-assign', label: '工作分配管理', icon: 'Share1Icon' },
        { id: 'audit-center', label: '审核中心', icon: 'CheckboxIcon', badge: '5' },
        { id: 'work-ticket', label: '作业票报备', icon: 'Pencil2Icon' },
        { id: 'hazard-rectify', label: '隐患监督整改', icon: 'ExclamationTriangleIcon', badge: '8' },
        { id: 'my-signature', label: '我的签名', icon: 'Pencil2Icon' },
      ],
    },
    {
      title: '数据',
      items: [
        { id: 'stats', label: '数据统计', icon: 'BarChartIcon' },
      ],
    },
    {
      title: '宣教培训',
      items: [
        { id: 'emergency-cloud', label: '应急云学堂', icon: 'BookmarkIcon' },
        { id: 'consolidate', label: '固本强基', icon: 'StackIcon' },
      ],
    },
    {
      title: '防消联勤',
      items: [
        { id: 'joint-defense', label: '防消联勤', icon: 'LightningBoltIcon' },
        { id: 'digital-cockpit', label: '数字驾驶舱', icon: 'BarChartIcon' },
      ],
    },
    {
      title: '系统',
      items: [
        { id: 'messages', label: '消息送达', icon: 'BellIcon', badge: '12' },
        { id: 'settings', label: '设置', icon: 'GearIcon', children: [
          { id: 'org-settings', label: '组织设置', icon: 'GearIcon' },
          { id: 'admin-change', label: '主管理员变更', icon: 'PersonIcon' },
          { id: 'account-mgmt', label: '后台账号管理', icon: 'PersonIcon' },
          { id: 'role-mgmt', label: '角色管理', icon: 'PersonIcon' },
          { id: 'menu-mgmt', label: '菜单管理', icon: 'ListBulletIcon' },
          { id: 'home-config', label: '主页配置', icon: 'ReaderIcon' },
        ]},
      ],
    },
  ],
}

// ============================================================
// 方案A：三域分层
// ============================================================
const _THREE_DOMAIN = {
  id: 'three-domain',
  label: '方案A · 三域分层',
  description: '工作台 · 监管执行 · 后台管理',
  sections: [
    {
      title: '工作台',
      items: [
        { id: 'briefing', label: '工作简报', icon: 'ReaderIcon' },
        { id: 'cockpit', label: '数据驾驶舱', icon: 'BarChartIcon' },
        { id: 'dashboard', label: '数据看板', icon: 'GridIcon' },
        { id: 'monthly', label: '安全月报', icon: 'CalendarIcon' },
        { id: 'messages', label: '消息中心', icon: 'BellIcon', badge: '12' },
      ],
    },
    {
      title: '监管执行',
      items: [
        { id: 'daily-supervise', label: '日常监管', icon: 'MagnifyingGlassIcon' },
        { id: 'inspect-check', label: '监督检查', icon: 'CheckCircledIcon' },
        { id: 'hazard-rectify', label: '隐患监督整改', icon: 'ExclamationTriangleIcon', badge: '8' },
        { id: 'audit-center', label: '审核中心', icon: 'CheckboxIcon', badge: '5' },
        { id: 'work-ticket', label: '作业票报备', icon: 'Pencil2Icon' },
        { id: 'work-assign', label: '工作分配管理', icon: 'Share1Icon' },
        { id: 'work-eval', label: '工作评价', icon: 'StarIcon' },
        { id: 'my-signature', label: '我的签名', icon: 'Pencil2Icon' },
        { id: 'stats', label: '数据统计', icon: 'BarChartIcon' },
      ],
    },
    {
      title: '组织架构',
      items: [
        { id: 'org-structure', label: '组织架构', icon: 'LayersIcon' },
        { id: 'liangzhu', label: '良渚街道', icon: 'HomeIcon' },
        { id: 'unit-contacts', label: '服务单位通讯录', icon: 'ClipboardIcon' },
        { id: 'enterprise-contacts', label: '企业通讯录', icon: 'HomeIcon' },
        { id: 'whistle-contacts', label: '吹哨小分队通讯录', icon: 'PersonIcon' },
        { id: 'nine-small-contacts', label: '九小场所通讯录', icon: 'HomeIcon' },
        { id: 'household-query', label: '一户式查询', icon: 'MagnifyingGlassIcon' },
        { id: 'tags', label: '标签管理', icon: 'DotsVerticalIcon' },
      ],
    },
    {
      title: '宣教与应急',
      items: [
        { id: 'emergency-cloud', label: '应急云学堂', icon: 'BookmarkIcon' },
        { id: 'consolidate', label: '固本强基', icon: 'StackIcon' },
        { id: 'joint-defense', label: '防消联勤', icon: 'LightningBoltIcon' },
        { id: 'digital-cockpit', label: '数字驾驶舱', icon: 'BarChartIcon' },
      ],
    },
    {
      title: '系统设置',
      items: [
        { id: 'settings', label: '系统设置', icon: 'GearIcon' },
        { id: 'org-settings', label: '组织设置', icon: 'GearIcon' },
        { id: 'admin-change', label: '主管理员变更', icon: 'PersonIcon' },
        { id: 'account-mgmt', label: '后台账号管理', icon: 'PersonIcon' },
        { id: 'role-mgmt', label: '角色管理', icon: 'PersonIcon' },
        { id: 'menu-mgmt', label: '菜单管理', icon: 'ListBulletIcon' },
        { id: 'home-config', label: '主页配置', icon: 'ReaderIcon' },
      ],
    },
  ],
}

// ============================================================
// 方案B：职能归并
// ============================================================
const _COMPRESS = {
  id: 'compress',
  label: '方案B · 职能归并',
  description: '将分散的同职能项合并到一个分区下',
  sections: [
    {
      title: '概览',
      items: [
        { id: 'briefing', label: '工作简报', icon: 'ReaderIcon' },
        { id: 'cockpit', label: '数据驾驶舱', icon: 'BarChartIcon' },
        { id: 'dashboard', label: '数据看板', icon: 'GridIcon' },
        { id: 'monthly', label: '安全月报', icon: 'CalendarIcon' },
        { id: 'digital-cockpit', label: '数字驾驶舱', icon: 'BarChartIcon' },
        { id: 'stats', label: '数据统计', icon: 'BarChartIcon' },
      ],
    },
    {
      title: '任务',
      items: [
        { id: 'daily-supervise', label: '日常监管', icon: 'MagnifyingGlassIcon' },
        { id: 'inspect-check', label: '监督检查', icon: 'CheckCircledIcon' },
        { id: 'hazard-rectify', label: '隐患监督整改', icon: 'ExclamationTriangleIcon', badge: '8' },
        { id: 'audit-center', label: '审核中心', icon: 'CheckboxIcon', badge: '5' },
        { id: 'work-ticket', label: '作业票报备', icon: 'Pencil2Icon' },
        { id: 'work-eval', label: '工作评价', icon: 'StarIcon' },
        { id: 'my-signature', label: '我的签名', icon: 'Pencil2Icon' },
      ],
    },
    {
      title: '通讯录',
      items: [
        { id: 'unit-contacts', label: '服务单位通讯录', icon: 'ClipboardIcon' },
        { id: 'enterprise-contacts', label: '企业通讯录', icon: 'HomeIcon' },
        { id: 'whistle-contacts', label: '吹哨小分队通讯录', icon: 'PersonIcon' },
        { id: 'nine-small-contacts', label: '九小场所通讯录', icon: 'HomeIcon' },
        { id: 'household-query', label: '一户式查询', icon: 'MagnifyingGlassIcon' },
        { id: 'tags', label: '标签管理', icon: 'DotsVerticalIcon' },
      ],
    },
    {
      title: '组织与系统',
      items: [
        { id: 'org-structure', label: '组织架构', icon: 'LayersIcon' },
        { id: 'liangzhu', label: '良渚街道', icon: 'HomeIcon' },
        { id: 'work-assign', label: '工作分配管理', icon: 'Share1Icon' },
        { id: 'settings', label: '系统设置', icon: 'GearIcon' },
        { id: 'org-settings', label: '组织设置', icon: 'GearIcon' },
        { id: 'admin-change', label: '主管理员变更', icon: 'PersonIcon' },
        { id: 'account-mgmt', label: '后台账号管理', icon: 'PersonIcon' },
        { id: 'role-mgmt', label: '角色管理', icon: 'PersonIcon' },
        { id: 'menu-mgmt', label: '菜单管理', icon: 'ListBulletIcon' },
        { id: 'home-config', label: '主页配置', icon: 'ReaderIcon' },
      ],
    },
    {
      title: '宣教培训',
      items: [
        { id: 'emergency-cloud', label: '应急云学堂', icon: 'BookmarkIcon' },
        { id: 'consolidate', label: '固本强基', icon: 'StackIcon' },
        { id: 'joint-defense', label: '防消联勤', icon: 'LightningBoltIcon' },
      ],
    },
    {
      title: '消息',
      items: [
        { id: 'messages', label: '消息送达', icon: 'BellIcon', badge: '12' },
      ],
    },
  ],
}

// ============================================================
// 方案C：场景归类
// ============================================================
const _SCENE = {
  id: 'scene',
  label: '方案C · 场景归类',
  description: '按使用场景聚合：看数据→做任务→管单位→设系统',
  sections: [
    {
      title: '看数据',
      items: [
        { id: 'briefing', label: '工作简报', icon: 'ReaderIcon' },
        { id: 'cockpit', label: '数据驾驶舱', icon: 'BarChartIcon' },
        { id: 'monthly', label: '安全月报', icon: 'CalendarIcon' },
        { id: 'dashboard', label: '数据看板', icon: 'GridIcon' },
        { id: 'stats', label: '数据统计', icon: 'BarChartIcon' },
        { id: 'digital-cockpit', label: '数字驾驶舱', icon: 'BarChartIcon' },
      ],
    },
    {
      title: '做任务',
      items: [
        { id: 'daily-supervise', label: '日常监管', icon: 'MagnifyingGlassIcon' },
        { id: 'inspect-check', label: '监督检查', icon: 'CheckCircledIcon' },
        { id: 'hazard-rectify', label: '隐患监督整改', icon: 'ExclamationTriangleIcon', badge: '8' },
        { id: 'audit-center', label: '审核中心', icon: 'CheckboxIcon', badge: '5' },
        { id: 'work-ticket', label: '作业票报备', icon: 'Pencil2Icon' },
        { id: 'work-eval', label: '工作评价', icon: 'StarIcon' },
        { id: 'my-signature', label: '我的签名', icon: 'Pencil2Icon' },
        { id: 'work-assign', label: '工作分配管理', icon: 'Share1Icon' },
        { id: 'messages', label: '消息送达', icon: 'BellIcon', badge: '12' },
      ],
    },
    {
      title: '管单位',
      items: [
        { id: 'org-structure', label: '组织架构', icon: 'LayersIcon' },
        { id: 'liangzhu', label: '良渚街道', icon: 'HomeIcon' },
        { id: 'unit-contacts', label: '服务单位通讯录', icon: 'ClipboardIcon' },
        { id: 'enterprise-contacts', label: '企业通讯录', icon: 'HomeIcon' },
        { id: 'whistle-contacts', label: '吹哨小分队通讯录', icon: 'PersonIcon' },
        { id: 'nine-small-contacts', label: '九小场所通讯录', icon: 'HomeIcon' },
        { id: 'household-query', label: '一户式查询', icon: 'MagnifyingGlassIcon' },
        { id: 'tags', label: '标签管理', icon: 'DotsVerticalIcon' },
      ],
    },
    {
      title: '设系统',
      items: [
        { id: 'settings', label: '系统设置', icon: 'GearIcon' },
        { id: 'org-settings', label: '组织设置', icon: 'GearIcon' },
        { id: 'admin-change', label: '主管理员变更', icon: 'PersonIcon' },
        { id: 'account-mgmt', label: '后台账号管理', icon: 'PersonIcon' },
        { id: 'role-mgmt', label: '角色管理', icon: 'PersonIcon' },
        { id: 'menu-mgmt', label: '菜单管理', icon: 'ListBulletIcon' },
        { id: 'home-config', label: '主页配置', icon: 'ReaderIcon' },
      ],
    },
    {
      title: '学与防',
      items: [
        { id: 'emergency-cloud', label: '应急云学堂', icon: 'BookmarkIcon' },
        { id: 'consolidate', label: '固本强基', icon: 'StackIcon' },
        { id: 'joint-defense', label: '防消联勤', icon: 'LightningBoltIcon' },
      ],
    },
  ],
}

export const PROPOSALS = [_CURRENT, _THREE_DOMAIN, _COMPRESS, _SCENE]
