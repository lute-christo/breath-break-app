// data/scripts.ts

export type Phase = "inhale" | "exhale" | "hold";
export type Mode = "standard" | "hardcore";

export interface ScriptLine {
  phase: Phase;
  label: string;
  text: string;
}

export interface EmotionScript {
  emotion: string;
  mode: Mode;
  lines: ScriptLine[];
}

// ─────────────────────────────────────────────
// GROUPINGS
// ─────────────────────────────────────────────
//
// ACTIVATION  — high-energy difficult states
//   anxiety, anger, panic, restless, frustration
//
// HEAVY       — low-energy difficult states
//   grief, exhaustion, numbness, hopelessness, dread
//
// RELATIONAL  — feelings about others / connection
//   loneliness, jealousy, heartbreak, resentment, longing
//
// SELF        — inward / self-directed states
//   shame, guilt, disappointment, overwhelm
//
// EXPANSIVE   — positive / opening states
//   joy, gratitude, pride, excitement, love,
//   relief, awe, contentment, tenderness, desire
//
// THRESHOLD   — bridges difficult and expansive
//   hope
// ─────────────────────────────────────────────

const SCRIPTS: EmotionScript[] = [

  // =====================
  // ANXIETY
  // =====================
  {
    emotion: "anxiety", mode: "standard",
    lines: [
      { phase: "inhale", label: "INHALE //", text: "Drag the static in with you. No fake calm, just the real buzz under your ribs." },
      { phase: "hold",   label: "HOLD //",   text: "Let the nervous system scream without fixing, scrolling, or apologizing." },
      { phase: "exhale", label: "EXHALE //", text: "Drop a sandbag straight through the floor of your chest. Give the charge somewhere to land." },
      { phase: "hold",   label: "HOLD //",   text: "Hang out in this pocket of quiet. It doesn't have to be perfect to be real." },
    ],
  },
  {
    emotion: "anxiety", mode: "hardcore",
    lines: [
      { phase: "inhale", label: "INHALE //", text: "Suck the panic straight into your lungs. You're done running from it." },
      { phase: "hold",   label: "HOLD //",   text: "Let the heart race and the brain scream. No rescue. Raw. Alive." },
      { phase: "exhale", label: "EXHALE //", text: "Dump the catastrophe out with the air like ash off a cigarette." },
      { phase: "hold",   label: "HOLD //",   text: "Sit in the weird quiet where nothing exploded even though your body swore it would." },
    ],
  },

  // =====================
  // ANGER
  // =====================
  {
    emotion: "anger", mode: "standard",
    lines: [
      { phase: "inhale", label: "INHALE //", text: "Pull the voltage in. Admit how furious you actually are." },
      { phase: "hold",   label: "HOLD //",   text: "Let the heat stack in your ribs without aiming it at anyone yet." },
      { phase: "exhale", label: "EXHALE //", text: "Bleed off just enough charge that you don't have to burn the whole village." },
      { phase: "hold",   label: "HOLD //",   text: "Rest in the glow after the flare. The fire is still yours." },
    ],
  },
  {
    emotion: "anger", mode: "hardcore",
    lines: [
      { phase: "inhale", label: "INHALE //", text: "Drag the rage up from your gut like gasoline catching a match." },
      { phase: "hold",   label: "HOLD //",   text: "Let every grudge, every betrayal, pile in your chest. No sugar-coating." },
      { phase: "exhale", label: "EXHALE //", text: "Blow the heat out of your teeth instead of through someone's life." },
      { phase: "hold",   label: "HOLD //",   text: "Stay in the aftermath where the beast is leashed, not gone. You're the handler now." },
    ],
  },

  // =====================
  // GRIEF
  // =====================
  {
    emotion: "grief", mode: "standard",
    lines: [
      { phase: "inhale", label: "INHALE //", text: "Breathe right into the crater where hope used to live." },
      { phase: "hold",   label: "HOLD //",   text: "Let the ache expand. This is what proof-of-love feels like inside the body." },
      { phase: "exhale", label: "EXHALE //", text: "Send a thread of warmth to every stranger who's missing someone right now too." },
      { phase: "hold",   label: "HOLD //",   text: "Float for a beat in the space they left. You're allowed to still be here." },
    ],
  },
  {
    emotion: "grief", mode: "hardcore",
    lines: [
      { phase: "inhale", label: "INHALE //", text: "Suck air straight into the hole they left without trying to fill it." },
      { phase: "hold",   label: "HOLD //",   text: "Let the unvoiced sob sit like thunder in your chest." },
      { phase: "exhale", label: "EXHALE //", text: "Exhale for every time you swallowed it down to stay functional and palatable." },
      { phase: "hold",   label: "HOLD //",   text: "Wait in the wreckage and notice: even here, some part of you is still choosing life." },
    ],
  },

  // =====================
  // SHAME
  // =====================
  {
    emotion: "shame", mode: "standard",
    lines: [
      { phase: "inhale", label: "INHALE //", text: "Pull in the messy story you're sure would make everyone walk out." },
      { phase: "hold",   label: "HOLD //",   text: "Let it sit in the open for a second. No costume, no spin, no erasing." },
      { phase: "exhale", label: "EXHALE //", text: "Send some mercy to every version of you that did the best they could with trash instructions." },
      { phase: "hold",   label: "HOLD //",   text: "Hang here in the wild thought that you might be unfixably human and still welcome." },
    ],
  },
  {
    emotion: "shame", mode: "hardcore",
    lines: [
      { phase: "inhale", label: "INHALE //", text: "Breathe in the memory you would rather die than have someone see." },
      { phase: "hold",   label: "HOLD //",   text: "Let the disgust, the flinch, the self-hate stand in full daylight." },
      { phase: "exhale", label: "EXHALE //", text: "Blow out the voice that told you you were a defect instead of a human in a rigged game." },
      { phase: "hold",   label: "HOLD //",   text: "Stay for one beat with the blasphemy that you might not need pardoning to exist." },
    ],
  },

  // =====================
  // JEALOUSY
  // =====================
  {
    emotion: "jealousy", mode: "standard",
    lines: [
      { phase: "inhale", label: "INHALE //", text: "Breathe in the sharp little dagger of wanting what they have." },
      { phase: "hold",   label: "HOLD //",   text: "Stay with the sting. No spiritual bypass, no pretending you're above it." },
      { phase: "exhale", label: "EXHALE //", text: "Send a rough blessing toward their win and a rough blessing toward your own hunger." },
      { phase: "hold",   label: "HOLD //",   text: "Rest where their life and your life can both exist without one cancelling the other." },
    ],
  },
  {
    emotion: "jealousy", mode: "hardcore",
    lines: [
      { phase: "inhale", label: "INHALE //", text: "Inhale the ugly truth: you want what they've got and you hate that you want it." },
      { phase: "hold",   label: "HOLD //",   text: "Let the envy crawl under your skin without turning it into a self-indictment." },
      { phase: "exhale", label: "EXHALE //", text: "Exhale for every time you pretended you didn't care so you wouldn't look desperate." },
      { phase: "hold",   label: "HOLD //",   text: "Pause where someone else's shine doesn't erase the weird, specific light you carry." },
    ],
  },

  // =====================
  // LONELINESS
  // =====================
  {
    emotion: "loneliness", mode: "standard",
    lines: [
      { phase: "inhale", label: "INHALE //", text: "Breathe in being alone. No softening it." },
      { phase: "hold",   label: "HOLD //",   text: "This is what being a whole world in one body feels like." },
      { phase: "exhale", label: "EXHALE //", text: "Send a quiet flare to every other heart that's been ghosted and left-on-read." },
      { phase: "hold",   label: "HOLD //",   text: "Pause in the strange truth that you are still real, even when nobody is watching." },
    ],
  },
  {
    emotion: "loneliness", mode: "hardcore",
    lines: [
      { phase: "inhale", label: "INHALE //", text: "Breathe in the feeling of being the last person awake in a dead mall of a universe." },
      { phase: "hold",   label: "HOLD //",   text: "Let the emptiness ache like phantom limbs reaching for lost loves." },
      { phase: "exhale", label: "EXHALE //", text: "Exhale for every conversation you rehearsed and never sent." },
      { phase: "hold",   label: "HOLD //",   text: "Stay in the eerie fact that the void is looking back: it's you." },
    ],
  },

  // =====================
  // EXHAUSTION
  // =====================
  {
    emotion: "exhaustion", mode: "standard",
    lines: [
      { phase: "inhale", label: "INHALE //", text: "Pull in just enough air for this breath, not for your whole impossible to-do list." },
      { phase: "hold",   label: "HOLD //",   text: "Admit how cooked you are. It's just the truth." },
      { phase: "exhale", label: "EXHALE //", text: "Let one obligation slide off your back for now: you don't have to earn this exhale." },
      { phase: "hold",   label: "HOLD //",   text: "Float in the tiny pocket of not-doing. Being alive is already a lot." },
    ],
  },
  {
    emotion: "exhaustion", mode: "hardcore",
    lines: [
      { phase: "inhale", label: "INHALE //", text: "Inhale like someone who's run on fumes for years and finally stopped pretending." },
      { phase: "hold",   label: "HOLD //",   text: "Let the burnout, resentment, and bone-deep fatigue say their names." },
      { phase: "exhale", label: "EXHALE //", text: "Blow out the lie that you're only as worthy as your output." },
      { phase: "hold",   label: "HOLD //",   text: "Rest in the outlaw idea that doing nothing for a breath is sacred, not lazy." },
    ],
  },

  // =====================
  // RESTLESS
  // =====================
  {
    emotion: "restless", mode: "standard",
    lines: [
      { phase: "inhale", label: "INHALE //", text: "Breathe into the itch, the can't-sit-still, the body that wants to be somewhere else." },
      { phase: "hold",   label: "HOLD //",   text: "Let the squirm stack up without scratching it. The urge gets to be here too." },
      { phase: "exhale", label: "EXHALE //", text: "Give the excess charge somewhere to drain. You don't have to solve the itch to release it." },
      { phase: "hold",   label: "HOLD //",   text: "Pause in the stillness you thought you couldn't stand. You're still in one piece." },
    ],
  },
  {
    emotion: "restless", mode: "hardcore",
    lines: [
      { phase: "inhale", label: "INHALE //", text: "Suck the crawling-out-of-your-skin feeling straight into your lungs instead of running from it." },
      { phase: "hold",   label: "HOLD //",   text: "Let the itch burn without reaching for your phone, the fridge, anything. Just the itch." },
      { phase: "exhale", label: "EXHALE //", text: "Dump the fidget, the loop, the unearned urgency out with the air." },
      { phase: "hold",   label: "HOLD //",   text: "Stay in the stillness you've been sprinting from. Nothing here is going to eat you." },
    ],
  },

  // =====================
  // NUMBNESS
  // =====================
  {
    emotion: "numbness", mode: "standard",
    lines: [
      { phase: "inhale", label: "INHALE //", text: "Breathe in the fact that you can't feel much and stop trying to force a feeling." },
      { phase: "hold",   label: "HOLD //",   text: "Hang out with the blank screen. Even this is data from your system." },
      { phase: "exhale", label: "EXHALE //", text: "Send a little kindness toward the part of you that hit the dimmer switch to survive." },
      { phase: "hold",   label: "HOLD //",   text: "Stay for a beat with the faint hum that's left. You're not broken; you're pacing yourself." },
    ],
  },
  {
    emotion: "numbness", mode: "hardcore",
    lines: [
      { phase: "inhale", label: "INHALE //", text: "Inhale into the dead zone like you're knocking on a locked door in your own house." },
      { phase: "hold",   label: "HOLD //",   text: "Let the nothingness be loud. This is what overload looks like when it pulls the plug." },
      { phase: "exhale", label: "EXHALE //", text: "Exhale for the version of you that decided feeling nothing was safer than feeling everything." },
      { phase: "hold",   label: "HOLD //",   text: "Wait in the low hum that remains. Even shutdown is you trying to keep you alive." },
    ],
  },

  // =====================
  // GUILT
  // =====================
  {
    emotion: "guilt", mode: "standard",
    lines: [
      { phase: "inhale", label: "INHALE //", text: "Pull in the specific thing you did — not the smeared general feeling that you're a bad person." },
      { phase: "hold",   label: "HOLD //",   text: "Let the weight sit in your chest. This is different from shame — it's not who you are, it's what you did." },
      { phase: "exhale", label: "EXHALE //", text: "Send something toward whoever got caught in the blast radius." },
      { phase: "hold",   label: "HOLD //",   text: "Rest in the uncomfortable truth that guilt means your conscience is still working." },
    ],
  },
  {
    emotion: "guilt", mode: "hardcore",
    lines: [
      { phase: "inhale", label: "INHALE //", text: "Breathe in the exact moment you made the wrong call, and stop hiding behind vagueness." },
      { phase: "hold",   label: "HOLD //",   text: "Let the specific damage sit in full view. No collapsing it into general self-loathing to make it easier to carry." },
      { phase: "exhale", label: "EXHALE //", text: "Blow out the part that's been using guilt as punishment instead of information." },
      { phase: "hold",   label: "HOLD //",   text: "Stay with the raw fact that you can hurt people and still not be the villain of the whole story." },
    ],
  },

  // =====================
  // DREAD
  // =====================
  {
    emotion: "dread", mode: "standard",
    lines: [
      { phase: "inhale", label: "INHALE //", text: "Pull in the thing that's coming — the weight of it sitting at the edge of your vision." },
      { phase: "hold",   label: "HOLD //",   text: "Let the anticipation pool in your stomach. You're allowed to hate that it's coming." },
      { phase: "exhale", label: "EXHALE //", text: "Release the future, just for this breath. It hasn't happened yet." },
      { phase: "hold",   label: "HOLD //",   text: "Sit in the small mercy of this exact moment, which is still pre-disaster." },
    ],
  },
  {
    emotion: "dread", mode: "hardcore",
    lines: [
      { phase: "inhale", label: "INHALE //", text: "Breathe in the full catastrophe your brain has already lived six times this week." },
      { phase: "hold",   label: "HOLD //",   text: "Let the doom stack up without scrolling past it or pretending you're not terrified." },
      { phase: "exhale", label: "EXHALE //", text: "Exhale for every version of this disaster that never actually showed up." },
      { phase: "hold",   label: "HOLD //",   text: "Wait here where nothing has collapsed yet. The dread is real. The disaster is still fiction." },
    ],
  },

  // =====================
  // DISAPPOINTMENT
  // =====================
  {
    emotion: "disappointment", mode: "standard",
    lines: [
      { phase: "inhale", label: "INHALE //", text: "Breathe in the gap between what you needed and what showed up." },
      { phase: "hold",   label: "HOLD //",   text: "Let the let-down be as big as it actually was. No minimizing, no \"it's fine.\"" },
      { phase: "exhale", label: "EXHALE //", text: "Release the version of events you'd been carrying — the one where it went differently." },
      { phase: "hold",   label: "HOLD //",   text: "Rest in the quiet truth you wanted something badly enough to be gutted. That's its own kind of love." },
    ],
  },
  {
    emotion: "disappointment", mode: "hardcore",
    lines: [
      { phase: "inhale", label: "INHALE //", text: "Suck in the specific face of the thing that failed you — person, plan, version of yourself." },
      { phase: "hold",   label: "HOLD //",   text: "Let the bitterness sit without converting it into a lesson or a silver lining yet." },
      { phase: "exhale", label: "EXHALE //", text: "Exhale for every time you talked yourself out of how bad it actually felt." },
      { phase: "hold",   label: "HOLD //",   text: "Pause in the wreckage without rebuilding anything yet. The loss gets to just be the loss." },
    ],
  },

  // =====================
  // RESENTMENT
  // =====================
  {
    emotion: "resentment", mode: "standard",
    lines: [
      { phase: "inhale", label: "INHALE //", text: "Breathe in the slow burn that's been running under everything for longer than you'd like to admit." },
      { phase: "hold",   label: "HOLD //",   text: "Let the accumulated grievances stack up. They don't need to be justified to be real." },
      { phase: "exhale", label: "EXHALE //", text: "Bleed off a little pressure without needing to resolve what caused it." },
      { phase: "hold",   label: "HOLD //",   text: "Sit in the complicated truth: resentment is just unexpressed need that's run out of patience." },
    ],
  },
  {
    emotion: "resentment", mode: "hardcore",
    lines: [
      { phase: "inhale", label: "INHALE //", text: "Pull in every time you swallowed something that deserved to be said." },
      { phase: "hold",   label: "HOLD //",   text: "Let the scoreboard you've been keeping run in full. You know every entry." },
      { phase: "exhale", label: "EXHALE //", text: "Blow out the story that keeping the score is protecting you." },
      { phase: "hold",   label: "HOLD //",   text: "Stay with the uncomfortable question of what you'd need to stop running the tab." },
    ],
  },

  // =====================
  // HEARTBREAK
  // =====================
  {
    emotion: "heartbreak", mode: "standard",
    lines: [
      { phase: "inhale", label: "INHALE //", text: "Breathe right into the specific shape of what's gone — the laugh, the way they said your name, the future you'd already furnished." },
      { phase: "hold",   label: "HOLD //",   text: "Let the loss be as large and specific as it actually is." },
      { phase: "exhale", label: "EXHALE //", text: "Release them a little — not forever, just for this breath." },
      { phase: "hold",   label: "HOLD //",   text: "Float in the strange truth that this much pain only happens when you loved something real." },
    ],
  },
  {
    emotion: "heartbreak", mode: "hardcore",
    lines: [
      { phase: "inhale", label: "INHALE //", text: "Suck air into the hollow where they lived and stop trying to patch it with logic." },
      { phase: "hold",   label: "HOLD //",   text: "Let every memory surface at once. Let them. Don't push them down." },
      { phase: "exhale", label: "EXHALE //", text: "Exhale for every text you drafted and deleted, every argument you're still winning in your head." },
      { phase: "hold",   label: "HOLD //",   text: "Stay in the rubble. You don't have to be over it. You just have to breathe." },
    ],
  },

  // =====================
  // OVERWHELM
  // =====================
  {
    emotion: "overwhelm", mode: "standard",
    lines: [
      { phase: "inhale", label: "INHALE //", text: "Pull in one breath in a room where everything is on fire and you can only pick up one thing." },
      { phase: "hold",   label: "HOLD //",   text: "Acknowledge the too-much-ness without trying to fix it right now." },
      { phase: "exhale", label: "EXHALE //", text: "Set one thing down. Just one. The rest can wait another breath." },
      { phase: "hold",   label: "HOLD //",   text: "Pause in the radical act of not solving it for thirty seconds. Still here. Still breathing." },
    ],
  },
  {
    emotion: "overwhelm", mode: "hardcore",
    lines: [
      { phase: "inhale", label: "INHALE //", text: "Breathe in while the whole system is overloaded and you've forgotten what wasn't urgent." },
      { phase: "hold",   label: "HOLD //",   text: "Let every open tab, unpaid thing, unanswered person pile into your chest at once." },
      { phase: "exhale", label: "EXHALE //", text: "Blow out the lie that you're supposed to be handling all of this without breaking a sweat." },
      { phase: "hold",   label: "HOLD //",   text: "Stay in the space between tasks and notice: you haven't actually died of it yet." },
    ],
  },

  // =====================
  // HOPELESSNESS
  // =====================
  {
    emotion: "hopelessness", mode: "standard",
    lines: [
      { phase: "inhale", label: "INHALE //", text: "Breathe into the place where the future has gone dark." },
      { phase: "hold",   label: "HOLD //",   text: "Let the nothing-will-work feeling sit without immediately arguing against it." },
      { phase: "exhale", label: "EXHALE //", text: "Notice that part of you is still here, still breathing, still showing up." },
      { phase: "hold",   label: "HOLD //",   text: "Rest in the smallest possible miracle: that you're still choosing to breathe." },
    ],
  },
  {
    emotion: "hopelessness", mode: "hardcore",
    lines: [
      { phase: "inhale", label: "INHALE //", text: "Drag air into a chest that's done believing anything will change." },
      { phase: "hold",   label: "HOLD //",   text: "Let the defeated, wrung-out, what's-the-point feeling have its full say." },
      { phase: "exhale", label: "EXHALE //", text: "Exhale for every time someone told you to think positive and you wanted to throw something." },
      { phase: "hold",   label: "HOLD //",   text: "Sit with the defiant fact that you're still breathing even when you see no reason to bother." },
    ],
  },

  // =====================
  // LONGING
  // =====================
  {
    emotion: "longing", mode: "standard",
    lines: [
      { phase: "inhale", label: "INHALE //", text: "Breathe into the ache for what isn't here — person, place, version of your life." },
      { phase: "hold",   label: "HOLD //",   text: "Let the wanting be as large as it is without chasing it or shutting it down." },
      { phase: "exhale", label: "EXHALE //", text: "Release the grip a little. Not the longing — just the grip." },
      { phase: "hold",   label: "HOLD //",   text: "Rest in the bittersweet truth that this ache is proof you know what matters to you." },
    ],
  },
  {
    emotion: "longing", mode: "hardcore",
    lines: [
      { phase: "inhale", label: "INHALE //", text: "Pull in the specific absence — the exact thing that isn't here that should be." },
      { phase: "hold",   label: "HOLD //",   text: "Let the hunger burn without feeding it or starving it. Just the raw want." },
      { phase: "exhale", label: "EXHALE //", text: "Exhale for every time you pretended you were fine with how things turned out." },
      { phase: "hold",   label: "HOLD //",   text: "Stay in the ache without resolving it. Some things deserve to be missed this hard." },
    ],
  },

  // =====================
  // FRUSTRATION
  // =====================
  {
    emotion: "frustration", mode: "standard",
    lines: [
      { phase: "inhale", label: "INHALE //", text: "Breathe in the blocked feeling — the trying and hitting a wall, the wheel spinning in mud." },
      { phase: "hold",   label: "HOLD //",   text: "Let the stuck-ness be what it is without catastrophizing it into permanent failure." },
      { phase: "exhale", label: "EXHALE //", text: "Drop the push for one breath. The wall doesn't care how hard you're shoving." },
      { phase: "hold",   label: "HOLD //",   text: "Pause here and notice: sometimes the obstacle isn't the problem. The pace is." },
    ],
  },
  {
    emotion: "frustration", mode: "hardcore",
    lines: [
      { phase: "inhale", label: "INHALE //", text: "Suck in the maddening reality that you're doing everything right and it's still not working." },
      { phase: "hold",   label: "HOLD //",   text: "Let the injustice of it stack up — the effort, the waiting, the not-yet, the not-fair." },
      { phase: "exhale", label: "EXHALE //", text: "Blow the steam out before it becomes something you'll regret." },
      { phase: "hold",   label: "HOLD //",   text: "Sit in the discipline of not quitting just because the universe is being stupid about the timing." },
    ],
  },

  // =====================
  // PANIC
  // =====================
  {
    emotion: "panic", mode: "standard",
    lines: [
      { phase: "inhale", label: "INHALE //", text: "Take one breath — slow, deliberate, against every instinct telling you to hyperventilate." },
      { phase: "hold",   label: "HOLD //",   text: "Let the alarm bells ring without treating them as facts about what's coming." },
      { phase: "exhale", label: "EXHALE //", text: "Slow the descent with just the exhale. Your nervous system is doing its job, not announcing your death." },
      { phase: "hold",   label: "HOLD //",   text: "Land here for a second. The body lied. You're still okay." },
    ],
  },
  {
    emotion: "panic", mode: "hardcore",
    lines: [
      { phase: "inhale", label: "INHALE //", text: "Force one breath in while every alarm in your body is screaming get out get out get out." },
      { phase: "hold",   label: "HOLD //",   text: "Let the heart pound and the vision narrow without bolting. You're training the nervous system, not obeying it." },
      { phase: "exhale", label: "EXHALE //", text: "Blow out long and slow — the one thing that actually signals safe to the brainstem." },
      { phase: "hold",   label: "HOLD //",   text: "Stay in the eye of it. The storm is real. You are realer." },
    ],
  },

  // =====================
  // JOY
  // =====================
  {
    emotion: "joy", mode: "standard",
    lines: [
      { phase: "inhale", label: "INHALE //", text: "Breathe into the good thing — really let it in instead of waiting for the catch." },
      { phase: "hold",   label: "HOLD //",   text: "Let the lightness expand. Joy is allowed to take up space." },
      { phase: "exhale", label: "EXHALE //", text: "Send some of this out into the room, the city, the general direction of other people." },
      { phase: "hold",   label: "HOLD //",   text: "Rest in the wild permission to feel this good without needing to explain why." },
    ],
  },
  {
    emotion: "joy", mode: "hardcore",
    lines: [
      { phase: "inhale", label: "INHALE //", text: "Suck the actual good feeling in instead of immediately scanning for what could wreck it." },
      { phase: "hold",   label: "HOLD //",   text: "Let the aliveness be as loud as it wants. Stop managing it down to something reasonable." },
      { phase: "exhale", label: "EXHALE //", text: "Blow out the reflex that says something this good means something bad is coming." },
      { phase: "hold",   label: "HOLD //",   text: "Stay in the unreasonable, unearned, defiant fact of feeling good right now." },
    ],
  },

  // =====================
  // GRATITUDE
  // =====================
  {
    emotion: "gratitude", mode: "standard",
    lines: [
      { phase: "inhale", label: "INHALE //", text: "Pull in one specific thing — not a list, just one — and actually feel it instead of just noting it." },
      { phase: "hold",   label: "HOLD //",   text: "Let the fullness sit. This is what having something to lose feels like from the inside." },
      { phase: "exhale", label: "EXHALE //", text: "Send warmth toward the people, the luck, the small accidents that made it possible." },
      { phase: "hold",   label: "HOLD //",   text: "Rest in the strange weight of having enough, just for this breath." },
    ],
  },
  {
    emotion: "gratitude", mode: "hardcore",
    lines: [
      { phase: "inhale", label: "INHALE //", text: "Breathe in the specific thing you almost didn't have, almost lost, or nearly missed entirely." },
      { phase: "hold",   label: "HOLD //",   text: "Let the vulnerability of caring this much sit in your chest without flinching." },
      { phase: "exhale", label: "EXHALE //", text: "Exhale for every time you skimmed past this without really landing on it." },
      { phase: "hold",   label: "HOLD //",   text: "Stay in the quiet devastation of actually noticing what you have before it's gone." },
    ],
  },

  // =====================
  // PRIDE
  // =====================
  {
    emotion: "pride", mode: "standard",
    lines: [
      { phase: "inhale", label: "INHALE //", text: "Breathe in what you did — the real thing, not the diminished version you usually tell." },
      { phase: "hold",   label: "HOLD //",   text: "Let yourself have it for once without immediately passing credit to luck or other people." },
      { phase: "exhale", label: "EXHALE //", text: "Release the apology that usually follows when you feel good about yourself." },
      { phase: "hold",   label: "HOLD //",   text: "Sit in the dangerous, unfamiliar territory of thinking you did something worth doing." },
    ],
  },
  {
    emotion: "pride", mode: "hardcore",
    lines: [
      { phase: "inhale", label: "INHALE //", text: "Pull in the full weight of what it actually cost you to get here." },
      { phase: "hold",   label: "HOLD //",   text: "Let the satisfaction sit without the instant reflex to say \"but it's not that big a deal.\"" },
      { phase: "exhale", label: "EXHALE //", text: "Blow out the voices that taught you staying small was the same as staying safe." },
      { phase: "hold",   label: "HOLD //",   text: "Stay in the blasphemy that you earned this, and you're allowed to know it." },
    ],
  },

  // =====================
  // EXCITEMENT
  // =====================
  {
    emotion: "excitement", mode: "standard",
    lines: [
      { phase: "inhale", label: "INHALE //", text: "Breathe into the charged energy without immediately converting it to anxiety." },
      { phase: "hold",   label: "HOLD //",   text: "Let it fizz in your chest. This is what wanting something feels like when it's safe." },
      { phase: "exhale", label: "EXHALE //", text: "Send some of the charge forward into the thing you're moving toward." },
      { phase: "hold",   label: "HOLD //",   text: "Rest in the electric pause before the thing you've been waiting for." },
    ],
  },
  {
    emotion: "excitement", mode: "hardcore",
    lines: [
      { phase: "inhale", label: "INHALE //", text: "Suck the voltage straight in instead of tamping it down so you don't jinx it." },
      { phase: "hold",   label: "HOLD //",   text: "Let the aliveness buzz at full volume. Stop managing it into something calmer and more acceptable." },
      { phase: "exhale", label: "EXHALE //", text: "Blow out the part that keeps whispering don't get your hopes up." },
      { phase: "hold",   label: "HOLD //",   text: "Stay in the wild, reckless aliveness of actually wanting something and admitting it." },
    ],
  },

  // =====================
  // LOVE
  // =====================
  {
    emotion: "love", mode: "standard",
    lines: [
      { phase: "inhale", label: "INHALE //", text: "Breathe into who or what you love — let the specific face, the specific feeling, fill the chest." },
      { phase: "hold",   label: "HOLD //",   text: "Let the fullness expand. Love is its own kind of overwhelm when you stop keeping it at arm's length." },
      { phase: "exhale", label: "EXHALE //", text: "Send it out — not as a transaction, just as a fact about what lives in you." },
      { phase: "hold",   label: "HOLD //",   text: "Rest in the terrifying, ordinary miracle that you are capable of love." },
    ],
  },
  {
    emotion: "love", mode: "hardcore",
    lines: [
      { phase: "inhale", label: "INHALE //", text: "Pull the full, undefended feeling in — the one you usually keep on a short leash so you don't look desperate." },
      { phase: "hold",   label: "HOLD //",   text: "Let the ache and the warmth and the terror of it stack up together. That's what real love feels like." },
      { phase: "exhale", label: "EXHALE //", text: "Blow out the armor you put on so nobody could see how much you care." },
      { phase: "hold",   label: "HOLD //",   text: "Stay in the wide-open, reckless place where you love something more than is safe." },
    ],
  },

  // =====================
  // RELIEF
  // =====================
  {
    emotion: "relief", mode: "standard",
    lines: [
      { phase: "inhale", label: "INHALE //", text: "Breathe in the fact that it's over — the waiting, the dread, the holding-together." },
      { phase: "hold",   label: "HOLD //",   text: "Let the tension you've been carrying finally have somewhere to go." },
      { phase: "exhale", label: "EXHALE //", text: "Let it all down. The crisis passed. You're allowed to stop bracing now." },
      { phase: "hold",   label: "HOLD //",   text: "Float in the strange quiet after the storm. You made it through." },
    ],
  },
  {
    emotion: "relief", mode: "hardcore",
    lines: [
      { phase: "inhale", label: "INHALE //", text: "Drag air into lungs that have been tight for longer than you realized." },
      { phase: "hold",   label: "HOLD //",   text: "Let the full weight of how hard that was finally be acknowledged, now that it's done." },
      { phase: "exhale", label: "EXHALE //", text: "Blow out every held breath from every moment you were holding it together." },
      { phase: "hold",   label: "HOLD //",   text: "Collapse into the exhale. Nobody is watching. You survived something. Let that be enough." },
    ],
  },

  // =====================
  // AWE
  // =====================
  {
    emotion: "awe", mode: "standard",
    lines: [
      { phase: "inhale", label: "INHALE //", text: "Pull in the vastness — whatever just cracked you open for a second." },
      { phase: "hold",   label: "HOLD //",   text: "Let yourself be small in the best possible way. No performance required." },
      { phase: "exhale", label: "EXHALE //", text: "Release the need to understand it, package it, or explain it to anyone." },
      { phase: "hold",   label: "HOLD //",   text: "Rest in the humbling gift of something bigger than your problems." },
    ],
  },
  {
    emotion: "awe", mode: "hardcore",
    lines: [
      { phase: "inhale", label: "INHALE //", text: "Breathe in the thing that just dismantled your sense of scale." },
      { phase: "hold",   label: "HOLD //",   text: "Let the groundless feeling sit. You don't know as much as you think." },
      { phase: "exhale", label: "EXHALE //", text: "Blow out the constant maintenance of your self-narrative for one breath." },
      { phase: "hold",   label: "HOLD //",   text: "Stay in the quiet wreckage that awe always leaves behind." },
    ],
  },

  // =====================
  // CONTENTMENT
  // =====================
  {
    emotion: "contentment", mode: "standard",
    lines: [
      { phase: "inhale", label: "INHALE //", text: "Pull in the fact that right now, in this moment, you have enough." },
      { phase: "hold",   label: "HOLD //",   text: "Let the quiet of it sit without reaching for improvement or entertainment." },
      { phase: "exhale", label: "EXHALE //", text: "Release the background itch to optimize, upgrade, or want something different." },
      { phase: "hold",   label: "HOLD //",   text: "Rest in the radical act of being satisfied with where you are. Just for now. Just for this." },
    ],
  },
  {
    emotion: "contentment", mode: "hardcore",
    lines: [
      { phase: "inhale", label: "INHALE //", text: "Breathe in the stillness and resist the reflex to fill it." },
      { phase: "hold",   label: "HOLD //",   text: "Let the enough-ness sit without guilt that you're not pushing harder or wanting more." },
      { phase: "exhale", label: "EXHALE //", text: "Blow out the hustle mythology that says this feeling means you've given up." },
      { phase: "hold",   label: "HOLD //",   text: "Stay in the uncomfortable peace of having what you have and letting it be what it is." },
    ],
  },

  // =====================
  // TENDERNESS
  // =====================
  {
    emotion: "tenderness", mode: "standard",
    lines: [
      { phase: "inhale", label: "INHALE //", text: "Breathe into the soft, unguarded feeling — toward someone, something, some version of yourself." },
      { phase: "hold",   label: "HOLD //",   text: "Let the gentleness expand without hardening it. It's allowed to feel soft." },
      { phase: "exhale", label: "EXHALE //", text: "Send it outward — toward whoever or whatever opened you up." },
      { phase: "hold",   label: "HOLD //",   text: "Rest in the quiet miracle that something got through your defenses." },
    ],
  },
  {
    emotion: "tenderness", mode: "hardcore",
    lines: [
      { phase: "inhale", label: "INHALE //", text: "Pull in the feeling of being cracked open by something soft — and resist the reflex to close back up." },
      { phase: "hold",   label: "HOLD //",   text: "Let the unprotected feeling sit in full. You are allowed to be this gentle." },
      { phase: "exhale", label: "EXHALE //", text: "Exhale the armor you usually reach for when things get this real." },
      { phase: "hold",   label: "HOLD //",   text: "Stay in the open, undefended space. Nothing here is going to hurt you." },
    ],
  },

  // =====================
  // DESIRE
  // =====================
  {
    emotion: "desire", mode: "standard",
    lines: [
      { phase: "inhale", label: "INHALE //", text: "Breathe into wanting — the hunger for something good that's yours." },
      { phase: "hold",   label: "HOLD //",   text: "Let the appetite expand without apologizing for it or shrinking it." },
      { phase: "exhale", label: "EXHALE //", text: "Release the shame around wanting things. Desire is just aliveness with a direction." },
      { phase: "hold",   label: "HOLD //",   text: "Rest in the alive, reaching, forward-leaning feeling of being someone who has desire." },
    ],
  },
  {
    emotion: "desire", mode: "hardcore",
    lines: [
      { phase: "inhale", label: "INHALE //", text: "Pull in the full force of what you want without softening it into something appropriate." },
      { phase: "hold",   label: "HOLD //",   text: "Let the hunger sit in full — the ambition, the ache, the appetite you've been told is too much." },
      { phase: "exhale", label: "EXHALE //", text: "Blow out the voice that said wanting this much was greedy, desperate, or embarrassing." },
      { phase: "hold",   label: "HOLD //",   text: "Stay in the defiant aliveness of a person who knows what they want and hasn't given up." },
    ],
  },

  // =====================
  // HOPE
  // =====================
  {
    emotion: "hope", mode: "standard",
    lines: [
      { phase: "inhale", label: "INHALE //", text: "Breathe into the fragile, dangerous idea that something might actually get better." },
      { phase: "hold",   label: "HOLD //",   text: "Let it be as small and tender as it actually is — no inflating it, no defending it." },
      { phase: "exhale", label: "EXHALE //", text: "Send it forward toward the version of things you're still willing to believe in." },
      { phase: "hold",   label: "HOLD //",   text: "Rest in the courage it takes to keep hoping when you have evidence not to." },
    ],
  },
  {
    emotion: "hope", mode: "hardcore",
    lines: [
      { phase: "inhale", label: "INHALE //", text: "Pull the possibility in — not the polished version, the real one, the one you're almost ashamed of wanting." },
      { phase: "hold",   label: "HOLD //",   text: "Let it sit without armoring it or abandoning it. Hope is the most vulnerable thing you can carry." },
      { phase: "exhale", label: "EXHALE //", text: "Blow out the cynicism that's been protecting you from disappointment." },
      { phase: "hold",   label: "HOLD //",   text: "Stay in the undefended place of someone who hasn't given up yet." },
    ],
  },
];

// ─────────────────────────────────────────────
// FREE vs PREMIUM
// ─────────────────────────────────────────────
//
// FREE — universal entry points that hook new users
//   and demonstrate the full range of the app:
//   one high-activation difficult, one heavy difficult,
//   one relational, one self, one positive, one threshold.
//
// PREMIUM — everything else (24 emotions)
// ─────────────────────────────────────────────

export const FREE_EMOTIONS = [
  "anxiety",      // activation  — most common entry point
  "grief",        // heavy       — deeply human, earns trust fast
  "overwhelm",    // self        — highly relatable to modern life
  "loneliness",   // relational  — universal, drives retention
  "joy",          // expansive   — shows the app works for good feelings too
  "hope",         // threshold   — aspirational, great last free emotion
];

export const ALL_EMOTIONS = [
  // activation
  "anxiety", "anger", "panic", "restless", "frustration",
  // heavy
  "grief", "exhaustion", "numbness", "hopelessness", "dread",
  // relational
  "loneliness", "jealousy", "heartbreak", "resentment", "longing",
  // self
  "shame", "guilt", "disappointment", "overwhelm",
  // expansive
  "joy", "gratitude", "pride", "excitement", "love",
  "relief", "awe", "contentment", "tenderness", "desire",
  // threshold
  "hope",
];

export function getScriptForEmotion(
  emotion: string,
  mode: Mode = "standard"
): EmotionScript {
  const lowerEmotion = emotion.toLowerCase();
  const lowerMode = mode.toLowerCase() as Mode;

  const exact = SCRIPTS.find(
    (s) => s.emotion === lowerEmotion && s.mode === lowerMode
  );
  if (exact) return exact;

  const standard = SCRIPTS.find(
    (s) => s.emotion === lowerEmotion && s.mode === "standard"
  );
  if (standard) return standard;

  return SCRIPTS[0];
}
