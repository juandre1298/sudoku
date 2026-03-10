export type cellStatus = 'focus' | 'target' | null

export interface CellI {
    answer: number;
    default: number;
    status: cellStatus;
    set: number;
    coordinateI: number;
    coordinateJ: number;
    sector: number[];
}

