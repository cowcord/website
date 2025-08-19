import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import { Card } from '@comp/card';
import { UAParser } from 'ua-parser-js';

export default component$(() => {
	const os = useSignal<{ name?: string; version?: string }>({});
  	const arch = useSignal<{ architecture?: string }>({});

  useVisibleTask$(() => {
    const ua = new UAParser(window.navigator.userAgent);
    const osData = ua.getOS();
    const cpuData = ua.getCPU();

	os.value = { name: osData.name, version: osData.version };
    arch.value = { architecture: cpuData.architecture };
  });

	return (
		<div class="bg-background flex h-[1000px] w-screen flex-col items-center justify-center">
			<h1 class="text-white text-3xl mb-5">Imagine a world where Discord was good...</h1>
			<Card title={`Download for ${os.value.name}`} href={`/download?os=${os.value.name}&arch=${arch.value.architecture}`} />
		</div>
	);
});
