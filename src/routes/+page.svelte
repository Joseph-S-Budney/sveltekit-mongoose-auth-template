<script lang="ts">
    import type { PageData } from './$types';
    export let data: PageData;
    import { enhance } from "$app/forms";
    import { Button } from "$lib/components/ui/button";
</script>

<h1 class="text-3xl">Welcome, { data.username }</h1>