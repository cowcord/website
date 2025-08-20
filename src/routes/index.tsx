import { component$ } from '@builder.io/qwik';
import { Card } from '@comp/card';
import { DownloadPageParams } from './download';
import { getComputerInfo } from '@lib/utils/computer';

export default component$(() => {
	const { os, arch } = getComputerInfo();

	const test: DownloadPageParams = {
		os: os.name,
		arch: arch.architecture,
	};

	const downloadParams = new URLSearchParams(Object.entries(test).filter(([_, v]) => v !== undefined));

	return (
		<div class="flex flex-col items-center">
			{/* todo: icon */}
			<h1 class="mt-[20rem] mb-5 text-3xl text-white">Robust Discord client</h1>
			<Card title={`Download for ${os.name}`} href={`/download?${downloadParams.toString()}`} />
		</div>
	);
});
