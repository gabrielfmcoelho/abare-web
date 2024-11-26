// src/api/apiClient.ts

export const apiClient = async <T>(url: string): Promise<T> => {
    const token = localStorage.getItem('authToken'); // Ou recuperar dos cookies
  
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        //...(token && { 'Authorization': `Bearer ${token}` }),
      },
    });
  
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Error ${response.status}: ${errorMessage}`);
    }
  
    const data: T = await response.json();
    return data;
  };