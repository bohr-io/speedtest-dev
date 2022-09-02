export default class {
    constructor(API_URL) {
        this.API_URL = API_URL || "https://bohr.io";
    }

    async testDownloadSpeed(fileSize) {
        const cacheBuster = "?nnn=" + (new Date()).getTime();
        const downAddr = `${this.API_URL}/bohr_speed_download?bytes=${fileSize}`;
        const request = new Request(downAddr + cacheBuster);
      
        const response = await fetch(request);
        
        if (!response.ok) {
            throw new Error(response.statusText);
        }

        await response.text();
        
        const perf = performance.getEntriesByName(request.url);
        const duration = perf[0].duration / 1000;
        const bitsLoaded = perf[0].transferSize * 8;
        const speedBps = (bitsLoaded / duration).toFixed(2);
        const speedKbps = (speedBps / 1024).toFixed(2);
        const speedMbps = (speedKbps / 1024).toFixed(2);
        return speedMbps;
    }

    async testUploadSpeed(fileSize) {
        const cacheBuster = "?nnn=" + (new Date()).getTime();
        const downAddr = `${this.API_URL}/bohr_speed_upload?bytes=${fileSize}`;
        const request = new Request(downAddr + cacheBuster);
      
        const response = await fetch(request, {
            method: 'POST',
            body: new Blob([new ArrayBuffer(fileSize)], {type: 'application/octet-stream'})
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        await response.text();

        const perf = performance.getEntriesByName(request.url);
        const duration = perf[0].duration / 1000;
        const bitsLoaded = fileSize * 8;
        const speedBps = (bitsLoaded / duration).toFixed(2);
        const speedKbps = (speedBps / 1024).toFixed(2);
        const speedMbps = (speedKbps / 1024).toFixed(2);
        return speedMbps;
    }
};