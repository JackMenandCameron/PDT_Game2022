// Stage stage = waiting;
// const int gameLength = 15;
const g = require("./arduinoGlobal");
const { setBool } = require("./arduinoHelpers");
const h = require("./arduinoHelpers");
const t = require("./arduinoTests");
const d = new Date();

let introLights;
// Timer<> timer;
let lights = [];
let switches = [];
let gameStart = 0;
let lights_on = 0;
let score = -1;
let light_time = [];

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

let random_light_on = () => {
  let all_on = true;
  for (let i = 0; i < g.N_BUTTONS; i++) {
    all_on &= lights[i];
  }
  if (all_on) {
    return;
  }
  let rand = random(0, g.N_BUTTONS);
  while (lights[rand]) {
    rand = random(0, g.N_BUTTONS);
  }
  lights[rand] = true;
  light_time[rand] = d.getMilliseconds();
};

let check_push = () => {
  for (let i = 0; i < g.N_BUTTONS; i++) {
    if (lights[i]) {
      if (switches[i]) {
        lights[i] = false;
        random_light_on();
        score++;
      }
    }
  }
  switch (score) {
    case -1:
      random_light_on();
      lights_on++;
      score++;
      break;
    case 5:
      if (lights_on == 1) {
        random_light_on();
        lights_on++;
      }
    default:
      break;
  }
};

let check_expire = () => {
  for (let i = 0; i < g.N_BUTTONS; i++) {
    if (lights[i] && d.getMilliseconds() - light_time[i] > 1000) {
      lights[i] = false;
      score = score > 0 ? score - 1 : score;
      if (score != 4) {
        random_light_on();
      } else {
        lights_on--;
      }
    }
  }
};

exports.setup = () => {
  for (let i = 0; i < g.N_BUTTONS; i++) {
    lights[i] = false;
    switches[i] = false;
    light_time[i] = 0;
    // pinMode(outs[i], OUTPUT);
    // pinMode(ins[i], INPUT);
  }
  clear();
};

exports.loop = () => {
  // timer.tick();
  switch (g.stage) {
    case g.waiting:
      lights[0] = true;
      if (switches[0]) {
        g.stage = g.intro;
        h.setBool(lights, true);
        h.delay(200);
        // sweepLights(&timer, &stage, lights, 100UL);
      }
      if (switches[1] && switches[2]) {
        g.stage = g.test_start;
      }
      break;
    case intro:
      g.stage = g.game_start;
      break;
    case g.game_start:
      setBool(lights, false);
      setInterval(() => {
        g.stage = g.finished;
      }, 5000);
      g.stage = g.game_happening;
      break;
    case g.game_happening:
      check_push();
      check_expire();
      break;
    case finished:
      h.blink(lights, 4, 500);
      g.stage = g.waiting;
      // Serial.println(score);
      clear();
      break;
    case g.test_start:
      if (switches[2] && switches[3]) {
        clear();
        g.stage = g.waiting;
      }
      t.test_unit_all_presses(switches, lights);
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
