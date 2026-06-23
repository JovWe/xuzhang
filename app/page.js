'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { fatherMessages, motherMessages, policeCallLines } from '../lib/data'

// ========== HELPERS ==========
function sleep(ms) { return new Promise(r => setTimeout(r, ms)) }

// ========== MAIN GAME PAGE ==========
export default function GamePage() {
  // Scene state
  const [scene, setScene] = useState('start')
  const [fadeActive, setFadeActive] = useState(false)

  // WeChat state
  const [wechatView, setWechatView] = useState('list') // 'list' | 'father' | 'mother'
  const [chatMsgCount, setChatMsgCount] = useState(0)
  const [callsAttempted, setCallsAttempted] = useState({ father: false, mother: false })
  const [policeCalled, setPoliceCalled] = useState(false)
  const [showPoliceFab, setShowPoliceFab] = useState(false)

  // Call state
  const [callType, setCallType] = useState(null) // 'father' | 'mother' | 'police'
  const [callStep, setCallStep] = useState(0)
  const [callDialogue, setCallDialogue] = useState([]) // array of {text, cls} for progressive display
  const [callStatus, setCallStatus] = useState('')
  const callTimerRef = useRef(null)
  const callDialogueTimerRef = useRef(null)

  // Home state
  const [cluesFound, setCluesFound] = useState({ calendar: false, fridge: false })
  const [cluePopup, setCluePopup] = useState(null) // 'calendar' | 'fridge' | null

  // Study state
  const [brochureFound, setBrochureFound] = useState(false)
  const [showBrochure, setShowBrochure] = useState(false)
  const qrCanvasRef = useRef(null)

  // Narration state
  const [narration, setNarration] = useState({ show: false, text: '', onDone: null })

  // ========== FADE TRANSITION ==========
  const fadeTo = useCallback((targetScene, afterFade) => {
    setFadeActive(true)
    setTimeout(() => {
      if (afterFade) afterFade()
      setScene(targetScene)
      setTimeout(() => setFadeActive(false), 200)
    }, 800)
  }, [])

  // ========== WECHAT: OPEN CHAT ==========
  const openChat = (who) => {
    setWechatView(who)
    setChatMsgCount(0)
  }

  const backToChatList = () => {
    setWechatView('list')
    setChatMsgCount(0)
    // Show police FAB if both calls attempted
    if (callsAttempted.father && callsAttempted.mother) {
      setShowPoliceFab(true)
    }
  }

  // Staggered message reveal
  useEffect(() => {
    if (wechatView !== 'father' && wechatView !== 'mother') return
    const msgs = wechatView === 'father' ? fatherMessages : motherMessages
    if (chatMsgCount >= msgs.length) return
    const delay = msgs[chatMsgCount]?.type === 'center' ? 400 : 700
    const timer = setTimeout(() => setChatMsgCount(c => c + 1), delay)
    return () => clearTimeout(timer)
  }, [wechatView, chatMsgCount])

  const visibleMessages = (() => {
    const msgs = wechatView === 'father' ? fatherMessages : motherMessages
    return msgs.slice(0, chatMsgCount)
  })()

  const currentMessages = wechatView === 'father' ? fatherMessages : motherMessages

  // 110 call dialogue progress
  useEffect(() => {
    if (callType !== 'police') return
    if (callStep >= policeCallLines.length) return

    const line = policeCallLines[callStep]
    callDialogueTimerRef.current = setTimeout(() => {
      setCallDialogue(prev => [...prev, line])
      setCallStep(s => s + 1)
    }, line.delay || 400)

    return () => clearTimeout(callDialogueTimerRef.current)
  }, [callType, callStep])

  // ========== CALL PARENT ==========
  const callParent = (who) => {
    setCallsAttempted(prev => ({ ...prev, [who]: true }))
    setCallType(who)
    setCallStep(0)
    setCallDialogue([])
    setCallStatus('正在呼叫...')

    // Simulate ringing then voicemail
    callTimerRef.current = setTimeout(() => {
      setCallStatus('呼叫失败')
      setCallDialogue([
        { text: '嘟—— 嘟—— 嘟——', cls: '' },
        { text: '"对不起……您拨打的电话……不在服务区……\nSorry, the subscriber you dialed……\nis not in the service area……"', cls: 'glitch-text' },
      ])
      setTimeout(() => {
        setCallStatus('通话结束')
      }, 2000)
    }, 3000)
  }

  // ========== CALL POLICE ==========
  const callPolice = () => {
    setShowPoliceFab(false)
    setPoliceCalled(true)
    setCallType('police')
    setCallStep(0)
    setCallDialogue([])
    setCallStatus('正在接通...')

    callTimerRef.current = setTimeout(() => {
      setCallStatus('通话中')
    }, 2000)
  }

  // After police call ends, transition to home
  useEffect(() => {
    if (callType !== 'police') return
    if (callStep < policeCallLines.length) return
    if (callStep === 0) return // hasn't started

    // All dialogue lines shown
    const timer = setTimeout(() => {
      setCallStatus('通话中断')
      setTimeout(() => {
        // Transition to home
        setCallType(null)
        setCallStep(0)
        setCallDialogue([])
        setCallStatus('')
        fadeTo('home')
      }, 2500)
    }, 1500)
    return () => clearTimeout(timer)
  }, [callType, callStep, fadeTo])

  // ========== HANG UP ==========
  const hangupCall = () => {
    if (callTimerRef.current) clearTimeout(callTimerRef.current)
    if (callDialogueTimerRef.current) clearTimeout(callDialogueTimerRef.current)
    setCallType(null)
    setCallStep(0)
    setCallDialogue([])
    setCallStatus('')
    backToChatList()
  }

  // ========== CLUE POPUP ==========
  const showClue = (type) => {
    setCluesFound(prev => ({ ...prev, [type]: true }))
    setCluePopup(type)
  }

  const closeClue = () => setCluePopup(null)

  // ========== STUDY DOOR ==========
  const enterStudy = () => {
    setNarration({
      show: true,
      text: '在记忆中，书房是家里的禁区。父母永远在里面进行着某种不可告人的"工作"。\n\n这一次，门锁发出"咔哒"一声——\n它没有锁。',
      onDone: () => fadeTo('study'),
    })
  }

  // ========== FIND BROCHURE ==========
  const findBrochure = () => {
    if (brochureFound) return
    setBrochureFound(true)
    setTimeout(() => setShowBrochure(true), 500)
  }

  // ========== QR CODE DRAWING ==========
  useEffect(() => {
    if (!showBrochure || !qrCanvasRef.current) return
    const canvas = qrCanvasRef.current
    const ctx = canvas.getContext('2d')
    const size = 120
    const modules = 21
    const moduleSize = size / (modules + 8)

    ctx.fillStyle = '#fff'
    ctx.fillRect(0, 0, size, size)

    const seed = 'tingquan-valley-resort'
    let hash = 0
    for (let i = 0; i < seed.length; i++) {
      hash = ((hash << 5) - hash) + seed.charCodeAt(i)
      hash |= 0
    }

    function pseudoRandom(x, y) {
      let h = hash + x * 31 + y * 37 + x * y * 13
      h = Math.sin(h * 9301 + 49297) * 233280
      return (h - Math.floor(h)) > 0.5
    }

    function drawFinder(ox, oy) {
      ctx.fillStyle = '#000'
      ctx.fillRect((4 + ox) * moduleSize, (4 + oy) * moduleSize, 7 * moduleSize, 7 * moduleSize)
      ctx.fillStyle = '#fff'
      ctx.fillRect((5 + ox) * moduleSize, (5 + oy) * moduleSize, 5 * moduleSize, 5 * moduleSize)
      ctx.fillStyle = '#000'
      ctx.fillRect((6 + ox) * moduleSize, (6 + oy) * moduleSize, 3 * moduleSize, 3 * moduleSize)
    }

    drawFinder(0, 0)
    drawFinder(14, 0)
    drawFinder(0, 14)

    // Timing patterns
    ctx.fillStyle = '#000'
    for (let i = 8; i < 21 - 8; i++) {
      if (i % 2 === 0) {
        ctx.fillRect(i * moduleSize, 6 * moduleSize, moduleSize, moduleSize)
        ctx.fillRect(6 * moduleSize, i * moduleSize, moduleSize, moduleSize)
      }
    }

    // Data modules
    for (let y = 0; y < modules; y++) {
      for (let x = 0; x < modules; x++) {
        if ((x < 8 && y < 8) || (x >= 14 && y < 8) || (x < 8 && y >= 14)) continue
        if (x === 6 || y === 6) continue
        if (pseudoRandom(x, y)) {
          ctx.fillStyle = '#000'
          ctx.fillRect((4 + x) * moduleSize, (4 + y) * moduleSize, moduleSize, moduleSize)
        }
      }
    }
  }, [showBrochure])

  // ========== NARRATION DISMISS ==========
  const dismissNarration = () => {
    setNarration(prev => {
      if (prev.onDone) prev.onDone()
      return { show: false, text: '', onDone: null }
    })
  }

  // ========== CLEANUP ==========
  useEffect(() => {
    return () => {
      if (callTimerRef.current) clearTimeout(callTimerRef.current)
      if (callDialogueTimerRef.current) clearTimeout(callDialogueTimerRef.current)
    }
  }, [])

  // ========== RENDER ==========
  return (
    <>
      {/* Fade transition */}
      <div className={`fade-overlay ${fadeActive ? 'active' : ''}`} />

      {/* ===== SCENE: START ===== */}
      {scene === 'start' && (
        <div className="scene-container start-scene">
          <div className="title">听 泉 谷</div>
          <div className="subtitle">T I N G Q U A N &nbsp; V A L L E Y</div>
          <button className="start-btn" onClick={() => fadeTo('wechat')}>
            开 始 游 戏
          </button>
          <div className="date-tag">2026年7月17日 &nbsp;·&nbsp; 傍晚 18:30</div>
        </div>
      )}

      {/* ===== SCENE: WECHAT ===== */}
      {scene === 'wechat' && (
        <div className="scene-container wechat-scene">
          <div className="phone-frame">
            {/* Header */}
            {wechatView === 'list' ? (
              <div className="wechat-header">微信</div>
            ) : (
              <div className="wechat-header">
                <button className="back-btn" onClick={backToChatList}>← 返回</button>
                {wechatView === 'father' ? '父亲' : '母亲'}
              </div>
            )}

            {/* Chat List */}
            {wechatView === 'list' && (
              <div className="chat-list">
                <div className="chat-item" onClick={() => openChat('father')}>
                  <div className="avatar father">父</div>
                  <div className="info">
                    <div className="name">父亲</div>
                    <div className="preview">我们已出发前往听泉谷山庄。日程已规划。</div>
                  </div>
                  <div className="time">7月10日</div>
                </div>
                <div className="chat-item" onClick={() => openChat('mother')}>
                  <div className="avatar mother">母</div>
                  <div className="info">
                    <div className="name">母亲</div>
                    <div className="preview">严格遵守《每日时间表》，不要让我们看到任何偏差。</div>
                  </div>
                  <div className="time">7月10日</div>
                </div>
              </div>
            )}

            {/* Chat Detail */}
            {(wechatView === 'father' || wechatView === 'mother') && (
              <div className="chat-detail">
                <div className="chat-messages">
                  {visibleMessages.map((msg, i) => (
                    <div key={i} className={`msg-bubble msg-${msg.type}`}>
                      {msg.text}
                    </div>
                  ))}
                </div>
                <div className="wechat-input-row">
                  <input type="text" placeholder="" disabled />
                  <button className="icon-btn">😊</button>
                  <button className="icon-btn">➕</button>
                </div>
                <div className="wechat-actions">
                  {callsAttempted[wechatView] ? (
                    <button className="call-btn" disabled>📞 无法接通</button>
                  ) : (
                    <button className="call-btn" onClick={() => callParent(wechatView)}>
                      📞 语音通话
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Police FAB */}
          {showPoliceFab && (
            <button className="police-fab" onClick={callPolice}>
              📞 拨打 110
            </button>
          )}
        </div>
      )}

      {/* ===== SCENE: PHONE CALL ===== */}
      {scene === 'call' && callType && (
        <div className="scene-container call-scene">
          <div className="call-screen">
            <div className={`call-avatar ${
              callType === 'father' ? 'c-father' :
              callType === 'mother' ? 'c-mother' : 'c-police'
            }`}>
              {callType === 'father' ? '父' :
               callType === 'mother' ? '母' : '🚔'}
            </div>
            <div className="call-name">
              {callType === 'police' ? '110 报警中心' :
               callType === 'father' ? '父亲' : '母亲'}
            </div>
            <div className="call-status">{callStatus}</div>

            {/* Ringing dots */}
            {(callStatus === '正在呼叫...' || callStatus === '正在接通...') && (
              <div className="call-dots">
                <span></span><span></span><span></span>
              </div>
            )}

            {/* Dialogue */}
            <div className="call-dialogue">
              {callDialogue.map((line, i) =>
                line.cls ? (
                  <span key={i} className={line.cls}>{line.text}</span>
                ) : (
                  <span key={i}>{line.text}</span>
                )
              )}
            </div>

            {/* Hangup button */}
            {(callType === 'father' || callType === 'mother') && (
              <button className="call-hangup-btn" onClick={hangupCall}>📞</button>
            )}
          </div>
        </div>
      )}

      {/* ===== SCENE: HOME ===== */}
      {scene === 'home' && (
        <div className="scene-container home-scene">
          <div className="home-narration">
            家里还是一尘不染，干净得不像一个……家。
          </div>

          <div className="home-room">
            {/* Calendar */}
            <div
              className="home-hotspot"
              style={{ left: '8%', top: '18%', width: 70, height: 90,
                background: 'linear-gradient(180deg,#fafafa,#e0e0e0)',
                border: '1px solid #ccc', borderRadius: 3 }}
              onClick={() => showClue('calendar')}
            >
              <div style={{ textAlign: 'center', paddingTop: 8, fontSize: 10, color: '#333' }}>
                10<br />7月<br />
                <span style={{ color: '#c0392b', fontWeight: 700 }}>已圈</span>
              </div>
              <div className="glow-ring" />
              <div className="home-label">玄关 · 日历</div>
            </div>

            {/* Fridge */}
            <div
              className="home-hotspot"
              style={{ right: '12%', top: '12%', width: 80, height: 120,
                background: 'linear-gradient(180deg,#d5d5d5,#b0b0b0)',
                borderRadius: 6, border: '1px solid #999',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}
              onClick={() => showClue('fridge')}
            >
              🧊
              <div className="glow-ring" />
              <div className="home-label">冰箱</div>
            </div>

            {/* Study Door */}
            <div
              className="home-hotspot"
              style={{ left: '38%', top: '30%', width: 55, height: 110,
                background: 'linear-gradient(180deg,#3a2a1a,#2a1a0a)',
                borderRadius: 3, border: '2px solid #4a3a2a' }}
              onClick={enterStudy}
            >
              <div style={{
                width: 8, height: 8, borderRadius: '50%',
                background: '#c9a86c', margin: '60px auto 0'
              }} />
              <div className="glow-ring" />
              <div className="home-label">书房</div>
            </div>
          </div>

          <div className="home-hint">点击房间中的物品寻找线索</div>
        </div>
      )}

      {/* ===== SCENE: STUDY ===== */}
      {scene === 'study' && (
        <div className="scene-container study-scene">
          <div className="study-room-box">
            <div className="study-computer">🖥️</div>
            <div className="study-lamp-glow" style={{ bottom: 90, left: '50%', transform: 'translateX(-50%)' }} />

            <div
              className={`study-desk ${brochureFound ? 'found' : ''}`}
              onClick={findBrochure}
            >
              {/* Lamp base */}
              <div style={{
                position: 'absolute', top: 20, left: '50%', transform: 'translateX(-50%)',
                width: 40, height: 50, background: 'linear-gradient(180deg,#333,#1a1a1a)',
                borderRadius: '50% 50% 4px 4px'
              }} />
              {/* Paper edge */}
              <div style={{
                position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)',
                width: 180, height: 4, background: '#333', borderRadius: 2
              }} />
              <div className="desk-hint">
                {brochureFound ? '✓ 已找到宣传单' : '点击书桌寻找线索'}
              </div>
            </div>

            <div className="study-hint-top">
              台灯微弱的光线下，书桌上似乎压着什么...
            </div>
          </div>
        </div>
      )}

      {/* ===== CLUE POPUP OVERLAY ===== */}
      <div className={`clue-overlay ${cluePopup ? 'show' : ''}`}>
        {cluePopup && (
          <div className="clue-card">
            <button className="close-btn" onClick={closeClue}>✕</button>
            {cluePopup === 'calendar' ? (
              <>
                <h3>📅 玄关的日历</h3>
                <div className="clue-content">
                  <p style={{ marginBottom: 12 }}>
                    日历停留在<strong style={{ color: '#c0392b' }}>7天前</strong>的那一页。
                  </p>
                  <p>那一格的空白处，有父亲用工整到几乎没有一丝连笔的字迹写着：</p>
                  <p style={{
                    marginTop: 12, padding: 12, background: '#111',
                    borderLeft: '3px solid #c0392b',
                    fontFamily: "'KaiTi','STKaiti',serif",
                    fontSize: 18, letterSpacing: 2
                  }}>
                    <strong>10:00 前往听泉谷山庄</strong><br />
                    <strong style={{ color: '#c0392b' }}>168小时后归</strong>
                  </p>
                </div>
              </>
            ) : (
              <>
                <h3>🧊 冰箱上的便签</h3>
                <div className="clue-content">
                  <p style={{ marginBottom: 12 }}>
                    冰箱门上贴着一张打印出来的<strong>A4纸</strong>，纸张边缘已经微微卷起。
                  </p>
                  <p style={{
                    padding: 12, background: '#111', border: '1px solid #333',
                    fontFamily: 'monospace', fontSize: 14, lineHeight: 1.8
                  }}>
                    &ldquo;陆寻安，微波炉已设置定时。<br />
                    冰箱内储藏了<strong style={{ color: '#c0392b' }}>10份</strong>标准化速冻营养餐。<br />
                    每餐热量固定为<strong style={{ color: '#c0392b' }}>720大卡</strong>。<br />
                    严格按照操作规程加热。<br />
                    <span style={{ color: '#666' }}>2026年7月10日</span>&rdquo;
                  </p>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* ===== BROCHURE OVERLAY ===== */}
      <div className={`brochure-overlay ${showBrochure ? 'show' : ''}`}>
        {showBrochure && (
          <div className="brochure-card">
            <button className="close-btn" onClick={() => setShowBrochure(false)}>✕</button>

            {/* Front */}
            <div className="brochure-front">
              <div className="front-title">听泉谷度假山庄</div>
              <div className="front-subtitle">TINGQUAN VALLEY RESORT & SPA</div>
              <div className="front-building" />
              <div className="front-tagline">&ldquo;回归绝对理性，纯化您的污染&rdquo;</div>
            </div>

            {/* Back */}
            <div className="brochure-back">
              <p className="back-handwriting">
                &ldquo;不对，不对。<br />
                逻辑崩溃了。<br />
                避难所不是避难所。<br />
                救救&hellip;&hellip;&rdquo;
              </p>
              <div className="qr-area">
                <canvas
                  ref={qrCanvasRef}
                  className="qr-code-canvas"
                  width="120"
                  height="120"
                  onClick={() => window.open('/resort', '_blank')}
                />
                <div className="qr-label">▸ 点击二维码扫描 ◂</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ===== NARRATION OVERLAY ===== */}
      <div className={`narration-overlay ${narration.show ? 'show' : ''}`} onClick={dismissNarration}>
        {narration.show && (
          <>
            <div className="narration-text">{narration.text}</div>
            <div className="narration-tap">点击任意位置继续</div>
          </>
        )}
      </div>
    </>
  )
}
