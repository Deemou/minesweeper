export interface ITile {
  x: number;
  y: number;
  value: number | null;
  isOpen: boolean;
  isFlagged: boolean;
  isQuestionMark: boolean;
  isBomb: boolean;
  isExploded: boolean;
}

export interface ICoord {
  x: number;
  y: number;
}
