/** A URL as people read it on paper: no protocol, no «www.», no trailing slash. */
export const displayUrl = (url: string) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
