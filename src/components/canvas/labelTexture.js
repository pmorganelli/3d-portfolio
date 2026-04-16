import * as THREE from 'three'
import { prepareWithSegments, layoutWithLines } from '@chenglou/pretext'

// ─── Canvas dimensions & font strings ────────────────────────────────────────
export const LBL_W   = 320;
export const LBL_H   = 88;
const NAME_F  = 'bold 15px system-ui, -apple-system, sans-serif';
const TAG_F   = '11px system-ui, -apple-system, sans-serif';
const TEXT_LH = 22;

/** Lightens a 6-digit hex color toward white by `ratio` (0–1). */
export function lighten(hex, ratio) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const mix = (c) => Math.round(c + (255 - c) * ratio);
  return `rgb(${mix(r)},${mix(g)},${mix(b)})`;
}

/**
 * Builds a THREE.CanvasTexture label pill using Pretext for exact text measurement.
 *
 * Layout: [colored dot] [name in bold] [tag chip]
 * All widths are measured via Pretext's `layoutWithLines(prepared, 4000, lh).lines[0].width`
 * trick — passing a huge maxWidth prevents wrapping, so lines[0].width is the exact
 * natural pixel width of each text segment.
 */
export function makeLabelTexture(name, tag, color) {
  const canvas  = document.createElement('canvas');
  canvas.width  = LBL_W;
  canvas.height = LBL_H;
  const ctx = canvas.getContext('2d');

  const namePrepared = prepareWithSegments(name, NAME_F);
  const tagPrepared  = tag ? prepareWithSegments(tag, TAG_F) : null;

  const nameW = layoutWithLines(namePrepared, 4000, TEXT_LH).lines[0]?.width ?? 0;
  const tagW  = tagPrepared
    ? layoutWithLines(tagPrepared, 4000, TEXT_LH).lines[0]?.width ?? 0
    : 0;

  const dotR     = 5, dotGap = 7, segGap = 9, chipPadX = 9;
  const pillPadX = 14, pillPadY = 10;
  const chipW    = tag ? tagW + chipPadX * 2 : 0;
  const chipH    = TEXT_LH - 4;
  const contentW = dotR * 2 + dotGap + nameW + (tag ? segGap + chipW : 0);
  const pillW    = Math.min(contentW + pillPadX * 2, LBL_W - 8);
  const pillH    = TEXT_LH + pillPadY * 2;
  const pillX    = (LBL_W - pillW) / 2;
  const pillY    = (LBL_H - pillH) / 2;
  const pillR    = pillH / 2;
  const baseline = pillY + pillPadY + TEXT_LH * 0.76;
  let   curX     = pillX + pillPadX;

  // Pill background
  ctx.fillStyle = 'rgba(6, 8, 16, 0.90)';
  ctx.beginPath(); ctx.roundRect(pillX, pillY, pillW, pillH, pillR); ctx.fill();

  // Pill border
  ctx.strokeStyle = color ? `${color}50` : 'rgba(255,255,255,0.18)';
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.roundRect(pillX, pillY, pillW, pillH, pillR); ctx.stroke();

  // Colored dot
  ctx.beginPath();
  ctx.arc(curX + dotR, baseline - dotR * 0.3, dotR, 0, Math.PI * 2);
  ctx.fillStyle = color || '#ffffff'; ctx.fill();
  curX += dotR * 2 + dotGap;

  // Tech name
  ctx.font = NAME_F; ctx.fillStyle = '#f2f2f2';
  ctx.fillText(name, curX, baseline);
  curX += nameW + segGap;

  // Tag chip
  if (tag && tagPrepared) {
    const chipX = curX;
    const chipY = pillY + (pillH - chipH) / 2;
    ctx.fillStyle = color ? `${color}22` : 'rgba(255,255,255,0.08)';
    ctx.beginPath(); ctx.roundRect(chipX, chipY, chipW, chipH, chipH / 2); ctx.fill();
    ctx.strokeStyle = color ? `${color}55` : 'rgba(255,255,255,0.22)';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.roundRect(chipX, chipY, chipW, chipH, chipH / 2); ctx.stroke();
    ctx.font = TAG_F;
    ctx.fillStyle = color ? lighten(color, 0.3) : '#aaaaaa';
    ctx.fillText(tag, chipX + (chipW - tagW) / 2, chipY + chipH * 0.72);
  }

  return new THREE.CanvasTexture(canvas);
}
