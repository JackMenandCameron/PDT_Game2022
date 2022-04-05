// Stage stage = waiting;
// const int gameLength = 15;
const g = require("./arduinoGlobal");
const h = require("./arduinoHelpers");

let score, introLights;
// Timer<> timer;
let lights = [];
let switches = [];
let stage = g.waiting;

const clear = () => {
  introLights = 0;
  //   timer = timer_create_default();
  for (let i = 0; i < g.N_BUTTONS; i++) {
    lights[i] = false;
    switches[i] = false;
  }
};

const error = () => {
  clear();
  while (!switches[0]) {
    h.flash(lights, 1000);
    for (let i = 0; i < 5; i++) {
      h.flash(lights, 200);
    }
    h.updateSwitches(switches);
  }
};

function random(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

const game = () => {
  let on = false;
  for (let i = 0; i < g.N_BUTTONS; i++) {
    if (lights[i]) {
      if (switches[i]) {
        lights[i] = false;
      } else {
        on = true;
      }
    }
  }
  if (!on) {
    let randNumber = random(0, g.N_BUTTONS);
    lights[randNumber] = true;
  }
};

exports.setup = () => {
  for (let i = 0; i < g.N_BUTTONS; i++) {
    // pinMode(outs[i], OUTPUT);
    // pinMode(ins[i], INPUT);
  }
  clear();
};

exports.loop = () => {
  // timer.tick();

  switch (stage) {
    case g.waiting:
      lights[0] = true;
      if (switches[0]) {
        stage = g.intro;
        h.setBool(lights, true);
        // sweepLights(&timer, &stage, lights, 1000UL);
      }
      break;
    case g.intro:
      break;
    case g.game_start:
      // timer.in(15000, endgame, (void *)&stage);
      stage = g.game_happening;
      break;
    case g.game_happening:
      game();
      break;
    case g.finished:
      blink(lights, 4, 500);
      stage = g.waiting;
      break;
    case g.test_start:
      test_unit_all_presses(switches, lights);
      // stage = test_over;
      break;
    case g.test_over:
      break;
    default:
      error();
      break;
  }

  h.updateLights(lights);
  h.updateSwitches(switches);
};
