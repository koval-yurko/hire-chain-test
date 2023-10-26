import { UPDATE_PROFILE_TRPC_SCHEMA } from '@/lib/validation-schemas/profile';
import { procedure, router } from '@/server/trpc';

let profile = {
	username: 'yurii.kovalchuk',
	bio: 'Tech Lead (Node.js)',
	pfp: 'https://k9fchyazetkyltjo.public.blob.vercel-storage.com/photo-ECLfFWJXm1WP5h6UAFRu83RPYWoGw6.jpg'
}

const profileRouter = router({
	updateProfile: procedure.input(UPDATE_PROFILE_TRPC_SCHEMA).mutation(({ input }) => {
		profile = {
			...profile,
			...input,
		}
		return profile
	}),
	getProfile: procedure.query(async () => {
		return profile
	}),
});

export const appRouter = router({
	profile: profileRouter,
});

export type AppRouter = typeof appRouter;
