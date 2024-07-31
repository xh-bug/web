# 路由基础

## 相关理解

- vue的一个插件库，专门用来实现SPA应用

## 对SPA应用的理解

- 单页Web应用（single page web application，SPA）
- 整个应用只有一个完整的页面
- 点击页面中的导航链接不会刷新页面，只会做页面的局部更新
- 数据需要通过ajax请求获取

## 路由的理解

- 什么是路由? 
  - 一个路由就是一组映射关系（key - value）
  - key为路径，value可能是function或componen
- 路由分类
  - 后端路由
    - 理解：value是function，用于处理客户端提交的请求
    - 工作过程：服务器接收到一个请求时，根据请求路径找到匹配的函数来处理请求，返回响应数据
  -  前端路由
    - 理解：value是component，用于展示页面内容
    - 工作过程：当浏览器的路径改变时，对应的组件就会显示

## 基本路由

- 安装vue-router，命令：

  ```javascript
  npm i vue-router
  ```

- 应用插件Vue.use(VueRouter)

- 编写router配置项

  ```javascript
  import VueRouter from 'vue-router'			// 引入VueRouter
  import About from '../components/About'	// 路由组件
  import Home from '../components/Home'		// 路由组件
  
  // 创建router实例对象，去管理一组一组的路由规则
  const router = new VueRouter({
  	routes:[
  		{
  			path:'/about',
  			component:About
  		},
  		{
  			path:'/home',
  			component:Home
  		}
  	]
  })
  
  //暴露router
  export default router
  ```

- 实现切换

  - `<router-link></router-link>`浏览器会被替换为a标签

  - active-class可配置高亮样式

    ```javascript
    <router-link active-class="active" to="/about">About</router-link>
    ```

- 指定展示位`<router-view></router-view>`

src/router/index.js该文件专门用于创建整个应用的路由器

```javascript
import VueRouter from 'vue-router'
// 引入组件
import About from '../components/About'
import Home from '../components/Home'

// 创建并暴露一个路由器
export default new VueRouter({
	routes:[
		{
			path:'/about',
			component:About
		},
		{
			path:'/home',
			component:Home
		}
	]
})
```

src/main.js

```javascript

import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'	// 引入VueRouter
import router from './router'				// 引入路由器

Vue.config.productionTip = false

Vue.use(VueRouter)	// 应用插件

new Vue({
	el:'#app',
	render: h => h(App),
	router:router
})
```



## 几个注意事项

- 路由组件通常存放在pages文件夹，一般组件通常存放在components文件夹 比如上一节的案例就可以修改为

  - src/pages/Home.vue
  - src/pages/About.vue
  - src/router/index.js
  - src/components/Banner.vue
  - src/App.vue

- 通过切换，“隐藏”了的路由组件，默认是被销毁掉的，需要的时候再去挂载

- 每个组件都有自己的$route属性，里面存储着自己的路由信息

- 整个应用只有一个router，可以通过组件的$router属性获取到

  ```javascript
  // 该文件专门用于创建整个应用的路由器
  import VueRouter from "vue-router";
  import Home from '../pages/Home'
  import About from '../pages/About'
  
  export default new VueRouter({
      routes:[
          {
              path:'/about',
              component:About
          },
          {
              path:'/home',
              component:Home
          }
      ]
  })
  ```

  ```javascript
  <template>
      <div class="col-xs-offset-2 col-xs-8">
          <div class="page-header"><h2>Vue Router Demo</h2></div>
      </div>
  </template>
  
  <script>
      export default {
          name:'Banner'
      }
  </script>
  ```

  ```javascript
  <template>
    <div>
      <div class="row">
        <Banner/>
      </div>
      <div class="row">
        <div class="col-xs-2 col-xs-offset-2">
          <div class="list-group">
            <!-- 原始html中我们使用a标签实现页面跳转 -->
            <!-- <a class="list-group-item active" href="./about.html">About</a>
             <a class="list-group-item" href="./home.html">Home</a> -->
            <!-- Vue中借助router-link标签实现路由的切换 -->
            <router-link class="list-group-item" active-class="active" to="/about">
              About</router-link>
            <router-link class="list-group-item" active-class="active" to="/home">
              Home</router-link>
  				</div>
  			</div>
  			<div class="col-xs-6">
  				<div class="panel">
  					<div class="panel-body">
  						<!-- 指定组件的呈现位置 -->
  						<router-view></router-view>
  					</div>
  				</div>
  			</div>
  		</div>
  	</div>
  </template>
  
  <script>
  	import Banner from './components/Banner.vue'
  	export default {
  		name:'App',
  		components:{ Banner }
  	}
  </script>
  ```



## 多级路由

配置路由规则，使用children配置项

```javascript
routes:[
	{
		path:'/about',
		component:About,
	},
	{
		path:'/home',
		component:Home,
		children:[ 					// 通过children配置子级路由
			{
				path:'news', 		// 此处一定不要带斜杠，写成 /news
				component:News
			},
			{
				path:'message',	// 此处一定不要写成 /message
				component:Message
			}
		]
	}
]
```

 跳转（要写完整路径）

```javascript
<router-link to="/home/news">News</router-link>
```

![](https://cdn.nlark.com/yuque/0/2022/png/1379492/1644072950709-6a65f3b3-3ab0-4d65-8dae-b2dbf87df440.png)





# 路由参数

## 路由的 query 参数

- 传递参数

  ```javascript
  <!-- 跳转并携带query参数，to的字符串写法 -->
  <router-link :to="`/home/message/detail?id=${m.id}&title=${m.title}`">跳转</router-link>
  				
  <!-- 跳转并携带query参数，to的对象写法（推荐） -->
  <router-link 
  	:to="{
  		path:'/home/message/detail',
  		query:{
  		   id: m.id,
         title: m.title
  		}
  	}"
  >跳转</router-link>
  ```

-  接收参数

  ```javascript
  $route.query.id
  $route.query.title
  ```

  

## 路由的 params 参数

- 配置路由，声明接收params参数

  ```javascript
  {
  	path:'/home',
  	component:Home,
  	children:[
  		{
  			path:'news',
  			component:News
  		},
  		{
  			component:Message,
  			children:[
  				{
  					name:'xiangqing',
  					path:'detail/:id/:title', // 使用占位符声明接收params参数
  					component:Detail
  				}
  			]
  		}
  	]
  }
  ```

- 传递参数

  - 特别注意：路由携带params参数时，若使用to的对象写法，则不能使用path配置项，必须使用name配置！

  ```javascript
  
  <!-- 跳转并携带params参数，to的字符串写法 -->
  <router-link :to="/home/message/detail/666/你好">跳转</router-link>
  				
  <!-- 跳转并携带params参数，to的对象写法 -->
  <router-link 
  	:to="{
  		name:'xiangqing',
  		params:{
  		   id:666,
         title:'你好'
  		}
  	}"
  >跳转</router-link>
  ```

- 接收参数

  ```javascript
  $route.params.id
  $route.params.title
  ```



## 路由的 props 配置

- props作用：让路由组件更方便的收到参数

  ```javascript
  {
  	name:'xiangqing',
  	path:'detail/:id',
  	component:Detail,
  
  	//第一种写法：props值为对象，该对象中所有的key-value的组合最终都会通过props传给Detail组件
  	// props:{a:900}
  
  	//第二种写法：props值为布尔值，为true时，则把路由收到的所有params参数通过props传给Detail组件
  	// props:true
  	
  	//第三种写法：props值为函数，该函数返回的对象中每一组key-value都会通过props传给Detail组件
  	props($route){
  		return {
  			id: $route.query.id,
  			title: $route.query.title
  		}
  	}
  }
  ```



##  命名路由

- 作用：可以简化路由的跳转

  ```javascript
  {
  	path:'/demo',
  	component:Demo,
  	children:[
  		{
  			path:'test',
  			component:Test,
  			children:[
  				{
            name:'hello' // 给路由命名
  					path:'welcome',
  					component:Hello,
  				}
  			]
  		}
  	]
  }
  ```

  ```html
  <!--简化前，需要写完整的路径 -->
  <router-link to="/demo/test/welcome">跳转</router-link>
  
  <!--简化后，直接通过名字跳转 -->
  <router-link :to="{name:'hello'}">跳转</router-link>
  
  <!--简化写法配合传递参数 -->
  <router-link 
  	:to="{
  		name:'hello',
  		query:{
  		    id:666,
          title:'你好'
  		}
  	}"
  >跳转</router-link>
  ```

- 自调用

  ```vue
  <template>
    <ul>
      <li v-for="data in datas" :key="data.id">
        <!--内容部分-->
        <span>{{data.title}}</span>
        <!-- 用v-if判断 避免出现死循环；根据数据判断 例如：data.chilren.length>0 -->
        <template v-if="Array.isArray(data.chilren)">
          <!-- 使用name属性，递归调用组件本身 -->
          <tree-component :datas="data.chilren" />
        </template>
      </li>
    </ul>
  </template>
  ```



# 编程式导航

## 路由跳转的 replace 方法

- 作用：控制路由跳转时操作浏览器历史记录的模式
- 浏览器的历史记录有两种写入方式：push和replace
  - push是追加历史记录
  - replace是替换当前记录，路由跳转时候默认为push方式
- 开启replace模式
  - <router-link :replace="true" ...>News</router-link>
  - 简写<router-link replace ...>News</router-link>

总结：浏览记录本质是一个栈，默认push，点开新页面就会在栈顶追加一个地址，后退，栈顶指针向下移动，改为replace就是不追加，而将栈顶地址替换

```vue
<template>
  <div>
    <h2>Home组件内容</h2>
    <div>
      <ul class="nav nav-tabs">
        <li>
          <router-link replace class="list-group-item" active-class="active" 
                       to="/home/news">News</router-link>
    		</li>
        <li>
          <router-link replace class="list-group-item" active-class="active" 
                       to="/home/message">Message</router-link>
    		</li>
    </ul>
    <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    name:'Home'
  }
</script>
```

## 编程式路由导航（不用<router-link>）

- 作用：不借助<router-link>实现路由跳转，让路由跳转更加灵活

- this.$router.push({})	内传的对象与<router-link>中的to相同

- this.$router.replace({})	

- this.$router.forward()	前进

- this.$router.back()		后退

- this.$router.go(n)		可前进也可后退，n为正数前进n，为负数后退

  ```javascript
  this.$router.push({
  	name:'xiangqing',
    params:{
      id:xxx,
      title:xxx
    }
  })
  
  this.$router.replace({
  	name:'xiangqing',
    params:{
      id:xxx,
      title:xxx
    }
  })
  ```

  ![](https://cdn.nlark.com/yuque/0/2022/png/1379492/1644152143098-41b0f79d-cf8d-4997-8e5f-43be322e5415.png)

```javascript
<template>
	<div class="col-xs-offset-2 col-xs-8">
		<div class="page-header">
			<h2>Vue Router Demo</h2>
			<button @click="back">后退</button>
			<button @click="forward">前进</button>
			<button @click="test">测试一下go</button>
		</div>
	</div>
</template>

<script>
	export default {
		name:'Banner',
		methods:{
			back(){
				this.$router.back()
			},
			forward(){
				this.$router.forward()
			},
			test(){
				this.$router.go(3)
			}
		},
	}
</script>
```

```javascript
<template>
    <div>
        <ul>
            <li v-for="m in messageList" :key="m.id">
                <router-link :to="{
                    name:'xiangqing',
                    params:{
                        id:m.id,
                        title:m.title
                    }
                }">
                    {{m.title}}
                </router-link>
                <button @click="showPush(m)">push查看</button>
                <button @click="showReplace(m)">replace查看</button>
            </li>
        </ul>
        <hr/>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name:'News',
        data(){
            return{
                messageList:[
                    {id:'001',title:'消息001'},
                    {id:'002',title:'消息002'},
                    {id:'003',title:'消息003'}
                ]
            }
        },
        methods:{
            showPush(m){
                this.$router.push({
                    name:'xiangqing',
                    query:{
                        id:m.id,
                        title:m.title
                    }
                })
            },
            showReplace(m){
                this.$router.replace({
                    name:'xiangqing',
                    query:{
                        id:m.id,
                        title:m.title
                    }
                })
            }
        }
    }
</script>
```



# 缓存路由组件

作用：让不展示的路由组件保持挂载，不被销毁
<keep-alive include="News"><router-view></router-view></keep-alive>
<keep-alive :include="['News', 'Message']"><router-view></router-view></keep-alive>

```vue

// 缓存一个路由组件
<keep-alive include="News"> // include中写想要缓存的组件名，不写表示全部缓存
    <router-view></router-view>
</keep-alive>

// 缓存多个路由组件
<keep-alive :include="['News','Message']"> 
    <router-view></router-view>
</keep-alive>
```



# 路由守卫/钩子

## activated deactivated

- activated路由组件被激活时触发
- deactivated路由组件失活时触发

```vue
<template>
    <ul>
        <li :style="{opacity}">欢迎学习vue</li>
        <li>news001 <input type="text"></li>
        <li>news002 <input type="text"></li>
        <li>news003 <input type="text"></li>
    </ul>
</template>

<script>
    export default {
        name:'News',
        data(){
            return{
                opacity:1
            }
        },
        activated(){
            console.log('News组件被激活了')
            this.timer = setInterval(() => {
                this.opacity -= 0.01
                if(this.opacity <= 0) this.opacity = 1
            },16)
        },
        deactivated(){
            console.log('News组件失活了')
            clearInterval(this.timer)
        }
    }
</script>
```



## 路由守卫

作用：对路由进行权限控制 
分类：全局守卫、独享守卫、组件内守卫 

- 全局守卫

  meta路由源信息

  ```javascript
  // 全局前置守卫：初始化时、每次路由切换前执行
  router.beforeEach((to,from,next) => {
  	console.log('beforeEach',to,from)
  	if(to.meta.isAuth){ // 判断当前路由是否需要进行权限控制
  		if(localStorage.getItem('school') === 'atguigu'){ // 权限控制的具体规则
  			next()	// 放行
  		}else{
  			alert('暂无权限查看')
  		}
  	}else{
  		next()	// 放行
  	}
  })
  
  // 全局后置守卫：初始化时、每次路由切换后执行
  router.afterEach((to,from) => {
  	console.log('afterEach',to,from)
  	if(to.meta.title){ 
  		document.title = to.meta.title //修改网页的title
  	}else{
  		document.title = 'vue_test'
  	}
  })
  ```

- 独享守卫

  ```javascript
  beforeEnter(to,from,next){
  	console.log('beforeEnter',to,from)
      if(localStorage.getItem('school') === 'atguigu'){
          next()
      }else{
          alert('暂无权限查看')
      }
  }
  ```

- 组件内守卫

  ```javascript
  //进入守卫：通过路由规则，进入该组件时被调用
  beforeRouteEnter (to, from, next) {... next()},
  
  //离开守卫：通过路由规则，离开该组件时被调用
  beforeRouteLeave (to, from, next) {... next()},
  ```

- 全局路由守卫

  ```javascript
  //该文件专门用于创建整个应用的路由器
  import About from '../pages/About'
  import News from '../pages/News'
  import Message from '../pages/Message'
  import Detail from '../pages/Detail'
  
  
  //创建一个路由器
  const router = new VueRouter({
      routes:[
          {
              name:'guanyv',
              path:'/about',
              component:About,
              meta:{title:'关于'}
          },
          {
              name:'zhuye',
              path:'/home',
              component:Home,
              meta:{title:'主页'},
              children:[
                  {
                      name:'xinwen',
                      path:'news',
                      component:News,
                      meta:{isAuth:true,title:'新闻'}
                  },
                  {
                      name:'xiaoxi',
                      path:'message',
                      component:Message,
                      meta:{isAuth:true,title:'消息'},
                      children:[
                          {
                              name:'xiangqing',
                              path:'detail',
                              component:Detail,
                              meta:{isAuth:true,title:'详情'},
                              props($route){
                                  return {
                                      id:$route.query.id,
                                      title:$route.query.title,
                                  }
  														}
                          }
                      ]
                  }
              ]
          }
      ]
  })
  
  // 全局前置路由守卫————初始化的时候、每次路由切换之前被调用
  router.beforeEach((to,from,next) => {
      console.log('前置路由守卫',to,from)
      if(to.meta.isAuth){
          if(localStorage.getItem('school')==='atguigu'){
              next()
          }else{
              alert('学校名不对，无权限查看！')
          }
      }else{
          next()
      }
  })
  
  // 全局后置路由守卫————初始化的时候被调用、每次路由切换之后被调用
  router.afterEach((to,from)=>{
  	console.log('后置路由守卫',to,from)
  	document.title = to.meta.title || '硅谷系统'
  })
  
  // 导出路由器
  export default router
  ```



## 路由器的两种工作模式

- 对于一个url来说，什么是hash值？
  - \#及其后面的内容就是hash值
- hash值不会包含在HTTP请求中，即：hash值不会带给服务器 
- hash模式 
  - 地址中永远带着#号，不美观
  - 若以后将地址通过第三方手机app分享，若app校验严格，则地址会被标记为不合法
  - 兼容性较好
- history模式
  - 地址干净，美观
  - 兼容性和hash模式相比略差
  - 应用部署上线时需要后端人员支持，解决刷新页面服务端404的问题

```javascript

const router =  new VueRouter({
	mode:'history',
	routes:[...]
})

export default router
```

