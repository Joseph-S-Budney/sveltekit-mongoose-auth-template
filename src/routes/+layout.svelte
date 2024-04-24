<script lang="ts">
    import "../app.pcss";
    import Header from "$partials/Header.svelte"
    export let data;
</script>

<div class="container-fluid">
    {#if data.user}
        <Header />
    {/if}
    <slot></slot>
</div>