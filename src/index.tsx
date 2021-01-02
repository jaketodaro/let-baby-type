import "./index.css";

const FLOATY_SHAPES = "★☆✦✧⬢⬡▲△⬟⬠❅❆☿♀♁♂♃♄♅⛢♆♩♪♫♬♡♥";
const FLOATY_ROTATABLE_SHAPES = "⌯➤➼";
const FLOATY_DURATION = 5000;
const NUM_FLOATIES = 30;

const EFFECT_DURATION = 2000;
const EFFECT_MAX_DELAY = 5000;

const FLOATY_EFFECTS = [
  "barrelRoll",
  "bounce",
  "fanfare",
  "flip",
  "heartbeat",
  "jello",
  "pulse",
  "rubberBand",
  "shake",
  "spin",
  "spin2",
  "stretch",
  "swing",
  "tada",
  "wabble",
  "wobble",
];

const ENTER_EFFECTS = {
  scaleInCenter: "scaleOutCenter",
  rotateInCenter: "rotateOutCenter",
  rotateInHor: "rotateOutHor",
  rotateInVer: "rotateOutVer",
  rotateInDiag: "rotateOutDiag",
  swirlInFwd: "swirlOutFwd",
  swirlInBck: "swirlOutBck",
  // bounce doesn't get out of the way fast enough
  bounceInFwd: "scaleOutCenter",
  bounceInBck: "scaleOutCenter",
};

const IS_MOBILE = !!navigator.userAgent.match(/Android|iPhone/);

// Add Floaties
for (let i = 0; i < NUM_FLOATIES; ++i) {
  const floatyContainer = document.createElement("div");
  const floatyContent = document.createElement("div");
  const floatyDelay = `-${Math.random() * FLOATY_DURATION}ms`;

  floatyContainer.classList.add("floaty");
  floatyContainer.style.top = `${Math.random() * 100}%`;
  floatyContainer.style.left = `${Math.random() * 100}%`;
  floatyContainer.style.fontSize = 1 + Math.random() * 4 + "rem";
  floatyContainer.style.animationDelay = floatyDelay;

  const char = getRandomChar();

  if (FLOATY_ROTATABLE_SHAPES.includes(char)) {
    floatyContainer.style.transform = `rotate(${
      Math.floor(Math.random() * 3) * 90
    }deg)`;
  }

  floatyContent.innerText = getRandomChar();
  playEffect(floatyContent);

  floatyContainer.appendChild(floatyContent);
  document.body.appendChild(floatyContainer);
}

// Listen for baby smashing
// On mobile we need to use a hidden input to get key presses
if (IS_MOBILE) {
  forceKeyboardOpen();

  document.body.addEventListener("keyup", () => {
    const input = document.getElementById("input");

    if (input instanceof HTMLInputElement) {
      popupChar(input.value.slice(-1));
    }
  });
} else {
  document.body.addEventListener("keydown", (event) => {
    event.preventDefault();
    popupChar(event.key);
  });
  document.body.addEventListener("keypress", (event) => {
    event.preventDefault();
  });
  document.body.addEventListener("keyup", (event) => {
    event.preventDefault();
  });
}

// Make it harder for baby to close the window
window.onbeforeunload = (event: BeforeUnloadEvent) => {
  //   event.returnValue = "";
};

function getRandomChar() {
  const chars = FLOATY_SHAPES + FLOATY_ROTATABLE_SHAPES
  return chars.charAt(Math.floor(Math.random() * chars.length));
}

function getRandomEffect() {
  return FLOATY_EFFECTS[Math.floor(Math.random() * FLOATY_EFFECTS.length)];
}

function getRandomEntrance() {
  const keys = Object.keys(ENTER_EFFECTS);
  return keys[Math.floor(Math.random() * keys.length)];
}

function playEffect(element: HTMLElement) {
  setTimeout(() => {
    element.style.animation = `${getRandomEffect()} ${EFFECT_DURATION}ms ease`;
    playEffect(element);
  }, EFFECT_DURATION + Math.random() * EFFECT_MAX_DELAY);
}

let lastDiv: HTMLElement | null = null;
function popupChar(char: string) {
  if (char.length > 1) {
    return;
  }

  const div = document.createElement("div");
  const entranceEffect = getRandomEntrance();
  div.classList.add("char");
  div.innerText = char;
  div.style.animation = `${entranceEffect} 500ms ease`;

  // remove the current character with the "out" version of the animation
  if (lastDiv) {
    // @ts-ignore
    lastDiv.style.animation = `${ENTER_EFFECTS[entranceEffect]} 500ms ease`;
    lastDiv.addEventListener("animationend", (event) => {
      if (event.target instanceof HTMLElement) {
        event.target.remove();
      }
    });
  }

  document.body.appendChild(div);
  lastDiv = div;
}

function forceKeyboardOpen() {
  requestAnimationFrame(() => {
    document.getElementById("input")?.focus();
    forceKeyboardOpen();
  });
}
