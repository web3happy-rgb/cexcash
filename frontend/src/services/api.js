const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000';

function getAuthHeaders() {
  const token = localStorage.getItem('cexcash_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    ...options
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Unexpected error' }));
    throw new Error(error.message || 'Request failed');
  }

  return response.json();
}

export const getPageContent = (slug) => apiRequest(`/api/content/${slug}`);

export const register = async (payload) => {
  const data = await apiRequest('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
  localStorage.setItem('cexcash_token', data.token);
  return data;
};

export const login = async (payload) => {
  const data = await apiRequest('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
  localStorage.setItem('cexcash_token', data.token);
  return data;
};

export const me = () => apiRequest('/api/auth/me', {
  headers: {
    ...getAuthHeaders()
  }
});

export const createReferral = (payload) => apiRequest('/api/referrals', {
  method: 'POST',
  body: JSON.stringify(payload),
  headers: getAuthHeaders()
});

export const listReferrals = () => apiRequest('/api/referrals', {
  headers: getAuthHeaders()
});

export const recordReferralActivity = (code, payload) => apiRequest(`/api/referrals/${code}/stats`, {
  method: 'POST',
  body: JSON.stringify(payload),
  headers: getAuthHeaders()
});

export const referralSummary = () => apiRequest('/api/referrals/summary/stats', {
  headers: getAuthHeaders()
});

export function clearToken() {
  localStorage.removeItem('cexcash_token');
}
