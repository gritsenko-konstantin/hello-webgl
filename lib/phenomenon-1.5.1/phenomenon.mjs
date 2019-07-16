var t=["x","y","z"],e=function(t){Object.assign(this,{uniforms:{},geometry:{vertices:[{x:0,y:0,z:0}]},mode:0,modifiers:{},attributes:[],multiplier:1,buffers:[]}),Object.assign(this,t),this.prepareProgram(),this.prepareUniforms(),this.prepareAttributes()};e.prototype.compileShader=function(t,e){var i=this.gl.createShader(t);return this.gl.shaderSource(i,e),this.gl.compileShader(i),i},e.prototype.prepareProgram=function(){var t=this.gl,e=this.vertex,i=this.fragment,r=t.createProgram();t.attachShader(r,this.compileShader(35633,e)),t.attachShader(r,this.compileShader(35632,i)),t.linkProgram(r),t.useProgram(r),this.program=r},e.prototype.prepareUniforms=function(){for(var t=Object.keys(this.uniforms),e=0;e<t.length;e+=1){var i=this.gl.getUniformLocation(this.program,t[e]);this.uniforms[t[e]].location=i}},e.prototype.prepareAttributes=function(){void 0!==this.geometry.vertices&&this.attributes.push({name:"aPosition",size:3}),void 0!==this.geometry.normal&&this.attributes.push({name:"aNormal",size:3}),this.attributeKeys=[];for(var t=0;t<this.attributes.length;t+=1)this.attributeKeys.push(this.attributes[t].name),this.prepareAttribute(this.attributes[t])},e.prototype.prepareAttribute=function(e){for(var i=this.geometry,r=this.multiplier,s=i.vertices,n=i.normal,a=new Float32Array(r*s.length*e.size),o=0;o<r;o+=1)for(var h=e.data&&e.data(o,r),u=o*s.length*e.size,f=0;f<s.length;f+=1)for(var c=0;c<e.size;c+=1){var l=this.modifiers[e.name];a[u]=void 0!==l?l(h,f,c,this):"aPosition"===e.name?s[f][t[c]]:"aNormal"===e.name?n[f][t[c]]:h[c],u+=1}this.attributes[this.attributeKeys.indexOf(e.name)].data=a,this.prepareBuffer(this.attributes[this.attributeKeys.indexOf(e.name)])},e.prototype.prepareBuffer=function(t){var e=t.data,i=t.name,r=t.size,s=this.gl.createBuffer();this.gl.bindBuffer(34962,s),this.gl.bufferData(34962,e,35044);var n=this.gl.getAttribLocation(this.program,i);this.gl.enableVertexAttribArray(n),this.gl.vertexAttribPointer(n,r,5126,!1,0,0),this.buffers[this.attributeKeys.indexOf(t.name)]={buffer:s,location:n,size:r}},e.prototype.render=function(t){var e=this,i=this.uniforms,r=this.multiplier,s=this.gl;s.useProgram(this.program);for(var n=0;n<this.buffers.length;n+=1){var a=this.buffers[n],o=a.location,h=a.buffer,u=a.size;s.enableVertexAttribArray(o),s.bindBuffer(34962,h),s.vertexAttribPointer(o,u,5126,!1,0,0)}Object.keys(t).forEach(function(e){i[e].value=t[e].value}),Object.keys(i).forEach(function(t){var r=i[t];e.uniformMap[r.type](r.location,r.value)}),s.drawArrays(this.mode,0,r*this.geometry.vertices.length),this.onRender&&this.onRender(this)},e.prototype.destroy=function(){for(var t=0;t<this.buffers.length;t+=1)this.gl.deleteBuffer(this.buffers[t].buffer);this.gl.deleteProgram(this.program),this.gl=null};var i=function(t){var e=this,i=t||{},r=i.canvas;void 0===r&&(r=document.querySelector("canvas"));var s=i.context;void 0===s&&(s={});var n=i.contextType;void 0===n&&(n="experimental-webgl");var a=i.settings;void 0===a&&(a={});var o=r.getContext(n,Object.assign({alpha:!1,antialias:!1},s));Object.assign(this,{gl:o,canvas:r,uniforms:{},instances:new Map,shouldRender:!0}),Object.assign(this,{devicePixelRatio:1,clearColor:[1,1,1,1],position:{x:0,y:0,z:2}}),Object.assign(this,a),this.uniformMap={float:function(t,e){return o.uniform1f(t,e)},vec2:function(t,e){return o.uniform2fv(t,e)},vec3:function(t,e){return o.uniform3fv(t,e)},vec4:function(t,e){return o.uniform4fv(t,e)},mat2:function(t,e){return o.uniformMatrix2fv(t,!1,e)},mat3:function(t,e){return o.uniformMatrix3fv(t,!1,e)},mat4:function(t,e){return o.uniformMatrix4fv(t,!1,e)}},o.enable(o.DEPTH_TEST),o.depthFunc(o.LEQUAL),!1===o.getContextAttributes().alpha&&(o.clearColor.apply(o,this.clearColor),o.clearDepth(1)),this.onSetup&&this.onSetup(o),window.addEventListener("resize",function(){return e.resize()}),this.resize(),this.render()};i.prototype.resize=function(){var t=this.gl,e=this.canvas,i=this.devicePixelRatio,r=this.position;e.width=e.clientWidth*i,e.height=e.clientHeight*i;var s=t.drawingBufferWidth,n=t.drawingBufferHeight,a=s/n;t.viewport(0,0,s,n);var o=Math.tan(Math.PI/180*22.5),h=[1,0,0,0,0,1,0,0,0,0,1,0,r.x,r.y,(a<1?1:a)*-r.z,1];this.uniforms.uProjectionMatrix={type:"mat4",value:[.5/o,0,0,0,0,a/o*.5,0,0,0,0,-100.001/99.999,-1,0,0,.001/99.999*-200,0]},this.uniforms.uViewMatrix={type:"mat4",value:[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]},this.uniforms.uModelMatrix={type:"mat4",value:h}},i.prototype.toggle=function(t){t!==this.shouldRender&&(this.shouldRender=void 0!==t?t:!this.shouldRender,this.shouldRender&&this.render())},i.prototype.render=function(){var t=this;this.gl.clear(16640),this.instances.forEach(function(e){e.render(t.uniforms)}),this.onRender&&this.onRender(this),this.shouldRender&&requestAnimationFrame(function(){return t.render()})},i.prototype.add=function(t,i){void 0===i&&(i={uniforms:{}}),void 0===i.uniforms&&(i.uniforms={}),Object.assign(i.uniforms,JSON.parse(JSON.stringify(this.uniforms))),Object.assign(i,{gl:this.gl,uniformMap:this.uniformMap});var r=new e(i);return this.instances.set(t,r),r},i.prototype.remove=function(t){var e=this.instances.get(t);void 0!==e&&(e.destroy(),this.instances.delete(t))},i.prototype.destroy=function(){var t=this;this.instances.forEach(function(e,i){e.destroy(),t.instances.delete(i)}),this.toggle(!1)};export default i;