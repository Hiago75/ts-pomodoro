(this["webpackJsonpts-pomodoro"]=this["webpackJsonpts-pomodoro"]||[]).push([[0],[,,,,,,,,,,function(t,e,c){},function(t,e,c){},function(t,e,c){},,function(t,e,c){},function(t,e,c){"use strict";c.r(e);var n=c(0),o=c.n(n),s=c(5),r=c.n(s),i=(c(10),c(2)),a=(c(11),c(4));c(12);var u=c(1);function l(t){return Object(u.jsx)("button",{onClick:t.onClick,className:t.className,children:t.text})}c(14);var j=function(t){return Math.floor(t).toString().padStart(2,"0")};function b(t){var e=j(t/60%60),c=j(t%60%60);return"".concat(e,":").concat(c)}function m(t){return Object(u.jsx)("div",{className:"timer",children:b(t.mainTime)})}var d=c.p+"static/media/bell-start.d01df824.mp3",O=c.p+"static/media/bell-finish.6b59c479.mp3";function f(t){var e=j(t/3600),c=j(t/60%60),n=j(t%60%60);return"".concat(e,":").concat(c,":").concat(n)}function p(t){var e=Object(n.useState)(t.pomodoroTime),c=Object(i.a)(e,2),o=c[0],s=c[1],r=Object(n.useState)(!1),j=Object(i.a)(r,2),p=j[0],h=j[1],x=Object(n.useState)(!1),v=Object(i.a)(x,2),k=v[0],T=v[1],S=Object(n.useState)(!1),g=Object(i.a)(S,2),w=g[0],y=g[1],C=Object(n.useState)(new Array(t.cycles-1).fill(!0)),N=Object(i.a)(C,2),R=N[0],E=N[1],I=Object(n.useState)(0),A=Object(i.a)(I,2),B=A[0],J=A[1],L=Object(n.useState)(0),M=Object(i.a)(L,2),H=M[0],P=M[1],W=Object(n.useState)(0),q=Object(i.a)(W,2),z=q[0],D=q[1],F=Object(a.a)(d),G=Object(i.a)(F,1)[0],K=Object(a.a)(O),Q=Object(i.a)(K,1)[0];!function(t,e){var c=Object(n.useRef)();Object(n.useEffect)((function(){c.current=t}),[t]),Object(n.useEffect)((function(){if(null!==e){var t=setInterval((function(){c.current&&c.current()}),e);return function(){return clearInterval(t)}}}),[e])}((function(){s(o-1),k&&P(H+1)}),p?1e3:null);var U=Object(n.useCallback)((function(){h(!0),y(!1),G(),T(!0),s(t.pomodoroTime)}),[h,y,G,T,s,t.pomodoroTime]),V=Object(n.useCallback)((function(e){h(!0),T(!1),y(!0),Q(),s(e?t.longRestTime:t.shortRestTime)}),[h,T,y,Q,s,t.longRestTime,t.shortRestTime]);return Object(n.useEffect)((function(){k&&document.body.classList.add("working"),w&&document.body.classList.remove("working"),(k||w)&&(document.title="".concat(k?"Time to work":"Time to rest"," - ").concat(b(o))),o>0||(k&&R.length>0?(V(!1),R.pop()):k&&R.length<=0&&(V(!0),E(new Array(t.cycles-1).fill(!0)),J(B+1)),k&&D(z+1),w&&U())}),[k,w,o,R,z,B,V,E,D,U,t.cycles]),Object(u.jsxs)("div",{className:"pomodoro",children:[Object(u.jsxs)("h4",{children:["It`s time to ",k?"work":"rest"]}),Object(u.jsx)(m,{mainTime:o}),Object(u.jsxs)("div",{className:"controls",children:[Object(u.jsx)(l,{text:"Work",onClick:function(){return U()}}),Object(u.jsx)(l,{text:"Rest",onClick:function(){return V(!1)}}),Object(u.jsx)(l,{className:k||w?"":"hidden",text:p?"Pause":"Back to work",onClick:function(){return h(!p)}})]}),Object(u.jsxs)("div",{className:"details",children:[Object(u.jsxs)("p",{children:["Completed cycles: ",B]}),Object(u.jsxs)("p",{children:["Hours working: ",f(H)]}),Object(u.jsxs)("p",{children:["Completed pomodoros: ",z]})]})]})}var h=function(){return Object(u.jsx)("div",{className:"container",children:Object(u.jsx)(p,{pomodoroTime:1500,shortRestTime:300,longRestTime:900,cycles:4})})};r.a.render(Object(u.jsx)(o.a.StrictMode,{children:Object(u.jsx)(h,{})}),document.getElementById("root"))}],[[15,1,2]]]);
//# sourceMappingURL=main.ea4fc792.chunk.js.map