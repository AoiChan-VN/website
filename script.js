// 1. Tạo số liệu nhảy liên tục (Dynamic Numbers)
const trafficEl = document.getElementById('traffic-count');
let count = 0;

setInterval(() => {
    count += Math.floor(Math.random() * 10);
    trafficEl.innerText = count.toLocaleString();
}, 1000);

// 2. Vẽ Chart bằng SVG (Vanilla JS)
const polyline = document.getElementById('dynamic-line');
let points = [];
const maxPoints = 20;

function updateChart() {
    const xStep = 500 / (maxPoints - 1);
    const newY = Math.floor(Math.random() * 80) + 10;
    
    points.push(newY);
    if (points.length > maxPoints) points.shift();

    const pointString = points.map((y, i) => `${i * xStep},${100 - y}`).join(' ');
    polyline.setAttribute('points', pointString);
}

setInterval(updateChart, 500);

// 3. Hiệu ứng Hover chuột làm sáng Card
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0,242,254,0.15), var(--card-bg))`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.background = 'var(--card-bg)';
    });
});
 
