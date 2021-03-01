<script>
import { createEventDispatcher } from "svelte";

  import { normalizeName } from "../helpers";
  import Instrument from "../instrument";

  import { currentSoundFont, instrumentSets, ac, activeSet } from "../stores";

  export let availableInstruments = [];

  export const reloadInstrumentList = () => {
      getInstruments();
  }

  const getInstruments = async () => {
    try {
      let data = await fetch(
        `https://gleitz.github.io/midi-js-soundfonts/${$currentSoundFont}/names.json`
      );
      availableInstruments = await data.json();
    } catch (error) {
      // window.popToast("Error loading instruments: " + error.message);
      console.log("Error loading instruments: " + error.message);
    }
  };

  getInstruments();

  const denormalizeInstrumentName = (input) => {
    input = input.replace(/ /g, "_");
    return input.charAt(0).toLowerCase() + input.slice(1);
  };

  let dispatch = createEventDispatcher();
 

  const addInstrument = (selectedInstrument) => {
    if (selectedInstrument == null) return;

    dispatch("instrumentadd", {
      name: selectedInstrument
    });

   
  };

  const handleKeyPress = (event) => {
    event.preventDefault();
    const pickedInstrument = denormalizeInstrumentName(event.target.value);
    if (availableInstruments.includes(pickedInstrument)) {
      addInstrument(pickedInstrument);
    }
    event.target.value = "";
  };
</script>

<style>
  /* input {
    background: var(--black-key-color);
    color: var(--white-key-text);
    border: none;
    padding: 6px 8px;
    border-radius: var(--border-radius);
    width: 12rem;
    margin-bottom: 1rem;
    font-family: var(--font-family);
    margin-top: 0.5rem;
    margin-left: auto;
    margin-right: auto;
  } */
</style>

<input
  on:change={handleKeyPress}
  class="px-3 py-1.5 mx-auto text-sm bg-white shadow-2xl dark:bg-gray-800 border-0 rounded-lg"
  placeholder="Add instrument"
  list="instruments" />

<datalist id="instruments">
  {#each availableInstruments as instrument (instrument)}
    <option value={normalizeName(instrument)} />
  {/each}
</datalist>
