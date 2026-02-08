
const API_URL = import.meta.env.VITE_API_URL || '';

export const notifySiteAccess = async () => {
  try {
    await fetch(`${API_URL}/api/access`);
  } catch (e) {
    console.error('Failed to notify site access', e);
  }
};

export const registerUser = async (user: any) => {
  try {
    await fetch(`${API_URL}/api/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
  } catch (e) {
    console.error('Failed to register user', e);
  }
};

export const postNeed = async (need: any) => {
  try {
    await fetch(`${API_URL}/api/post-need`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(need),
    });
  } catch (e) {
    console.error('Failed to post need', e);
  }
};

export const uploadMedia = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch(`${API_URL}/api/upload`, {
      method: 'POST',
      body: formData,
    });
    return await res.json();
  } catch (e) {
    console.error('Failed to upload media', e);
  }
};
