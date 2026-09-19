import Image from "next/image";

type VisualType = "agent" | "model" | "rag";

function AgentVisual() {
  return (
    <div className="visual-window agent-visual">
      <div className="window-bar feishu-window-bar"><i /><i /><i /><span>飞书 · 销售协同群</span><em>场景演示</em></div>
      <div className="feishu-shell">
        <nav className="feishu-rail" aria-label="飞书功能栏"><b>∞</b><span className="active">聊</span><span>会</span><span>云</span><span>工</span><i>林</i></nav>
        <aside className="feishu-inbox">
          <div className="feishu-search">⌕ 搜索</div>
          <strong>消息</strong>
          <div className="feishu-thread active"><i>M</i><div><b>销售协同群</b><small>MaaS 百事通：发送前请确认</small></div><em>10:24</em></div>
          <div className="feishu-thread"><i className="purple">产</i><div><b>产品运营</b><small>新品资料已同步</small></div><em>09:41</em></div>
          <div className="feishu-thread"><i className="green">周</i><div><b>周报协作群</b><small>本周进展已汇总</small></div><em>昨天</em></div>
        </aside>
        <main className="feishu-conversation">
          <header><div><b>销售协同群</b><span>18 人</span></div><nav>⌕　⋯</nav></header>
          <div className="feishu-messages">
            <small className="feishu-time">10:24</small>
            <div className="feishu-message human"><i>林</i><div><span>林可</span><p><b>@MaaS 百事通</b> 把“影眸 X3”的最新价格发给销售一部。</p></div></div>
            <div className="feishu-message bot"><i>M</i><div><span>MaaS 百事通 <em>机器人</em></span><p>已确认当前产品与有效价格，并生成发送预览。</p>
              <section className="feishu-card"><header><b>发送前确认</b><em>业务通知</em></header><strong>影眸 X3</strong><small>¥ 12,800 / 套 · 产品中心 10:24 更新</small><dl><div><dt>发送范围</dt><dd>销售一部 · 12 人</dd></div><div><dt>内容状态</dt><dd>已通过权限与有效期校验</dd></div></dl><button type="button">确认发送</button></section>
            </div></div>
          </div>
          <footer><span>＋</span><p>回复 销售协同群</p><span>☺　⌘</span></footer>
        </main>
      </div>
    </div>
  );
}

function ModelVisual() {
  return (
    <div className="visual-window real-product-visual model-real-visual">
      <Image
        src="/media/structured-model-demo-poster.jpg"
        alt="ModelFit 结构化模型平台的模型配置页面"
        fill
        sizes="(max-width: 760px) 100vw, 60vw"
      />
      <span className="real-shot-badge"><i />REAL PRODUCT · MODELFIT</span>
    </div>
  );
}

function RagVisual() {
  return (
    <div className="visual-window real-product-visual rag-real-visual">
      <Image
        src="/media/industrial-rag-agent-demo-poster.jpg"
        alt="工业故障知识库与诊断 Agent 的知识图谱页面"
        fill
        sizes="(max-width: 760px) 100vw, 60vw"
      />
      <span className="real-shot-badge"><i />REAL PRODUCT · KNOWLEDGE GRAPH</span>
    </div>
  );
}

export function ProjectVisual({ type }: { type: VisualType }) {
  if (type === "agent") return <AgentVisual />;
  if (type === "model") return <ModelVisual />;
  return <RagVisual />;
}
