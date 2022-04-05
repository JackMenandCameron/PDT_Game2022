module.exports = {
  // Constant State
  N_BUTTONS: 4,
  outs: [2, 4, 6, 8],
  ins: [3, 5, 7, 9],

  HIGH: 1,
  LOW: 0,

  waiting: 0,
  intro: 1,
  game_start: 2,
  game_happening: 3,
  finished: 4,
  test_start: 5,
  test_over: 6,
  initial_stage: this.waiting,
};
