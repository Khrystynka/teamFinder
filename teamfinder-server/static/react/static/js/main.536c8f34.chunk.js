(this["webpackJsonpteamfinder-react"]=this["webpackJsonpteamfinder-react"]||[]).push([[0],{46:function(e,t,n){e.exports=n(75)},51:function(e,t,n){},52:function(e,t,n){},75:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),r=n(12),i=n.n(r),c=(n(51),n(33)),l=n(34),s=n(40),u=n(39),m=(n(52),n(22)),h=n(97),p=n(7),g=n(104),d=n(100),f=n(102),b=n(99),v=n(101),w=n(36),E=n.n(w),k=n(37),j=n.n(k),y=n(103),O=Object(h.a)((function(e){return{grow:{flexGrow:1},root:{flexGrow:1},menuButton:{marginRight:e.spacing(1)},title:{},search:Object(m.a)({position:"relative",borderRadius:e.shape.borderRadius,backgroundColor:Object(p.b)(e.palette.common.white,.15),"&:hover":{backgroundColor:Object(p.b)(e.palette.common.white,.25)},marginRight:e.spacing(2),marginLeft:0,width:"100%"},e.breakpoints.up("sm"),{marginLeft:e.spacing(3),width:"auto"}),searchIcon:{padding:e.spacing(0,2),height:"100%",position:"absolute",pointerEvents:"none",display:"flex",alignItems:"center",justifyContent:"center"},inputRoot:{color:"inherit"},inputInput:Object(m.a)({padding:e.spacing(1,1,1,0),paddingLeft:"calc(1em + ".concat(e.spacing(4),"px)"),transition:e.transitions.create("width"),width:"100%"},e.breakpoints.up("md"),{width:"20ch"})}})),N=function(e){var t=O(),n=o.a.createElement(b.a,{color:"inherit",onClick:e.login},e.token?"My account":"Git Login");return o.a.createElement("div",{className:t.root},o.a.createElement(g.a,{position:"static"},o.a.createElement(d.a,null,o.a.createElement(v.a,{edge:"start",className:t.menuButton,color:"inherit","aria-label":"menu"},o.a.createElement(E.a,null)),o.a.createElement(f.a,{variant:"h6",className:t.title},"TeamFinder"),o.a.createElement("div",{className:t.search},o.a.createElement("div",{className:t.searchIcon},o.a.createElement(j.a,null)),o.a.createElement(y.a,{placeholder:"Search team for\u2026",classes:{root:t.inputRoot,input:t.inputInput},inputProps:{"aria-label":"search"}})),o.a.createElement("div",{className:t.grow}),n)))},I=n(38),R=n.n(I),x=function(e){Object(s.a)(n,e);var t=Object(u.a)(n);function n(){var e;Object(c.a)(this,n);for(var a=arguments.length,o=new Array(a),r=0;r<a;r++)o[r]=arguments[r];return(e=t.call.apply(t,[this].concat(o))).state={search_login:"",usertoken:null,auth_user:""},e}return Object(l.a)(n,[{key:"render",value:function(){var e=this;return o.a.createElement("div",{className:"App"},o.a.createElement(N,{token:this.state.usertoken,login:function(){e.state.usertoken?console.log("You are successfully logged in?"):(console.log("not logged in"),R.a.get("http://127.0.0.1:5000/login").then((function(e){console.log(e)})))}}))}}]),n}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(x,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[46,1,2]]]);
//# sourceMappingURL=main.536c8f34.chunk.js.map