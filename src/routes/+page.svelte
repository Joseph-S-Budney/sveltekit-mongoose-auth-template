<script lang="ts">
    import type { PageData } from './$types';
    export let data: PageData;
</script>

<h1 class="text-3xl">Welcome, { data.username }</h1>