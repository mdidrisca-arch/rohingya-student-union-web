/* Draws the blog cards from window.blogPosts (assets/blog-posts.js). Used in three places:
     1. the Blog page          (#blogList)       all posts, newest first, 9 at a time with a "Show more articles" button
     2. the home page          (#homeBlogGrid)   the 3 newest posts (the whole section stays hidden if there are no posts)
     3. the bottom of articles (#blogRelated)    up to 3 other posts, same label first
   If the list is empty or cannot load, the saved copy that is already in the page stays as it is. */
(function () {
  var PAGE = 9;
  var raw = Array.isArray(window.blogPosts) ? window.blogPosts : [];
  var posts = raw.filter(function (p) {
    return p && typeof p.title === 'string' && p.title && /^[a-z0-9]+(-[a-z0-9]+)*$/.test(p.slug || '') && /^\d{4}-\d{2}-\d{2}$/.test(p.date || '');
  }).sort(function (a, b) { return a.date < b.date ? 1 : a.date > b.date ? -1 : 0; });
  if (!posts.length) return;

  var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  function nice(d) { var m = d.split('-'); return MONTHS[+m[1] - 1] + ' ' + (+m[2]) + ', ' + m[0]; }
  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }

  function card(p, o) {
    o = o || {};
    var c = el('article', 'blog-card' + (o.feature ? ' blog-card--feature' : ''));
    var media = el('div', 'blog-card-media');
    if (typeof p.image === 'string' && (/^https:\/\//.test(p.image) || /^\/assets\/img\/[A-Za-z0-9_\/.-]+$/.test(p.image))) {
      var img = document.createElement('img');
      img.src = p.image; img.alt = p.imageAlt || ''; img.loading = o.eager ? 'eager' : 'lazy'; img.decoding = 'async';
      media.appendChild(img);
    } else { media.className += ' blog-card-media--none'; }
    c.appendChild(media);
    var body = el('div', 'blog-card-body');
    if (p.tag) body.appendChild(el('div', 'blog-card-tag', p.tag));
    var h = el(o.heading || 'h2', 'blog-card-title');
    var a = el('a', 'blog-card-link', p.title); a.href = '/blog/' + p.slug + '/';
    h.appendChild(a); body.appendChild(h);
    var meta = el('p', 'blog-card-meta');
    var t = document.createElement('time'); t.setAttribute('datetime', p.date); t.textContent = nice(p.date); meta.appendChild(t);
    if (p.author) meta.appendChild(document.createTextNode(' · By ' + p.author));
    body.appendChild(meta);
    if (p.excerpt) body.appendChild(el('p', 'blog-card-excerpt', p.excerpt));
    var more = el('span', 'blog-read-more', 'Read story →'); more.setAttribute('aria-hidden', 'true'); body.appendChild(more);
    c.appendChild(body); return c;
  }

  /* 1. Blog page */
  var list = document.getElementById('blogList');
  if (list) {
    var grid = el('div', 'blog-grid'), shown = 0;
    var more = el('div', 'blog-more'), btn = el('button', 'btn btn-outline', 'Show more articles'), status = el('p', 'blog-more-status');
    btn.type = 'button'; status.setAttribute('role', 'status'); status.setAttribute('aria-live', 'polite');
    more.appendChild(btn); more.appendChild(status);
    function show() {
      var first = shown, end = Math.min(posts.length, shown + PAGE);
      for (; shown < end; shown++) grid.appendChild(card(posts[shown], { feature: shown === 0, eager: shown === 0 }));
      more.hidden = shown >= posts.length;
      status.textContent = posts.length > PAGE ? 'Showing ' + shown + ' of ' + posts.length + ' articles' : '';
      if (first > 0) { var link = grid.children[first] && grid.children[first].querySelector('a'); if (link) link.focus({ preventScroll: false }); }
    }
    btn.addEventListener('click', show);
    list.textContent = ''; list.appendChild(grid); list.appendChild(more); show();
  }

  /* 2. Home page: the 3 newest */
  var hg = document.getElementById('homeBlogGrid');
  if (hg) {
    var hp = posts.slice(0, 3); if (hp.length === 2) hg.className += ' blog-grid--n2';
    hp.forEach(function (p) { hg.appendChild(card(p, { heading: 'h3', feature: hp.length === 1 })); });
    var hs = document.getElementById('homeBlog'); if (hs) hs.hidden = false;
  }

  /* 3. Related articles at the bottom of an article */
  var rel = document.getElementById('blogRelated');
  if (rel) {
    var me = rel.getAttribute('data-slug'), mine = posts.filter(function (p) { return p.slug === me; })[0];
    var others = posts.filter(function (p) { return p.slug !== me; });
    var tag = mine && mine.tag;
    others.sort(function (a, b) { var sa = tag && a.tag === tag ? 1 : 0, sb = tag && b.tag === tag ? 1 : 0; return sb - sa || (a.date < b.date ? 1 : a.date > b.date ? -1 : 0); });
    var pick = others.slice(0, 3);
    if (pick.length) {
      var rg = rel.querySelector('.blog-grid'); if (pick.length === 2) rg.className += ' blog-grid--n2';
      pick.forEach(function (p) { rg.appendChild(card(p, { heading: 'h3', feature: pick.length === 1 })); });
      rel.hidden = false;
    }
  }
})();
