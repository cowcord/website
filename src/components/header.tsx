import { component$, Size, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import { SiDiscord, SiGithub } from '@qwikest/icons/simpleicons';

export const Header = component$(() => {
	const scrolled = useSignal(false);

	useVisibleTask$(() => {
		const onScroll = () => {
			scrolled.value = window.scrollY > 67; // tuff
		};
		window.addEventListener('scroll', onScroll);
		return () => window.removeEventListener('scroll', onScroll);
	});

	const iconSize = scrolled.value ? 20 : (30 as Size);

	return (
		<header class="flex justify-center">
			<div
				class={{
					'text-muted-variant border-muted/20 fixed top-0 z-9999 bg-transparent backdrop-blur-xs transition-all duration-300':
						true,
					'w-full py-6': !scrolled.value,
					'text-muted-variant/70 my-1 w-1/2 rounded-lg border-2 py-1 shadow-md': scrolled.value,
				}}
			>
				<div
					class={{
						'mx-auto flex items-center justify-between transition-all duration-300': true,
						'max-w-6xl px-8': !scrolled.value,
						'max-w-4xl px-4': scrolled.value,
					}}
				>
					{/* will replace this text with a simple logo icon when i eventually make one */}
					<div
						class={{
							'font-bold transition-all duration-300': true,
							'text-2xl': !scrolled.value,
							'text-lg': scrolled.value,
						}}
					>
						cowcord
					</div>
					<nav
						class={{
							'space-x-6 transition-all duration-300': true,
							'text-md -ml-14': !scrolled.value,
							'-ml-12 text-sm': scrolled.value,
						}}
					>
						<a href="/download">Download</a>
						<a href="/plugins">Plugins</a>
						<a href="/faq">FAQ</a>
						<a href="/donate">Donate</a>
					</nav>
					<div class="flex flex-row space-x-2">
						<SiDiscord width={iconSize} height={iconSize} class="transition-all duration-300" />
						<SiGithub width={iconSize} height={iconSize} class="transition-all duration-300" />
					</div>
				</div>
			</div>
		</header>
	);
});
