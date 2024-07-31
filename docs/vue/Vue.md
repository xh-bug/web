# vue笔记

## 添加响应式数据

vue的data的数据是响应式的，但是后添加的数据不是响应式，想要实现后添加的数据是响应式的，需要使用Vue.set()

在vm上也有一个$set()是一样的==>this.$set()

第一个参数是添加的对象（给谁添加）

第二个参数是key（键）

第三个参数是value（值）

注意：set只能给data里面已经创建的对象添加，不能在data上直接添加





## v-model结合表单

### input:text

```
<input type="text" v-model="message" placeholder="请输入">
```

### textarea

```
<textarea v-model="text" placeholder="请输入"></textarea>
```

### input:radio

```
<label for="male">
	<input type="radio" id="male" value="男" v-model="sex" name="sex">男
</label>
<label for="female">
	<input type="radio" id="female" value="女" v-model="sex" name="sex">女
</label>
```

### input:checkbox `单选`

```
<label for="agerr">
	<input type="checkbox" id="agerr" v-model="isAgerr">同意协议
</label>
// isAgerr为布尔值
```

### input:checkbox `多选`

```
<input type="checkbox" value="篮球" v-model="hobbies">篮球
<input type="checkbox" value="乒乓球" v-model="hobbies">乒乓球
<input type="checkbox" value="羽毛球" v-model="hobbies">羽毛球
// hobbies为数组
// ['篮球','乒乓球','羽毛球']
```

### select `单选`

```
<select name='' v-model="fruit">
	<option value='苹果'>苹果</option>
	<option value='香蕉'>香蕉</option>
	<option value='榴莲'>榴莲</option>
</select>
// 字符串
```

### select `多选`

```
<select name='' v-model="fruit" multiple>
	<option value='苹果'>苹果</option>
	<option value='香蕉'>香蕉</option>
	<option value='榴莲'>榴莲</option>
</select>
// 数组
```



## v-model修饰符

lazy修饰符：只有当用户的input中失去焦点或者用户点击回车按钮时，才会将后台的数据进行修改。

number修饰符：使用number修饰符来将输入的数字转为number类型。

trim修饰符：使用trim修饰符来去掉字符串首部或者尾部的所有空格。



## 自定义指令

directives  --->vue 的配置项，与data同级

定义规则 xxx   使用规则 v-xxx

定义方法：函数（简单，但是没法处理细节）、对象（相对麻烦但是能更好的处理细节）

什么时候调用？当前模板有变化时，函数就会重新调用

命名："xxx-xxx" 使用v-xxx-xxx

注意：此处的this都指向window

局部使用

```js
directives{
    // 简写
    函数：函数名(element,binding){
		element真实DOM
		binding传输的所有属性，binding.value使用时传输的值
	}
    // 完整
	对象：xxx：{
    	// 指令与元素绑定成功时，此时还没有放到页面
    	bind(element,binding){}，
    	// 指令所在元素被插入页面是
    	inserted(element,binding){},
    	// 指令重新渲染时
    	update(element,binding){}
	}
}

```

全局使用

Vue.directive('名称',{配置对象/函数})



## prop

- prop的大小写

​		camelCase (驼峰命名法) 的 prop 名需要使用其等价的 kebab-case (短横线分隔命名) 命名

- prop的类型

  数组形式列出的 prop只能以字符串的类型接收

  ```js
  props: ['title', 'likes', 'isPublished', 'commentIds', 'author']
  ```

  以对象形式列出 prop可以指定的值类型

  此时有多种操作：多个可能的类型、必填的字符串、带有默认值的数字、带有默认值的对象、自定义验证函数

  ```js
  props: {
      // 基础的类型检查 (`null` 和 `undefined` 会通过任何类型验证)
      propA: Number,
      // 多个可能的类型
      propB: [String, Number],
      // 必填的字符串
      propC: {
        type: String,
        required: true
      },
      // 带有默认值的数字
      propD: {
        type: Number,
        default: 100
      },
      // 带有默认值的对象
      propE: {
        type: Object,
        // 对象或数组默认值必须从一个工厂函数获取
        default: function () {
          return { message: 'hello' }
        }
      },
      // 自定义验证函数
      propF: {
        validator: function (value) {
          // 这个值必须匹配下列字符串中的一个
          return ['success', 'warning', 'danger'].indexOf(value) !== -1
        }
      }
    }
  ```



## computed

```js
 //完整写法
 fullName: {
 	get() {
        // 获取
 		console.log('get被调用了')
 		return this.firstName + '-' + this.lastName
 	},
 	set(value) {
        // 修改
 		console.log('set', value)
 		const arr = value.split('-')
 		this.firstName = arr[0]
 		this.lastName = arr[1]
 	}
 }
```



## watch

简写（不能深度监听，和初始化调用）

```js
watch:{
	info(newValue,oldValue){
		// newValue 新内容 oldValue旧内容
	},
	// 当需要监听对象的某一个属性时用"对象.属性"
	// 当需要监听数组的某一个对象的属性时用"数组[n].属性"
	"info.name":function(newValue,oldValue){
		// newValue 新内容 oldValue旧内容
	},
    "info[0].name":function(newValue,oldValue){
		// newValue 新内容 oldValue旧内容
	},
}
```

详细

```
watch:{
	friends:{
		handler(newFriends,oldFriends){ //handler固定这么写
			
		},
		deep:true,// 深度监听
		immediate：true, // 立即监听
	}
}
```



## 父子组件访问

- 父访问子：$children/$refs
  - $children：this.$children获取到数组，然后获取到对应的对象属性，来使用子组件的属性/方法
  - $refs：this.$refs获取到组件属性`ref`命名过的对象，然后获取到对应的对象属性，来使用子组件的属性/方法
- 子访问父：$parent/$root
  - $parent：this.$parent，获取到vue组件或vue实例，来使用子组件的属性/方法
  - $root：this.$root，获取到根组件的vue实例，来使用子组件的属性/方法



## 作用域插槽

先在子组件的`slot`标签上自定义属性

```
<slot :row="row"></slot> 
```

插槽容器上通过slot-scope来接收

```
<template slot-scope="scope">
	{{scope.row}}
</template>
```



## $attrs

包含了父作用域中不作为 prop 被识别 (且获取) 的 attribute 绑定 (`class` 和 `style` 除外)。当一个组件没有声明任何 prop 时，这里会包含所有父作用域的绑定 (`class` 和 `style` 除外)，并且可以通过 `v-bind="$attrs"` 传入内部组件——在创建高级别的组件时非常有用。

通俗来讲就是父组件传递的内容在子组件的prop没有定义，通过$attrs可以获取到，但是`class` 和 `style` 除外

## $listeners

包含了父作用域中的 (不含 `.native` 修饰器的) `v-on` 事件监听器。它可以通过 `v-on="$listeners"` 传入内部组件——在创建更高层次的组件时非常有用。

通俗来讲就是子组件通过$listeners可以获取到父组件的方法

**父组件在使用子组件时绑定的方法**

```js
<my-button :msg="msg" @todo="handleClick"></my-button>
```

子组件通过$listeners调用

```
created(){
	console.log(this.$listeners) // 包含父级所有绑定的方法
}
```



## Vue的插件

可以自定义插件

创建js文件使用export default导出

```
export default{
	install(Vue,参数1,参数2,参数3,...){
		// 此处就可以使用Vue的方法
		Vue.filter()
		Vue.mixin()
		...
	}
}
```

然后在main.js中导入插件

使用Vue.use(install,参数1,参数2,参数3,...)应用即可



## 事件总线$bus

直接在APP的beforeCreate上面调用Vue.prototype.$bus = this

```js
new Vue({
	el:'#app',
	render:h =>(App),
	beforeCreate(){
		Vue.prototype.$bus = this // 创建事件总线
	}
})
```

创建完成之后配合下面的方法使用

- $on(eventName, listener): 绑定自定义事件监听
- $emit(eventName, data): 执行自定义事件
- $off(eventName): 解绑自定义事件监听
- $once(eventName, listener): 绑定事件监听, 但只能处理一次

## devServer配置

```js
 devServer:{
        //运行代码的目录
        contentBase:resolve(__dirname,"build"),
        //监视contentBase下的全部文件，一旦文件变化，就会reload
        watchContentBase:true,
        //监视中忽略某些文件
        watchOptions:{
            ignored:/node_modules/
        },
        //端口号
        port:3000,
        //域名
        host:'localhost',
        //启动gzip压缩
        compress:true,
        //自动打开浏览器
        open:true,
        //开启HMR功能
        hot:true,
        //不要启动服务的日志信息
        clientLogLevel:'none',
        //除了一些基本的启动信息以外，其他都不显示
        quiet:true,
        //如果出错了，不要全屏提示
        overlay:false,
        //服务器代理 -> 解决开发环境跨域问题
        proxy:{
            //一旦devServer5000接到/api/xxx的请求，就会把请求转发到另一个服务器3000
            '/api':{
                //转发后的目标地址
                // target: project_config.proxyAddr,
                target:'localhost:3000',
                // 发送请求时，请求路径重写 /api/xxx ->  /xxx （去掉a/pi）
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
```

## devServer.proxy 代理服务器

简写

```js
devServer: {
  proxy: 'http://localhost:4000' //指向开发环境 API 服务器的字符串
}
// 问题1 如果原来的地址有则会直接调用原来地址的文件
// 问题2 只能调用一个代理
```

详细

```js
devServer: {
 	proxy:{
            // 一旦devServer5000接到/api/xxx的请求，就会把请求转发到另一个服务器3000
        	// 请求前缀/api 紧跟端口号
            '/api':{
                // 转发后的目标地址
                // target: project_config.proxyAddr,
                target:'localhost:3000',
                // 重写路径 调用真正的接口时替换掉请求前缀
                // 发送请求时，请求路径重写 /api/xxx ->  /xxx （去掉a/pi）
                pathRewrite: {'^/api': ''},
                ws:true,//用于支持websocket
                changeOrigin: true,//欺骗后端  代理服务器此时会根据请求的 target 地址修改 Host
            }
    }
}
```

## route和router的区别

**可以理解为，一个是用来获取路由信息的，一个是用来操作路由的**

**一.$route**

> route是路由信息对象，每一个路由都会有一个route对象，是一个局部的对象,里面主要包含路由的一些基本信息，包括name、meta、path、hash、query、params、fullPath、matched、redirectedFrom等等

  **1.**  **$route.path**   [字符串](https://so.csdn.net/so/search?q=字符串&spm=1001.2101.3001.7020)，对应当前路由的路径，总是解析为绝对路径，如"/foo/bar"。

  **2.**  **$route.params**   一个 key/value 对象，包含了 动态片段 和 全匹配片段，   如果没有路由参数，就是一个空对象。

  **3.**  **$route.query**   一个 key/value 对象，表示 URL 查询参数。   例如，对于路径 /foo?user=1，则有$route.query.user == 1，   如果没有查询参数，则是个空对象。

  **4.**  **$route.hash**   当前路由的[hash](https://so.csdn.net/so/search?q=hash&spm=1001.2101.3001.7020)值 (不带#) ，如果没有 hash 值，则为空字符串。锚点*

  **5.**  **$route.fullPath**   完成解析后的 URL，包含查询参数和hash的完整路径。

  **6.**  **$route.matched**   数组，包含当前匹配的路径中所包含的所有片段所对应的配置参数对象。

  **7.**  **$route.name**  当前路径名字

  **8.**  **$route.meta** 路由元信息

（ 导航钩子的参数：

 router.beforeEach((to,from, next)=>{//to 和from都是 路由信息对象,后面使用路由的钩子函数就容易理解了}) ）

**二.$router**

> router是VueRouter的实例，通过Vue.use(VueRouter)和VueRouter构造函数得到一个router的实例对象，这个对象中是一个全局的对象，他包含了所有的路由包含了许多关键的对象和属性                

 （**$router对象是全局路由的实例，是router构造方法的实例**）

**1、push：**

  1.字符串this.$router.push('home')

  \2. 对象this.$router.push({path:'home'})

  \3. 命名的路由this.$router.push({name:'user',[params](https://so.csdn.net/so/search?q=params&spm=1001.2101.3001.7020):{userId:123}})

  4.带查询参数，变成 /register?plan=123this.$router.push({path:'register',query:{plan:'123'}})

  push方法其实和<router-link :to="...">是等同的。

  注意：push方法的跳转会向 history 栈添加一个新的记录，当我们点击浏览器的返回按钮时可以看到之前的页面。

**2、go**

   页面路由跳转 

   前进或者后退this.$router.go(-1) // 后退

**3、replace**

  push方法会向 history 栈添加一个新的记录，而replace方法是替换当前的页面，

  不会向 history 栈添加一个新的记录

**4.一般使用replace来做404页面**

  this.$router.replace('/')

  配置路由时path有时候会加 '/' 有时候不加,以'/'开头的会被当作根路径，就不会一直嵌套之前的路径。



## Vue2响应式原理

`当你把一个普通的 JavaScript 对象传入 Vue 实例作为 data 选项，Vue 将遍历此对象所有的 property，并使用 Object.defineProperty 把这些 property 全部转为 getter/setter。Object.defineProperty 是 ES5 中一个无法 shim 的特性，这也就是 Vue 不支持 IE8 以及更低版本浏览器的原因。`

Object.defineProperty的基本使用

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>defineProperty</title>
  </head>
  <body>
    <div id="app">hello</div>
    <script>
      //模拟Vue中的data选项(当)
      let data = {
        msg: "hello",
      };
      //模拟Vue的实例
      let vm = {};
      //数据劫持，当访问或者设置vm中的成员的时候，做一些干预操作
      Object.defineProperty(vm, "msg", {
        //可枚举(可遍历)
        enumerable: true,
        //可配置（可以使用delete删除,可以通过defineProperty重新定义)
        configurable: true,
        //当获取值的时候执行
        get() {
          console.log("get:", data.msg);
          return data.msg;
        },
        // 当设置值的时候执行
        set(newValue) {
          console.log("set:", newValue);
          //设置的值与原有的值相同，则没有更改，所以不做任何操作
          if (newValue === data.msg) {
            return;
          }
          data.msg = newValue;
          //数据更改，更新DOM的值
          document.querySelector("#app").textContent = data.msg;
        },
      });
      //测试
      //执行set操作
      vm.msg = "abc";
      //执行get操作
      console.log(vm.msg);
    </script>
  </body>
</html>
```

`当属性和层级更多时使用循环和递归进行数据的劫持处理`



## Vue3响应式原理

`Vue3`的响应式原理是通过`Proxy`来完成的。

`Proxy`直接监听对象，而非属性，所以将多个属性转换成`getter/setter`的时候，不需要使用循环。

`Proxy`是`ES6`课程中新增的，`IE`不支持

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Proxy</title>
  </head>
  <body>
    <div id="app">hello</div>
    <script>
      //模拟Vue中的data选项
      let data = {
        msg: "hello",
        count: 0,
      };
      //模拟Vue实例
      //为data创建一个代理对象vm,这样就可以通过vm.msg来获取data中的msg属性的值，而这时候会执行get方法
      let vm = new Proxy(data, {
        // 当访问vm的成员时会执行
        //target表示代理的对象（这里为data对象），key表示所代理的对象中的属性
        get(target, key) {
          console.log("get key:", key, target[key]);
          return target[key];
        },
        //当设置vm的成员时会执行
        set(target, key, newValue) {
          console.log("set key:", key, newValue);
          if (target[key] === newValue) {
            return;
          }
          target[key] = newValue;
          document.querySelector("#app").textContent = target[key];
        },
      });
      //测试
      vm.msg = "aaaa";
      console.log(vm.msg);
    </script>
  </body>
</html>
```



## 发布订阅模式

发布订阅模式：订阅者，发布者，信号中心

```
我们假定，存在一个“信号中心”，某个任务执行完成，就向信号中心"发布"(publish)一个信号，其它任务可以向信号中心“订阅”(subscribe)这个信号，从而知道什么时候自己可以开始执行。这就叫做"发布/订阅模式"(publish-subscribe pattern)
```

