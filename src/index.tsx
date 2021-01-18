import "./index.css";

const NUM_FLOATIES = 30;
const FLOATY_FLOAT_DURATION = 5000;

const FLOATY_EFFECT_DURATION = 2000;
const MAX_FLOATY_EFFECT_DELAY = 5000;
const MAX_FLOATY_TTL = 60000;
const MIN_FLOATY_TTL = 10000;

const POPUP_EFFECT_DURATION = 1000;

const FLOATIES = [
  "arrow-repeat",
  "arrow-right-short",
  "asterisk",
  "book",
  "bookshelf",
  "bullseye",
  "chat-square",
  "chat",
  "check",
  "chevron-double-down",
  "chevron-down",
  "circle-fill",
  "circle",
  "clock",
  "cloud-fill",
  "cloud",
  "diamond",
  "egg",
  "emoji-smile",
  "eyeglasses",
  "flag",
  "flower1",
  "flower2",
  "flower3",
  "gear-wide",
  "gear",
  "gem",
  "heart-fill",
  "heart",
  "heptagon-fill",
  "heptagon",
  "hexagon-fill",
  "hexagon",
  "lightning-fill",
  "lightning",
  "moon",
  "music-note-beamed",
  "music-note",
  "nut",
  "octagon-fill",
  "octagon",
  "peace",
  "pentagon-fill",
  "pentagon",
  "plus",
  "shield",
  "square-fill",
  "square",
  "star-fill",
  "star",
  "suit-club-fill",
  "suit-club",
  "suit-spade-fill",
  "suit-spade",
  "tree-fill",
  "tree",
  "triangle-fill",
  "triangle",
  "x-diamond",
  "x",
];

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
  bounceInFwd: "bounceOutFwd",
  bounceInBck: "bounceOutBck",
  rollInLeft: "rollOutLeft",
  rollInRight: "rollOutRight",
  rollInTop: "rollOutTop",
  rollInBottom: "rollOutBottom",
};

const IS_MOBILE = !!navigator.userAgent.match(/Android|iPhone/);

// Add Floaties
for (let i = 0; i < NUM_FLOATIES; ++i) {
  addFloaty();
}

function addFloaty() {
  const floatyContainer = document.createElement("div");

  const floatyDelay = `-${Math.random() * FLOATY_FLOAT_DURATION}ms`;
  floatyContainer.classList.add("floaty");
  floatyContainer.style.top = `${Math.random() * 100}%`;
  floatyContainer.style.left = `${Math.random() * 100}%`;
  floatyContainer.style.fontSize = 1 + Math.random() * 4 + "rem";
  floatyContainer.style.animationDelay = floatyDelay;

  const floatyContent = getRandomFloaty();
  floatyContent.style.animation = "scaleInCenter 1s ease";
  playEffect(floatyContent);

  floatyContainer.appendChild(floatyContent);
  document.body.appendChild(floatyContainer);

  const floatyTTL =
    Math.random() * (MAX_FLOATY_TTL - MIN_FLOATY_TTL) + MIN_FLOATY_TTL;
  setTimeout(() => {
    animateOut(floatyContainer, "scaleOutCenter 1s ease");
    addFloaty();
  }, floatyTTL);
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
    if (!(event.key === "q" && event.metaKey)) {
      event.preventDefault();
    }
    popupChar(event.key);
  });
  document.body.addEventListener("keypress", (event) => {
    if (!(event.key === "q" && event.metaKey)) {
      event.preventDefault();
    }
  });
  document.body.addEventListener("keyup", (event) => {
    if (!(event.key === "q" && event.metaKey)) {
      event.preventDefault();
    }
  });
}

// Make it harder for baby to close the window
window.onbeforeunload = (event: BeforeUnloadEvent) => {
  event.returnValue = "";
};

function getRandomFloaty() {
  const floaty = document.createElement("div");
  const floatyName = FLOATIES[Math.floor(Math.random() * FLOATIES.length)];
  floaty.classList.add(`bi-${floatyName}`);
  return floaty;
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
    element.style.animation = `${getRandomEffect()} ${FLOATY_EFFECT_DURATION}ms ease`;
    playEffect(element);
  }, FLOATY_EFFECT_DURATION + Math.random() * MAX_FLOATY_EFFECT_DELAY);
}

let lastDiv: HTMLElement | null = null;
let lastEntrance: string | null = null;
function popupChar(char: string) {
  if (char.length > 1) {
    return;
  }

  const divWrapper = document.createElement("div");
  divWrapper.classList.add("char");
  divWrapper.style.position = "fixed";
  divWrapper.style.top = 50 + (Math.random() * 40 - 20) + "%";
  divWrapper.style.left = 50 + (Math.random() * 40 - 20) + "%";
  divWrapper.style.transform = "translate(-50%, -50%)";

  const entranceEffect = getRandomEntrance();
  const div = document.createElement("div");
  div.innerText = char;
  div.style.animation = `${entranceEffect} ${POPUP_EFFECT_DURATION}ms ease`;

  // remove the current character with the "out" version of the animation
  if (lastDiv && lastEntrance) {
    animateOut(
      lastDiv,
      // @ts-ignore
      `${ENTER_EFFECTS[lastEntrance]} ${POPUP_EFFECT_DURATION}ms ease`
    );
  }

  divWrapper.appendChild(div);
  document.body.appendChild(divWrapper);
  lastDiv = div;
  lastEntrance = entranceEffect;
}

function animateOut(element: HTMLElement, exitAnimation: string) {
  element.style.animation = exitAnimation;
  element.addEventListener("animationend", (event) => {
    if (event.target instanceof HTMLElement) {
      event.target.remove();
    }
  });
}

function forceKeyboardOpen() {
  requestAnimationFrame(() => {
    document.getElementById("input")?.focus();
    forceKeyboardOpen();
  });
}
