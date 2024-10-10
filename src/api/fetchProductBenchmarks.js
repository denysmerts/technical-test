export const fetchProductBenchmarks = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/product_benchmarks`, {
      method: 'GET',
      headers: {
        'auth-key': import.meta.env.VITE_API_KEY
      },
    });
  
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    return response.json();
  };