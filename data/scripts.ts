// data/scripts.ts

export type Phase = "inhale" | "exhale" | "hold";
export type Mode = "standard" | "hardcore";

export interface ScriptLine {
  phase: Phase;
  label: string;
  text: string;
}

export interface EmotionScript {
  emotion: string; // e.g. "anxiety"
  mode: Mode;      // "standard" | "hardcore"
  lines: ScriptLine[]; // 4 lines: inhale, hold, exhale, hold
}

const SCRIPTS: EmotionScript[] = [
  // =====================
  // ANXIETY
  // =====================

  // STANDARD
  {
    emotion: "anxiety",
    mode: "standard",
    lines: [
      {
        phase: "inhale",
        label: "INHALE //",
        text: "Drag the static in with you. No fake calm, just the real buzz under your ribs.",
      },
      {
        phase: "hold",
        label: "HOLD //",
        text: "Let the nervous system scream without fixing, scrolling, or apologizing.",
      },
      {
        phase: "exhale",
        label: "EXHALE //",
        text: "Drop a sandbag straight through the floor of your chest. Give the charge somewhere to land.",
      },
      {
        phase: "hold",
        label: "HOLD //",
        text: "Hang out in this little pocket of quiet. It doesn’t have to be perfect to be real.",
      },
    ],
  },

  // HARDCORE
  {
    emotion: "anxiety",
    mode: "hardcore",
    lines: [
      {
        phase: "inhale",
        label: "INHALE //",
        text: "Suck the panic straight into your lungs like you’re done running from it.",
      },
      {
        phase: "hold",
        label: "HOLD //",
        text: "Let the heart race and the brain glitch. No rescue, just raw aliveness.",
      },
      {
        phase: "exhale",
        label: "EXHALE //",
        text: "Dump the catastrophe stories out with the air like ash off a cigarette.",
      },
      {
        phase: "hold",
        label: "HOLD //",
        text: "Sit in the weird quiet where nothing exploded even though your body swore it would.",
      },
    ],
  },

  // =====================
  // ANGER
  // =====================

  // STANDARD
  {
    emotion: "anger",
    mode: "standard",
    lines: [
      {
        phase: "inhale",
        label: "INHALE //",
        text: "Pull the voltage in. Admit how furious you actually are.",
      },
      {
        phase: "hold",
        label: "HOLD //",
        text: "Let the heat stack in your ribs without aiming it at anyone yet.",
      },
      {
        phase: "exhale",
        label: "EXHALE //",
        text: "Bleed off just enough charge that you don’t have to burn the whole village.",
      },
      {
        phase: "hold",
        label: "HOLD //",
        text: "Rest in the glow after the flare. The fire is still yours, just not driving the car.",
      },
    ],
  },

  // HARDCORE
  {
    emotion: "anger",
    mode: "hardcore",
    lines: [
      {
        phase: "inhale",
        label: "INHALE //",
        text: "Drag the rage up from your gut like gasoline catching a match.",
      },
      {
        phase: "hold",
        label: "HOLD //",
        text: "Let every grudge, every betrayal, pile in your chest. No prettying it up.",
      },
      {
        phase: "exhale",
        label: "EXHALE //",
        text: "Blow the heat out of your teeth instead of through someone’s life.",
      },
      {
        phase: "hold",
        label: "HOLD //",
        text: "Stay in the aftermath where the beast is leashed, not gone. You’re the handler now.",
      },
    ],
  },

  // =====================
  // GRIEF
  // =====================

  // STANDARD
  {
    emotion: "grief",
    mode: "standard",
    lines: [
      {
        phase: "inhale",
        label: "INHALE //",
        text: "Breathe right into the crater where that person, place, or future used to live.",
      },
      {
        phase: "hold",
        label: "HOLD //",
        text: "Let the ache expand. This is what proof-of-love feels like inside the body.",
      },
      {
        phase: "exhale",
        label: "EXHALE //",
        text: "Send a thread of warmth to every stranger who’s missing someone right now too.",
      },
      {
        phase: "hold",
        label: "HOLD //",
        text: "Float for a beat in the space they left. You’re allowed to still be here.",
      },
    ],
  },

  // HARDCORE
  {
    emotion: "grief",
    mode: "hardcore",
    lines: [
      {
        phase: "inhale",
        label: "INHALE //",
        text: "Suck air straight into the hole they left without trying to fill it.",
      },
      {
        phase: "hold",
        label: "HOLD //",
        text: "Let the sob that didn’t get to happen sit like thunder in your chest.",
      },
      {
        phase: "exhale",
        label: "EXHALE //",
        text: "Exhale for every time you swallowed it down to stay functional and palatable.",
      },
      {
        phase: "hold",
        label: "HOLD //",
        text: "Wait in the wreckage and notice: even here, some part of you is still choosing life.",
      },
    ],
  },

  // =====================
  // SHAME
  // =====================

  // STANDARD
  {
    emotion: "shame",
    mode: "standard",
    lines: [
      {
        phase: "inhale",
        label: "INHALE //",
        text: "Pull in the messy story you’re sure would make everyone walk out.",
      },
      {
        phase: "hold",
        label: "HOLD //",
        text: "Let it sit in the open for a second. No costume, no spin, no erasing.",
      },
      {
        phase: "exhale",
        label: "EXHALE //",
        text: "Send some mercy to every version of you that did the best they could with trash instructions.",
      },
      {
        phase: "hold",
        label: "HOLD //",
        text: "Hang here in the wild thought that you might be unfixably human and still welcome.",
      },
    ],
  },

  // HARDCORE
  {
    emotion: "shame",
    mode: "hardcore",
    lines: [
      {
        phase: "inhale",
        label: "INHALE //",
        text: "Breathe in the memory you would rather die than have someone see.",
      },
      {
        phase: "hold",
        label: "HOLD //",
        text: "Let the disgust, the flinch, the self-hate stand in full daylight.",
      },
      {
        phase: "exhale",
        label: "EXHALE //",
        text: "Blow out the voice that told you you were a defect instead of a human in a rigged game.",
      },
      {
        phase: "hold",
        label: "HOLD //",
        text: "Stay for one beat with the blasphemy that you might not need pardoning to exist.",
      },
    ],
  },

  // =====================
  // JEALOUSY
  // =====================

  // STANDARD
  {
    emotion: "jealousy",
    mode: "standard",
    lines: [
      {
        phase: "inhale",
        label: "INHALE //",
        text: "Breathe in the sharp little dagger of wanting what they have.",
      },
      {
        phase: "hold",
        label: "HOLD //",
        text: "Stay with the sting. No spiritual bypass, no pretending you’re above it.",
      },
      {
        phase: "exhale",
        label: "EXHALE //",
        text: "Send a rough blessing toward their win and a rough blessing toward your own hunger.",
      },
      {
        phase: "hold",
        label: "HOLD //",
        text: "Rest where their life and your life can both exist without one cancelling the other.",
      },
    ],
  },

  // HARDCORE
  {
    emotion: "jealousy",
    mode: "hardcore",
    lines: [
      {
        phase: "inhale",
        label: "INHALE //",
        text: "Inhale the ugly truth: you want what they’ve got and you hate that you want it.",
      },
      {
        phase: "hold",
        label: "HOLD //",
        text: "Let the envy crawl under your skin without turning it into a self-indictment.",
      },
      {
        phase: "exhale",
        label: "EXHALE //",
        text: "Exhale for every time you pretended you didn’t care so you wouldn’t look desperate.",
      },
      {
        phase: "hold",
        label: "HOLD //",
        text: "Pause where someone else’s shine doesn’t erase the weird, specific light you carry.",
      },
    ],
  },

  // =====================
  // LONELINESS
  // =====================

  // STANDARD
  {
    emotion: "loneliness",
    mode: "standard",
    lines: [
      {
        phase: "inhale",
        label: "INHALE //",
        text: "Take in the fact that nobody else is in the room. No softening it.",
      },
      {
        phase: "hold",
        label: "HOLD //",
        text: "Let the echo ring out. This is what being a whole planet in one body feels like.",
      },
      {
        phase: "exhale",
        label: "EXHALE //",
        text: "Send a quiet flare to every other insomniac, ghosted, left-on-read heart tonight.",
      },
      {
        phase: "hold",
        label: "HOLD //",
        text: "Pause in the strange truth that you are still real, even when nobody is watching.",
      },
    ],
  },

  // HARDCORE
  {
    emotion: "loneliness",
    mode: "hardcore",
    lines: [
      {
        phase: "inhale",
        label: "INHALE //",
        text: "Breathe in the feeling of being the last person awake in a dead mall of a universe.",
      },
      {
        phase: "hold",
        label: "HOLD //",
        text: "Let the emptiness ache like phantom limbs for people who aren’t here.",
      },
      {
        phase: "exhale",
        label: "EXHALE //",
        text: "Exhale for every conversation you rehearsed and never sent.",
      },
      {
        phase: "hold",
        label: "HOLD //",
        text: "Stay in the eerie fact that the void is looking back: it’s you.",
      },
    ],
  },

  // =====================
  // EXHAUSTION
  // =====================

  // STANDARD
  {
    emotion: "exhaustion",
    mode: "standard",
    lines: [
      {
        phase: "inhale",
        label: "INHALE //",
        text: "Pull in just enough air for this breath, not for the whole impossible to-do list.",
      },
      {
        phase: "hold",
        label: "HOLD //",
        text: "Admit how cooked you are. No heroics, no grinding, just truth.",
      },
      {
        phase: "exhale",
        label: "EXHALE //",
        text: "Let one obligation slide off your back for now. You don’t have to earn this exhale.",
      },
      {
        phase: "hold",
        label: "HOLD //",
        text: "Float in the tiny pocket of not-doing. Being alive is already a lot.",
      },
    ],
  },

  // HARDCORE
  {
    emotion: "exhaustion",
    mode: "hardcore",
    lines: [
      {
        phase: "inhale",
        label: "INHALE //",
        text: "Inhale like someone who's run on fumes for years and finally stopped pretending.",
      },
      {
        phase: "hold",
        label: "HOLD //",
        text: "Let the burnout, resentment, and bone-deep fatigue say their names.",
      },
      {
        phase: "exhale",
        label: "EXHALE //",
        text: "Blow out the lie that you’re only as worthy as your output.",
      },
      {
        phase: "hold",
        label: "HOLD //",
        text: "Rest in the outlaw idea that doing nothing for a breath is sacred, not lazy.",
      },
    ],
  },

  // =====================
  // RESTLESS
  // =====================

  // STANDARD
  {
    emotion: "restless",
    mode: "standard",
    lines: [
      {
        phase: "inhale",
        label: "INHALE //",
        text: "Breathe into the itch, the can't-sit-still, the body that wants to be somewhere else.",
      },
      {
        phase: "hold",
        label: "HOLD //",
        text: "Let the squirm stack up without scratching it. The urge gets to be here too.",
      },
      {
        phase: "exhale",
        label: "EXHALE //",
        text: "Give the excess charge somewhere to drain. You don't have to solve the itch to release it.",
      },
      {
        phase: "hold",
        label: "HOLD //",
        text: "Pause in the stillness you thought you couldn't stand. You're still in one piece.",
      },
    ],
  },

  // HARDCORE
  {
    emotion: "restless",
    mode: "hardcore",
    lines: [
      {
        phase: "inhale",
        label: "INHALE //",
        text: "Suck the crawling-out-of-your-skin feeling straight into your lungs instead of running from it.",
      },
      {
        phase: "hold",
        label: "HOLD //",
        text: "Let the itch burn without reaching for your phone, the fridge, anything. Just the itch.",
      },
      {
        phase: "exhale",
        label: "EXHALE //",
        text: "Dump the fidget, the loop, the unearned urgency out with the air.",
      },
      {
        phase: "hold",
        label: "HOLD //",
        text: "Stay in the stillness you've been sprinting from. Nothing here is going to eat you.",
      },
    ],
  },

  // =====================
  // NUMBNESS
  // =====================

  // STANDARD
  {
    emotion: "numbness",
    mode: "standard",
    lines: [
      {
        phase: "inhale",
        label: "INHALE //",
        text: "Breathe in the fact that you can’t feel much and stop trying to force a feeling.",
      },
      {
        phase: "hold",
        label: "HOLD //",
        text: "Hang out with the blank screen. Even this is data from your system.",
      },
      {
        phase: "exhale",
        label: "EXHALE //",
        text: "Send a little kindness toward the part of you that hit the dimmer switch to survive.",
      },
      {
        phase: "hold",
        label: "HOLD //",
        text: "Stay for a beat with the faint hum that’s left. You’re not broken; you’re pacing yourself.",
      },
    ],
  },

  // HARDCORE
  {
    emotion: "numbness",
    mode: "hardcore",
    lines: [
      {
        phase: "inhale",
        label: "INHALE //",
        text: "Inhale into the dead zone like you’re knocking on a locked door in your own house.",
      },
      {
        phase: "hold",
        label: "HOLD //",
        text: "Let the nothingness be loud. This is what overload looks like when it pulls the plug.",
      },
      {
        phase: "exhale",
        label: "EXHALE //",
        text: "Exhale for the version of you that decided feeling nothing was safer than feeling everything.",
      },
      {
        phase: "hold",
        label: "HOLD //",
        text: "Wait in the low hum that remains. Even shutdown is your organism trying to keep you alive.",
      },
    ],
  },
];

export const FREE_EMOTIONS = ["anxiety", "anger", "grief", "restless"];

export const ALL_EMOTIONS = [
  "anxiety",
  "anger",
  "grief",
  "restless",
  "shame",
  "jealousy",
  "loneliness",
  "exhaustion",
  "numbness",
];

export function getScriptForEmotion(
  emotion: string,
  mode: Mode = "standard"
): EmotionScript {
  const lowerEmotion = emotion.toLowerCase();
  const lowerMode = mode.toLowerCase() as Mode;

  // Try exact match
  const exact = SCRIPTS.find(
    (s) => s.emotion === lowerEmotion && s.mode === lowerMode
  );
  if (exact) return exact;

  // Fallback: standard mode for that emotion
  const standard = SCRIPTS.find(
    (s) => s.emotion === lowerEmotion && s.mode === "standard"
  );
  if (standard) return standard;

  // Fallback: first script in list
  return SCRIPTS[0];
}