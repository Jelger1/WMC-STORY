/* ============================================
   WMC Kerkrade 1951 — Story Engine
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

    this.titleScreen.style.display = 'none';
    this.storyScene.classList.add('active');
    this.chapterIndicator.classList.add('visible');

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
      // NO auto-scroll — user reads context above, then scrolls down to choices naturally

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
