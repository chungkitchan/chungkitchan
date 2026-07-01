/* ── CSV parser ───────────────────────────────────────────────── */
function parseCSV(text) {
  var lines = text.trim().split('\n');
  var headers = lines[0].split(',').map(function (h) { return h.trim(); });
  return lines.slice(1).map(function (line) {
    var cols = [], cur = '', inQ = false;
    for (var i = 0; i < line.length; i++) {
      var ch = line[i];
      if (ch === '"') { inQ = !inQ; }
      else if (ch === ',' && !inQ) { cols.push(cur.trim()); cur = ''; }
      else { cur += ch; }
    }
    cols.push(cur.trim());
    var obj = {};
    headers.forEach(function (h, idx) { obj[h] = cols[idx] || ''; });
    return obj;
  }).filter(function (row) { return row[headers[0]]; });
}

function escHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* ── Build portfolio cards ────────────────────────────────────── */
function buildCards(items) {
  var grid      = document.getElementById('portfolio-grid');
  var filterRow = document.getElementById('filter-row');
  if (!grid || !filterRow) return;

  grid.innerHTML = '';

  var cats = ['All'].concat(
    items.map(function (i) { return i.category; })
         .filter(function (c, idx, arr) { return c && arr.indexOf(c) === idx; })
  );

  filterRow.innerHTML = '';
  cats.forEach(function (cat) {
    var btn = document.createElement('button');
    btn.className = 'filter-btn' + (cat === 'All' ? ' active' : '');
    btn.dataset.cat = cat;
    btn.textContent = cat;
    btn.addEventListener('click', function () {
      filterRow.querySelectorAll('.filter-btn').forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      filterCards(cat);
    });
    filterRow.appendChild(btn);
  });

  items.forEach(function (item) {
    var card = document.createElement('div');
    card.className = 'portfolio-card reveal';
    card.dataset.cat = item.category || '';

    var embedUrl = (item.link || '')
      .replace('watch?v=', 'embed/')
      .replace('youtu.be/', 'www.youtube.com/embed/')
      .replace('youtube.com/shorts/', 'youtube.com/embed/');
    if (embedUrl.indexOf('youtube.com/embed/') !== -1 && embedUrl.indexOf('?') === -1) {
      embedUrl += '?rel=0&modestbranding=1';
    }

    card.innerHTML =
      '<div class="card-thumb">' +
        '<div class="play-overlay" title="Play">' +
          '<div class="play-btn">' +
            '<svg viewBox="0 0 24 24"><polygon points="5,3 19,12 5,21"/></svg>' +
          '</div>' +
          '<span class="play-label">Click to play</span>' +
        '</div>' +
        '<iframe src="" data-src="' + escHtml(embedUrl) + '" allowfullscreen loading="lazy" allow="autoplay; encrypted-media"></iframe>' +
      '</div>' +
      '<div class="card-body">' +
        '<span class="card-category">' + escHtml(item.category || '') + '</span>' +
        '<div class="card-title">'    + escHtml(item.title    || '') + '</div>' +
        '<div class="card-year">'     + escHtml(item.year     || '') + '</div>' +
        '<p class="card-desc">'       + escHtml(item.description || '') + '</p>' +
      '</div>';

    var overlay = card.querySelector('.play-overlay');
    var iframe  = card.querySelector('iframe');
    overlay.addEventListener('click', function () {
      var src = iframe.dataset.src;
      if (src) {
        iframe.src = src + (src.indexOf('?') !== -1 ? '&' : '?') + 'autoplay=1';
      }
      overlay.style.display = 'none';
      iframe.style.display  = 'block';
    });

    grid.appendChild(card);
  });

  triggerReveal();
}

function filterCards(cat) {
  document.querySelectorAll('.portfolio-card').forEach(function (card) {
    card.style.display = (cat === 'All' || card.dataset.cat === cat) ? '' : 'none';
  });
}

/* ── Fetch & render ───────────────────────────────────────────── */
var csvPath = (window.SITE_BASEURL || '').replace(/\/$/, '') + '/portfolio.csv';
fetch(csvPath)
  .then(function (r) {
    if (!r.ok) throw new Error('Failed to load portfolio.csv');
    return r.text();
  })
  .then(function (text) {
    var items = parseCSV(text);
    var grid  = document.getElementById('portfolio-grid');
    if (!grid) return;
    if (items.length === 0) {
      grid.innerHTML = '<p style="color:var(--muted);grid-column:1/-1;">No portfolio items yet. Check back soon!</p>';
    } else {
      buildCards(items);
    }
  })
  .catch(function (err) {
    var grid = document.getElementById('portfolio-grid');
    if (grid) grid.innerHTML = '<p style="color:var(--muted);grid-column:1/-1;">Could not load portfolio: ' + escHtml(err.message) + '</p>';
  });

/* ── Scroll-reveal ────────────────────────────────────────────── */
function triggerReveal() {
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(function (el) { observer.observe(el); });
}
triggerReveal();
