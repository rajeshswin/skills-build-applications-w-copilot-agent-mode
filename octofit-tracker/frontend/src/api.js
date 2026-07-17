const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

const normalizeResponse = (payload) => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload?.data && Array.isArray(payload.data)) {
    return payload.data;
  }

  if (payload?.results && Array.isArray(payload.results)) {
    return payload.results;
  }

  if (payload?.items && Array.isArray(payload.items)) {
    return payload.items;
  }

  return payload && typeof payload === 'object' ? [payload] : [];
};

export async function fetchResource(resource) {
  const response = await fetch(`${apiBaseUrl}/${resource}/`);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to load ${resource}: ${response.status} ${response.statusText} - ${errorText}`);
  }

  const payload = await response.json();
  return normalizeResponse(payload);
}
