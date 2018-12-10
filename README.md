## 项目说明
基于 React 服务端渲染项目
> 说明还未完整，逐步完善。

## 项目分支管理
```
master        // 正式代码
需要分之自己新建 
git checkout -b newBranchName
git push --set-upstream origin newBranchName
```

## 打包
推荐使用yarn管理依赖库，打包前建议先关闭之前的pm2已启动的进程！
```
npm run serve  // 开发环境
npm run build  // 环境打包
npm run lint  // eslint语法验证
```


## 目录结构
```
├── node_modules             // 依赖包
├── src                      // 源文件
│   ├── assets               // 静态文件
│   ├── components           // 组件
│   ├── main.js              // 主入口
│   ├── App.vue              // vue实例 （一般引用框架写在这里）
├── package.json             // 各种命令 dependencies配置

```