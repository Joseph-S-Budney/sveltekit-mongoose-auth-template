<script lang="ts">
    import "../app.pcss";
    import Header from "./Header.svelte";
</script>

<div class="container-fluid">
    <Header />
    <slot></slot>
</div>