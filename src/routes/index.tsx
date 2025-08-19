import { component$ } from '@builder.io/qwik';

export default component$(() => {
	return (
		<div class="bg-background flex h-screen w-screen flex-col items-center justify-center">
			<h1 class="text-foreground text-6xl md:text-6xl">not a cow</h1>
		</div>
	);
});