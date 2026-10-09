"use strict";

/* ============================
   LIBRARIES (Finsweet & Motion One)
   ============================ */
// Finsweet Attributes (Modal) & Motion One logic are loaded here
(function () { var qe = Object.create; var ie = Object.defineProperty; var Ge = Object.getOwnPropertyDescriptor; var Xe = Object.getOwnPropertyNames; var We = Object.getPrototypeOf, ze = Object.prototype.hasOwnProperty; var Ze = (r, e) => () => (e || r((e = { exports: {} }).exports, e), e.exports); var Qe = (r, e, t, n) => { if (e && typeof e == "object" || typeof e == "function") for (let o of Xe(e)) !ze.call(r, o) && o !== t && ie(r, o, { get: () => e[o], enumerable: !(n = Ge(e, o)) || n.enumerable }); return r }; var Je = (r, e, t) => (t = r != null ? qe(We(r)) : {}, Qe(e || !r || !r.__esModule ? ie(t, "default", { value: r, enumerable: !0 }) : t, r)); var Ke = Ze((xr, Be) => { Be.exports = wt; function wt(r, e, t, n) { var o, a, i; return function () { if (i = this, a = Array.prototype.slice.call(arguments), o && (t || n)) return; if (!t) return d(), o = setTimeout(f, e), o; o = setTimeout(d, e), r.apply(i, a); function f() { d(), r.apply(i, a) } function d() { clearTimeout(o), o = null } } } }); var I = "fs-attributes"; var B = "a11y", ae = "accordion"; var se = "cmsattribute"; var ce = "inputcounter"; var ue = "modal"; var $ = "support"; var le = async (...r) => { var t; let e = []; for (let n of r) { let o = await ((t = window.fsAttributes[n]) == null ? void 0 : t.loading); e.push(o) } return e }; var w = () => { }; function V(r, e, t, n) { return r ? (r.addEventListener(e, t, n), () => r.removeEventListener(e, t, n)) : w } var j = r => r instanceof Element; var q = r => r != null; var K = r => typeof r == "string"; var G = (r, e) => (Array.isArray(e) || (e = [e]), e.map(n => r.dispatchEvent(new Event(n, { bubbles: !0 }))).every(n => n)); var X = r => !!(r.offsetWidth || r.offsetHeight || r.getClientRects().length); function fe(r, e, t) { var o; let n = window.fsAttributes[r]; return n.destroy = t || w, (o = n.resolve) == null || o.call(n, e), e } var de = (r, e = "1", t = "iife") => { let o = `${r}${t === "esm" ? "esm" : ""}.js`; return `https://cdn.jsdelivr.net/npm/@finsweet/attributes-${r}@${e}/${o}` }; var et = `${I}-${$}`, be = async () => { var o; let { fsAttributes: r, location: e } = window, { host: t, searchParams: n } = new URL(e.href); return !t.includes("webflow.io") || !n.has(et) ? !1 : (o = r.import) == null ? void 0 : o.call(r, $, "1") }; var pe = r => { let e = (o, a, i) => { let l = r[o], { key: f, values: d } = l, E; if (!a) return `[${f}]`; let A = d == null ? void 0 : d[a]; K(A) ? E = A : E = A(i && "instanceIndex" in i ? i.instanceIndex : void 0); let y = i && "caseInsensitive" in i && i.caseInsensitive ? "i" : ""; if (!(i != null && i.operator)) return `[${f}="${E}"${y}]`; switch (i.operator) { case "prefixed": return `[${f}^="${E}"${y}]`; case "suffixed": return `[${f}$="${E}"${y}]`; case "contains": return `[${f}*="${E}"${y}]` } }; function t(o, a) { let i = e("element", o, a), l = (a == null ? void 0 : a.scope) || document; return a != null && a.all ? [...l.querySelectorAll(i)] : l.querySelector(i) } return [e, t, (o, a) => { let i = r[a]; return i ? o.getAttribute(i.key) : null }] }; var _ = { preventLoad: { key: `${I}-preventload` }, debugMode: { key: `${I}-debug` }, src: { key: "src", values: { finsweet: "@finsweet/attributes" } }, dev: { key: `${I}-dev` } }, [W, cr] = pe(_); var me = r => { let { currentScript: e } = document, t = {}; if (!e) return { attributes: t, preventsLoad: !1 }; let o = { preventsLoad: K(e.getAttribute(_.preventLoad.key)), attributes: t }; for (let a in r) { let i = e.getAttribute(r[a]); o.attributes[a] = i } return o }; var Te = ({ scriptAttributes: r, attributeKey: e, version: t, init: n }) => { var l; tt(), (l = window.fsAttributes)[e] || (l[e] = {}); let { preventsLoad: o, attributes: a } = me(r), i = window.fsAttributes[e]; i.version = t, i.init = n, o || (window.Webflow || (window.Webflow = []), window.Webflow.push(() => n(a))) }, tt = () => { let r = nt(); if (window.fsAttributes && !Array.isArray(window.fsAttributes)) { z(window.fsAttributes, r); return } let e = rt(r); z(e, r), ot(e), window.fsAttributes = e, window.FsAttributes = window.fsAttributes, be() }, rt = r => { let e = { cms: {}, push(...t) { var n, o; for (let [a, i] of t) (o = (n = this[a]) == null ? void 0 : n.loading) == null || o.then(i) }, async import(t, n) { let o = e[t]; return o || new Promise(a => { let i = document.createElement("script"); i.src = de(t, n), i.async = !0, i.onload = () => { let [l] = z(e, [t]); a(l) }, document.head.append(i) }) }, destroy() { var t, n; for (let o of r) (n = (t = window.fsAttributes[o]) == null ? void 0 : t.destroy) == null || n.call(t) } }; return e }, nt = () => { let r = W("src", "finsweet", { operator: "contains" }), e = W("dev"); return [...document.querySelectorAll(`script${r}, script${e}`)].reduce((o, a) => { var l; let i = a.getAttribute(_.dev.key) || ((l = a.src.match(/[\w-. ]+(?=(\.js)$)/)) == null ? void 0 : l[0]); return i && !o.includes(i) && o.push(i), o }, []) }, z = (r, e) => e.map(n => { let o = r[n]; return o || (r[n] = {}, o = r[n], o.loading = new Promise(a => { o.resolve = i => { a(i), delete o.resolve } }), o) }), ot = r => { let e = Array.isArray(window.fsAttributes) ? window.fsAttributes : []; r.push(...e) }; })();

/* ============================
   PROJECT MODAL POPULATION
   ============================ */
document.querySelectorAll('[fs-modal-element="open"]').forEach(card => {
  card.addEventListener('click', (e) => {
    // If clicking a link within the card, don't open the modal
    if (e.target.closest('a')) return;

    const title = card.querySelector('.project-title').textContent;
    const desc = card.querySelector('.project-desc').textContent;
    const img = card.querySelector('.project-img').src;
    const tags = card.querySelector('.project-tags').innerHTML;
    const repoLink = card.querySelector('a')?.href || "https://github.com/vivekmenon2004";

    document.getElementById('modal-project-title').textContent = title;
    document.getElementById('modal-project-desc').textContent = desc;
    document.getElementById('modal-project-img').src = img;
    document.getElementById('modal-project-tags').innerHTML = tags;
    document.getElementById('modal-project-link').href = repoLink;
  });
});

/* ============================
   WEBGL FLUID SIMULATION
   ============================ */
(function initFluidSimulation() {
  const canvas = document.getElementById('fluid-canvas');
  if (!canvas) return;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  const params = {
    SIM_RESOLUTION: 128,
    DYE_RESOLUTION: 1024,
    DENSITY_DISSIPATION: 0.98,
    VELOCITY_DISSIPATION: 0.98,
    PRESSURE_DISSIPATION: 0.8,
    PRESSURE_ITERATIONS: 24,
    CURL: 20,
    SPLAT_RADIUS: 0.05, // Ultra-Fine needle-thin flow
    SHADING: true,
    COLORFUL: false,
    PAUSED: false,
    BACK_COLOR: { r: 0, g: 0, b: 0 },
    TRANSPARENT: true,
  };

  function PointerPrototype() {
    this.id = -1;
    this.x = 0;
    this.y = 0;
    this.dx = 0;
    this.dy = 0;
    this.down = false;
    this.moved = false;
    this.color = [30, 0, 300];
  }

  let pointers = [new PointerPrototype()];
  let velocity, divergence, pressure, dye;

  try {
    const result = getWebGLContext(canvas);
    if (!result) throw new Error("WebGL Context Failure");
    const { gl, ext } = result;

    function getWebGLContext(canvas) {
      const glParams = { alpha: true, depth: false, stencil: false, antialias: false, preserveDrawingBuffer: false };
      let gl = canvas.getContext('webgl2', glParams);
      const isWebGL2 = !!gl;
      if (!isWebGL2) gl = canvas.getContext('webgl', glParams) || canvas.getContext('experimental-webgl', glParams);
      if (!gl) return null;

      let halfFloat;
      let supportLinearFiltering;
      if (isWebGL2) {
        gl.getExtension('EXT_color_buffer_float');
        supportLinearFiltering = gl.getExtension('OES_texture_float_linear');
      } else {
        halfFloat = gl.getExtension('OES_texture_half_float');
        supportLinearFiltering = gl.getExtension('OES_texture_half_float_linear');
      }

      gl.clearColor(0.0, 0.0, 0.0, 0.0);

      const halfFloatTexType = isWebGL2 ? gl.HALF_FLOAT : (halfFloat ? halfFloat.HALF_FLOAT_OES : gl.UNSIGNED_BYTE);
      let formatRGBA = getSupportedFormat(gl, isWebGL2 ? gl.RGBA16F : gl.RGBA, gl.RGBA, halfFloatTexType);
      let formatRG = getSupportedFormat(gl, isWebGL2 ? gl.RG16F : gl.RGBA, isWebGL2 ? gl.RG : gl.RGBA, halfFloatTexType);
      let formatR = getSupportedFormat(gl, isWebGL2 ? gl.R16F : gl.RGBA, isWebGL2 ? gl.RED : gl.RGBA, halfFloatTexType);

      return { gl, ext: { formatRGBA, formatRG, formatR, halfFloatTexType, supportLinearFiltering } };
    }

    function getSupportedFormat(gl, internalFormat, format, type) {
      if (!supportRenderTextureFormat(gl, internalFormat, format, type)) {
        switch (internalFormat) {
          case gl.R16F: return getSupportedFormat(gl, gl.RG16F, gl.RG, type);
          case gl.RG16F: return getSupportedFormat(gl, gl.RGBA16F, gl.RGBA, type);
          default: return null;
        }
      }
      return { internalFormat, format };
    }

    function supportRenderTextureFormat(gl, internalFormat, format, type) {
      let texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, 4, 4, 0, format, type, null);
      let fbo = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
      return gl.checkFramebufferStatus(gl.FRAMEBUFFER) == gl.FRAMEBUFFER_COMPLETE;
    }

    function compileShader(type, source) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) console.error(gl.getShaderInfoLog(shader));
      return shader;
    }

    function createProgram(vertexShader, fragmentShader) {
      let program = gl.createProgram();
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) console.error(gl.getProgramInfoLog(program));
      return program;
    }

    function getUniforms(program) {
      let uniforms = [];
      let uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
      for (let i = 0; i < uniformCount; i++) {
        let name = gl.getActiveUniform(program, i).name;
        uniforms[name] = gl.getUniformLocation(program, name);
      }
      return uniforms;
    }

    class Program {
      constructor(vertexShader, fragmentShader) {
        this.program = createProgram(vertexShader, fragmentShader);
        this.uniforms = getUniforms(this.program);
      }
      bind() { gl.useProgram(this.program); }
    }

    const baseVertexShader = compileShader(gl.VERTEX_SHADER, `
        precision highp float;
        attribute vec2 aPosition;
        varying vec2 vUv;
        varying vec2 vL;
        varying vec2 vR;
        varying vec2 vT;
        varying vec2 vB;
        uniform vec2 texelSize;
        void main () {
            vUv = aPosition * 0.5 + 0.5;
            vL = vUv - vec2(texelSize.x, 0.0);
            vR = vUv + vec2(texelSize.x, 0.0);
            vT = vUv + vec2(0.0, texelSize.y);
            vB = vUv - vec2(0.0, texelSize.y);
            gl_Position = vec4(aPosition, 0.0, 1.0);
        }
    `);

    const splatShader = new Program(baseVertexShader, compileShader(gl.FRAGMENT_SHADER, `
        precision highp float;
        precision highp sampler2D;
        varying vec2 vUv;
        uniform sampler2D uTarget;
        uniform float aspect;
        uniform vec3 color;
        uniform vec2 point;
        uniform float radius;
        void main () {
            vec2 p = vUv - point.xy;
            p.x *= aspect;
            vec3 splat = exp(-dot(p, p) / radius) * color;
            vec3 base = texture2D(uTarget, vUv).xyz;
            gl_FragColor = vec4(base + splat, 1.0);
        }
    `));

    const divergenceShader = new Program(baseVertexShader, compileShader(gl.FRAGMENT_SHADER, `
        precision highp float;
        precision highp sampler2D;
        varying vec2 vUv;
        varying vec2 vL;
        varying vec2 vR;
        varying vec2 vT;
        varying vec2 vB;
        uniform sampler2D uVelocity;
        void main () {
            float L = texture2D(uVelocity, vL).x;
            float R = texture2D(uVelocity, vR).x;
            float T = texture2D(uVelocity, vT).y;
            float B = texture2D(uVelocity, vB).y;
            float div = 0.5 * (R - L + T - B);
            gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
        }
    `));

    const pressureShader = new Program(baseVertexShader, compileShader(gl.FRAGMENT_SHADER, `
        precision highp float;
        precision highp sampler2D;
        varying vec2 vUv;
        varying vec2 vL;
        varying vec2 vR;
        varying vec2 vT;
        varying vec2 vB;
        uniform sampler2D uPressure;
        uniform sampler2D uDivergence;
        void main () {
            float L = texture2D(uPressure, vL).x;
            float R = texture2D(uPressure, vR).x;
            float T = texture2D(uPressure, vT).x;
            float B = texture2D(uPressure, vB).x;
            float div = texture2D(uDivergence, vUv).x;
            float pressure = (L + R + B + T - div) * 0.25;
            gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
        }
    `));

    const gradientSubtractShader = new Program(baseVertexShader, compileShader(gl.FRAGMENT_SHADER, `
        precision highp float;
        precision highp sampler2D;
        varying vec2 vUv;
        varying vec2 vL;
        varying vec2 vR;
        varying vec2 vT;
        varying vec2 vB;
        uniform sampler2D uPressure;
        uniform sampler2D uVelocity;
        void main () {
            float L = texture2D(uPressure, vL).x;
            float R = texture2D(uPressure, vR).x;
            float T = texture2D(uPressure, vT).x;
            float B = texture2D(uPressure, vB).x;
            vec2 vel = texture2D(uVelocity, vUv).xy;
            vel.xy -= vec2(R - L, T - B) * 0.5;
            gl_FragColor = vec4(vel, 0.0, 1.0);
        }
    `));

    const advectionShader = new Program(baseVertexShader, compileShader(gl.FRAGMENT_SHADER, `
        precision highp float;
        precision highp sampler2D;
        varying vec2 vUv;
        uniform sampler2D uVelocity;
        uniform sampler2D uSource;
        uniform vec2 texelSize;
        uniform float dt;
        uniform float dissipation;
        void main () {
            vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
            gl_FragColor = dissipation * texture2D(uSource, coord);
        }
    `));

    const displayShader = new Program(baseVertexShader, compileShader(gl.FRAGMENT_SHADER, `
        precision highp float;
        precision highp sampler2D;
        varying vec2 vUv;
        uniform sampler2D uTexture;
        void main () {
            vec3 c = texture2D(uTexture, vUv).rgb;
            float a = max(c.r, max(c.g, c.b));
            gl_FragColor = vec4(c, a);
        }
    `));

    function createFBO(w, h, internalFormat, format, type, param) {
      gl.activeTexture(gl.TEXTURE0);
      let texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, param);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, param);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null);
      let fbo = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
      return { texture, fbo, width: w, height: h, texelSizeX: 1.0 / w, texelSizeY: 1.0 / h, attach(id) { gl.activeTexture(gl.TEXTURE0 + id); gl.bindTexture(gl.TEXTURE_2D, texture); return id; } };
    }

    function createDoubleFBO(w, h, internalFormat, format, type, param) {
      let fbo1 = createFBO(w, h, internalFormat, format, type, param);
      let fbo2 = createFBO(w, h, internalFormat, format, type, param);
      return { width: w, height: h, texelSizeX: fbo1.texelSizeX, texelSizeY: fbo1.texelSizeY, get read() { return fbo1; }, set read(v) { fbo1 = v; }, get write() { return fbo2; }, set write(v) { fbo2 = v; }, swap() { let t = fbo1; fbo1 = fbo2; fbo2 = t; } };
    }

    function initFramebuffers() {
      let simRes = getResolution(params.SIM_RESOLUTION);
      let dyeRes = getResolution(params.DYE_RESOLUTION);
      const texType = ext.halfFloatTexType;
      velocity = createDoubleFBO(simRes.width, simRes.height, ext.formatRG.internalFormat, ext.formatRG.format, texType, ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST);
      divergence = createFBO(simRes.width, simRes.height, ext.formatR.internalFormat, ext.formatR.format, texType, gl.NEAREST);
      pressure = createDoubleFBO(simRes.width, simRes.height, ext.formatR.internalFormat, ext.formatR.format, texType, gl.NEAREST);
      dye = createDoubleFBO(dyeRes.width, dyeRes.height, ext.formatRGBA.internalFormat, ext.formatRGBA.format, texType, ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST);
    }

    function getResolution(resolution) {
      let aspectRatio = gl.drawingBufferWidth / gl.drawingBufferHeight;
      if (aspectRatio < 1) aspectRatio = 1.0 / aspectRatio;
      let minRes = resolution;
      let maxRes = Math.round(resolution * aspectRatio);
      return gl.drawingBufferWidth > gl.drawingBufferHeight ? { width: maxRes, height: minRes } : { width: minRes, height: maxRes };
    }

    function blit(target) {
      if (target == null) {
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      } else {
        gl.viewport(0, 0, target.width, target.height);
        gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
      }
      gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
    }

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(0);

    initFramebuffers();

    let lastUpdate = Date.now();
    function update() {
      const dt = Math.min((Date.now() - lastUpdate) / 1000, 0.016);
      lastUpdate = Date.now();
      gl.disable(gl.BLEND);
      divergenceShader.bind();
      gl.uniform2f(divergenceShader.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(divergenceShader.uniforms.uVelocity, velocity.read.attach(0));
      blit(divergence);
      pressureShader.bind();
      gl.uniform2f(pressureShader.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(pressureShader.uniforms.uDivergence, divergence.attach(0));
      for (let i = 0; i < params.PRESSURE_ITERATIONS; i++) {
        gl.uniform1i(pressureShader.uniforms.uPressure, pressure.read.attach(1));
        blit(pressure.write);
        pressure.swap();
      }
      gradientSubtractShader.bind();
      gl.uniform2f(gradientSubtractShader.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(gradientSubtractShader.uniforms.uPressure, pressure.read.attach(0));
      gl.uniform1i(gradientSubtractShader.uniforms.uVelocity, velocity.read.attach(1));
      blit(velocity.write);
      velocity.swap();
      advectionShader.bind();
      gl.uniform2f(advectionShader.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(advectionShader.uniforms.uVelocity, velocity.read.attach(0));
      gl.uniform1i(advectionShader.uniforms.uSource, velocity.read.attach(0));
      gl.uniform1f(advectionShader.uniforms.dt, dt);
      gl.uniform1f(advectionShader.uniforms.dissipation, params.VELOCITY_DISSIPATION);
      blit(velocity.write);
      velocity.swap();
      gl.uniform1i(advectionShader.uniforms.uSource, dye.read.attach(1));
      gl.uniform1f(advectionShader.uniforms.dissipation, params.DENSITY_DISSIPATION);
      blit(dye.write);
      dye.swap();
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
      displayShader.bind();
      gl.uniform1i(displayShader.uniforms.uTexture, dye.read.attach(0));
      blit(null);
      requestAnimationFrame(update);
    }

    function splat(x, y, dx, dy, color) {
      splatShader.bind();
      gl.uniform1i(splatShader.uniforms.uTarget, velocity.read.attach(0));
      gl.uniform1f(splatShader.uniforms.aspect, canvas.width / canvas.height);
      gl.uniform2f(splatShader.uniforms.point, x / canvas.width, 1.0 - y / canvas.height);
      gl.uniform3f(splatShader.uniforms.color, dx, -dy, 1.0);
      gl.uniform1f(splatShader.uniforms.radius, params.SPLAT_RADIUS / 100.0);
      blit(velocity.write);
      velocity.swap();
      gl.uniform1i(splatShader.uniforms.uTarget, dye.read.attach(0));
      gl.uniform3f(splatShader.uniforms.color, color.r, color.g, color.b);
      blit(dye.write);
      dye.swap();
    }

    // Ambient Smoke Logic (Cool Tones: 85% Opacity)
    setInterval(() => {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const dx = (Math.random() - 0.5) * 60;
      const dy = (Math.random() - 0.5) * 60;
      const colors = [
        { r: 0.10, g: 0.85, b: 0.85 }, // Cyan (85%)
        { r: 0.0, g: 0.65, b: 0.53 }, // Teal (~85%)
        { r: 0.10, g: 0.38, b: 0.85 }, // Blue (85%)
        { r: 0.53, g: 0.13, b: 0.85 }, // Purple Tint (85%)
        { r: 0.85, g: 0.85, b: 0.85 }  // White Burst (85%)
      ];
      splat(x, y, dx, dy, colors[Math.floor(Math.random() * colors.length)]);
    }, 1000);

    window.addEventListener('mousemove', e => {
      const dx = (e.clientX - pointers[0].x) * 12;
      const dy = (e.clientY - pointers[0].y) * 12;
      pointers[0].x = e.clientX;
      pointers[0].y = e.clientY;
      if (Math.abs(dx) > 0 || Math.abs(dy) > 0) {
        // Mouse trail at 85% opacity
        splat(e.clientX, e.clientY, dx, dy, { r: 0.0, g: 0.75, b: 0.85 });
      }
    });

    update();
  } catch (e) {
    console.error("Fluid simulation skipped:", e);
    canvas.style.display = 'none';
  }
})();

/* ============================
   MAGNETIC CURSOR REFINED
   ============================ */
(function initCursor() {
  const dot = document.getElementById('cursor-dot');
  if (!dot) return;

  document.body.classList.add('custom-cursor-active');

  // Dot follows mouse precisely with no lag
  window.addEventListener('mousemove', (e) => {
    dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  });

  // TEXT targets: p, h1-h6, span, li, label → transparent hollow ring
  const textTargets = 'p, h1, h2, h3, h4, h5, h6, span, li, label, .hero-desc, .section-tag';
  document.querySelectorAll(textTargets).forEach(el => {
    el.addEventListener('mouseenter', () => {
      document.body.classList.add('cursor-on-text');
      document.body.classList.remove('cursor-hovering');
    });
    el.addEventListener('mouseleave', () => {
      document.body.classList.remove('cursor-on-text');
    });
  });

  // INTERACTIVE targets: links, buttons, cards → slightly larger hollow ring
  const interactiveTargets = 'a, button, .btn, .project-card, .edu-card, .achievement-card, .whats-new-card, .wn-scroll-btn, .wn-post-btn';
  document.querySelectorAll(interactiveTargets).forEach(el => {
    el.addEventListener('mouseenter', () => {
      document.body.classList.add('cursor-hovering');
      document.body.classList.remove('cursor-on-text');
    });
    el.addEventListener('mouseleave', () => {
      document.body.classList.remove('cursor-hovering');
    });
  });
})();

/* ============================
   NAV & MOBILE MENU
   ============================ */
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
  });
}

if (hamburger && navLinks) {
  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });

  document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('open') && !navbar.contains(e.target)) {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    }
  });
}

/* ============================
   ACTIVE NAV SECTION TRACKER
   ============================ */
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-link[data-section]');

  function setActive(id) {
    links.forEach(link => {
      if (link.dataset.section === id) {
        link.classList.add('active');
        if (window.innerWidth <= 900) {
          link.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
      } else {
        link.classList.remove('active');
      }
    });
  }

  // Use IntersectionObserver to detect visible section
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setActive(entry.target.id);
      }
    });
  }, {
    rootMargin: '-40% 0px -50% 0px', // triggers when section is ~midscreen
    threshold: 0
  });

  sections.forEach(section => observer.observe(section));
})();

/* ============================
   TYPED EFFECT
   ============================ */
(function initTyped() {
  const el = document.getElementById('typed-text');
  if (!el) return;
  const words = ['Software Developer', 'UI/UX Designer', 'Data Analysis', 'Tech Enthusiast', 'Web Creator', 'Problem Solver', 'AI Explorer'];
  let wi = 0, ci = words[0].length, deleting = true;

  function type() {
    const word = words[wi];
    if (!deleting) {
      el.textContent = word.slice(0, ci + 1);
      ci++;
      if (ci === word.length) { deleting = true; setTimeout(type, 2000); return; }
    } else {
      el.textContent = word.slice(0, ci - 1);
      ci--;
      if (ci === 0) { deleting = false; wi = (wi + 1) % words.length; }
    }
    setTimeout(type, deleting ? 50 : 90);
  }
  setTimeout(type, 2200);
})();

/* ============================
   SECTION REVEALS
   ============================ */
(function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
})();

const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    if (!this.checkValidity()) {
      e.preventDefault();
      this.reportValidity();
      return;
    }
    const btn = document.getElementById('sendBtn');
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
      setTimeout(() => {
        btn.innerHTML = '<i class="fa-solid fa-check"></i> Sent!';
        const success = document.getElementById('formSuccess');
        if (success) success.classList.add('show');
        this.reset();
      }, 2000);
    }
  });
}

/* ============================
   STATS & SCROLL PROGRESS
   ============================ */
(function initScrollFeatures() {
  const progressBar = document.getElementById('scroll-progress');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
      const scrollValue = window.scrollY;
      const progress = (scrollValue / scrollTotal) * 100;
      progressBar.style.width = progress + '%';
    });
  }

  const stats = document.querySelectorAll('.stat-num');
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = +el.getAttribute('data-target');
        const duration = 2000;
        const stepTime = 50;
        const steps = duration / stepTime;
        const increment = target / steps;
        let current = 0;

        const updateCounter = setInterval(() => {
          current += increment;
          if (current >= target) {
            el.innerText = target + "+";
            clearInterval(updateCounter);
          } else {
            el.innerText = Math.ceil(current);
          }
        }, stepTime);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  stats.forEach(stat => observer.observe(stat));
})();

/* ============================
   THEME TOGGLE
   ============================ */
(function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;
  const icon = toggleBtn.querySelector('i');

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark' || savedTheme === null) {
    document.documentElement.setAttribute('data-theme', 'dark');
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  } else {
    document.documentElement.removeAttribute('data-theme');
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
  }

  toggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'dark') {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
      icon.classList.remove('fa-sun');
      icon.classList.add('fa-moon');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
    }
  });
})();

/* ============================
   ABOUT PORTRAIT 3D TILT & GLARE
   ============================ */
(function initAboutPortraitTilt() {
  const card = document.getElementById('profile-img-trigger');
  if (!card) return;

  if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) return;

  let rafId = null;
  let targetRotateX = 0;
  let targetRotateY = 0;
  let currentRotateX = 0;
  let currentRotateY = 0;

  function updateTilt() {
    currentRotateX += (targetRotateX - currentRotateX) * 0.12;
    currentRotateY += (targetRotateY - currentRotateY) * 0.12;

    card.style.transform = `perspective(1000px) rotateX(${currentRotateX.toFixed(2)}deg) rotateY(${currentRotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;

    if (Math.abs(targetRotateX - currentRotateX) > 0.05 || Math.abs(targetRotateY - currentRotateY) > 0.05) {
      rafId = requestAnimationFrame(updateTilt);
    } else {
      rafId = null;
    }
  }

  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    targetRotateX = ((centerY - y) / centerY) * 8.5;
    targetRotateY = ((x - centerX) / centerX) * 8.5;

    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;
    card.style.setProperty('--glare-x', `${glareX}%`);
    card.style.setProperty('--glare-y', `${glareY}%`);

    if (!rafId) {
      rafId = requestAnimationFrame(updateTilt);
    }
  });

  card.addEventListener('mouseleave', () => {
    targetRotateX = 0;
    targetRotateY = 0;

    function resetTilt() {
      currentRotateX += (0 - currentRotateX) * 0.15;
      currentRotateY += (0 - currentRotateY) * 0.15;

      if (Math.abs(currentRotateX) < 0.05 && Math.abs(currentRotateY) < 0.05) {
        card.style.transform = '';
        currentRotateX = 0;
        currentRotateY = 0;
      } else {
        card.style.transform = `perspective(1000px) rotateX(${currentRotateX.toFixed(2)}deg) rotateY(${currentRotateY.toFixed(2)}deg)`;
        requestAnimationFrame(resetTilt);
      }
    }

    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
    requestAnimationFrame(resetTilt);
  });
})();

/* ============================
   PROFILE POPUP MODAL
   ============================ */
(function initProfilePopup() {
  const trigger = document.getElementById('profile-img-trigger');
  const overlay = document.getElementById('profile-popup-overlay');
  const closeBtn = document.getElementById('profile-popup-close');
  const card = document.getElementById('profile-popup-card');

  if (!trigger || !overlay) return;

  function openPopup() {
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closePopup() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  trigger.addEventListener('click', openPopup);
  closeBtn.addEventListener('click', closePopup);

  // Close when clicking the backdrop (outside the card)
  overlay.addEventListener('click', (e) => {
    if (!card.contains(e.target)) closePopup();
  });

  // Close with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closePopup();
  });
})();

/* ============================
   TWO MODES TOGGLE CARD
   ============================ */
(function initToggleCard() {
  const toggle = document.getElementById('tc-toggle');
  const designPanel = document.getElementById('tc-design-panel');
  const codePanel = document.getElementById('tc-code-panel');
  const badge = document.getElementById('tc-badge');
  if (!toggle) return;

  let isCode = false;

  function switchToCode() {
    isCode = true;
    toggle.classList.add('code-active');
    designPanel.classList.remove('active');
    codePanel.classList.add('active');
    badge.textContent = 'Developer Mode';
  }

  function switchToDesign() {
    isCode = false;
    toggle.classList.remove('code-active');
    codePanel.classList.remove('active');
    designPanel.classList.add('active');
    badge.textContent = 'Designer Mode';
  }

  toggle.addEventListener('click', () => {
    isCode ? switchToDesign() : switchToCode();
  });

  // Auto-cycle every 5s for first-time visitors
  let autoCycle = setInterval(() => {
    isCode ? switchToDesign() : switchToCode();
  }, 5000);

  // Stop auto-cycle once user interacts
  toggle.addEventListener('click', () => clearInterval(autoCycle), { once: true });
})();

/* ============================
   WHAT'S NEW - CAROUSEL & DYNAMIC LINKEDIN FEED
   ============================ */
(function initWhatsNewSection() {
  const track = document.getElementById('whats-new-track');
  const leftBtn = document.getElementById('wn-scroll-left');
  const rightBtn = document.getElementById('wn-scroll-right');

  // LinkedIn Modal elements
  const modalOverlay = document.getElementById('linkedin-post-modal-overlay');
  const modalClose = document.getElementById('linkedin-modal-close');
  const lpAvatar = document.getElementById('lp-modal-avatar');
  const lpAuthor = document.getElementById('lp-modal-author');
  const lpRole = document.getElementById('lp-modal-role');
  const lpDate = document.getElementById('lp-modal-date');
  const lpImageWrap = document.getElementById('lp-modal-image-wrap');
  const lpImage = document.getElementById('lp-modal-image');
  const lpTitle = document.getElementById('lp-modal-title');
  const lpText = document.getElementById('lp-modal-text');
  const lpReactionIcons = document.getElementById('lp-modal-reaction-icons');
  const lpReactions = document.getElementById('lp-modal-reactions');
  const lpBtn = document.getElementById('lp-modal-btn');

  if (!track) return;

  const LINKEDIN_LOCAL_JSON = 'assets/data/linkedin_posts.json';
  const activePostsMap = new Map();

  const fallbackPosts = [
  {
    "id": "7511385542631030786",
    "title": "We’re live! The Excellence Grid is officially out in test...",
    "text": "We’re live! The Excellence Grid is officially out in testing — exclusively for Marian College students.\n\n​I’m thrilled to share a major project our team has been building! A huge shoutout to my incredible teammates — SANTHOSH KANNAN, Vivek Menon, Bibin Joseph, and Adhil Shajahan. Their hard work, late nights, and dedication over the past few weeks made this milestone possible.\n\n​We extend our sincere gratitude to the all faculty members of PG Department of Computer Applications Marian College Kuttikkanam Autonomous, also Dr. Prijil Mathew and Dr Juby George, the faculty in-charges for Best Class Evaluation, for their valuable guidance and mentorship throughout this project.\n\nAfter rigorous testing and refining, the site is up, fully operational, and ready for you to explore.\n\n​Our goal with Excellence Grid is to create a seamless, reliable platform, and this test phase is the final step toward our full release.\n\n​What you can do right now:\n\n​Visit https://lnkd.in/gQEVXYPY\n\n​Test out the features\n\n​Leave us your feedback or suggestions\n\n​Check it out and let us know what you think in the comments! 👇\n\n\n\n#mariancollegekuttikanam #marian #bestclass #evaluation",
    "imageUrl": "assets/images/MarianGrid.png",
    "postUrl": "https://www.linkedin.com/feed/update/urn:li:activity:7511385542631030786",
    "date": "Oct 2026",
    "badge": "Oct 2026 • Latest",
    "reactions": "35 reactions",
    "reactionIcons": "👍 🚀",
    "authorName": "Vivek Menon",
    "authorAvatar": "assets/images/vivekm.png",
    "authorRole": "@vivek-menon-",
    "timestamp": "2026-10-01T11:24:28.000Z"
  },
  {
    "id": "7505936336890253312",
    "title": "IT'S LIVE  🔗http://vivekmenon.online/",
    "text": "IT'S LIVE  🔗http://vivekmenon.online/\n\n\n\nAfter putting together ideas, designs, code, and countless iterations, I’m excited to finally reveal my personal portfolio: http://vivekmenon.online/\n\n\n\nBuilt with a focus on clean design, meaningful interactions, and modern web experiences, the portfolio reflects my approach to creating digital solutions that are both functional and visually engaging.\n\n\n\nMy key areas of interest include:\n\n\n\nWeb Development\n\nUI/UX & Graphic Design\n\nArtificial Intelligence & Machine Learning\n\nData Analytics\n\n\n\nI enjoy turning ideas into practical digital solutions while combining clean code, thoughtful design, and problem-solving.\n\n\n\nThis portfolio is more than just a website — it represents my continuous journey of learning, building, experimenting, and creating.\n\n\n\nI’m always open to learning, collaborating, and connecting with people in the tech and design community.\n\n\n\n🔗 Explore my portfolio: http://vivekmenon.online/\n\n\n\nI’d genuinely appreciate your feedback and suggestions.\n\n\n\n#SoftwareDeveloper #MCA #Portfolio #WebDevelopment #UIDesign #UXDesign #ArtificialIntelligence #MachineLearning #DataAnalytics #SoftwareEngineering #Tech #Design #DeveloperJourney #PersonalPortfolio",
    "imageUrl": "assets/images/linkedin/post_7505936336890253312.jpg",
    "postUrl": "https://www.linkedin.com/feed/update/urn:li:activity:7505936336890253312",
    "date": "Sep 2026",
    "badge": "Sep 2026",
    "reactions": "36 reactions",
    "reactionIcons": "👍 🚀",
    "authorName": "Vivek Menon",
    "authorAvatar": "assets/images/vivekm.png",
    "authorRole": "@vivek-menon-",
    "timestamp": "2026-09-16T10:31:16.000Z"
  },
  {
    "id": "7498968700079820800",
    "title": "Presenting the Bidirectional Smart Visitor Counter — a co...",
    "text": "Presenting the Bidirectional Smart Visitor Counter — a complete IoT solution designed for automated visitor tracking and real-time occupancy monitoring.\n\n\n\nThe project was designed to address a simple but practical challenge: accurately tracking how many people enter, exit, and are currently inside a facility without relying on manual counting.\n\n\n\nThe system uses two IR sensors interfaced with a NodeMCU ESP8266 to detect the direction of movement.\n\n\n\nBy analyzing the sequence in which the sensors are triggered, the system identifies whether a person is entering or exiting and updates the count accordingly.\n\n\n\nThe NodeMCU processes the sensor data and provides it through a Wi-Fi-enabled REST API using JSON. A custom-built web dashboard consumes this API and presents the information through a clean, interactive interface.\n\n\n\nTechnology Stack\n\n\n\nHardware: NodeMCU ESP8266 | IR Sensors | Breadboard\n\nEmbedded:Arduino IDE | C/C++\n\nCommunication:Wi-Fi | HTTP | REST API | JSON\n\nWeb:HTML | CSS | JavaScript\n\n\n\nWhat makes this project particularly valuable to me is that it goes beyond a basic hardware prototype. It demonstrates a complete IoT data pipeline\n\n\n\nSensor → ESP8266 → Data Processing → Wi-Fi → REST API → Web Dashboard → Real-Time Visualization\n\n\n\nBuilding this system provided valuable hands-on experience in embedded programming, sensor interfacing, IoT communication, API development, frontend integration, and real-time data visualization.\n\n\n\nThis project has strengthened my understanding of how hardware and software can work together to build practical, connected solutions.\n\n\n\n#IoT #InternetOfThings #ESP8266 #NodeMCU #EmbeddedSystems #Arduino #IoTDevelopment #RESTAPI #WebDevelopment #JavaScript #RealTimeMonitoring #SmartBuilding #Automation #SoftwareDevelopment #FullStackDevelopment #MCA #StudentDeveloper #ProjectShowcase #TechProject #EngineeringProject #UiDesigning",
    "imageUrl": "assets/images/linkedin/post_7498968700079820800.jpg",
    "postUrl": "https://www.linkedin.com/feed/update/urn:li:activity:7498968700079820800",
    "date": "Aug 2026",
    "badge": "Aug 2026",
    "reactions": "27 reactions",
    "reactionIcons": "👍 🚀",
    "authorName": "Vivek Menon",
    "authorAvatar": "assets/images/vivekm.png",
    "authorRole": "@vivek-menon-",
    "timestamp": "2026-08-28T05:04:22.000Z"
  },
  {
    "id": "7485886076478312448",
    "title": "⛵ SET SAIL 2026 – A Journey of Leadership, Creativity & C...",
    "text": "⛵ SET SAIL 2026 – A Journey of Leadership, Creativity & Collaboration\n\n\n\nI am grateful to have served as the Technical Team Head & Designer for SET SAIL 2026, the Marian UG Freshers' Induction Programme organized by the DQC Student Team.\n\n\n\nThe success of SET SAIL 2026 was truly a team effort. I sincerely appreciate our Program Heads for their leadership, dedication, and thoughtful coordination, which ensured the smooth execution of every session. Working with such a committed team was a valuable learning experience.\n\n\n\nThis experience gave me the opportunity to contribute both creatively and technically while working alongside an inspiring team. As the Technical Team Head, I was responsible for leading the technical operations and designing the complete visual identity of the programme, including event branding, posters, banners, ID cards, bookmarks, presentation templates, stage visuals, and digital creatives, along with coordinating presentation systems, audio, photography, videography, reel production, and overall multimedia support.\n\n\n\nMy heartfelt thanks go to every member of the Technical Team whose commitment, creativity, and teamwork played a crucial role in the success of the programme. From managing presentations, audio, photography, videography, reel editing, and multimedia support to handling every technical requirement behind the scenes, the team ensured that each session was executed smoothly and professionally throughout the three-day programme.\n\n\n\nI would also like to express my sincere gratitude to our Faculty Coordinator, Albin Kurian for his continuous guidance, encouragement, and trust. His support motivated us to give our best and carry out our responsibilities with confidence.\n\n\n\nSET SAIL 2026 was more than an induction programme—it was a wonderful opportunity to learn, collaborate, lead, and grow together. I am thankful to everyone who made this journey memorable and look forward to many more opportunities to create meaningful experiences together.\n\n\n\n⛵ Every great event is the result of teamwork, dedication, and countless efforts behind the scenes. Proud to have been part of this journey.\n\n\n\nDr Joby Cyriac Jasmine John Alen Kuriakose\n\n\n\n#SETSAIL2026 #MarianCollege #TechnicalTeam #TechnicalLead #GraphicDesign #CreativeDesign #EventManagement #Leadership #Teamwork #StudentLeadership #IQAC #MAGIS #MCA #LinkedIn #BehindTheScenes #Freshers2026",
    "imageUrl": "assets/images/linkedin/post_7485886076478312448.jpg",
    "postUrl": "https://www.linkedin.com/feed/update/urn:li:activity:7485886076478312448",
    "date": "Jul 2026",
    "badge": "Jul 2026",
    "reactions": "73 reactions",
    "reactionIcons": "👍 🚀",
    "authorName": "Vivek Menon",
    "authorAvatar": "assets/images/vivekm.png",
    "authorRole": "@vivek-menon-",
    "timestamp": "2026-07-23T02:38:41.000Z"
  },
  {
    "id": "7468642557292507136",
    "title": "Honored to receive the Marian Silver Band Award 2025–2026...",
    "text": "Honored to receive the Marian Silver Band Award 2025–2026 for securing an A Grade (SGPA 8.62) in the Second Semester of the Master of Computer Applications (MCA) program at Marian College Kuttikkanam Autonomous.\n\n\n\nThis achievement motivates me to continue strengthening my skills in software development, problem-solving, and emerging technologies while striving for greater academic and professional excellence.\n\n\n\n#MCA #SoftwareEngineering #PythonDeveloper #DjangoDeveloper #WebDevelopment #Programming #Coding #SoftwareDevelopment #ComputerScience #TechCareer #StudentAchievement #AcademicExcellence #MarianCollege",
    "imageUrl": "assets/images/linkedin/post_393419321.jpg",
    "postUrl": "https://www.linkedin.com/feed/update/urn:li:activity:7468642557292507136",
    "date": "Jun 2026",
    "badge": "Jun 2026",
    "reactions": "51 reactions",
    "reactionIcons": "👍 🚀",
    "authorName": "Vivek Menon",
    "authorAvatar": "assets/images/vivekm.png",
    "authorRole": "@vivek-menon-",
    "timestamp": "2026-06-05T12:39:06.000Z"
  },
  {
    "id": "7455265229078429696",
    "title": "Project Spotlight: TurfTime – Smart Turf Booking System",
    "text": "Project Spotlight: TurfTime – Smart Turf Booking System\n\n\n\nExcited to showcase TurfTime, a web-based platform designed to modernize and simplify sports turf bookings.\n\n\n\nMany turf facilities still rely on phone calls and WhatsApp messages for reservations, often resulting in scheduling conflicts, missed bookings, and inefficient management. TurfTime addresses these challenges through a centralized and user-friendly digital solution.\n\n\n\nKey Features\n\n\n\n• Real-time turf availability tracking\n\n\n\n• Instant slot booking and secure payment integration\n\n\n\n• Dynamic pricing based on peak and non-peak hours\n\n\n\n• Dedicated dashboards for players and turf owners\n\n\n\n• Automated booking management and schedule updates\n\n\n\nTechnologies & Skills Applied\n\n\n\n• Python\n\n\n\n• Django\n\n\n\n• Web Development\n\n\n\n• Database Management\n\n\n\n• User Authentication & Authorization\n\n\n\n• Payment Gateway Integration\n\n\n\n• Responsive UI/UX Design\n\n\n\nThis project strengthened my experience in full-stack development, system design, database optimization, and building scalable web applications that solve real-world problems.\n\n\n\nI am actively exploring opportunities as a Software Engineer, Python Developer, Django Developer, or Full-Stack Developer, where I can contribute to impactful products and continue growing as a developer.\n\n\n\n#OpenToWork #SoftwareEngineer #PythonDeveloper #DjangoDeveloper #FullStackDeveloper #BackendDeveloper #WebDevelopment #SoftwareDevelopment #Python #Django #ProjectShowcase #TechProjects #DatabaseManagement #ProblemSolving #Innovation #MCA #StudentDeveloper #LinkedInIndia",
    "imageUrl": "assets/images/linkedin/post_393419322.jpg",
    "postUrl": "https://www.linkedin.com/feed/update/urn:li:activity:7455265229078429696",
    "date": "Apr 2026",
    "badge": "Apr 2026",
    "reactions": "34 reactions",
    "reactionIcons": "👍 🚀",
    "authorName": "Vivek Menon",
    "authorAvatar": "assets/images/vivekm.png",
    "authorRole": "@vivek-menon-",
    "timestamp": "2026-04-29T14:42:22.000Z"
  },
  {
    "id": "7440770033393438721",
    "title": "Machine Learning Learning Journey",
    "text": "Machine Learning Learning Journey\n\n\n\nAs part of my MCA program, I have been exploring the fundamentals of Machine Learning and gaining hands-on experience by building and evaluating multiple machine learning models using real-world datasets.\n\n\n\nModels Implemented\n\n\n\nSimple Linear Regression\n\n\n\nDeveloped a model to predict mobile data usage based on daily usage hours and analyzed the relationship between user behavior and data consumption.\n\n\n\nMultiple Linear Regression\n\n\n\nBuilt a model to predict smartphone prices using multiple features such as RAM, storage, battery capacity, screen size, processor speed, camera specifications, and brand information.\n\n\n\nPolynomial Regression\n\n\n\nImplemented a model to capture non-linear relationships and predict sales performance based on advertising expenditure.\n\n\n\nK-Nearest Neighbors (KNN)\n\n\n\nCreated a classification model to predict whether a user is likely to purchase a mobile device based on factors such as age, salary, and spending behavior.\n\n\n\nLogistic Regression\n\n\n\nDeveloped a classification model to predict laptop purchase decisions using features including price, RAM, storage, processor performance, battery capacity, and other hardware specifications.\n\n\n\nKey Learning Outcomes\n\n\n\n• Data preprocessing and cleaning\n\n\n\n• Feature engineering and data transformation\n\n\n\n• Encoding categorical variables\n\n\n\n• Regression and classification techniques\n\n\n\n• Feature scaling and normalization\n\n\n\n• Model training, testing, and evaluation\n\n\n\n• Understanding algorithm selection for different business problems\n\n\n\nProject Experience\n\n\n\nTo strengthen my practical understanding, I integrated these algorithms into a mini machine learning project where each model was applied to solve a specific real-world prediction problem. This helped me gain valuable experience in dataset analysis, model selection, performance evaluation, and machine learning workflows.\n\n\n\nThis journey has strengthened my interest in Machine Learning, Data Science, Python Development, and AI-driven solutions. I look forward to applying these skills to real-world projects and continuously expanding my knowledge in the field.\n\n\n\n#OpenToWork #MachineLearning #ArtificialIntelligence #DataScience #PythonDeveloper #SoftwareEngineer #MachineLearningEngineer #AI #Python #DataAnalytics #PredictiveModeling #MCA #ComputerScience #StudentDeveloper #TechProjects #LearningJourney #FutureReady",
    "imageUrl": "assets/images/linkedin/post_393419323.jpg",
    "postUrl": "https://www.linkedin.com/feed/update/urn:li:activity:7440770033393438721",
    "date": "Mar 2026",
    "badge": "Mar 2026",
    "reactions": "44 reactions",
    "reactionIcons": "👍 🚀",
    "authorName": "Vivek Menon",
    "authorAvatar": "assets/images/vivekm.png",
    "authorRole": "@vivek-menon-",
    "timestamp": "2026-03-20T14:43:38.000Z"
  },
  {
    "id": "7436725318192852992",
    "title": "I’m proud to share a special achievement for our MCA fami...",
    "text": "I’m proud to share a special achievement for our MCA family! 🎉\n\n\n\nOur class has been awarded Best Class – Second Runner Up (2026), and it is truly a moment of pride for all of us.\n\n\n\nAnn Mary and I had the opportunity to serve as the DQC Coordinators of our class. Along with this, I also had the responsibility of representing the Department Students Convener of the PG Department of Computer Application. Through these roles, we focused on maintaining timely documentation, continuous program updates, and well-organized reports throughout the academic year.\n\n\n\nThis achievement would not have been possible without the constant guidance and support of our respected faculty members — Robins Kattoor, Satheesh Kumar S, Reny Jose, Dr. Mendus Jacob, Win Mathew John, Kochumol Abraham and ITALIA JOSEPH MARIA. Their continuous monitoring and encouragement played a vital role in this success.\n\n\n\nA special mention to Annie Joben, Athulya M Nair, Gouri Nandhan P V, Renjitha V R, Riya Boban, and Santhosh Kannan for their valuable contribution during the data cleaning process, which ensured accurate and well-maintained documentation.\n\n\n\nMost importantly, this recognition belongs to our entire class for their incredible coordination, teamwork, and collective effort.\n\n\n\nTogether, we proved that consistency and collaboration lead to excellence. 🚀\n\n\n\n#BestClass #MCA #Leadership #Teamwork #StudentCouncil #Achievement #ComputerApplications",
    "imageUrl": "assets/images/linkedin/post_393419324.jpg",
    "postUrl": "https://www.linkedin.com/feed/update/urn:li:activity:7436725318192852992",
    "date": "Mar 2026",
    "badge": "Mar 2026",
    "reactions": "149 reactions",
    "reactionIcons": "👍 🚀",
    "authorName": "Vivek Menon",
    "authorAvatar": "assets/images/vivekm.png",
    "authorRole": "@vivek-menon-",
    "timestamp": "2026-03-09T10:51:23.000Z"
  },
  {
    "id": "7432083343674007552",
    "title": "As part of a social initiative program, I had the opportu...",
    "text": "As part of a social initiative program, I had the opportunity to deliver a session on “AI Tools Awareness & Ethical Empowerment” on 16th February 2026 at Sree Sabareesa College, Murukkumvayal, Mundakkayam.\n\n\n\nThe session was conducted for BCA first-year and final-year students, focusing on how Artificial Intelligence is transforming the way we design, develop, and think.\n\n\n\n- What Was Explored:\n\n\n\n• Figma – Designing modern UI/UX interfaces collaboratively\n\n• STICK AI – Simplifying visual ideation and creative workflows\n\n• Cursor – AI-powered coding assistant for smarter development\n\n• Antigravity – Enhancing productivity and creative automation\n\n\n\nBeyond just tools, the core focus was on:\n\n\n\n• Understanding the responsible use of AI\n\n\n\n• Ethical decision-making in technology\n\n\n\n• Leveraging AI for learning, innovation, and career growth\n\n\n\n• Building future-ready skills as BCA students\n\n\n\n\n\nIt was inspiring to interact with such enthusiastic learners who are eager to explore emerging technologies. The curiosity, questions, and participation from both first and final-year students made the session highly engaging and impactful.\n\n\n\nGrateful for the opportunity to contribute to the academic and professional growth of young tech minds.",
    "imageUrl": "assets/images/linkedin/post_393419325.jpg",
    "postUrl": "https://www.linkedin.com/feed/update/urn:li:activity:7432083343674007552",
    "date": "Feb 2026",
    "badge": "Feb 2026",
    "reactions": "49 reactions",
    "reactionIcons": "👍 🚀",
    "authorName": "Vivek Menon",
    "authorAvatar": "assets/images/vivekm.png",
    "authorRole": "@vivek-menon-",
    "timestamp": "2026-02-24T15:25:50.000Z"
  },
  {
    "id": "7422304929677099008",
    "title": "Just finished the course “What Is Generative AI?” by Pina...",
    "text": "Just finished the course “What Is Generative AI?” by Pinar Seyhan Demirdag! Check it out: https://lnkd.in/gjZTm5Ws #generativeai #artificialintelligence #generativeaitools.",
    "imageUrl": null,
    "postUrl": "https://www.linkedin.com/learning/certificates/dd147db513af3aa0e06d1348d8d5bfdf897400f65ab9641e4514dc8ed5b89417",
    "date": "Jan 2026",
    "badge": "Jan 2026",
    "reactions": "24 reactions",
    "reactionIcons": "👍 🚀",
    "authorName": "Vivek Menon",
    "authorAvatar": "assets/images/vivekm.png",
    "authorRole": "@vivek-menon-",
    "timestamp": "2026-01-28T15:49:54.000Z"
  },
  {
    "id": "7381313375148044288",
    "title": "𝗡𝗼 𝗖𝗹𝗲𝗮𝗿 𝗣𝗹𝗮𝗻, 𝗝𝘂𝘀𝘁 𝗮 𝗟𝗼𝘁 𝗼𝗳 𝗖𝘂𝗿\ud835...",
    "text": "𝗡𝗼 𝗖𝗹𝗲𝗮𝗿 𝗣𝗹𝗮𝗻, 𝗝𝘂𝘀𝘁 𝗮 𝗟𝗼𝘁 𝗼𝗳 𝗖𝘂𝗿𝗶𝗼𝘀𝗶𝘁𝘆.\n\n\n\n\n\n\n\n \n\n\"𝑳𝒆𝒕'𝒔 𝒋𝒖𝒔𝒕 𝒈𝒐 𝒂𝒏𝒅 𝒔𝒆𝒆 𝒘𝒉𝒂𝒕 𝒉𝒂𝒑𝒑𝒆𝒏𝒔...\"\n\n\n\n\n\n𝗧𝗵𝗮𝘁 𝘄𝗮𝘀 𝘁𝗵𝗲 𝗺𝗼𝘁𝘁𝗼 𝗳𝗼𝗿 𝗼𝘂𝗿 𝘁𝗲𝗮𝗺 of three as we joined the NASA Space Apps Challenge. We were 𝗻𝗲𝘄 𝘁𝗼 𝗵𝗮𝗰𝗸𝗮𝘁𝗵𝗼𝗻𝘀, curious to learn, and excited to see how innovation works....\n\n\n\n\n\nWhat we experienced:\n\n𝟯𝟲 𝗵𝗼𝘂𝗿𝘀 𝗼𝗳 𝗹𝗲𝗮𝗿𝗻𝗶𝗻𝗴 – Fast, challenging, and fun.\n\n𝗧𝗲𝗮𝗺𝘄𝗼𝗿𝗸 𝗺𝗮𝘁𝘁𝗲𝗿𝘀 – learned how to communicate and work together.\n\n𝗧𝗿𝘆𝗶𝗻𝗴 𝘀𝗼𝗺𝗲𝘁𝗵𝗶𝗻𝗴 𝗻𝗲𝘄 – Even with little knowledge, we managed to build something as a team.\n\n\n\nOur main takeaways:\n\n--Teamwork is as important as skills.\n\n--There is always 𝗠𝗼𝗿𝗲 𝘁𝗼 𝗹𝗲𝗮𝗿𝗻\n\n--Building something real feels amazing.\n\n\n\n\n\nThis experience inspired us to keep learning, building, and collaborating....\n\n\n\nVivek Menon \n\n#SpaceApps #NASA #Hackathon #Teamwork #Learning #Curiosity",
    "imageUrl": "assets/images/linkedin/post_7381313375148044288.jpg",
    "postUrl": "https://www.linkedin.com/feed/update/urn:li:activity:7381313375148044288",
    "date": "Oct 2025",
    "badge": "Oct 2025",
    "reactions": "75 reactions",
    "reactionIcons": "👍 🚀",
    "authorName": "Vivek Menon",
    "authorAvatar": "assets/images/vivekm.png",
    "authorRole": "@vivek-menon-",
    "timestamp": "2025-10-07T13:04:06.000Z"
  },
  {
    "id": "7334621828776165378",
    "title": "I'm excited to share that I've successfully completed AWS...",
    "text": "I'm excited to share that I've successfully completed AWS Course by Scaler after completing an in-depth tutorial on Amazon Web Services (AWS).\n\n\n\nGained insights into essential AWS services and cloud fundamentals that are crucial for today's tech landscape. The hands-on approach and real-world examples helped me develop a strong foundation in cloud infrastructure and its practical applications. These skills are highly relevant in today's technology-driven world, and I'm looking forward to applying them in my future roles-especially in areas like cloud computing, data analytics, and scalable solution design. This marks an important step in my ongoing learning journey\n\n\n\nand career development in the tech space.\n\n\n\n#AWS #CloudComputing #AmazonWebServices #Scaler",
    "imageUrl": "assets/images/linkedin/post_7334621828776165378.jpg",
    "postUrl": "https://moonshot.scaler.com/s/li/PaKlhNSlGo",
    "date": "May 2025",
    "badge": "May 2025",
    "reactions": "8 reactions",
    "reactionIcons": "👍 🚀",
    "authorName": "Vivek Menon",
    "authorAvatar": "assets/images/vivekm.png",
    "authorRole": "@vivek-menon-",
    "timestamp": "2025-05-31T16:48:34.000Z"
  },
  {
    "id": "7334491700712624129",
    "title": "Hey Everyone, I am excited to share that I have completed...",
    "text": "Hey Everyone, I am excited to share that I have completed the Instagram Clone using Figma course from Letsupgrade.in. Sharing with you guys the certificate and verification link. https://lnkd.in/gFuR3Zev",
    "imageUrl": "assets/images/linkedin/post_7334491700712624129.jpg",
    "postUrl": "http://Letsupgrade.in",
    "date": "May 2025",
    "badge": "May 2025",
    "reactions": "5 reactions",
    "reactionIcons": "👍 🚀",
    "authorName": "Vivek Menon",
    "authorAvatar": "assets/images/vivekm.png",
    "authorRole": "@vivek-menon-",
    "timestamp": "2025-05-31T08:11:29.000Z"
  },
  {
    "id": "7334490316428759041",
    "title": "I just completed Deloitte Australia's Data Analytics on F...",
    "text": "I just completed Deloitte Australia's Data Analytics on Forage  In the simulation I\n\n\n\n * Completed a Deloitte job simulation involving data analysis and forensic\n\n   technology \n\n * Created a data dashboard using Tableau \n\n * Used Excel to classify data and draw business conclusions",
    "imageUrl": null,
    "postUrl": "https://www.linkedin.com/feed/update/urn:li:activity:7334490316428759041",
    "date": "May 2025",
    "badge": "May 2025",
    "reactions": "13 reactions",
    "reactionIcons": "👍 🚀",
    "authorName": "Vivek Menon",
    "authorAvatar": "assets/images/vivekm.png",
    "authorRole": "@vivek-menon-",
    "timestamp": "2025-05-31T08:05:59.000Z"
  },
  {
    "id": "7295121217915695104",
    "title": "🚀 1st Runner-Up at IIT Bombay’s NEC! A Journey of 6 Mont...",
    "text": "🚀 1st Runner-Up at IIT Bombay’s NEC! A Journey of 6 Months, Countless Challenges, and Unforgettable Growth! 🏆\n\n\n\nWhat a journey it has been! Over the past 6 months, our team has given it everything—late-night brainstorming, strategic planning, and tireless execution—to secure the 1st Runner-Up position at IIT Bombay’s National Entrepreneurship Challenge (NEC), held alongside E-Summit 2025!  \n\n\n\nThis achievement wouldn’t have been possible without the incredible efforts of each and every member of our team.\n\nCyriac Jayesh,Anand S Bosco,Adonia Cyrus,Dennis v Tom,Vivek Menon,Asni Ansari Fathima,Abijith Sunny,Jeeva Jayan Varghese and Alwin Mathew Sibi  —your dedication, creativity, and resilience have been the driving force behind this success. From navigating challenges to coming up with groundbreaking ideas, we proved that teamwork truly makes the dream work!  \n\n\n\nA heartfelt thank you to IIT Bombay, our mentors, and everyone who supported us throughout this journey. This experience has shaped us, strengthened us, and ignited our passion for entrepreneurship even more.  \n\n\n\nThis is just the beginning—greater challenges and bigger milestones ahead! 🚀✨  \n\n\n\n#NEC #IITBombay #Ecell #ESummit #EcellIITBombay #Entrepreneurship #Innovation #Teamwork #Gratitude #Success",
    "imageUrl": "assets/images/linkedin/post_7295121217915695104.jpg",
    "postUrl": "https://www.linkedin.com/feed/update/urn:li:activity:7295121217915695104",
    "date": "Feb 2025",
    "badge": "Feb 2025",
    "reactions": "31 reactions",
    "reactionIcons": "👍 🚀",
    "authorName": "Vivek Menon",
    "authorAvatar": "assets/images/vivekm.png",
    "authorRole": "@vivek-menon-",
    "timestamp": "2025-02-11T16:47:15.000Z"
  },
  {
    "id": "7258128357135900673",
    "title": "I'm proud to share that our team GenesisX has successfull...",
    "text": "I'm proud to share that our team GenesisX has successfully organized and conducted the Illuminate Entrepreneurship workshop by E-Cell, IIT Bombay! It was a fantastic experience. I'm attaching my certificate of recognition, which reflects our collective effort. Thank you to everyone involved!\n\n\n\n#IlluminateWorkshop #IITBombay #Entrepreneurship #ecell",
    "imageUrl": "assets/images/linkedin/post_7258128357135900673.jpg",
    "postUrl": "https://www.linkedin.com/feed/update/urn:li:activity:7258128357135900673",
    "date": "Nov 2024",
    "badge": "Nov 2024",
    "reactions": "16 reactions",
    "reactionIcons": "👍 🚀",
    "authorName": "Vivek Menon",
    "authorAvatar": "assets/images/vivekm.png",
    "authorRole": "@vivek-menon-",
    "timestamp": "2024-11-01T14:50:49.000Z"
  },
  {
    "id": "7253074801597009920",
    "title": "We are thrilled to announce that our team has been shortl...",
    "text": "We are thrilled to announce that our team has been shortlisted for the Zonal Rounds of Eureka! 2024, Asia’s largest business model competition! 🎉 Out of 25,000+ registrations, we’ve made the cut, and our journey toward redefining the entrepreneurial landscape continues! 🌟\n\n\n\nGet ready to innovate, compete, and showcase your vision to the world. The stage is set—let's make an impact! 💡✨\n\n\n\n #Eureka2024 #Entrepreneurship #Innovation #StartupJourney #ZonalRounds #DreamBig #GameOn 🚀",
    "imageUrl": "assets/images/linkedin/post_7253074801597009920.jpg",
    "postUrl": "https://www.linkedin.com/feed/update/urn:li:activity:7253074801597009920",
    "date": "Oct 2024",
    "badge": "Oct 2024",
    "reactions": "52 reactions",
    "reactionIcons": "👍 🚀",
    "authorName": "Vivek Menon",
    "authorAvatar": "assets/images/vivekm.png",
    "authorRole": "@vivek-menon-",
    "timestamp": "2024-10-18T16:09:48.000Z"
  }
];

  function formatPostTextWithLinks(text) {
    if (!text) return '';
    const escaped = escapeHtml(text);
    return escaped.replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>');
  }

  function openLinkedInModal(postId) {
    const post = activePostsMap.get(String(postId));
    if (!post || !modalOverlay) return;

    if (lpAvatar) {
      lpAvatar.src = post.authorAvatar || 'assets/images/vivekm.png';
      lpAvatar.alt = post.authorName || 'Vivek Menon';
    }
    if (lpAuthor) lpAuthor.textContent = post.authorName || 'Vivek Menon';
    if (lpRole) lpRole.textContent = post.authorRole || 'MCA Student & Dept Convener';
    if (lpDate) lpDate.textContent = post.badge || post.date || 'Latest';
    if (lpTitle) lpTitle.textContent = post.title || 'LinkedIn Post';

    if (lpImageWrap && lpImage) {
      if (post.imageUrl) {
        lpImage.src = post.imageUrl;
        lpImage.alt = post.title || 'LinkedIn Post';
        lpImageWrap.style.display = 'flex';
      } else {
        lpImageWrap.style.display = 'none';
      }
    }

    if (lpText) {
      lpText.innerHTML = formatPostTextWithLinks(post.text);
    }

    if (lpReactionIcons) lpReactionIcons.textContent = post.reactionIcons || '👍 🚀';
    if (lpReactions) lpReactions.textContent = (post.reactions || 'Reactions') + (post.date ? ' • ' + post.date : '');
    if (lpBtn) lpBtn.href = post.postUrl || 'https://www.linkedin.com/in/vivek-menon-/';

    modalOverlay.classList.add('active');
    modalOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLinkedInModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('active');
    modalOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (modalClose) {
    modalClose.addEventListener('click', closeLinkedInModal);
  }
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeLinkedInModal();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
      closeLinkedInModal();
    }
  });

  async function fetchPosts() {
    try {
      const res = await fetch(LINKEDIN_LOCAL_JSON);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          renderPosts(data);
          return;
        }
      }
    } catch (e) {
      console.warn('LinkedIn posts load notice (fallback active):', e.message);
    }

    renderPosts(fallbackPosts);
  }

  function renderPosts(posts) {
    if (!posts || !posts.length) return;

    activePostsMap.clear();
    posts.forEach(p => activePostsMap.set(String(p.id), p));

    track.innerHTML = posts.map((post, idx) => `
      <div class="whats-new-card glass ${idx === 0 ? 'active' : ''} ${!post.imageUrl ? 'text-only' : ''}" data-id="${post.id}" tabindex="0">
        ${post.imageUrl ? `
        <div class="wn-media-wrap">
          <img src="${post.imageUrl}" alt="${escapeHtml(post.title)}" class="wn-media-img" loading="lazy" onerror="this.onerror=null;this.parentNode.style.display='none';" />
          <div class="wn-media-badge">${escapeHtml(post.badge || post.date || 'Latest')}</div>
        </div>
        ` : ''}
        <div class="wn-card-content">
          <div class="wn-card-header">
            <img src="${post.authorAvatar || 'assets/images/vivekm.png'}" alt="${escapeHtml(post.authorName || 'Vivek Menon')}" class="wn-avatar" onerror="this.onerror=null;this.src='assets/images/vivekm.png';" />
            <div class="wn-author-info">
              <div class="wn-author-name">
                <span>${escapeHtml(post.authorName || 'Vivek Menon')}</span>
                <i class="fa-brands fa-linkedin wn-linkedin-badge"></i>
              </div>
              <span class="wn-author-role">${escapeHtml(post.authorRole || 'MCA Student & Dept Convener')}</span>
            </div>
            ${!post.imageUrl ? `<div class="wn-media-badge text-only-badge">${escapeHtml(post.badge || post.date || 'Latest')}</div>` : ''}
          </div>
          <h3 class="wn-card-title">${escapeHtml(post.title)}</h3>
          <div class="wn-post-text">${escapeHtml(post.text)}</div>
          <div class="wn-card-footer">
            <div class="wn-stats">
              <span class="wn-reaction-icons">${post.reactionIcons || '👍 🚀'}</span>
              <span>${escapeHtml(post.reactions || 'Reactions')} • ${escapeHtml(post.date || '')}</span>
            </div>
            <div class="wn-footer-actions">
              <button type="button" class="wn-expand-btn" data-post-id="${post.id}" title="Read Full Post">
                <i class="fa-solid fa-expand"></i> Full Post
              </button>
              <a href="${post.postUrl || 'https://www.linkedin.com/in/vivek-menon-/'}" target="_blank" rel="noopener noreferrer" class="wn-post-btn" title="View on LinkedIn">
                <i class="fa-brands fa-linkedin"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    `).join('');

    bindCardEvents();
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function bindCardEvents() {
    const cards = track.querySelectorAll('.whats-new-card');
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        cards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
      });
      card.addEventListener('click', (e) => {
        if (e.target.closest('a') || e.target.closest('.wn-expand-btn')) return;
        cards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
      });

      const title = card.querySelector('.wn-card-title');
      if (title) {
        title.style.cursor = 'pointer';
        title.title = 'Click to read full post';
        title.addEventListener('click', (e) => {
          e.stopPropagation();
          const id = card.getAttribute('data-id');
          if (id) openLinkedInModal(id);
        });
      }

      const mediaWrap = card.querySelector('.wn-media-wrap');
      if (mediaWrap) {
        mediaWrap.style.cursor = 'pointer';
        mediaWrap.title = 'Click to view post media & details';
        mediaWrap.addEventListener('click', (e) => {
          e.stopPropagation();
          const id = card.getAttribute('data-id');
          if (id) openLinkedInModal(id);
        });
      }
    });

    track.querySelectorAll('.wn-expand-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const postId = btn.getAttribute('data-post-id');
        if (postId) openLinkedInModal(postId);
      });
    });
  }

  if (leftBtn && rightBtn) {
    leftBtn.addEventListener('click', () => {
      track.scrollBy({ left: -360, behavior: 'smooth' });
    });

    rightBtn.addEventListener('click', () => {
      track.scrollBy({ left: 360, behavior: 'smooth' });
    });
  }

  fetchPosts();
})();

/* ============================
   SMOOTH STACKING SECTION CARDS
   ============================ */
(function initStackingEffects() {
  const sections = [
    { containerSelector: '.edu-grid', cardSelector: '.edu-card' },
    { containerSelector: '.projects-grid', cardSelector: '.project-card' },
    { containerSelector: '.timeline', cardSelector: '.timeline-item' },
    { containerSelector: '.achievements-grid', cardSelector: '.achievement-card' }
  ];

  // Hermite smoothstep for natural organic deceleration/acceleration
  function smoothStep(t) {
    return t * t * (3 - 2 * t);
  }

  function getStickyTop(card, index) {
    const computedTop = parseFloat(window.getComputedStyle(card).top);
    if (!isNaN(computedTop) && computedTop > 0) return computedTop;
    const cardIndex = parseFloat(card.style.getPropertyValue('--card-index')) || (index + 1);
    return 90 + (cardIndex - 1) * 16;
  }

  function updateStacks() {
    const windowH = window.innerHeight || document.documentElement.clientHeight;

    sections.forEach(({ containerSelector, cardSelector }) => {
      const container = document.querySelector(containerSelector);
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      // Skip offscreen sections for performance
      if (containerRect.bottom < -100 || containerRect.top > windowH + 100) {
        return;
      }

      const cards = Array.from(container.querySelectorAll(cardSelector));
      if (cards.length <= 1) return;

      const cardRects = cards.map(c => c.getBoundingClientRect());
      const stickyTops = cards.map((c, i) => getStickyTop(c, i));

      for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        const targetEl = card.querySelector('.timeline-card') || card;
        let totalProgress = 0;

        const currTop = Math.max(stickyTops[i], cardRects[i].top);
        const currBottom = currTop + card.offsetHeight;

        for (let j = i + 1; j < cards.length; j++) {
          const nextTop = cardRects[j].top;
          const nextStickyTop = stickyTops[j];

          const travelRange = Math.max(1, currBottom - nextStickyTop);
          const distanceOverlapped = currBottom - nextTop;
          const progress = Math.max(0, Math.min(1, distanceOverlapped / travelRange));

          totalProgress += smoothStep(progress);
        }

        if (totalProgress > 0.001) {
          const scale = Math.max(0.86, 1 - (totalProgress * 0.045));
          const brightness = Math.max(0.55, 1 - (totalProgress * 0.16));
          const opacity = Math.max(0.65, 1 - (totalProgress * 0.12));

          targetEl.style.transform = `scale(${scale.toFixed(4)}) translateZ(0)`;
          targetEl.style.filter = `brightness(${brightness.toFixed(3)})`;
          targetEl.style.opacity = `${opacity.toFixed(3)}`;
        } else {
          if (targetEl.style.transform || targetEl.style.filter || (targetEl.style.opacity && targetEl.style.opacity !== '1')) {
            targetEl.style.transform = '';
            targetEl.style.filter = '';
            targetEl.style.opacity = '';
          }
        }
      }
    });
  }

  let ticking = false;
  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateStacks();
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', requestTick, { passive: true });
  window.addEventListener('resize', requestTick, { passive: true });
  window.addEventListener('load', updateStacks);
  setTimeout(updateStacks, 250);
})();

/* ===================================================
   WORDS FROM MY JOURNEY (RECOMMENDATIONS MODAL)
   =================================================== */
(function initRecommendationsModal() {
  const overlay = document.getElementById('testimonial-popup-overlay');
  const modal = document.getElementById('testimonial-modal-card');
  const closeBtn = document.getElementById('testimonial-modal-close');

  const nameEl = document.getElementById('rec-modal-name');
  const roleEl = document.getElementById('rec-modal-role');
  const orgEl = document.getElementById('rec-modal-org');
  const textEl = document.getElementById('rec-modal-text');
  const imgEl = document.getElementById('rec-modal-img');
  const linkedinEl = document.getElementById('rec-modal-linkedin');

  if (!overlay || !modal) return;

  const recommendationsData = {
    'reny-jose': {
      img: 'assets/images/dr_reny_jose.png',
      name: 'DR. RENY JOSE',
      role: 'Head of the Department',
      org: 'Marian College Kuttikkanam (Autonomous)',
      linkedin: 'https://www.linkedin.com/in/vivek-menon-/details/recommendations/?detailScreenTabIndex=2',
      text: `“I am pleased to recommend Vivek Menon, a sincere and proactive leader who made exceptional contributions to the PG Department of Computer Applications.

As Department Student Convener and Leader of the Department Quality Circle (DQC), Vivek systematically streamlined our documentation, driving our team to secure Second Runner-Up in the PG Best Class 2026 evaluation.

A talented designer and developer, he created all visual media and posters for every department event as well as MDQC student group activities. Additionally, he contributed significantly to developing the Marian Excellence Grid (MEG)—a custom software for best class evaluation.

Vivek seamlessly blends technical skill, design flair, and leadership, and I am confident he will excel in all his future endeavors.”`
    }
  };

  function openRecModal(recId) {
    const data = recommendationsData[recId];
    if (!data) return;

    if (imgEl && data.img) imgEl.src = data.img;
    if (nameEl) nameEl.textContent = data.name;
    if (roleEl) roleEl.textContent = data.role;
    if (orgEl) orgEl.textContent = data.org;
    if (textEl) textEl.textContent = data.text;
    if (linkedinEl) linkedinEl.href = data.linkedin;

    overlay.classList.add('active');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeRecModal() {
    overlay.classList.remove('active');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-open-rec]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const recId = btn.getAttribute('data-open-rec');
      openRecModal(recId);
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeRecModal);
  }

  overlay.addEventListener('click', (e) => {
    if (!modal.contains(e.target)) {
      closeRecModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
      closeRecModal();
    }
  });
})();

