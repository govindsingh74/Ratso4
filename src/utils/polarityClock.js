import { sha256 } from '@noble/hashes/sha256';
import { bytesToHex } from '@noble/hashes/utils';
export class PolarityClock {
    constructor(updateInterval = 1000, initialBlock = 1000000) {
        this.updateInterval = updateInterval;
        this.initialBlock = initialBlock;
        this.lastUpdate = 0;
        this.timeHash = '';
        this.blockHeight = 0;
        this.accuracy = 0;
        this.blockHeight = initialBlock;
        this.updateTime();
        setInterval(() => this.updateTime(), this.updateInterval);
    }
    updateTime() {
        const now = Date.now();
        const timeData = new Uint8Array(new Float64Array([now]).buffer);
        this.timeHash = bytesToHex(sha256(timeData));
        this.lastUpdate = now;
        this.blockHeight++;
        this.accuracy = Math.min(100, 100 - (Math.random() * 5)); // Simulated accuracy
    }
    getTimeInfo() {
        return {
            timestamp: this.lastUpdate,
            timeHash: this.timeHash,
            blockHeight: this.blockHeight,
            accuracy: this.accuracy,
            humanTime: new Date(this.lastUpdate).toISOString(),
        };
    }
}
