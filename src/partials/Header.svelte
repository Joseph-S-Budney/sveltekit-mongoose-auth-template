<script lang="ts">
    import { enhance } from "$app/forms";
    import { Button } from "$lib/components/ui/button";
</script>

<header>
<nav class="flex mx-8 justify-start">
    <Button class="mx-8" href="/signup">Sign Up</Button>
    <Button class="mx-8" href="/signin">Sign In</Button>
    <form method="POST" action="?/signout" use:enhance>
        <Button class="mx-8" variant="destructive">Sign Out</Button>
    </form>
</nav>
</header>