import React from "react";

export const ProviderBenchmarks = ({ totals }) => {
  return (
    <div>
      <h1>Provider Payment Benchmarks</h1>
      {Object.entries(totals).map(
        ([provider, { totalPayment, totalBenchmark, totalDifference }]) => (
          <div key={provider} className="provider_info">
            <h2>{provider}</h2>
            <div>Total Payment: €{totalPayment}</div>
            <div>Total Benchmark: €{totalBenchmark}</div>
            <div className="provider_info__total-difference">
              Total Difference: €
              <span className={totalDifference < 0 ? "--under" : "--over"}>
                {totalDifference}
              </span>
            </div>
          </div>
        )
      )}
    </div>
  );
};


