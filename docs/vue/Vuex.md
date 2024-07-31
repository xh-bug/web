## vuex 

Vuex 是一个专为 Vue.js 应用程序开发的**状态管理模式** 。适用于大型项目 管理统一的数据， 也适用于h5 等小项目。 

**注意 vuex的数据刷新会丢失 一般配合本地存储使用，或者使用永久化存储插件**

### vuex 配置

- store/index.js

```js
import Vue from 'vue' //引入vue
import Vuex from 'vuex' //引入vuex

Vue.use(Vuex)  //使用vuex插件

export default new Vuex.Store({ //输出一个 vuex的仓库实例
  state: { #里面存储数据 【相当于 data 】
  },
  getters: { #获取state数据并处理返回 相当于computed
  },
  mutations: { #里面写方法 同步改变state的值		参数一:state  参数二:payload ==> 携带的东西 例如：Payload.name
	// 在定义方法时有可能会使用常量来定义，const ADD = "ADD"
  },
  actions: { #里面写方法 调用mutations方法 改变state的值 ，可以写异步
    // 参数一：context
    // context参数包含如下
  	// state,   等同于store.$state，若在模块中则为局部状态
  	// rootState,   等同于store.$state,只存在模块中
  	// commit,   等同于store.$commit
  	// dispatch,   等同于store.$dispatch
  	// getters   等同于store.$getters
    // 参数二：Payload
  },
  modules: {#模块化 用于大型项目 多模块开发
  }
})

```



- main.js 引入

```js
import Vue from 'vue'
import App from './App.vue'
import store from './store' #引入配置好的vuex

Vue.config.productionTip = false

new Vue({
  store, #注册vuex
  render: h => h(App)
}).$mount('#app')

```



### 使用state

```js
#1 this.$store.state.数据属性

#2 辅助函数模式

//引入vuex 解构辅助函数 [亲自推荐]
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(['数据属性1','数据属性2']), #辅助函数的数据 在computed解构出来相当于挂着data上 可以直接用
  }
}
```

### 使用getters方法

相当于 computed

```js
#引入辅助函数
import { mapGetters } from "vuex";

export default {
   #在computed 使用
  computed: {
    ...mapGetters(['计算属性1','计算属性2'])
  }
}
</script>
```



### 使用vuex 的方法 Mutations

Mutations里面 是同步改变state值的方法

```js
#方法1 
export default {
  methods: {
    方法名() {
      # 用 this.$store.commit('mutations里面的函数触发')
      this.$store.commit('vuex mutations里面的方法名')
    }
  }
}
</script>


#方法2 引入vuex 解构辅助函数 [亲自推荐]
import { mapMutations } from "vuex";

export default {
  //方法
  methods: {
    ...mapMutations(['vuex mutations里面的方法名','同方法2']) #方法名相当于挂着methods里面
  },
}
```



### 使用vuex 的方法 Actions

```js
export default new Vuex.Store({ //输出一个 vuex的仓库实例
  state: { //里面存储数据 【相当于 data 】
    userInfo: {}, //模拟储存用户信息
  },
  mutations: { //里面写方法 同步改变state的值 [规范写法 必须大写用下划线分割]
    #存储用户信息
    SET_USER_INFO(state, payload) {
      state.userInfo = payload
    }
  },
  actions: { #里面写方法 调用mutations方法 改变state的值 ，可以写异步
    async getUserInfo({ commit }, data) {  // 方法参数1：上下文，参数2：形参 ...
      await new Promise((resolve) => {
        setTimeout(() => {
          commit('SET_USER_INFO', data)
          resolve()
        }, 1000);
      })
    }
  },
})


#使用
#写法1
this.$store.dispatch('actions里面的函数', 数据)

#写法2 辅助函数写法
import { mapActions } from "vuex";

export default {
  //方法
  methods: {
    ...mapActions(['actions里面的方法1','同方法2']) //actions里面的方法1 解构actions里面的方法挂在methods里面
  },
}
```

### 使用vuex 的 模块化module

```js
# shopcar.js
/**
 * 购物车 vuex 模块
 */
const state = {
    price: 120,
    count: 20,
}
const getters = {
    calcPrice(state) {
        return state.price * state.count
    }
}
const mutations = {

}
const actions = {

}
export default {
    namespaced: true, //如果是模块化开发  namespaced属性必填 【命名空间】
    state,
    getters,
    mutations,
    actions
}
```

```js
# store/index.js
export default new Vuex.Store({ //输出一个 vuex的仓库实例
  modules: { //模块化 用于大型项目 多模块开发
    shopcar
  }
})
```

- 使用

```js
export default {
  computed: {
    ...mapState('模块名', ['数据名1','数据名2']) #同理mapMutations，mapActions 写法类似
  },
}
```







## vuex的常用方法

### 1.dispatch：异步操作，触发actions方法。

写法： this.$store.dispatch(‘actions方法名’,所传值)；

### 2.commit：同步操作，触发mutations方法。

写法：this.$store.commit(‘mutations方法名’,所传值)；

### 3.payload载荷

在通过mutation更新数据的时候, 有可能我们希望携带一些额外的参数
参数被称为是mutation的载荷(Payload)