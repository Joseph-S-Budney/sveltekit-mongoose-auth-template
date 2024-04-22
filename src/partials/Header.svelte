<script lang="ts">
    import { enhance } from "$app/forms";
    import { Button } from "$lib/components/ui/button";
</script>

<header>
<nav class="flex items-center space-x-4 lg:space-x-6">
    <a class="text-sm font-medium text-muted-foreground transition-colors hover:text-primary" href="/">Home</a>
    <a class="text-sm font-medium text-muted-foreground transition-colors hover:text-primary" href="/signup">Sign Up</a>
    <a class="text-sm font-medium text-muted-foreground transition-colors hover:text-primary" href="/signin">Sign In</a>

    <form method="POST" action="/signout" use:enhance>
        <Button variant="destructive">Sign Out</Button>
    </form>
</nav>
</header>

