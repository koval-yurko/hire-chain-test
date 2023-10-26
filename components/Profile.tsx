import { trpc } from '@/lib/trpc';
import { FC } from 'react';
import Image from 'next/image'

export const Profile: FC = () => {
	const query = trpc.profile.getProfile.useQuery();

	if (!query.data) {
		return null
	}

	return (
		<div className='space-y-8 max-w-md w-full border rounded-md px-8 py-10'>
			<h2 className='text-xl'>Profile Info</h2>
			<p>
				{query.data.pfp && <Image src={query.data.pfp} alt="photo" width="300" height="400" />}
			</p>
			<p>{query.data.bio}</p>
			<p>{query.data.username}</p>
		</div>
	);
};
