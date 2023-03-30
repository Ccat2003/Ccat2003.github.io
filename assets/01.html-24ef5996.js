import{_ as e,p as n,q as i,Z as s}from"./framework-823c4b5a.js";const d={},l=s(`<h1 id="typescript-在编译时出现es版本不够的情况" tabindex="-1"><a class="header-anchor" href="#typescript-在编译时出现es版本不够的情况" aria-hidden="true">#</a> Typescript 在编译时出现ES版本不够的情况</h1><p>代码如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>class Person {
    protected name:  string

    protected age:number
    constructor(name: string,age:number) {
        this.name=name
        this.age=age
    }
    say() {
        console.log(\`我的名字叫\${this.name},我今年\${this.age}岁了\`)
    } 

    set Name(name:string){
        this.name = name
    }

    get Name():string{
        return this.name
    }

    set Age(age:number){
        this.age = age
    }

    get Age():number{
        return this.age
    }


}

class Student extends Person{
    say() {
        console.log(\`我的名字叫\${this.name},我今年\${this.Age}岁了,我是一个学生\`)
    }

}

const Tom = new Student(&quot;Tom&quot;,15)

Tom.Age = 19

Tom.say()


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输入tsc编译指令之后发生如下报错</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>PS C:\\My_Program\\Typescript\\basic\\chapter02&gt; tsc .\\test.ts
test.ts:13:9 - error TS1056: Accessors are only available when targeting ECMAScript 5 and higher.

13     set Name(name:string){
           ~~~~

test.ts:17:9 - error TS1056: Accessors are only available when targeting ECMAScript 5 and higher.

17     get Name():string{
           ~~~~

test.ts:21:9 - error TS1056: Accessors are only available when targeting ECMAScript 5 and higher.

21     set Age(age:number){
           ~~~

test.ts:25:9 - error TS1056: Accessors are only available when targeting ECMAScript 5 and higher.

25     get Age():number{
           ~~~


Found 4 errors in the same file, starting at: test.ts:13

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>报错原因：在TypeScript中使用set/get存取器，需要将编译器设置为输出ECMAScript5或更高。不支持降级到ECMAScript3。</p><p>解决方案有两种，一是通过指定ES版本来进行编译</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>tsc test.ts -t es5 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果是在项目中，则可以通过ts的编译配置文件来进行编译后js版本</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
  &quot;compilerOptions&quot;: {
    &quot;target&quot;: &quot;es5&quot;
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>详情可以看看stackoverflow上的讨论：https://stackoverflow.com/questions/41010780/accessors-are-only-available-when-targeting-ecmascript-5-and-higher</p>`,11),a=[l];function r(v,t){return n(),i("div",null,a)}const m=e(d,[["render",r],["__file","01.html.vue"]]);export{m as default};
