"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  ["NormalizedEvent", "绑定 user / chat / message"],
  ["Task + Reference", "当前焦点：影眸 X3"],
  ["Evidence", "来源、时间、有效期"],
  ["Approval", "锁定目标与正文 hash"],
  ["Delivery", "幂等发送与回执"],
] as const;

const phaseMeta = [
  ["等待请求", "idle", "等待执行"],
  ["事件已归一化", "running", "身份来自 Gateway"],
  ["任务焦点已确定", "running", "Task 优先于 Memory"],
  ["已获得有效证据", "running", "权威来源 · TTL 5m"],
  ["等待用户确认", "waiting_approval", "Payload 已锁定"],
  ["交付完成", "completed", "幂等键已落库"],
] as const;

export function AgentHubDemo() {
  const [phase, setPhase] = useState(0);
  const timers = useRef<number[]>([]);

  const clearTimers = () => {
    timers.current.forEach((timer) => window.clearTimeout(timer));
    timers.current = [];
  };

  useEffect(() => clearTimers, []);

  const reset = () => {
    clearTimers();
    setPhase(0);
  };

  const start = () => {
    if (phase !== 0) return;
    setPhase(1);
    timers.current = [
      window.setTimeout(() => setPhase(2), 900),
      window.setTimeout(() => setPhase(3), 1800),
      window.setTimeout(() => setPhase(4), 2800),
    ];
  };

  const cancel = () => {
    clearTimers();
    setPhase(0);
  };

  const [runtimeLabel, taskState, policyLabel] = phaseMeta[phase];

  return (
    <div className="agent-demo" data-phase={phase}>
      <div className="agent-demo-bar">
        <span><i /><i /><i /></span>
        <b>飞书 · MaaS 百事通 <em>场景演示</em></b>
        <button type="button" onClick={reset}>重置</button>
      </div>
      <div className="agent-demo-grid">
        <div className="agent-chat" aria-label="飞书任务场景演示">
          <small className="agent-chat-date">今天 10:24</small>
          <div className="agent-message">
            <span className="agent-avatar user">林</span>
            <div><small>林可 · 产品运营</small><p>把“影眸 X3”的最新价格发给销售一部。</p></div>
          </div>
          {phase >= 1 && <div className="agent-message"><span className="agent-avatar bot">M</span><div><small>MaaS 百事通</small><p className="bot-bubble">已建立业务任务。我会先确认当前产品、查询有效价格，再生成发送预览。</p></div></div>}
          {phase >= 4 && <div className="agent-message"><span className="agent-avatar bot">M</span><div className="agent-approval">
            <header><strong>发送前确认</strong><em>高风险动作</em></header>
            <div className="agent-approval-product"><strong>影眸 X3</strong><span>脱敏价格 ¥ 12,800 / 套</span></div>
            <dl><div><dt>目标</dt><dd>销售一部 · 12 人</dd></div><div><dt>依据</dt><dd>产品中心 · 10:24:08</dd></div><div><dt>有效期</dt><dd>5 分钟</dd></div></dl>
            <footer><button type="button" onClick={() => setPhase(5)} disabled={phase === 5}>确认发送</button><button type="button" onClick={cancel} disabled={phase === 5}>取消</button></footer>
          </div></div>}
          {phase === 5 && <div className="agent-message"><span className="agent-avatar bot">M</span><div><small>MaaS 百事通</small><p className="bot-bubble success"><b>发送完成</b><br />Delivery 回执：<code>om_demo_7F3A</code>。重复确认不会再次发送。</p></div></div>}
          {phase === 0 && <div className="agent-demo-start"><button type="button" onClick={start}>运行任务演示</button><small>脱敏业务场景 · 展示任务状态与安全确认</small></div>}
        </div>
        <aside className="agent-runtime" aria-label="业务控制面状态">
          <header><span>CONTROL PLANE</span><b>{runtimeLabel}</b></header>
          <ol>
            {steps.map(([title, detail], index) => {
              const number = index + 1;
              const active = phase === number;
              const complete = phase > number || (phase === 5 && number === 5);
              return <li className={active ? "active" : complete ? "complete" : ""} key={title}><i>{number}</i><div><strong>{title}</strong><small>{detail}</small></div><em>{complete ? "DONE" : active ? "RUN" : "—"}</em></li>;
            })}
          </ol>
          <dl aria-live="polite">
            <div><dt>task_id</dt><dd>{phase ? "task_demo_20260919" : "—"}</dd></div>
            <div><dt>状态</dt><dd>{taskState}</dd></div>
            <div><dt>规则</dt><dd>{policyLabel}</dd></div>
          </dl>
        </aside>
      </div>
    </div>
  );
}
