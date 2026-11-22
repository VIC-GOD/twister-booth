# Builds climb/index.html: copies the shared question bank out of runner/index.html into tools/climb-src.html.
import re,os
root=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
r=open(os.path.join(root,'runner/index.html')).read()
a=r.index('const C=window.CONTENT;');b=r.index('// ---------- settings ----------')
c=r.index('// ---------- random ----------');d=r.index('// ---------- extra strings ----------')
shared=r[a:b]+'let cfg={};const hp=(location.hash.match(/^#([a-z_]+)/)||[])[1];\n'+r[c:d]
src=open(os.path.join(root,'tools/climb-src.html')).read().replace('/*SHARED*/',shared)
open(os.path.join(root,'climb/index.html'),'w').write(src)
print('built',len(src))
# Live Duel uses the same shared bank.
src=open(os.path.join(root,'tools/duel-src.html')).read().replace('/*SHARED*/',shared)
os.makedirs(os.path.join(root,'duel'),exist_ok=True)
open(os.path.join(root,'duel/index.html'),'w').write(src)
print('built duel',len(src))
