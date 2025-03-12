import { type ISourceOptions} from "@tsparticles/engine";

export const particlesOptions: ISourceOptions = {
  "autoPlay": true,
  "background": {
    "color": {
      "value": "#0d0a0b"
    }
  },
  "fpsLimit": 120,
  "fullScreen": {
    "enable": false,
    "zIndex": -10
  },
  "detectRetina": true,
  "interactivity": {
    "events": {
      "onClick": {
        "enable": false,
        "mode": "push"
      },
      "onHover": {
        "enable": true,
        "mode": "grab"
      }
    },
    "modes": {
      "push": {
        "quantity": 4
      },
      "grab": {
        "distance": 400,
        "links": {
          "opacity": 1
        }
      },
      "connect": {
        "distance": 80,
        "links": {
          "opacity": 0.5
        }
      }
    }
  },
  "particles": {
    "number": {
      "value": 120,
      "density": {
        "enable": true,
        "width": 1920,
        "height": 1080
      }
    },
    "color": {
      "value": "#72B01D"
    },
    "links": {
      "enable": true,
      "distance": 150,
      "color": "#A4C2A8",
      "opacity": 0.5,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 6,
      "direction": "none",
      "outModes": {
        "default": "out"
      }
    },
    "size": {
      "value": {
        "min": 1,
        "max": 10
      }
    }
  },
  "pauseOnBlur": true,
  "pauseOnOutsideViewport": true,
};
