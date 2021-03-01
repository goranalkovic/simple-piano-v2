<script>
  import { flip } from "svelte/animate";

  import { normalizeName } from "../helpers";
  import { icons } from "../icons";
  import Icon from "./Icon.svelte";
  import Tooltip from "./Tooltip.svelte";
  export let set;
  export let i;
  export let active = false;
  
  $: instrumentsToShow =
    set.instruments.length > 4 ? set.instruments.slice(0, 3) : set.instruments;

  let leftoverInstruments = "";

  if (set.instruments.length > 4) {
    const leftovers = [
      ...set.instruments.slice(3).map((instr) => normalizeName(instr.name)),
    ];
    const joinedLeftovers = [...leftovers].join(", ");
    leftoverInstruments = joinedLeftovers;
  }
</script>

<style global lang="postcss">
  .set-card.active {
    @apply border-ocean-500 dark:border-azure-400 pointer-events-none;
  }

  .set-card.active .set-name,
  .set-card.active .set-key-number {
    @apply text-ocean-500 dark:text-azure-400;
  }

  .set-card.active .set-key-number {
    @apply bg-ocean-100 bg-opacity-40 dark:bg-azure-400 dark:bg-opacity-10;
  }
</style>

<button
  on:click
  class:active
  class="flex flex-col flex-grow-0 flex-shrink-0 p-2 overflow-visible transition bg-white border rounded-md group border-gray-150 hover:border-gray-400 focus:outline-none set-card h-30 w-52 dark:border-gray-700 dark:hover:border-gray-500 focus:border-transparent dark:outline-none dark:focus:outline-none focus:ring-2 focus:ring-offset-4 dark:focus:ring-2 focus:ring-offset-white dark:focus:ring-offset-gray-800 focus:ring-opacity-30 dark:focus:ring-opacity-50 focus:ring-ocean-500 dark:focus:ring-azure-300 dark:bg-gray-800 bg-opacity-80 dark:bg-opacity-80 backdrop-blur-saturate"
  disabled={active}
  tabindex="0">
  <div
    class="flex items-center justify-between w-full h-5 space-x-2 pointer-events-auto select-none">
    <div class="flex items-center space-x-2">
      <span
        class="{i > 10 ? 'invisible' : ''} set-key-number flex items-center justify-center w-4 h-4.5 p-0 m-0 leading-none text-gray-500 border-0 rounded dark:text-gray-500 text-xxs transition-colors  tabular-nums bg-gray-100 dark:bg-gray-750">{i == 10 ? '0' : i}</span>
      <span
        class="p-0 m-0 mr-auto text-sm leading-none text-gray-700 transition-colors set-name dark:text-gray-100">{set.name}</span>
    </div>
    <Icon
      additionalClass="transition opacity-0 group-hover:opacity-100 text-gray-200 dark:text-gray-600"
      icon={icons.reorderLines} />
  </div>
  <div
    class="pointer-events-none flex flex-col ml-6 text-xs items-start overflow-y-hidden mt-0.5">
    {#if set.instruments.length < 1}
      <span
        class="text-gray-500 transition-colors select-none dark:text-gray-400">no
        instruments</span>
    {/if}

    {#each instrumentsToShow as instrument (instrument.id)}
      <span animate:flip
        class="text-gray-500 transition-colors select-none dark:text-gray-400">{normalizeName(instrument.name)}</span>
    {/each}
  </div>
  {#if set.instruments.length > 4}
    <Tooltip tooltip={leftoverInstruments}>
      <span
        class="ml-6 text-xs text-gray-400 transition-colors pointer-events-auto select-none hover:text-ocean-400 dark:hover:text-azure-400 dark:text-gray-500">{set.instruments.length - 3}
        more
        {set.instruments.length - 3 != 1 ? 'instruments' : 'instrument'}</span>
    </Tooltip>
  {/if}
</button>
