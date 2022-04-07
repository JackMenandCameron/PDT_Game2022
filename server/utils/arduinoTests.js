const g = require("./arduinoGlobal");
const h = require("./arduinoHelpers");

blinkLED = (led) => {
  //function to start blinking
  console.log("blinking", led);
  if (g.LEDS[led].readSync() === 0) {
    //check the pin state, if the state is 0 (or off)
    g.LEDS[led].writeSync(1); //set pin state to 1 (turn LED on)
  } else {
    g.LEDS[led].writeSync(0); //set pin state to 0 (turn LED off)
  }
};

module.exports = {
  blinkLED,
  test_unit_light: (led) => {
    console.log(blinkLED);
    setInterval(() => {
      blinkLED(led);
    }, 250);
  },

  test_unit_press: (button) => {
    // digitalWrite(out, digitalRead(in));
  },

  test_unit_all_lights: (lights) => {
    setBool(lights, true);
  },

  test_unit_all_presses: (switches, lights) => {
    for (let i = 0; i < N_BUTTONS; i++) {
      lights[i] = switches[i];
    }
  },

  // to test add in loop and have global bool ts = true
  // ts = test_sweep(ts);
  //  test_sweep: ( lights)
  // {
  //     Timer<> timer = timer_create_default();
  //     Stage stage = intro;
  //     sweepLights(&timer, &stage, lights, 500UL);
  // }
};
