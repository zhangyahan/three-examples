import{E as Ke,V as T,M as j,T as I,Q as ye,S as Ee,a as b,P as Ue,b as Xe,A as Fe,B as Ze,c as ve,F as Pe,d as We,e as Ve,f as Be,W as Ge,g as qe}from"./stats.module-14255d6f.js";const we={type:"change"},G={type:"start"},Te={type:"end"};class Qe extends Ke{constructor(y,p){super(),this.object=y,this.domElement=p,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new T,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:j.ROTATE,MIDDLE:j.DOLLY,RIGHT:j.PAN},this.touches={ONE:I.ROTATE,TWO:I.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return s.phi},this.getAzimuthalAngle=function(){return s.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(t){t.addEventListener("keydown",me),this._domElementKeyEvents=t},this.saveState=function(){e.target0.copy(e.target),e.position0.copy(e.object.position),e.zoom0=e.object.zoom},this.reset=function(){e.target.copy(e.target0),e.object.position.copy(e.position0),e.object.zoom=e.zoom0,e.object.updateProjectionMatrix(),e.dispatchEvent(we),e.update(),i=o.NONE},this.update=function(){const t=new T,n=new ye().setFromUnitVectors(y.up,new T(0,1,0)),r=n.clone().invert(),c=new T,h=new ye,R=2*Math.PI;return function(){const ge=e.object.position;t.copy(ge).sub(e.target),t.applyQuaternion(n),s.setFromVector3(t),e.autoRotate&&i===o.NONE&&C(Oe()),e.enableDamping?(s.theta+=u.theta*e.dampingFactor,s.phi+=u.phi*e.dampingFactor):(s.theta+=u.theta,s.phi+=u.phi);let E=e.minAzimuthAngle,P=e.maxAzimuthAngle;return isFinite(E)&&isFinite(P)&&(E<-Math.PI?E+=R:E>Math.PI&&(E-=R),P<-Math.PI?P+=R:P>Math.PI&&(P-=R),E<=P?s.theta=Math.max(E,Math.min(P,s.theta)):s.theta=s.theta>(E+P)/2?Math.max(E,s.theta):Math.min(P,s.theta)),s.phi=Math.max(e.minPolarAngle,Math.min(e.maxPolarAngle,s.phi)),s.makeSafe(),s.radius*=l,s.radius=Math.max(e.minDistance,Math.min(e.maxDistance,s.radius)),e.enableDamping===!0?e.target.addScaledVector(f,e.dampingFactor):e.target.add(f),t.setFromSpherical(s),t.applyQuaternion(r),ge.copy(e.target).add(t),e.object.lookAt(e.target),e.enableDamping===!0?(u.theta*=1-e.dampingFactor,u.phi*=1-e.dampingFactor,f.multiplyScalar(1-e.dampingFactor)):(u.set(0,0,0),f.set(0,0,0)),l=1,w||c.distanceToSquared(e.object.position)>_||8*(1-h.dot(e.object.quaternion))>_?(e.dispatchEvent(we),c.copy(e.object.position),h.copy(e.object.quaternion),w=!1,!0):!1}}(),this.dispose=function(){e.domElement.removeEventListener("contextmenu",he),e.domElement.removeEventListener("pointerdown",pe),e.domElement.removeEventListener("pointercancel",de),e.domElement.removeEventListener("wheel",ue),e.domElement.removeEventListener("pointermove",W),e.domElement.removeEventListener("pointerup",V),e._domElementKeyEvents!==null&&e._domElementKeyEvents.removeEventListener("keydown",me)};const e=this,o={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let i=o.NONE;const _=1e-6,s=new Ee,u=new Ee;let l=1;const f=new T;let w=!1;const m=new b,d=new b,x=new b,M=new b,O=new b,L=new b,S=new b,D=new b,H=new b,a=[],K={};function Oe(){return 2*Math.PI/60/60*e.autoRotateSpeed}function U(){return Math.pow(.95,e.zoomSpeed)}function C(t){u.theta-=t}function X(t){u.phi-=t}const J=function(){const t=new T;return function(r,c){t.setFromMatrixColumn(c,0),t.multiplyScalar(-r),f.add(t)}}(),ee=function(){const t=new T;return function(r,c){e.screenSpacePanning===!0?t.setFromMatrixColumn(c,1):(t.setFromMatrixColumn(c,0),t.crossVectors(e.object.up,t)),t.multiplyScalar(r),f.add(t)}}(),N=function(){const t=new T;return function(r,c){const h=e.domElement;if(e.object.isPerspectiveCamera){const R=e.object.position;t.copy(R).sub(e.target);let F=t.length();F*=Math.tan(e.object.fov/2*Math.PI/180),J(2*r*F/h.clientHeight,e.object.matrix),ee(2*c*F/h.clientHeight,e.object.matrix)}else e.object.isOrthographicCamera?(J(r*(e.object.right-e.object.left)/e.object.zoom/h.clientWidth,e.object.matrix),ee(c*(e.object.top-e.object.bottom)/e.object.zoom/h.clientHeight,e.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),e.enablePan=!1)}}();function v(t){e.object.isPerspectiveCamera?l/=t:e.object.isOrthographicCamera?(e.object.zoom=Math.max(e.minZoom,Math.min(e.maxZoom,e.object.zoom*t)),e.object.updateProjectionMatrix(),w=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),e.enableZoom=!1)}function te(t){e.object.isPerspectiveCamera?l*=t:e.object.isOrthographicCamera?(e.object.zoom=Math.max(e.minZoom,Math.min(e.maxZoom,e.object.zoom/t)),e.object.updateProjectionMatrix(),w=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),e.enableZoom=!1)}function ne(t){m.set(t.clientX,t.clientY)}function Ae(t){S.set(t.clientX,t.clientY)}function oe(t){M.set(t.clientX,t.clientY)}function xe(t){d.set(t.clientX,t.clientY),x.subVectors(d,m).multiplyScalar(e.rotateSpeed);const n=e.domElement;C(2*Math.PI*x.x/n.clientHeight),X(2*Math.PI*x.y/n.clientHeight),m.copy(d),e.update()}function Le(t){D.set(t.clientX,t.clientY),H.subVectors(D,S),H.y>0?v(U()):H.y<0&&te(U()),S.copy(D),e.update()}function Se(t){O.set(t.clientX,t.clientY),L.subVectors(O,M).multiplyScalar(e.panSpeed),N(L.x,L.y),M.copy(O),e.update()}function De(t){t.deltaY<0?te(U()):t.deltaY>0&&v(U()),e.update()}function Ne(t){let n=!1;switch(t.code){case e.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?X(2*Math.PI*e.rotateSpeed/e.domElement.clientHeight):N(0,e.keyPanSpeed),n=!0;break;case e.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?X(-2*Math.PI*e.rotateSpeed/e.domElement.clientHeight):N(0,-e.keyPanSpeed),n=!0;break;case e.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?C(2*Math.PI*e.rotateSpeed/e.domElement.clientHeight):N(e.keyPanSpeed,0),n=!0;break;case e.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?C(-2*Math.PI*e.rotateSpeed/e.domElement.clientHeight):N(-e.keyPanSpeed,0),n=!0;break}n&&(t.preventDefault(),e.update())}function ae(){if(a.length===1)m.set(a[0].pageX,a[0].pageY);else{const t=.5*(a[0].pageX+a[1].pageX),n=.5*(a[0].pageY+a[1].pageY);m.set(t,n)}}function ie(){if(a.length===1)M.set(a[0].pageX,a[0].pageY);else{const t=.5*(a[0].pageX+a[1].pageX),n=.5*(a[0].pageY+a[1].pageY);M.set(t,n)}}function se(){const t=a[0].pageX-a[1].pageX,n=a[0].pageY-a[1].pageY,r=Math.sqrt(t*t+n*n);S.set(0,r)}function Re(){e.enableZoom&&se(),e.enablePan&&ie()}function je(){e.enableZoom&&se(),e.enableRotate&&ae()}function re(t){if(a.length==1)d.set(t.pageX,t.pageY);else{const r=B(t),c=.5*(t.pageX+r.x),h=.5*(t.pageY+r.y);d.set(c,h)}x.subVectors(d,m).multiplyScalar(e.rotateSpeed);const n=e.domElement;C(2*Math.PI*x.x/n.clientHeight),X(2*Math.PI*x.y/n.clientHeight),m.copy(d)}function ce(t){if(a.length===1)O.set(t.pageX,t.pageY);else{const n=B(t),r=.5*(t.pageX+n.x),c=.5*(t.pageY+n.y);O.set(r,c)}L.subVectors(O,M).multiplyScalar(e.panSpeed),N(L.x,L.y),M.copy(O)}function le(t){const n=B(t),r=t.pageX-n.x,c=t.pageY-n.y,h=Math.sqrt(r*r+c*c);D.set(0,h),H.set(0,Math.pow(D.y/S.y,e.zoomSpeed)),v(H.y),S.copy(D)}function Ie(t){e.enableZoom&&le(t),e.enablePan&&ce(t)}function ke(t){e.enableZoom&&le(t),e.enableRotate&&re(t)}function pe(t){e.enabled!==!1&&(a.length===0&&(e.domElement.setPointerCapture(t.pointerId),e.domElement.addEventListener("pointermove",W),e.domElement.addEventListener("pointerup",V)),_e(t),t.pointerType==="touch"?Ce(t):Ye(t))}function W(t){e.enabled!==!1&&(t.pointerType==="touch"?ze(t):He(t))}function V(t){fe(t),a.length===0&&(e.domElement.releasePointerCapture(t.pointerId),e.domElement.removeEventListener("pointermove",W),e.domElement.removeEventListener("pointerup",V)),e.dispatchEvent(Te),i=o.NONE}function de(t){fe(t)}function Ye(t){let n;switch(t.button){case 0:n=e.mouseButtons.LEFT;break;case 1:n=e.mouseButtons.MIDDLE;break;case 2:n=e.mouseButtons.RIGHT;break;default:n=-1}switch(n){case j.DOLLY:if(e.enableZoom===!1)return;Ae(t),i=o.DOLLY;break;case j.ROTATE:if(t.ctrlKey||t.metaKey||t.shiftKey){if(e.enablePan===!1)return;oe(t),i=o.PAN}else{if(e.enableRotate===!1)return;ne(t),i=o.ROTATE}break;case j.PAN:if(t.ctrlKey||t.metaKey||t.shiftKey){if(e.enableRotate===!1)return;ne(t),i=o.ROTATE}else{if(e.enablePan===!1)return;oe(t),i=o.PAN}break;default:i=o.NONE}i!==o.NONE&&e.dispatchEvent(G)}function He(t){switch(i){case o.ROTATE:if(e.enableRotate===!1)return;xe(t);break;case o.DOLLY:if(e.enableZoom===!1)return;Le(t);break;case o.PAN:if(e.enablePan===!1)return;Se(t);break}}function ue(t){e.enabled===!1||e.enableZoom===!1||i!==o.NONE||(t.preventDefault(),e.dispatchEvent(G),De(t),e.dispatchEvent(Te))}function me(t){e.enabled===!1||e.enablePan===!1||Ne(t)}function Ce(t){switch(be(t),a.length){case 1:switch(e.touches.ONE){case I.ROTATE:if(e.enableRotate===!1)return;ae(),i=o.TOUCH_ROTATE;break;case I.PAN:if(e.enablePan===!1)return;ie(),i=o.TOUCH_PAN;break;default:i=o.NONE}break;case 2:switch(e.touches.TWO){case I.DOLLY_PAN:if(e.enableZoom===!1&&e.enablePan===!1)return;Re(),i=o.TOUCH_DOLLY_PAN;break;case I.DOLLY_ROTATE:if(e.enableZoom===!1&&e.enableRotate===!1)return;je(),i=o.TOUCH_DOLLY_ROTATE;break;default:i=o.NONE}break;default:i=o.NONE}i!==o.NONE&&e.dispatchEvent(G)}function ze(t){switch(be(t),i){case o.TOUCH_ROTATE:if(e.enableRotate===!1)return;re(t),e.update();break;case o.TOUCH_PAN:if(e.enablePan===!1)return;ce(t),e.update();break;case o.TOUCH_DOLLY_PAN:if(e.enableZoom===!1&&e.enablePan===!1)return;Ie(t),e.update();break;case o.TOUCH_DOLLY_ROTATE:if(e.enableZoom===!1&&e.enableRotate===!1)return;ke(t),e.update();break;default:i=o.NONE}}function he(t){e.enabled!==!1&&t.preventDefault()}function _e(t){a.push(t)}function fe(t){delete K[t.pointerId];for(let n=0;n<a.length;n++)if(a[n].pointerId==t.pointerId){a.splice(n,1);return}}function be(t){let n=K[t.pointerId];n===void 0&&(n=new b,K[t.pointerId]=n),n.set(t.pageX,t.pageY)}function B(t){const n=t.pointerId===a[0].pointerId?a[1]:a[0];return K[n.pointerId]}e.domElement.addEventListener("contextmenu",he),e.domElement.addEventListener("pointerdown",pe),e.domElement.addEventListener("pointercancel",de),e.domElement.addEventListener("wheel",ue,{passive:!1}),this.update()}}let Y,Z,A,Q,z;const q=[];let $,k;function $e(){Y.aspect=window.innerWidth/window.innerHeight,Y.updateProjectionMatrix(),A.setSize(window.innerWidth,window.innerHeight)}function Je(){Y=new Ue(75,window.innerWidth/window.innerHeight,1,3e3),Y.position.z=1e3,Z=new Xe;const g=new Fe(2e3);Z.add(g),k=new Ze;const y=[],p=[],e=new ve,o=e.load("/three-examples/textures/sprites/raindrop1.png"),i=e.load("/three-examples/textures/sprites/raindrop2.png"),_=e.load("/three-examples/textures/sprites/raindrop3.png"),s=e.load("/three-examples/textures/sprites/raindrop4.png"),u=e.load("/three-examples/textures/sprites/raindrop5.png");for(let l=0;l<1e4;l++){const f=Math.random()*2e3-1e3,w=Math.random()*2e3-1e3,m=Math.random()*2e3-1e3;y.push(f,w,m),p.push((Math.random()-.5)/3,.1+Math.random()/5)}k.setAttribute("position",new Pe(y,3)),k.setAttribute("velocity",new Pe(p,2)),z=[[[1,.2,.5],i,20],[[.95,.1,.5],_,15],[[.9,.05,.5],o,10],[[.85,0,.5],u,8],[[.8,0,.5],s,5]];for(let l=0;l<z.length;l++){const f=z[l][0],w=z[l][1],m=z[l][2];q[l]=new We({size:m,map:w,blending:Ve,depthTest:!1,transparent:!0}),q[l].color.setHSL(...f);const d=new Be(k,q[l]);d.rotation.x=Math.random()*6,d.rotation.y=Math.random()*6,d.rotation.z=Math.random()*6,Z.add(d)}A=new Ge({antialias:!0}),A.setPixelRatio(window.devicePixelRatio),A.setSize(window.innerWidth,window.innerHeight),document.body.appendChild(A.domElement),Q=qe(),document.body.appendChild(Q.dom),$=new Qe(Y,A.domElement),$.update(),document.body.style.touchAction="none",window.addEventListener("resize",$e)}function et(){const g=k.getAttribute("position"),y=k.getAttribute("velocity");for(let p=0;p<g.count;p++){const e=g.getX(p)-y.getX(p),o=g.getY(p)-y.getY(p);g.setX(p,e),g.setY(p,o)}g.needsUpdate=!0,y.needsUpdate=!0,A.render(Z,Y)}function Me(){requestAnimationFrame(Me),et(),$.update(),Q.update()}Je();Me();