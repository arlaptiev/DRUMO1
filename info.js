class InfoPanel {
  
  show() {
    let state = {
      tempo: getRandomWeirdChar(),
      swing: getRandomWeirdChar(),
      temperature: getRandomWeirdChar()
    };
    let instrument = DRUM_CLASSES[controller.defaultInstrument - 1].toLowerCase()

    // if drums are ready, show real values
    if (window['drumsReady']) {
      state = getDrumState();
      state = {
        tempo: state.tempo.toFixed(1),
        swing: state.swing.toFixed(2),
        temperature: state.temperature.toFixed(2)
      }
    }

    document.querySelector('.drum-info').innerHTML = `${state.tempo} bpm ${state.swing} swing ${state.temperature} temp ${instrument}`;
  }
  
}

function getRandomWeirdChar() {
  weirdChars = "⨕⫸⪦ꕣ⊢⫷⋕⧔⩩⫻⩑⊝⪮⧈⫳⊓⨴⊦⧑⨳⧞⫿⊠⋃⧉⪥⫺⊔⫹⩇⊬⩂⪲⪵⪫⨯⪭⧝⪸⊍⩘⋉⊱⫢⊞⪯⨩⨹⊣⪱⪴⊨⧡⫻⫷";
  return weirdChars[Math.floor(Math.random() * weirdChars.length)];
}