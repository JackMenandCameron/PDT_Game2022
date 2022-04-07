const g = require("./arduinoGlobal");

let delay = (time) => {
  setTimeout(() => {}, time);
};

let setBool = (arr, val) => {
  for (let i = 0; i < g.N_BUTTONS; i++) {
    arr[i] = val;
  }
};

let updateLights = (lights) => {
  for (let i = 0; i < g.N_BUTTONS; i++) {
    let to_write = lights[i] ? g.HIGH : g.LOW;
    g.LEDS[i].writeSync(to_write);
  }
};

let flash = (lights, time) => {
  setBool(lights, true);
  updateLights(lights);
  delay(time);
  setBool(lights, false);
  updateLights(lights);
  delay(time);
};

module.exports = {
  delay,
  setBool,
  updateLights,
  flash,

  in: (arr, val) => {
    for (let i = 0; i < g.N_BUTTONS; i++) {
      if (arr[i] == val) return true;
    }
    return false;
  },

  updateSwitches: (switches) => {
    for (let i = 0; i < g.N_BUTTONS; i++) {
      switches[i] = g.SWITCHES[i].readSync() == 1;
    }
  },

  blink: (lights, n, time) => {
    for (let i = 0; i < n; i++) {
      flash(lights, time);
    }
  },

  // bool sweepLightsHelper(void *args)
  // {
  //     sweepargs_t *swp = (sweepargs_t *)args;
  //     if (swp->on == 0)
  //     {
  //         *swp->stage = game_start;
  //         free(args);
  //         return true;
  //     }
  //     else
  //     {
  //         swp->on -= 1;
  //         swp->lights[swp->on] = false;
  //         swp->timer->in(swp->time, sweepLightsHelper, (void *)swp);
  //     }
  // }

  // void sweepLights(Timer<> *timer, Stage *stage, bool lights[], unsigned long time)
  // {
  //     sweepargs_t *args = (sweepargs_t *)malloc(sizeof(sweepargs_t));
  //     args->timer = timer;
  //     args->stage = stage;
  //     args->lights = lights;
  //     args->time = time;
  //     args->on = N_BUTTONS;
  //     timer->in(args->time, sweepLightsHelper, (void *)args);
  // }

  // bool endgame(void *args)
  // {
  //     Stage *stage = (Stage *)args;
  //     *stage = finished;
  // }
};
