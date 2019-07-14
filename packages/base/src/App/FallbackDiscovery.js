import React, { useState, useEffect } from 'react';
import Page404 from './Page404';

export default function FallbackDiscovery({ location }) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // find routes and register them
    discoverNewRoutes(location.pathname).catch(() => {
      setLoading(false);
    });
  }, []);

  if (loading) {
    return 'Loading';
  }
  return <Page404 />;
}

const BASE_URL = __DISCOVERY_BASE_URL__;

async function discoverNewRoutes(location) {
  const match = location.match(/^\/([^/]+)/);
  if (match) {
    const response = await window.fetch(
      BASE_URL + `${match[1]}/app.json`
    );
    if (response.status !== 200) {
      throw new Error('Manifest not found for match[1]');
    }

    const { css, js } = await response.json();
    await injectStyles(css);
    await injectJS(js);
  }
}

function injectStyles(css) {
  for (const file of css) {
    const link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = file;
    document.head.appendChild(link);
  }
}

function injectJS(js) {
  for (const file of js) {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = file;
    document.body.appendChild(script);
  }
}