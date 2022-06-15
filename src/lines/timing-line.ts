import {NUM} from "../regex-helpers";
import {Line} from "./line";

/**
 * Timing as defined by https://datatracker.ietf.org/doc/html/rfc4566#section-5.9.
 *
 * Ex: t=0 0
 */
export class TimingLine extends Line {
    startTime: number;
    stopTime: number;

    private static regex = new RegExp(`^(${NUM}) (${NUM})`);

    constructor(startTime: number, stopTime: number) {
        super();
        this.startTime = startTime;
        this.stopTime = stopTime;
    }

    static fromSdpLine(line: string): TimingLine | undefined {
        if (!TimingLine.regex.test(line)) {
            return undefined;
        }
        const tokens = line.match(TimingLine.regex) as RegExpMatchArray;
        const startTime = parseInt(tokens[1]);
        const stopTime = parseInt(tokens[2]);

        return new TimingLine(startTime, stopTime);
    }

    toSdpLine(): string {
        return `t=${this.startTime} ${this.stopTime}`;
    }
}