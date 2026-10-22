/* Draws the post cards on the Blog page from window.blogPosts (assets/blog-posts.js).
   If the list is empty, the "first stories are on the way" message in the page stays as it is. */
(function () {
  var list = document.getElementById('blogList');
  if (!list) return;
  var raw = Array.isArray(window.blogPosts) ? window.blogPosts : [];
  var posts = raw.filter(function (p) {
    return p && typeof p.title === 'string' && p.title && /^[a-z0-9]+(-[a-z0-9]+)*$/.test(p.slug || '') && /^\d{4}-\d{2}-\d{2}$/.test(p.date || '');
  }).sort(function (a, b) { return a.date < b.date ? 1 : a.date > b.date ? -1 : 0; });
  if (!posts.length) return;

  var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  function nice(d) { var m = d.split('-'); return MONTHS[+m[1] - 1] + ' ' + (+m[2]) + ', ' + m[0]; }
  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }

  var grid = el('div', 'blog-grid');
  posts.forEach(function (p, i) {
    var card = el('article', 'blog-card' + (i === 0 ? ' blog-card--feature' : ''));
    var media = el('div', 'blog-card-media');
    if (typeof p.image === 'string' && (/^https:\/\//.test(p.image) || /^\/assets\/img\/[A-Za-z0-9_\/.-]+$/.test(p.image))) {
      var img = document.createElement('img');
      img.src = p.image; img.alt = p.imageAlt || ''; img.loading = i === 0 ? 'eager' : 'lazy'; img.decoding = 'async';
      media.appendChild(img);
    } else { media.className += ' blog-card-media--none'; }
    card.appendChild(media);
    var body = el('div', 'blog-card-body');
    if (p.tag) body.appendChild(el('div', 'blog-card-tag', p.tag));
    var h = el('h2', 'blog-card-title');
    var a = el('a', 'blog-card-link', p.title); a.href = '/blog/' + p.slug + '/';
    h.appendChild(a); body.appendChild(h);
    var meta = el('p', 'blog-card-meta');
    var t = document.createElement('time'); t.setAttribute('datetime', p.date); t.textContent = nice(p.date); meta.appendChild(t);
    if (p.author) meta.appendChild(document.createTextNode(' · By ' + p.author));
    body.appendChild(meta);
    if (p.excerpt) body.appendChild(el('p', 'blog-card-excerpt', p.excerpt));
    var more = el('span', 'blog-read-more', 'Read story →'); more.setAttribute('aria-hidden', 'true'); body.appendChild(more);
    card.appendChild(body); grid.appendChild(card);
  });
  list.textContent = '';
  list.appendChild(grid);
})();
