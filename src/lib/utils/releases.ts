import { routeLoader$ } from '@builder.io/qwik-city';

export interface GitHubRelease {
	url: string;
	html_url: string;
	assets_url: string;
	upload_url: string;
	tarball_url: string | null;
	zipball_url: string | null;
	id: number;
	node_id: string;
	tag_name: string;
	target_commitish: string;
	name: string | null;
	body: string | null;
	draft: boolean;
	prerelease: boolean;
	immutable: boolean;
	created_at: string;
	published_at: string | null;
	updated_at: string | null;
	author: GitHubUser;
	assets: GitHubReleaseAsset[];
	body_html?: string;
	body_text?: string;
	mentions_count?: number;
	discussion_url?: string;
	reactions?: GitHubReactions;
}

export interface GitHubUser {
	name?: string | null;
	email?: string | null;
	login: string;
	id: number;
	node_id: string;
	avatar_url: string;
	gravatar_id: string | null;
	url: string;
	html_url: string;
	followers_url: string;
	following_url: string;
	gists_url: string;
	starred_url: string;
	subscriptions_url: string;
	organizations_url: string;
	repos_url: string;
	events_url: string;
	received_events_url: string;
	type: string;
	site_admin: boolean;
	starred_at?: string;
	user_view_type?: string;
}

export interface GitHubReleaseAsset {
	url: string;
	browser_download_url: string;
	id: number;
	node_id: string;
	name: string;
	label: string | null;
	state: 'uploaded' | 'open';
	content_type: string;
	size: number;
	digest: string | null;
	download_count: number;
	created_at: string;
	updated_at: string;
	uploader: GitHubUser | null;
}

export interface GitHubReactions {
	url: string;
	total_count: number;
	'+1': number;
	'-1': number;
	laugh: number;
	confused: number;
	heart: number;
	hooray: number;
	eyes: number;
	rocket: number;
}

const fetchReleases = async () => {
	const resp = await fetch('https://api.github.com/repos/cowcord/cowcord');
	const data: GitHubRelease[] = await resp.json();
	await Bun.write('./data/releases.json', JSON.stringify(data, null, 2));

	const writeData = await Bun.file('./data/writeData.json')
		.json()
		.catch(() => ({}));
	const test = { releases: Date.now(), ...writeData };
	await Bun.write('./data/writeData.json', JSON.stringify(test, null, 2));

	return data;
};

export const getReleases = routeLoader$(async () => {
	const writeData = await Bun.file('./data/writeData.json')
		.json()
		.catch(() => ({}));
	const lastReleaseFetch = writeData.releases;

	if (!lastReleaseFetch || lastReleaseFetch < Date.now() - 15 * 60 * 1000) {
		return await fetchReleases();
	}

	const releases: GitHubRelease[] = await Bun.file('./data/releases.json').json();
	return releases;
});
