const linksContainer = document.getElementById('links');
const themeToggle = document.getElementById('themeToggle');
const silhouette = document.querySelector('.silhouette');

function setTheme(dark){
  if(dark) document.body.classList.add('dark');
  else document.body.classList.remove('dark');
  localStorage.setItem('themeDark', dark ? '1' : '0');
  updateToggleIcon(dark);
}

function updateToggleIcon(dark){
  // Sun for light mode (dark=false), Moon for dark mode (dark=true)
  if(!silhouette) return;
  if(dark){
    // moon (white silhouette on dark)
    silhouette.innerHTML = `
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none">
        <path d="M21 12.8A9 9 0 1111.2 3 7 7 0 0021 12.8z" fill="currentColor" />
      </svg>`;
    silhouette.style.color = '#fff';
  } else {
    // sun (dark silhouette on light)
    silhouette.innerHTML = `
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none">
        <circle cx="12" cy="12" r="4" fill="currentColor" />
        <g stroke="currentColor" stroke-width="1.2" stroke-linecap="round">
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="M4.2 4.2l1.4 1.4" />
          <path d="M18.4 18.4l1.4 1.4" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="M4.2 19.8l1.4-1.4" />
          <path d="M18.4 5.6l1.4-1.4" />
        </g>
      </svg>`;
    silhouette.style.color = 'var(--text)';
  }
}

// Initialize theme
const saved = localStorage.getItem('themeDark');
if(saved === null){
  // use prefers-color-scheme as default
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  setTheme(prefersDark);
} else {
  setTheme(saved === '1');
}

themeToggle.addEventListener('click', () => {
  const isDark = document.body.classList.toggle('dark');
  localStorage.setItem('themeDark', isDark ? '1' : '0');
  updateToggleIcon(isDark);
});

// Load links.json and render
async function loadLinks(){
  try{
    const res = await fetch('links.json', {cache:'no-store'});
    if(!res.ok) throw new Error('links.json を取得できませんでした');
    const links = await res.json();
    renderLinks(links);
  }catch(err){
    linksContainer.innerHTML = `<p class="url">読み込みエラー: ${err.message}</p>`;
  }
}

async function renderLinks(links){
  linksContainer.innerHTML = '';
  for(const item of links){
    const a = document.createElement('a');
    a.className = 'card';
    a.href = item.url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.setAttribute('aria-label', `${item.name} を新しいタブで開く`);
    a.tabIndex = 0;

    const iconWrap = document.createElement('div');
    iconWrap.className = 'icon-wrap';
    // fetch svg icon and inline it (icon placed above title to center)
    try{
      const iconRes = await fetch(`icons/${item.icon}`);
      if(iconRes.ok){
        const svgText = await iconRes.text();
        iconWrap.innerHTML = svgText;
        const svgEl = iconWrap.querySelector('svg');
        if(svgEl) svgEl.setAttribute('aria-hidden','true');
      } else {
        iconWrap.textContent = item.name[0] || '?';
      }
    }catch(e){
      iconWrap.textContent = item.name[0] || '?';
    }

    const meta = document.createElement('div');
    meta.className = 'meta';

    const title = document.createElement('div');
    title.className = 'title';
    title.textContent = item.name;

    const description = document.createElement('div');
    description.className = 'description';
    description.textContent = item.description || item.url.replace(/^https?:\/\//,'');

    meta.appendChild(title);
    meta.appendChild(description);

    a.appendChild(iconWrap);
    a.appendChild(meta);

    // keyboard support: Enter opens link (anchor already does this) but ensure Space too
    a.addEventListener('keydown', (e)=>{
      if(e.key === ' '){ e.preventDefault(); a.click(); }
    });

    linksContainer.appendChild(a);
  }
}

loadLinks();
