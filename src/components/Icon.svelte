<script>
    export let icon = null;
    export let additionalClass = null;
</script>

<style lang="postcss">
    :global(.icon) {
        @apply w-5 h-5;
    }
</style>

{#if icon}
    {@html icon.replace('<svg', `<svg class="icon ${additionalClass ?? ""}"`)}
{/if}

