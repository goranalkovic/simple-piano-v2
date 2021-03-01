<script>
    import Icon from "./Icon.svelte";

    export let icon = null;
    export let label = null;
    export let selected = false;
    export let padded = false;
    export let disabled = false;
</script>

<button
    {disabled}
    class:selected
    class:padded
    class="menu-item  w-full flex select-none items-center px-3 py-1.5 text-gray-900 dark:text-gray-300 transition bg-transparent hover:bg-ocean-500 hover:bg-opacity-80 dark:hover:bg-azure-500 dark:hover:bg-opacity-40 border-0 hover:text-white dark:hover:text-white rounded-none"
    on:click
>
    {#if icon}
        <Icon {icon} additionalClass="mr-3" />
    {/if}

    {#if label}
        <span>{@html label}</span>
    {/if}
</button>

<style global lang="postcss">
    .menu-item.selected {
        @apply bg-ocean-500 text-white dark:bg-azure-500 dark:text-white pointer-events-none;
    }

    .menu-item.padded {
        @apply pl-9.5;
    }

    :local(button:disabled) {
        @apply pointer-events-none text-gray-300 dark:text-gray-650;
    }
</style>
