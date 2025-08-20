import { useSignal, useVisibleTask$ } from '@builder.io/qwik';

export type supportedOS = 'Windows' | 'MacOS' | debianBasedOS;

export type debianBasedOS = 'Debian' | 'Mint' | 'Ubuntu' | 'Xubuntu';

export function getComputerInfo() {
	const os = useSignal<string | undefined>();
	const arch = useSignal<string | undefined>();

	// if you get a crap ton of errors here just ignore it, it works fine
	useVisibleTask$(() => {
		const ua =
			navigator.userAgentData && navigator.userAgentData.platform
				? navigator.userAgentData.platform
				: navigator.userAgent;

		os.value = ua.charAt(0).toUpperCase() + ua.slice(1);

		if (navigator.userAgentData && navigator.userAgentData.getHighEntropyValues) {
			navigator.userAgentData.getHighEntropyValues(['architecture']).then((ua: { architecture: string }) => {
				arch.value = ua.architecture;
			});
		}
	});

	return [os, arch];
}
