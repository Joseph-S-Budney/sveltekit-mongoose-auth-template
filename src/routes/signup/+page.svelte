<script lang="ts">
    import * as Form from "$lib/components/ui/form";
    import { Button } from "$lib/components/ui/button";

    import { Input } from "$lib/components/ui/input";
    import { signupForm, type SignupSchema} from "$lib/utils/Schema"
    import {
        type SuperValidated,
        type Infer,
        superForm,
    } from "sveltekit-superforms";
    import { zodClient } from "sveltekit-superforms/adapters";

    export let data: SuperValidated<Infer<SignupSchema>>;

    const form = superForm(data, {
        validators: zodClient(signupForm),
        dataType: 'json'
    });

    const { form: formData, enhance } = form
</script>

<h1 class="text-3xl">Sign up</h1>
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
    <Form.Field {form} name="confirm_password">
        <Form.Control let:attrs>
            <Form.Label>Confirm Password</Form.Label>
            <Input {...attrs} type="password" bind:value={$formData.confirm_password} />
        </Form.Control>
        <Form.FormDescription>This is you password confirmation</Form.FormDescription>
        <Form.FieldErrors />
    </Form.Field>
    <Form.Button>Submit</Form.Button>
</form>
<div class="text-center">
    <Button variant="link" href="/signin">I already have an account</Button>
</div>