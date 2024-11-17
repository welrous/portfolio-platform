document.addEventListener("DOMContentLoaded", () => {
    // Load Financial Data and Render Chart
    loadFinancialData();
  
    // Load News Data
    loadNewsData();
  });
  
  // Function to Load Financial Data
  async function loadFinancialData() {
    const apiKey = 'YO8CTUQP1S4VS9PU'; // Alpha Vantage API key
    const symbol = 'AAPL'; // Example stock symbol
    const apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&apikey=${apiKey}`;
    
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      const timeSeries = data['Time Series (Daily)'];
  
      if (!timeSeries) throw new Error("No time series data available");
  
      // Extracting dates and closing prices
      const dates = Object.keys(timeSeries).slice(0, 10).reverse();
      const prices = dates.map(date => parseFloat(timeSeries[date]['4. close']));
  
      // Render Chart
      renderFinanceChart(dates, prices);
    } catch (error) {
      console.error("Error loading financial data:", error);
    }
  }
  
  // Function to Render Financial Chart
  function renderFinanceChart(dates, prices) {
    const ctx = document.getElementById('finance-chart').getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: dates,
        datasets: [{
          label: 'Stock Price',
          data: prices,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderWidth: 1,
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: false
          }
        }
      }
    });
  }
  
  // Function to Load News Data
  async function loadNewsData() {
    const apiKey = 'ef4cf86c8b2544bb8bbf5d84523f2ff6'; // News API key
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
  
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      const articles = data.articles.slice(0, 4);
  
      // Render News Articles
      const newsContainer = document.getElementById('news-container');
      articles.forEach(article => {
        const articleElement = document.createElement('div');
        articleElement.classList.add('news-item');
        articleElement.innerHTML = `
          <h3>${article.title}</h3>
          <p>${article.description}</p>
          <a href="${article.url}" target="_blank">Read More</a>
        `;
        newsContainer.appendChild(articleElement);
      });
    } catch (error) {
      console.error("Error loading news data:", error);
    }
  }
  