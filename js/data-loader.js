window.loadProjectData = async function() {
    try {
        const response = await fetch('data/aoi-file.json');
        if (!response.ok) throw new Error("Không tìm thấy data/aoi-file.json");
        const filePaths = await response.json();
        
        let allData = [];
        for (const path of filePaths) {
            try {
                const res = await fetch(path);
                if (res.ok) {
                    const subData = await res.json();
                    allData = allData.concat(subData);
                }
            } catch (err) {
                console.error("Lỗi tải file sub-json: " + path, err);
            }
        }
        return allData;
    } catch (error) {
        console.error("Lỗi tải cấu trúc JSON chính:", error);
        return [];
    }
};
