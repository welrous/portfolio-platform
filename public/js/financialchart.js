document.addEventListener("DOMContentLoaded", () => {
    const ctx = document.getElementById("financial-chart").getContext("2d");
  
    const API_KEY = "OI7G54RTG4S84JIP";
    const SYMBOL = "AAPL";
  
    async function fetchFinancialData() {
      try {
        const response = await fetch(
          `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${SYMBOL}&apikey=${API_KEY}`
        );
        const data = await response.json();
  
        if (!data["Time Series (Daily)"]) {
          alert("Error fetching financial data.");
          return;
        }
  
        const timeSeries = data["Time Series (Daily)"];
        const dates = Object.keys(timeSeries).slice(0, 10).reverse();
        const prices = dates.map((date) => parseFloat(timeSeries[date]["4. close"]));
  
        renderChart(dates, prices);
      } catch (error) {
        console.error("Financial data error:", error);
        alert("Error loading financial chart.");
      }
    }
  
    function renderChart(dates, prices) {
      new Chart(ctx, {
        type: "line",
        data: {
          labels: dates,
          datasets: [
            {
              label: `${SYMBOL} Stock Prices`,
              data: prices,
              borderColor: "#007BFF",
              backgroundColor: "rgba(0, 123, 255, 0.1)",
              borderWidth: 2,
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: "top",
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: "Date",
                font: { size: 14 },
              },
            },
            y: {
              title: {
                display: true,
                text: "Price (USD)",
                font: { size: 14 },
              },
            },
          },
        },
      });
    }
  
    fetchFinancialData();
  });
  