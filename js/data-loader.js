export async function loadProjectData() {
    try {
        const response = await fetch('./data/aoi-file.json');
        const filePaths = await response.json();
        
        let allData = [];
        for (const path of filePaths) {
            const res = await fetch(path);
            const subData = await res.json();
            allData = allData.concat(subData);
        }
        return allData;
    } catch (error) {
        console.error("Lỗi tải dữ liệu JSON:", error);
        return [];
    }
}
 
