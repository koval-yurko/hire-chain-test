import { z } from 'zod';

export const PROFILE_SCHEMA = z.object({
	username: z.string().min(8).max(24),
	bio: z.string().min(5).max(256),
	pfp: z.string(),
});

export const UPDATE_PROFILE_FORM_SCHEMA = PROFILE_SCHEMA.omit({
	pfp: true,
})
	.extend({
		// that will make sure this is of type File
		// and the file is less than 1mb in size
		imageFile: z.custom<FileList>((files: unknown) => {
			const file = (files as File[])[0]
			const fileSize = file?.size || 0;
			const isValidFile = file ? file instanceof File : true;
			const isValidSize = fileSize <= 1 * 1000 * 1000 // 1Mb
			return isValidFile && isValidSize
		}, "File is wrong")
	})
	.partial();

export const UPDATE_PROFILE_TRPC_SCHEMA = PROFILE_SCHEMA.partial();
