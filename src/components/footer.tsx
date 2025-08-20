import { component$ } from '@builder.io/qwik';

export const Footer = component$(() => {
	return (
		<footer class="bg-muted text-muted-foreground/70 flex w-full justify-center py-4">
			<p class="text-sm">
				Discord is a trademark of Discord Inc. Cowcord is not affiliated with or endorsed by Discord Inc.
			</p>
		</footer>
	);
});
