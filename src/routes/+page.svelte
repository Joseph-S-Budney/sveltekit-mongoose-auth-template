<script lang="ts">
    import { enhance } from "$app/forms";
</script>

<h1>Welcome to my Svelte app!</h1>
<a href="/signup">Sign Up</a>
<a href="/signin">Sign In</a>
<form method="POST" use:enhance>
    <button>Sign Out</button>
</form>