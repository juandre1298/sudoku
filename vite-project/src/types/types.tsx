export type cellStatus = 'focus' | 'target' | null

export interface CellI {
    answer: number;
    default: number | null;
    set: number | null;
    status: cellStatus;
    coordinateI: number;
    coordinateJ: number;
    sector: number[];
}

