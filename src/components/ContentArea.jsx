import Icon from './Icon'

const ITEM_PREVIEWS = {
  'briefing': { title: '工作简报', desc: '查看工作动态、关键指标和重点事项简报', tag: '概览' },
  'cockpit': { title: '数据驾驶舱', desc: '全局数据可视化大屏，关键指标实时监控', tag: '概览' },
  'monthly': { title: '安全月报', desc: '按月汇总安全数据，生成自动报告', tag: '概览' },
  'dashboard': { title: '数据看板', desc: '自定义数据看板，关注核心指标变化', tag: '概览' },
  'stats': { title: '数据统计', desc: '多维度数据统计与分析', tag: '数据' },

  'org-structure': { title: '组织架构', desc: '管理组织架构和单位层级关系', tag: '组织' },
  'liangzhu': { title: '良渚街道', desc: '良渚街道信息与相关管理', tag: '组织' },
  'unit-contacts': { title: '服务单位通讯录', desc: '管理所有服务单位联系信息', tag: '组织' },
  'enterprise-contacts': { title: '企业通讯录', label: '企业通讯录', desc: '企业联系人信息管理', tag: '通讯录' },
  'whistle-contacts': { title: '吹哨小分队通讯录', desc: '吹哨小分队成员联系信息', tag: '通讯录' },
  'nine-small-contacts': { title: '九小场所通讯录', desc: '九小场所联系人信息管理', tag: '通讯录' },
  'household-query': { title: '一户式查询', desc: '按户为单位综合查询相关信息', tag: '通讯录' },
  'tags': { title: '标签管理', desc: '创建和管理分类标签体系', tag: '基础' },

  'daily-supervise': { title: '日常监管', desc: '开展日常巡查、检查任务分配与执行跟踪', tag: '业务' },
  'inspect-check': { title: '监督检查', desc: '执行监督检查任务，记录检查结果', tag: '业务' },
  'work-eval': { title: '工作评价', desc: '评价和反馈工作完成质量', tag: '业务' },
  'work-assign': { title: '工作分配管理', desc: '分配工作任务，跟踪执行进度', tag: '业务' },
  'audit-center': { title: '审核中心', desc: '集中审核各类审批流程', tag: '5 项待处理' },
  'work-ticket': { title: '作业票报备', desc: '作业票申请、审批与备案管理', tag: '业务' },
  'hazard-rectify': { title: '隐患监督整改', desc: '跟踪隐患整改进度，超期预警督办', tag: '8 项待整改' },
  'my-signature': { title: '我的签名', desc: '管理个人电子签名和签章', tag: '业务' },

  'emergency-cloud': { title: '应急云学堂', desc: '在线学习和培训平台', tag: '宣教' },
  'consolidate': { title: '固本强基', desc: '基础能力建设和巩固提升', tag: '宣教' },

  'joint-defense': { title: '防消联勤', desc: '防火监督与灭火救援联勤联动', tag: '防消' },
  'digital-cockpit': { title: '数字驾驶舱', desc: '防消联勤专题数字驾驶舱', tag: '防消' },

  'messages': { title: '消息送达', desc: '系统消息通知与送达管理', tag: '12 条未读' },
  'settings': { title: '设置', desc: '系统全局设置', tag: '系统' },
  'org-settings': { title: '组织设置', desc: '组织架构和单位信息配置', tag: '系统' },
  'admin-change': { title: '主管理员变更', desc: '变更系统主管理员', tag: '系统' },
  'account-mgmt': { title: '后台账号管理', desc: '管理后台用户账号', tag: '系统' },
  'role-mgmt': { title: '角色管理', desc: '管理角色和权限分配', tag: '系统' },
  'menu-mgmt': { title: '菜单管理', desc: '配置系统菜单结构', tag: '系统' },
  'home-config': { title: '主页配置', desc: '配置系统首页内容和布局', tag: '系统' },
}

export default function ContentArea({ activeId, proposal }) {
  const preview = ITEM_PREVIEWS[activeId] || {
    title: activeId,
    desc: '功能模块详情页',
    tag: ''
  }

  return (
    <main className="flex-1 flex flex-col bg-[#f8fafb] min-w-0">
      <div className="px-8 pt-6 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
          <span>{proposal?.label || '导航'}</span>
          <span className="text-slate-300">/</span>
          <span className="text-slate-600">{preview.title}</span>
        </div>
        <h1 className="text-xl font-semibold text-slate-800 tracking-tight">
          {preview.title}
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          {preview.desc}
        </p>
      </div>

      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-4xl">
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[
              { label: '今日待办', value: '16', change: '+3', color: 'text-red-500' },
              { label: '本周完成', value: '142', change: '+12.5%', color: 'text-emerald-500' },
              { label: '隐患整改率', value: '87.3%', change: '+5.2%', color: 'text-emerald-500' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white rounded-xl border border-slate-200/50 p-5 shadow-[0_1px_3px_-2px_rgba(0,0,0,0.05)]">
                <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                  {stat.label}
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-2xl font-semibold text-slate-800 tabular-nums tracking-tight">
                    {stat.value}
                  </span>
                  <span className={`text-xs font-medium ${stat.color}`}>
                    {stat.change}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <div className="bg-white rounded-xl border border-slate-200/50 p-6 shadow-[0_1px_3px_-2px_rgba(0,0,0,0.05)]">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-xs font-medium text-slate-500">最近更新</span>
              </div>
              <div className="space-y-3">
                {[
                  { title: '第三季度消防安全检查计划已发布', time: '10 分钟前', type: '通知' },
                  { title: '良渚街道 5 家单位隐患整改即将到期', time: '1 小时前', type: '预警' },
                  { title: '8 月安全月报已生成，点击查看', time: '3 小时前', type: '报告' },
                ].map((item) => (
                  <div key={item.title} className="flex items-center gap-3 py-2 border-b border-slate-50 last:border-0">
                    <span className={`
                      text-[10px] font-medium px-1.5 py-0.5 rounded
                      ${item.type === '预警' ? 'bg-red-50 text-red-500' : ''}
                      ${item.type === '通知' ? 'bg-blue-50 text-blue-500' : ''}
                      ${item.type === '报告' ? 'bg-emerald-50 text-emerald-600' : ''}
                    `}>
                      {item.type}
                    </span>
                    <span className="flex-1 text-sm text-slate-700">{item.title}</span>
                    <span className="text-[11px] text-slate-400">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
