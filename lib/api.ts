// lib/api.ts
export const fetchDataFromApi = async (url: string): Promise<any> => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      return await response.json();
    } catch (error: any) {
      throw new Error(error.message || 'Unknown error occurred');
    }
  };
  