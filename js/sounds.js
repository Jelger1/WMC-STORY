/* ============================================
   WMC Kerkrade 1951 — Sound Engine
   Scene-triggered ambient sound effects

   Alle geluiden: Freesound.org (CC-BY / CC0) &
                  Internet Archive (public domain LP)
   Credits:
     wekker   — joedeshon (CC0)             freesound.org/s/78562
     hoest    — joedeshon (CC0)             freesound.org/s/266019
     trein1   — crosbychris (CC-BY 3.0)    freesound.org/s/213080
     trein2   — kevp888 (CC-BY 4.0)        freesound.org/s/853771
     crowd    — kyles (CC0)                freesound.org/s/455659
     applaus  — LudwigMueller (CC-BY 4.0)  freesound.org/s/459162
     merel    — Cinetony (CC-BY 4.0)       freesound.org/s/565058
     blaas1   — kevp888 (CC-BY 4.0)        freesound.org/s/772213
     blaas2   — kevp888 (CC-BY 4.0)        freesound.org/s/738124
     blaas3   — kevp888 (CC-BY 4.0)        freesound.org/s/755187
     blaas4   — kevp888 (CC-BY 4.0)        freesound.org/s/737964
     blaas5   — kevp888 (CC-BY 4.0)        freesound.org/s/652446
     blaas6   — kevp888 (CC-BY 4.0)        freesound.org/s/653207
     -- pre-1950 composed marches (LP rip, public domain) --
     nl_taptoe   — Koninklijke Militaire Kapel   archive.org (Taptoe Mars)
     nl_festival — Koninklijke Militaire Kapel   archive.org (Festival Mars)
     nl_grenadier— Koninklijke Militaire Kapel   archive.org (Grenadier-Mars)
     nl_wilhelmus— Koninklijke Militaire Kapel   archive.org (Wilhelmus)
   ============================================ */

class SoundEngine {
  constructor() {
    this.activeAudios  = [];
    this.activeTimers  = [];
    this.enabled       = true;
    this.masterVolume  = 0.55;

    const _nl = 'https://archive.org/download/lp_i-remember-holland-volume-2_koninklijke-militaire-kapel-royal-military/disc1/';

    this.sounds = {
      wekker:      'https://freesound.org/data/previews/78/78562_1218676-lq.mp3',
      hoest:       'https://freesound.org/data/previews/266/266019_1218676-lq.mp3',
      trein1:      'https://freesound.org/data/previews/213/213080_706395-lq.mp3',
      trein2:      'https://freesound.org/data/previews/853/853771_9034501-lq.mp3',
      crowd:       'https://freesound.org/data/previews/455/455659_612689-lq.mp3',
      applaus:     'https://freesound.org/data/previews/459/459162_1442200-lq.mp3',
      merel:       'https://freesound.org/data/previews/565/565058_5985747-lq.mp3',
      // Blaasorkesten — 6 unieke veldopnames (modern, maar traditioneel repertoire)
      blaas1:      'https://freesound.org/data/previews/772/772213_9034501-lq.mp3',  // marching band outdoor Nanterre
      blaas2:      'https://freesound.org/data/previews/738/738124_9034501-lq.mp3',  // brass band public garden
      blaas3:      'https://freesound.org/data/previews/755/755187_9034501-lq.mp3',  // marching band Metzeral
      blaas4:      'https://freesound.org/data/previews/737/737964_9034501-lq.mp3',  // brass band garden 3rd
      blaas5:      'https://freesound.org/data/previews/652/652446_9034501-lq.mp3',  // marching band Dijon
      blaas6:      'https://freesound.org/data/previews/653/653207_9034501-lq.mp3',  // Swiss marching bands
      // Pre-1950 gecomponeerde marsen — Koninklijke Militaire Kapel (LP, public domain)
      nl_taptoe:    _nl + '02.02.%20Taptoe%20Mars.mp3',         // Taptoe Mars — ceremonieel
      nl_festival:  _nl + '02.03.%20Festival%20Mars.mp3',       // Festival Mars — feestelijk
      nl_grenadier: _nl + '01.04.%20Grenadaier-Mars.mp3',       // Grenadier-Mars — strak
      nl_wilhelmus: _nl + '02.06.%20Wilhelmus%20Van%20Nassouwe.mp3', // Wilhelmus — emotioneel
    };

    /*
      Scene → geluids-cues — GEEN enkel geluid herhaald:

        proloog       wekker + hoest
        ch1_cafe      crowd (achtergrond)
        ch1_schmitz   blaas4 (zacht — cornet & trompet improviseren)
        ch1_janssen   blaas2 (trompet voor de kinderen)
        ch1_frickley  trein1 (binaural Welsh stoomtrein)
        ch2_intro     trein2 (stoomtrein St-Valery)
        ch2_muziek    blaas1 + crowd (trombone start, anderen vallen in)
        ch2_stad      blaas3 (in de verte over de stad)
        ch3_traditie  nl_grenadier → nl_taptoe → applaus (strakke mars + taptoe + applaus)
        ch3_innovatie blaas5 → blaas6 → applaus (duet, dan zwellen instrumenten aan)
        epiloog       wekker (zacht echo) + merel
    */
    this.sceneSounds = {
      proloog: [
        { key: 'wekker', delay: 900,   volume: 0.80, maxDuration: 10000 },
        { key: 'hoest',  delay: 13000, volume: 0.55, maxDuration: 3500  },
      ],
      ch1_cafe: [
        { key: 'crowd',  delay: 600,   volume: 0.22, maxDuration: 16000 },
      ],
      ch1_schmitz: [
        { key: 'blaas4', delay: 5000,  volume: 0.28, maxDuration: 35000 },
      ],
      ch1_janssen: [
        { key: 'blaas2', delay: 4500,  volume: 0.25, maxDuration: 30000 },
      ],
      ch1_frickley: [
        { key: 'trein1', delay: 1200,  volume: 0.65, maxDuration: 28000 },
      ],
      ch2_intro: [
        { key: 'trein2', delay: 800,   volume: 0.60, maxDuration: 24000 },
      ],
      ch2_muziek: [
        { key: 'blaas1', delay: 2500,  volume: 0.55, maxDuration: 35000 },
        { key: 'crowd',  delay: 22000, volume: 0.35, maxDuration: 16000 },
      ],
      ch2_stad: [
        { key: 'blaas3', delay: 1000,  volume: 0.22, maxDuration: 25000 },
      ],
      // Traditie-finale: echte Grenadier-Mars (pre-1950), dan Taptoe, dan massaal applaus
      ch3_traditie: [
        { key: 'nl_grenadier', delay: 800,   volume: 0.55, maxDuration: 22000 },
        { key: 'nl_taptoe',    delay: 24000, volume: 0.48, maxDuration: 20000 },
        { key: 'applaus',      delay: 46000, volume: 0.82, maxDuration: 18000 },
      ],
      // Innovatie-finale: twee blaas-varianten wisselen, dan applaus
      ch3_innovatie: [
        { key: 'blaas5',  delay: 800,   volume: 0.48, maxDuration: 22000 },
        { key: 'blaas6',  delay: 22000, volume: 0.52, maxDuration: 20000 },
        { key: 'applaus', delay: 44000, volume: 0.82, maxDuration: 18000 },
      ],
      epiloog: [
        { key: 'wekker',     delay: 1800,  volume: 0.28, maxDuration: 5000  },
        { key: 'merel',      delay: 8000,  volume: 0.65, maxDuration: 35000 },
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
