import {ProviderBenchmarks, YearlyTrendsChart} from './components'
import {useProductBenchmarks,useProductYearlyTrends} from './hooks'
import "./App.scss";

function App() {
  const {
    totals,
    isLoading,
    ratesLoading,
    error,
    ratesError,
  } = useProductBenchmarks();

  const {
    filteredTrends,
    isLoading: trendsLoading,
    error: trendsError,
  } = useProductYearlyTrends();

  if (isLoading || ratesLoading || trendsLoading) return <div>Loading...</div>;
  if (error || ratesError || trendsError)
    return (
      <div>Error: {error?.message || ratesError?.message || trendsError?.message}</div>
    );

  return (
    <div>
      <ProviderBenchmarks totals={totals} />
      <h2>Year-on-Year Payment Trends</h2>
      {filteredTrends.map(([product, yearlyData]) => (
        <YearlyTrendsChart key={product} product={product} yearlyData={yearlyData} />
      ))}
    </div>
  );
}

export default App;
