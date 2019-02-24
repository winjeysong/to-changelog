# toChangelog
### commit type
commit type借鉴于angular的changelog规范，以下均为type。
* feat：新功能（feature）
* fix：修补bug
* docs：文档（documentation）
* style： 格式（不影响代码运行的变动）
* refactor：重构（即不是新增功能，也不是修改bug的代码变动）
* test：增加测试
* chore：构建过程或辅助 工具 的变动
* perf: 优化
* others: 不属于以上

默认输出feat、fix、perf、style类的commit

### commit format
commit格式遵循：[type] subject body，type不区分大小写

### config
* title
* release_type
* version 默认从package.json读取，如果没有package.json，再从配置文件中读取version字段。优先取配置文件中的version字段。