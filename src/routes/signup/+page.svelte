<script lang="ts">
    import { enhance } from "$app/forms";
    export let form;
</script>

<h1>Sign up</h1>
<form method="POST" use:enhance>
    {#if form?.message}
        <p>{form.message}</p>
    {/if}
    <label for="username">Username</label>
    <input name="username" id="username"/><br />
    <label for="password">Password</label>
    <input type="password" name="password" id="password"/><br />
    <button>Continue</button>
</form>