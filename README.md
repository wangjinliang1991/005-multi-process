# 005-multi-process

## 多进程

Node.js官方提供的解决方案是cluster模块：

- 1个master进程，不做具体工作，只负责启动其他进程
- N个worker进程，接收请求，对外提供服务
- master进程实际监听服务端口，并将收到的请求按照一定的负载均衡逻辑转发给worker进程



Eggjs基于该方案实现了增强版的多进程模型：

- 1个master进程和N个worker进程不变
- 1个agent进程，不对外提供服务，只给worker进程服务，专门处理一些公共事务



![image-20230726082146993](https://raw.githubusercontent.com/wangjinliang1991/mypic/master/image-20230726082146993.png)

### 进程间通讯IPC

仅存在master和worker/agent之间

封装了一个messenger对象挂在app/agent实例上，提供一系列友好的api

- app.messenger.sendToApp(action, data): 发送给所有的app进程

  - 在app上调用该方法会发送给自己和其他的app进程
  - 在agent上调用该方法会发送给所有的app进程

- app.messenger.sendToAgent(action, data): 发送给agent进程

  - 在app上调用该方法会发送给agent进程
  - 在agent上调用该方法会发送给agent自己

- 在messenger上监听对应的action事件，就可以收到其他进程发来的信息

  app.messenger.on(action, data => { ... })

  app.messenger.once(action, data => { ... })



```js
setTimeout(() => {
    this.emit('changed', this.index++);
    this._start();
}, interval);
```



```js
    subscriber.on('changed', (data) => {
        agent.messenger.sendToApp('refresh', ...)
    })
```



```js
app.messenge.on('refresh', data => {...})
```

![image-20230726205655429](https://raw.githubusercontent.com/wangjinliang1991/mypic/master/image-20230726205655429.png)

