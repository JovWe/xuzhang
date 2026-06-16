export interface StorySegment {
  id: string;
  text: string;
  triggerInteraction?: string;
  waitForInteraction?: boolean;
  isNarrator?: boolean;
}

export interface DialogueEntry {
  id: string;
  speaker: "player" | "caller" | "system";
  text: string;
  delay?: number;
}

export interface InteractionScene {
  id: string;
  type: "wechat_chat" | "phone_call";
  callerName: string;
  callerNumber: string;
  dialogues: DialogueEntry[];
  autoAnswer?: boolean;
}

export interface PrologueData {
  title: string;
  chapterTitle: string;
  storySegments: StorySegment[];
  interactions: Record<string, InteractionScene>;
}

const prologueData: PrologueData = {
  title: "听泉谷神隐事件",
  chapterTitle: "序章·听泉谷神隐事件",
  storySegments: [
    {
      id: "s1",
      text: "2026年7月17日（周五）傍晚 18:30\n\n今天是我18岁的生日。",
    },
    {
      id: "s2",
      text: "一向极度准时、严苛的父母在一周前宣称去\u201c听泉谷山庄度假\u201d后彻底失联。连续7天，他们的电话提示永远是\u201c您拨打的电话不在服务区\u201d。",
    },
    {
      id: "s3",
      text: "我打开微信，置顶聊天框是【父亲】和【母亲】。上一次对话停留在7天前——7月10日 09:55。",
      triggerInteraction: "wechat_open",
      waitForInteraction: true,
    },
    {
      id: "s4",
      text: "我盯着屏幕，手指悬在拨号键上。犹豫再三，我点击了母亲的电话。",
      triggerInteraction: "call_mother",
      waitForInteraction: true,
    },
    {
      id: "s5",
      text: "漫长的嘟声后，传来机械的女声，但声音带有微弱的电流杂音和重音，显得有些诡异：\n\n\u201c对不起……您拨打的电话……不在服务区……Sorry, the subscriber you dialed……is not in the service area……\u201d",
    },
    {
      id: "s6",
      text: "我又拨打了父亲的电话。同样的忙音，同样的机械女声，同样的电流杂音。",
      triggerInteraction: "call_father",
      waitForInteraction: true,
    },
    {
      id: "s7",
      text: "我无奈之下点击拨号盘，拨打【110】。",
      triggerInteraction: "call_110",
      waitForInteraction: true,
    },
    {
      id: "s8",
      text: "接线员（声音沉稳、公式化）：\u201c你好，这里是110报警中心，请问有什么可以帮您？\u201d\n\n我：\u201c我父母失联7天了，他们去了一个叫听泉谷山庄的地方。\u201d",
    },
    {
      id: "s9",
      text: "电话那边传来密集的键盘敲击声，随后是一段长达5秒的沉默。",
    },
    {
      id: "s10",
      text: "\u201c……同学，你确定是\u2018听泉谷山庄\u2019吗？根据系统登记，听泉谷地区在2021年因特大泥石流灾害已被列为封山无人区，所有的度假村和山庄在五年前就已经全部注销并拆除了。那里现在没有信号基站，也没有任何常住人口。你确定他们去的是那里吗？\u201d",
    },
    {
      id: "s11",
      text: "接线员（声音突然变得有些低沉）：\u201c另外，请提供你父母的身份证号。……奇怪，系统里为什么查不到这两组数字的近期出行记录？你确定他们是一周前出门的吗？\u201d",
    },
    {
      id: "s12",
      text: "电话突然被挂断，传来忙音：嘟——嘟——嘟——",
    },
    {
      id: "s13",
      text: "我握着手机，手心全是汗。窗外的天色已经完全暗了下来。",
    },
    {
      id: "s14",
      text: "我买了最近一班回家的车票。",
    },
    {
      id: "s15",
      text: "家里还是一尘不染，干净的不像一个……家。",
    },
    {
      id: "s16",
      text: "【玄关的日历】\n\n日历停留在7天前。那一天的格子里，父亲用极其工整、没有一丝连笔的字迹写着：10:00 前往听泉谷山庄，168小时后归。",
    },
    {
      id: "s17",
      text: "【冰箱上的便签】\n\n贴着一张打印出来的A4纸：\n\n\u201c陆寻安，微波炉已设置定时。冰箱内储藏了10份标准化速冻营养餐。每餐热量固定为720大卡。严格按照操作规程加热。2026年7月10日\u201d",
    },
    {
      id: "s18",
      text: "在记忆中，书房是家里的禁区。父母永远在里面进行着某种不可告人的\u201c工作\u201d，每次我靠近，迎来的都是锁孔拧紧的声音。他们从不允许我多看一眼……",
    },
    {
      id: "s19",
      text: "我点击书房门把手。这一次，门锁发出\u201c咔哒\u201d一声——它没有锁。",
    },
    {
      id: "s20",
      text: "我打开书房的灯。房间在刺眼的日光灯下毫无保留地展现在眼前。这里干净得像一个样板间。书桌上有一台电脑。",
    },
    {
      id: "s21",
      text: "然而，在台灯底座的边缘，压着一张边缘泛黄、明显与这个房间风格不符的纸质印刷品。",
    },
    {
      id: "s22",
      text: "【道具获得：听泉谷度假山庄的宣传单】\n\n正面设计：充斥着廉价且诡异的绿色调。主视觉是一个隐藏在深山迷雾中的巨大疗养院建筑，广告语写着：\u201c回归绝对理性，纯化您的污染。\u201d",
    },
    {
      id: "s23",
      text: "反面设计：这一面原本是空白的，但上面有母亲用黑色签字笔写下的字迹。这一次，字迹极其潦草、颤抖、甚至划破了纸张，与她平时工整的作风判然两别：\n\n\u201c不对，不对。逻辑崩溃了。避难所不是避难所。救救……\u201d",
    },
    {
      id: "s24",
      text: "序章完。\n\n听泉谷的秘密，正等待着你揭开。",
    },
  ],
  interactions: {
    wechat_open: {
      id: "wechat_open",
      type: "wechat_chat",
      callerName: "微信",
      callerNumber: "",
      autoAnswer: true,
      dialogues: [
        {
          id: "w1",
          speaker: "system",
          text: "7月10日 09:55",
          delay: 300,
        },
        {
          id: "w2",
          speaker: "caller",
          text: "我们已出发前往听泉谷山庄。日程已规划。",
          delay: 600,
        },
        {
          id: "w3",
          speaker: "caller",
          text: "陆寻安，满18岁意味着你已具备完全民事行为能力。严格遵守《每日时间表》，不要让我们看到任何偏差。",
          delay: 800,
        },
        {
          id: "w4",
          speaker: "system",
          text: "7月15日",
          delay: 400,
        },
        {
          id: "w5",
          speaker: "player",
          text: "爸，妈，你们怎么不回消息？电话也打不通。",
          delay: 500,
        },
        {
          id: "w6",
          speaker: "system",
          text: "今天 18:00",
          delay: 400,
        },
        {
          id: "w7",
          speaker: "player",
          text: "我今天18岁生日。你们……今天不是该回来了吗？",
          delay: 600,
        },
        {
          id: "w8",
          speaker: "system",
          text: "——未读——",
          delay: 300,
        },
      ],
    },
    call_mother: {
      id: "call_mother",
      type: "phone_call",
      callerName: "母亲",
      callerNumber: "138****6723",
      autoAnswer: false,
      dialogues: [
        {
          id: "m1",
          speaker: "system",
          text: "正在呼叫 母亲……",
          delay: 500,
        },
        {
          id: "m2",
          speaker: "system",
          text: "对不起……您拨打的电话……不在服务区……",
          delay: 1500,
        },
        {
          id: "m3",
          speaker: "system",
          text: "Sorry, the subscriber you dialed……is not in the service area……",
          delay: 1000,
        },
        {
          id: "m4",
          speaker: "system",
          text: "——通话结束——",
          delay: 500,
        },
      ],
    },
    call_father: {
      id: "call_father",
      type: "phone_call",
      callerName: "父亲",
      callerNumber: "139****8841",
      autoAnswer: false,
      dialogues: [
        {
          id: "f1",
          speaker: "system",
          text: "正在呼叫 父亲……",
          delay: 500,
        },
        {
          id: "f2",
          speaker: "system",
          text: "对不起……您拨打的电话……不在服务区……",
          delay: 1500,
        },
        {
          id: "f3",
          speaker: "system",
          text: "Sorry, the subscriber you dialed……is not in the service area……",
          delay: 1000,
        },
        {
          id: "f4",
          speaker: "system",
          text: "——通话结束——",
          delay: 500,
        },
      ],
    },
    call_110: {
      id: "call_110",
      type: "phone_call",
      callerName: "110报警中心",
      callerNumber: "110",
      autoAnswer: false,
      dialogues: [
        {
          id: "p1",
          speaker: "system",
          text: "正在呼叫 110……",
          delay: 500,
        },
        {
          id: "p2",
          speaker: "caller",
          text: "你好，这里是110报警中心，请问有什么可以帮您？",
          delay: 800,
        },
        {
          id: "p3",
          speaker: "player",
          text: "我父母失联7天了，他们去了一个叫听泉谷山庄的地方。",
          delay: 600,
        },
        {
          id: "p4",
          speaker: "system",
          text: "（电话那边传来密集的键盘敲击声，随后是一段长达5秒的沉默）",
          delay: 2000,
        },
        {
          id: "p5",
          speaker: "caller",
          text: "……同学，你确定是\u2018听泉谷山庄\u2019吗？根据系统登记，听泉谷地区在2021年因特大泥石流灾害已被列为封山无人区，所有的度假村和山庄在五年前就已经全部注销并拆除了。那里现在没有信号基站，也没有任何常住人口。你确定他们去的是那里吗？",
          delay: 1500,
        },
        {
          id: "p6",
          speaker: "caller",
          text: "另外，请提供你父母的身份证号。……奇怪，系统里为什么查不到这两组数字的近期出行记录？你确定他们是一周前出门的吗？",
          delay: 1200,
        },
        {
          id: "p7",
          speaker: "system",
          text: "（电话突然被挂断，传来忙音：嘟——嘟——嘟——）",
          delay: 1000,
        },
        {
          id: "p8",
          speaker: "system",
          text: "——通话结束——",
          delay: 500,
        },
      ],
    },
  },
};

export default prologueData;
