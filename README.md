# 开发者模板小程序

`airtable-import` 小程序，支持将 Airtable 中的数据导入到 Vika 维格表中。

## 获取 Personal Access Token

要使用该小程序，首先需要从你的 Airtable 账户中获取 Personal Access Token。获取后，只需将其输入，即可开始获取和导入原始数据。

你可以使用 [此链接](https://airtable.com/create/tokens) 创建和管理你的个人访问令牌。请注意，Personal Access Token 与之前使用的 API Key 不同。Airtable 已经宣布，他们将在 2024 年 1 月底停止支持 API Key。要了解更多详情，请阅读[本文](https://support.airtable.com/docs/airtable-api-key-deprecation-notice)。

访问上面的链接后，只需点击 "Generate new token" 按钮即可创建一个新的 Generate new token。

## 支持列类型

- [x] 附件
- [x] 单行文本
- [x] 多行文本
- [x] 多选
- [x] 数字
- [x] 评分。默认属性 icon 为 ‘star’
- [x] 勾选。默认 icon 为 ‘white_check_mark’
- [x] 日期。默认格式 ‘YYYY/MM/DD’
- [x] 网址
- [x] 货币。默认属性 precision 为 2，symbol 为 ‘¥’
- [x] 百分比。默认 precision 为 2
- [x] 电话
- [x] 邮箱
- [x] 单选
- [ ] 智能公式
- [ ] 成员
- [ ] 神奇关联
- [ ] 神奇引用
