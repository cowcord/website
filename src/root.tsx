import { component$ } from '@builder.io/qwik';
import { QwikCityProvider, RouterOutlet } from '@builder.io/qwik-city';

import './root.css';

export default component$(() => {
	return (
		<QwikCityProvider>
			<head>
				<meta charset="utf-8" name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>cowcord</title>
				<link rel="icon" type="image/png" href="/favicon.png" />
			</head>
			<body lang="en">
				<RouterOutlet />
			</body>
		</QwikCityProvider>
	);
});
