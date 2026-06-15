export interface StorySegment {
  id: string;
  text: string;
  triggerInteraction?: string;
  waitForInteraction?: boolean;
}

export interface DialogueEntry {
  id: string;
  speaker: 'player' | 'caller' | 'system';
  text: string;
  delay?: number;
}

export interface InteractionScene {
  id: string;
  type: 'phone_call';
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
  title: '神隐',
  chapterTitle: '序章·天泉山庄神隐事件',
  storySegments: [
    {
      id: 's1',
      text: '十一月的傍晚，天色暗得格外早。你拖着疲惫的身体回到公寓，却发现玄关的灯居然没有亮——父母向来会为你留一盏灯。',
    },
    {
      id: 's2',
      text: '你喊了几声，屋内只有空荡荡的回音。客厅的茶几上，父亲的茶杯还冒着微弱的余温，母亲的围巾搭在沙发扶手上，一切看起来都像是他们刚刚还在。',
    },
    {
      id: 's3',
      text: '你掏出手机，拨打父亲的号码。忙音。再拨母亲的——同样的忙音。你一遍又一遍地拨，直到手机屏幕上的时间跳过了十五分钟。',
    },
    {
      id: 's4',
      text: '你报了警。接线员的声音平静而遥远，登记了信息后，告诉你："成年人失踪不满二十四小时，暂时无法立案。请你保持电话畅通，如果有任何进展，我们会第一时间联系你。"',
    },
    {
      id: 's5',
      text: '挂断电话后，你走进父母的卧室。床头柜上，一张泛黄的便签纸被压在老旧的台灯下，上面是父亲的字迹——潦草却有力，写着一串你看不懂的符号和三个字：天泉山庄。',
    },
    {
      id: 's6',
      text: '你拿起便签，翻到背面。背面只有一行小字："若吾等不归，循此而去。"字迹很新，墨迹似乎尚未完全干透。',
    },
    {
      id: 's7',
      text: '就在这时，你的手机响了。屏幕上显示的是一个陌生号码，归属地显示为——你翻过便签纸，那个地址所在的城镇。',
      triggerInteraction: 'phone_call_1',
      waitForInteraction: true,
    },
    {
      id: 's8',
      text: '电话那头的声音断断续续，夹杂着电流的杂音。你只听清了最后几个字："……别来。"然后，通话戛然而止。',
    },
    {
      id: 's9',
      text: '你握着手机，手心全是汗。窗外的夜色浓得像墨，而手中的便签纸，似乎在微微发烫。你知道，有些事情，必须亲自去弄清楚。',
    },
    {
      id: 's10',
      text: '序章完。\n\n天泉山庄的秘密，正等待着你揭开。',
    },
  ],
  interactions: {
    phone_call_1: {
      id: 'phone_call_1',
      type: 'phone_call',
      callerName: '未知来电',
      callerNumber: '139****2047',
      autoAnswer: false,
      dialogues: [
        {
          id: 'd1',
          speaker: 'caller',
          text: '……喂？是你吗？',
          delay: 800,
        },
        {
          id: 'd2',
          speaker: 'player',
          text: '你是谁？你知道我父母在哪？',
          delay: 600,
        },
        {
          id: 'd3',
          speaker: 'caller',
          text: '……别来天泉山庄。他们……（电流杂音）……不是你想的那样。',
          delay: 1000,
        },
        {
          id: 'd4',
          speaker: 'player',
          text: '什么意思？喂？你到底是谁？',
          delay: 500,
        },
        {
          id: 'd5',
          speaker: 'caller',
          text: '……（长时间的沉默，只有电流声）……别来。',
          delay: 1500,
        },
        {
          id: 'd6',
          speaker: 'system',
          text: '——通话结束——',
          delay: 500,
        },
      ],
    },
  },
};

export default prologueData;