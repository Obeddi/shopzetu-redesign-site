(function () {
  // Black November countdown (set the real end date here)
  var ENDS_AT = '2026-11-30T23:59:59+03:00';
  var pad = function (n) { return String(n).padStart(2, '0'); };
  function tick() {
    var now = Date.now();
    var left = Math.max(0, new Date(ENDS_AT).getTime() - now);
    var cd = document.getElementById('bn-cd');
    if (cd) cd.textContent = Math.floor(left / 864e5) + 'd ' + pad(Math.floor(left / 36e5) % 24) + 'h ' + pad(Math.floor(left / 6e4) % 60) + 'm ' + pad(Math.floor(left / 1e3) % 60) + 's';
    var nm = new Date(now); nm.setHours(24, 0, 0, 0);
    var drop = Math.max(0, nm.getTime() - now);
    var h = document.getElementById('drop-h'), m = document.getElementById('drop-m'), s = document.getElementById('drop-s');
    if (h) h.textContent = pad(Math.floor(drop / 36e5));
    if (m) m.textContent = pad(Math.floor(drop / 6e4) % 60);
    if (s) s.textContent = pad(Math.floor(drop / 1e3) % 60);
  }
  tick(); setInterval(tick, 1000);

  // Banner slider
  var slider = document.querySelector('.slider');
  if (slider) {
    var slides = [slider.querySelector('.bn')].concat(Array.prototype.slice.call(slider.querySelectorAll('.bn-slide'))).filter(Boolean);
    var dots = Array.prototype.slice.call(slider.querySelectorAll('.bn-dots button'));
    var idx = 0, timer;
    function show(i) {
      idx = (i + slides.length) % slides.length;
      slides.forEach(function (sl, k) { sl.style.display = k === idx ? '' : 'none'; });
      dots.forEach(function (d, k) { var bar = d.firstElementChild; if (bar) { bar.style.width = (k === idx ? 28 : 8) + 'px'; bar.style.background = k === idx ? '#DDEA0D' : 'rgba(255,255,255,.55)'; } });
    }
    function restart() { clearInterval(timer); timer = setInterval(function () { show(idx + 1); }, 6000); }
    slider.querySelectorAll('.bn-arrow').forEach(function (b) { b.addEventListener('click', function () { show(idx + parseInt(b.getAttribute('data-dir') || '1', 10)); restart(); }); });
    dots.forEach(function (d, k) { d.addEventListener('click', function () { show(k); restart(); }); });
    var sx = null;
    slider.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true });
    slider.addEventListener('touchend', function (e) { if (sx === null) return; var dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 40) { show(idx + (dx < 0 ? 1 : -1)); restart(); } sx = null; }, { passive: true });
    show(0); restart();
  }

  // Mobile menu: the header burger opens the drawer state page in this static demo
  document.querySelectorAll('button[aria-label="Open menu"]').forEach(function (b) { b.addEventListener('click', function () { window.location.href = 'state-mobile-menu.html'; }); });
})();
