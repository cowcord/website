import { component$ } from '@builder.io/qwik';

export const Footer = component$(() => {
    return (
        <footer class='w-full bg-muted text-muted-foreground/70 flex justify-center py-4'>
            <p class='text-sm'>Discord is a trademark of Discord Inc. Cowcord is not affiliated with or endorsed by Discord Inc.</p>
        </footer>
    )
});