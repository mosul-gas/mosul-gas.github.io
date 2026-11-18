const C='mawqif-v71';
self.addEventListener('install',e=>{self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const req=e.request;if(req.method!=='GET')return;
  const isPage=req.mode==='navigate'||/\/(index\.html)?(\?.*)?$/.test(new URL(req.url).pathname);
  e.respondWith(fetch(req,isPage?{cache:'no-store'}:{}).then(r=>{const cp=r.clone();caches.open(C).then(c=>c.put(req,cp));return r}).catch(()=>caches.match(req).then(r=>r||caches.match('index.html'))))});
