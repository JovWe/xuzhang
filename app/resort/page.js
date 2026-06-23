'use client'

import { useState, useRef, useEffect } from 'react'
import { employees, internalDocs, validLogins } from '../../lib/data'

// ========== RESORT SECTIONS ==========
const SECTIONS = [
  { key: 'home', label: '首页' },
  { key: 'about', label: '关于我们' },
  { key: 'programs', label: '疗养项目' },
  { key: 'reviews', label: '客户评价' },
  { key: 'careers', label: '人才招聘' },
  { key: 'contact', label: '联系我们' },
  { key: 'vip', label: 'VIP通道', special: true },
]

// ========== EMPLOYEE CARD ==========
function EmployeeGrid({ onSelect }) {
  return (
    <div className="employee-grid">
      {employees.map(emp => (
        <div key={emp.id} className="employee-card" onClick={() => onSelect(emp)}>
          <div className="emp-avatar" style={{ background: emp.color }}>{emp.avatar}</div>
          <div className="emp-name">{emp.name}</div>
          <div className="emp-dept">{emp.dept} · {emp.title}</div>
        </div>
      ))}
    </div>
  )
}

// ========== MAIN RESORT PAGE ==========
export default function ResortPage() {
  const [section, setSection] = useState('home')
  const [selectedEmp, setSelectedEmp] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResult, setSearchResult] = useState(null)

  // Login
  const [showLogin, setShowLogin] = useState(false)
  const [loginUser, setLoginUser] = useState('')
  const [loginPass, setLoginPass] = useState('')
  const [loginError, setLoginError] = useState(false)

  // Internal portal
  const [loggedIn, setLoggedIn] = useState(null) // null | { user, name, dept }
  const [viewingDoc, setViewingDoc] = useState(null) // null | docId
  const [revealedRedactions, setRevealedRedactions] = useState({})

  const loginUserRef = useRef(null)

  // Focus login input
  useEffect(() => {
    if (showLogin && loginUserRef.current) {
      setTimeout(() => loginUserRef.current.focus(), 300)
    }
  }, [showLogin])

  // ========== EMPLOYEE SEARCH ==========
  const handleSearch = () => {
    const q = searchQuery.trim()
    if (!q) return
    const result = employees.find(e => e.name.includes(q))
    setSearchResult(result || null)
    setSelectedEmp(null)
  }

  // ========== LOGIN ==========
  const handleLogin = () => {
    const match = validLogins.find(
      c => c.user === loginUser.trim() && c.pass === loginPass.trim()
    )
    if (match) {
      setLoginError(false)
      setShowLogin(false)
      setLoggedIn(match)
      setLoginUser('')
      setLoginPass('')
    } else {
      setLoginError(true)
      setLoginPass('')
    }
  }

  const handleLogout = () => {
    setLoggedIn(null)
    setViewingDoc(null)
    setSection('home')
  }

  // ========== REDACTED TEXT ==========
  const toggleRedacted = (docId, idx) => {
    setRevealedRedactions(prev => ({
      ...prev,
      [`${docId}-${idx}`]: !prev[`${docId}-${idx}`]
    }))
  }

  // ========== RENDER: LOGGED IN ==========
  if (loggedIn) {
    if (viewingDoc) {
      const doc = internalDocs.find(d => d.id === viewingDoc)
      if (!doc) return null

      // Process redacted spans in content
      let redactIdx = 0
      const processedContent = doc.content.replace(
        /<span class="redacted">([^<]*)<\/span>/g,
        (match, text) => {
          const idx = redactIdx++
          const revealed = revealedRedactions[`${doc.id}-${idx}`]
          return `<span class="redacted${revealed ? ' revealed' : ''}" data-doc="${doc.id}" data-idx="${idx}">${revealed ? text : '██'}</span>`
        }
      )

      return (
        <div className="resort-page">
          <div className="internal-portal">
            <div className="internal-header">
              <span>🔒 听泉谷疗养院 · 内部系统</span>
              <span>👤 {loggedIn.name} ({loggedIn.user})</span>
              <button className="logout-btn" onClick={handleLogout}>退出登录</button>
            </div>
            <div className="internal-content">
              <div className="doc-full" style={{ display: 'block' }}>
                <span
                  className="doc-back"
                  onClick={() => setViewingDoc(null)}
                >← 返回文件列表</span>
                <h3>{doc.title}</h3>
                <div className="doc-meta">
                  {doc.date} · 密级：
                  <span style={{ color: doc.classified ? '#c0392b' : '#555' }}>
                    {doc.level}
                  </span>
                </div>
                <div
                  className="doc-body"
                  dangerouslySetInnerHTML={{ __html: processedContent }}
                  onClick={(e) => {
                    const span = e.target.closest('.redacted')
                    if (span) {
                      const dId = span.dataset.doc
                      const idx = parseInt(span.dataset.idx)
                      toggleRedacted(dId, idx)
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )
    }

    // Document list view
    return (
      <div className="resort-page">
        <div className="internal-portal">
          <div className="internal-header">
            <span>🔒 听泉谷疗养院 · 内部系统</span>
            <span>👤 {loggedIn.name} ({loggedIn.user}) · {loggedIn.dept}</span>
            <button className="logout-btn" onClick={handleLogout}>退出登录</button>
          </div>
          <div className="internal-content">
            <h2 style={{ color: '#333', fontWeight: 400, letterSpacing: 2, marginBottom: 20 }}>
              📁 内部文件
            </h2>
            {internalDocs.map(doc => (
              <div
                key={doc.id}
                className={`doc-card ${doc.classified ? 'classified' : ''}`}
                onClick={() => setViewingDoc(doc.id)}
              >
                <div className="doc-date">
                  {doc.date} · <span style={{ color: doc.classified ? '#c0392b' : 'var(--muted)' }}>
                    [{doc.level}]
                  </span>
                </div>
                <div className="doc-title">{doc.title}</div>
                <div className="doc-preview">
                  {doc.content.replace(/<[^>]*>/g, '').slice(0, 80)}...
                </div>
              </div>
            ))}
            <p style={{ marginTop: 30, textAlign: 'center', color: 'var(--muted)', fontSize: 13 }}>
              📋 共 {internalDocs.length} 份文件 · 最后更新：2026年7月10日
            </p>
          </div>
        </div>
      </div>
    )
  }

  // ========== RENDER: PUBLIC SITE ==========
  return (
    <div className="resort-page">
      {/* Header */}
      <header className="resort-header">
        <h1>听 泉 谷 疗 养 院</h1>
        <div className="tagline">TINGQUAN VALLEY WELLNESS RETREAT</div>
        <div className="sub-tagline">让喧嚣的灵魂回归绝对的理性与安宁</div>
      </header>

      {/* Navigation */}
      <nav className="resort-nav">
        {SECTIONS.map(s => (
          <a
            key={s.key}
            className={section === s.key ? 'active' : ''}
            style={s.special ? { color: '#8b0000' } : undefined}
            onClick={() => {
              setSection(s.key)
              setSelectedEmp(null)
              setSearchResult(null)
            }}
          >
            {s.label}
          </a>
        ))}
      </nav>

      {/* Content */}
      <div className="resort-container">
        {/* ===== HOME ===== */}
        {section === 'home' && (
          <div className="resort-section">
            <div className="hero-image">
              <div className="hero-text">静 谧 之 境</div>
            </div>
            <p style={{ textAlign: 'center', color: 'var(--muted)', fontSize: 16, maxWidth: 600, margin: '0 auto 30px' }}>
              坐落于深山幽谷之中，远离城市喧嚣。<br />
              听泉谷疗养院致力于为每一位访客提供最纯粹的身心修复体验。
            </p>
            <div className="feature-grid">
              <div className="feature-card">
                <div className="icon">🌿</div>
                <h4>森林浴疗法</h4>
              </div>
              <div className="feature-card">
                <div className="icon">♨️</div>
                <h4>天然温泉</h4>
              </div>
              <div className="feature-card">
                <div className="icon">🧘</div>
                <h4>冥想静修</h4>
              </div>
              <div className="feature-card">
                <div className="icon">🍃</div>
                <h4>有机膳食</h4>
              </div>
            </div>
          </div>
        )}

        {/* ===== ABOUT ===== */}
        {section === 'about' && (
          <div className="resort-section">
            <h2>关于我们</h2>
            <p>听泉谷疗养院成立于2015年，原名&ldquo;听泉谷度假山庄&rdquo;，后于2019年转型为专业疗养机构。我们秉承&ldquo;理性回归&rdquo;的核心理念，结合东方传统养生智慧与现代心理学研究成果，为都市人群提供深度身心修复服务。</p>

            <h3>👥 我们的团队</h3>
            <p>疗养院汇聚了来自心理学、神经科学、营养学等多个领域的专业人才。以下为部分核心团队成员：</p>
            <EmployeeGrid onSelect={setSelectedEmp} />

            {/* Employee detail */}
            {selectedEmp && (
              <div className="search-result" style={{ display: 'block' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <h3 style={{ margin: 0, fontSize: 16 }}>员工详细信息</h3>
                  <button
                    onClick={() => setSelectedEmp(null)}
                    style={{ background: 'none', border: 'none', color: '#999', fontSize: 20, cursor: 'pointer' }}
                  >✕</button>
                </div>
                <div className="emp-detail-header">
                  <div className="emp-detail-avatar" style={{ background: selectedEmp.color }}>
                    {selectedEmp.avatar}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ margin: 0 }}>{selectedEmp.name}</h3>
                    <div style={{ fontSize: 13, color: 'var(--muted)', letterSpacing: 1 }}>
                      {selectedEmp.dept} · {selectedEmp.title}
                    </div>
                  </div>
                </div>
                <table className="emp-detail-table">
                  <tbody>
                    <tr><td>员工工号</td><td>{selectedEmp.id}</td></tr>
                    <tr><td>部门</td><td>{selectedEmp.dept}</td></tr>
                    <tr><td>职位</td><td>{selectedEmp.title}</td></tr>
                    <tr><td>入职日期</td><td>{selectedEmp.id.split('-')[1].slice(0, 4)}年</td></tr>
                    <tr><td>个人简介</td><td>{selectedEmp.bio}</td></tr>
                  </tbody>
                </table>
              </div>
            )}

            <h3>🔍 员工查询</h3>
            <div className="search-box">
              <input
                type="text"
                placeholder="输入员工姓名进行查询..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') handleSearch() }}
              />
              <button onClick={handleSearch}>查询</button>
            </div>

            {/* Search result */}
            {searchResult && (
              <div className="search-result" style={{ display: 'block' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <h3 style={{ margin: 0, fontSize: 16 }}>查询结果：{searchResult.name}</h3>
                  <button
                    onClick={() => setSearchResult(null)}
                    style={{ background: 'none', border: 'none', color: '#999', fontSize: 20, cursor: 'pointer' }}
                  >✕</button>
                </div>
                <div className="emp-detail-header">
                  <div className="emp-detail-avatar" style={{ background: searchResult.color }}>
                    {searchResult.avatar}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ margin: 0 }}>{searchResult.name}</h3>
                    <div style={{ fontSize: 13, color: 'var(--muted)', letterSpacing: 1 }}>
                      {searchResult.dept} · {searchResult.title}
                    </div>
                  </div>
                </div>
                <table className="emp-detail-table">
                  <tbody>
                    <tr><td>员工工号</td><td style={{ color: '#c0392b', fontWeight: 700 }}>{searchResult.id}</td></tr>
                    <tr><td>部门</td><td>{searchResult.dept}</td></tr>
                    <tr><td>职位</td><td>{searchResult.title}</td></tr>
                    <tr><td>状态</td><td style={{ color: '#c0392b' }}>● 异常 — 自2026年7月10日起失联</td></tr>
                    <tr><td>备注</td><td style={{ fontSize: 12, color: '#888' }}>最后签到记录：2026年7月10日 07:52。安保部已标记为&ldquo;待确认&rdquo;状态。家属联系方式：无登记。</td></tr>
                  </tbody>
                </table>
                <p style={{ marginTop: 12, fontSize: 12, color: 'var(--muted)' }}>
                  * 系统提示：该员工账号仍处于激活状态。如需访问内部文件，请使用员工工号登录。
                </p>
              </div>
            )}

            {!searchResult && searchQuery && (
              <div className="search-result" style={{ display: 'block', padding: 24, textAlign: 'center', color: 'var(--muted)' }}>
                <p>未找到匹配&ldquo;{searchQuery}&rdquo;的员工记录。</p>
                <p style={{ fontSize: 13 }}>请尝试输入完整的员工姓名。</p>
              </div>
            )}

            <h3>📸 员工合影</h3>
            <div style={{
              background: 'linear-gradient(180deg,#c8e6c9,#a5d6a7)',
              borderRadius: 12, padding: 40, textAlign: 'center',
              minHeight: 200, display: 'flex', alignItems: 'flex-end',
              justifyContent: 'center', gap: 20, flexWrap: 'wrap', position: 'relative'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: 55, height: 55, borderRadius: '50%', background: '#4a90d9',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontSize: 22, fontWeight: 700, margin: '0 auto 4px'
                }}>陆</div>
                <span style={{ fontSize: 12, color: '#333' }}>陆正言</span>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: 55, height: 55, borderRadius: '50%', background: '#7b68ae',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontSize: 22, fontWeight: 700, margin: '0 auto 4px'
                }}>林</div>
                <span style={{ fontSize: 12, color: '#333' }}>林素问</span>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: 55, height: 55, borderRadius: '50%', background: '#5a8a6a',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontSize: 22, fontWeight: 700, margin: '0 auto 4px'
                }}>赵</div>
                <span style={{ fontSize: 12, color: '#333' }}>赵院长</span>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: 55, height: 55, borderRadius: '50%', background: '#8a6a4a',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontSize: 22, fontWeight: 700, margin: '0 auto 4px'
                }}>周</div>
                <span style={{ fontSize: 12, color: '#333' }}>周主任</span>
              </div>
              <div style={{ textAlign: 'center', opacity: 0.6 }}>
                <div style={{
                  width: 55, height: 55, borderRadius: '50%', background: '#999',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontSize: 22, fontWeight: 700, margin: '0 auto 4px'
                }}>?</div>
                <span style={{ fontSize: 12, color: '#666' }}>已离职</span>
              </div>
              <div style={{ position: 'absolute', bottom: 8, right: 16, fontSize: 10, color: '#888' }}>
                摄于 2025.12
              </div>
            </div>
          </div>
        )}

        {/* ===== PROGRAMS ===== */}
        {section === 'programs' && (
          <div className="resort-section">
            <h2>疗养项目</h2>
            {[
              { name: '🌿 森林浴疗法', desc: '在原始森林中进行引导式呼吸与步行训练，恢复身心节律', badge: '7天疗程', special: false },
              { name: '♨️ 矿泉疗愈', desc: '天然硫磺温泉配合中医经络推拿，深度排毒', badge: '3天疗程', special: false },
              { name: '🧘 静默冥想营', desc: '全封闭式冥想训练，断绝一切外界联系，找回内心宁静', badge: '14天疗程', special: false },
              { name: '🍃 有机排毒膳食', desc: '营养师定制的全有机膳食计划，每餐精确控制热量摄入', badge: '定制疗程', special: false },
              { name: '◈ 纯化心灵', desc: '深入潜意识领域，剥离情绪杂质，回归绝对理性状态。*本项目需签署知情同意书，仅对签约VIP会员开放', badge: 'VIP专属', special: true },
            ].map((p, i) => (
              <div key={i} className={`program-item ${p.special ? 'special' : ''}`}>
                <div>
                  <div className="prog-name" style={p.special ? { color: '#8b0000' } : undefined}>{p.name}</div>
                  <div className="prog-desc">{p.desc}</div>
                </div>
                <span className="program-badge" style={p.special ? { background: '#fff0f0', color: '#8b0000' } : undefined}>
                  {p.badge}
                </span>
              </div>
            ))}

            <div style={{ marginTop: 24, padding: 16, background: '#fff', border: '1px solid var(--border)', borderRadius: 8 }}>
              <h4 style={{ fontSize: 14, color: '#8b0000', letterSpacing: 1 }}>◈ 纯化心灵 — 项目介绍</h4>
              <p style={{ fontSize: 14, color: '#666', marginTop: 8 }}>
                本项目基于最新的神经可塑性研究成果，通过<strong>系统性的认知行为干预与神经反馈训练</strong>，
                帮助来访者识别并消除非理性思维模式。经过为期<strong>168小时（7天）</strong>的密集疗程，
                来访者将体验到前所未有的思维清晰度与情绪稳定性。
              </p>
              <p style={{ fontSize: 13, color: '#999' }}>
                * 疗程期间全程封闭管理，断绝一切外界联系。每日摄入严格控制在720大卡标准化营养餐。
                疗程结束后，来访者将不再被不必要的情绪波动所困扰，实现真正的&ldquo;理性回归&rdquo;。
              </p>
            </div>
          </div>
        )}

        {/* ===== REVIEWS ===== */}
        {section === 'reviews' && (
          <div className="resort-section">
            <h2>客户评价</h2>
            {[
              { stars: '★★★★★', text: '在这里住了一个月，感觉整个人都焕然一新。思维变得异常清晰，工作效率提升了三倍。', author: '张先生，企业高管，2025年入住' },
              { stars: '★★★★★', text: '纯化心灵项目改变了我的人生。以前总是被焦虑和恐惧支配，现在我终于可以完全理性地面对一切。推荐给每一位被情绪困扰的人。', author: '李女士，律师，2026年入住' },
              { stars: '★★★★☆', text: '环境很好，服务专业。唯一不太习惯的是封闭式管理期间完全不能用手机，但也许这正是疗愈的一部分吧。', author: '王先生，教师，2025年入住' },
            ].map((r, i) => (
              <div key={i} className="review-card">
                <div className="stars">{r.stars}</div>
                <p style={{ fontSize: 15, color: '#444', fontStyle: 'italic' }}>&ldquo;{r.text}&rdquo;</p>
                <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 8 }}>—— {r.author}</div>
              </div>
            ))}
            <div className="review-card" style={{ borderColor: '#ffdddd' }}>
              <div className="stars">★★☆☆☆</div>
              <p style={{ fontSize: 15, color: '#8b0000', fontStyle: 'italic' }}>
                &ldquo;我妻子参加完纯化心灵项目回来之后，完全变了一个人。她不笑了，不哭了，就像一台机器。这不是疗养，这是——&rdquo;
              </p>
              <div style={{ fontSize: 13, color: '#999', marginTop: 8 }}>
                —— <span style={{ color: '#c0392b' }}>[该评论已被删除]</span>
              </div>
            </div>
          </div>
        )}

        {/* ===== CAREERS ===== */}
        {section === 'careers' && (
          <div className="resort-section">
            <h2>人才招聘</h2>
            <p>听泉谷疗养院长期招聘以下岗位：</p>
            {[
              { title: '心理学研究员', sub: '认知行为方向，博士学历', tag: '急聘', urgent: true },
              { title: '神经反馈训练师', sub: '需持有相关资质证书', tag: '2名', urgent: false },
              { title: '营养师', sub: '擅长标准化膳食配给', tag: '1名', urgent: false },
              { title: '安保人员', sub: '封闭式管理经验者优先', tag: '3名', urgent: false },
            ].map((j, i) => (
              <div key={i} style={{
                background: '#fff', padding: '16px 20px', borderRadius: 8,
                border: '1px solid var(--border)', display: 'flex',
                justifyContent: 'space-between', alignItems: 'center', marginBottom: 12
              }}>
                <div>
                  <strong style={{ letterSpacing: 1 }}>{j.title}</strong>
                  <div style={{ fontSize: 13, color: 'var(--muted)' }}>{j.sub}</div>
                </div>
                <span style={{ fontSize: 12, color: j.urgent ? 'var(--green)' : 'var(--muted)' }}>
                  {j.tag}
                </span>
              </div>
            ))}
            <p style={{ marginTop: 20, fontSize: 14, color: 'var(--muted)' }}>
              有意者请通过内部推荐渠道提交申请。我们不接受公开招聘投递。
            </p>
          </div>
        )}

        {/* ===== CONTACT ===== */}
        {section === 'contact' && (
          <div className="resort-section">
            <h2>联系我们</h2>
            <div style={{ background: '#fff', padding: 24, borderRadius: 8, border: '1px solid var(--border)' }}>
              <p><strong>地址：</strong>听泉谷风景区 88号</p>
              <p><strong>电话：</strong><span style={{ color: '#999', textDecoration: 'line-through' }}>0571-8820-XXXX</span> <span style={{ color: '#c0392b', fontSize: 12 }}>（该号码已停用）</span></p>
              <p><strong>邮箱：</strong>info<span style={{ color: '#ccc' }}>@</span>tingquan-valley.com</p>
              <p style={{ marginTop: 16, fontSize: 13, color: 'var(--muted)' }}>
                * 本院实行预约制，不接待临时到访。<br />
                * 目前暂停对外营业，重新开放时间另行通知。
              </p>
            </div>
          </div>
        )}

        {/* ===== VIP ===== */}
        {section === 'vip' && (
          <div className="resort-section">
            <h2>VIP通道 / 员工入口</h2>
            <div style={{
              background: '#fff', padding: 32, borderRadius: 8,
              border: '1px solid var(--border)', textAlign: 'center'
            }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🔒</div>
              <p style={{ color: 'var(--muted)', marginBottom: 24 }}>
                此区域仅对签约VIP会员及本院员工开放
              </p>
              <button
                onClick={() => setShowLogin(true)}
                style={{
                  padding: '14px 36px', background: 'var(--green)', color: '#fff',
                  border: 'none', borderRadius: 8, fontFamily: 'inherit',
                  fontSize: 16, cursor: 'pointer', letterSpacing: 3, transition: 'all 0.2s'
                }}
              >
                进入登录页面
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ===== LOGIN MODAL ===== */}
      <div className={`login-overlay ${showLogin ? 'show' : ''}`}>
        {showLogin && (
          <div className="login-modal">
            <button
              className="close-btn"
              onClick={() => { setShowLogin(false); setLoginError(false) }}
            >✕</button>
            <h2>员工 / VIP 登录</h2>
            <div className="form-group">
              <label>员工工号 (Staff ID) 或 签约VIP卡号</label>
              <input
                ref={loginUserRef}
                type="text"
                value={loginUser}
                onChange={e => { setLoginUser(e.target.value); setLoginError(false) }}
                placeholder="请输入工号或卡号"
              />
            </div>
            <div className="form-group">
              <label>密码</label>
              <input
                type="password"
                value={loginPass}
                onChange={e => { setLoginPass(e.target.value); setLoginError(false) }}
                placeholder="请输入密码"
                onKeyDown={e => { if (e.key === 'Enter') handleLogin() }}
              />
            </div>
            <button className="login-btn" onClick={handleLogin}>登 录</button>
            {loginError && (
              <div className="login-error">工号或密码错误</div>
            )}
          </div>
        )}
      </div>

      {/* ===== FOOTER ===== */}
      <footer className="resort-footer">
        © 2015-2026 听泉谷疗养院 Tingquan Valley Wellness Retreat<br />
        <span style={{ fontSize: 11, opacity: 0.5 }}>回归绝对理性，纯化您的污染</span>
      </footer>
    </div>
  )
}
