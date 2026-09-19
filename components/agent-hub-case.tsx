import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/content";
import { AgentHubDemo } from "./agent-hub-demo";

const statusColumns = [
  {
    tone: "done",
    title: "已实现",
    note: "代码与自动化测试可核验",
    items: ["NormalizedEvent 与身份绑定", "Task / Job / Step / Artifact 状态机", "Context Assembler 与 Token 预算", "显式授权的 Preference Memory", "审批、Payload 校验与原子幂等", "文本 / 卡片 / 文件 / 进度交付", "Capability Catalog 与风险策略"],
  },
  {
    tone: "mock",
    title: "Mock 验收",
    note: "生产适配器存在，未接真实业务数据",
    items: ["产品搜索与产品详情", "查价权限与套餐查询", "企业知识库问答", "通讯录与部门广播", "真实模型 Gold Set 8 / 8", "飞书鉴权、Bot 信息与 WebSocket", "真实写操作刻意未执行"],
  },
  {
    tone: "plan",
    title: "下一阶段",
    note: "从受控试运行走向企业生产",
    items: ["接入企业 IAM 权限源", "飞书知识库 ACL 检索", "Evidence 过期与自动刷新", "SQLite 迁移 PostgreSQL + 队列", "跨群 Task 与团队级 Memory", "记忆查看 / 删除交互卡片", "监控、保留周期与数据脱敏"],
  },
] as const;

const contributions = [
  ["产品与场景", "拆解产品查询、查价、知识库、部门通知四条高价值链路，确定飞书为唯一生产入口。"],
  ["架构与实现", "在 Hermes 外建立业务控制面，定义 Task、Evidence、Approval、Delivery、Identity/Policy 的边界。"],
  ["安全与治理", "把“请先确认”从 Prompt 文案升级为代码门，增加身份绑定、精确 Payload 校验和原子幂等。"],
  ["评测与迭代", "建设 Gold Set、失败路径和分层测试矩阵，并明确记录尚未通过的真实写操作与生产依赖。"],
] as const;

export function AgentHubCase({ project, next }: { project: Project; next: Project }) {
  return (
    <>
      <section className="case-section split"><h2>01<br />问题与角色</h2><div><h3>要解决的问题</h3><p>{project.challenge}</p><h3>我的职责</h3><p>{project.roleDetail}</p></div></section>

      <section className="case-section agent-case-section">
        <div className="agent-section-head"><div><span>02 / INTERACTIVE DEMO</span><h2>从一句话，到一次受控交付</h2></div><p>下面运行的是浏览器内状态机，不连接真实飞书、公司数据库或外部接口。它展示产品契约，而不是伪造生产调用。</p></div>
        <AgentHubDemo />
      </section>

      <section className="case-section agent-case-section">
        <div className="agent-section-head"><div><span>03 / 80 秒演示视频</span><h2>把核心闭环讲给面试官看</h2></div><p>中文旁白依次展示请求进入、事实治理、审批代码门、幂等交付、总体架构和个人贡献；全部业务数据均为模拟数据。</p></div>
        <div className="agent-video"><video controls preload="metadata" poster="/projects/enterprise-agent-hub/video-poster.png"><source src="/projects/enterprise-agent-hub/maas-baishitong-demo.mp4" type="video/mp4" />你的浏览器不支持视频播放。</video><footer><span>80.5 SEC · 1920 × 1080 · 中文旁白</span><span>H.264 + AAC</span></footer></div>
      </section>

      <section className="case-section agent-case-section">
        <div className="agent-section-head"><div><span>04 / SYSTEM ARCHITECTURE</span><h2>推理归 Runtime，权力归控制面</h2></div><p>一个生产飞书入口、一个业务任务真相源。Hermes 保留工具循环、MCP、Subagent 与预算控制，但不能绕过权限和审批代码门。</p></div>
        <figure className="agent-architecture"><Image src="/projects/enterprise-agent-hub/architecture.png" width={1600} height={1040} sizes="(max-width: 900px) 92vw, 1200px" alt="MaaS 百事通总架构：飞书入口经过身份策略和业务控制面，进入 Hermes Runtime，再通过能力网关、审批与交付完成任务" priority /><figcaption><i className="done" /> 已实现 <i className="mock" /> Mock 验收 <i className="plan" /> 规划中</figcaption></figure>
        <div className="agent-principles"><article><span>01</span><h3>身份不可由模型填写</h3><p>user_id、chat_id 和业务权限来自已认证事件及企业权限源。</p></article><article><span>02</span><h3>记忆不是业务事实库</h3><p>价格进 Evidence，执行状态进 Task，稳定偏好才进入长期 Memory。</p></article><article><span>03</span><h3>副作用必须可证明</h3><p>preview → confirm → execute → receipt，全链路绑定同一 Payload。</p></article></div>
      </section>

      <section className="case-section agent-context-section">
        <div className="agent-context-copy"><span>05 / CONTEXT &amp; MEMORY</span><h2>上下文不是聊天记录拼接</h2><p>Context Assembler 按权威性和 Token 预算组装每次请求。当前 Task 永远高于历史默认值，低优先级信息可以舍弃并按需从权威存储重新加载。</p><div className="agent-precedence"><b>本轮明确实体</b><i>›</i><span>回复链</span><i>›</i><b>当前 Task</b><i>›</i><span>Session</span><i>›</i><span>长期 Memory</span></div></div>
        <div className="agent-conflict"><div><span>Session 早期</span><b>A 产品</b></div><div><span>长期默认</span><b>B 产品</b></div><div className="active"><span>当前 Task</span><b>C 产品</b></div><p>用户：“把刚才那个产品发出去。”</p><footer><span>系统解析</span><b>C 产品</b><small>task_focus · confidence 0.95</small></footer></div>
        <div className="agent-stores"><div><b>Session</b><span>当前语言现场</span></div><div><b>Task</b><span>目标与执行状态</span></div><div><b>Evidence</b><span>有时效的业务事实</span></div><div><b>Approval</b><span>精确动作授权</span></div><div><b>Memory</b><span>明确保存的稳定偏好</span></div><div><b>Knowledge</b><span>继承 ACL 的组织知识</span></div></div>
      </section>

      <section className="case-section agent-case-section"><div className="agent-section-head"><div><span>06 / PRODUCT DECISIONS</span><h2>关键设计选择</h2></div><p>比产出清单更重要的，是为什么做这些取舍，以及它们如何降低用户成本和企业风险。</p></div><div className="decision-list agent-decisions">{project.decisions.map((decision, index) => <article key={decision.title}><span>0{index + 1}</span><div><h3>{decision.title}</h3><dl><dt>问题</dt><dd>{decision.problem}</dd><dt>选择</dt><dd>{decision.choice}</dd><dt>结果</dt><dd>{decision.result}</dd></dl></div></article>)}</div></section>

      <section className="case-section agent-case-section">
        <div className="agent-section-head"><div><span>07 / DELIVERY STATUS</span><h2>对“做完”保持诚实</h2></div><p>当前成熟度是受控试运行：核心控制面有可执行代码和自动化证据；真实业务写操作与企业生产基础设施仍需补齐。</p></div>
        <div className="agent-progress">{statusColumns.map((column) => <article className={column.tone} key={column.title}><header><i>{column.tone === "done" ? "✓" : column.tone === "mock" ? "≈" : "→"}</i><div><h3>{column.title}</h3><p>{column.note}</p></div></header><ul>{column.items.map((item) => <li key={item}>{item}</li>)}</ul></article>)}</div>
      </section>

      <section className="case-section agent-proof-section">
        <div><span>08 / EVIDENCE &amp; CONTRIBUTION</span><h2>我负责的不只是方案，<br />还有落地边界和验收证据</h2><p>借鉴 Doraemon 的异步任务与证据链思路，但没有复制第二套入口、Session 或 Memory；业务状态始终只有一个真相源。</p></div>
        <div className="agent-contributions">{contributions.map(([title, detail], index) => <article key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{detail}</p></div></article>)}</div>
        <div className="agent-evidence"><div><strong>89 passed</strong><span>业务控制面 + 业务工具 + Replica</span></div><div><strong>536 + 1 skipped</strong><span>飞书 Gateway / Adapter / Background</span></div><div><strong>8 / 8</strong><span>真实模型 + Mock 业务 Gold Set</span></div><p>测试集合存在交叉，未累加包装成“总用例数”；真实群发和写操作刻意未执行。</p></div>
      </section>

      <section className="case-section split"><h2>09<br />结果与复盘</h2><div><h3>结果</h3><p>{project.outcome}</p><blockquote>{project.reflection}</blockquote><div className="confidentiality"><b>公开说明</b><p>{project.confidentiality}</p></div></div></section>
      <Link className="next-case" href={`/projects/${next.slug}`}><span>下一个案例</span><strong>{next.title} →</strong></Link>
    </>
  );
}

