const linePath = document.getElementById('visual-line');
const areaPath = document.getElementById('visual-area');

let offset = 0;

function animate() {
    let points = [];
    // Tạo 20 điểm dữ liệu dựa trên hàm Sin
    for (let x = 0; x <= 200; x += 10) {
        // Tạo độ cao ngẫu nhiên nhưng có nhịp điệu
        const y = 50 + Math.sin((x + offset) * 0.05) * 20 + Math.random() * 5;
        points.push(`${x},${y}`);
    }

    const d = `M ${points.join(' L ')}`;
    linePath.setAttribute('d', d);
    
    // Tạo vùng fill (nối điểm cuối xuống đáy SVG)
    const areaD = `${d} L 200,100 L 0,100 Z`;
    areaPath.setAttribute('d', areaD);

    offset -= 2; // Tốc độ chạy của sóng
    requestAnimationFrame(animate);
}

animate();
