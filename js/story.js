/* ============================================
   WMC Kerkrade 1951 � Story Engine
   Interactive Digital Narrative

   Hidden meters: Stadstrots & Openheid
   Branching narrative with 4 endings
   ============================================ */

// --- Game State ------------------------------------
const gameState = {
  stadstrots: 0,
  openheid: 0,
  currentScene: 'title',
  history: [],
  flags: {},
  lang: 'nl'
};

// --- Content helpers (content.js) ------------------
function getLang() { return content[gameState.lang]; }
function getScenes() { return getLang().scenes; }
function getEndings() { return getLang().endings; }
function getSceneLocations() { return getLang().sceneLocations; }
function getUI() { return getLang().ui; }

// --- Web Speech API Voice Narration System -----------
class VoiceNarrator {
  constructor() {
    this.isPlaying = false;
    this.isPaused = false;
    this.currentUtterance = null;
    this.currentHighlight = null;
    this.synth = window.speechSynthesis;
    this._resolveSpeak = null;

    // Preload voices (Chrome loads them async)
    this.synth.getVoices();
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = () => this.synth.getVoices();
    }

    // Character voice settings (pitch, rate) for differentiation
    this.characterVoices = {
      _narrator:              { pitch: 1.0,  rate: 0.95 },  // neutral — verteller
      'Zef':                  { pitch: 0.8,  rate: 1.0  },  // low, steady — mijnwerker
      'Jan Meijs':            { pitch: 0.9,  rate: 0.9  },  // authoritative — comitévoorzitter
      'Pie Slijpen':          { pitch: 1.1,  rate: 1.05 },  // lighter, expressive — comitélid
      'Mevr. Cremers':        { pitch: 1.3,  rate: 0.95 },  // warm female — hostelcoördinator
      'Mrs Cremers':          { pitch: 1.3,  rate: 0.95 },
      'Müller':               { pitch: 0.7,  rate: 0.85 },  // deep, older — oude mijnwerker
      'Mueller':              { pitch: 0.7,  rate: 0.85 },
      'Tom Atkinson':         { pitch: 1.05, rate: 1.0  },  // British flair — Engelse bandleider
      'Atkinson':             { pitch: 1.05, rate: 1.0  },
      'Bandleider':           { pitch: 0.85, rate: 0.9  },  // commanding — Duitse orkestleider
      'Bandleader':           { pitch: 0.85, rate: 0.9  },
      'Trombonist':           { pitch: 1.0,  rate: 1.05 },  // youthful — Belgische muzikant
      'Belgische trombonist': { pitch: 1.0,  rate: 1.05 },
      'Klarinettist':         { pitch: 1.15, rate: 0.95 },  // clear — Duitse muzikant
      'Clarinettist':         { pitch: 1.15, rate: 0.95 },
      'Iemand achteraan':     { pitch: 0.95, rate: 1.1  },  // distinct — anoniem café
      'Someone in the back':  { pitch: 0.95, rate: 1.1  }
    };
  }

  // --- Parse beat into segments ---
  parseBeatSegments(beatDiv) {
    const segments = [];
    const paragraphs = beatDiv.querySelectorAll('p');
    paragraphs.forEach(p => {
      const dialogue = p.querySelector('.dialogue');
      if (dialogue) {
        const speakerEl = dialogue.querySelector('.speaker');
        const speaker = speakerEl ? speakerEl.textContent.trim() : '_narrator';
        const text = dialogue.textContent.replace(speakerEl ? speakerEl.textContent : '', '').trim();
        const cleanText = text.replace(/^[""\u201C]+|[""\u201D]+$/g, '').trim();
        if (cleanText) {
          segments.push({ speaker, text: cleanText, element: p });
        }
      } else {
        const text = p.textContent.trim();
        if (text) {
          segments.push({ speaker: '_narrator', text, element: p });
        }
      }
    });
    if (segments.length === 0) {
      const text = beatDiv.textContent.trim();
      if (text) {
        segments.push({ speaker: '_narrator', text, element: beatDiv });
      }
    }
    return segments;
  }

  // --- Speak a single segment via Web Speech API ---
  _speakSegment(segment) {
    return new Promise((resolve) => {
      this._highlightElement(segment.element);

      const voiceSettings = this.characterVoices[segment.speaker] || this.characterVoices._narrator;
      const utterance = new SpeechSynthesisUtterance(segment.text);
      const langCode = gameState.lang === 'nl' ? 'nl' : 'en';
      utterance.lang = langCode === 'nl' ? 'nl-NL' : 'en-US';

      // Pick a voice per character — cycle through available voices for variety
      const voices = this.synth.getVoices().filter(v => v.lang.startsWith(langCode));
      if (voices.length > 0) {
        // Assign a consistent voice index per speaker name
        const speakerKey = segment.speaker || '_narrator';
        let hash = 0;
        for (let i = 0; i < speakerKey.length; i++) {
          hash = ((hash << 5) - hash) + speakerKey.charCodeAt(i);
          hash |= 0;
        }
        const idx = Math.abs(hash) % voices.length;
        utterance.voice = voices[idx];
        utterance.lang = voices[idx].lang;
      }

      utterance.pitch = voiceSettings.pitch;
      utterance.rate = voiceSettings.rate;

      this.currentUtterance = utterance;
      this._resolveSpeak = resolve;

      utterance.onend = () => {
        this._removeHighlight();
        this.currentUtterance = null;
        this._resolveSpeak = null;
        resolve();
      };
      utterance.onerror = (e) => {
        if (e.error === 'canceled' || e.error === 'interrupted') {
          // intentional stop/cancel
        } else {
          console.warn('Speech error:', e.error);
        }
        this._removeHighlight();
        this.currentUtterance = null;
        this._resolveSpeak = null;
        resolve();
      };

      this.synth.speak(utterance);
    });
  }

  _highlightElement(el) {
    this._removeHighlight();
    if (el) {
      el.classList.add('narration-highlight');
      this.currentHighlight = el;
      const rect = el.getBoundingClientRect();
      if (rect.top > window.innerHeight * 0.7 || rect.bottom < 0) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }

  _removeHighlight() {
    if (this.currentHighlight) {
      this.currentHighlight.classList.remove('narration-highlight');
      this.currentHighlight = null;
    }
  }

  // --- Narrate an entire beat ---
  async narrateBeat(beatDiv, onComplete) {
    const segments = this.parseBeatSegments(beatDiv);
    for (let i = 0; i < segments.length; i++) {
      if (!this.isPlaying) return;
      while (this.isPaused) {
        await new Promise(r => setTimeout(r, 100));
        if (!this.isPlaying) return;
      }
      await this._speakSegment(segments[i]);
    }
    if (onComplete) onComplete();
  }

  play() {
    if (this.isPaused) {
      this.isPaused = false;
      this.synth.resume();
      this.isPlaying = true;
      return;
    }
    this.isPlaying = true;
    this.isPaused = false;
  }

  pause() {
    this.isPaused = true;
    this.synth.pause();
  }

  stop() {
    this.isPlaying = false;
    this.isPaused = false;
    this.synth.cancel();
    this.currentUtterance = null;
    this._removeHighlight();
  }

  toggle() {
    if (!this.isPlaying) {
      this.play();
      return 'playing';
    } else if (this.isPaused) {
      this.play();
      return 'playing';
    } else {
      this.pause();
      return 'paused';
    }
  }

  clearCache() {
    // No cache to clear with Web Speech API
  }
}

// --- Story Engine ----------------------------------
class StoryEngine {
  constructor() {
    this.container = document.getElementById('game-container');
    this.titleScreen = document.getElementById('title-screen');
    this.storyScene = document.getElementById('story-scene');
    this.progressBar = document.getElementById('progress-bar');
    this.chapterIndicator = document.getElementById('chapter-indicator');
    this.toast = document.getElementById('toast');
    this.languageScreen = document.getElementById('language-screen');
    this.blobContainer = document.getElementById('blob-decorations');
    this.totalScenes = 10;
    this.scenesVisited = 0;
    this.lastChapter = '';
    this.currentBeats = [];
    this.currentBeatIndex = 0;
    this.activeScene = null;
    this.narrativeContainer = null;
    this.narrator = new VoiceNarrator();
    this.listenMode = false;
    this.blobSvgs = [
      'Trompet-Blob-WMC-STYLE.svg',
      'Trombone-Blob-WMC-STYLE.svg',
      'Dirigent-Blob-WMC-STYLE.svg'
    ];
  }

  init() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.selectLanguage(btn.getAttribute('data-lang'));
      });
    });
    document.getElementById('start-btn').addEventListener('click', () => {
      this.startGame();
    });
    this._initAudioControls();
  }

  _initAudioControls() {
    this.audioBar = document.getElementById('audio-bar');
    this.audioFabIcon = document.getElementById('audio-fab-icon');

    if (!this.audioBar) return;

    this.audioBar.addEventListener('click', () => {
      if (!this.listenMode) {
        this.listenMode = true;
        this.narrator.play();
        this._updateAudioUI('playing');
        this._narrateCurrentBeat();
      } else {
        const state = this.narrator.toggle();
        this._updateAudioUI(state);
      }
    });
  }

  _updateAudioUI(state) {
    const playIcon = '\u25B6';   // ▶
    const pauseIcon = '\u23F8';  // ⏸

    if (state === 'playing') {
      this.audioBar.classList.add('active');
      this.audioFabIcon.textContent = pauseIcon;
    } else if (state === 'paused') {
      this.audioFabIcon.textContent = playIcon;
    } else {
      this.audioBar.classList.remove('active');
      this.audioFabIcon.textContent = playIcon;
    }
  }

  _narrateCurrentBeat() {
    if (!this.listenMode || !this.narrator.isPlaying) return;

    const beatDivs = this.narrativeContainer.querySelectorAll('.beat');
    const currentBeatDiv = beatDivs[beatDivs.length - 1];
    if (!currentBeatDiv) return;

    this.narrator.narrateBeat(currentBeatDiv, () => {
      if (!this.listenMode) return;
      if (this.currentBeatIndex < this.currentBeats.length) {
        const oldTap = this.narrativeContainer.querySelector('.tap-continue');
        if (oldTap) oldTap.remove();
        this.showNextBeat();
        setTimeout(() => this._narrateCurrentBeat(), 600);
      } else {
        this.listenMode = false;
        this.narrator.stop();
        this._updateAudioUI('stopped');
      }
    });
  }

  selectLanguage(lang) {
    gameState.lang = lang;
    document.getElementById('html-root').setAttribute('lang', lang === 'nl' ? 'nl' : 'en');
    this.languageScreen.classList.add('hidden');

    const ui = getUI();
    document.getElementById('subtitle').textContent = lang === 'nl' ? 'Een interactief verhaal' : 'An interactive story';
    document.getElementById('intro-text').innerHTML = ui.introText;
    document.getElementById('tagline').innerHTML = ui.tagline;
    document.getElementById('how-title').textContent = ui.howTitle;
    document.getElementById('start-btn').textContent = ui.startBtn;

    const howSteps = document.getElementById('how-steps');
    howSteps.innerHTML = '';
    ui.howSteps.forEach(step => {
      const li = document.createElement('li');
      li.innerHTML = step;
      howSteps.appendChild(li);
    });

    this.titleScreen.style.display = 'flex';
    this.titleScreen.style.animation = 'fadeIn 1s ease';
  }

  startGame() {
    gameState.stadstrots = 0;
    gameState.openheid = 0;
    gameState.history = [];
    gameState.flags = {};
    this.scenesVisited = 0;

    // Stop any ongoing narration
    this.listenMode = false;
    this.narrator.stop();
    this._updateAudioUI('stopped');

    this.titleScreen.style.display = 'none';
    this.storyScene.classList.add('active');
    this.chapterIndicator.classList.add('visible');
    this.audioBar.classList.add('visible');

    this.loadScene('proloog');
  }

  // --- Beat splitting -------------------------------
  splitIntoBeats(html) {
    const temp = document.createElement('div');
    temp.innerHTML = html;
    const elements = Array.from(temp.children);

    const beats = [];
    let current = [];

    for (let i = 0; i < elements.length; i++) {
      const el = elements[i];
      if (el.classList && el.classList.contains('scene-break')) continue;

      current.push(el);

      if (current.length >= 2) {
        const nextEl = elements[i + 1];
        const nextHasDialogue = nextEl && nextEl.querySelector && nextEl.querySelector('.dialogue');
        const currentHasDialogue = el.querySelector && el.querySelector('.dialogue');
        if (currentHasDialogue && nextHasDialogue && current.length < 4) continue;

        beats.push(current);
        current = [];
      }
    }
    if (current.length > 0) beats.push(current);
    return beats;
  }

  // --- Blob Decorations (side visuals) --------------
  updateBlobDecorations() {
    this.blobContainer.innerHTML = '';
    const positions = [
      { side: 'left', top: '8%' },
      { side: 'right', top: '22%' },
      { side: 'left', top: '45%' },
      { side: 'right', top: '62%' },
      { side: 'left', top: '78%' },
      { side: 'right', top: '90%' }
    ];
    positions.forEach((pos, i) => {
      const img = document.createElement('img');
      img.src = this.blobSvgs[i % this.blobSvgs.length];
      img.className = 'blob-decor blob-' + pos.side;
      img.style.top = pos.top;
      img.alt = '';
      img.style.animationDelay = (i * 0.8) + 's';
      this.blobContainer.appendChild(img);
    });
    this.blobContainer.classList.add('active');
  }

  // --- Load Scene -----------------------------------
  loadScene(sceneId) {
    const scenes = getScenes();
    const scene = scenes[sceneId];
    if (!scene) return;

    // Stop any ongoing narration when changing scenes
    this.narrator.stop();
    if (this.listenMode) this._updateAudioUI('stopped');
    const wasListening = this.listenMode;
    this.listenMode = false;

    gameState.currentScene = sceneId;
    gameState.history.push(sceneId);
    this.scenesVisited++;
    this.updateProgress();
    this.activeScene = scene;

    const moodColor = sceneMoodColors[sceneId] || '#ffdd00';
    document.documentElement.style.setProperty('--scene-accent', moodColor);

    // Fade out
    this.storyScene.style.opacity = '0';

    setTimeout(() => {
      this.storyScene.innerHTML = '';
      window.scrollTo({ top: 0, behavior: 'instant' });

      // Chapter splash
      if (scene.chapter) {
        this.lastChapter = scene.chapter;
        const splash = document.createElement('div');
        splash.className = 'chapter-splash fade-in';
        splash.innerHTML = `
          <div class="chapter-accent-line"></div>
          <div class="chapter-number">${scene.chapter}</div>
          <h2 class="chapter-title">${scene.chapterTitle}</h2>
        `;
        this.storyScene.appendChild(splash);
        this.chapterIndicator.textContent = scene.chapter;
      }

      // Location bar
      const sceneLocations = getSceneLocations();
      const location = sceneLocations[sceneId];
      if (location) {
        const locDiv = document.createElement('div');
        locDiv.className = 'scene-location fade-in';
        locDiv.innerHTML = `<span class="location-dot"></span>${location}`;
        this.storyScene.appendChild(locDiv);
      }

      // Parse text into beats
      this.currentBeats = this.splitIntoBeats(scene.text);
      this.currentBeatIndex = 0;

      // Create narrative container
      this.narrativeContainer = document.createElement('div');
      this.narrativeContainer.className = 'narrative-block';
      this.storyScene.appendChild(this.narrativeContainer);

      // Show first beat
      this.showNextBeat();

      // Update blob decorations on the sides
      this.updateBlobDecorations();

      // Auto-resume narration if user was in listen mode
      if (wasListening) {
        setTimeout(() => {
          this.listenMode = true;
          this.narrator.play();
          this._updateAudioUI('playing');
          this._narrateCurrentBeat();
        }, 800);
      }

      // Fade in
      this.storyScene.style.opacity = '1';
      this.storyScene.style.transition = 'opacity 0.6s ease';
    }, 400);
  }

  // --- Progressive beat reveal ----------------------
  showNextBeat() {
    if (this.currentBeatIndex >= this.currentBeats.length) {
      this.showSceneActions();
      return;
    }

    const beat = this.currentBeats[this.currentBeatIndex];
    const beatDiv = document.createElement('div');
    beatDiv.className = 'beat narrative-text';

    beat.forEach(el => {
      beatDiv.appendChild(el.cloneNode(true));
    });

    // Remove old tap button
    const oldTap = this.narrativeContainer.querySelector('.tap-continue');
    if (oldTap) oldTap.remove();

    this.narrativeContainer.appendChild(beatDiv);
    this.currentBeatIndex++;

    // Gently scroll so the NEW beat is visible (not jumping past it)
    setTimeout(() => {
      const rect = beatDiv.getBoundingClientRect();
      // Only scroll if the beat is below the current viewport
      if (rect.top > window.innerHeight * 0.6) {
        window.scrollBy({ top: rect.top - window.innerHeight * 0.3, behavior: 'smooth' });
      }
    }, 150);

    // More beats? Show tap button
    if (this.currentBeatIndex < this.currentBeats.length) {
      const tapBtn = document.createElement('button');
      tapBtn.className = 'tap-continue';
      tapBtn.innerHTML = `<span class="tap-text">${getUI().readMore}</span><span class="tap-arrow">\u25BC</span>`;
      tapBtn.addEventListener('click', () => {
        this.showNextBeat();
      });
      this.narrativeContainer.appendChild(tapBtn);
    } else {
      this.showSceneActions();
    }
  }

  // --- Scene Actions (choices / continue / ending) --
  showSceneActions() {
    const scene = this.activeScene;

    if (scene.isEnding) {
      this.showEnding();
    } else if (scene.choices) {
      const choicesContainer = document.createElement('div');
      choicesContainer.className = 'choices-container slide-up';

      const prompt = document.createElement('div');
      prompt.className = 'choices-prompt';
      prompt.textContent = getUI().choicesPrompt;
      choicesContainer.appendChild(prompt);

      scene.choices.forEach((choice) => {
        const btn = document.createElement('button');
        btn.className = 'choice-btn';
        btn.innerHTML = `
          <span class="choice-label">${choice.label}</span>
          <span class="choice-desc">${choice.desc}</span>
        `;
        btn.addEventListener('click', () => this.makeChoice(choice));
        choicesContainer.appendChild(btn);
      });

      this.storyScene.appendChild(choicesContainer);
      // NO auto-scroll � user reads context above, then scrolls down to choices naturally

    } else if (scene.continueText && scene.next) {
      const continueBtn = document.createElement('button');
      continueBtn.className = 'continue-btn slide-up';
      continueBtn.textContent = scene.continueText;
      continueBtn.addEventListener('click', () => this.loadScene(scene.next));
      this.storyScene.appendChild(continueBtn);
    }
  }

  // --- Make Choice ----------------------------------
  makeChoice(choice) {
    const ui = getUI();
    if (choice.effects) {
      if (choice.effects.stadstrots) {
        gameState.stadstrots += choice.effects.stadstrots;
        this.showToast(ui.stadstrots + ' +' + choice.effects.stadstrots);
      }
      if (choice.effects.openheid) {
        gameState.openheid += choice.effects.openheid;
        setTimeout(() => {
          this.showToast(ui.openheid + ' +' + choice.effects.openheid);
        }, choice.effects.stadstrots ? 1500 : 0);
      }
    }
    if (choice.flags) Object.assign(gameState.flags, choice.flags);
    this.loadScene(choice.next);
  }

  // --- Show Ending ----------------------------------
  showEnding() {
    const langEndings = getEndings();
    const ui = getUI();
    let ending = langEndings.stilte;

    if (langEndings.olympisch.condition(gameState)) ending = langEndings.olympisch;
    else if (langEndings.trots.condition(gameState)) ending = langEndings.trots;
    else if (langEndings.wereldburger.condition(gameState)) ending = langEndings.wereldburger;

    const maxScore = 5;
    const stadstrotsPercent = Math.min((gameState.stadstrots / maxScore) * 100, 100);
    const openheidPercent = Math.min((gameState.openheid / maxScore) * 100, 100);

    const endingDiv = document.createElement('div');
    endingDiv.className = 'ending-screen fade-in';
    endingDiv.innerHTML = `
      <h2 class="ending-title">${ending.title}</h2>
      <div class="ending-text">${ending.text}</div>
      <div class="score-reveal">
        <span class="score-label">${ui.stadstrots}</span>
        <div class="score-bar-container">
          <div class="score-bar" id="bar-stadstrots" data-width="${stadstrotsPercent}"></div>
        </div>
        <span class="score-label">${ui.openheid}</span>
        <div class="score-bar-container">
          <div class="score-bar" id="bar-openheid" data-width="${openheidPercent}"></div>
        </div>
      </div>
      <button class="restart-btn" id="restart-btn">${ui.restart}</button>
    `;

    this.storyScene.appendChild(endingDiv);

    setTimeout(() => {
      document.getElementById('bar-stadstrots').style.width = stadstrotsPercent + '%';
      document.getElementById('bar-openheid').style.width = openheidPercent + '%';
    }, 500);

    document.getElementById('restart-btn').addEventListener('click', () => this.restartGame());
  }

  // --- Restart --------------------------------------
  restartGame() {
    this.listenMode = false;
    this.narrator.stop();
    this.narrator.clearCache();
    this._updateAudioUI('stopped');
    this.audioBar.classList.remove('visible');

    this.storyScene.classList.remove('active');
    this.storyScene.innerHTML = '';
    this.chapterIndicator.classList.remove('visible');
    this.progressBar.style.width = '0%';
    this.titleScreen.style.display = 'none';
    this.languageScreen.classList.remove('hidden');
    this.blobContainer.classList.remove('active');
    this.blobContainer.innerHTML = '';
    window.scrollTo({ top: 0 });
  }

  updateProgress() {
    const progress = Math.min((this.scenesVisited / this.totalScenes) * 100, 100);
    this.progressBar.style.width = progress + '%';
  }

  showToast(message) {
    this.toast.textContent = message;
    this.toast.classList.add('show');
    setTimeout(() => this.toast.classList.remove('show'), 2000);
  }
}

// --- Viva la Vida Canvas (WMC 2026 Styleguide) -----
class VivaCanvas {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.shapes = [];
    this.colors = ['#ffdd00','#1bafe6','#e73089','#59358b','#ff6e00','#289b38','#e30513'];
    this.resize();
    this.createShapes();
    this.animate();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createShapes() {
    const count = Math.floor((this.canvas.width * this.canvas.height) / 25000);
    for (let i = 0; i < count; i++) {
      const type = Math.random();
      this.shapes.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * 12 + 4,
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: (Math.random() - 0.5) * 0.15,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.005,
        color: this.colors[Math.floor(Math.random() * this.colors.length)],
        type: type < 0.4 ? 'circle' : type < 0.7 ? 'triangle' : 'rect',
        pulse: Math.random() * Math.PI * 2,
        opacity: Math.random() * 0.6 + 0.2
      });
    }
  }

  drawShape(s) {
    this.ctx.save();
    this.ctx.translate(s.x, s.y);
    this.ctx.rotate(s.rotation);
    this.ctx.globalAlpha = s.opacity * (0.6 + 0.4 * Math.sin(s.pulse));
    this.ctx.fillStyle = s.color;
    if (s.type === 'circle') {
      this.ctx.beginPath();
      this.ctx.arc(0, 0, s.size, 0, Math.PI * 2);
      this.ctx.fill();
    } else if (s.type === 'triangle') {
      this.ctx.beginPath();
      this.ctx.moveTo(0, -s.size);
      this.ctx.lineTo(s.size * 0.87, s.size * 0.5);
      this.ctx.lineTo(-s.size * 0.87, s.size * 0.5);
      this.ctx.closePath();
      this.ctx.fill();
    } else {
      this.ctx.fillRect(-s.size * 0.7, -s.size * 0.7, s.size * 1.4, s.size * 1.4);
    }
    this.ctx.restore();
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.shapes.forEach(s => {
      s.x += s.speedX;
      s.y += s.speedY;
      s.rotation += s.rotSpeed;
      s.pulse += 0.008;
      if (s.x < -20) s.x = this.canvas.width + 20;
      if (s.x > this.canvas.width + 20) s.x = -20;
      if (s.y < -20) s.y = this.canvas.height + 20;
      if (s.y > this.canvas.height + 20) s.y = -20;
      this.drawShape(s);
    });
    requestAnimationFrame(() => this.animate());
  }
}

// --- Initialize ------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  const engine = new StoryEngine();
  engine.init();
  const vivaCanvas = document.getElementById('viva-canvas');
  if (vivaCanvas) new VivaCanvas(vivaCanvas);
});
