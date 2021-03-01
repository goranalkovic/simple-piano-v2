<script>
    import { onDestroy } from "svelte";
    import { displayPositions } from "../display-positions";

    const closeOnOutsideClick = ({ target }) => {
        if (!currentContainer.contains(target)) isOpen = false;
    };

    export const open = () => {
        isOpen = true;

        window.addEventListener("click", closeOnOutsideClick);
    };
    export const close = () => {
        isOpen = false;
        window.removeEventListener("click", closeOnOutsideClick);
    };

    let isOpen = false;
    let currentContainer;

    export let position = displayPositions.topRight;
    export let title = null;
    export let fullwidth = false;

    onDestroy(() => window.removeEventListener("click", closeOnOutsideClick));
</script>

<div
    class="m-0 p-0 relative inline-block {fullwidth ? 'w-full' : 'w-auto'}"
    bind:this={currentContainer}
>
    <slot />

    <div
        class:open={isOpen}
        class="shadow-lg border border-gray-150 dark:border-gray-800 z-20 mx-6 my-3 context-menu-options w-48 space-y-2 backdrop-blur-saturate  opacity-0  transition duration-200  scale-0 group-hover:scale-100 py-2 px-0 rounded-lg absolute text-xs transform dark:bg-gray-800 bg-gray-100 text-black dark:text-white  bg-opacity-60 dark:bg-opacity-60 {position}"
    >
        {#if title}<span>{title}</span>{/if}
        {#if isOpen}
         <slot name="menu-items" />
        {/if}
    </div>
</div>

<style global lang="postcss">
    .context-menu-options.open {
        @apply opacity-100 scale-100;
    }
</style>
