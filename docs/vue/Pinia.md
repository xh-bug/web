# Pinia

Pinia中文文档：https://pinia.web3doc.top/

> Pinia的介绍

Pinia最初是为了探索Vuex下一次迭代而产生的，结合了Vue5核心团队的很多想法。最终团队意识到Pinia已经实现了Vue5的大部分内容，决定实验Pinia来替代Vuex。

> Pinia与Vuex的对比

- mutations不在存在。
- Pinia与Vuex的对比，Pinia提供了更简单的api，并且与ts一起使用时具有更可靠的类型判断。
- 没有模块嵌套和命名空间，不在需要记住他们之间的关系。



## 安装Pinia

```
yarn add pinia
# 或者使用 npm
npm install pinia
```



## 定义Store

`this` 可以访问到 *整个 store 的实例*

```
import { defineStore } from 'pinia'

// useStore 可以是 useUser、useCart 之类的任何东西
// 第一个参数是应用程序中 store 的唯一 id，官方的约束是use***，以use+name的一个约定，不是必须，只是建议
export const useStore = defineStore('main', {
 state: () => { // 数据
    return {
      // 所有这些属性都将自动推断其类型
      counter: 0,
      name: 'Eduardo',
      isAdmin: true,
    }
  },
 getters: { // 同计算属性
    doubleCount: (state) => state.counter * 2,
  },
 actions: {
    increment() {
      this.counter++
    },
    randomizeCounter() {
      this.counter = Math.round(100 * Math.random())
    },
  },
})
```



## 修改Store的数据

> 注意：修改的数据如果直接结构，数据不是响应式的
>
> 使用Vue的toRefs()或Pinia的storeToRefs()

1. 在组件中引入Store直接修改

   ```js
   // 简单粗暴
   import {Store} from '../store/index'
   const store = Store()
   const handleClick = () => {
   	store.count++
   }
   ```

2. 使用$patch对象

   ```js
   // 多数据修改做过优化
   import {Store} from '../store/index'
   const store = Store()
   const handleClick = () => {
   	store.$patch({
   		count:store.count+2
   	})
   }
   ```

3. 使用$patch函数

   ```js
   // 使用的是函数，可以处理复制的业务
   import {Store} from '../store/index'
   const store = Store()
   const handleClick = () => {
   	store.$patch((state)=>{
   		state.count++
   	})
   }
   ```

4. 在actions中修改

   ```js
   // 用于复杂或多处使用相同的方法
   actions: {
       changeState(){
           this.count++
       }
   }
   // 在组件中使用
   store.changeState()
   ```

   

## Pinia中的getters使用

与Vue的计算属性一样，修改的数据有缓存，对性能优化有好处

```js
getters: { // 同计算属性
	doubleCount: (state) => state.counter * 2,
	phoneHidden: (state) => state.phone.toString().replace(/^(\d{3})\d{4}(\d{4})$/,'$1****$2')
}
// 组件中使用
store.doubleCount
```



## Pinia中Store的互相调用

> 不同的Store的相互调用非常简单，和组件使用相同

```js
import {userInfo} from '../store/userInfo'
const store = userInfo()
store.xxx
需要在哪使用直接拿即可
```

