import { sha256 } from '@noble/hashes/sha256';
import { bytesToHex } from '@noble/hashes/utils';

export class PolarityClock {
  private lastUpdate: number = 0;
  private timeHash: string = '';
  private blockHeight: number = 0;
  private accuracy: number = 0;

  constructor(
    private updateInterval: number = 1000,
    private initialBlock: number = 1000000
  ) {
    this.blockHeight = initialBlock;
    this.updateTime();
    setInterval(() => this.updateTime(), this.updateInterval);
  }

  private updateTime(): void {
    const now = Date.now();
    const timeData = new Uint8Array(new Float64Array([now]).buffer);
    this.timeHash = bytesToHex(sha256(timeData));
    this.lastUpdate = now;
    this.blockHeight++;
    this.accuracy = Math.min(100, 100 - (Math.random() * 5)); // Simulated accuracy
  }

  public getTimeInfo(): TimeInfo {
    return {
      timestamp: this.lastUpdate,
      timeHash: this.timeHash,
      blockHeight: this.blockHeight,
      accuracy: this.accuracy,
      humanTime: new Date(this.lastUpdate).toISOString(),
    };
  }
}

export interface TimeInfo {
  timestamp: number;
  timeHash: string;
  blockHeight: number;
  accuracy: number;
  humanTime: string;
}