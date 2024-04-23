<script>
    import { enhance } from "$app/forms";
    import { Button } from "$lib/components/ui/button";
</script>

<header>
    <nav class="flex items-center space-x-4 lg:space-x-6">
        <Button variant="link" href="/">Home</Button>
        <Button variant="link" href="/signup">Sign Up</Button>
        <Button variant="link" href="/signin">Sign In</Button>
    
        <form method="POST" action="?/signout" use:enhance>
            <Button type="submit" variant="destructive">Sign Out</Button>
        </form>
    </nav>
</header>