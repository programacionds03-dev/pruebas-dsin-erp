/* ============================================================================
   Motor común de las checklists de pruebas de DSIN ERP.
   - Lee el contenido del área desde window.AREA (datos.js de cada carpeta).
   - Guarda el avance de cada persona en SU navegador (localStorage), sin
     archivos: resultado, comentario y fechas de cada prueba, más sus datos.
   - Genera el reporte descargable (HTML imprimible y CSV).
   Sin dependencias externas. Funciona desde GitHub Pages o abierto como archivo.
   ============================================================================ */
(function () {
  'use strict';

  var A = window.AREA;
  var CFG = window.DSIN_PRUEBAS || {};
  var contenido = document.getElementById('contenido');
  if (!A || !Array.isArray(A.pantallas)) {
    contenido.innerHTML = '<p class="vacio">No se cargó el contenido de esta área (datos.js). Comprueba que los archivos estén completos.</p>';
    return;
  }
  document.documentElement.style.setProperty('--area', A.color || '#0c6a66');

  /* ---------------- almacenamiento en el navegador ---------------- */
  var K = 'dsin-pruebas:' + A.id;
  var K_PRUEBAS = K + (A.serie > 1 ? ':s' + A.serie : '') + ':pruebas', K_PERFIL = K + ':perfil', K_URL = 'dsin-pruebas:url-sistema', K_TEMA = 'dsin-pruebas:tema';
  var RES = { correcto: 'Correcto', fallo: 'Falló', no_optimo: 'Resultado no óptimo', no_aplica: 'No aplica' };
  var almacenOk = true;

  function leer(k, def) {
    try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : def; } catch (e) { return def; }
  }
  function escribir(k, v) {
    try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch (e) { return false; }
  }
  try { localStorage.setItem(K + ':prueba', '1'); localStorage.removeItem(K + ':prueba'); } catch (e) { almacenOk = false; }
  // Pide al navegador que trate este almacenamiento como persistente (no lo borre por falta de espacio)
  if (almacenOk && navigator.storage && navigator.storage.persist) { navigator.storage.persist().catch(function () {}); }

  var pruebas = leer(K_PRUEBAS, {});   // { 'COM-01': { r: 'correcto', c: 'comentario', a: 'ISO realizada', m: 'ISO modificada' } }
  var perfil = leer(K_PERFIL, {});     // { nombre, usuario, sucursal, puesto, inicio }
  var urlSistema = String(leer(K_URL, '') || CFG.urlSistema || '').replace(/\/+$/, '');

  var marcador = document.getElementById('guardado');
  var tGuardar = null;
  function avisar(texto, mal) { if (marcador) { marcador.textContent = texto; marcador.className = mal ? 'mal' : ''; } }
  function guardar() {
    clearTimeout(tGuardar);
    tGuardar = setTimeout(function () {
      var ok = escribir(K_PRUEBAS, pruebas) && escribir(K_PERFIL, perfil);
      avisar(ok ? 'Guardado en este navegador · ' + horaCorta(new Date()) : 'No se pudo guardar: revisa que no estés en una ventana privada', !ok);
    }, 250);
  }

  /* ---------------- utilidades ---------------- */
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; });
  }
  // Marcado corto: «rótulo», `campo`, **negrita**, [[ruta|texto]] enlace al sistema
  function fmt(s) {
    return String(s == null ? '' : s)
      .replace(/\[\[([^\]|]*)\|([^\]]+)\]\]/g, function (_, ruta, texto) {
        if (!urlSistema) return '<span class="ir" title="Escribe la dirección del sistema en «Datos del probador»">' + texto + '</span>';
        return '<a class="ir" target="_blank" rel="noopener" href="' + esc(urlSistema + (ruta ? '/' + ruta : '')) + '">' + texto + ' ↗</a>';
      })
      .replace(/«([^»]+)»/g, '<span class="ui">$1</span>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  }
  function dos(n) { return (n < 10 ? '0' : '') + n; }
  function fechaCorta(iso) { if (!iso) return ''; var d = new Date(iso); return isNaN(d) ? '' : dos(d.getDate()) + '/' + dos(d.getMonth() + 1) + '/' + d.getFullYear() + ' ' + dos(d.getHours()) + ':' + dos(d.getMinutes()); }
  function soloFecha(iso) { if (!iso) return ''; var d = new Date(iso); return isNaN(d) ? '' : dos(d.getDate()) + '/' + dos(d.getMonth() + 1) + '/' + d.getFullYear(); }
  function horaCorta(d) { return dos(d.getHours()) + ':' + dos(d.getMinutes()); }
  function hoyIso() { var d = new Date(); return d.getFullYear() + '-' + dos(d.getMonth() + 1) + '-' + dos(d.getDate()); }
  function slug(s) { return String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 40) || 'sin-nombre'; }

  function todasLasPruebas() {
    var l = [];
    A.pantallas.forEach(function (p) { (p.pruebas || []).forEach(function (t) { l.push({ t: t, p: p }); }); });
    return l;
  }
  function conteo(lista) {
    var c = { total: lista.length, hechas: 0, correcto: 0, fallo: 0, no_optimo: 0, no_aplica: 0 };
    lista.forEach(function (x) { var e = pruebas[x.t.id]; if (e && e.r) { c.hechas++; c[e.r] = (c[e.r] || 0) + 1; } });
    return c;
  }

  /* ---------------- dibujo de bloques de contenido ---------------- */
  function bloque(b) {
    var cuerpo = '';
    if (b.tipo === 'aviso') {
      return '<div class="aviso ' + esc(b.tono || '') + '">' + (b.titulo ? '<b class="t">' + fmt(b.titulo) + '</b>' : '') + fmt(b.html) + '</div>';
    }
    if (b.tipo === 'html') cuerpo = '<div class="prosa">' + fmt(b.html) + '</div>';
    else if (b.tipo === 'pasos') {
      cuerpo = (b.antes ? '<div class="prosa">' + fmt(b.antes) + '</div>' : '') + '<ol class="pasos">' + b.items.map(function (t) { return '<li>' + fmt(t) + '</li>'; }).join('') + '</ol>' + (b.despues ? '<div class="prosa">' + fmt(b.despues) + '</div>' : '');
    } else if (b.tipo === 'tabla') {
      var cab = b.cabecera || ['Lo que ves', 'Qué significa', 'Qué hacer'];
      cuerpo = (b.antes ? '<div class="prosa">' + fmt(b.antes) + '</div>' : '') + '<div class="tabla-env"><table><thead><tr>' + cab.map(function (c) { return '<th>' + fmt(c) + '</th>'; }).join('') + '</tr></thead><tbody>' +
        b.filas.map(function (f) { return '<tr>' + f.map(function (c) { return '<td>' + fmt(c) + '</td>'; }).join('') + '</tr>'; }).join('') + '</tbody></table></div>' + (b.despues ? '<div class="prosa">' + fmt(b.despues) + '</div>' : '');
    }
    if (!b.titulo) return '<div class="bloque-in">' + cuerpo + '</div>';
    return '<details class="bloque"' + (b.abierto === false ? '' : ' open') + '><summary>' + fmt(b.titulo) + (b.pista ? ' <small>' + fmt(b.pista) + '</small>' : '') + '</summary><div class="bloque-in">' + cuerpo + '</div></details>';
  }

  function tarjeta(t) {
    var e = pruebas[t.id] || {};
    var chips = '';
    if (t.requiere) chips += '<span class="chip req" title="Este paso no lo puede hacer un usuario normal del área">Lo hace: ' + esc(t.requiere) + '</span>';
    if (t.negativa) chips += '<span class="chip neg" title="Se prueba que el sistema no deje hacer algo indebido">Validación: el sistema debe impedirlo</span>';
    var h = '<article class="prueba" id="' + esc(t.id) + '" data-res="' + esc(e.r || '') + '">';
    h += '<div class="p-cab"><span class="p-id">' + esc(t.id) + '</span><h4>' + fmt(t.titulo) + '</h4>' + chips + '</div>';
    if (t.para) h += '<p class="p-para">' + fmt(t.para) + '</p>';
    h += '<div class="p-cols"><div><h5>Haz esto</h5><ol>' + (t.pasos || []).map(function (x) { return '<li>' + fmt(x) + '</li>'; }).join('') + '</ol></div>';
    h += '<div><h5>Debe pasar</h5><ul>' + (t.espera || []).map(function (x) { return '<li>' + fmt(x) + '</li>'; }).join('') + '</ul></div></div>';
    if (t.nota) h += '<p class="p-nota">' + fmt(t.nota) + '</p>';
    h += '<div class="p-res"><h5>Resultado de la prueba</h5><div class="seg" role="group" aria-label="Resultado de ' + esc(t.id) + '">' +
      Object.keys(RES).map(function (k) {
        var icono = { correcto: '✔', fallo: '✖', no_optimo: '◐', no_aplica: '—' }[k];
        return '<button type="button" data-id="' + esc(t.id) + '" data-v="' + k + '" aria-pressed="' + (e.r === k) + '">' + icono + ' ' + RES[k] + '</button>';
      }).join('') + '</div>';
    var faltaCom = (e.r === 'fallo' || e.r === 'no_optimo') && !(e.c || '').trim();
    h += '<div class="p-com' + (faltaCom ? ' falta' : '') + '"><textarea rows="2" data-id="' + esc(t.id) + '" placeholder="Comentarios: qué pasó, mensaje que apareció, número de documento o producto usado…">' + esc(e.c || '') + '</textarea>' +
      '<div class="ayuda">' + (faltaCom ? 'Describe qué falló o por qué el resultado no fue el esperado: este comentario sale en el reporte.' : 'Si falló o no te pareció correcto, explica aquí qué viste. También sirve para anotar sugerencias.') + '</div></div>';
    h += '<div class="p-fechas"><span>Realizada: <b>' + (e.a ? fechaCorta(e.a) : '—') + '</b></span><span>Última modificación: <b>' + (e.m ? fechaCorta(e.m) : '—') + '</b></span></div>';
    h += '</div></article>';
    return h;
  }

  function perfilHtml() {
    var inicio = perfil.inicio ? soloFecha(perfil.inicio) : '—';
    return '<details class="bloque" open id="bloque-perfil"><summary>Datos del probador <small>se guardan en este navegador y encabezan tu reporte</small></summary><div class="bloque-in">' +
      '<div class="perfil">' +
      '<label>Nombre completo *<input id="pf-nombre" type="text" autocomplete="name" value="' + esc(perfil.nombre || '') + '" placeholder="Como quieres aparecer en el reporte" class="' + (perfil.nombre ? '' : 'falta') + '"></label>' +
      '<label>Usuario con el que entras (correo)<input id="pf-usuario" type="email" autocomplete="email" value="' + esc(perfil.usuario || '') + '" placeholder="nombre@piensads.com"></label>' +
      '<label>Sucursal<input id="pf-sucursal" type="text" value="' + esc(perfil.sucursal || '') + '" placeholder="CHALCHUAPA, SANTA ANA…" list="pf-sucursales"><datalist id="pf-sucursales"><option value="CHALCHUAPA"><option value="SANTA ANA"><option value="ZARZAMORA"></datalist></label>' +
      '<label>Área<span class="fijo">' + esc(A.nombre) + '</span></label>' +
      '<label>Dirección del sistema<input id="pf-url" type="url" value="' + esc(urlSistema) + '" placeholder="https://…"></label>' +
      '</div><p class="perfil-pie">Pruebas iniciadas el <b>' + esc(inicio) + '</b>. Cada prueba guarda sola la fecha en que la hiciste y la de su última modificación.</p></div></details>';
  }

  // ?solo=compras,kardex muestra solo esas pantallas (útil para imprimir una sola); ?tema=claro|oscuro fija el tema
  var parametros = new URLSearchParams(location.search);
  var solo = (parametros.get('solo') || '').split(',').filter(Boolean);

  function dibujar() {
    var nav = '<h6>Para empezar</h6><a href="#sec-inicio" data-nav="inicio"><span class="pt"></span><span class="nm">' + esc(A.corto || 'Inicio') + '</span></a><h6>Pantallas</h6>';
    var cuerpo = solo.length ? '' : '<section class="sec" id="sec-inicio" data-sec="inicio"><div class="sec-cab"><div class="tit"><h2>' + fmt(A.titulo || A.nombre) + '</h2>' + (A.sub ? '<div class="sub">' + fmt(A.sub) + '</div>' : '') + '</div></div><div class="sec-cuerpo">' + perfilHtml() + (A.intro || []).map(bloque).join('') + '</div></section>';

    A.pantallas.filter(function (p) { return !solo.length || solo.indexOf(p.id) > -1; }).forEach(function (p) {
      var color = p.color || A.color || 'var(--ac)';
      nav += '<a href="#sec-' + esc(p.id) + '" data-nav="' + esc(p.id) + '" style="--area:' + color + '"><span class="pt"></span><span class="nm">' + esc(p.corto || p.titulo) + '</span><span class="cnt" data-cnt="' + esc(p.id) + '"></span></a>';
      var abrir = p.url && urlSistema ? '<a class="btn" target="_blank" rel="noopener" href="' + esc(urlSistema + '/' + p.url) + '">Abrir en el sistema ↗</a>' : '';
      cuerpo += '<section class="sec" id="sec-' + esc(p.id) + '" data-sec="' + esc(p.id) + '" style="--area:' + color + '"><div class="sec-cab">' +
        (p.codigo ? '<span class="cod">' + esc(p.codigo) + '</span>' : '') +
        '<div class="tit"><h2>' + fmt(p.titulo) + '</h2>' + (p.sub ? '<div class="sub">' + fmt(p.sub) + '</div>' : '') +
        (p.ruta || abrir ? '<div class="ruta">' + (p.ruta ? '<span>Menú: ' + fmt(p.ruta) + '</span>' : '') + abrir + '</div>' : '') + '</div>' +
        '<div class="med" data-med="' + esc(p.id) + '"></div></div><div class="sec-cuerpo">' +
        (p.bloques || []).map(bloque).join('') +
        '<details class="bloque" open><summary>Pruebas <small>' + (p.pruebas || []).length + ' en esta pantalla</small></summary><div class="bloque-in"><div class="pruebas">' + (p.pruebas || []).map(tarjeta).join('') + '</div></div></details>' +
        '</div></section>';
    });
    document.getElementById('indice').innerHTML = nav;
    contenido.innerHTML = cuerpo;
    contar();
    filtrar();
    espiar();
  }

  function contar() {
    var th = 0, tt = 0, g = { correcto: 0, fallo: 0, no_optimo: 0, no_aplica: 0 };
    A.pantallas.forEach(function (p) {
      var c = conteo((p.pruebas || []).map(function (t) { return { t: t, p: p }; }));
      var cnt = document.querySelector('[data-cnt="' + p.id + '"]'), med = document.querySelector('[data-med="' + p.id + '"]');
      if (cnt) { cnt.textContent = c.total ? c.hechas + '/' + c.total : ''; cnt.className = 'cnt' + (c.fallo || c.no_optimo ? ' fallo' : (c.total && c.hechas === c.total ? ' lleno' : '')); }
      if (med) med.innerHTML = c.total ? '<b>' + c.hechas + ' / ' + c.total + '</b>pruebas hechas' + (c.fallo || c.no_optimo ? '<br><span class="ins err">' + (c.fallo + c.no_optimo) + ' con observación</span>' : '') : '';
      th += c.hechas; tt += c.total; Object.keys(g).forEach(function (k) { g[k] += c[k] || 0; });
    });
    var riel = document.getElementById('riel-total');
    if (riel) {
      riel.innerHTML = ['correcto', 'no_optimo', 'fallo', 'no_aplica'].map(function (k) {
        var cls = { correcto: 'ok', no_optimo: 'av', fallo: 'err', no_aplica: 'na' }[k];
        return '<i class="' + cls + '" style="width:' + (tt ? (g[k] / tt * 100) : 0) + '%"></i>';
      }).join('');
    }
    var num = document.getElementById('num-total');
    if (num) num.textContent = th + ' de ' + tt + ' pruebas' + (g.fallo + g.no_optimo ? ' · ' + (g.fallo + g.no_optimo) + ' con observación' : '');
  }

  /* ---------------- filtro y búsqueda ---------------- */
  var filtro = 'todas';
  function filtrar() {
    var q = (document.getElementById('buscar').value || '').trim().toLowerCase();
    document.querySelectorAll('.prueba').forEach(function (el) {
      var e = pruebas[el.id] || {};
      var ocultar = (filtro === 'pendientes' && e.r) || (filtro === 'observadas' && !(e.r === 'fallo' || e.r === 'no_optimo')) || (q && el.textContent.toLowerCase().indexOf(q) === -1);
      el.classList.toggle('oculta', !!ocultar);
    });
    if (q) document.querySelectorAll('details.bloque').forEach(function (d) { if (d.textContent.toLowerCase().indexOf(q) > -1) d.open = true; });
  }

  var observador = null;
  function espiar() {
    if (!('IntersectionObserver' in window)) return;
    if (observador) observador.disconnect();
    observador = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (en) {
        if (!en.isIntersecting) return;
        document.querySelectorAll('#indice a').forEach(function (a) { a.classList.toggle('aqui', a.getAttribute('data-nav') === en.target.getAttribute('data-sec')); });
      });
    }, { rootMargin: '-90px 0px -70% 0px' });
    document.querySelectorAll('.sec').forEach(function (s) { observador.observe(s); });
  }

  /* ---------------- eventos ---------------- */
  contenido.addEventListener('click', function (ev) {
    var b = ev.target.closest('.seg button[data-id]');
    if (!b) return;
    var id = b.getAttribute('data-id'), v = b.getAttribute('data-v');
    var e = pruebas[id] = pruebas[id] || {};
    var ahora = new Date().toISOString();
    if (e.r === v) { delete e.r; } else { e.r = v; if (!e.a) e.a = ahora; }
    e.m = ahora;
    if (!perfil.inicio) perfil.inicio = ahora;
    refrescarTarjeta(id);
    contar(); filtrar(); guardar();
  });
  contenido.addEventListener('input', function (ev) {
    var el = ev.target;
    if (el.matches('textarea[data-id]')) {
      var id = el.getAttribute('data-id');
      var e = pruebas[id] = pruebas[id] || {};
      e.c = el.value; e.m = new Date().toISOString();
      if (!perfil.inicio) perfil.inicio = e.m;
      var art = el.closest('.prueba'), com = el.closest('.p-com');
      var falta = (e.r === 'fallo' || e.r === 'no_optimo') && !el.value.trim();
      com.classList.toggle('falta', falta);
      art.querySelector('.p-fechas').innerHTML = '<span>Realizada: <b>' + (e.a ? fechaCorta(e.a) : '—') + '</b></span><span>Última modificación: <b>' + fechaCorta(e.m) + '</b></span>';
      guardar();
    } else if (el.id === 'pf-nombre' || el.id === 'pf-usuario' || el.id === 'pf-sucursal') {
      perfil[el.id.slice(3)] = el.value.trim();
      if (!perfil.inicio && el.value.trim()) perfil.inicio = new Date().toISOString();
      if (el.id === 'pf-nombre') el.classList.toggle('falta', !el.value.trim());
      guardar();
    } else if (el.id === 'pf-url') {
      urlSistema = el.value.trim().replace(/\/+$/, '');
      escribir(K_URL, urlSistema);
      avisar('Dirección del sistema guardada en este navegador');
    }
  });
  document.getElementById('pf-url-aplicar') && document.getElementById('pf-url-aplicar').addEventListener('click', dibujar);

  function refrescarTarjeta(id) {
    var art = document.getElementById(id);
    if (!art) return;
    var t = null;
    A.pantallas.some(function (p) { return (p.pruebas || []).some(function (x) { if (x.id === id) { t = x; return true; } return false; }); });
    if (!t) return;
    var tmp = document.createElement('div');
    tmp.innerHTML = tarjeta(t);
    var nuevo = tmp.firstElementChild;
    // conserva el texto del comentario tal como está en pantalla
    art.replaceWith(nuevo);
  }

  document.getElementById('buscar').addEventListener('input', filtrar);
  document.querySelectorAll('[data-filtro]').forEach(function (b) {
    b.addEventListener('click', function () {
      filtro = b.getAttribute('data-filtro');
      document.querySelectorAll('[data-filtro]').forEach(function (x) { x.classList.toggle('act', x === b); });
      filtrar();
    });
  });

  /* ---------------- reporte ---------------- */
  function descargar(nombre, contenidoTexto, tipo) {
    var a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([contenidoTexto], { type: tipo }));
    a.download = nombre;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 800);
  }
  function exigirNombre() {
    if ((perfil.nombre || '').trim()) return true;
    var campo = document.getElementById('pf-nombre');
    alert('Antes de generar el reporte escribe tu nombre en «Datos del probador» (al inicio de la página).');
    if (campo) { campo.scrollIntoView({ block: 'center' }); campo.focus(); campo.classList.add('falta'); }
    return false;
  }
  function rangoFechas() {
    var min = null, max = null;
    Object.keys(pruebas).forEach(function (id) {
      var e = pruebas[id];
      [e.a, e.m].forEach(function (f) { if (!f) return; if (!min || f < min) min = f; if (!max || f > max) max = f; });
    });
    return { min: min, max: max };
  }

  function generarReporte() {
    var lista = todasLasPruebas(), c = conteo(lista), r = rangoFechas(), ahora = new Date();
    var pendientes = lista.filter(function (x) { return !(pruebas[x.t.id] || {}).r; });
    var observadas = lista.filter(function (x) { var e = pruebas[x.t.id] || {}; return e.r === 'fallo' || e.r === 'no_optimo'; });
    var comentadas = lista.filter(function (x) { var e = pruebas[x.t.id] || {}; return e.r !== 'fallo' && e.r !== 'no_optimo' && (e.c || '').trim(); });
    var css = 'body{font:14px/1.5 "Segoe UI",system-ui,Arial,sans-serif;color:#17202e;margin:0;background:#fff}main{max-width:1000px;margin:0 auto;padding:28px 24px 60px}h1{font-size:24px;margin:0 0 4px}h2{font-size:18px;margin:28px 0 8px;padding-bottom:4px;border-bottom:2px solid #dce1e9}h3{font-size:15px;margin:18px 0 6px}table{border-collapse:collapse;width:100%;font-size:13px;margin:6px 0 14px}th,td{border:1px solid #dce1e9;padding:6px 8px;vertical-align:top;text-align:left}th{background:#f3f5f8;font-size:11.5px;text-transform:uppercase;letter-spacing:.04em}td.c{white-space:nowrap}.enc{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:6px 18px;border:1px solid #dce1e9;border-radius:8px;padding:12px 14px;margin:12px 0;background:#f8fafc}.enc div span{display:block;font-size:11.5px;color:#556174;text-transform:uppercase;letter-spacing:.04em}.enc div b{font-size:15px}.tot{display:flex;flex-wrap:wrap;gap:10px;margin:10px 0}.tot div{flex:1 1 130px;border:1px solid #dce1e9;border-radius:8px;padding:10px 12px;text-align:center}.tot b{display:block;font-size:24px}.tot span{font-size:12px;color:#556174}.r-correcto{color:#1b7a43;font-weight:700}.r-fallo{color:#b0342a;font-weight:700}.r-no_optimo{color:#99600a;font-weight:700}.r-no_aplica{color:#5b6676;font-weight:700}.r-pend{color:#7b8697}.obs{border:1px solid #dce1e9;border-left:5px solid #b0342a;border-radius:8px;padding:10px 14px;margin:8px 0;page-break-inside:avoid}.obs.no_optimo{border-left-color:#99600a}.obs h4{margin:0 0 4px;font-size:14.5px}.obs .meta{font-size:12px;color:#556174;margin-bottom:6px}.obs p{margin:4px 0;white-space:pre-wrap}.pie{margin-top:30px;font-size:12px;color:#7b8697;border-top:1px solid #dce1e9;padding-top:8px}@media print{main{padding:0}h2{break-after:avoid}}';
    var h = '<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Reporte de pruebas · ' + esc(A.nombre) + ' · ' + esc(perfil.nombre || '') + '</title><style>' + css + '</style></head><body><main>';
    h += '<h1>Reporte de pruebas · ' + esc(A.nombre) + '</h1><div style="color:#556174">' + esc(CFG.empresa || 'DSIN ERP') + ' · ambiente: ' + esc(CFG.ambiente || '') + (urlSistema ? ' · ' + esc(urlSistema) : '') + '</div>';
    h += '<div class="enc"><div><span>Nombre</span><b>' + esc(perfil.nombre || '—') + '</b></div><div><span>Área</span><b>' + esc(A.nombre) + '</b></div><div><span>Usuario</span><b>' + esc(perfil.usuario || '—') + '</b></div><div><span>Sucursal</span><b>' + esc(perfil.sucursal || '—') + '</b></div>' +
      '<div><span>Pruebas iniciadas</span><b>' + esc(perfil.inicio ? fechaCorta(perfil.inicio) : (r.min ? fechaCorta(r.min) : '—')) + '</b></div><div><span>Última modificación</span><b>' + esc(r.max ? fechaCorta(r.max) : '—') + '</b></div><div><span>Reporte generado</span><b>' + esc(fechaCorta(ahora.toISOString())) + '</b></div><div><span>Versión de la checklist</span><b>' + esc(A.version || CFG.version || '') + '</b></div></div>';
    h += '<h2>Resumen</h2><div class="tot"><div><b>' + c.hechas + ' / ' + c.total + '</b><span>pruebas realizadas</span></div><div><b class="r-correcto">' + c.correcto + '</b><span>correctas</span></div><div><b class="r-fallo">' + c.fallo + '</b><span>fallaron</span></div><div><b class="r-no_optimo">' + c.no_optimo + '</b><span>resultado no óptimo</span></div><div><b class="r-no_aplica">' + c.no_aplica + '</b><span>no aplican</span></div><div><b class="r-pend">' + pendientes.length + '</b><span>pendientes</span></div></div>';
    h += '<h3>Qué se hizo</h3><table><thead><tr><th>Pantalla</th><th>Realizadas</th><th>Correctas</th><th>Fallaron</th><th>No óptimo</th><th>No aplica</th><th>Pendientes</th></tr></thead><tbody>' + A.pantallas.map(function (p) {
      var cc = conteo((p.pruebas || []).map(function (t) { return { t: t, p: p }; }));
      return '<tr><td>' + esc(p.titulo.replace(/[«»`*]/g, '')) + '</td><td>' + cc.hechas + ' / ' + cc.total + '</td><td>' + cc.correcto + '</td><td>' + cc.fallo + '</td><td>' + cc.no_optimo + '</td><td>' + cc.no_aplica + '</td><td>' + (cc.total - cc.hechas) + '</td></tr>';
    }).join('') + '</tbody></table>';
    h += '<h2>Fallos y resultados no óptimos</h2>';
    h += observadas.length ? observadas.map(function (x) {
      var e = pruebas[x.t.id];
      return '<div class="obs ' + esc(e.r) + '"><h4>' + esc(x.t.id) + ' · ' + esc(x.t.titulo.replace(/[«»`*]/g, '')) + ' <span class="r-' + esc(e.r) + '">(' + RES[e.r] + ')</span></h4><div class="meta">Pantalla: ' + esc(x.p.titulo.replace(/[«»`*]/g, '')) + ' · Realizada: ' + esc(fechaCorta(e.a)) + ' · Última modificación: ' + esc(fechaCorta(e.m)) + '</div><p>' + (esc((e.c || '').trim()) || '<em>Sin comentario.</em>') + '</p></div>';
    }).join('') : '<p>No se registraron fallos ni resultados no óptimos.</p>';
    if (comentadas.length) {
      h += '<h3>Otros comentarios</h3>' + comentadas.map(function (x) {
        var e = pruebas[x.t.id];
        return '<div class="obs" style="border-left-color:#1c58ad"><h4>' + esc(x.t.id) + ' · ' + esc(x.t.titulo.replace(/[«»`*]/g, '')) + (e.r ? ' <span class="r-' + esc(e.r) + '">(' + RES[e.r] + ')</span>' : ' <span class="r-pend">(pendiente)</span>') + '</h4><div class="meta">Pantalla: ' + esc(x.p.titulo.replace(/[«»`*]/g, '')) + ' · Última modificación: ' + esc(fechaCorta(e.m)) + '</div><p>' + esc(e.c.trim()) + '</p></div>';
      }).join('');
    }
    h += '<h2>Detalle por pantalla</h2>' + A.pantallas.map(function (p) {
      return '<h3>' + esc(p.titulo.replace(/[«»`*]/g, '')) + (p.ruta ? ' <span style="font-weight:400;color:#556174">· ' + esc(p.ruta.replace(/[«»`*]/g, '')) + '</span>' : '') + '</h3><table><thead><tr><th>ID</th><th>Prueba</th><th>Resultado</th><th>Realizada</th><th>Modificada</th><th>Comentario</th></tr></thead><tbody>' + (p.pruebas || []).map(function (t) {
        var e = pruebas[t.id] || {};
        return '<tr><td class="c">' + esc(t.id) + '</td><td>' + esc(t.titulo.replace(/[«»`*]/g, '')) + '</td><td class="c ' + (e.r ? 'r-' + esc(e.r) : 'r-pend') + '">' + (e.r ? RES[e.r] : 'Pendiente') + '</td><td class="c">' + esc(fechaCorta(e.a)) + '</td><td class="c">' + esc(fechaCorta(e.m)) + '</td><td>' + esc(e.c || '') + '</td></tr>';
      }).join('') + '</tbody></table>';
    }).join('');
    if (pendientes.length) h += '<h2>Pruebas pendientes</h2><p>' + pendientes.map(function (x) { return esc(x.t.id); }).join(', ') + '</p>';
    h += '<div class="pie">Generado desde la checklist de pruebas de ' + esc(A.nombre) + ' (' + esc(CFG.empresa || 'DSIN ERP') + ') el ' + esc(fechaCorta(ahora.toISOString())) + '. Este archivo también sirve para recuperar el avance en otro navegador: en la checklist, «Más ▾» → «Recuperar avance desde un reporte».</div>';
    h += '<script type="application/json" id="dsin-pruebas-estado">' + JSON.stringify({ area: A.id, version: A.version || '', perfil: perfil, pruebas: pruebas }).replace(/<\//g, '<\\/') + '<\/script>';
    h += '</main></body></html>';
    return h;
  }

  function generarCsv() {
    function celda(v) { v = String(v == null ? '' : v); if (/^[=+\-@]/.test(v)) v = "'" + v; return '"' + v.replace(/"/g, '""') + '"'; }
    var filas = [['Area', 'Probador', 'Usuario', 'Sucursal', 'Pantalla', 'ID', 'Prueba', 'Resultado', 'Realizada', 'Modificada', 'Comentario']];
    todasLasPruebas().forEach(function (x) {
      var e = pruebas[x.t.id] || {};
      filas.push([A.nombre, perfil.nombre || '', perfil.usuario || '', perfil.sucursal || '', x.p.titulo.replace(/[«»`*]/g, ''), x.t.id, x.t.titulo.replace(/[«»`*]/g, ''), e.r ? RES[e.r] : 'Pendiente', fechaCorta(e.a), fechaCorta(e.m), e.c || '']);
    });
    return '﻿' + filas.map(function (f) { return f.map(celda).join(';'); }).join('\r\n');
  }

  document.getElementById('btn-reporte').addEventListener('click', function () {
    if (!exigirNombre()) return;
    descargar('reporte-pruebas-' + A.id + '-' + slug(perfil.nombre) + '-' + hoyIso() + '.html', generarReporte(), 'text/html;charset=utf-8');
  });
  var btnCsv = document.getElementById('btn-csv');
  if (btnCsv) btnCsv.addEventListener('click', function () { if (!exigirNombre()) return; descargar('pruebas-' + A.id + '-' + slug(perfil.nombre) + '-' + hoyIso() + '.csv', generarCsv(), 'text/csv;charset=utf-8'); });
  var btnVer = document.getElementById('btn-ver-reporte');
  if (btnVer) btnVer.addEventListener('click', function () {
    if (!exigirNombre()) return;
    var w = window.open('', '_blank');
    if (!w) { alert('El navegador bloqueó la ventana. Usa «Descargar reporte».'); return; }
    w.document.open(); w.document.write(generarReporte()); w.document.close();
  });

  var archivo = document.getElementById('archivo');
  var btnRec = document.getElementById('btn-recuperar');
  if (btnRec && archivo) {
    btnRec.addEventListener('click', function () { archivo.click(); });
    archivo.addEventListener('change', function () {
      var f = archivo.files && archivo.files[0];
      if (!f) return;
      var lector = new FileReader();
      lector.onload = function () {
        try {
          var m = String(lector.result).match(/<script type="application\/json" id="dsin-pruebas-estado">([\s\S]*?)<\/script>/);
          var o = JSON.parse(m ? m[1] : String(lector.result));
          if (!o || typeof o.pruebas !== 'object') throw new Error('formato');
          if (o.area && o.area !== A.id) { alert('Ese reporte es de otra área (' + o.area + ').'); return; }
          if (!confirm('Se reemplazará el avance guardado en este navegador por el del reporte. ¿Continuar?')) return;
          pruebas = o.pruebas || {}; perfil = o.perfil || {};
          guardar(); dibujar();
        } catch (e) { alert('Ese archivo no es un reporte válido de esta checklist.'); }
        archivo.value = '';
      };
      lector.readAsText(f);
    });
  }
  var btnBorrar = document.getElementById('btn-borrar');
  if (btnBorrar) btnBorrar.addEventListener('click', function () {
    if (!confirm('Se borrarán TODAS tus marcas, comentarios y datos de este navegador.\n\nSi quieres conservarlos, cancela y descarga antes el reporte.\n\n¿Borrar todo?')) return;
    pruebas = {}; perfil = {}; guardar(); dibujar();
  });
  var btnImprimir = document.getElementById('btn-imprimir');
  if (btnImprimir) btnImprimir.addEventListener('click', function () { window.print(); });
  var btnTema = document.getElementById('btn-tema');
  if (btnTema) btnTema.addEventListener('click', function () {
    var raiz = document.documentElement, actual = raiz.getAttribute('data-tema');
    var oscuroSistema = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    var nuevo = (actual ? actual === 'oscuro' : oscuroSistema) ? 'claro' : 'oscuro';
    raiz.setAttribute('data-tema', nuevo); escribir(K_TEMA, nuevo);
  });
  var tema = parametros.get('tema') || leer(K_TEMA, '');
  if (tema === 'claro' || tema === 'oscuro') document.documentElement.setAttribute('data-tema', tema);
  var btnAbrir = document.getElementById('btn-abrir-todo');
  var todoAbierto = true;
  if (btnAbrir) btnAbrir.addEventListener('click', function () { todoAbierto = !todoAbierto; document.querySelectorAll('details.bloque').forEach(function (d) { d.open = todoAbierto; }); });
  document.addEventListener('click', function (ev) { var m = document.querySelector('details.mas'); if (m && m.open && !m.contains(ev.target)) m.open = false; });

  var sistema = document.getElementById('btn-sistema');
  if (sistema) { if (urlSistema) sistema.href = urlSistema; else sistema.classList.add('oculta'); }
  var titulo = document.getElementById('titulo-area');
  if (titulo) titulo.textContent = A.nombre;
  var sub = document.getElementById('sub-area');
  if (sub) sub.innerHTML = esc(CFG.empresa || 'DSIN ERP') + ' · checklist de pruebas <span class="amb">' + esc(CFG.ambiente || '') + '</span>';

  if (!almacenOk) {
    var banner = document.createElement('div');
    banner.className = 'banner';
    banner.innerHTML = '<div>Este navegador no permite guardar el avance (ventana privada o almacenamiento bloqueado). Lo que marques se perderá al cerrar. Abre la checklist en una ventana normal de Chrome o Edge.</div>';
    document.body.insertBefore(banner, document.querySelector('.marco'));
  }

  dibujar();
  if (location.hash && document.getElementById(location.hash.slice(1))) document.getElementById(location.hash.slice(1)).scrollIntoView();
  avisar(almacenOk ? 'Tu avance se guarda solo en este navegador' : 'Sin almacenamiento: el avance no se guardará', !almacenOk);
})();
