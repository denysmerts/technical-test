import { useQuery } from "@tanstack/react-query";
import { fetchExchangeRates,fetchProductBenchmarks } from "../api"



export const useProductBenchmarks = () => {
  const {data,error,isLoading} = useQuery({
    queryKey: ["product_benchmarks"],
    queryFn: fetchProductBenchmarks,
  });

  const {data: exchangeRatesData,error: ratesError,isLoading: ratesLoading } = useQuery({
    queryKey: ["exchange_rates"],
    queryFn: fetchExchangeRates,
  });


  const totals = data?.product_benchmarks.reduce((acc, benchmark) => {
    const { provider_name, payment, benchmark: benchmarkPrice, currency } = benchmark;

   
    if (!acc[provider_name]) {
      acc[provider_name] = { totalPayment: 0, totalBenchmark: 0, totalDifference: 0 };
    }

    
    const exchangeRate = exchangeRatesData?.exchange_rates?.find(
      (rate) => rate.from_currency_id === currency.id && rate.to_currency_id === 978
    );

   
    const paymentInEuros = exchangeRate ? payment * exchangeRate.exchange_rate : payment;
    const benchmarkInEuros = exchangeRate ? benchmarkPrice * exchangeRate.exchange_rate : benchmarkPrice;

    
    acc[provider_name].totalPayment += paymentInEuros;
    acc[provider_name].totalBenchmark += benchmarkInEuros;

    
    acc[provider_name].totalDifference = acc[provider_name].totalBenchmark - acc[provider_name].totalPayment;

    return acc;
  }, {});

  return {
    totals,
    isLoading,
    ratesLoading,
    error,
    ratesError,
  };
};


