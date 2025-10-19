// Мобильное меню
const menu = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');
menu.addEventListener('click', () => {
  menu.classList.toggle('bx-x');
  navbar.classList.toggle('active');
});
window.addEventListener('scroll', () => {
  menu.classList.remove('bx-x');
  navbar.classList.remove('active');
});

// ScrollReveal
const sr = ScrollReveal({
  distance: '60px',
  duration: 2500,
  delay: 400,
  reset: true
});
sr.reveal('.text', { delay: 200, origin: 'top' });
sr.reveal('.heading', { delay: 300, origin: 'top' });

// Графики
document.addEventListener('DOMContentLoaded', function () {
  const countries = ['France', 'Spain', 'Italy', 'Germany', 'Portugal', 'Turkey'];
  // Круговая диаграмма
  new Chart(document.getElementById('chart1'), {
    type: 'doughnut',
    data: {
      labels: countries,
      datasets: [{
        data: [100, 94, 65, 40, 24, 52],
        backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#6366f1', '#ec4899', '#0ea5e9']
      }]
    },
    options: {
      plugins: {
        legend: { position: 'right' }, // Установка позиции легенды
        tooltip: {
          callbacks: {
            label: function(context) {
              let label = context.label || '';
              let value = context.parsed || 0;
              return label + ': ' + value + ' MLN';
            }
          }
        }
      }
    }
  });
  new Chart(document.getElementById('chart2'), {
    type: 'doughnut',
    data: {
      labels: ["Greece", "Netherlands", "Austria", "Switzerland", "Czech Republic", "Croatia"],
      datasets: [{
        data: [32, 22, 20, 19, 18, 17],
        backgroundColor: ["#66BB6A", "#FFA726", "#29B6F6", "#AB47BC", "#FF7043", "#26A69A"]
      }]
    },
    options: {
      plugins: {
        legend: { position: 'right' }, // Установка позиции легенды
        tooltip: {
          callbacks: {
            label: function(context) {
              return context.label + ': ' + context.parsed + ' MLN';
            }
          }
        }
      }
    }
  });
  new Chart(document.getElementById('chart3'), {
    type: 'doughnut',
    data: {
      labels: ["Sweden", "Norway", "Poland", "Hungary", "Belgium", "Denmark"],
      datasets: [{
        data: [15, 12, 21, 14, 16, 13],
        backgroundColor: ["#EF5350", "#8E24AA", "#42A5F5", "#FFCA28", "#5C6BC0", "#26C6DA"]
      }]
    },
    options: {
      plugins: {
        legend: { position: 'right' }, // Установка позиции легенды
        tooltip: {
          callbacks: {
            label: function(context) {
              return context.label + ': ' + context.parsed + ' MLN';
            }
          }
        }
      }
    }
  });

  // Радарные диаграммы
  const radarLabels = ['Infrastructure', 'Safety', 'Prices'];
  const radarData1 = {
    labels: radarLabels,
    datasets: [
      { label: 'France', data: [9, 8, 6], borderColor: 'blue', backgroundColor: 'rgba(0,0,255,0.1)' },
      { label: 'Germany', data: [8, 9, 7], borderColor: 'purple', backgroundColor: 'rgba(128,0,128,0.1)' },
      { label: 'Switzerland', data: [10, 10, 4], borderColor: 'green', backgroundColor: 'rgba(0,128,0,0.1)' },
    ]
  };
  const radarData2 = {
    labels: radarLabels,
    datasets: [
      { label: 'Spain', data: [7, 7, 8], borderColor: 'orange', backgroundColor: 'rgba(255,165,0,0.1)' },
      { label: 'Italy', data: [8, 8, 7], borderColor: 'red', backgroundColor: 'rgba(255,0,0,0.1)' },
      { label: 'Portugal', data: [7, 8, 9], borderColor: 'brown', backgroundColor: 'rgba(165,42,42,0.1)' },
    ]
  };
  const radarData3 = {
    labels: radarLabels,
    datasets: [
      { label: 'Norway', data: [9, 10, 5], borderColor: 'cyan', backgroundColor: 'rgba(0,255,255,0.1)' },
      { label: 'Greece', data: [7, 8, 9], borderColor: 'magenta', backgroundColor: 'rgba(255,0,255,0.1)' },
      { label: 'Turkey', data: [6, 7, 8], borderColor: 'gold', backgroundColor: 'rgba(255,215,0,0.1)' },
    ]
  };
  new Chart(document.getElementById('radarChart1'), { type: 'radar', data: radarData1 });
  new Chart(document.getElementById('radarChart2'), { type: 'radar', data: radarData2 });
  new Chart(document.getElementById('radarChart3'), { type: 'radar', data: radarData3 });

  // Горизонтальная гистограмма
  new Chart(document.getElementById('horizontalBarChart'), {
    type: 'bar',
    data: {
      labels: ['Spain', 'United Kingdom', 'France', 'Italy', 'Germany', 'Greece'],
      datasets: [{
        label: 'Annual tourism revenue (Billion $)',
        data: [106, 84, 77, 58, 40, 23],
        backgroundColor: 'rgba(54, 162, 235, 0.6)'
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      scales: {
        x: { beginAtZero: true }
      }
    }
  });

  // Карта
  const map = L.map('windMap').setView([54.5260, 15.2551], 4);
  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',  {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  // Зоны на карте
  const westernEurope = L.polygon([
    [58.5, -4], [61, 0], [60, 8], [56, 8], [53, 4], [55, -1]
  ], { color: '#4CAF50', fillOpacity: 0.3, weight: 2 })
    .addTo(map)
    .bindPopup('<b>Western Europe</b>')
    .on('click', () => showInfo('westernEurope'));
  const southernEurope = L.polygon([
    [40, 10], [45, 20], [35, 20], [35, 5]
  ], { color: '#F44336', fillOpacity: 0.3, weight: 2 })
    .addTo(map)
    .bindPopup('<b>Southern Europe</b>')
    .on('click', () => showInfo('southernEurope'));
  const northernEurope = L.polygon([
    [65, 10], [63, 16], [59, 20], [54, 19], [54, 14], [58, 10]
  ], { color: '#2196F3', fillOpacity: 0.3, weight: 2 })
    .addTo(map)
    .bindPopup('<b>Northern Europe</b>')
    .on('click', () => showInfo('northernEurope'));
  const easternEurope = L.polygon([
    [50, 15], [55, 25], [45, 30], [45, 15]
  ], { color: '#FFC107', fillOpacity: 0.3, weight: 2 })
    .addTo(map)
    .bindPopup('<b>Eastern Europe</b>')
    .on('click', () => showInfo('easternEurope'));
});
// Показ информации о зоне
function showInfo(zoneId) {
  const allInfos = document.querySelectorAll('.zone-info');
  allInfos.forEach(info => info.classList.remove('active'));
  const activeInfo = document.getElementById(zoneId + 'Info');
  if (activeInfo) {
    activeInfo.classList.add('active');
  }
}