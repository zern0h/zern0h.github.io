const ROLES = [
  'Software Developer',
  'Software Tester',
  'Systems Integration Specialist',
];

const TYPE_SPEED   = 60;   // ms per character typed
const DELETE_SPEED = 35;   // ms per character deleted
const PAUSE_AFTER  = 2000; // ms to hold the completed word
const PAUSE_BEFORE = 400;  // ms pause before typing next word

export function initTypewriter() {
  const el = document.getElementById('typewriter-role');
  if (!el) return;

  let roleIndex = 0;
  let charIndex  = 0;
  let deleting   = false;

  function tick() {
    const current = ROLES[roleIndex];

    if (!deleting) {
      // Type one character
      el.textContent = current.slice(0, charIndex + 1);
      charIndex++;

      if (charIndex === current.length) {
        // Finished typing — pause then start deleting
        setTimeout(() => { deleting = true; tick(); }, PAUSE_AFTER);
        return;
      }
      setTimeout(tick, TYPE_SPEED);
    } else {
      // Delete one character
      el.textContent = current.slice(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        // Finished deleting — move to next role
        deleting   = false;
        roleIndex  = (roleIndex + 1) % ROLES.length;
        setTimeout(tick, PAUSE_BEFORE);
        return;
      }
      setTimeout(tick, DELETE_SPEED);
    }
  }

  tick();
}
