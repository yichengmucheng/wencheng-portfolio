export type Metric = { value: string; label: string; note?: string };
export type Decision = {
  title: string;
  problem: string;
  choice: string;
  result: string;
};

export type Project = {
  slug: string;
  index: string;
  title: string;
  shortTitle: string;
  eyebrow: string;
  summary: string;
  period: string;
  role: string;
  status: string;
  tags: string[];
  metrics: Metric[];
  challenge: string;
  roleDetail: string;
  decisions: Decision[];
  flow: string[];
  evidence: string[];
  outcome: string;
  reflection: string;
  confidentiality: string;
  visual: "agent" | "model" | "rag";
};

export const projects: Project[] = [
  {
    slug: "enterprise-agent-hub",
    index: "01",
    title: "企业级 Agent Hub",
    shortTitle: "Agent Hub",
    eyebrow: "Agent · MCP · 企业效率",
    summary:
      "将分散的业务机器人收敛为飞书统一入口，让 Agent 从回答问题升级为可恢复、可审批、可评测地完成任务。",
    period: "2026.04 — 2026.08",
    role: "AI 产品经理 · 产品与方案负责人",
    status: "受控试运行",
    tags: ["Agent", "MCP", "RAG", "Evaluation", "Feishu"],
    metrics: [
      { value: "200+", label: "目标内部用户" },
      { value: "577", label: "核心自动化用例", note: "Gateway 与业务控制面核心测试" },
      { value: "8/8", label: "真实模型业务评测" },
    ],
    challenge:
      "公司内部十余个系统各自提供机器人或查询入口，能力无法组合；长任务缺少持续执行、失败恢复和统一证据；价格查询、通知等操作又必须受权限和确认约束。",
    roleDetail:
      "我负责产品定位、场景优先级、长任务交互、能力边界和验收指标，并与研发共同把业务约束落实为任务状态、审批、幂等和评测机制。底层通用 Runtime 基于开源 Hermes Agent 扩展，业务控制面、飞书接入与企业工具为项目新增部分。",
    decisions: [
      {
        title: "用统一入口替代机器人孤岛",
        problem: "不同机器人拥有不同入口和上下文，用户必须先理解系统边界，复杂任务无法跨能力完成。",
        choice: "使用飞书作为统一自然语言入口，以 Capability Catalog 组织企业工具，由 Agent 依据完整上下文选择能力。",
        result: "产品信息、价格、知识研究、文档生成与通知可以在同一任务中组合，用户无需切换多个机器人。",
      },
      {
        title: "把高风险动作做成代码级状态机",
        problem: "仅依赖 Prompt 要求模型确认，无法防止参数变化、重复执行和越权操作。",
        choice: "建立 Preview → Confirm → Execute → Evidence 链路，将操作者、目标、参数摘要、有效期和幂等键绑定在服务端。",
        result: "查询可直接执行，写操作必须预览确认；参数变化后旧确认自动失效，重复请求不会造成重复发送。",
      },
      {
        title: "用业务评测连接线上问题与产品迭代",
        problem: "单元测试只能证明代码能运行，无法证明模型会选对工具、遵守顺序并给出可用结果。",
        choice: "基于 Langfuse 建立任务、工具、知识与交付指标，把真实会话沉淀为 Gold Set 和异常样本。",
        result: "Prompt、工具描述、路由和兜底策略都有可重复回归依据，首批真实模型业务评测达到 8/8。",
      },
    ],
    flow: ["飞书请求", "身份与权限", "任务规划", "工具与 MCP", "风险确认", "证据交付", "评测迭代"],
    evidence: [
      "任务、Job、Step、Artifact 四层长任务模型与失败恢复机制",
      "查询、写操作、审批、幂等和 Evidence 的完整产品规则",
      "真实飞书 Bot、Open API、WebSocket 与模型链路连通",
      "Gold Set、异常样本和自动化测试组成的双层评测体系",
    ],
    outcome:
      "完成企业 Agent 从统一入口、工具接入到风险控制和评测闭环的产品化设计，并以受控试运行方式完成首批业务验收。",
    reflection:
      "企业 Agent 的护城河不是工具数量，而是对业务身份、任务状态、风险和证据的建模。模型负责理解和规划，产品必须保证操作可控、结果可验证。",
    confidentiality:
      "公开版本已移除公司系统名称、业务价格、组织关系、接口地址和真实用户数据；交互示例均为合成内容。",
    visual: "agent",
  },
  {
    slug: "structured-model-platform",
    index: "02",
    title: "结构化模型生产与交付平台",
    shortTitle: "模型平台",
    eyebrow: "模型平台 · 风控 · 全生命周期",
    summary:
      "把结构化模型从样本接入、效果评估到生产发布做成一条可验证的交付链路，降低专业门槛和跨环境风险。",
    period: "2026.04 — 2026.08",
    role: "AI 产品经理 · 项目推进",
    status: "内部交付",
    tags: ["Model Platform", "TabPFN", "Evaluation", "API", "Risk"],
    metrics: [
      { value: "约1周→10分钟", label: "单次建模流程" },
      { value: "300→150ms", label: "接口响应", note: "项目测试环境" },
      { value: "5类", label: "模型交付契约" },
    ],
    challenge:
      "传统风控建模依赖专业分析师，数据准备、训练、评估和部署割裂；模型从训练平台迁移到生产环境时，特征顺序、正类定义和打分逻辑容易发生不一致。",
    roleDetail:
      "我负责一站式建模流程、效果评估、业务评分、模型包规范与发布验收设计，并协调算法、平台研发、推理服务和 QA 收敛跨系统契约。",
    decisions: [
      {
        title: "把算法能力翻译为五步产品流程",
        problem: "分析师需要理解训练、推理和环境差异，首次使用成本高，产物散落在多个系统。",
        choice: "将流程收敛为数据准备、应用推理、效果评估、业务评分和发布，并为每一步定义明确产物。",
        result: "分析师可在同一工作台完成模型生产，单次建模从周级缩短到约 10 分钟。",
      },
      {
        title: "用模型包契约解决跨环境交付",
        problem: "单一模型文件缺少输入、标签、环境和业务打分信息，迁移依赖人工口头交接。",
        choice: "定义模型文件加 I/O、环境快照、金标准样例、评分函数和评分测试五类自描述文件。",
        result: "目标环境可以独立完成版本、输入和结果一致性验收，交付过程具备可追溯证据。",
      },
      {
        title: "以业务后果判断精度取舍",
        problem: "GPU 推理精度优化会带来概率尾差，仅比较浮点误差无法判断实际业务风险。",
        choice: "增加概率与业务分双层 parity 测试，重点检查正类方向、分数跨桶和关键阈值。",
        result: "把算法精度争议转化为可验收的业务标准，并为发布和回滚建立明确门槛。",
      },
    ],
    flow: ["样本资产", "应用推理", "指标评估", "业务评分", "模型包", "部署验证", "API服务"],
    evidence: [
      "可运行的建模与推理 Demo",
      "模型包规范、PRD、测试方案和项目复盘",
      "AUC、KS、LIFT 等指标与测试集结果展示",
      "跨环境一致性、压力和稳定性验收设计",
    ],
    outcome:
      "形成从建模到 API 服务的完整产品链路，模型交付由人工解释升级为契约化、自动校验和可审计的标准流程。",
    reflection:
      "AI 产品经理不能只把算法套一层界面。更重要的是把模型能力、工程风险和业务合规转化为流程、契约和验收标准。",
    confidentiality:
      "公开版本使用合成金融样本和重绘界面；已移除公司名称、客户数据、内部域名、模型权重和生产配置。",
    visual: "model",
  },
  {
    slug: "industrial-rag-agent",
    index: "03",
    title: "工业故障知识库与诊断 Agent",
    shortTitle: "工业 RAG",
    eyebrow: "RAG · 知识图谱 · 工业诊断",
    summary:
      "将复杂 A3/FTA 故障报告加工为可检索、可追溯、可沿因果链定位的知识系统，帮助工程师复用历史经验。",
    period: "2025.09 — 2026.01",
    role: "知识库产品经理",
    status: "项目交付",
    tags: ["LightRAG", "Knowledge Graph", "OCR", "Retrieval", "Evaluation"],
    metrics: [
      { value: "65%→90%", label: "有效召回率", note: "典型故障测试集" },
      { value: "约-60%", label: "单次排查时间" },
      { value: "4种", label: "检索模式对比" },
    ],
    challenge:
      "故障知识分散在含复杂表格、图片和因果链的报告中；关键词搜索只能匹配字面，难以关联不同文档中的部件、原因、措施和验证结果。",
    roleDetail:
      "我负责文档接入、知识加工、混合检索、智能问答与效果评测的产品链路，推动 OCR、语义切片、实体关系抽取和图谱增强检索在故障诊断场景落地。",
    decisions: [
      {
        title: "先解决文档结构，再讨论问答效果",
        problem: "A3/FTA 报告包含跨行表格、失效链和图片，直接切片会破坏因果关系。",
        choice: "在向量化前增加 OCR、版面解析、语义切片和领域实体关系抽取，并保留来源位置。",
        result: "检索单元从碎片文本升级为带结构和来源的故障知识，可支持答案追溯。",
      },
      {
        title: "向量检索与图谱检索并行",
        problem: "纯向量检索擅长找相似描述，但难以沿部件—现象—原因—措施跨文档追踪。",
        choice: "采用 LightRAG，将语义检索与实体关系检索融合，并针对局部、全局和混合模式建立测试。",
        result: "典型故障测试集有效召回率由 65% 提升至 90%，复杂案例的关联信息更完整。",
      },
      {
        title: "把调参过程做成可对比产品",
        problem: "Top-K、上下文长度和 Rerank 策略依赖经验，团队难以复现不同配置的效果。",
        choice: "搭建检索测试 WebUI，固定问题集并记录模式、参数、召回片段、回答和来源。",
        result: "不同策略可以在同一案例上并排验证，方案迭代从主观讨论转为证据比较。",
      },
    ],
    flow: ["文档接入", "OCR解析", "语义切片", "实体关系", "混合检索", "带来源回答", "评测迭代"],
    evidence: [
      "本地化 LightRAG 服务与可交互 WebUI",
      "针对 A3/FTA 报告的知识加工流程",
      "多检索模式、Top-K、上下文和 Rerank 参数实验",
      "典型问题集、召回片段和答案来源对照",
    ],
    outcome:
      "完成工业故障知识从文档入库、关系构建到诊断问答的闭环，典型场景有效召回率提升至 90%，单次排查时间缩短约 60%。",
    reflection:
      "RAG 的核心不是接入一个聊天框，而是让文档结构、检索证据、回答来源和评测数据形成可持续迭代的知识产品。",
    confidentiality:
      "公开版本不包含原始故障报告、客户名称、设备编号和真实图谱；所有示例均基于合成设备与故障数据重建。",
    visual: "rag",
  },
];

export const articles = [
  {
    slug: "agent-risk-gates",
    title: "企业 Agent 的写操作，为什么不能只靠一句确认",
    excerpt: "从身份、参数绑定、幂等到证据回执，拆解可控执行的产品机制。",
    date: "2026.09",
    readingTime: "6 分钟",
    tags: ["Agent", "安全", "产品设计"],
    intro: "当 Agent 开始发消息、创建任务或修改文档时，错误不再只是一次坏回答，而可能成为真实业务事故。",
    sections: [
      { heading: "Prompt 不是安全边界", body: "模型可以理解规则，却不适合成为权限与执行状态的唯一真相源。重试、参数变化和提示注入都可能让一句“请先确认”失效。" },
      { heading: "确认必须绑定具体动作", body: "有效确认至少要绑定操作者、目标、完整参数摘要、过期时间和幂等键。任何内容变化都应使旧确认失效。" },
      { heading: "执行以后还需要证据", body: "用户需要知道系统实际做了什么、影响了谁、是否成功以及如何重试。Evidence 既是用户回执，也是后续评测和事故追溯的输入。" },
    ],
  },
  {
    slug: "rag-evaluation",
    title: "RAG 评测不该只盯着最终答案",
    excerpt: "把知识接入、召回、上下文和生成拆成可定位的问题层级。",
    date: "2026.08",
    readingTime: "5 分钟",
    tags: ["RAG", "Evaluation", "知识库"],
    intro: "一个看起来正确的答案，可能来自错误文档、模型常识或偶然命中；一个错误答案，也可能是源文档缺失而不是模型能力不足。",
    sections: [
      { heading: "先判断知识是否存在", body: "评测应先确认目标事实是否被成功解析、切片并建立索引。知识未入库时，调 Prompt 没有意义。" },
      { heading: "召回与生成分开看", body: "记录目标片段是否进入 Top-K、Rerank 后是否保留、上下文是否完整，再判断回答的忠实性和引用准确性。" },
      { heading: "把失败样本变成产品资产", body: "每次线上异常都应归类为解析、召回、排序、生成或交互问题，并沉淀进可重复运行的测试集。" },
    ],
  },
  {
    slug: "model-delivery-contract",
    title: "模型上线不是传一个文件，而是交付一组契约",
    excerpt: "为什么输入、环境、金标准样例和业务评分必须跟模型一起走。",
    date: "2026.07",
    readingTime: "7 分钟",
    tags: ["模型平台", "MLOps", "产品架构"],
    intro: "模型在训练环境表现正常，并不代表它在生产系统中会得到相同结果。最危险的错误通常发生在模型文件之外。",
    sections: [
      { heading: "模型文件缺少业务语义", body: "特征顺序、缺失值规则、正类定义、版本和概率到业务分的映射往往散落在代码或口头交接中。" },
      { heading: "金标准用例让目标环境能够自证", body: "交付包应携带代表性输入、期望概率、期望业务分和生成环境。目标环境必须独立运行并给出一致性报告。" },
      { heading: "契约也是产品边界", body: "训练平台负责产出什么、部署平台验证什么、业务方批准什么，都应由清晰的数据契约和状态机表达。" },
    ],
  },
] as const;

export const labItems = [
  {
    type: "Tool",
    title: "模型包一致性校验器",
    summary: "检查模型文件、I/O 契约、金标准用例与业务评分是否在目标环境保持一致。",
    status: "案例可看",
    href: "/projects/structured-model-platform",
  },
  {
    type: "Skill",
    title: "企业写操作风险门",
    summary: "将预览、确认、参数签名、幂等和证据回执组织为可复用的 Agent 执行规则。",
    status: "案例可看",
    href: "/projects/enterprise-agent-hub",
  },
  {
    type: "Tool",
    title: "RAG 检索策略实验台",
    summary: "在固定问题集上对比检索模式、Top-K、上下文与 Rerank 对结果的影响。",
    status: "案例可看",
    href: "/projects/industrial-rag-agent",
  },
  {
    type: "MCP",
    title: "企业能力目录",
    summary: "以能力、权限、风险、输入输出和版本为字段组织 MCP 与内部工具。",
    status: "设计中",
    href: "/writing/agent-risk-gates",
  },
] as const;

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}
