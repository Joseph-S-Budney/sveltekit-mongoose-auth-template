<script lang="ts">
    import * as Form from "$lib/components/ui/form";
    import { Input } from "$lib/components/ui/input";
    import { formSchema, type FormSchema} from "$lib/utils/schema"
    import {
        type SuperValidated,
        type Infer,
        superForm,
    } from "sveltekit-superforms";
    import { zodClient } from "sveltekit-superforms/adapters";

    export let data: SuperValidated<Infer<FormSchema>>;

    const form = superForm(data, {
        validators: zodClient(formSchema),
    });

    const { form: formData, enhance } = form
</script>

<h1 class="text-3xl">Sign in</h1>
<form method="POST" use:enhance>
    <Form.Field {form} name="username">
        <Form.Control let:attrs>
            <Form.Label>Username</Form.Label>
            <Input {...attrs} bind:value={$formData.username} />
        </Form.Control>
        <Form.FormDescription>This is you username</Form.FormDescription>
        <Form.FieldErrors />
    </Form.Field>
    <Form.Field {form} name="password">
        <Form.Control let:attrs>
            <Form.Label>Password</Form.Label>
            <Input {...attrs} type="password" bind:value={$formData.password} />
        </Form.Control>
        <Form.FormDescription>This is you password</Form.FormDescription>
        <Form.FieldErrors />
    </Form.Field>
    <Form.Button>Submit</Form.Button>
</form>
<div class="text-center">
    <a class="text-sm font-medium text-muted-foreground transition-colors hover:text-primary" href="/signup">I don't have an account</a>
</div>