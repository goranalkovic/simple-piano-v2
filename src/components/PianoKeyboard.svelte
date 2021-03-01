<script>
    import BlackKey from "./BlackKey.svelte";
    import WhiteKey from "./WhiteKey.svelte";
</script>

<div class="h-48 p-0 m-0 select-none piano-grid">
    <div class="white-keys flex space-x-0.5 w-max h-max">
        <WhiteKey keyId="20" />
        <WhiteKey keyId="65" />
        <WhiteKey keyId="83" />
        <WhiteKey keyId="68" />
        <WhiteKey keyId="70" />
        <WhiteKey keyId="71" />
        <WhiteKey keyId="72" />
        <WhiteKey keyId="74" />
        <WhiteKey keyId="75" />
        <WhiteKey keyId="76" />
        <WhiteKey keyId="186" />
        <WhiteKey keyId="222" />
        <WhiteKey keyId="220" />
        <WhiteKey keyId="13" />
    </div>
    <div class="black-keys mx-5 flex space-x-0.5">
        <BlackKey keyId={81} />
        <BlackKey keyId={87} />
        <BlackKey keyId={69} />
        <BlackKey dummy />
        <BlackKey keyId={84} />
        <BlackKey keyId={90} />
        <BlackKey dummy />
        <BlackKey keyId={73} />
        <BlackKey keyId={79} />
        <BlackKey keyId={80} />
        <BlackKey dummy />
        <BlackKey keyId={221} />
        <BlackKey keyId={8} />
    </div>
</div>

<style global>
    .piano-grid {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: auto auto;
    }

    .white-keys {
        grid-column: 1;
        grid-row: 1 / 2;
    }

    .black-keys {
        grid-column: 1;
        grid-row: 1;
    }
</style>