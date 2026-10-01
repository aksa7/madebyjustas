from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.recordingPen import RecordingPen
src = 'fontsrc/package/files/bodoni-moda-latin-opsz-normal.woff2'
F = instantiateVariableFont(TTFont(src), {'opsz': 18, 'wght': 640})
gs = F.getGlyphSet(); cmap = F.getBestCmap()
def verts(ch):
    rp = RecordingPen(); gs[cmap[ord(ch)]].draw(rp); cur=None; out=[]
    for op,args in rp.value:
        if op=='moveTo': cur=args[0]
        elif op=='lineTo':
            p=args[0]
            if cur and abs(p[0]-cur[0])<1 and abs(p[1]-cur[1])>300: out.append(round(cur[0]))
            cur=p
        elif op in ('qCurveTo','curveTo'): cur=args[-1]
    return sorted(set(out))
mv, jv = verts('M'), verts('J')
print('M verts', mv, 'J verts', jv)
m_l, m_r = mv[-2], mv[-1]; j_l, j_r = jv[0], jv[-1]
print('M right stem', m_l, m_r, 'J stem', j_l, j_r)
def path(ch, dx, dy):
    sp = SVGPathPen(gs); gs[cmap[ord(ch)]].draw(TransformPen(sp, (1,0,0,-1,dx,dy))); return sp.getCommands(), gs[cmap[ord(ch)]].width
BASE=1500; JDX = m_l - j_l; JDY = 520
md, mw = path('M', 0, BASE); jd,_ = path('J', JDX, BASE+JDY)
defs = f'''<clipPath id="mClipS" clipPathUnits="userSpaceOnUse"><rect x="-80" y="-80" width="{m_l-170+80}" height="{BASE+300}"/><rect x="{m_l-170}" y="-80" width="900" height="{BASE-70+80}"/><rect x="{m_l}" y="{BASE-70}" width="{m_r-m_l}" height="300"/></clipPath>
<clipPath id="jClipS" clipPathUnits="userSpaceOnUse"><rect x="{m_l-700}" y="{BASE-20}" width="1600" height="1100"/></clipPath>'''
body = f'<path clip-path="url(#mClipS)" d="{md}"/><path clip-path="url(#jClipS)" d="{jd}"/>'
pad=60; w=mw; h=BASE+JDY+120
open('logo-a-signet-small.svg','w').write(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{-pad} {-pad} {w+2*pad} {h+2*pad}" fill="currentColor"><defs>{defs}</defs>{body}</svg>')
print('ok')
