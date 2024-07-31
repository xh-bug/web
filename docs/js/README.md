# 笔记

#### this 的四种调用模式

##### 1. 方法调用模式

```js
//方法调用模式
// :当函数作为对象的方法被调用时  this 绑定的时该对象
   // this  方法调用模式
        let obj ={
            value:0,
            increment:function(){
                console.log(this,'对象调用的this');//打印的是 obj 本身 
                this.value++
            }
        }
        window.obj.increment()
        console.log(obj.value,'对象调用的this 中的value');
```



##### 2. 函数调用模式

```js
//当函数不是作为对象的方法而被直接调用时，this通常绑定到全局对象（在浏览器中是window）。在严格模式下（使用'use strict';），this是undefined。
    //this  函数调用模式
        function myFn() {
            console.log(this, '函数的调用中的this');  //打印的是window  
        }
        myFn()

```



##### 3. 构造调用模式

```js
// 当函数通过new关键字被调用时，它作为构造函数，this绑定到新创建的对象。
     // 构造函数调用模式
        function MyConstructor() {
            this.value = 'Hello';
            console.log(this,'MyConstructor的this');
        }
        MyConstructor();  //这里会执行一次 MyConstructor函数  this 打印的是 window   
        let fn = new MyConstructor();  //new 的时候也会执行一次 MyConstructor  但this会指向到 新对象本身  
        console.log(fn.value);   

```



##### 4   应用调用模式  ( 修改this 指向)

```js
//  call apply  bind  这三个方法都可以修改 this的指向
     //  应用调用模式   修改this 指向 (call  apply  bind)
        function greet() {
            console.log('Hello, ' + this.name);
        }
        greet() //出现问题  this.name   本应该报错   最终查出 name 为 window里的内置对象
         let greetobj = { name: 'World' };
        greet.call(greetobj);   //call 修改了  this的指向  本来指向window   修改为指向greetobj 对象 
```



#### call apply bind 的区别

##### 1. call 与 apply 的用法及区别

```js
//call用法   接受多个参数  this 指向改为 第一个参数   其余参作为后续参数  使用call 时 需要列出其参数
      let recinment =function(a,b){
     console.log(this.zh+ a+b); //this为objrecinment.call(obj,"xh",'!') 第一个参数是obj 其余参数需要在函数中依次传入
        }
        let obj={
            zh:"你好"
        }
         //使用 call
        recinment.call(obj,"xh",'!')//参数1  为函数指定的this 指向 


//apply 用法 接受两个参数  this指向 改为第一个参数   第二个参数为一个数组 []

   let fn = function (a) {
            console.log(this.age + a);
        }
        let xh = {
            age: 'xh25'
        }
        let arr = ['岁', '!']
        //使用 apply
        fn.apply(xh, arr)  //与call 同理 只是第二个参数为数组了
```



##### 2. bind的用法 及与 call apply 的区别  

``` js
//bind 与call apply 的区别
//call apply 是同步的  而 bind 是 异步的  会返回一个新函数  需要调用新函数才会触发

function greet(greeting, punctuation) {  
  console.log(this.name + ': ' + greeting + punctuation);  
}  
let obj = { name: 'World' };

// 使用 bind  
var boundGreet = greet.bind(obj, 'Hello');  
boundGreet('!'); // 输出 "World: Hello!"  
  
// 注意，boundGreet 现在是一个新的函数，其 this 已经被绑定到 obj，并且 'Hello' 已经作为预设参数  
boundGreet('?'); // 输出 "World: Hello?"
```



##### 



