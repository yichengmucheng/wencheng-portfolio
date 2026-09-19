import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/content";
import { AgentHubDemo } from "./agent-hub-demo";

const statusColumns = [
  {
    tone: "done",
    title: "产品闭环",
    note: "从请求理解到结果交付",
    items: ["NormalizedEvent 与身份绑定", "Task / Job / Step / Artifact 状态机", "Context Assembler 与 Token 预算", "显式授权的 Preference Memory", "审批、Payload 校验与原子幂等", "文本 / 卡片 / 文件 / 进度交付", "Capability Catalog 与风险策略"],
  },
  {
    tone: "done",
    title: "业务能力",
    note: "覆盖高频企业任务场景",
    items: ["产品搜索与产品详情", "权限校验与套餐查询", "企业知识库问答", "通讯录与部门通知", "飞书鉴权与 Bot 身份", "WebSocket 事件接入", "统一回执与异常恢复"],
  },
  {
    tone: "done",
    title: "验证体系",
    note: "功能、链路与模型三层验证",
    items: ["业务控制面自动化测试", "飞书 Gateway 链路测试", "真实模型 Gold Set 8 / 8", "失败路径与恢复测试", "审批参数一致性校验", "重复请求幂等验证", "可追溯 Evidence 与 Delivery 回执"],
  },
] as const;

const contributions = [
  ["产品与场景", "拆解产品查询、查价、知识库、部门通知四条高价值链路，确定飞书为唯一生产入口。"],
  ["架构与实现", "在 Hermes 外建立业务控制面，定义 Task、Evidence、Approval、Delivery、Identity/Policy 的边界。"],
  ["安全与治理", "把“请先确认”从 Prompt 文案升级为代码门，增加身份绑定、精确 Payload 校验和原子幂等。"],
  ["评测与迭代", "建设 Gold Set、失败路径和分层测试矩阵，让 Prompt、路由、工具调用和交付结果具备可重复回归依据。"],
] as const;

export function AgentHubCase({ project, next }: { project: Project; next: Project }) {
  return (
    <>
      <section className="case-section split"><h2>01<br />问题与角色</h2><div><h3>要解决的问题</h3><p>{project.challenge}</p><h3>我的职责</h3><p>{project.roleDetail}</p></div></section>

      <section className="case-section agent-case-section">
        <div className="agent-section-head"><div><span>02 / INTERACTIVE DEMO</span><h2>从一句话，到一次受控交付</h2></div><p>以脱敏业务场景还原飞书任务链路，展示身份绑定、事实校验、用户确认与幂等交付如何协同工作。</p></div>
        <AgentHubDemo />
      </section>

      <section className="case-section agent-case-section">
        <div className="agent-section-head"><div><span>03 / 73 秒演示视频</span><h2>把核心闭环讲给面试官看</h2></div><p>中文旁白依次展示请求进入、事实治理、审批代码门、幂等交付与总体架构；业务画面经过脱敏重绘。</p></div>
        <div className="agent-video"><video controls preload="metadata" poster="/projects/enterprise-agent-hub/video-poster.png"><source src="/projects/enterprise-agent-hub/maas-baishitong-demo.mp4" type="video/mp4" />你的浏览器不支持视频播放。</video><footer><span>73 SEC · 1920 × 1080 · 中文旁白</span><span>H.264 + AAC</span></footer></div>
      </section>

      <section className="case-section agent-case-section">
        <div className="agent-section-head"><div><span>04 / SYSTEM ARCHITECTURE</span><h2>推理归 Runtime，权力归控制面</h2></div><p>一个生产飞书入口、一个业务任务真相源。Hermes 保留工具循环、MCP、Subagent 与预算控制，但不能绕过权限和审批代码门。</p></div>
        <figure className="agent-architecture"><Image src="/projects/enterprise-agent-hub/architecture.png" width={1600} height={1040} sizes="(max-width: 900px) 92vw, 1200px" alt="MaaS 百事通总架构：飞书入口经过身份策略和业务控制面，进入 Hermes Runtime，再通过能力网关、审批与交付完成任务" priority /><figcaption>统一入口 · 业务控制面 · Hermes Runtime · 能力网关 · 分层状态存储</figcaption></figure>
        <div className="agent-principles"><article><span>01</span><h3>身份不可由模型填写</h3><p>user_id、chat_id 和业务权限来自已认证事件及企业权限源。</p></article><article><span>02</span><h3>记忆不是业务事实库</h3><p>价格进 Evidence，执行状态进 Task，稳定偏好才进入长期 Memory。</p></article><article><span>03</span><h3>副作用必须可证明</h3><p>preview → confirm → execute → receipt，全链路绑定同一 Payload。</p></article></div>
      </section>

      <section className="case-section agent-context-section">
        <div className="agent-context-copy"><span>05 / CONTEXT &amp; MEMORY</span><h2>上下文不是聊天记录拼接</h2><p>Context Assembler 按权威性和 Token 预算组装每次请求。当前 Task 永远高于历史默认值，低优先级信息可以舍弃并按需从权威存储重新加载。</p><div className="agent-precedence"><b>本轮明确实体</b><i>›</i><span>回复链</span><i>›</i><b>当前 Task</b><i>›</i><span>Session</span><i>›</i><span>长期 Memory</span></div></div>
        <div className="agent-conflict"><div><span>Session 早期</span><b>A 产品</b></div><div><span>长期默认</span><b>B 产品</b></div><div className="active"><span>当前 Task</span><b>C 产品</b></div><p>用户：“把刚才那个产品发出去。”</p><footer><span>系统解析</span><b>C 产品</b><small>task_focus · confidence 0.95</small></footer></div>
        <div className="agent-stores"><div><b>Session</b><span>当前语言现场</span></div><div><b>Task</b><span>目标与执行状态</span></div><div><b>Evidence</b><span>有时效的业务事实</span></div><div><b>Approval</b><span>精确动作授权</span></div><div><b>Memory</b><span>明确保存的稳定偏好</span></div><div><b>Knowledge</b><span>继承 ACL 的组织知识</span></div></div>
      </section>

      <section className="case-section agent-case-section"><div className="agent-section-head"><div><span>06 / PRODUCT DECISIONS</span><h2>关键设计选择</h2></div><p>比产出清单更重要的，是为什么做这些取舍，以及它们如何降低用户成本和企业风险。</p></div><div className="decision-list agent-decisions">{project.decisions.map((decision, index) => <article key={decision.title}><span>0{index + 1}</span><div><h3>{decision.title}</h3><dl><dt>问题</dt><dd>{decision.problem}</dd><dt>选择</dt><dd>{decision.choice}</dd><dt>结果</dt><dd>{decision.result}</dd></dl></div></article>)}</div></section>

      <section className="case-section agent-case-section">
        <div className="agent-section-head"><div><span>07 / DELIVERY RESULT</span><h2>从产品方案到可验证系统</h2></div><p>项目围绕产品闭环、业务能力和验证体系完成交付，让每一次任务执行都有明确输入、状态、授权、证据与结果。</p></div>
        <div className="agent-progress">{statusColumns.map((column) => <article className={column.tone} key={column.title}><header><i>{column.tone === "done" ? "✓" : column.tone === "mock" ? "≈" : "→"}</i><div><h3>{column.title}</h3><p>{column.note}</p></div></header><ul>{column.items.map((item) => <li key={item}>{item}</li>)}</ul></article>)}</div>
      </section>

      <section className="case-section agent-proof-section">
        <div><span>08 / EVIDENCE &amp; CONTRIBUTION</span><h2>我负责的不只是方案，<br />还有落地边界和验收证据</h2><p>借鉴 Doraemon 的异步任务与证据链思路，但没有复制第二套入口、Session 或 Memory；业务状态始终只有一个真相源。</p></div>
        <div className="agent-contributions">{contributions.map(([title, detail], index) => <article key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{detail}</p></div></article>)}</div>
        <div className="agent-evidence"><div><strong>89 passed</strong><span>业务控制面 + 业务工具 + Replica</span></div><div><strong>536 passed</strong><span>飞书 Gateway / Adapter / Background</span></div><div><strong>8 / 8</strong><span>真实模型业务 Gold Set</span></div><p>三层验证分别覆盖业务控制面、飞书链路与模型任务表现，所有公开画面和业务数据均已脱敏。</p></div>
      </section>

      <section className="case-section split"><h2>09<br />结果与复盘</h2><div><h3>结果</h3><p>{project.outcome}</p><blockquote>{project.reflection}</blockquote><div className="confidentiality"><b>公开说明</b><p>{project.confidentiality}</p></div></div></section>
      <Link className="next-case" href={`/projects/${next.slug}`}><span>下一个案例</span><strong>{next.title} →</strong></Link>
    </>
  );
}
