import { $, component$, useSignal } from '@builder.io/qwik';
import { LuChevronDown } from '@qwikest/icons/lucide';

export interface CardProps {
	emoji?: string;
	title: string;
	description?: string;
	href?: string;
}

export const Card = component$((props: CardProps) => {
	const Wrapper = props.href ? 'a' : 'div';

	return (
		<Wrapper
			href={props.href}
			class={{
				'bg-muted m-5 flex h-auto w-auto max-w-80 flex-col gap-y-3 rounded-lg px-5 py-3': true,
				'hover:bg-muted-variant/60': !!props.href,
			}}
		>
			{props.emoji ? <h1 class="-mb-1 text-4xl">{props.emoji}</h1> : null}
			<h1 class="text-muted-foreground text-xl">{props.title}</h1>
			{props.description ? <p class="text-muted-foreground/70">{props.description}</p> : null}
		</Wrapper>
	);
});

export interface CardDropdownProps {
	title: string;
	options: CardDropdownOptionsProps[];
}

export interface CardDropdownOptionsProps {
	name: string;
	/**
	 * href url or function
	 */
	onclick: ((e: MouseEvent) => void) | string;
}

export const CardDropdown = component$((props: CardDropdownProps) => {
	const isOpen = useSignal(false);

	const toggleDropdown = $(() => {
		isOpen.value = !isOpen.value;
	});

	return (
		<div class="relative m-5 inline-block w-fit max-w-90 whitespace-nowrap">
			<button
				class="bg-muted text-muted-foreground hover:bg-muted/80 flex items-center gap-x-2 rounded-lg px-5 py-3 text-xl"
				onClick$={toggleDropdown}
			>
				<span>{props.title}</span>
				<LuChevronDown
					class={{
						'text-2xl transition-transform duration-300': true,
						'rotate-180': isOpen.value,
						'rotate-0': !isOpen.value,
						'text-white': true,
					}}
				/>
			</button>

			{isOpen.value && (
				<div class="bg-muted absolute z-10 mt-2 w-full rounded-md p-2 shadow-lg">
					{props.options.map(({ name, onclick }) => (
						<a
							key={name.replaceAll(' ', '-')}
							href={typeof onclick === 'string' ? onclick : '#'}
							preventdefault:click={typeof onclick === 'function'}
							onClick$={typeof onclick === 'function' ? onclick : undefined}
							class="text-muted-foreground hover:bg-muted/60 block rounded px-4 py-2 text-sm transition hover:text-white"
						>
							{name}
						</a>
					))}
				</div>
			)}
		</div>
	);
});
