---
name: game-assets
description: |
  美术资产规范(免建模路线,cocos-dev 学习仓库)。CC0 资产来源白名单、
  GLTF/GLB 技术要求、命名与目录、入库流程、风格统一约定。

  触发场景: 练习需要模型/贴图、找资产、模型显示不对(比例/方向/原点)、
  了解美术风格约定。

  触发词: 资产、模型、美术、glb、gltf、贴图、纹理、Kenney、Quaternius、
  low-poly、风格、材质

  注意: 学习练习优先用引擎内置基本体(方块/球/胶囊);确实需要模型再走本技能入库流程。
---

# 美术资产规范(免建模路线)

## 风格定位(与 NoNameEarth 保持一致,提前适应)

**卡通 3D(CC0 low-poly 路线)**:精致圆润卡通 + 柔和自然色彩。拒绝写实 PBR 高模/照片贴图、拒绝基础几何体拼接感的"程序员美术"。学习练习阶段**优先用引擎内置基本体**(Cube/Sphere/Capsule)完成功能,确实需要模型氛围再找资产。

## 资产登记(轻量 Manifest)

- 已入库资产记录在 `docs/assets-registry.md`(表格:文件名 | 类别 | 来源 URL | 协议 | 下载日期);首次入库时创建该文件
- 组件里禁止散落硬编码模型路径,练习中至少把用到的资源路径收拢到脚本顶部常量区
- 加载与释放遵循 cocos-development 性能纪律:按需 `load` + `release`,禁止全量预载

## 风格统一策略(防跨源割裂)

**单一主源原则**:同类资产锁定一个主源系列;同类资产禁止跨作者混用(树全是 Quaternius 的,又混进 KayKit 的树 = 割裂)。

| 类别 | 主源(推荐) | 理由 |
|---|---|---|
| 自然(树/灌木/岩) | Quaternius Stylized Nature MegaKit | 品种全,卡通风格统一,CC0 |
| 建筑/城市 | KayKit City Builder Bits | 现代建筑+道路+路灯,CC0 |
| 角色 | KayKit Character Pack | 圆头卡通角色,与场景同系 |
| UI/2D 素材 | Kenney | UI 包/图标,CC0 |

- Poly Pizza 散件:仅当主源系列缺该资产时补充,必须筛选 License = CC0
- 更换主源系列 = 整批替换,不新旧混用

## 资产来源(白名单)

| 来源 | 地址 | 协议 | 用途 |
|---|---|---|---|
| Quaternius | https://quaternius.com(分发:poly.pizza / itch.io) | CC0 | 自然类主源 |
| KayKit | https://github.com/KayKit-Game-Assets | CC0 | 建筑/角色主源 |
| Kenney | https://kenney.nl/assets | CC0 | UI/2D/音频素材 |
| Poly Pizza | https://poly.pizza | CC0/CC-BY 混合 | 补充散件;**必须筛选 License = CC0**;模型 CDN 直链 `https://static.poly.pizza/<ResourceID>.glb` 可下载 |
| AmbientCG | https://ambientcg.com | CC0 | 贴图(少量用) |

**渠道提示(国内直连)**:kenney.nl 慢但通;github release 可通;itch.io 可能不通;poly.pizza 通常可用。下载失败禁止伪造结果,如实报告并请用户手动下载放置。

禁止:随机从 Sketchfab 等站点抓取不明协议模型入库;任何非 CC0 资产必须先向用户确认协议。

## 下载入库流程(需要新资产时)

1. 确认协议(CC0 或用户批准)
2. 确认符合上方主源表;非主源补充件先目检风格是否与已有资产同族
3. 按技术要求逐项检查(原点/朝向/比例/面数)
4. 放入 `assets/models/<类别>/`,按命名规范重命名
5. 在 `docs/assets-registry.md` 追加一行登记
6. 编辑器内实际加载验证:比例正常、贴图正常、无报错

## 技术要求(不符合的先处理资产,不在代码里写补偿)

- 格式:GLTF **二进制 .glb**(单文件,含贴图);一个资产一个文件
- 原点:**底部中心**;朝向:**-Z 朝前**;比例:**1 单位 = 1 米**(角色高约 1.8)
- 贴图:PNG,单张 ≤ 1024×1024;优先纯色/渐变 low-poly 材质
- 面数:角色 ≤ 3000;普通建筑 ≤ 5000(学习 demo 放宽,但别引入 10 万面"怪兽")
- 命名:`assets/models/<类别>/<名称>.glb`,类别固定:`building/`、`nature/`、`character/`、`props/`;同类型变体用 `_a/_b` 后缀
- 包内仅有 fbx/obj 时**报告用户需转换,不擅自入库**
