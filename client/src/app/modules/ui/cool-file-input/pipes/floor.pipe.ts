import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "floor",
})
export class FloorPipe implements PipeTransform {

    constructor() {}

    transform(floor: number, ...args: any[]): string {
        return (floor) ? `${floor}` : `PB`;
    }
}