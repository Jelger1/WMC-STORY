/* ============================================
   WMC Kerkrade 1951 — Sound Engine
   Scene-triggered ambient sound effects

   Alle geluiden: Freesound.org (CC-BY / CC0)
   Credits:
     wekker   — joedeshon (CC0)             freesound.org/s/78562
     hoest    — joedeshon (CC0)              freesound.org/s/266019
     trein1   — crosbychris (CC-BY 3.0)     freesound.org/s/213080
     trein2   — kevp888 (CC-BY 4.0)         freesound.org/s/853771
     crowd    — kyles (CC0)                 freesound.org/s/455659
     applaus  — LudwigMueller (CC-BY 4.0)   freesound.org/s/459162
     merel    — Cinetony (CC-BY 4.0)        freesound.org/s/565058
     blaas1   — kevp888 (CC-BY 4.0)         freesound.org/s/772213
     blaas2   — kevp888 (CC-BY 4.0)         freesound.org/s/738124
     blaas3   — kevp888 (CC-BY 4.0)         freesound.org/s/755187
     blaas4   — kevp888 (CC-BY 4.0)         freesound.org/s/737964
   ============================================ */

class SoundEngine {
  constructor() {
    this.activeAudios  = [];
    this.activeTimers  = [];
    this.enabled       = true;
    this.masterVolume  = 0.55;   // overall loudness 0–1

    // Freesound low-quality preview MP3s — public CDN, no login needed
    this.sounds = {
      // Wekker: oude mechanische rinkelwekker (joedeshon, CC0 — freesound.org/s/78562)
      wekker:  'https://freesound.org/data/previews/78/78562_1218676-lq.mp3',
      // Hoest: droge mijnwerkershoest
      hoest:   'https://freesound.org/data/previews/266/266019_1218676-lq.mp3',
      // Twee verschillende stoomtreinen
      trein1:  'https://freesound.org/data/previews/213/213080_706395-lq.mp3',
      trein2:  'https://freesound.org/data/previews/853/853771_9034501-lq.mp3',
      // Publieksgeluiden
      crowd:   'https://freesound.org/data/previews/455/455659_612689-lq.mp3',
      applaus: 'https://freesound.org/data/previews/459/459162_1442200-lq.mp3',
      // Merel voor de epiloog
      merel:   'https://freesound.org/data/previews/565/565058_5985747-lq.mp3',
      // Blaasorkesten (4 varianten — kevp888, CC-BY 4.0)
      blaas1:  'https://freesound.org/data/previews/772/772213_9034501-lq.mp3',  // marching band outdoor
      blaas2:  'https://freesound.org/data/previews/738/738124_9034501-lq.mp3',  // brass band public garden
      blaas3:  'https://freesound.org/data/previews/755/755187_9034501-lq.mp3',  // marching band Metzeral
      blaas4:  'https://freesound.org/data/previews/737/737964_9034501-lq.mp3',  // brass band garden 3rd
    };

    /*
      Scene → geluids-cues
      Elk cue: { key, delay (ms), volume (0–1), maxDuration (ms) }

      Verhaal-arc:
        proloog       → wekker RINKELT + hoest = koude ochtend
        ch1_cafe      → café-geroezemoes op de achtergrond
        ch1_schmitz   → zacht blaasorkest (cornet + trompet improviseert)
        ch1_frickley  → stoomtrein rijdt binnen op het perron (trein1)
        ch2_intro     → stoomtrein in de verte (trein2 — ander geluid)
        ch2_muziek    → blaasorkest + publiek ontsteekt
        ch2_stad      → blaasorkest in de verte over de stad
        ch3_traditie  → blaasorkest march + massaal applaus
        ch3_innovatie → blaasorkest duet + massaal applaus
        epiloog       → zachte echo van de wekker + merel fluit
    */
    this.sceneSounds = {
      proloog: [
        { key: 'wekker', delay: 900,   volume: 0.80, maxDuration: 10000 },
        { key: 'hoest',  delay: 13000, volume: 0.55, maxDuration: 3500  },
      ],
      ch1_cafe: [
        { key: 'crowd',  delay: 600,   volume: 0.22, maxDuration: 16000 },
      ],
      // Schmitz-scène: vader haalt cornet van zolder, ze spelen samen
      ch1_schmitz: [
        { key: 'blaas4', delay: 5000,  volume: 0.30, maxDuration: 35000 },
      ],
      // Janssen-scène: Atkinson speelt trompet voor de kinderen
      ch1_janssen: [
        { key: 'blaas2', delay: 4500,  volume: 0.28, maxDuration: 30000 },
      ],
      ch1_frickley: [
        { key: 'trein1', delay: 1200,  volume: 0.65, maxDuration: 28000 },
      ],
      // Tweede trein-scène: ander geluid (stoom + fluitsignaal)
      ch2_intro: [
        { key: 'trein2', delay: 800,   volume: 0.60, maxDuration: 24000 },
      ],
      // Stationsplein: trombone speelt → muzikanten vallen in
      ch2_muziek: [
        { key: 'blaas1', delay: 2500,  volume: 0.55, maxDuration: 35000 },
        { key: 'crowd',  delay: 22000, volume: 0.35, maxDuration: 16000 },
      ],
      // Stad ontwaakt: blaasorkesten overal
      ch2_stad: [
        { key: 'blaas3', delay: 1000,  volume: 0.22, maxDuration: 25000 },
      ],
      // Finale: strakke mars → daverend applaus
      ch3_traditie: [
        { key: 'blaas1', delay: 500,   volume: 0.45, maxDuration: 20000 },
        { key: 'applaus', delay: 22000, volume: 0.80, maxDuration: 18000 },
      ],
      // Innovatie: duet improviseert → publiek staat op
      ch3_innovatie: [
        { key: 'blaas2', delay: 500,   volume: 0.45, maxDuration: 20000 },
        { key: 'applaus', delay: 20000, volume: 0.80, maxDuration: 18000 },
      ],
      epiloog: [
        { key: 'wekker', delay: 1800,  volume: 0.30, maxDuration: 5000  },
        { key: 'merel',  delay: 8000,  volume: 0.65, maxDuration: 35000 },
      ],
    };
  }

  // Speel alle cues voor een scène
  playScene(sceneId) {
    this.stopAll();
    if (!this.enabled) return;

    const cues = this.sceneSounds[sceneId];
    if (!cues) return;

    cues.forEach(cue => {
      const t = setTimeout(() => {
        this._play(cue.key, cue.volume, cue.maxDuration);
      }, cue.delay);
      this.activeTimers.push(t);
    });
  }

  // Intern: maak een Audio-object aan en speel het af
  _play(key, volume, maxDuration) {
    const url = this.sounds[key];
    if (!url) return;

    const audio = new Audio(url);
    audio.volume = Math.min(1, Math.max(0, volume * this.masterVolume / 0.55));
    audio.preload = 'auto';

    // Stop na maxDuration via fade-out
    if (maxDuration) {
      const stopT = setTimeout(() => this._fadeOut(audio), maxDuration);
      this.activeTimers.push(stopT);
    }

    // Afspelen — stil falen als browser autoplay blokkeert
    audio.play().catch(() => {});
    this.activeAudios.push(audio);
  }

  // Zacht uitfaden over ~1.5 s
  _fadeOut(audio, durationMs = 1500) {
    if (!audio || audio.paused) return;
    const steps  = 30;
    const stepMs = durationMs / steps;
    const stepVol = audio.volume / steps;
    let count = 0;
    const iv = setInterval(() => {
      count++;
      if (count >= steps || audio.paused) {
        clearInterval(iv);
        try { audio.pause(); audio.src = ''; } catch (e) {}
        return;
      }
      audio.volume = Math.max(0, audio.volume - stepVol);
    }, stepMs);
  }

  // Stop alles onmiddellijk
  stopAll() {
    this.activeTimers.forEach(t => clearTimeout(t));
    this.activeTimers = [];
    this.activeAudios.forEach(a => {
      try { a.pause(); a.src = ''; } catch (e) {}
    });
    this.activeAudios = [];
  }

  // In/uitschakelen via eventuele UI-knop
  setEnabled(val) {
    this.enabled = !!val;
    if (!this.enabled) this.stopAll();
  }
}
