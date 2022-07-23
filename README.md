# 开发者模板小程序

`airtable-import` 小程序，支持将 Airtable 中的数据导入到 Vika 维格表中。


## 获取配置

1. 如何获取 API Key

需要你的 Airtable API Key 才能获取数据源，Airtable API Key 获取方式可以参考 [Airtable 的官方文档](https://support.airtable.com/hc/en-us/articles/219046777) 或点击直接进入 [Airtable Account](https://airtable.com/account)获取。

2. 如何获取 Base ID

我们需要对应的 Airtable Base ID 才能获取数据源，Airtable Base ID 获取方式可以点击进入 [Airtable Rest API](https://airtable.com/api) 获取，首先选择想要导入的 Base，然后从 INTRODUCTION 页面复制即可。

3. 如何获取 Table ID

我们需要对应的 Airtable Table ID 才能获取数据源，Airtable Table ID 获取方式可以点击进入 [Airtable Rest API](https://airtable.com/api) 获取，首先选择想要导入的 Table，然后从介绍处获取即可。

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

