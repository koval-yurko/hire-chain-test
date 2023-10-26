import { withFileUpload, getConfig } from 'next-multiparty';
import { put } from '@vercel/blob';

export const config = getConfig();

const profilePictureUploadHandler = withFileUpload(async (req, res) => {
	const blob = await put(req.file.originalFilename, req.file.toStream(), {
		access: 'public',
	});

	return res.status(201).json({
		pfp: blob.url,
	});
});

export default profilePictureUploadHandler;
