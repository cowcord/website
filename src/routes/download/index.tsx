import { component$, useVisibleTask$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import { Card } from '@comp/card';
import { getComputerInfo } from '@lib/utils/computer';

export interface DownloadPageParams {
	os?: string;
	arch?: string;
}

export default component$(() => {
	let [os, arch] = getComputerInfo();

	useVisibleTask$(() => {
		let params = new URLSearchParams(window.location.search);
		arch.value = params.get('arch') ?? arch.value;
		os.value = params.get('os') ?? os.value;
	});

	const tags = getReleaseTags().value;

	return (
		<div class="flex flex-col">
			<h1 class="text-bold mt-[10rem] ml-[10rem] text-4xl text-white" data-for-arch="x64">
				Download cowcord{os.value ? ` for ${os.value}` : ''}
			</h1>
			<Card
				title={`Download${os.value ? ` for ${os.value}${arch.value ? ` ${os.value === 'MacOS' ? 'Silicon' : arch.value}` : ''}` : ''}`}
				href=""
			/>
		</div>
	);
});

// download file format:
// https://github.com/cowcord/cowcord/releases/download/<tag name>/<file name>

const getReleaseTags = routeLoader$(async () => {
  const resp = await fetch('https://api.github.com/repos/cowcord/cowcord/tags');
  const data = await resp.json();
  return data.map((tag: { name: string }) => tag.name);
});
