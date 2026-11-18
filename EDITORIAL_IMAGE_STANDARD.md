# LINK HEALTH 官网医学内容与图片制作规范（2026-11-18）

## 适用范围
首页“最新医学观察”轮播、医学观察文章、生殖健康科普、医者的养生、后续研究报道、人物专题与分享预览图。参考已发布的 Georg Schett / Andreas Mackensen CAR-T 与 Evelyn Ullrich CAR-NK 专题更新方法。

## 核心规则
1. **客户可读**：正文用准确、清晰的白话解释科学研究；先交代客户关心的问题，再解释研究做了什么、发现什么。保留具体论文和数据，不堆砌术语，不重复空泛的风险告诫。
2. **真实影像优先**：仅使用能确认真实身份与内容的教授/团队官方照片、医院和大学实景、实验室实际拍摄、显微/组织病理原始摄影、用户自己拍摄或拥有可用权限的会场画面。严禁将AI生成插画、卡通细胞、假实验室、3D模拟动画当作科研照片。旧文章中的装饰性 SVG 概念图要替换。
3. **严格匹配对象**：人物照片必须对应文章所讨论的研究团队；研究机构实景需与作者/机构对应。只拿得到相关细胞通用显微照片时，不得声称它是该研究的实验结果；不得用无关医院冒充作者机构。
4. **先核查授权再发布**：优先作者/机构明确许可、公共领域/CC0，或 Wikimedia Commons 明示许可的真实作品；CC BY、CC BY-SA 记录作者、许可、原图链接和实际修改（裁切/缩放等），并履行对应义务。官网“图片版权”集中列明信息，**文章正文、图片下方、首页轮播不显示来源、摄影者、年份和版权备注**。原始论文文献链接则可保留在文末。
5. **视觉设计**：真实照片、冷静的学术风格，藏蓝/青绿为辅；不做动画、卡通、假微距、满屏装饰背景，不在图片上叠大字；首页轮播优先新闻性、与文章紧密相关的真实照片，移动端裁切合理。
6. **技术实现**：真实影像尽量托管到受控资产目录；暂时引用 Commons 时用可解析的原图资源地址，禁止猜测 Wikimedia SHA 哈希路径。图片 onerror 隐藏避免文字裸露，装饰图 alt=""，有信息意义的图用简短准确 alt；保留合适的 object-fit、loading 和适配。文章和首页 OG 预览同步更新。确保页面、图片链接、移动端均可用。
7. **原始科学图不等于装饰动画**：数据图、论文图、必要的机制示意若真正提供科学证据，不能盲删，应单独核查版权和解读上下文；此次整理仅替换**装饰性**动画/概念配图。
8. **质量复核**：逐篇检查文章内图、首页入口图、meta og:image、封面替换残留、样式、访问/部署及图片加载；未能访问就明确标记为“代码已提交，线上未核实”，不能谎称已上线。

## 已核实图源清单（无需在正文公开展示）
- 埃尔朗根大学医院内科中心：Wikimedia Commons `File:Erlangen_Internistisches_Zentrum_001.JPG`；Janericloebe / CC BY 3.0。用于 Schett CAR-T 机构关联的封面；非实验现场。
- 弗赖堡大学医院院区：`File:Universitätsklinikum Freiburg (2025)-4.jpg`；Sneeuwvlakte / CC BY-SA 4.0。用于 Ullrich CAR-NK 机构关联的封面；非实验现场。
- 真实肠道黏膜组织病理：`File:Histology of a normal colonic mucosal epithelium.jpg`；CC0。
- 结肠黏膜下淋巴组织：`File:Histology of subepithelial lymphoid aggregate of the colon.jpg`；Mikael Häggström / CC0。用于 A-FMT 主题通用组织病理视图，不代表顺天堂研究原始切片。
- 真实微生物实验室：`File:Petridish.jpg`；Tanzi Afruza / CC0。用于 SER-155 主题，非该研究生产或临床实验现场。
- CDC 肠道细菌显微照片：`File:BacteroidesFragilis Gram.jpg`、`File:Bacteroides thetaiotaomicron.png`；CDC / Public domain。通用菌株影像，不代表某篇论文中的具体实验菌株。
- 医疗检查真实设备场景：`File:MRI machine with patient (23423505123).jpg`；Public domain。不得标为合作医院现场。
- 内镜室真实摄影：`File:Endoscopy room.jpg`；Gilo1969 / CC BY 2.0。不得标为 LINK HEALTH 合作机构。
- 人类卵泡显微摄影：`File:Human ovarian follicle.jpg`；Jpogi / public domain。
- IVF 真实实验室：`File:IVF laboratory.jpg`；摄影者 Galina Fomina / CC BY 4.0（Zina Kel 为上传用户名）。
- 人类胚胎真实显微图：`File:Human embryos (four-cell stage) (27771482412).jpg`；ZEISS Microscopy / CC BY-SA 2.0。
- 成熟卵泡真实组织摄影：`File:Graafian follicle of human ovary.jpg`；Ed Uthman / CC BY 2.0。
- 健康人体 T 细胞扫描电镜：`File:Healthy Human T Cell.jpg`；NIAID / Public domain。

## 旧文章整改检查清单
- [ ] 核对文章研究团队、疾病、实验对象，确认图片内容相关。
- [ ] 找到真实照片或真实显微影像，核实作者、授权和年份；不能确认则不发布该图。
- [ ] 删除装饰性 SVG、AI 合成细胞、卡通图和没有信息量的“示意图”占位框；**真实研究数据图保留**。
- [ ] 首页轮播、文章封面、栏目卡片和 og:image 使用同一套真实照片，避免首页替换后内页仍显示旧插画。
- [ ] 不在普通页面显示图片来源/版权备注，集中写入 image-credits.html。
- [ ] 检查手机端尺寸、图片实际加载、alt 文本和分享预览，确认后才对外声称已上线。

## 维护约束
上述规范为编辑与开发流程，不意味着第三方照片可不履行许可条款。新增图片须在版权集中页或对应素材台账登记真实出处，不得在图片下随手加大量来源说明。
