"use client";

import { useGameStore } from "@/store/gameStore";
import prologueData from "@/data/prologue";
import {
  Phone,
  PhoneOff,
  ChevronLeft,
  MoreHorizontal,
  Signal,
  Wifi,
  Battery,
  Search,
  Plus,
  User,
} from "lucide-react";
import { useEffect, useRef } from "react";

export default function PhoneScene() {
  const {
    activeInteraction,
    interactionPhase,
    dialogueIndex,
    phoneView,
    currentChatContact,
    setInteractionPhase,
    advanceDialogue,
    completeInteraction,
    setPhoneView,
    setCurrentChatContact,
  } = useGameStore();

  const interaction = activeInteraction ? prologueData.interactions[activeInteraction] : null;
  const dialogues = interaction?.dialogues || [];

  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [dialogueIndex, interactionPhase]);

  const handleAnswer = () => {
    setInteractionPhase("connected");
    setTimeout(() => {
      setInteractionPhase("chatting");
    }, 300);
  };

  const handleAdvanceChat = () => {
    if (dialogueIndex < dialogues.length - 1) {
      advanceDialogue();
    } else {
      completeInteraction();
    }
  };

  const openWechatChat = (contact: string) => {
    setCurrentChatContact(contact);
    setPhoneView("wechat_chat");
  };

  const openDialer = () => {
    setPhoneView("dialer");
  };

  const makeCall = (interactionId: string) => {
    setCurrentChatContact(interactionId);
    setPhoneView("call_screen");
  };

  // 微信列表页
  if (phoneView === "wechat_list") {
    return (
      <PhoneShell>
        <WechatHeader title="微信" showBack={false} />
        <div className="flex-1 overflow-y-auto" style={{ backgroundColor: "var(--color-wechat-bg)" }}>
          {/* 搜索栏 */}
          <div className="px-3 py-2">
            <div className="flex items-center gap-2 px-3 py-2 rounded-md" style={{ backgroundColor: "#fff" }}>
              <Search size={14} style={{ color: "var(--color-text-muted)" }} />
              <span className="text-[13px]" style={{ color: "var(--color-text-muted)" }}>搜索</span>
            </div>
          </div>

          {/* 置顶聊天 */}
          <div className="px-4 py-2 text-[11px] font-medium" style={{ color: "var(--color-text-muted)" }}>
            置顶聊天
          </div>

          {/* 父亲 */}
          <div
            className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:opacity-80"
            style={{ backgroundColor: "#fff", borderBottom: "1px solid #f0f0f0" }}
            onClick={() => openWechatChat("father")}
          >
            <div className="w-11 h-11 rounded-lg flex items-center justify-center text-[14px] font-bold flex-shrink-0" style={{ backgroundColor: "#4a7fc1", color: "#fff" }}>
              父
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-[15px] font-medium" style={{ color: "var(--color-text)" }}>父亲</span>
                <span className="text-[11px]" style={{ color: "var(--color-text-muted)" }}>7月10日</span>
              </div>
              <p className="text-[13px] truncate mt-0.5" style={{ color: "var(--color-text-muted)" }}>
                我们已出发前往听泉谷山庄。日程已规划。
              </p>
            </div>
          </div>

          {/* 母亲 */}
          <div
            className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:opacity-80"
            style={{ backgroundColor: "#fff", borderBottom: "1px solid #f0f0f0" }}
            onClick={() => openWechatChat("mother")}
          >
            <div className="w-11 h-11 rounded-lg flex items-center justify-center text-[14px] font-bold flex-shrink-0" style={{ backgroundColor: "#4a7fc1", color: "#fff" }}>
              母
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-[15px] font-medium" style={{ color: "var(--color-text)" }}>母亲</span>
                <span className="text-[11px]" style={{ color: "var(--color-text-muted)" }}>7月10日</span>
              </div>
              <p className="text-[13px] truncate mt-0.5" style={{ color: "var(--color-text-muted)" }}>
                陆寻安，满18岁意味着你已具备完全民事行为能力...
              </p>
            </div>
          </div>

          {/* 拨号按钮 */}
          <div className="px-4 py-4">
            <button
              onClick={openDialer}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg cursor-pointer"
              style={{ backgroundColor: "#07c160" }}
            >
              <Phone size={18} style={{ color: "#fff" }} />
              <span className="text-[15px] font-medium" style={{ color: "#fff" }}>拨打电话</span>
            </button>
          </div>
        </div>
      </PhoneShell>
    );
  }

  // 微信聊天页
  if (phoneView === "wechat_chat") {
    const chatTitle = currentChatContact === "father" ? "父亲" : currentChatContact === "mother" ? "母亲" : "微信";
    return (
      <PhoneShell>
        <WechatHeader
          title={chatTitle}
          showBack={true}
          onBack={() => setPhoneView("wechat_list")}
        />
        <div className="flex-1 flex flex-col" style={{ backgroundColor: "var(--color-wechat-bg)" }}>
          {/* 聊天内容 */}
          <div
            ref={chatContainerRef}
            className="flex-1 flex flex-col gap-4 overflow-y-auto px-4 py-5"
            onClick={handleAdvanceChat}
          >
            {dialogues.slice(0, dialogueIndex + 1).map((d, i) => {
              const isLast = i === dialogueIndex;
              const isPlayer = d.speaker === "player";
              const isSystem = d.speaker === "system";

              if (isSystem) {
                return (
                  <div key={d.id} className="self-center">
                    <span className="text-[13px] px-4 py-1.5 rounded" style={{ color: "#999", backgroundColor: "#dadada" }}>
                      {d.text}
                    </span>
                  </div>
                );
              }

              const avatarText = isPlayer ? "我" : currentChatContact === "father" ? "父" : "母";
              const avatarBg = isPlayer ? "#07c160" : "#4a7fc1";

              return (
                <div
                  key={d.id}
                  className={`flex gap-3 ${isPlayer ? "flex-row-reverse" : "flex-row"}`}
                  style={{ opacity: isLast ? 1 : 0.7, transition: "opacity 0.3s" }}
                >
                  <div
                    className="w-11 h-11 rounded-lg flex-shrink-0 flex items-center justify-center text-[14px] font-bold"
                    style={{ backgroundColor: avatarBg, color: "#fff" }}
                  >
                    {avatarText}
                  </div>
                  <div
                    className="max-w-[68%] px-4 py-2.5 rounded-lg text-[15px] leading-relaxed"
                    style={{
                      backgroundColor: isPlayer ? "var(--color-green)" : "#fff",
                      color: "var(--color-green-text)",
                      border: isPlayer ? "none" : "1px solid #e0e0e0",
                    }}
                  >
                    {d.text}
                  </div>
                </div>
              );
            })}

            {dialogueIndex < dialogues.length && (
              <div className="self-center mt-2">
                <span className="text-[13px] animate-breathe" style={{ color: "var(--color-text-muted)" }}>
                  点击继续
                </span>
              </div>
            )}
          </div>

          {/* 底部输入栏 */}
          <div className="h-14 flex items-center gap-3 px-4 border-t" style={{ backgroundColor: "#f7f7f7", borderColor: "#e0e0e0" }}>
            <div className="flex-1 h-10 rounded bg-white border flex items-center px-4" style={{ borderColor: "#e0e0e0" }}>
              <span className="text-[15px]" style={{ color: "var(--color-text-muted)" }}>点击继续对话...</span>
            </div>
          </div>
        </div>
      </PhoneShell>
    );
  }

  // 拨号盘
  if (phoneView === "dialer") {
    return (
      <PhoneShell>
        <StatusBar />
        <div className="flex-1 flex flex-col items-center justify-center px-6" style={{ backgroundColor: "#fff" }}>
          <div className="text-center mb-8">
            <p className="text-[28px] font-light tracking-wider" style={{ color: "var(--color-text)" }}>138****6723</p>
            <p className="text-[13px] mt-1" style={{ color: "var(--color-text-muted)" }}>母亲</p>
          </div>

          {/* 拨号键盘 */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"].map((key) => (
              <button
                key={key}
                className="w-16 h-16 rounded-full flex items-center justify-center text-[24px] font-light cursor-pointer hover:bg-gray-100 transition-colors"
                style={{ backgroundColor: "#f5f5f5", color: "var(--color-text)" }}
              >
                {key}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => { makeCall("call_mother"); }}
              className="w-16 h-16 rounded-full flex items-center justify-center cursor-pointer"
              style={{ backgroundColor: "#07c160" }}
            >
              <Phone size={28} style={{ color: "#fff" }} />
            </button>
            <button
              onClick={() => setPhoneView("wechat_list")}
              className="w-12 h-12 rounded-full flex items-center justify-center cursor-pointer"
              style={{ backgroundColor: "#f5f5f5" }}
            >
              <ChevronLeft size={20} style={{ color: "var(--color-text)" }} />
            </button>
          </div>

          {/* 快捷联系人 */}
          <div className="flex gap-6 mt-8">
            <button
              onClick={() => { makeCall("call_mother"); }}
              className="flex flex-col items-center gap-1 cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: "#4a7fc1" }}>
                <User size={20} style={{ color: "#fff" }} />
              </div>
              <span className="text-[11px]" style={{ color: "var(--color-text-muted)" }}>母亲</span>
            </button>
            <button
              onClick={() => { makeCall("call_father"); }}
              className="flex flex-col items-center gap-1 cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: "#4a7fc1" }}>
                <User size={20} style={{ color: "#fff" }} />
              </div>
              <span className="text-[11px]" style={{ color: "var(--color-text-muted)" }}>父亲</span>
            </button>
            <button
              onClick={() => { makeCall("call_110"); }}
              className="flex flex-col items-center gap-1 cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: "#e64340" }}>
                <Phone size={20} style={{ color: "#fff" }} />
              </div>
              <span className="text-[11px]" style={{ color: "var(--color-text-muted)" }}>110</span>
            </button>
          </div>
        </div>
      </PhoneShell>
    );
  }

  // 通话界面
  if (phoneView === "call_screen") {
    return (
      <PhoneShell>
        <StatusBar />
        <div className="flex-1 flex flex-col" style={{ backgroundColor: "var(--color-wechat-bg)" }}>
          {/* 来电/通话显示 */}
          {interactionPhase === "ringing" && (
            <div className="flex-1 flex flex-col items-center justify-center gap-8 animate-ring">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "rgba(149, 236, 105, 0.2)" }}
              >
                <Phone size={36} style={{ color: "#07c160" }} />
              </div>

              <div className="text-center">
                <p className="text-xl font-semibold mb-2" style={{ color: "var(--color-text)" }}>
                  {interaction?.callerName}
                </p>
                <p className="text-[15px]" style={{ color: "var(--color-text-muted)" }}>
                  {interaction?.callerNumber}
                </p>
              </div>

              <p className="text-[13px] animate-breathe" style={{ color: "#07c160" }}>
                {interaction?.type === "wechat_chat" ? "语音来电中……" : "正在呼叫……"}
              </p>

              {/* 接听按钮 */}
              <button
                onClick={handleAnswer}
                className="mt-4 w-16 h-16 rounded-full flex items-center justify-center cursor-pointer"
                style={{ backgroundColor: "#07c160" }}
              >
                <Phone size={28} style={{ color: "#fff" }} />
              </button>
            </div>
          )}

          {/* 通话中 */}
          {(interactionPhase === "connected" || interactionPhase === "chatting") && (
            <div className="flex-1 flex flex-col">
              <div
                ref={chatContainerRef}
                className="flex-1 flex flex-col gap-4 overflow-y-auto px-4 py-5"
                onClick={handleAdvanceChat}
              >
                {dialogues.slice(0, dialogueIndex + 1).map((d, i) => {
                  const isLast = i === dialogueIndex;
                  const isSystem = d.speaker === "system";

                  if (isSystem) {
                    return (
                      <div key={d.id} className="self-center">
                        <span className="text-[13px] px-4 py-1.5 rounded" style={{ color: "#999", backgroundColor: "#dadada" }}>
                          {d.text}
                        </span>
                      </div>
                    );
                  }

                  const isPlayer = d.speaker === "player";
                  const avatarText = isPlayer ? "我" : interaction?.callerName?.[0] || "?";
                  const avatarBg = isPlayer ? "#07c160" : "#e0e0e0";
                  const avatarColor = isPlayer ? "#fff" : "#666";

                  return (
                    <div
                      key={d.id}
                      className={`flex gap-3 ${isPlayer ? "flex-row-reverse" : "flex-row"}`}
                      style={{ opacity: isLast ? 1 : 0.7, transition: "opacity 0.3s" }}
                    >
                      <div
                        className="w-11 h-11 rounded-lg flex-shrink-0 flex items-center justify-center text-[14px] font-bold"
                        style={{ backgroundColor: avatarBg, color: avatarColor }}
                      >
                        {avatarText}
                      </div>
                      <div
                        className="max-w-[68%] px-4 py-2.5 rounded-lg text-[15px] leading-relaxed"
                        style={{
                          backgroundColor: isPlayer ? "var(--color-green)" : "#fff",
                          color: "var(--color-green-text)",
                          border: isPlayer ? "none" : "1px solid #e0e0e0",
                        }}
                      >
                        {d.text}
                      </div>
                    </div>
                  );
                })}

                {dialogueIndex < dialogues.length && (
                  <div className="self-center mt-2">
                    <span className="text-[13px] animate-breathe" style={{ color: "var(--color-text-muted)" }}>
                      点击继续
                    </span>
                  </div>
                )}
              </div>

              {/* 底部挂断 */}
              <div className="h-20 flex items-center justify-center border-t" style={{ backgroundColor: "#f7f7f7", borderColor: "#e0e0e0" }}>
                <button
                  onClick={completeInteraction}
                  className="w-14 h-14 rounded-full flex items-center justify-center cursor-pointer"
                  style={{ backgroundColor: "#e64340" }}
                >
                  <PhoneOff size={24} style={{ color: "#fff" }} />
                </button>
              </div>
            </div>
          )}

          {/* 通话结束 */}
          {interactionPhase === "ended" && (
            <div className="flex-1 flex flex-col items-center justify-center gap-5">
              <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}>
                <PhoneOff size={26} style={{ color: "var(--color-text-muted)" }} />
              </div>
              <p className="text-[15px]" style={{ color: "var(--color-text-muted)" }}>通话已结束</p>
              <button
                onClick={() => setPhoneView("wechat_list")}
                className="mt-4 px-6 py-2 rounded-full text-[14px] cursor-pointer"
                style={{ backgroundColor: "#07c160", color: "#fff" }}
              >
                返回
              </button>
            </div>
          )}
        </div>
      </PhoneShell>
    );
  }

  return null;
}

// 手机外壳组件
function PhoneShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full flex items-center justify-center" style={{ backgroundColor: "var(--color-bg)" }}>
      <div
        className="relative overflow-hidden"
        style={{
          width: "380px",
          borderRadius: "48px",
          backgroundColor: "#1c1c1e",
          padding: "14px",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0,0,0,0.08)",
        }}
      >
        {/* 侧边按钮 */}
        <div className="absolute -left-[2px] top-28 w-[3px] h-8 rounded-l" style={{ backgroundColor: "#2c2c2e" }} />
        <div className="absolute -left-[2px] top-40 w-[3px] h-14 rounded-l" style={{ backgroundColor: "#2c2c2e" }} />
        <div className="absolute -left-[2px] top-56 w-[3px] h-14 rounded-l" style={{ backgroundColor: "#2c2c2e" }} />
        <div className="absolute -right-[2px] top-44 w-[3px] h-20 rounded-r" style={{ backgroundColor: "#2c2c2e" }} />

        {/* 手机屏幕 */}
        <div className="relative overflow-hidden flex flex-col" style={{ borderRadius: "38px", backgroundColor: "#000", height: "640px" }}>
          {/* 刘海 */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 flex items-end justify-center" style={{ width: "160px", height: "30px", backgroundColor: "#1c1c1e", borderBottomLeftRadius: "18px", borderBottomRightRadius: "18px" }}>
            <div className="w-16 h-1.5 rounded-full mb-2" style={{ backgroundColor: "#2c2c2e" }} />
          </div>

          {children}

          {/* 底部 home bar */}
          <div className="h-7 flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#1c1c1e" }}>
            <div className="w-32 h-1.5 rounded-full" style={{ backgroundColor: "#3a3a3c" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

// 状态栏
function StatusBar() {
  return (
    <div className="h-11 flex items-end justify-between px-8 pb-1 relative z-10 flex-shrink-0" style={{ backgroundColor: "var(--color-wechat-header)" }}>
      <span className="text-[13px] font-semibold" style={{ color: "var(--color-text)" }}>18:30</span>
      <div className="flex items-center gap-1.5">
        <Signal size={16} style={{ color: "var(--color-text)" }} />
        <Wifi size={16} style={{ color: "var(--color-text)" }} />
        <Battery size={20} style={{ color: "var(--color-text)" }} />
      </div>
    </div>
  );
}

// 微信头部
function WechatHeader({ title, showBack, onBack }: { title: string; showBack: boolean; onBack?: () => void }) {
  return (
    <div className="h-12 flex items-center justify-between px-4 flex-shrink-0 relative z-10" style={{ backgroundColor: "var(--color-wechat-header)", borderBottom: "1px solid #d5d3cf" }}>
      <div className="flex items-center gap-0.5">
        {showBack && (
          <button onClick={onBack} className="flex items-center gap-0.5 cursor-pointer">
            <ChevronLeft size={22} style={{ color: "var(--color-text)" }} />
            <span className="text-[15px]" style={{ color: "var(--color-text)" }}>微信</span>
          </button>
        )}
        {!showBack && (
          <>
            <span className="text-[15px]" style={{ color: "var(--color-text)" }}>微信</span>
            <Plus size={18} style={{ color: "var(--color-text)" }} className="ml-2" />
          </>
        )}
      </div>
      <span className="text-[16px] font-medium" style={{ color: "var(--color-text)" }}>{title}</span>
      <MoreHorizontal size={22} style={{ color: "var(--color-text)" }} />
    </div>
  );
}
