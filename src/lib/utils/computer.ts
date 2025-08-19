import { useSignal, useVisibleTask$ } from '@builder.io/qwik';
import { UAParser } from 'ua-parser-js';

export function getComputerInfo() {
	const os = useSignal<{ name?: string; version?: string }>({});
	const arch = useSignal<{ architecture?: string }>({});

	useVisibleTask$(() => {
		const ua = new UAParser(window.navigator.userAgent);
		os.value = ua.getOS();
		arch.value = ua.getCPU();
	});

	return {
		os: { name: os.value.name, version: os.value.version },
		arch: { architecture: arch.value.architecture },
	};
}
