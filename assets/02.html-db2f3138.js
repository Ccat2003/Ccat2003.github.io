import{_ as t,p as i,q as n,R as l,Z as e}from"./framework-823c4b5a.js";const a={},s=e(`<h1 id="一文带你浅浅了解浏览器事件循环机制" tabindex="-1"><a class="header-anchor" href="#一文带你浅浅了解浏览器事件循环机制" aria-hidden="true">#</a> 一文带你浅浅了解浏览器事件循环机制</h1><h2 id="导题" tabindex="-1"><a class="header-anchor" href="#导题" aria-hidden="true">#</a> 导题</h2><p>前几天看到这样一个简单的例子，按照常理来分析的话结果应该是一点击按钮后h1内部的内容就发生改变。然而在chrome浏览器上运行这段代码时可以发现在3s以后h1内部的内容才发生改变，这是为啥呢？？？？</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
&lt;head&gt;
    &lt;meta charset=&quot;UTF-8&quot;&gt;
    &lt;meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;IE=edge&quot;&gt;
    &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;&gt;
    &lt;title&gt;Document&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;h1 id=&quot;text&quot;&gt;Hello Ccat&lt;/h1&gt;
    &lt;button id=&quot;btn&quot;&gt;点击切换&lt;/button&gt;
    &lt;script&gt;
        const text = document.getElementById(&quot;text&quot;)
        const btn = document.getElementById(&quot;btn&quot;)

        function Stop(time){
            const now = Date.now()
            while(Date.now()-now &lt; time);
        }

        btn.addEventListener(&quot;click&quot;,()=&gt;{
            console.log(111);
            text.innerText = &quot;你好 懵睡猫&quot;
            Stop(3000)
        })
    &lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>刚刚点击按钮时： <img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ad48b1706fb9430a9ca900e2827956b5~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></p><p>点击按钮3s后： <img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c7e54d84543f4463894f02ecf2835134~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></p><h2 id="浏览器渲染进程与渲染主线程" tabindex="-1"><a class="header-anchor" href="#浏览器渲染进程与渲染主线程" aria-hidden="true">#</a> 浏览器渲染进程与渲染主线程</h2><p>要搞懂这一点，最重要的是要弄懂浏览器的渲染进程是如何处理我们的js代码的。以谷歌浏览器为例，我们的浏览器分为浏览器主进程、网络进程、渲染进程等等。这里重点说一说渲染进程。</p><p align="center"><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ed5e866bddb940969d5c128c4930b80d~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></p>`,9),d=e(`<p>我们的渲染主线程主要为页面提供以下的功能：</p><ol><li><p>解析HTML,CSS文件</p></li><li><p>样式的计算</p></li><li><p>布局</p></li><li><p>js代码在浏览器上的执行</p></li><li><p>1s60次的页面重绘</p><p>......</p></li></ol><h2 id="事件队列及处理机制" tabindex="-1"><a class="header-anchor" href="#事件队列及处理机制" aria-hidden="true">#</a> 事件队列及处理机制</h2><p>这么一看，渲染主线程承担了许许多多的任务，那么他该如何处理任务，怎么样处理才更为准确高效成为一个很重要的问题。浏览器内部采取了这样的机制，渲染主线程一次性只能执行一个任务，而且这个任务一定要执行完，剩下的队列就采用队列的数据结构进行储存。（此处的任务可以表示渲染主线程的任何功能任务，下文可以简单理解为运行js代码段）</p><p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ac39409bdcde4fb384ad3941c32b1649~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></p><p>当渲染主线程的任务完成以后，将会从事件队列中的头部取出第一个任务继续执行。</p><p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5f1100deb63b484199139f6f4f251375~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></p><p>这是个很容易理解的设计理念,但是当我们面对一些异步条件的时候这种机制是否还能保证效率呢？假设我们设置了5s的定时器，如果采取同步的方式那么效果应该是像下面这张图一样，带有定时器的任务在定时以后对主线程的运行造成了阻塞，显然是不符合我们对效率的要求的。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a46fe36aefe746b5ba7f27dbc40ea1c0~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></p><p>于是浏览器选择了异步的事件处理方式。实际上，计时器并不是由渲染主线程来计时的，渲染主线程执行到settimeout代码段后通知浏览器主线程中的计时线程来进行计时。由于只有渲染主线程能够执行js代码，所以当计时时间到达以后计时线程再将回调函数fun放入事件队列队尾。</p><p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/86cbaffef8fe4fb3b4678e9b07e4a508~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></p><p>看到现在，你可能会说开头那段代码顺序还是不能够解释啊？不，我们已经可以来解释开头那段代码了。不过还需要涉及多一个概念————js阻碍渲染。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>const text = document.getElementById(&quot;text&quot;)
const btn = document.getElementById(&quot;btn&quot;)

function Stop(time){
    const now = Date.now()
    while(Date.now()-now &lt; time);
}

btn.addEventListener(&quot;click&quot;,()=&gt;{
    console.log(111);
    text.innerText = &quot;你好 懵睡猫&quot;
    Stop(3000)
})

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当我们执行到text.innerText那一步时，浏览器内部实际上已经收到了我们要修改h1内容的信息，它也确实做了，不过距离我们能够在页面上看到它改变还差一步渲染。这个渲染也作为一个任务被加入到了事件队列的队尾。</p><p>代码执行到了Stop(3000)，浏览器就会不断执行while循环（这不算一种阻塞，因为他在执行js代码），导致不能从事件队列中取出新的任务执行。</p><p>当Stop()函数执行完了以后，渲染主线程终于能够从队列中依次取出事件，直到取到渲染任务以后才终于将我们看到的h1里面的内容更改过来。整个页面重新渲染的过程由于js代码导致无法正常进行，这就是js阻碍渲染。</p><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>还有一个问题，为什么叫事件循环呢？这是因为浏览器源码里面渲染主线程对于事件队列的检测是放在一个循环里面的，渲染主线程不停地对事件队列进行检测。</p><p>对于事件队列，其实浏览器内部对其进行了更为细致的划分，以及微任务的概念，大家如果有兴趣也可以进行了解，后续也会写文进行补充。</p><p>如有不正确的地方，欢迎指出。</p>`,20);function c(p,u){return i(),n("div",null,[s,l(" 我们打开chrome的任务管理器可以看到，浏览器为我们的每一个页面都分配了一定的内存空间资源，也就代表着每一个标签页都是一个独立的渲染进程。渲染进程中的渲染主线程又在其中最为重要。 "),d])}const m=t(a,[["render",c],["__file","02.html.vue"]]);export{m as default};
