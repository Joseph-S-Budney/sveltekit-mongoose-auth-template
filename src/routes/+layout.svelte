<script lang="ts">
    import "../app.pcss";
    import Header from "./Header.svelte";
    export let data;
</script>

<div class="container-fluid">
    {#if data.user}
        <Header />
    {/if}
    <slot></slot>
</div>