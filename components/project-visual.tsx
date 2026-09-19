type VisualType = "agent" | "model" | "rag";

function AgentVisual() {
  return (
    <div className="visual-window agent-visual">
      <div className="window-bar"><i /><i /><i /><span>Agent Workspace</span></div>
      <div className="agent-grid">
        <aside><b>工作区</b><span className="selected">任务执行</span><span>能力目录</span><span>评测中心</span></aside>
        <div className="agent-main">
          <div className="chat user">整理竞品信息，并生成一份简报</div>
          <div className="task-box">
            <p><i className="pulse" /> 正在执行 · 3 / 4</p>
            <span className="done">✓ 检索企业知识</span>
            <span className="done">✓ 聚合公开信息</span>
            <span className="active-step">↻ 生成结构化文档</span>
            <span>○ 等待发送确认</span>
          </div>
          <div className="approval"><span>发送给项目群</span><span className="mock-button">预览并确认</span></div>
        </div>
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
