from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen

src = 'fontsrc/package/files/bodoni-moda-latin-opsz-normal.woff2'
def instance(wght):
    f = TTFont(src); return instantiateVariableFont(f, {'opsz': 96, 'wght': wght})
F400, F500 = instance(400), instance(500)

def glyph_path(font, ch, dx=0, dy=0, scale=1.0):
    gs = font.getGlyphSet(); g = font.getBestCmap()[ord(ch)]
    sp = SVGPathPen(gs)
    tp = TransformPen(sp, (scale, 0, 0, -scale, dx, dy))  # flip y for SVG
    gs[g].draw(tp)
    return sp.getCommands(), gs[g].width * scale

# --- A: MJ ligature. J's stem continues M's right stem below the baseline. ---
CAP = 1500; BASE = 1500  # baseline at y=1500 in SVG space (y flipped)
J_DX, J_DY = 868, 560    # stem alignment (M right stem x=1287, J stem x=419) and drop
m_d, m_w = glyph_path(F400, 'M', dx=0, dy=BASE)
j_d, _ = glyph_path(F400, 'J', dx=J_DX, dy=BASE + J_DY)
# Clip M: drop the right leg's bottom serif so the stem flows straight into the J.
# Clip J: only what sits below the baseline.
sig_w, sig_h = m_w + 40, BASE + 700
signet_defs = f'''<clipPath id="mClip" clipPathUnits="userSpaceOnUse">
  <rect x="-50" y="-50" width="1170" height="{BASE+200}"/>
  <rect x="1120" y="-50" width="700" height="{BASE-60+50}"/>
  <rect x="1287" y="{BASE-60}" width="190" height="200"/>
</clipPath>
<clipPath id="jClip" clipPathUnits="userSpaceOnUse">
  <rect x="700" y="{BASE-20}" width="1200" height="1000"/>
</clipPath>'''
signet_body = f'<path clip-path="url(#mClip)" d="{m_d}"/><path clip-path="url(#jClip)" d="{j_d}"/>'

def svg(w, h, defs, body, pad=0, vb_y=0):
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{-pad} {vb_y-pad} {w+2*pad} {h+2*pad}" fill="currentColor"><defs>{defs}</defs>{body}</svg>'

open('logo-a-signet.svg','w').write(svg(sig_w, sig_h, signet_defs, signet_body, pad=40))

# --- B: spaced wordmark ---
def word(font, text, x0, base, scale=1.0, tracking=0.0):
    x = x0; parts = []
    for ch in text:
        if ch == ' ':
            x += 520 * scale + tracking; continue
        d, adv = glyph_path(font, ch, dx=x, dy=base, scale=scale)
        parts.append(f'<path d="{d}"/>'); x += adv + tracking
    return ''.join(parts), x - tracking

wm_body, wm_w = word(F500, 'MADE BY JUSTAS', 0, BASE, tracking=520)
open('logo-b-wordmark.svg','w').write(svg(wm_w, BASE, '', wm_body, pad=40))

# --- C: lockup (signet scaled + hairline + wordmark) ---
s = 0.62  # signet scale relative to wordmark cap height
lk_sig = f'<g transform="scale({s})">{signet_body}</g>'
rule_x = sig_w * s + 420
rule = f'<rect x="{rule_x}" y="{BASE*s*0.02}" width="14" height="{(BASE+560)*s}" opacity="0.4"/>'
wm2_body, wm2_w = word(F500, 'MADE BY JUSTAS', rule_x + 420, BASE*s*0.5 + 520, scale=0.42, tracking=230)
lk_w = wm2_w
open('logo-c-lockup.svg','w').write(svg(lk_w, (BASE+700)*s, signet_defs, lk_sig + rule + wm2_body, pad=40))
print('ok', round(sig_w), round(wm_w), round(lk_w))
