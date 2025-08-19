import { component$ } from "@builder.io/qwik";

export interface CardProps {
    emoji?: string,
    title: string,
    description?: string,
    href?: string,
}

export const Card = component$((props: CardProps) => {
    const Wrapper = props.href ? 'a' : 'div';

    return (
        <Wrapper href={props.href} class={{'h-auto w-auto flex bg-muted px-5 py-3 rounded-lg flex-col m-5 max-w-80 gap-y-3': true,
            'hover:bg-muted-variant/60': !!props.href
        }}>
            {props.emoji ? <h1 class='text-4xl -mb-1'>{props.emoji}</h1> : null}
            <h1 class='text-muted-foreground text-xl'>{props.title}</h1>
            {props.description ? <p class='text-muted-foreground/70'>{props.description}</p> : null}
        </Wrapper>
    );
});