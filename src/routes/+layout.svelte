<script lang="ts">
    import "../app.pcss";
    import Header from "$partials/Header.svelte";
</script>

<div class="container-fluid">
    <Header />
    <slot></slot>
</div>