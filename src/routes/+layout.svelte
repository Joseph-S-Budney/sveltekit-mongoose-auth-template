<script lang="ts">
    import "../app.pcss";
    import { enhance } from "$app/forms";
</script>

<form method="POST" use:enhance>
    <button>Sign Out</button>
</form>

<slot></slot>