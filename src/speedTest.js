export default class {
    constructor(API_URL) {
        this.API_URL = API_URL || "https://bohr.io";
    }

    async addressSpeed() {
        const cacheBuster = "?nnn=" + (new Date()).getTime();
        const addressUrlPath = `${this.API_URL}/bohr_speed_address`;
        const request = new Request(addressUrlPath + cacheBuster);

        const response = await fetch(request);

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        return await response.json();
    }

    async getDownloadPerformance(fileSize) {
        const cacheBuster = "?nnn=" + (new Date()).getTime();
        const downUrlPath = `${this.API_URL}/bohr_speed_download?bytes=${fileSize}`;
        const request = new Request(downUrlPath + cacheBuster);
      
        const response = await fetch(request);
        
        if (!response.ok) {
            throw new Error(response.statusText);
        }

        await response.text();
        
        return performance.getEntriesByName(request.url);
    }

    async getUploadPerformance(fileSize) {
        const cacheBuster = "?nnn=" + (new Date()).getTime();
        const upUrlPath = `${this.API_URL}/bohr_speed_upload?bytes=${fileSize}`;
        const request = new Request(upUrlPath + cacheBuster, {
            method: 'POST',
            headers : {
                'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            body: new Blob([new ArrayBuffer(fileSize)], {type: 'application/octet-stream'})
        });
      
        const response = await fetch(request);

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        await response.text();

        return performance.getEntriesByName(request.url);
    }

    calcPerformanceSpeedMbps(duration, fileSize) {
        const duration = duration / 1000;
        const bitsLoaded = fileSize * 8;
        const speedBps = (bitsLoaded / duration).toFixed(2);
        const speedKbps = (speedBps / 1024).toFixed(2);
        const speedMbps = (speedKbps / 1024).toFixed(2);
        return speedMbps;
    }

    async testPingSpeed() {
        const perfUpload = await getUploadPerformance(0);
        const pingUpload = perfUpload.responseStart - perfUpload.requestStart;

        const perfDownload = await getDownloadPerformance(0);
        const pingDownload = perfDownload.responseStart - perfDownload.requestStart;

        return (pingUpload + pingDownload)/2;
    }

    async testDownloadSpeed(fileSize) {
        const perf = await getDownloadPerformance(fileSize);
        return calcPerformanceSpeedMbps(perf[0].duration, perf[0].transferSize);
    }

    async testUploadSpeed(fileSize) {
        const perf = await getUploadPerformance(fileSize);
        return calcPerformanceSpeedMbps(perf[0].duration, fileSize);
    }
};