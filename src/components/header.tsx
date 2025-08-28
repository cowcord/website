import { component$, Size, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import { SiDiscord, SiGithub } from '@qwikest/icons/simpleicons';

const navLinks = [
	{ href: '/download', label: 'Download' },
	{ href: '/plugins', label: 'Plugins' },
	{ href: '/faq', label: 'FAQ' },
	{ href: 'https://ko-fi.com/not_a_cow', label: 'Donate' },
];

const Icons = (props: { size: Size; scrolled: boolean }) => (
	<div
		class={{
			'flex flex-row': true,
			'space-x-3': !props.scrolled,
			'space-x-2': props.scrolled,
		}}
	>
		<SiDiscord width={props.size} height={props.size} class="transition-all duration-300 hover:text-white/40" />
		<SiGithub width={props.size} height={props.size} class="transition-all duration-300 hover:text-white/40" />
	</div>
);

export const Header = component$(() => {
	const scrolled = useSignal(false);
	const isMobile = useSignal(false);

	useVisibleTask$(() => {
		isMobile.value = window.innerWidth < 728;

		const onScroll = () => {
			scrolled.value = window.scrollY > 67 /* tuff */ && !isMobile.value;
		};

		window.addEventListener('scroll', onScroll);
		return () => window.removeEventListener('scroll', onScroll);
	});

	const iconSize = scrolled.value ? 20 : (30 as Size);

	return (
		<header class="hidden justify-center md:flex">
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
					<a
						class={{
							'font-bold transition-all duration-300': true,
							'text-2xl': !scrolled.value,
							'text-lg': scrolled.value,
						}}
						href="/"
					>
						cowcord
					</a>
					<nav
						class={{
							'transition-all duration-300': true,
							'text-md -ml-10 space-x-6': !scrolled.value,
							'-ml-8 space-x-2 text-sm': scrolled.value,
						}}
					>
						{navLinks.map(({ href, label }) => (
							<a class="transition-all duration-300 hover:text-white/40" key={href} href={href}>
								{label}
							</a>
						))}
					</nav>
					<Icons size={iconSize} scrolled={scrolled.value} />
				</div>
			</div>
		</header>
	);
});
