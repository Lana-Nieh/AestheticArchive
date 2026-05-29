import { useLanguage, type Language } from '@/stores/languageStore'

type Pair = { en: string; zh: string }
type Dict = Record<string, Pair>

const dict: Dict = {
  // ───────────────────────── common ─────────────────────────
  'common.cancel':              { en: 'Cancel',                       zh: '取消' },
  'common.save':                { en: 'Save',                         zh: '保存' },
  'common.add':                 { en: 'Add',                          zh: '添加' },
  'common.delete':              { en: 'Delete',                       zh: '删除' },
  'common.edit':                { en: 'Edit',                         zh: '编辑' },
  'common.close':               { en: 'Close',                        zh: '关闭' },
  'common.search':              { en: 'Search',                       zh: '搜索' },
  'common.export':              { en: 'Export',                       zh: '导出' },
  'common.share':               { en: 'Share',                        zh: '分享' },
  'common.copy':                { en: 'Copy',                         zh: '复制' },
  'common.clear':               { en: 'Clear',                        zh: '清除' },
  'common.reset':               { en: 'Reset',                        zh: '重置' },
  'common.confirm':             { en: 'Confirm',                      zh: '确认' },
  'common.back':                { en: 'Back',                         zh: '返回' },
  'common.next':                { en: 'Next',                         zh: '下一个' },
  'common.previous':            { en: 'Previous',                     zh: '上一个' },
  'common.favorite':            { en: 'Favorite',                     zh: '收藏' },
  'common.unfavorite':          { en: 'Unfavorite',                   zh: '取消收藏' },
  'common.selected':            { en: 'selected',                     zh: '已选' },
  'common.assets':              { en: 'assets',                       zh: '项' },
  'common.asset':               { en: 'asset',                        zh: '项' },
  'common.today':               { en: 'Today',                        zh: '今天' },
  'common.updated':             { en: 'Updated',                      zh: '更新于' },
  'common.new':                 { en: 'New',                          zh: '新建' },
  'common.more':                { en: 'More',                         zh: '更多' },
  'common.dismiss':             { en: 'Dismiss',                      zh: '忽略' },
  'common.accept':              { en: 'Accept',                       zh: '接受' },
  'common.ignore':              { en: 'Ignore',                       zh: '忽略' },
  'common.undo':                { en: 'Undo',                         zh: '撤销' },
  'common.rename':              { en: 'Rename',                       zh: '重命名' },

  'common.theme':               { en: 'Theme',                        zh: '主题' },
  'common.language':            { en: 'Language',                     zh: '语言' },
  'common.theme_light':         { en: 'Light',                        zh: '浅色' },
  'common.theme_dark':          { en: 'Dark',                         zh: '深色' },
  'common.theme_system':        { en: 'System',                       zh: '跟随系统' },
  'common.lang_en':             { en: 'English',                      zh: '英文' },
  'common.lang_zh':             { en: '中文',                          zh: '中文' },

  'common.ago_s':               { en: '{n}s ago',                     zh: '{n} 秒前' },
  'common.ago_m':               { en: '{n}m ago',                     zh: '{n} 分钟前' },
  'common.ago_h':               { en: '{n}h ago',                     zh: '{n} 小时前' },
  'common.ago_d':               { en: '{n}d ago',                     zh: '{n} 天前' },
  'common.ago_mo':              { en: '{n}mo ago',                    zh: '{n} 个月前' },
  'common.ago_y':               { en: '{n}y ago',                     zh: '{n} 年前' },

  // ───────────────────────── nav (sidebar) ─────────────────────────
  'nav.archive':                { en: 'Archive',                      zh: '档案库' },
  'nav.collections':            { en: 'Collections',                  zh: '收藏夹' },
  'nav.search':                 { en: 'Search',                       zh: '搜索' },
  'nav.profile':                { en: 'Aesthetic Profile',            zh: '审美档案' },
  'nav.projects':               { en: 'Projects',                     zh: '项目' },
  'nav.agent':                  { en: 'Agent Tasks',                  zh: '策展任务' },
  'nav.settings':               { en: 'Settings',                     zh: '设置' },
  'nav.shelves':                { en: 'Shelves',                      zh: '书架' },
  'nav.version':                { en: 'v0.1 · prototype',             zh: 'v0.1 · 原型' },

  // ───────────────────────── topbar ─────────────────────────
  'top.search_placeholder':     {
    en: 'Search by feeling, color, material, layout… try "quiet beige wooden interiors"',
    zh: '用感觉、色彩、材质或构图搜索…试试"安静的米色木质室内"',
  },
  'top.import':                 { en: 'Import',                       zh: '导入' },
  'top.command_menu':           { en: 'Command menu',                 zh: '命令面板' },
  'top.open_command_menu':      { en: 'Open command menu',            zh: '打开命令面板' },
  'top.ask_agent':              { en: 'Ask the agent',                zh: '询问策展人' },
  'top.agent':                  { en: 'Agent',                        zh: '策展人' },

  // ───────────────────────── landing ─────────────────────────
  'landing.brand':              { en: 'Aesthetic Archive',            zh: '审美档案' },
  'landing.nav.profile':        { en: 'Profile',                      zh: '档案' },
  'landing.nav.curator':        { en: 'Curator',                      zh: '策展人' },
  'landing.nav.collections':    { en: 'Collections',                  zh: '收藏夹' },
  'landing.nav.open_studio':    { en: 'Open studio',                  zh: '进入工作室' },

  'landing.hero.eyebrow':       { en: 'A personal aesthetic memory system', zh: '属于你的审美记忆系统' },
  'landing.hero.title_part1':   { en: 'Your taste,',                  zh: '你的审美，' },
  'landing.hero.title_em':      { en: 'finally',                      zh: '终于' },
  'landing.hero.title_part2':   { en: 'organized.',                   zh: '井然有序。' },
  'landing.hero.body':          {
    en: 'Aesthetic Archive is a private visual studio for creators, designers, brand owners and visual researchers. Save references, let your curator quietly understand them, and pull them back as moodboards, briefs, and clear creative direction.',
    zh: '「审美档案」是为创作者、设计师、品牌主理人与视觉研究者打造的私人视觉工作室。保存灵感，让你的策展人静静理解它们，再以情绪板、创意简报与清晰的创作方向归还于你。',
  },
  'landing.hero.cta_studio':    { en: 'Open the studio',              zh: '进入工作室' },
  'landing.hero.cta_profile':   { en: 'See an Aesthetic Profile',     zh: '查看审美档案样本' },
  'landing.hero.quiet':         {
    en: 'Private by design · For one taste, not a thousand brands',
    zh: '天生私密 · 为一个人的品味而生，而非千万品牌',
  },

  'landing.curator_card':       {
    en: 'These six share a warm minimal language — oak, linen, brass, and natural daylight. Save as "Quiet Luxury Interiors"?',
    zh: '这六张共享一种温暖的极简语言——橡木、亚麻、黄铜、自然日光。保存为"静奢室内"？',
  },
  'landing.curator_save':       { en: 'Save shelf',                   zh: '保存书架' },

  'landing.problem.eyebrow':    { en: 'The problem',                  zh: '困境' },
  'landing.problem.title':      {
    en: 'Collecting is easy. Organizing your taste is the hard part.',
    zh: '收集很容易，整理你的审美才是难题。',
  },
  'landing.problem.body1':      {
    en: 'You bookmark, screenshot, and pin until you have thousands of references — and still rebuild a moodboard from zero every time a project starts.',
    zh: '你不断地收藏、截图、钉图，积累了成千上万张参考——却仍要在每个项目开始时从零拼凑情绪板。',
  },
  'landing.problem.body2_part1':{ en: 'Folders flatten meaning. Tags forget context. Pinterest doesn\'t know you. DAMs are built for enterprises, not for the way one creator actually ', zh: '文件夹抹平了含义，标签遗忘了上下文，Pinterest 并不真正了解你，DAM 是为企业而非个人创作者的方式所设计的。一个真正的创作者是如何' },
  'landing.problem.body2_part2':{ en: 'sees.',                         zh: '看见的，没有人在意。' },

  'landing.fact.1.n':           { en: '3,200',                        zh: '3,200' },
  'landing.fact.1.l':           { en: 'references the average designer collects in 12 months', zh: '一位设计师 12 个月内平均收集的参考数' },
  'landing.fact.2.n':           { en: '62%',                          zh: '62%' },
  'landing.fact.2.l':           { en: 'of them are never looked at again', zh: '其中再也不会被翻看的比例' },
  'landing.fact.3.n':           { en: '47 min',                       zh: '47 分钟' },
  'landing.fact.3.l':           { en: 'median time spent rebuilding a moodboard', zh: '重新拼凑一块情绪板的中位时长' },
  'landing.fact.4.n':           { en: '∞',                            zh: '∞' },
  'landing.fact.4.l':           { en: 'folders that don\'t describe a feeling', zh: '描述不了一种感觉的文件夹数量' },

  'landing.workflow.eyebrow':   { en: 'The workflow',                 zh: '工作流' },
  'landing.workflow.title':     {
    en: 'Save it, understand it, search by feeling, ship a brief.',
    zh: '保存它，理解它，凭感觉检索，交付一份简报。',
  },
  'landing.step.1.title':       { en: 'Save references',              zh: '保存参考' },
  'landing.step.1.desc':        {
    en: 'Drag, paste, or import from anywhere — images, screenshots, links, PDFs, fonts, palettes.',
    zh: '拖入、粘贴或从任意位置导入——图片、截图、链接、PDF、字体与配色。',
  },
  'landing.step.2.title':       { en: 'Curator understands',          zh: '策展人理解' },
  'landing.step.2.desc':        {
    en: 'Quietly extracts colors, materials, mood, style, composition, era, and use case.',
    zh: '静静提取色彩、材质、情绪、风格、构图、年代与使用场景。',
  },
  'landing.step.3.title':       { en: 'Search by feeling',            zh: '凭感觉检索' },
  'landing.step.3.desc':        {
    en: 'Ask in plain language. Every match comes with a reason.',
    zh: '用大白话提问，每条结果都附带一段理由。',
  },
  'landing.step.4.title':       { en: 'Generate a moodboard',         zh: '生成情绪板' },
  'landing.step.4.desc':        {
    en: 'Curator selects the strongest references and arranges them into a draft you can edit.',
    zh: '策展人挑出最有力的参考，排成一版可继续编辑的草稿。',
  },
  'landing.step.5.title':       { en: 'Export a brief',               zh: '导出简报' },
  'landing.step.5.desc':        {
    en: 'Mood, color, type, image, layout, materials, avoid list, and a prompt — ready for collaborators.',
    zh: '情绪、色彩、字体、图像、版式、材质、避免清单与提示词——一份可直接交给协作者的简报。',
  },

  'landing.profile.eyebrow':    { en: 'Aesthetic Profile',            zh: '审美档案' },
  'landing.profile.title':      {
    en: 'A portrait of your taste, drawn from what you actually keep.',
    zh: '一幅你审美的肖像，由你真正留下的东西绘出。',
  },
  'landing.profile.body':       {
    en: 'Your archive becomes a quiet, evolving model of how you see. Colors you return to, materials you trust, moods you live in, and the small shifts your taste makes from month to month.',
    zh: '你的档案库逐渐成为一份安静、不断生长的"你如何看"的模型——你反复回到的色彩、你信任的材质、你常驻的情绪，以及你的审美在月与月之间细微的位移。',
  },
  'landing.profile.cta':        { en: 'Explore a sample profile',     zh: '查看一份样本档案' },

  'landing.profile_preview.color_memory':  { en: 'Color memory',       zh: '色彩记忆' },
  'landing.profile_preview.style_memory':  { en: 'Style memory',       zh: '风格记忆' },
  'landing.profile_preview.recent_shift':  { en: 'Recent shift',       zh: '近期位移' },
  'landing.profile_preview.shift_text':    {
    en: 'Your archive has shifted slightly cooler — concrete and chrome up 23%. Core warm minimal preference unchanged.',
    zh: '你的档案最近略微偏冷——混凝土与镀铬的占比上升 23%，核心的温暖极简偏好未变。',
  },

  'landing.agent.eyebrow':      { en: 'Curator, not chatbot',         zh: '策展人，不是聊天机器人' },
  'landing.agent.title':        {
    en: 'Every AI move is a task you can read, edit, and reverse.',
    zh: '每一次 AI 的动作都是一项你可以阅读、编辑与撤销的任务。',
  },
  'landing.agent.body':         {
    en: 'No floating chatbot, no surprises. Structured task cards with input scope, plan, preview, explanation, and confidence — you accept what you trust and ignore the rest.',
    zh: '没有漂浮的聊天框，也没有意外。结构化的任务卡——范围、计划、预览、解释与置信度，你只接受你信任的，其余忽略即可。',
  },
  'landing.agent.cta':          { en: 'See the queue',                zh: '查看任务队列' },

  'landing.agent.task1.title':  { en: 'Group your last 24 imports into 3 collections', zh: '把最近导入的 24 张分入 3 个收藏夹' },
  'landing.agent.task1.status': { en: 'Preview ready',                zh: '预览就绪' },
  'landing.agent.task1.meta':   { en: 'Confidence 84% · 24 assets',   zh: '置信度 84% · 24 项' },
  'landing.agent.task1.text':   {
    en: 'Brutalist & Concrete (4), Foggy Calm Landscapes (3), Coffee Hospitality (5). Other 12 will stay in Archive.',
    zh: '粗野与混凝土（4）、雾气宁静风景（3）、咖啡空间（5）。其余 12 张留在档案库。',
  },
  'landing.agent.task2.title':  { en: 'Auto-tag 12 untagged assets',  zh: '为 12 项未打标素材自动打标' },
  'landing.agent.task2.status': { en: 'Pending',                      zh: '待处理' },
  'landing.agent.task2.meta':   { en: 'Confidence 79% · 12 assets',   zh: '置信度 79% · 12 项' },
  'landing.agent.task2.text':   {
    en: 'Average 5 tags per asset. 3 will introduce new style words to your vocabulary — review before saving.',
    zh: '平均每项 5 个标签，其中 3 个会为你的词汇引入新的风格词——保存前请审阅。',
  },
  'landing.agent.task3.title':  { en: 'Split "Material Studies" into two directions', zh: '把"材质研究"拆为两个方向' },
  'landing.agent.task3.status': { en: 'Preview ready',                zh: '预览就绪' },
  'landing.agent.task3.meta':   { en: 'Confidence 76% · 1 collection',zh: '置信度 76% · 1 个收藏夹' },
  'landing.agent.task3.text':   {
    en: 'Soft Fibers (linen, wool, paper) · Hard Surfaces (stone, brass, ceramic).',
    zh: '柔软纤维（亚麻、羊毛、纸）· 坚硬表面（石头、黄铜、陶瓷）。',
  },

  'landing.principles.eyebrow': { en: 'What this isn\'t',             zh: '它不是什么' },
  'landing.principles.title':   {
    en: 'Not a file manager. Not Pinterest. Not a corporate DAM.',
    zh: '不是文件管理器，不是 Pinterest，也不是企业数字资产库。',
  },
  'landing.principle.1.title':  { en: 'Quiet over loud',              zh: '安静胜于喧哗' },
  'landing.principle.1.desc':   {
    en: 'Image-first surfaces. No purple-blue gradients, no scattered AI sparkle, no SaaS dashboard noise.',
    zh: '以图像为本的界面，没有紫蓝渐变，没有散落的 AI 火花，没有 SaaS 仪表盘的喧嚣。',
  },
  'landing.principle.2.title':  { en: 'Memory over storage',          zh: '记忆胜于存储' },
  'landing.principle.2.desc':   {
    en: 'Your archive becomes a living model of your taste. It grows with you and shifts when you do.',
    zh: '你的档案库是一份"活着的"审美模型，随你成长，随你流动。',
  },
  'landing.principle.3.title':  { en: 'You confirm everything',       zh: '一切由你确认' },
  'landing.principle.3.desc':   {
    en: 'Curator suggests. You accept, edit, or reverse. The product never reorganizes behind your back.',
    zh: '策展人只是建议，你来接受、编辑或撤销。这个产品永远不会在你背后悄悄整理。',
  },

  'landing.final.eyebrow':      { en: 'Begin',                        zh: '开始' },
  'landing.final.title_part1':  { en: 'Open the',                     zh: '进入' },
  'landing.final.title_em':     { en: 'studio',                       zh: '工作室' },
  'landing.final.title_part2':  { en: '.',                            zh: '。' },
  'landing.final.body':         {
    en: 'Try the full prototype with a curated archive of 28 references, a generated profile, suggested collections, and a moodboard waiting to be shaped.',
    zh: '完整原型已就绪——28 张精选参考、一份生成好的审美档案、几个建议的收藏夹，与一块等待被塑形的情绪板。',
  },
  'landing.final.cta_open':     { en: 'Open Aesthetic Archive',       zh: '进入「审美档案」' },
  'landing.final.cta_profile':  { en: 'View profile',                 zh: '查看档案' },
  'landing.footer.meta':        { en: 'A prototype · 2026',           zh: '原型 · 2026' },

  // ───────────────────────── archive ─────────────────────────
  'archive.eyebrow':            { en: 'The Archive',                  zh: '档案库' },
  'archive.title_part1':        { en: 'Everything you have',          zh: '你曾经' },
  'archive.title_em':           { en: 'noticed',                      zh: '留意' },
  'archive.title_part2':        { en: '.',                            zh: '过的一切。' },
  'archive.body':               {
    en: 'Your private studio of references. Quiet, searchable, and quietly understood by your curator.',
    zh: '你的私人参考工作室。安静、可检索，并被你的策展人静静理解。',
  },
  'archive.empty_title':        { en: 'No assets yet',                zh: '还没有素材' },
  'archive.empty_desc':         {
    en: 'Drop images here or import a folder to start building your aesthetic archive.',
    zh: '把图片拖到这里，或导入一个文件夹，开始搭建你的审美档案。',
  },
  'archive.empty_action':       { en: 'Import your first asset',      zh: '导入第一项素材' },

  // ── filters
  'filters.refine':             { en: 'Refine',                       zh: '筛选' },
  'filters.reset':              { en: 'Reset',                        zh: '重置' },
  'filters.color_temperature':  { en: 'Color temperature',            zh: '色温' },
  'filters.temp.warm':          { en: 'warm',                         zh: '暖' },
  'filters.temp.cool':          { en: 'cool',                         zh: '冷' },
  'filters.temp.neutral':       { en: 'neutral',                      zh: '中性' },
  'filters.palette':            { en: 'Palette',                      zh: '色板' },
  'filters.style':              { en: 'Style',                        zh: '风格' },
  'filters.mood':               { en: 'Mood',                         zh: '情绪' },
  'filters.material':           { en: 'Material',                     zh: '材质' },
  'filters.subject':            { en: 'Subject',                      zh: '主题' },
  'filters.rating':             { en: 'Rating',                       zh: '评分' },
  'filters.favorites_only':     { en: 'Favorites only',               zh: '仅收藏' },
  'filters.profile_lens_card':  {
    en: 'Use your aesthetic profile as a lens — favor results that already match your taste signature.',
    zh: '把你的审美档案当作一枚镜片——优先匹配与你已有审美一致的结果。',
  },
  'filters.apply_profile_lens': { en: 'Apply profile lens →',         zh: '套用审美镜片 →' },

  // ── toolbar
  'toolbar.filters':            { en: 'Filters',                      zh: '筛选' },
  'toolbar.assets':             { en: 'assets',                       zh: '项' },
  'toolbar.asset':              { en: 'asset',                        zh: '项' },
  'toolbar.active':             { en: 'active',                       zh: '已启用' },
  'toolbar.favorites':          { en: 'Favorites',                    zh: '收藏' },
  'toolbar.sort.recent':        { en: 'Recently saved',               zh: '最近保存' },
  'toolbar.sort.oldest':        { en: 'Earliest',                     zh: '最早' },
  'toolbar.sort.name':          { en: 'Title',                        zh: '标题' },
  'toolbar.sort.rating':        { en: 'Rating',                       zh: '评分' },
  'toolbar.layout.masonry':     { en: 'Masonry',                      zh: '砖砌' },
  'toolbar.layout.bento':       { en: 'Bento',                        zh: '便当格' },
  'toolbar.layout.grid':        { en: 'Grid',                         zh: '网格' },

  // ───────────────────────── collections ─────────────────────────
  'collections.eyebrow':        { en: 'Collections',                  zh: '收藏夹' },
  'collections.title_part1':    { en: 'Your archive,',                zh: '你的档案库，' },
  'collections.title_em':       { en: 'shelved',                      zh: '上架' },
  'collections.title_part2':    { en: '.',                            zh: '。' },
  'collections.body':           {
    en: 'Hand-built shelves and quietly suggested ones. Rename, merge, split, share, or turn any shelf into a moodboard.',
    zh: '亲手搭的书架，和被悄悄建议出的书架。重命名、合并、拆分、分享，或把任意一格变成情绪板。',
  },
  'collections.new':            { en: 'New collection',               zh: '新建收藏夹' },
  'collections.suggested':      { en: 'Suggested by your curator',    zh: '策展人为你建议' },
  'collections.manage':         { en: 'Manage suggestions',           zh: '管理建议' },
  'collections.your_shelves':   { en: 'Your shelves',                 zh: '你的书架' },
  'collections.shelf':          { en: 'shelf',                        zh: '个书架' },
  'collections.shelves':        { en: 'shelves',                      zh: '个书架' },
  'collections.no_cover':       { en: 'No cover yet',                 zh: '尚无封面' },
  'collections.suggested_badge':{ en: 'Suggested',                    zh: '建议' },

  // ── collection detail
  'cdetail.back':               { en: 'Collections',                  zh: '收藏夹' },
  'cdetail.not_found_back':     { en: '← Back to collections',        zh: '← 返回收藏夹' },
  'cdetail.not_found':          { en: 'Collection not found.',        zh: '未找到该收藏夹。' },
  'cdetail.ai_badge':           { en: 'Curator suggested · 0.87 confidence', zh: '策展人建议 · 置信度 0.87' },
  'cdetail.eyebrow':            { en: 'Collection · Shelf',           zh: '收藏夹 · 书架' },
  'cdetail.generate_moodboard': { en: 'Generate moodboard',           zh: '生成情绪板' },
  'cdetail.create_brief':       { en: 'Create brief',                 zh: '生成简报' },
  'cdetail.rename':             { en: 'Rename',                       zh: '重命名' },
  'cdetail.split':              { en: 'Split',                        zh: '拆分' },
  'cdetail.share':              { en: 'Share',                        zh: '分享' },
  'cdetail.export':             { en: 'Export',                       zh: '导出' },
  'cdetail.why_belong':         { en: 'Why these belong together',    zh: '为何它们应该在一起' },
  'cdetail.accept_shelf':       { en: 'Accept shelf',                 zh: '接受此书架' },
  'cdetail.edit_name':          { en: 'Edit name',                    zh: '编辑名称' },
  'cdetail.ignore':             { en: 'Ignore',                       zh: '忽略' },
  'cdetail.palette':            { en: 'Palette',                      zh: '色板' },
  'cdetail.visual_language':    { en: 'Visual language',              zh: '视觉语言' },
  'cdetail.assets_in_shelf':    { en: 'Assets in this shelf',         zh: '此书架内的素材' },
  'cdetail.add_from_archive':   { en: 'Add from archive',             zh: '从档案库添加' },
  'cdetail.assets':             { en: '{n} assets',                   zh: '{n} 项' },

  // ───────────────────────── search ─────────────────────────
  'search.eyebrow':             { en: 'Semantic Search',              zh: '语义检索' },
  'search.title_part1':         { en: 'Ask your archive like a',      zh: '像一位' },
  'search.title_em':            { en: 'visual researcher',            zh: '视觉研究者' },
  'search.title_part2':         { en: '.',                            zh: '一样向档案库提问。' },
  'search.body':                {
    en: 'Describe a feeling, a material, a color story, or a use case. Your curator searches the archive — and tells you exactly why each result matched.',
    zh: '描述一种感觉、一种材质、一段色彩故事或一个使用场景。你的策展人会检索档案库，并精确告诉你每条结果为何匹配。',
  },
  'search.placeholder':         { en: '"quiet beige wooden interiors"', zh: '"安静的米色木质室内"' },
  'search.profile_lens':        { en: 'Profile lens',                 zh: '档案镜片' },
  'search.btn':                 { en: 'Search',                       zh: '搜索' },
  'search.try':                 { en: 'Try',                          zh: '试试' },
  'search.example.1':           { en: 'quiet beige wooden interiors', zh: '安静的米色木质室内' },
  'search.example.2':           { en: '90s editorial with cold metal details', zh: '带冷调金属细节的 90 年代杂志感' },
  'search.example.3':           { en: 'low saturation product photography with lots of whitespace', zh: '低饱和、大量留白的产品摄影' },
  'search.example.4':           { en: 'references for a calm premium coffee website hero', zh: '一份宁静高端的咖啡网站首屏参考' },
  'search.example.5':           { en: 'soft brutalism with warm light', zh: '带温暖光线的柔粗野主义' },
  'search.curator_response':    { en: 'Curator response',             zh: '策展人回应' },
  'search.matched_moods':       { en: 'Matched moods',                zh: '匹配的情绪' },
  'search.matched_tags':        { en: 'Matched tags',                 zh: '匹配的标签' },
  'search.matched_colors':      { en: 'Matched colors',               zh: '匹配的色彩' },
  'search.refine':              { en: 'Refine',                       zh: '细化' },
  'search.results':             { en: 'Results',                      zh: '结果' },
  'search.matches_n':           { en: '{n} matches',                  zh: '{n} 条匹配' },
  'search.filtered_by_profile': { en: 'Filtered by your taste profile', zh: '已按你的审美档案过滤' },
  'search.save_n':              { en: 'Save {n} to collection',       zh: '将 {n} 项保存到收藏夹' },
  'search.no_matches':          { en: 'No matches yet — try a broader feeling.', zh: '尚无匹配——试着用更宽泛的感觉描述。' },

  // ───────────────────────── profile ─────────────────────────
  'profile.eyebrow':            { en: 'Aesthetic Profile · Auto-generated', zh: '审美档案 · 自动生成' },
  'profile.title_part1':        { en: 'A portrait of your',           zh: '一幅你' },
  'profile.title_em':           { en: 'taste',                        zh: '审美' },
  'profile.title_part2':        { en: ', drawn from {n} saved references.', zh: '的肖像，由 {n} 张已保存的参考绘出。' },
  'profile.refresh':            { en: 'Refresh profile',              zh: '刷新档案' },
  'profile.apply_lens':         { en: 'Apply as search lens',         zh: '作为搜索镜片应用' },
  'profile.export':             { en: 'Export',                       zh: '导出' },
  'profile.updated':            { en: 'Updated',                      zh: '更新于' },
  'profile.stat.assets':        { en: 'Assets',                       zh: '素材' },
  'profile.stat.colors':        { en: 'Colors',                       zh: '色彩' },
  'profile.stat.style_words':   { en: 'Style words',                  zh: '风格词' },
  'profile.stat.pinned':        { en: 'Pinned',                       zh: '已钉选' },

  'profile.color_eyebrow':      { en: 'Color memory',                 zh: '色彩记忆' },
  'profile.color_title':        { en: 'The colors you keep coming back to', zh: '你不断回到的那些颜色' },
  'profile.style_eyebrow':      { en: 'Style memory',                 zh: '风格记忆' },
  'profile.style_title':        { en: 'Style',                        zh: '风格' },
  'profile.mood_eyebrow':       { en: 'Emotional register',           zh: '情绪光谱' },
  'profile.mood_title':         { en: 'Mood',                         zh: '情绪' },
  'profile.material_eyebrow':   { en: 'Material preference',          zh: '材质偏好' },
  'profile.material_title':     { en: 'Material',                     zh: '材质' },
  'profile.composition_eyebrow':{ en: 'Composition preference',       zh: '构图偏好' },
  'profile.composition_title':  { en: 'How you frame things',         zh: '你如何取景' },
  'profile.subject_eyebrow':    { en: 'Subject',                      zh: '主题' },
  'profile.subject_title':      { en: 'What you collect most often',  zh: '你最常收集的主题' },
  'profile.clusters_eyebrow':   { en: 'Visual clusters',              zh: '视觉聚类' },
  'profile.clusters_title':     { en: 'What your archive looks like, grouped', zh: '你的档案库聚成的样子' },
  'profile.cluster.1.title':    { en: 'Warm minimal interiors',       zh: '温暖极简室内' },
  'profile.cluster.1.desc':     { en: 'Your most-saved register: oak, linen, plaster, natural daylight.', zh: '你保存最多的语言：橡木、亚麻、石膏、自然日光。' },
  'profile.cluster.2.title':    { en: 'Editorial layouts',            zh: '编辑级版式' },
  'profile.cluster.2.desc':     { en: 'Serif headlines, asymmetric grids, generous whitespace.', zh: '衬线标题、非对称网格、大方的留白。' },
  'profile.cluster.3.title':    { en: 'Material study macros',        zh: '材质微距研究' },
  'profile.cluster.3.desc':     { en: 'Close, tactile, low-contrast material focus.', zh: '近距、可触、低对比的材质特写。' },

  'profile.trends_eyebrow':     { en: 'Recent shifts · 30 days',      zh: '近期位移 · 30 天' },
  'profile.keyword_hint':       { en: 'Click any keyword to search · pin or hide from the asset detail.', zh: '点击任意关键词以检索 · 在素材详情中可钉选或隐藏。' },

  // ───────────────────────── projects ─────────────────────────
  'projects.eyebrow':           { en: 'Projects',                     zh: '项目' },
  'projects.title_part1':       { en: 'From collection to',           zh: '从收藏到' },
  'projects.title_em':          { en: 'direction',                    zh: '方向' },
  'projects.title_part2':       { en: '.',                            zh: '。' },
  'projects.body':              {
    en: 'Each project gathers references, a moodboard, and a creative brief. Tell your curator what you are working on — they will shape what your archive becomes.',
    zh: '每个项目集合了参考、一块情绪板与一份创意简报。把你正在做的告诉策展人——你的档案库会随之被塑形。',
  },
  'projects.from_feeling':      { en: 'From a feeling',               zh: '从一种感觉出发' },
  'projects.new':               { en: 'New project',                  zh: '新建项目' },
  'projects.refs':              { en: '{n} refs',                     zh: '{n} 张参考' },
  'projects.brief_ready':       { en: 'brief ready',                  zh: '简报就绪' },
  'projects.moodboard':         { en: 'moodboard',                    zh: '情绪板' },

  // ───────────────────────── moodboard workspace ─────────────────────────
  'mb.back':                    { en: 'Projects',                     zh: '项目' },
  'mb.not_found_back':          { en: '← Back to projects',           zh: '← 返回项目' },
  'mb.not_found':               { en: 'Project not found.',           zh: '未找到该项目。' },
  'mb.refs':                    { en: '{n} refs',                     zh: '{n} 张参考' },
  'mb.ask_curator':             { en: 'Ask curator',                  zh: '询问策展人' },
  'mb.share':                   { en: 'Share',                        zh: '分享' },
  'mb.export':                  { en: 'Export',                       zh: '导出' },
  'mb.curator_suggestion':      { en: 'Curator suggestion',           zh: '策展人建议' },
  'mb.curator_suggestion_text': {
    en: 'Two assets read slightly cooler than the rest — consider removing them, or splitting the board into a quiet warm direction and a cooler material study direction.',
    zh: '其中两张比其余更偏冷——可考虑移除，或把整块板拆成"安静温暖的方向"与"偏冷的材质研究方向"两块。',
  },
  'mb.preview_split':           { en: 'Preview split',                zh: '预览拆分' },
  'mb.dismiss':                 { en: 'Dismiss',                      zh: '忽略' },
  'mb.creative_brief':          { en: 'Creative Brief',               zh: '创意简报' },
  'mb.draft':                   { en: 'draft',                        zh: '草稿' },
  'mb.copy':                    { en: 'Copy',                         zh: '复制' },
  'mb.project':                 { en: 'Project',                      zh: '项目' },
  'mb.visual_keywords':         { en: 'Visual keywords',              zh: '视觉关键词' },
  'mb.color_direction':         { en: 'Color direction',              zh: '色彩方向' },
  'mb.typography_direction':    { en: 'Typography direction',         zh: '字体方向' },
  'mb.image_style':             { en: 'Image style',                  zh: '图像风格' },
  'mb.layout_direction':        { en: 'Layout direction',             zh: '版式方向' },
  'mb.materials':               { en: 'Materials',                    zh: '材质' },
  'mb.composition':             { en: 'Composition',                  zh: '构图' },
  'mb.avoid':                   { en: 'Avoid',                        zh: '避免' },
  'mb.ai_prompt':               { en: 'AI prompt',                    zh: 'AI 提示词' },
  'mb.notes':                   { en: 'Notes for collaborators',      zh: '给协作者的说明' },
  'mb.export_pdf':              { en: 'Export PDF',                   zh: '导出 PDF' },
  'mb.markdown':                { en: 'Markdown',                     zh: 'Markdown' },
  'mb.image':                   { en: 'Image',                        zh: '图像' },
  'mb.empty':                   { en: 'Generate a brief from your moodboard.', zh: '基于你的情绪板生成一份简报。' },
  'mb.generate_brief':          { en: 'Generate brief',               zh: '生成简报' },
  'mb.lock':                    { en: 'Lock',                         zh: '锁定' },
  'mb.unlock':                  { en: 'Unlock',                       zh: '解锁' },

  // ───────────────────────── agent ─────────────────────────
  'agent.eyebrow':              { en: 'Curator queue',                zh: '策展人任务队列' },
  'agent.title_part1':          { en: 'Tasks your curator is ready to', zh: '你的策展人正准备' },
  'agent.title_em':             { en: 'run',                          zh: '执行' },
  'agent.title_part2':          { en: '.',                            zh: '的任务。' },
  'agent.body':                 {
    en: 'Every task has a plan, a preview, an explanation, and a confidence score. You decide what runs. Nothing is applied without your accept.',
    zh: '每项任务都有计划、预览、解释与置信度。是否执行由你决定，未经你同意，什么也不会被应用。',
  },
  'agent.quick':                { en: 'Quick launches',               zh: '快捷启动' },
  'agent.launcher.auto_tag':    { en: 'Auto-tag new imports',         zh: '为新导入自动打标' },
  'agent.launcher.auto_tag_desc': { en: '{n} untagged',               zh: '{n} 项未打标' },
  'agent.launcher.suggest':     { en: 'Suggest collections',          zh: '建议收藏夹' },
  'agent.launcher.suggest_desc':{ en: '{n} candidates',               zh: '{n} 个候选' },
  'agent.launcher.duplicates':  { en: 'Find duplicates',              zh: '查找重复' },
  'agent.launcher.duplicates_desc': { en: '~{n} likely pairs',        zh: '约 {n} 对可能重复' },
  'agent.launcher.none_desc':   { en: 'No active items',              zh: '暂无待办' },
  'agent.launcher.refresh':     { en: 'Refresh profile',              zh: '刷新审美档案' },
  'agent.launcher.refresh_desc':{ en: '22d since last',               zh: '距上次 22 天' },
  'agent.in_queue':             { en: 'In queue',                     zh: '队列中' },
  'agent.recent':               { en: 'Recent activity',              zh: '近期动态' },
  'agent.status.pending':       { en: 'Pending',                      zh: '待处理' },
  'agent.status.previewing':    { en: 'Preview ready',                zh: '预览就绪' },
  'agent.status.accepted':      { en: 'Accepted',                     zh: '已接受' },
  'agent.status.ignored':       { en: 'Ignored',                      zh: '已忽略' },
  'agent.status.running':       { en: 'Running',                      zh: '执行中' },
  'agent.confidence':           { en: 'Confidence {n}%',              zh: '置信度 {n}%' },
  'agent.confidence_label':     { en: 'Confidence',                   zh: '置信度' },
  'agent.plan':                 { en: 'Plan',                         zh: '计划' },
  'agent.why':                  { en: 'Why this is being suggested',  zh: '为何建议此项' },
  'agent.accept_run':           { en: 'Accept and run',               zh: '接受并执行' },
  'agent.edit_plan':            { en: 'Edit plan',                    zh: '编辑计划' },
  'agent.ignore':               { en: 'Ignore',                       zh: '忽略' },
  'agent.bulk_hint':            {
    en: 'Bulk changes always preview before/after. Your corrections improve future suggestions.',
    zh: '批量改动总会先预览前后对比。你的修正会让未来的建议更准。',
  },
  'agent.undo':                 { en: 'Undo',                         zh: '撤销' },

  // ───────────────────────── settings ─────────────────────────
  'settings.eyebrow':           { en: 'Settings',                     zh: '设置' },
  'settings.title':             { en: 'A quiet place for the dials.', zh: '一个安放各种旋钮的安静角落。' },

  'settings.section.curator.title': { en: 'Curator',                  zh: '策展人' },
  'settings.section.curator.desc':  {
    en: 'Choose how much of your archive your curator can read, and which suggestions appear automatically.',
    zh: '决定策展人能读取你档案库的多少部分，以及哪些建议会自动出现。',
  },
  'settings.section.storage.title': { en: 'Storage',                  zh: '存储' },
  'settings.section.storage.desc':  {
    en: 'Prototype uses in-memory storage. IndexedDB persistence ships in Phase 2.',
    zh: '原型使用内存存储。IndexedDB 持久化将在第二阶段上线。',
  },
  'settings.section.privacy.title': { en: 'Privacy',                  zh: '隐私' },
  'settings.section.privacy.desc':  {
    en: 'Your archive is private. No analytics, no model training on your assets.',
    zh: '你的档案库是私有的。没有分析追踪，不会用你的素材训练模型。',
  },
  'settings.section.theme.title':   { en: 'Theme',                    zh: '主题' },
  'settings.section.theme.desc':    {
    en: 'Warm minimal light and a quiet, editorial dark — pick the register you read in.',
    zh: '温暖极简的浅色，与一份安静、编辑级的深色——选一个你阅读时最舒服的。',
  },
  'settings.section.language.title':{ en: 'Language',                 zh: '语言' },
  'settings.section.language.desc': {
    en: 'Switch the entire interface between English and Simplified Chinese.',
    zh: '在中英文之间切换整个界面。',
  },

  'settings.keyboard':          { en: 'Keyboard',                     zh: '快捷键' },
  'settings.sc.open_command':   { en: 'Open command menu',            zh: '打开命令面板' },
  'settings.sc.import':         { en: 'Import assets',                zh: '导入素材' },
  'settings.sc.focus_search':   { en: 'Focus search',                 zh: '聚焦搜索框' },
  'settings.sc.close':          { en: 'Close dialog / clear selection', zh: '关闭对话框 / 清除选择' },
  'settings.sc.range_select':   { en: 'Range select',                 zh: '范围选择' },
  'settings.sc.toggle_select':  { en: 'Toggle selection',             zh: '切换选择' },
  'settings.sc.favorite':       { en: 'Favorite selection',           zh: '收藏所选' },
  'settings.sc.rate':           { en: 'Rate selection',               zh: '为所选评分' },
  'settings.sc.prev_next':      { en: 'Previous / next asset in detail', zh: '详情面板内上一项 / 下一项' },

  // ───────────────────────── asset detail drawer ─────────────────────────
  'ad.previous':                { en: 'Previous asset',               zh: '上一项' },
  'ad.next':                    { en: 'Next asset',                   zh: '下一项' },
  'ad.find_similar':            { en: 'Find similar',                 zh: '查找相似' },
  'ad.add_to_collection':       { en: 'Add to collection',            zh: '添加到收藏夹' },
  'ad.close':                   { en: 'Close',                        zh: '关闭' },
  'ad.favorite':                { en: 'Favorite',                     zh: '收藏' },
  'ad.unfavorite':              { en: 'Unfavorite',                   zh: '取消收藏' },
  'ad.curator_notes':           { en: 'Curator notes · auto-generated', zh: '策展人备注 · 自动生成' },
  'ad.dominant_palette':        { en: 'Dominant palette',             zh: '主导色板' },
  'ad.colors_n':                { en: '{n} colors',                   zh: '{n} 种颜色' },
  'ad.tags':                    { en: 'Tags',                         zh: '标签' },
  'ad.tags_hint':               { en: '{a} yours · {b} suggested',    zh: '{a} 个你的 · {b} 个建议' },
  'ad.add_tag':                 { en: 'add tag…',                     zh: '添加标签…' },
  'ad.suggested':               { en: 'Suggested by curator',         zh: '策展人建议' },
  'ad.confidence_hint':         {
    en: 'Curator confidence 0.82 · derived from material, color and composition signals.',
    zh: '策展人置信度 0.82 · 基于材质、色彩与构图信号推导。',
  },
  'ad.add':                     { en: 'add',                          zh: '加入' },
  'ad.rating':                  { en: 'Rating',                       zh: '评分' },
  'ad.rate_n':                  { en: 'Rate {n}',                     zh: '打 {n} 分' },
  'ad.notes':                   { en: 'Notes',                        zh: '笔记' },
  'ad.notes_placeholder':       {
    en: 'Why does this image speak to you? When did you save it? What would you reuse it for?',
    zh: '这张图为什么打动你？你是何时保存它的？你会把它用在哪里？',
  },
  'ad.in_collections':          { en: 'In collections',               zh: '所在收藏夹' },
  'ad.similar':                 { en: 'Similar in your archive',      zh: '档案库中相似的' },
  'ad.generate_prompt':         { en: 'Generate prompt',              zh: '生成提示词' },
  'ad.add_to_brief':            { en: 'Add to brief',                 zh: '加入简报' },
  'ad.delete':                  { en: 'Delete from archive',          zh: '从档案库删除' },
  'ad.type.image':              { en: 'image',                        zh: '图像' },
  'ad.type.video':              { en: 'video',                        zh: '视频' },
  'ad.type.pdf':                { en: 'pdf',                          zh: 'PDF' },
  'ad.type.link':               { en: 'link',                         zh: '链接' },
  'ad.type.font':               { en: 'font',                         zh: '字体' },
  'ad.type.palette':            { en: 'palette',                      zh: '色板' },
  'ad.percent_hint':            { en: '{hex} · {p}%',                 zh: '{hex} · {p}%' },

  // ───────────────────────── upload dialog ─────────────────────────
  'upload.title':               { en: 'Import to your archive',       zh: '导入到你的档案库' },
  'upload.desc':                {
    en: 'Drop images, paste from the clipboard, or paste a link. Curator will auto-extract tags, colors and visual notes.',
    zh: '拖入图片、粘贴剪贴板内容，或粘贴一个链接。策展人会自动提取标签、色彩与视觉笔记。',
  },
  'upload.drop':                { en: 'Drop images here',             zh: '将图片拖到此处' },
  'upload.or_paste':            { en: 'Or paste from clipboard. Webpages, PDFs, fonts, and videos coming soon.', zh: '或从剪贴板粘贴。网页、PDF、字体与视频即将支持。' },
  'upload.choose':              { en: 'Choose files',                 zh: '选择文件' },
  'upload.paste_url':           { en: 'Paste URL',                    zh: '粘贴链接' },
  'upload.queued':              { en: 'Queued · {n}',                 zh: '待导入 · {n}' },
  'upload.clear':               { en: 'Clear',                        zh: '清除' },
  'upload.on_import':           {
    en: 'On import, your curator will quietly extract colors, materials, mood and composition. Suggested tags appear in the asset detail and stay editable until you confirm.',
    zh: '导入时，策展人会静静提取色彩、材质、情绪与构图。建议的标签会出现在素材详情里，确认前你随时可以编辑。',
  },
  'upload.cancel':              { en: 'Cancel',                       zh: '取消' },
  'upload.import_n':            { en: 'Import {n} to Archive',        zh: '导入 {n} 项到档案库' },
  'upload.import':              { en: 'Import to Archive',            zh: '导入到档案库' },

  // ───────────────────────── collection picker ─────────────────────────
  'cp.title':                   { en: 'Add to collection',            zh: '添加到收藏夹' },
  'cp.desc_one':                { en: '1 asset · pick one or more collections, or start a new shelf.', zh: '1 项 · 选择一个或多个收藏夹，或开始一格新书架。' },
  'cp.desc_many':               { en: '{n} assets · pick one or more collections, or start a new shelf.', zh: '{n} 项 · 选择一个或多个收藏夹，或开始一格新书架。' },
  'cp.find':                    { en: 'Find a collection…',           zh: '查找收藏夹…' },
  'cp.start_new':               { en: 'Or start a new collection…',   zh: '或新建一个收藏夹…' },
  'cp.assets_n':                { en: '{n} assets',                   zh: '{n} 项' },
  'cp.cancel':                  { en: 'Cancel',                       zh: '取消' },
  'cp.add':                     { en: 'Add',                          zh: '添加' },

  // ───────────────────────── bulk action bar ─────────────────────────
  'bulk.selected':              { en: 'selected',                     zh: '已选' },
  'bulk.add_to_collection':     { en: 'Add to collection',            zh: '添加到收藏夹' },
  'bulk.favorite':              { en: 'Favorite',                     zh: '收藏' },
  'bulk.tag':                   { en: 'Tag',                          zh: '打标签' },
  'bulk.find_similar':          { en: 'Find similar',                 zh: '查找相似' },
  'bulk.generate_moodboard':    { en: 'Generate moodboard',           zh: '生成情绪板' },
  'bulk.create_brief':          { en: 'Create brief',                 zh: '生成简报' },
  'bulk.delete':                { en: 'Delete',                       zh: '删除' },
  'bulk.clear':                 { en: 'Clear selection',              zh: '清除选择' },

  // ───────────────────────── command menu ─────────────────────────
  'cmd.placeholder':            { en: 'What do you want to find or do?', zh: '你想找点什么或做点什么？' },
  'cmd.nothing':                { en: 'Nothing matches. Try a feeling, a material, or a project name.', zh: '没有匹配。试试一种感觉、一种材质，或一个项目名。' },
  'cmd.suggestions':            { en: 'Suggestions',                  zh: '建议' },
  'cmd.actions':                { en: 'Actions',                      zh: '操作' },
  'cmd.pages':                  { en: 'Pages',                        zh: '页面' },
  'cmd.semantic':               { en: 'semantic search',              zh: '语义检索' },
  'cmd.import':                 { en: 'Import assets',                zh: '导入素材' },
  'cmd.reset_filters':          { en: 'Reset filters',                zh: '重置筛选' },
  'cmd.open_profile':           { en: 'Open Aesthetic Profile',       zh: '打开审美档案' },
  'cmd.run_agent':              { en: 'Run agent tasks',              zh: '运行策展任务' },
  'cmd.toggle_theme':           { en: 'Toggle dark mode',             zh: '切换深色模式' },
  'cmd.toggle_lang':            { en: 'Switch language',              zh: '切换语言' },

  // ───────────────────────── switcher pill ─────────────────────────
  'switch.theme.aria':          { en: 'Toggle theme',                 zh: '切换主题' },
  'switch.lang.aria':           { en: 'Switch language',              zh: '切换语言' },

  // ───────────────────────── mock / toast ─────────────────────────
  'mock.curator_thinking_desc': { en: 'In a real build, the curator would do this on a backend.', zh: '在真实版本中，策展人会在后端完成这项工作。' },
  'mock.exported':              { en: 'export drafted',               zh: '导出已生成' },
  'mock.exported_desc':         { en: 'Prototype — no file was actually written.', zh: '原型 — 实际上未写入任何文件。' },
  'mock.shared':                { en: 'share link copied',            zh: '分享链接已复制' },
  'mock.shared_desc':           { en: 'Prototype — the link is local-only.', zh: '原型 — 链接仅在本地有效。' },
  'mock.copied':                { en: 'Copied to clipboard',          zh: '已复制到剪贴板' },
  'mock.copy_failed':           { en: 'Clipboard unavailable',        zh: '剪贴板不可用' },
  'mock.not_yet':               { en: 'Not wired in this prototype — would call the agent or backend.', zh: '本原型尚未接入 — 真实版本会调用策展人或后端。' },

  // Specific mocked interactions, used by call sites for richer copy.
  'mock.find_similar.title':    { en: 'Showing visually similar',     zh: '已展示视觉上相似的项' },
  'mock.find_similar.desc':     { en: 'Curator surfaced matches by palette + tags + composition.', zh: '策展人基于色板、标签与构图归出相近项。' },
  'mock.color_filter.title':    { en: 'Filtered by {hex}',            zh: '已按 {hex} 筛选' },
  'mock.color_filter.desc':     { en: 'Archive view shows only assets carrying this tone.', zh: '档案库视图仅保留带有该色调的项。' },
  'mock.generate_prompt.title': { en: 'Image prompt copied',          zh: '已复制图像 prompt' },
  'mock.generate_prompt.desc':  { en: 'Drafted from palette, tags and curator notes.', zh: '基于色板、标签与策展笔记拟写。' },
  'mock.add_to_brief.title':    { en: 'Added to creative brief',      zh: '已加入创意简报' },
  'mock.add_to_brief.desc':     { en: 'Pinned as a reference; visible from any active project.', zh: '已作为参考钉住，在任一活跃项目中均可见。' },
  'mock.bulk_tag.title':        { en: 'Tagged {n} assets',            zh: '已为 {n} 项打上标签' },
  'mock.bulk_tag.desc':         { en: 'Curator inferred shared materials and mood.', zh: '策展人推断出共同的材质与情绪。' },
  'mock.generate_moodboard.title': { en: 'Generating moodboard…',     zh: '正在生成情绪板…' },
  'mock.generate_moodboard.desc':  { en: '{n} references arranged into a sortable canvas.', zh: '将 {n} 项参考铺排为可拖动的画布。' },
  'mock.create_brief.title':    { en: 'Drafting brief…',              zh: '正在拟写简报…' },
  'mock.create_brief.desc':     { en: 'Mood, color, type, image, layout — assembled in seconds.', zh: '情绪、色彩、字体、图像、版式 — 数秒内成稿。' },
  'mock.rename.title':          { en: 'Renamed',                      zh: '已重命名' },
  'mock.delete_asset.title':    { en: 'Removed from archive',         zh: '已从档案库移除' },
  'mock.delete_asset.desc':     { en: 'In a real build this would be a soft delete you can restore.', zh: '在真实版本中，这会是可恢复的软删除。' },
  'mock.split_collection.title':{ en: 'Reviewing split proposal',     zh: '正在审阅拆分提案' },
  'mock.split_collection.desc': { en: 'See the new task in your Agent queue.', zh: '可在策展任务队列中查看新任务。' },
  'mock.collection_export.title': { en: 'Shelf export prepared',      zh: '收藏夹导出已生成' },
  'mock.collection_export.desc':  { en: '12 references · palette · tags · brief stub.', zh: '12 项参考 · 色板 · 标签 · 简报草稿。' },
  'mock.suggestion_ignored.title': { en: 'Suggestion dismissed',      zh: '建议已忽略' },
  'mock.suggestion_ignored.desc':  { en: 'Curator will avoid this cluster for a while.', zh: '策展人会暂时避开这一聚类。' },
  'mock.add_from_archive.title': { en: 'Pick assets from Archive',    zh: '从档案库挑选素材' },
  'mock.add_from_archive.desc':  { en: 'Open Archive, multi-select, then "Add to collection".', zh: '打开档案库，多选后选择「添加到收藏夹」。' },
  'mock.profile_refresh.title': { en: 'Refreshing your profile',      zh: '正在更新你的审美档案' },
  'mock.profile_refresh.desc':  { en: 'Curator scans assets since the last update.', zh: '策展人扫描自上次更新以来的素材。' },
  'mock.profile_export.title':  { en: 'Profile exported',             zh: '审美档案已导出' },
  'mock.profile_export.desc':   { en: 'Markdown + JSON — taste portrait in a single file.', zh: 'Markdown + JSON — 品味画像合一。' },
  'mock.profile_lens.title':    { en: 'Profile lens engaged',         zh: '已戴上品味滤镜' },
  'mock.profile_lens.desc':     { en: 'Search and archive lean toward what you already love.', zh: '搜索与档案库的结果将偏向你已经偏爱的方向。' },
  'mock.cluster_open.title':    { en: 'Opening cluster',              zh: '打开聚类' },
  'mock.cluster_open.desc':     { en: 'Search filtered to "{label}".', zh: '搜索已收敛到「{label}」。' },
  'mock.created_project.title': { en: 'Project created',              zh: '项目已创建' },
  'mock.created_project.desc':  { en: 'Empty moodboard ready — pull references from the Archive.', zh: '空白情绪板已就绪 — 可从档案库添加参考。' },
  'mock.from_feeling.title':    { en: 'Describe the feeling',         zh: '描述你的感觉' },
  'mock.from_feeling.desc':     { en: 'Curator will propose a project shape and seed references.', zh: '策展人会据此提出项目雏形并预选参考。' },
  'mock.ask_curator.title':     { en: 'Opening curator',              zh: '打开策展人' },
  'mock.ask_curator.desc':      { en: 'Hop to the agent panel for richer task control.', zh: '前往策展任务面板获得更精细的控制。' },
  'mock.curator_split.title':   { en: 'Previewing split layout',      zh: '正在预览拆分布局' },
  'mock.curator_dismiss.title': { en: 'Suggestion tucked away',       zh: '建议已收起' },
  'mock.add_moodboard_cell.title': { en: 'Pick references',           zh: '挑选参考素材' },
  'mock.add_moodboard_cell.desc':  { en: 'Archive picker — multi-select to drop into this board.', zh: '档案库选择器 — 多选后落入当前板。' },
  'mock.remove_moodboard_cell.title': { en: 'Removed from board',     zh: '已从情绪板移除' },
  'mock.export_brief.pdf.title': { en: 'PDF export prepared',         zh: 'PDF 导出已生成' },
  'mock.export_brief.md.title':  { en: 'Markdown copied',             zh: 'Markdown 已复制' },
  'mock.export_brief.img.title': { en: 'Board image prepared',        zh: '情绪板图片已生成' },
  'mock.generate_brief.title':  { en: 'Generating brief…',            zh: '正在生成简报…' },
  'mock.generate_brief.desc':   { en: 'Curator threads palette, mood and references into a single page.', zh: '策展人将色彩、情绪与参考凝结成一页。' },
  'mock.agent_launcher.queued.title': { en: 'Queued for review',      zh: '已加入待审队列' },
  'mock.agent_launcher.queued.desc':  { en: 'Task is ready in your queue — review the plan before accepting.', zh: '任务已在队列中 — 请在接受前查看计划。' },
  'mock.agent_undo.title':      { en: 'Reverted',                     zh: '已撤销' },
  'mock.agent_edit_plan.title': { en: 'Plan editor',                  zh: '计划编辑器' },
  'mock.agent_edit_plan.desc':  { en: 'Inline editing arrives with the real agent.', zh: '真实策展人上线时即支持就地编辑。' },
  'mock.url_import.title':      { en: 'Paste a URL',                  zh: '粘贴一个链接' },
  'mock.url_import.desc':       { en: 'Remote import is coming — file drop and clipboard work today.', zh: '远程导入即将支持 — 目前可拖入文件或粘贴剪贴板。' },
  'mock.curator_save.title':    { en: 'Saved as "Quiet Luxury Interiors"', zh: '已保存为「静奢室内」' },
  'mock.curator_edit.title':    { en: 'Editing curator note',         zh: '编辑策展笔记' },
  'mock.settings_section.title':{ en: '{section} settings',           zh: '{section} 设置' },
  'mock.settings_section.desc': { en: 'Deeper controls land in the next phase.', zh: '更细的配置将在下一阶段开放。' },
  'mock.shelves_new.title':     { en: 'Name your new shelf',          zh: '为新书架起名' },
  'mock.shelves_new.desc':      { en: 'A shelf is just a focused view — drop assets in later.', zh: '书架只是一种聚焦视图 — 稍后再放入素材。' },
  'mock.manage_suggested.title':{ en: 'Suggested collections',        zh: '建议的收藏夹' },
  'mock.manage_suggested.desc': { en: 'Bulk accept or dismiss from this view (planned).', zh: '可在此视图中批量接受或忽略（规划中）。' },
  'mock.rating.title':          { en: 'Rated {n}★',                   zh: '已评 {n} 星' },
  'mock.fav_on.title':          { en: 'Added to favorites',           zh: '已加入收藏' },
  'mock.fav_off.title':         { en: 'Removed from favorites',       zh: '已取消收藏' },

  // Prompts (used as window.prompt fallback strings)
  'prompt.collection_name':     { en: 'Name your collection',         zh: '为你的收藏夹起名' },
  'prompt.collection_rename':   { en: 'Rename collection',            zh: '重命名收藏夹' },
  'prompt.project_name':        { en: 'Name your project',            zh: '为你的项目起名' },
  'prompt.url':                 { en: 'Paste a URL to import',        zh: '粘贴要导入的链接' },
  'prompt.feeling':             { en: 'Describe the feeling — colors, mood, references…', zh: '描述你的感觉 — 颜色、情绪、参考…' },
  'prompt.tag_label':           { en: 'Tag label for {n} assets',     zh: '为 {n} 项添加的标签' },
}

type Vars = Record<string, string | number>

function interpolate(template: string, vars?: Vars): string {
  if (!vars) return template
  return template.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? String(vars[k]) : m))
}

export function translate(key: string, lang: Language, vars?: Vars): string {
  const entry = dict[key]
  if (!entry) {
    if (typeof console !== 'undefined') console.warn(`[i18n] missing key: ${key}`)
    return interpolate(key, vars)
  }
  return interpolate(entry[lang] ?? entry.en, vars)
}

export function useT() {
  const lang = useLanguage((s) => s.lang)
  return (key: string, vars?: Vars) => translate(key, lang, vars)
}

export function useLang(): Language {
  return useLanguage((s) => s.lang)
}

export function relativeTimeI18n(iso: string, lang: Language): string {
  const now = Date.now()
  const then = new Date(iso).getTime()
  const diff = Math.max(1, Math.floor((now - then) / 1000))
  if (diff < 60) return translate('common.ago_s', lang, { n: diff })
  if (diff < 3600) return translate('common.ago_m', lang, { n: Math.floor(diff / 60) })
  if (diff < 86400) return translate('common.ago_h', lang, { n: Math.floor(diff / 3600) })
  const d = Math.floor(diff / 86400)
  if (d < 30) return translate('common.ago_d', lang, { n: d })
  if (d < 365) return translate('common.ago_mo', lang, { n: Math.floor(d / 30) })
  return translate('common.ago_y', lang, { n: Math.floor(d / 365) })
}

export function useRelativeTime() {
  const lang = useLang()
  return (iso: string) => relativeTimeI18n(iso, lang)
}
