export const INITIAL_BOARD = [
  ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'],
  ['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'],
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null),
  ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
  ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖'],
];

export const PIECE_NAMES = {
  '♔': 'white-king', '♕': 'white-queen', '♗': 'white-bishop',
  '♘': 'white-knight', '♖': 'white-rook', '♙': 'white-pawn',
  '♚': 'black-king', '♛': 'black-queen', '♝': 'black-bishop',
  '♞': 'black-knight', '♜': 'black-rook', '♟': 'black-pawn',
}; 