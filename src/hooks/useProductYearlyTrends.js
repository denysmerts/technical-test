import { useQuery } from "@tanstack/react-query";
import { fetchProductBenchmarks } from "../api";

export const useProductYearlyTrends = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["product_benchmarks"],
    queryFn: fetchProductBenchmarks,
  });

  
  const trends = data?.product_benchmarks.reduce((acc, benchmark) => {
    const { product_name, payment, start_date } = benchmark;
    
    
    const year = new Date(start_date).getFullYear();

    
    if (!acc[product_name]) {
      acc[product_name] = {};
    }

    
    if (!acc[product_name][year]) {
      acc[product_name][year] = 0;
    }

    acc[product_name][year] += payment;

    return acc;
  }, {});

 
  const filteredTrends = Object.entries(trends || {}).filter(
    ([, yearlyData]) => Object.keys(yearlyData).length > 1
  );

  return {
    filteredTrends,
    isLoading,
    error,
  };
};


