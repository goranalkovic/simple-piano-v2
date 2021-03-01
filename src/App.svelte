<script>
  import Tailwind from "./Tailwind.svelte";
  import Button from "./components/Button.svelte";
  import { icons } from "./icons";
  import Slider from "./components/Slider.svelte";
  import {slide} from 'svelte/transition';

  import {
    keyCodes,
    keyNotes,
    activeSet,
    instrumentSets,
    keysDown,
    volume,
    octaveShift,
    currentSoundFont,
    ac,
    isFocused,
    showAdsr,
    editMode,
    theme,
    isReordering,
    tempShiftDown,
    tempShiftUp,
    chordMode,
    chordNotes,
    chords,
    defaultChords,
showVolOctSliders,
  } from "./stores.js";
  import Instrument from "./instrument";
  import { beforeUpdate, onMount } from "svelte";
  import PlayerUi from "./components/PlayerUi.svelte";
  import SetList from "./components/SetList.svelte";
  import { clamp, getRandomId } from "./helpers";

  const onKeyDown = (event) => {
    if ($editMode) return;

    event.preventDefault();
    event.stopPropagation();
    const { keyCode, altKey, shiftKey } = event;

    if ($keysDown[keyCode] === true) return;
    if (
      !Array.isArray(
        $instrumentSets.find((i) => i.id === $activeSet).instruments
      )
    )
      return;
    if (!Object.keys(keyCodes).includes(keyCode.toString())) return;

    window.focus();

    if (document.activeElement) {
      document.activeElement.blur();
    }

    const currentSet = $instrumentSets.find((i) => i.id === $activeSet);

    $tempShiftDown = altKey;
    $tempShiftUp = shiftKey;

    if (!currentSet.instruments) return;

    if ($chordMode) {
      const notesToPlay = chords[$chordNotes[keyCode]].map((k) => keyNotes[k]);

      currentSet.instruments.forEach((instrument) => {
        instrument.playNotes(notesToPlay, shiftKey, altKey);
      });
    } else {
      const noteToPlay = keyNotes[keyCode];
      currentSet.instruments.forEach((instrument) => {
        instrument.playNote(noteToPlay, shiftKey, altKey);
      });
    }

    $keysDown[keyCode] = true;
  };

  const onKeyUp = (event) => {
    if ($editMode) return;

    event.preventDefault();
    event.stopPropagation();
    const { keyCode, ctrlKey, shiftKey, altKey, key } = event;

    if (keyCode === 27) {
      $instrumentSets
      .find((i) => i.id === $activeSet)
      .instruments.map((instrument) => instrument.stopAll());
      return;
    }

    if (parseInt(key) >= 0 && parseInt(key) <= 9) {
      let newId = parseInt(key);
      if (newId - 1 < 0) {
        newId = 9;
      } else {
        newId -= 1;
      }

      const id = $instrumentSets[newId]?.id;
      if (id) {
        $activeSet = id;
      }
      return;
    }

    if (keyCode === 40) {
      if (ctrlKey) {
        $volume = clamp($volume - 5, 0, 100);
      } else if (shiftKey) {
        $volume = clamp($volume - 1, 0, 100);
      } else {
        $volume = clamp($volume - 10, 0, 100);
      }
      return;
    }

    if (keyCode === 38) {
      if (ctrlKey) {
        $volume = clamp($volume + 5, 0, 100);
      } else if (shiftKey) {
        $volume = clamp($volume + 1, 0, 100);
      } else {
        $volume = clamp($volume + 10, 0, 100);
      }
      return;
    }

    if (keyCode === 39) {
      if (ctrlKey) {
        $octaveShift = clamp($octaveShift + 0.5, -3, 3);
      } else if (shiftKey) {
        $octaveShift = 3;
      } else {
        $octaveShift = clamp($octaveShift + 1, -3, 3);
      }
      return;
    }

    if (keyCode === 37) {
      if (ctrlKey) {
        $octaveShift = clamp($octaveShift - 0.5, -3, 3);
      } else if (shiftKey) {
        $octaveShift = -3;
      } else {
        $octaveShift = clamp($octaveShift - 1, -3, 3);
      }
      return;
    }

    if (keyCode === 192) {
      $chordMode = !$chordMode;
      return;
    }

    if ($keysDown[keyCode] === false) return;
    if (
      !Array.isArray(
        $instrumentSets.find((i) => i.id === $activeSet).instruments
      )
    )
      return;
    if (!Object.keys(keyCodes).includes(keyCode.toString())) return;

    $tempShiftDown = altKey;
    $tempShiftUp = shiftKey;

    const currentSet = $instrumentSets.find((i) => i.id === $activeSet);

    if (!currentSet.instruments) return;

    if ($chordMode) {
      let notesToStop = chords[$chordNotes[keyCode]].map((k) => keyNotes[k]);

      currentSet.instruments.forEach((instrument) => {
        instrument.stopNotes(notesToStop);
      });
    } else {
      const noteToStop = keyNotes[keyCode];
      currentSet.instruments.forEach((instrument) => {
        instrument.stopNote(noteToStop);
      });
    }

    $keysDown[keyCode] = false;
  };

  const changeTheme = () => {
    if ($theme === 0) {
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        document.querySelector("html").classList.add("dark");
      } else {
        document.querySelector("html").classList.remove("dark");
      }
    } else if ($theme === 2) {
      document.querySelector("html").classList.add("dark");
    } else {
      document.querySelector("html").classList.remove("dark");
    }
  };

  const regenInstruments = () => {
    // Regenerate instrument sets
    for (const set of $instrumentSets) {
      let newInstruments = [];
      for (const instrument of set.instruments) {
        newInstruments = [
          ...newInstruments,
          new Instrument(
            instrument.name,
            instrument._volume,
            instrument.soundfont,
            instrument._octaveShift,
            instrument._absoluteVolume,
            instrument._adsr
          ),
        ];
      }

      set.instruments = newInstruments;
    }
  };

  beforeUpdate(() => {
    changeTheme();
  });

  onMount(() => {
    // Theme management
    changeTheme();

    if ($theme === 0) {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", () => changeTheme());
    }

    regenInstruments();
  });

 
</script>

<svelte:window
  on:keydown={onKeyDown}
  on:keyup={onKeyUp} />

<main class="grid w-full h-full grid-cols-1 grid-rows-2 p-10 m-auto space-y-4">
  <PlayerUi />


  <!-- <div class="flex flex-wrap items-center justify-center gap-2">
    <Button
      on:click={() => {
        instrumentSets.set([
          {
            id: getRandomId(),
            name: 'Set 1',
            instruments: [
              new Instrument('string_ensemble_1'),
              new Instrument('string_ensemble_2'),
            ],
          },
          {
            id: getRandomId(),
            name: 'Set 2',
            instruments: [
              new Instrument('acoustic_grand_piano'),
            ],
          },
        ]);

        regenInstruments();

        $activeSet = $instrumentSets[0].id;
      }}
      label="Set default instruments" />

  </div> -->

  <SetList />
</main>

<Tailwind />
