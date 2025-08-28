import { component$, useVisibleTask$ } from '@builder.io/qwik';
import { CardDropdown, CardDropdownOptionsProps } from '@comp/card';
import { getComputerInfo } from '@lib/utils/computer';
import { getReleases, GitHubRelease } from '@lib/utils/releases';

export { getReleases } from '@lib/utils/releases';

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

	const releases: GitHubRelease[] = getReleases().value;

	let options: CardDropdownOptionsProps[] = [];

	if (Array.isArray(releases)) {
		releases.map((r) => {
			options.push({
				name: r.tag_name,
				onclick: r.assets[0].url, // todo: get correct asset
			});
		});
	}

	return (
		<div class="flex flex-col">
			<h1 class="text-bold mt-[10rem] ml-[10rem] text-4xl text-white" data-for-arch="x64">
				Download cowcord{os.value ? ` for ${os.value}` : ''}
			</h1>
			<CardDropdown
				title={`Download${os.value ? ` for ${os.value}${arch.value ? ` ${os.value === 'MacOS' ? 'Silicon' : arch.value}` : ''}` : ''}`}
				options={options}
			/>
		</div>
	);
});
