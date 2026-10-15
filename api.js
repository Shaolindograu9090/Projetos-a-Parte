const REPOS = [
  'facebook/react','microsoft/vscode','vercel/next.js','huggingface/transformers',
  'ollama/ollama','langchain-ai/langchain','python/cpython','torvalds/linux'
];
const KEV_URL = 'https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json';
const HN_URL = 'https://hacker-news.firebaseio.com/v0';

async function getJson(url, timeout=12000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(url, {signal: controller.signal, headers: {'Accept':'application/json'}});
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } finally { clearTimeout(timer); }
}
export async function loadRepos() {
  const results = await Promise.allSettled(REPOS.map(name => getJson(`https://api.github.com/repos/${name}`)));
  const repos = results.filter(x=>x.status==='fulfilled').map(x=>x.value);
  if (!repos.length) throw new Error('GitHub indisponível ou limite de API atingido');
  return repos.map(r=>({name:r.name, fullName:r.full_name, description:r.description || 'Sem descrição pública', stars:r.stargazers_count, forks:r.forks_count, issues:r.open_issues_count, language:r.language || 'Outros', pushedAt:r.pushed_at, url:r.html_url, avatar:r.owner?.avatar_url}));
}
export async function loadKev() {
  const data = await getJson(KEV_URL);
  const vulnerabilities = data.vulnerabilities || [];
  const latest = [...vulnerabilities].sort((a,b)=>new Date(b.dateAdded)-new Date(a.dateAdded));
  const vendors = Object.entries(vulnerabilities.reduce((acc,v)=>{const k=v.vendorProject || 'Desconhecido';acc[k]=(acc[k]||0)+1;return acc;},{}))
    .sort((a,b)=>b[1]-a[1]).slice(0,8).map(([name,count])=>({name,count}));
  const yearCounts = Object.entries(vulnerabilities.reduce((acc,v)=>{const y=(v.dateAdded||'').slice(0,4);if(y)acc[y]=(acc[y]||0)+1;return acc;},{}))
    .sort(([a],[b])=>a.localeCompare(b)).slice(-7).map(([year,total])=>({year,total}));
  return {count:data.count || vulnerabilities.length, version:data.catalogVersion, released:data.dateReleased, latest:latest.slice(0,8), vendors, yearCounts, ransomware:vulnerabilities.filter(v=>v.knownRansomwareCampaignUse==='Known').length};
}
export async function loadHackerNews() {
  const ids = await getJson(`${HN_URL}/topstories.json`);
  const items = await Promise.all(ids.slice(0,12).map(id=>getJson(`${HN_URL}/item/${id}.json`).catch(()=>null)));
  return items.filter(x=>x && x.title).slice(0,8).map(x=>({id:x.id,title:x.title,score:x.score||0,by:x.by||'unknown',time:x.time,url:x.url||`https://news.ycombinator.com/item?id=${x.id}`,comments:x.descendants||0}));
}
export async function loadAll() {
  const [repos,kev,news] = await Promise.allSettled([loadRepos(),loadKev(),loadHackerNews()]);
  return {
    repos: repos.status==='fulfilled'?repos.value:null,
    kev: kev.status==='fulfilled'?kev.value:null,
    news: news.status==='fulfilled'?news.value:null,
    errors: [repos,kev,news].filter(x=>x.status==='rejected').map(x=>x.reason?.message || 'Falha de conexão')
  };
}
