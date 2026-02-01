/* ═══════════════════════════════════════════════════════════════
   📊 Gold & Currency Price Tracker - Main JavaScript
   ═══════════════════════════════════════════════════════════════ */

// Global State
let marketData = [];
let currentCountry = 'EGP';
let currentKarat = '21';
let goldChart = null;
let dollarChart = null;
let isConverting = false; // Prevent infinite loops in currency converter

/* ═══════════════════════════════════════════════════════════════
   🚀 Initialization
   ═══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', async () => {
    await loadMarketData();
    initializeUI();
});

/* ═══════════════════════════════════════════════════════════════
   📥 Data Loading
   ═══════════════════════════════════════════════════════════════ */

async function loadMarketData() {
    try {
        const response = await fetch('market-history.json');
        marketData = await response.json();
        
        // Sort by date (newest first)
        marketData.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        console.log('Market data loaded:', marketData.length, 'records');
    } catch (error) {
        console.error('Error loading market data:', error);
        marketData = generateSampleData(); // Fallback to sample data
    }
}

/* ═══════════════════════════════════════════════════════════════
   🎨 UI Initialization
   ═══════════════════════════════════════════════════════════════ */

function initializeUI() {
    updateLastUpdateDate();
    updateGoldSection();
    updateDollarSection();
    initializeCharts();
}

function updateLastUpdateDate() {
    if (marketData.length > 0) {
        const lastDate = marketData[0].date;
        const formattedDate = formatArabicDate(new Date(lastDate));
        document.getElementById('lastUpdate').textContent = `آخر تحديث: ${formattedDate}`;
    }
}

/* ═══════════════════════════════════════════════════════════════
   🟡 Gold Section Functions
   ═══════════════════════════════════════════════════════════════ */

function selectCountry(country) {
    currentCountry = country;
    
    // Update button states
    document.querySelectorAll('[data-country]').forEach(btn => {
        btn.classList.toggle('btn-active', btn.dataset.country === country);
    });
    
    updateGoldSection();
    updateGoldChart('1y');
}

function selectKarat(karat) {
    currentKarat = karat;
    
    // Update button states
    document.querySelectorAll('[data-karat]').forEach(btn => {
        btn.classList.toggle('btn-active', btn.dataset.karat === karat);
    });
    
    updateGoldSection();
    updateGoldChart('1y');
}

function updateGoldSection() {
    if (marketData.length === 0) return;
    
    const latestData = marketData[0];
    const goldPrice = getGoldPrice(latestData, currentCountry, currentKarat);
    
    // Update current price
    document.getElementById('goldPrice').textContent = goldPrice.toFixed(2);
    document.getElementById('goldCurrency').textContent = currentCountry === 'EGP' ? 'جنيه' : 'ريال';
    
    // Update indicators
    updateIndicator('gold-yesterday', goldPrice, getGoldPriceAtDaysAgo(1));
    updateIndicator('gold-week', goldPrice, getGoldPriceAtDaysAgo(7));
    updateIndicator('gold-month', goldPrice, getGoldPriceAtDaysAgo(30));
    updateIndicator('gold-6months', goldPrice, getGoldPriceAtDaysAgo(180));
    updateIndicator('gold-year', goldPrice, getGoldPriceAtDaysAgo(365));
}

function getGoldPrice(data, country, karat) {
    if (!data || !data.gold || !data.gold[country]) return 0;
    
    const goldData = data.gold[country];
    
    // If karat 21 exists, use it
    if (goldData['21'] && karat === '21') {
        return goldData['21'];
    }
    
    // If karat 24 exists and we need karat 21, calculate it
    if (goldData['24'] && karat === '21') {
        return goldData['24'] * (21 / 24);
    }
    
    // Return karat 24 directly
    if (goldData['24'] && karat === '24') {
        return goldData['24'];
    }
    
    return 0;
}

function getGoldPriceAtDaysAgo(days) {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() - days);
    
    // Find closest data point
    for (let data of marketData) {
        const dataDate = new Date(data.date);
        if (dataDate <= targetDate) {
            return getGoldPrice(data, currentCountry, currentKarat);
        }
    }
    
    return 0;
}

/* ═══════════════════════════════════════════════════════════════
   💵 Dollar Section Functions
   ═══════════════════════════════════════════════════════════════ */

function updateDollarSection() {
    if (marketData.length === 0) return;
    
    const latestData = marketData[0];
    const dollarPrice = latestData.usd_egp || 0;
    
    // Update current price
    document.getElementById('dollarPrice').textContent = dollarPrice.toFixed(2);
    
    // Update indicators
    updateIndicator('dollar-yesterday', dollarPrice, getDollarPriceAtDaysAgo(1));
    updateIndicator('dollar-week', dollarPrice, getDollarPriceAtDaysAgo(7));
    updateIndicator('dollar-month', dollarPrice, getDollarPriceAtDaysAgo(30));
    updateIndicator('dollar-6months', dollarPrice, getDollarPriceAtDaysAgo(180));
    updateIndicator('dollar-year', dollarPrice, getDollarPriceAtDaysAgo(365));
}

function getDollarPriceAtDaysAgo(days) {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() - days);
    
    for (let data of marketData) {
        const dataDate = new Date(data.date);
        if (dataDate <= targetDate) {
            return data.usd_egp || 0;
        }
    }
    
    return 0;
}

/* ═══════════════════════════════════════════════════════════════
   📊 Indicator Update Logic
   ═══════════════════════════════════════════════════════════════ */

function updateIndicator(elementId, currentPrice, previousPrice) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    if (previousPrice === 0) {
        element.innerHTML = '<span class="indicator-arrow">-</span><span class="indicator-percent">--%</span>';
        element.className = 'indicator-value';
        return;
    }
    
    const difference = currentPrice - previousPrice;
    const percentChange = (difference / previousPrice) * 100;
    
    let arrow, trendClass;
    if (difference > 0) {
        arrow = '⬆️';
        trendClass = 'trend-up';
    } else if (difference < 0) {
        arrow = '⬇️';
        trendClass = 'trend-down';
    } else {
        arrow = '➖';
        trendClass = 'trend-neutral';
    }
    
    element.innerHTML = `
        <span class="indicator-arrow">${arrow}</span>
        <span class="indicator-percent">${percentChange >= 0 ? '+' : ''}${percentChange.toFixed(2)}%</span>
    `;
    element.className = `indicator-value ${trendClass}`;
}

/* ═══════════════════════════════════════════════════════════════
   📈 Chart Functions
   ═══════════════════════════════════════════════════════════════ */

function initializeCharts() {
    updateGoldChart('1y');
    updateDollarChart('1y');
}

function changeGoldPeriod(period) {
    // Update button states
    const container = document.querySelector('.gold-section .chart-controls');
    container.querySelectorAll('.chart-btn').forEach(btn => {
        btn.classList.remove('chart-btn-active');
    });
    event.target.classList.add('chart-btn-active');
    
    updateGoldChart(period);
}

function changeDollarPeriod(period) {
    // Update button states
    const container = document.querySelector('.dollar-section .chart-controls');
    container.querySelectorAll('.chart-btn').forEach(btn => {
        btn.classList.remove('chart-btn-active');
    });
    event.target.classList.add('chart-btn-active');
    
    updateDollarChart(period);
}

function updateGoldChart(period) {
    const days = period === '7d' ? 7 : period === '30d' ? 30 : 365;
    const chartData = getChartData(days, 'gold');
    
    const ctx = document.getElementById('goldChart');
    
    if (goldChart) {
        goldChart.destroy();
    }
    
    goldChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: chartData.labels,
            datasets: [{
                label: `عيار ${currentKarat} - ${currentCountry === 'EGP' ? 'مصر' : 'السعودية'}`,
                data: chartData.values,
                borderColor: '#f59e0b',
                backgroundColor: 'rgba(245, 158, 11, 0.1)',
                borderWidth: 3,
                tension: 0.4,
                fill: true,
                pointRadius: 4,
                pointHoverRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        font: { size: 14 },
                        padding: 15
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    titleFont: { size: 14 },
                    bodyFont: { size: 13 }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    ticks: {
                        font: { size: 12 }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                x: {
                    ticks: {
                        font: { size: 11 },
                        maxRotation: 45,
                        minRotation: 45
                    },
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

function updateDollarChart(period) {
    const days = period === '7d' ? 7 : period === '30d' ? 30 : 365;
    const chartData = getChartData(days, 'dollar');
    
    const ctx = document.getElementById('dollarChart');
    
    if (dollarChart) {
        dollarChart.destroy();
    }
    
    dollarChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: chartData.labels,
            datasets: [{
                label: 'USD/EGP',
                data: chartData.values,
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                borderWidth: 3,
                tension: 0.4,
                fill: true,
                pointRadius: 4,
                pointHoverRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        font: { size: 14 },
                        padding: 15
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    titleFont: { size: 14 },
                    bodyFont: { size: 13 }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    ticks: {
                        font: { size: 12 }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                x: {
                    ticks: {
                        font: { size: 11 },
                        maxRotation: 45,
                        minRotation: 45
                    },
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

function getChartData(days, type) {
    const labels = [];
    const values = [];
    
    // Get data for the specified period
    const relevantData = marketData.slice(0, days).reverse();
    
    for (let data of relevantData) {
        labels.push(formatChartDate(new Date(data.date)));
        
        if (type === 'gold') {
            values.push(getGoldPrice(data, currentCountry, currentKarat));
        } else if (type === 'dollar') {
            values.push(data.usd_egp || 0);
        }
    }
    
    return { labels, values };
}

/* ═══════════════════════════════════════════════════════════════
   🔁 Currency Converter
   ═══════════════════════════════════════════════════════════════ */

function convertCurrency(sourceCurrency) {
    if (isConverting) return;
    isConverting = true;
    
    const egpInput = document.getElementById('egpInput');
    const sarInput = document.getElementById('sarInput');
    const usdInput = document.getElementById('usdInput');
    
    const usdEgpRate = marketData[0]?.usd_egp || 50; // Default fallback
    const usdSarRate = 3.75; // Fixed rate (Saudi Riyal is pegged to USD)
    
    let usdValue;
    
    // Convert to USD first (as base currency)
    if (sourceCurrency === 'USD') {
        usdValue = parseFloat(usdInput.value) || 0;
    } else if (sourceCurrency === 'EGP') {
        usdValue = (parseFloat(egpInput.value) || 0) / usdEgpRate;
    } else if (sourceCurrency === 'SAR') {
        usdValue = (parseFloat(sarInput.value) || 0) / usdSarRate;
    }
    
    // Convert from USD to other currencies
    if (sourceCurrency !== 'USD') {
        usdInput.value = usdValue.toFixed(2);
    }
    if (sourceCurrency !== 'EGP') {
        egpInput.value = (usdValue * usdEgpRate).toFixed(2);
    }
    if (sourceCurrency !== 'SAR') {
        sarInput.value = (usdValue * usdSarRate).toFixed(2);
    }
    
    isConverting = false;
}

/* ═══════════════════════════════════════════════════════════════
   🛠️ Utility Functions
   ═══════════════════════════════════════════════════════════════ */

function formatArabicDate(date) {
    const months = [
        'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
        'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
    ];
    
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    
    return `${day} ${month} ${year}`;
}

function formatChartDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${day}/${month}`;
}

/* ═══════════════════════════════════════════════════════════════
   🎲 Sample Data Generator (for development/testing)
   ═══════════════════════════════════════════════════════════════ */

function generateSampleData() {
    const data = [];
    const today = new Date();
    
    // Generate 365 days of sample data
    for (let i = 0; i < 365; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        
        // Simulate price fluctuations
        const goldEgp24 = 3500 + Math.random() * 500 - 250;
        const goldSar24 = 340 + Math.random() * 40 - 20;
        const usdEgp = 48 + Math.random() * 4 - 2;
        
        data.push({
            date: date.toISOString().split('T')[0],
            gold: {
                EGP: {
                    24: parseFloat(goldEgp24.toFixed(2)),
                    21: parseFloat((goldEgp24 * 21 / 24).toFixed(2))
                },
                SAR: {
                    24: parseFloat(goldSar24.toFixed(2)),
                    21: parseFloat((goldSar24 * 21 / 24).toFixed(2))
                }
            },
            usd_egp: parseFloat(usdEgp.toFixed(2))
        });
    }
    
    return data;
}
