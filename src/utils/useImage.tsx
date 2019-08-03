var React = require('react');

var defaultState = { image: undefined, status: 'loading' };

export default function useImage(url: string, crossOrigin?: string) {
  var res = React.useState(defaultState);
  var image = res[0].image;
  var status = res[0].status;

  var setState = res[1];

  React.useEffect(() => {
    if (!url) return;
    const img = document.createElement('img');

    function onload() {
      setState({ image: img, status: 'loaded' });
    }

    function onerror() {
      setState({ image: undefined, status: 'failed' });
    }

    img.addEventListener('load', onload);
    img.addEventListener('error', onerror);
    crossOrigin && (img.crossOrigin = crossOrigin);
    img.src = url;

    return function cleanup() {
      img.removeEventListener('load', onload);
      img.removeEventListener('error', onerror);
      setState(defaultState);
    };
  }, [url, crossOrigin, setState]);

  return [image, status];
}
