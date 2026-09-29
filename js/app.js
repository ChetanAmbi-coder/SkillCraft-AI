/**
 * SkillCraft-AI — app.js
 * Day 2: Landing Page + Career Goal Selector
 *
 * Responsibilities:
 *  1. Mobile navigation toggle
 *  2. Smooth anchor scrolling (close mobile menu after click)
 *  3. Modal open / close (multiple "Start Your Journey" buttons)
 *  4. Onboarding form validation
 *  5. localStorage read / write for user profile
 *  6. Success state rendering
 *  7. Returning user banner
 */

'use strict';


/* =============================================================
   CONSTANTS — Data labels used in the success summary UI
   ============================================================= */

/** Maps raw form values to human-readable display labels */
const CAREER_GOAL_LABELS = {
  'full-stack-developer':    'Full-Stack Developer',
  'frontend-developer':      'Frontend Developer',
  'backend-developer':       'Backend Developer',
  'data-analyst':            'Data Analyst',
  'ai-ml-engineer':          'AI / ML Engineer',
  'ui-ux-designer':          'UI / UX Designer',
  'cybersecurity-engineer':  'Cybersecurity Engineer',
};

const LEARNING_GOAL_LABELS = {
  'get-job-ready':    'Get job-ready',
  'get-internship':   'Get an internship',
  'start-freelancing':'Start freelancing',
  'build-projects':   'Build projects',
  'change-careers':   'Change careers',
  'personal-growth':  'Learn for personal growth',
};

const SKILL_LEVEL_LABELS = {
  'beginner':     'Beginner 🌱',
  'intermediate': 'Intermediate 🌿',
  'advanced':     'Advanced 🌳',
};

/** localStorage key for the user's onboarding profile */
const STORAGE_KEY = 'skillcraft_user_profile';


/* =============================================================
   DOM ELEMENT REFERENCES
   Gathered once at startup so we never search the DOM repeatedly.
   ============================================================= */
const dom = {
  // Navigation
  hamburger:        document.getElementById('nav-hamburger'),
  mobileMenu:       document.getElementById('nav-links-mobile'),
  mobileLinks:      document.querySelectorAll('.nav-mobile-link'),

  // Modal
  overlay:          document.getElementById('modal-overlay'),
  modalClose:       document.getElementById('modal-close'),

  // Modal views
  formView:         document.getElementById('modal-form-view'),
  successView:      document.getElementById('modal-success-view'),

  // Buttons that open the modal
  startButtons: [
    document.getElementById('nav-start-btn'),
    document.getElementById('nav-mobile-start-btn'),
    document.getElementById('hero-start-btn'),
    document.getElementById('cta-start-btn'),
  ],

  // Form
  form:             document.getElementById('onboarding-form'),
  submitBtn:        document.getElementById('form-submit-btn'),

  // Form fields
  careerGoalField:  document.getElementById('career-goal'),
  hoursField:       document.getElementById('hours-per-week'),
  learningGoalField:document.getElementById('learning-goal'),

  // Skill level radio cards
  radioCards:       document.querySelectorAll('.radio-card'),

  // Error elements
  errors: {
    careerGoal:   document.getElementById('career-goal-error'),
    skillLevel:   document.getElementById('skill-level-error'),
    hoursPerWeek: document.getElementById('hours-per-week-error'),
    learningGoal: document.getElementById('learning-goal-error'),
  },

  // Form group containers (for .has-error class)
  formGroups: {
    careerGoal:   document.getElementById('fg-career-goal'),
    skillLevel:   document.getElementById('fg-skill-level'),
    hours:        document.getElementById('fg-hours'),
    learningGoal: document.getElementById('fg-learning-goal'),
  },

  // Success view
  successSummary:   document.getElementById('success-summary'),
  successCloseBtn:  document.getElementById('success-close-btn'),

  // Returning user banner
  banner:           document.getElementById('returning-banner'),
  bannerText:       document.getElementById('returning-banner-text'),
  bannerEditBtn:    document.getElementById('returning-edit-btn'),
  bannerDismissBtn: document.getElementById('returning-dismiss-btn'),
};


/* =============================================================
   MOBILE NAVIGATION
   ============================================================= */

/**
 * Toggles the mobile navigation menu open/closed.
 * Updates aria-expanded and aria-hidden for accessibility.
 */
function toggleMobileMenu() {
  const isOpen = dom.mobileMenu.style.display === 'block';

  if (isOpen) {
    closeMobileMenu();
  } else {
    dom.mobileMenu.style.display = 'block';
    dom.hamburger.setAttribute('aria-expanded', 'true');
    dom.mobileMenu.setAttribute('aria-hidden', 'false');
  }
}

function closeMobileMenu() {
  dom.mobileMenu.style.display = 'none';
  dom.hamburger.setAttribute('aria-expanded', 'false');
  dom.mobileMenu.setAttribute('aria-hidden', 'true');
}

// Close mobile menu when any mobile nav link is clicked
dom.mobileLinks.forEach(function(link) {
  link.addEventListener('click', closeMobileMenu);
});

dom.hamburger.addEventListener('click', toggleMobileMenu);


/* =============================================================
   MODAL — OPEN / CLOSE
   ============================================================= */

/**
 * Opens the career goal modal.
 * Always shows the form view, not the success view, when reopened.
 * Traps focus within the modal for accessibility.
 */
function openModal() {
  // Always reset to form view when opening fresh
  showFormView();

  dom.overlay.classList.add('is-open');
  dom.overlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden'; // prevent background scroll

  // Focus the first interactive element in the modal
  setTimeout(function() {
    dom.modalClose.focus();
  }, 50);
}

function closeModal() {
  dom.overlay.classList.remove('is-open');
  dom.overlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';

  // Return focus to the button that opened the modal
  if (dom._lastOpener) {
    dom._lastOpener.focus();
  }
}

// Attach open handler to all "Start Your Journey" buttons
dom.startButtons.forEach(function(btn) {
  if (!btn) return; // guard against null (e.g. if element isn't in DOM)
  btn.addEventListener('click', function() {
    dom._lastOpener = btn; // remember which button was clicked
    openModal();
    closeMobileMenu();
  });
});

// Close button inside modal
dom.modalClose.addEventListener('click', closeModal);

// Close by clicking the overlay background (but not the modal itself)
dom.overlay.addEventListener('click', function(e) {
  if (e.target === dom.overlay) {
    closeModal();
  }
});

// Close on Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && dom.overlay.classList.contains('is-open')) {
    closeModal();
  }
});

// Success view close button
dom.successCloseBtn.addEventListener('click', closeModal);


/* =============================================================
   MODAL VIEWS — switch between form and success states
   ============================================================= */

function showFormView() {
  dom.formView.style.display = 'block';
  dom.formView.setAttribute('aria-hidden', 'false');
  dom.successView.style.display = 'none';
  dom.successView.setAttribute('aria-hidden', 'true');
}

function showSuccessView(profile) {
  dom.formView.style.display = 'none';
  dom.formView.setAttribute('aria-hidden', 'true');

  // Populate the summary list
  renderSuccessSummary(profile);

  dom.successView.style.display = 'block';
  dom.successView.removeAttribute('aria-hidden');

  // Focus the success heading for screen reader announcement
  dom.successView.querySelector('.success-title').focus();
}


/* =============================================================
   FORM — RADIO CARD INTERACTION
   Visual selection state for the skill level radio group.
   ============================================================= */

dom.radioCards.forEach(function(card) {
  const input = card.querySelector('input[type="radio"]');

  // Click on the card label should select the radio
  card.addEventListener('click', function() {
    // Deselect all cards first
    dom.radioCards.forEach(function(c) {
      c.classList.remove('is-selected');
    });
    // Select this one
    card.classList.add('is-selected');
    input.checked = true;

    // Clear the skill level error when user selects a value
    clearError('skillLevel');
  });

  // Keyboard: spacebar or enter while radio is focused also updates visual state
  input.addEventListener('change', function() {
    dom.radioCards.forEach(function(c) {
      c.classList.remove('is-selected');
    });
    card.classList.add('is-selected');
    clearError('skillLevel');
  });
});


/* =============================================================
   FORM — LIVE VALIDATION (clear errors when user fixes a field)
   ============================================================= */

dom.careerGoalField.addEventListener('change', function() {
  if (dom.careerGoalField.value) clearError('careerGoal');
});

dom.hoursField.addEventListener('input', function() {
  const val = Number(dom.hoursField.value);
  if (val >= 1 && val <= 80) clearError('hoursPerWeek');
});

dom.learningGoalField.addEventListener('change', function() {
  if (dom.learningGoalField.value) clearError('learningGoal');
});


/* =============================================================
   FORM — VALIDATION
   ============================================================= */

/**
 * Validates all four form fields.
 * Returns { isValid: Boolean, profile: Object | null }
 *
 * Displays inline error messages without using alert().
 * The profile object is only returned when isValid is true.
 */
function validateForm() {
  // Clear all previous errors before re-validating
  clearAllErrors();

  let isValid = true;

  // --- Career Goal ---
  const careerGoal = dom.careerGoalField.value.trim();
  if (!careerGoal) {
    showError('careerGoal', 'Please select a career path.');
    isValid = false;
  }

  // --- Skill Level (radio) ---
  const skillLevelInput = dom.form.querySelector('input[name="skillLevel"]:checked');
  if (!skillLevelInput) {
    showError('skillLevel', 'Please select your current skill level.');
    isValid = false;
  }

  // --- Hours Per Week ---
  const hoursRaw = dom.hoursField.value.trim();
  let hoursPerWeek = null;

  if (!hoursRaw) {
    showError('hoursPerWeek', 'Please enter your available hours per week.');
    isValid = false;
  } else {
    hoursPerWeek = Number(hoursRaw);
    if (!Number.isInteger(hoursPerWeek) || hoursPerWeek < 1 || hoursPerWeek > 80) {
      showError('hoursPerWeek', 'Please enter a whole number between 1 and 80.');
      isValid = false;
    }
  }

  // --- Learning Goal ---
  const learningGoal = dom.learningGoalField.value.trim();
  if (!learningGoal) {
    showError('learningGoal', 'Please select your primary learning goal.');
    isValid = false;
  }

  if (!isValid) {
    return { isValid: false, profile: null };
  }

  return {
    isValid: true,
    profile: {
      careerGoal:   careerGoal,
      skillLevel:   skillLevelInput.value,
      hoursPerWeek: hoursPerWeek,
      learningGoal: learningGoal,
      savedAt:      new Date().toISOString(),
    },
  };
}

/**
 * Shows an error message for a specific field and
 * adds the visual error class to the form group.
 */
function showError(fieldKey, message) {
  const errorEl = dom.errors[fieldKey];
  if (errorEl) errorEl.textContent = message;

  // For skill level, the form group key is named differently
  const groupKey = fieldKey === 'hoursPerWeek' ? 'hours' :
                   fieldKey === 'skillLevel'   ? 'skillLevel' : fieldKey;

  const groupEl = dom.formGroups[groupKey] || dom.formGroups[fieldKey];
  if (groupEl) groupEl.classList.add('has-error');
}

function clearError(fieldKey) {
  const errorEl = dom.errors[fieldKey];
  if (errorEl) errorEl.textContent = '';

  const groupKey = fieldKey === 'hoursPerWeek' ? 'hours' : fieldKey;
  const groupEl = dom.formGroups[groupKey] || dom.formGroups[fieldKey];
  if (groupEl) groupEl.classList.remove('has-error');
}

function clearAllErrors() {
  Object.keys(dom.errors).forEach(clearError);
}


/* =============================================================
   FORM — SUBMISSION
   ============================================================= */

dom.form.addEventListener('submit', function(e) {
  e.preventDefault();

  const result = validateForm();
  if (!result.isValid) {
    // Move focus to the first field with an error
    const firstError = dom.form.querySelector('.has-error input, .has-error select');
    if (firstError) firstError.focus();
    return;
  }

  // Briefly show a loading state
  dom.submitBtn.classList.add('is-loading');
  dom.submitBtn.textContent = 'Saving…';

  // Simulate a short processing delay for UX feedback
  // (In a real app this would be a server request)
  setTimeout(function() {
    dom.submitBtn.classList.remove('is-loading');

    // Save to localStorage
    saveProfile(result.profile);

    // Show the success state
    showSuccessView(result.profile);
  }, 600);
});


/* =============================================================
   LOCAL STORAGE — SAVE & LOAD
   ============================================================= */

/**
 * Saves the user's onboarding profile to localStorage.
 * Overwrites any existing saved profile.
 */
function saveProfile(profile) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch (err) {
    // localStorage may be unavailable in private browsing or if storage is full.
    // This is non-critical — the app still works without persistence.
    console.warn('SkillCraft-AI: Could not save to localStorage.', err);
  }
}

/**
 * Loads the user's profile from localStorage.
 * Returns the parsed profile object, or null if none exists or parsing fails.
 */
function loadProfile() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (err) {
    console.warn('SkillCraft-AI: Could not read from localStorage.', err);
    return null;
  }
}


/* =============================================================
   SUCCESS SUMMARY — RENDER
   ============================================================= */

/**
 * Builds and inserts the summary <dl> items into the success view.
 * Uses the label maps defined at the top of the file.
 */
function renderSuccessSummary(profile) {
  const careerLabel   = CAREER_GOAL_LABELS[profile.careerGoal]   || profile.careerGoal;
  const skillLabel    = SKILL_LEVEL_LABELS[profile.skillLevel]   || profile.skillLevel;
  const learningLabel = LEARNING_GOAL_LABELS[profile.learningGoal]|| profile.learningGoal;
  const hoursLabel    = profile.hoursPerWeek + ' hours per week';

  const items = [
    { key: 'Career Goal',    value: careerLabel   },
    { key: 'Skill Level',    value: skillLabel    },
    { key: 'Learning Time',  value: hoursLabel    },
    { key: 'Primary Goal',   value: learningLabel },
  ];

  dom.successSummary.innerHTML = items.map(function(item) {
    return (
      '<div class="success-summary-item">' +
        '<dt class="summary-key">'   + escapeHtml(item.key)   + '</dt>' +
        '<dd class="summary-value">' + escapeHtml(item.value) + '</dd>' +
      '</div>'
    );
  }).join('');
}

/**
 * Escapes user-provided strings before inserting into innerHTML.
 * Prevents XSS from any unexpected data.
 */
function escapeHtml(str) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(String(str)));
  return div.innerHTML;
}


/* =============================================================
   RETURNING USER BANNER
   ============================================================= */

/**
 * On page load, check if the user has a saved profile.
 * If they do, show a welcome-back banner at the bottom of the page.
 */
function handleReturningUser() {
  const profile = loadProfile();
  if (!profile) return;

  const careerLabel = CAREER_GOAL_LABELS[profile.careerGoal] || profile.careerGoal;

  dom.bannerText.textContent =
    '👋  Welcome back! Your goal is set to ' + careerLabel + '.';

  dom.banner.setAttribute('aria-hidden', 'false');
  dom.banner.classList.add('is-visible');
}

// Dismiss the banner
dom.bannerDismissBtn.addEventListener('click', function() {
  dom.banner.classList.remove('is-visible');
  dom.banner.setAttribute('aria-hidden', 'true');
});

// "Update Goal" button opens the modal to let them change their selections
dom.bannerEditBtn.addEventListener('click', function() {
  dom.banner.classList.remove('is-visible');
  dom.banner.setAttribute('aria-hidden', 'true');
  dom._lastOpener = dom.bannerEditBtn;
  openModal();
});


/* =============================================================
   PRE-FILL FORM WITH SAVED DATA
   If the user already has a profile, pre-fill their previous answers.
   ============================================================= */

/**
 * When the modal opens, if a profile exists in localStorage,
 * populate the form with the user's saved selections.
 */
function prefillFormFromStorage() {
  const profile = loadProfile();
  if (!profile) return;

  // Career goal
  if (profile.careerGoal) {
    dom.careerGoalField.value = profile.careerGoal;
  }

  // Skill level (radio)
  if (profile.skillLevel) {
    const radio = dom.form.querySelector(
      'input[name="skillLevel"][value="' + profile.skillLevel + '"]'
    );
    if (radio) {
      radio.checked = true;
      // Update the visual card state
      const card = radio.closest('.radio-card');
      if (card) card.classList.add('is-selected');
    }
  }

  // Hours per week
  if (profile.hoursPerWeek) {
    dom.hoursField.value = profile.hoursPerWeek;
  }

  // Learning goal
  if (profile.learningGoal) {
    dom.learningGoalField.value = profile.learningGoal;
  }
}

// Hook into modal open — prefill each time the modal is opened
dom.startButtons.forEach(function(btn) {
  if (!btn) return;
  btn.addEventListener('click', function() {
    // Small delay to let the modal animate in before prefilling
    setTimeout(prefillFormFromStorage, 50);
  });
});

dom.bannerEditBtn.addEventListener('click', function() {
  setTimeout(prefillFormFromStorage, 50);
});


/* =============================================================
   INITIALIZATION
   Runs once when the page has fully loaded.
   ============================================================= */

function init() {
  // Check for returning user and show banner if applicable
  handleReturningUser();

  // Log a helpful message for developers inspecting the console
  console.log(
    '%cSkillCraft-AI ⚡',
    'color: #7c6cf8; font-size: 16px; font-weight: bold;',
    '— Day 2 running. localStorage key:', STORAGE_KEY
  );
}

// Run after DOM is fully parsed
document.addEventListener('DOMContentLoaded', init);
