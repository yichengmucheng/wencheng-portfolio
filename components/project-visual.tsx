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
    <div className="visual-window model-visual">
      <div className="window-bar"><i /><i /><i /><span>Model Delivery</span></div>
      <div className="model-body">
        <div className="steps"><b>01 数据</b><b>02 推理</b><b>03 评估</b><b>04 评分</b><b>05 发布</b></div>
        <div className="score-card">
          <div><span>模型效果</span><strong>0.892</strong><small>AUC · 验证通过</small></div>
          <svg viewBox="0 0 220 90" aria-label="模型效果曲线">
            <path className="gridline" d="M0 70H220M0 40H220M0 10H220" />
            <path className="chartline" d="M0 78 C35 67 44 43 75 49 S115 21 145 27 S185 8 220 12" />
            <path className="chartfill" d="M0 78 C35 67 44 43 75 49 S115 21 145 27 S185 8 220 12 L220 90 L0 90Z" />
          </svg>
        </div>
        <div className="package-row"><span>model.bin</span><span>io-contract.json</span><span>golden-set.csv</span><em>一致性校验通过</em></div>
      </div>
    </div>
  );
}

function RagVisual() {
  return (
    <div className="visual-window rag-visual">
      <div className="window-bar"><i /><i /><i /><span>Knowledge Explorer</span></div>
      <div className="rag-body">
        <div className="query">冷却回路温度异常可能由什么导致？ <b>↵</b></div>
        <div className="rag-columns">
          <div className="graph" aria-label="故障知识关系图">
            <svg viewBox="0 0 250 180">
              <g className="edges"><path d="M125 85L55 40M125 85L55 135M125 85L198 38M125 85L203 140M55 40L22 85M198 38L225 83" /></g>
              <g className="nodes"><circle cx="125" cy="85" r="24"/><circle cx="55" cy="40" r="15"/><circle cx="55" cy="135" r="15"/><circle cx="198" cy="38" r="15"/><circle cx="203" cy="140" r="15"/><circle cx="22" cy="85" r="9"/><circle cx="225" cy="83" r="9"/></g>
              <g className="labels"><text x="125" y="89">温度异常</text><text x="55" y="44">流量</text><text x="55" y="139">传感器</text><text x="198" y="42">换热器</text><text x="203" y="144">控制阀</text></g>
            </svg>
          </div>
          <div className="answer"><small>综合 4 条知识证据</small><p>优先检查循环泵流量与控制阀反馈，其次核对温度传感器漂移。</p><span>[1] 维护指南 · §4.2</span><span>[2] 故障案例 · A-017</span></div>
        </div>
      </div>
    </div>
  );
}

export function ProjectVisual({ type }: { type: VisualType }) {
  if (type === "agent") return <AgentVisual />;
  if (type === "model") return <ModelVisual />;
  return <RagVisual />;
}
