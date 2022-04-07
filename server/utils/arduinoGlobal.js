var Gpio = require("onoff").Gpio; //include onoff to interact with the GPIO

let outs = [4, 17, 27, 22, 5, 6];
let ins = [16, 18, 23, 24, 25, 12];
let LEDS = outs.map((out) => new Gpio(out, "out"));
let SWITCHES = ins.map((pin) => new Gpio(pin, "in"));

(N_BUTTONS = 6),
  (ins = [3, 5, 7, 9]),
  (HIGH = 1),
  (LOW = 0),
  (waiting = 0),
  (intro = 1),
  (game_start = 2),
  (game_happening = 3),
  (finished = 4),
  (test_start = 5),
  (test_over = 6),
  (module.exports = {
    // Constant State
    N_BUTTONS: 6,
    LEDS,
    SWITCHES,
    // ins: [3, 5, 7, 9],
    intro_delay: 300,
    game_time: 1500,

    HIGH,
    LOW,

    waiting,
    intro,
    game_start,
    game_happening,
    finished,
    test_start,
    test_over,
    stage: waiting,
  });
