import { useState } from 'react'
import Icon from './Icon'
import WorkspaceTabs from './WorkspaceTabs'

const ITEM_PREVIEWS = {
  // ===== 原有业务方案 =====
  '__home__': { title: '首页', desc: '系统首页，欢迎使用管理后台', tag: '' },
  'briefing': { title: '工作简报', desc: '查看工作动态、关键指标和重点事项简报', tag: '' },
  'cockpit': { title: '数据驾驶舱', desc: '全局数据可视化大屏，关键指标实时监控', tag: '' },
  'monthly': { title: '安全月报', desc: '按月汇总安全数据，生成自动报告', tag: '' },
  'dashboard': { title: '数据看板', desc: '自定义数据看板，关注核心指标变化', tag: '' },
  'org-structure': { title: '组织架构', desc: '管理组织架构和单位层级关系', tag: '' },
  'liangzhu': { title: '良渚街道', desc: '良渚街道信息与相关管理', tag: '' },
  'unit-contacts': { title: '服务单位通讯录', desc: '管理所有服务单位联系信息', tag: '' },
  'enterprise-contacts': { title: '企业通讯录', desc: '企业联系人信息管理', tag: '' },
  'whistle-contacts': { title: '吹哨小分队通讯录', desc: '吹哨小分队成员联系信息', tag: '' },
  'nine-small-contacts': { title: '九小场所通讯录', desc: '九小场所联系人信息管理', tag: '' },
  'household-query': { title: '一户式查询', desc: '按户为单位综合查询相关信息', tag: '' },
  'tags': { title: '标签管理', desc: '创建和管理分类标签体系', tag: '' },
  'daily-supervise': { title: '日常监管', desc: '开展日常巡查、检查任务分配与执行跟踪', tag: '' },
  'inspect-check': { title: '监督检查', desc: '执行监督检查任务，记录检查结果', tag: '' },
  'work-eval': { title: '工作评价', desc: '评价和反馈工作完成质量', tag: '' },
  'work-assign': { title: '工作分配管理', desc: '分配工作任务，跟踪执行进度', tag: '' },
  'audit-center': { title: '审核中心', desc: '集中审核各类审批流程', tag: '5 项待处理' },
  'work-ticket': { title: '作业票报备', desc: '作业票申请、审批与备案管理', tag: '' },
  'hazard-rectify': { title: '隐患监督整改', desc: '跟踪隐患整改进度，超期预警督办', tag: '8 项待整改' },
  'my-signature': { title: '我的签名', desc: '管理个人电子签名和签章', tag: '' },
  'stats': { title: '数据统计', desc: '多维度数据统计与分析', tag: '' },
  'town-check-stats': { title: '镇街检查统计', desc: '镇街消防安全检查数据统计（老页面，后续下线）', tag: '待下线' },
  'joint-defense': { title: '防消联勤', desc: '防火监督与灭火救援联勤联动', tag: '' },
  'joint-defense-page': { title: '防消联勤', desc: '防火监督与灭火救援联勤联动', tag: '' },
  'digital-cockpit': { title: '数字驾驶舱', desc: '防消联勤专题数字驾驶舱', tag: '' },
  'emergency-cloud': { title: '应急云学堂', desc: '在线学习和培训平台', tag: '' },
  'consolidate': { title: '固本强基', desc: '基础能力建设和巩固提升', tag: '' },
  'messages': { title: '消息触达', desc: '系统消息通知与送达管理', tag: '' },
  'precise-push': { title: '精准推送', desc: '定向消息精准推送', tag: '' },
  'settings': { title: '设置', desc: '系统全局设置', tag: '' },
  'org-settings': { title: '组织设置', desc: '组织架构和单位信息配置', tag: '' },
  'admin-change': { title: '主管理员变更', desc: '变更系统主管理员', tag: '' },
  'account-mgmt': { title: '后台账号管理', desc: '管理后台用户账号', tag: '' },
  'role-mgmt': { title: '角色管理', desc: '管理角色和权限分配', tag: '' },
  'menu-mgmt': { title: '菜单管理', desc: '配置系统菜单结构', tag: '' },
  'home-config': { title: '主页配置', desc: '配置系统首页内容和布局', tag: '' },

  // === 以下为容器/父级菜单（展开用） ===
  'education': { title: '宣教培训', desc: '查看宣教培训相关功能', tag: '' },
  'business-work': { title: '业务工作', desc: '日常业务办理与管理', tag: '' },
  'group-org': { title: '政府组织', desc: '管理政府组织结构', tag: '' },
  'group-targets': { title: '监管对象', desc: '管理监管对象信息', tag: '' },
  'group-work': { title: '业务办理', desc: '业务办理入口合集', tag: '' },
  'group-education': { title: '宣教培训', desc: '宣教培训入口合集', tag: '' },
  'group-stats': { title: '统计分析', desc: '数据统计与分析看板', tag: '' },
  'group-settings': { title: '系统管理', desc: '系统配置与管理', tag: '' },

  // === 方案二/三新增 ===
  'area-overview': { title: '区域概况', desc: '辖区区域综合概况', tag: '' },
  'risk-distribution': { title: '风险分布', desc: '消防安全风险分布可视化', tag: '' },
  'todo': { title: '今日待办', desc: '待办任务汇总，快速处理', tag: '16 项待办' },
  'pending-audit': { title: '待审核', desc: '等待审核的流程与申请', tag: '5 项待处理' },
  'pending-rectify': { title: '待整改', desc: '待完成的隐患整改任务', tag: '8 项待整改' },
  'pending-deliver': { title: '待送达', desc: '待送达的通知与文件', tag: '' },
  'review-recheck': { title: '整改复查', desc: '对已完成整改进行复查核实', tag: '' },
  'closed-archive': { title: '闭环归档', desc: '已完成事项的归档管理', tag: '' },
  'training-record': { title: '培训记录', desc: '查看历史培训记录', tag: '' },

  // === g- 分组标题（方案二/三的折叠分组） ===
  'g-总览': { title: '总览', desc: '全局概览与数据驾驶', tag: '' },
  'g-政府组织': { title: '政府组织', desc: '政府组织架构管理', tag: '' },
  'g-辖区治理': { title: '辖区治理', desc: '辖区消防安全治理', tag: '' },
  'g-服务单位': { title: '服务单位', desc: '服务单位信息管理', tag: '' },
  'g-业务记录': { title: '业务记录', desc: '业务办理记录查询', tag: '' },
  'g-培训记录': { title: '培训记录', desc: '培训活动记录管理', tag: '' },
  'g-系统设置': { title: '系统设置', desc: '系统全局设置', tag: '' },
  'g-工作台': { title: '工作台', desc: '任务一站式处理中心', tag: '' },
  'g-监管检查': { title: '监管检查', desc: '监督检查任务管理', tag: '' },
  'g-隐患闭环': { title: '隐患闭环', desc: '隐患全流程闭环管理', tag: '' },
  'g-联勤联动': { title: '联勤联动', desc: '防消联勤协同工作', tag: '' },
  'g-宣教培训': { title: '宣教培训', desc: '宣教培训活动管理', tag: '' },
  'g-对象查询': { title: '对象查询', desc: '多维度对象信息查询', tag: '' },
  'g-组织管理': { title: '组织管理', desc: '组织架构与人员管理', tag: '' },
  'g-分析报表': { title: '分析报表', desc: '数据分析与报表查看', tag: '' },
  'g-系统管理': { title: '系统管理', desc: '系统后台配置管理', tag: '' },

  // ===== 通用示例菜单 =====
  'demo-overview': { title: '总览', desc: '系统整体运行概况与关键指标', tag: '' },
  'demo-user': { title: '用户管理', desc: '用户、角色与权限统一管理', tag: '' },
  'demo-user-list': { title: '用户列表', desc: '查看和管理系统所有用户', tag: '' },
  'demo-user-role': { title: '角色管理', desc: '定义和管理系统角色', tag: '' },
  'demo-user-perm': { title: '权限配置', desc: '细粒度权限分配与配置', tag: '' },
  'demo-order': { title: '订单管理', desc: '订单全生命周期管理', tag: '' },
  'demo-order-list': { title: '订单列表', desc: '查看和处理所有订单', tag: '' },
  'demo-order-detail': { title: '订单详情', desc: '查看订单完整信息', tag: '' },
  'demo-order-refund': { title: '退款管理', desc: '退款申请与审核处理', tag: '' },
  'demo-content': { title: '内容管理', desc: '文章、分类与标签管理', tag: '' },
  'demo-content-article': { title: '文章管理', desc: '发布和管理平台文章', tag: '' },
  'demo-content-category': { title: '分类管理', desc: '管理内容分类体系', tag: '' },
  'demo-content-tag': { title: '标签管理', desc: '管理内容标签', tag: '' },
  'demo-finance': { title: '财务管理', desc: '收入、账单与发票管理', tag: '' },
  'demo-finance-income': { title: '收入概览', desc: '查看财务收入总览', tag: '' },
  'demo-finance-bill': { title: '账单管理', desc: '管理客户账单', tag: '' },
  'demo-finance-invoice': { title: '发票管理', desc: '发票开具与核销', tag: '' },
  'demo-setting': { title: '系统设置', desc: '系统基础配置与管理', tag: '' },
  'demo-setting-basic': { title: '基础配置', desc: '系统基础参数配置', tag: '' },
  'demo-setting-log': { title: '日志查看', desc: '查看系统操作日志', tag: '' },
  'demo-setting-notice': { title: '系统公告', desc: '管理系统公告信息', tag: '' },
}

export default function ContentArea({
  scheme, activeItemId, activeTabKey, tabs, dark,
  onToggleDark, onTabClick, onTabClose,
  layoutType, topModuleKey, onTopNavClick,
}) {
  const [userOpen, setUserOpen] = useState(false)

  if (!scheme) return null

  const activeId = activeItemId
  const preview = ITEM_PREVIEWS[activeId] || { title: activeId, desc: '功能模块详情页', tag: '' }

  // 获取一级菜单列表（用在 top/mix 模式）
  const firstLevelItems = []
  for (const group of scheme.nav) {
    for (const item of group.items) {
      firstLevelItems.push(item)
    }
  }

  // mix 模式下，判断传入的 topModuleKey 是否在一级菜单中
  // 如果是，获取它的 children 作为当前模块的子菜单描述
  const currentModule = layoutType === 'mix' && topModuleKey
    ? firstLevelItems.find((i) => i.id === topModuleKey)
    : null

  return (
    <main className="flex-1 flex flex-col bg-[#f8fafb] min-w-0">
      {/* Top bar */}
      <div className="flex items-center justify-end h-14 px-6 border-b border-slate-200/70 bg-white shrink-0 gap-5">
        {/* Entrance items */}
        {[
          { id: 'messages', label: '消息中心', icon: 'BellIcon' },
          { id: 'guide', label: '操作指引', icon: 'ReaderIcon' },
          { id: 'service', label: '在线客服', icon: 'ChatBubbleIcon' },
          { id: 'download', label: '下载中心', icon: 'DownloadIcon' },
          { id: 'ai', label: 'AI助手', icon: 'RocketIcon' },
        ].map((item) => (
          <button
            key={item.id}
            className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-emerald-600 transition-colors py-1"
          >
            <Icon name={item.icon} size={15} />
            <span>{item.label}</span>
          </button>
        ))}
        {/* Theme toggle */}
        <button
          onClick={onToggleDark}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all"
          title={dark ? '切换浅色模式' : '切换深色模式'}
        >
          {dark ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M8 1V3M8 13V15M1 8H3M13 8H15M3.5 3.5L5 5M11 11L12.5 12.5M3.5 12.5L5 11M11 5L12.5 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M13.5 9.5C12.5 11 10.5 12 8 12C4.5 12 2 9.5 2 6C2 5 2.2 4 2.8 3C1.5 4.5 1 6.5 1.5 8.5C2 11 4 13 6.5 13.5C8.5 14 10.5 13.5 12 12.5C12.5 12 13 11.5 13.5 9.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </button>
        {/* Organization switcher */}
        <div className="flex items-center gap-1.5 text-sm pl-5 border-l border-slate-200">
          <span className="text-slate-800 font-medium">良渚应急消防管理站</span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-slate-400 ml-0.5">
            <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        {/* User dropdown */}
        <div className="relative">
          <button
            onClick={() => setUserOpen(!userOpen)}
            className="flex items-center gap-2 relative"
          >
            <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center">
              <span className="text-[11px] font-semibold text-emerald-600">张</span>
            </div>
            <span className="text-sm text-slate-700 font-medium">张明</span>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="text-slate-300">
              <path d="M2.5 3.5L5 6.5L7.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          {userOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setUserOpen(false)} />
              <div className="absolute right-0 top-full mt-2 z-20 bg-white rounded-lg border border-slate-200 shadow-lg py-1 min-w-[140px]">
                <button
                  onClick={() => setUserOpen(false)}
                  className="flex w-full items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-800 transition-colors"
                >
                  <Icon name="Pencil2Icon" size={14} />
                  <span>我的签名</span>
                </button>
                <div className="border-t border-slate-100 my-1" />
                <button
                  onClick={() => setUserOpen(false)}
                  className="flex w-full items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-800 transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-slate-400">
                    <path d="M5 10L2.5 7L5 4M2.5 7H10.5M9 2.5L11 2.5C11.8284 2.5 12.5 3.17157 12.5 4V10C12.5 10.8284 11.8284 11.5 11 11.5H9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>退出登录</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Top / Mix 模式：顶部导航栏 */}
      {(layoutType === 'top' || layoutType === 'mix') && (
        <div className="flex shrink-0 bg-white border-b border-slate-200/70 px-4">
          <div className="flex items-center gap-1 h-11 overflow-x-auto top-nav-scroll">
            {firstLevelItems.map((item) => {
              const isActive = layoutType === 'mix'
                ? topModuleKey === item.id
                : item.id === activeItemId || (item.children && item.children.some((c) => c.id === activeItemId))
              const hasChildren = item.children && item.children.length > 0
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (hasChildren) {
                      onTopNavClick(item.id, item.label)
                    } else {
                      onTopNavClick(item.id, item.label)
                    }
                  }}
                  className={`
                    flex items-center gap-2 px-4 py-2 text-sm whitespace-nowrap rounded-t-md transition-all duration-150 shrink-0
                    ${isActive
                      ? 'text-emerald-600 bg-emerald-50/80 font-medium border-b-2 border-emerald-500'
                      : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50 border-b-2 border-transparent'
                    }
                  `}
                >
                  {item.icon && <Icon name={item.icon} size={15} />}
                  <span>{item.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Mix 模式：模块子导航说明（当前选中的模块名称） */}
      {layoutType === 'mix' && currentModule && (
        <div className="flex items-center gap-2 px-6 py-2 text-xs text-slate-400 bg-white border-b border-slate-100/80 shrink-0">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M4.5 3L7.5 6L4.5 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>当前模块：</span>
          {currentModule.icon && <Icon name={currentModule.icon} size={12} />}
          <span className="text-slate-600 font-medium">{currentModule.label}</span>
          {currentModule.children && currentModule.children.length > 0 && (
            <span className="text-slate-300 ml-1">
              · {currentModule.children.length} 个子页面
            </span>
          )}
        </div>
      )}

      {/* Workspace Tabs */}
      <WorkspaceTabs
        tabs={tabs}
        activeTabKey={activeTabKey}
        onTabClick={onTabClick}
        onTabClose={onTabClose}
      />

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="max-w-3xl mx-auto space-y-8">

          {/* ===== 方案逻辑说明 ===== */}
          <section>
            <h2 className="text-base font-semibold text-slate-800 mb-3">
              {scheme.logicTitle || '方案逻辑说明'}
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">{scheme.logic}</p>
          </section>

          {/* ===== 说明点 ===== */}
          <section>
            <h3 className="text-sm font-semibold text-slate-700 mb-3">说明</h3>
            <ul className="space-y-2.5">
              {scheme.points.map((point, i) => (
                <li key={i} className="flex gap-2.5 text-sm text-slate-600 leading-relaxed">
                  <span className="shrink-0 mt-0.5 w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 text-[11px] font-semibold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* ===== 调整方向 ===== */}
          <section>
            <h3 className="text-sm font-semibold text-slate-700 mb-3">调整方向</h3>
            <div className="flex flex-wrap gap-2">
              {scheme.direction.split('｜').map((d, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-sm text-slate-600">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6L5 9L10 3" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {d.trim()}
                </span>
              ))}
            </div>
          </section>

          {/* ===== 结构总览 ===== */}
          <section>
            <h3 className="text-sm font-semibold text-slate-700 mb-3">结构总览</h3>
            <div className="bg-white rounded-xl border border-slate-200/70 overflow-hidden shadow-[0_1px_3px_-2px_rgba(0,0,0,0.05)]">
              {scheme.nav.map((group, gi) => (
                !group.title ? (
                  <div key={gi}>
                    {group.items.map((item) => (
                      <div key={item.id}>
                        <div className="px-5 py-2.5 bg-slate-50/80 border-b border-slate-100 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                          {item.label}
                        </div>
                        {item.children && (
                          <div className="px-5 py-2 border-b border-slate-50 last:border-0">
                            <div className="flex flex-wrap gap-x-4 gap-y-1">
                              {item.children.map((child) => (
                                <span key={child.id} className="text-sm text-slate-700 py-0.5">
                                  {child.label}
                                  {child.badge && (
                                    <span className="ml-1 text-[10px] text-red-500 font-medium">({child.badge})</span>
                                  )}
                                  {child.deprecated && (
                                    <span className="ml-1 text-[10px] text-slate-400">(老页面，下线)</span>
                                  )}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div key={gi}>
                    <div className="px-5 py-2.5 bg-slate-50/80 border-b border-slate-100 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      {group.title}
                    </div>
                    <div className="px-5 py-2 border-b border-slate-50 last:border-0">
                      <div className="flex flex-wrap gap-x-4 gap-y-1">
                        {group.items.map((item) => (
                          <span key={item.id} className="text-sm text-slate-700 py-0.5">
                            {item.label}
                            {item.children && (
                              <span className="ml-1 text-[11px] text-slate-400">
                                → {item.children.map(c => c.label).join('、')}
                              </span>
                            )}
                            {item.badge && (
                              <span className="ml-1 text-[10px] text-red-500 font-medium">({item.badge})</span>
                            )}
                            {item.deprecated && (
                              <span className="ml-1 text-[10px] text-slate-400">(老页面，下线)</span>
                            )}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              ))}
            </div>
          </section>

        </div>
      </div>
    </main>
  )
}
