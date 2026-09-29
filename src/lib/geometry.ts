/** Layout math used by client scripts, kept free of the DOM so it can be tested. */

type Box = { left: number; width: number };

/** Position of a year on the timeline axis, as a CSS percentage. */
export function yearToPercent(year: number, range: { from: number; to: number }) {
  return `${(((year - range.from) / (range.to - range.from)) * 100).toFixed(2)}%`;
}

/**
 * Horizontal offset, inside the panel, of the pointer aiming at the centre of
 * the trigger; kept `margin` px away from the panel's rounded corners.
 */
export function pointerOffset(trigger: Box, panel: Box, margin = 24) {
  const centre = trigger.left + trigger.width / 2 - panel.left;
  return Math.min(Math.max(centre, margin), panel.width - margin);
}

/**
 * scrollLeft that centres a link inside a horizontally scrolling list. Boxes
 * are viewport rectangles, so the link's position is measured from the list.
 */
export function centerScrollLeft(scrollLeft: number, list: Box, link: Box) {
  return Math.max(0, scrollLeft + (link.left - list.left) - (list.width - link.width) / 2);
}
