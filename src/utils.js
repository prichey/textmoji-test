export const loadWebfonts = () => {
  const wf = document.createElement('script');
  wf.src = `${
    document.location.protocol === 'https:' ? 'https' : 'http'
  }://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js`;
  wf.type = 'text/javascript';
  wf.async = 'true';
  const s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(wf, s);
};

export const sanitizeFilename = str => str.replace(/([^a-z0-9]+)/gi, '');
