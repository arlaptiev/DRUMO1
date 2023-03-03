class InfoPanel {
  
  show() {
    let state = {
      tempo: getRandomWeirdChar(),
      swing: getRandomWeirdChar(),
      temperature: getRandomWeirdChar()
    };

    // active instruments
    let instruments = mixer.channels.map(channel => {
      if (channel.keyPressed) {
        return channel.instrumentName.toLowerCase();
      }
    })
    let instrumentsStr = instruments.length > 0 ? instruments.join(' ') : '';

    // if drums are ready, show real values
    if (mixer.drumsReady) {
      state = getDrumState();
      state = {
        tempo: state.tempo.toFixed(1),
        swing: state.swing.toFixed(2),
        temperature: state.temperature.toFixed(2)
      }
    }

    document.querySelector('.drum-info').innerHTML = `${state.tempo} bpm ${state.swing} swing ${state.temperature} temp ${instrumentsStr}`;
  }
  
}

function getRandomWeirdChar() {
  weirdChars = "⨕⫸⪦ꕣ⊢⫷⋕⧔⩩⫻⩑⊝⪮⧈⫳⊓⨴⊦⧑⨳⧞⫿⊠⋃⧉⪥⫺⊔⫹⩇⊬⩂⪲⪵⪫⨯⪭⧝⪸⊍⩘⋉⊱⫢⊞⪯⨩⨹⊣⪱⪴⊨⧡⫻⫷";
  return weirdChars[Math.floor(Math.random() * weirdChars.length)];
}