import { component$ } from '@builder.io/qwik';
import { Card } from '@comp/card';
import { getComputerInfo } from '@lib/utils/computer';

export default component$(() => {
	const [os, _arch] = getComputerInfo();

	return (
		<div class="flex flex-col items-center">
			{/* todo: icon */}
			<h1 class="mt-[20rem] mb-5 text-3xl text-white">Robust Discord client</h1>
			<Card title={`Download${os.value ? ` for ${os.value}` : ''}`} href="/download" />
		</div>
	);
});
