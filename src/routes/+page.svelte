<script lang="ts">
    import { enhance } from "$app/forms";
    export let data;
</script>

<h1>Welcome, { data.username }</h1>
<a href="/signup">Sign Up</a>
<a href="/signin">Sign In</a>
<form method="POST" use:enhance>
    <button>Sign Out</button>
</form>