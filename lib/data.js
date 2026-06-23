// ========== WECHAT MESSAGES ==========
export const fatherMessages = [
  { type: 'center', text: '7月10日 09:55' },
  { type: 'left', text: '我们已出发前往听泉谷山庄。日程已规划。' },
  { type: 'center', text: '7月15日 14:30' },
  { type: 'right', text: '爸，你们到了吗？怎么不回消息？' },
  { type: 'right', text: '电话也打不通。' },
  { type: 'center', text: '7月16日 20:15' },
  { type: 'right', text: '爸，看到消息回我一下。' },
  { type: 'right', text: '我和妈妈都联系不上。' },
  { type: 'center', text: '今天 18:00' },
  { type: 'right', text: '我今天18岁生日。你们……今天不是该回来了吗？' },
]

export const motherMessages = [
  { type: 'center', text: '7月10日 09:55' },
  { type: 'left', text: '陆寻安，满18岁意味着你已具备完全民事行为能力。严格遵守《每日时间表》，不要让我们看到任何偏差。' },
  { type: 'center', text: '7月14日 09:00' },
  { type: 'right', text: '妈，今天的任务我都完成了。你们什么时候回来？' },
  { type: 'center', text: '7月15日 14:31' },
  { type: 'right', text: '妈，你和爸怎么都不回消息？' },
  { type: 'center', text: '今天 18:00' },
  { type: 'right', text: '今天是我18岁生日。你们在哪？' },
]

// ========== 110 CALL DIALOGUE ==========
export const policeCallLines = [
  { text: '接线员：', cls: 'operator-text', delay: 0 },
  { text: '"你好，这里是110报警中心，请问有什么可以帮您？"', cls: '', delay: 400 },
  { text: '\n\n你：', cls: '', delay: 800 },
  { text: '"我父母失联7天了，他们去了一个叫听泉谷山庄的地方。"', cls: '', delay: 400 },
  { text: '\n\n', cls: '', delay: 600 },
  { text: '接线员：', cls: 'operator-text', delay: 400 },
  { text: '（键盘敲击声）', cls: '', delay: 400 },
  { text: '\n\n……同学，你确定是"听泉谷山庄"吗？', cls: '', delay: 1200 },
  { text: '\n\n根据系统登记，听泉谷地区在2021年因特大泥石流灾害已被列为封山无人区，所有的度假村和山庄在五年前就已经全部注销并拆除了。', cls: '', delay: 600 },
  { text: '\n\n那里现在没有信号基站，也没有任何常住人口。', cls: '', delay: 500 },
  { text: '\n\n你确定他们去的是那里吗？', cls: '', delay: 500 },
  { text: '\n\n接线员（声音突然变得低沉）：', cls: '', delay: 1000 },
  { text: '\n\n"另外，请提供你父母的身份证号。……奇怪，系统里为什么查不到这两组数字的近期出行记录？你确定他们是一周前出门的吗？"', cls: '', delay: 300 },
  { text: '\n\n【电话突然被挂断】\n嘟——嘟——嘟——', cls: 'glitch-text', delay: 800 },
]

// ========== RESORT EMPLOYEES ==========
export const employees = [
  { id: 'ZYZ-2019001', name: '赵远志', dept: '院务管理部', title: '院长', avatar: '赵', color: '#5a8a6a', bio: '心理学博士，曾任多所知名疗养机构管理顾问。' },
  { id: 'ZWH-2019003', name: '周文华', dept: '临床心理部', title: '主任医师', avatar: '周', color: '#8a6a4a', bio: '精神科主任医师，专攻认知行为治疗。' },
  { id: 'LZY-2021003', name: '陆正言', dept: '理性研究部', title: '高级研究员', avatar: '陆', color: '#4a90d9', bio: '神经科学博士，研究方向为情绪抑制与认知增强。' },
  { id: 'LSW-2021007', name: '林素问', dept: '纯化部', title: '项目主管', avatar: '林', color: '#7b68ae', bio: '临床心理学硕士，负责纯化心灵项目的设计与执行。' },
  { id: 'CYL-2022004', name: '陈雨岚', dept: '营养膳食部', title: '首席营养师', avatar: '陈', color: '#4a8a9a', bio: '注册营养师，擅长标准化营养餐设计与热量控制。' },
  { id: 'WJH-2023002', name: '王景辉', dept: '安保部', title: '安保主管', avatar: '王', color: '#6a6a6a', bio: '退役军官，负责全院封闭式管理安全。' },
]

// ========== INTERNAL DOCUMENTS ==========
export const internalDocs = [
  {
    id: 'doc1',
    title: '【机密】纯化心灵项目 — 第三阶段研究报告',
    date: '2026-06-15',
    level: '绝密',
    classified: true,
    content: `
      <p>报告编号：PF-2026-037</p>
      <p>研究周期：2025年9月 — 2026年6月</p>
      <p>样本数量：<span class="redacted">██</span> 名签约VIP</p>
      <br>
      <p><strong>研究摘要：</strong></p>
      <p>本项目旨在通过系统性的认知行为干预与神经反馈训练，实现人类情绪反应的<strong>完全可控化</strong>。经过168小时（7天）的密集疗程，配合每日720大卡的标准化营养摄入与严格的感官剥夺环境，受试者的大脑杏仁核活跃度平均下降<span class="redacted">██</span>%，前额叶皮层对边缘系统的控制力提升<span class="redacted">██</span>%。</p>
      <br>
      <p><strong>第三阶段结论：</strong></p>
      <p>实验证实，"纯化"过程是不可逆的。一旦杏仁核的活跃度降至阈值以下，受试者将永久丧失体验恐惧、愤怒、悲伤等负面情绪的能力。</p>
      <p>同时，正面情绪的体验能力也将同步衰减。</p>
      <p><strong>受试者最终状态：完全的理性思维，零情感波动。</strong></p>
      <br>
      <p style="color:#c0392b;"><strong>警告：</strong>第12号受试者在疗程第5天出现严重的认知失调，表现出暴力倾向与幻觉症状。该案例已移交安保部处理。</p>
    `,
  },
  {
    id: 'doc2',
    title: '【内部通讯】2026年7月紧急事件记录',
    date: '2026-07-10',
    level: '紧急',
    classified: true,
    content: `
      <p><strong>发送者：</strong>安保部 王景辉</p>
      <p><strong>接收者：</strong>全体部门主管</p>
      <p><strong>时间：</strong>2026年7月10日 08:30</p>
      <br>
      <p>各位主管：</p>
      <p>今晨6:00，纯化部第12号实验体突破隔离室的安全门，闯入中央控制室并破坏了主控台的<span class="redacted">██</span>系统。目前整个院区的<span class="redacted">██</span>功能已瘫痪。</p>
      <p><strong>请各部门主管立即组织所属人员前往东区紧急集合点。</strong></p>
      <p>所有实验体已被激活并表现出高度攻击性。经院长批准，已启动<strong>红色应急预案</strong>。</p>
      <br>
      <p style="color:#c0392b;">重复：这不是演习。立即撤离。</p>
    `,
  },
  {
    id: 'doc3',
    title: '【个人备忘录】最后的记录',
    date: '2026-07-10 09:47',
    level: '私人',
    classified: false,
    content: `
      <p><em>以下内容来自<strong>林素问</strong>（工号：LSW-2021007）的个人终端，于2026年7月10日 09:47 最后一次自动保存。</em></p>
      <br>
      <p>如果有人看到这段文字——</p>
      <br>
      <p>如果你是我的儿子，陆寻安——</p>
      <br>
      <p>对不起。</p>
      <p>对不起用那样的方式对待你。</p>
      <p>我们以为我们是在保护你——让你远离我们的工作，远离这个……地方。</p>
      <p>我们错了。</p>
      <br>
      <p>听泉谷疗养院的真相是：它是一个以"疗养"为名义的<strong>人体实验机构</strong>。所谓的"纯化心灵"项目，本质上是试图通过神经干预手段<strong>彻底消除人类的情感能力</strong>，制造出"完全理性"的——人形工具。</p>
      <p>你的父亲和我是这个项目的核心研究人员。我们曾经相信这是正确的。我们曾经相信情感是人类最大的弱点。</p>
      <br>
      <p>直到我们亲眼看到了实验结果。</p>
      <p>那些被"纯化"的人——他们不再是人了。他们可以完美地执行命令，但眼神里什么都没有。</p>
      <br>
      <p>我们试图阻止。我们打算在7月10日这次回到山庄后，销毁所有实验数据和设备，然后回家，陪你过18岁生日。</p>
      <p>但赵院长发现了我们的计划。</p>
      <br>
      <p>现在安保部的人封锁了整个院区。所有通讯已被切断。</p>
      <p>我们出不去了。</p>
      <br>
      <div class="urgent-box">
        <strong>陆寻安，如果你看到这些——</strong><br>
        <strong>不要来找我们。</strong><br>
        <strong>不要相信任何自称是"听泉谷"的人。</strong><br>
        <strong>好好活下去。</strong>
      </div>
      <br><br>
      <p style="color:#888;">—— 林素问</p>
      <p style="color:#888;">2026年7月10日 09:47</p>
    `,
  },
]

// ========== LOGIN CREDENTIALS ==========
export const validLogins = [
  { user: 'LSW-2021007', pass: '720168', name: '林素问', dept: '纯化部' },
  { user: 'LZY-2021003', pass: '720168', name: '陆正言', dept: '理性研究部' },
]
