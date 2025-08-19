import { component$ } from '@builder.io/qwik';

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
