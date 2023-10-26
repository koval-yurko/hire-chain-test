import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { UPDATE_PROFILE_FORM_SCHEMA } from '@/lib/validation-schemas/profile';
import { useUploadFile } from '@/lib/hooks/useUploadFile';
import { getDiff } from "@/lib/getDiff";
import { trpc } from "@/lib/trpc";

type Inputs = z.infer<typeof UPDATE_PROFILE_FORM_SCHEMA>;

export function ProfileForm() {
	const utils = trpc.useContext();
	const profile = trpc.profile.getProfile.useQuery();

	const uploadFileMutation = useUploadFile();
	const updateProfileMutation = trpc.profile.updateProfile.useMutation({
		onSuccess() {
			utils.profile.invalidate()
		},
	});

	const form = useForm<Inputs>({
		resolver: zodResolver(UPDATE_PROFILE_FORM_SCHEMA)
	});

	const { errors } = form.formState;
	const loading = uploadFileMutation.isLoading || updateProfileMutation.isLoading

	useEffect(() => {
		if (!profile.data) {
			return;
		}
		if (profile.data.username) {
			form.setValue('username', profile.data.username);
		}
		if (profile.data.bio) {
			form.setValue('bio', profile.data.bio);
		}
	}, [profile.data, form]);


	const updateProfile = form.handleSubmit(async (data) => {
		const { imageFile, ...rest } = data;
		let payload = getDiff(profile.data, rest);
		if (imageFile && imageFile[0]) {
			const pfp = await uploadFileMutation.mutate(imageFile[0]);
			if (pfp) {
				payload = payload || {};
				payload.pfp = pfp;
			}
		}
		if (payload) {
			await updateProfileMutation.mutate(payload);
			form.setValue('imageFile', undefined);
		}
	});

	return (
		<Form {...form}>
			<form
				onSubmit={updateProfile}
				className='space-y-8 max-w-md w-full border rounded-md px-8 py-10'
			>
				<h2 className='text-xl'>Profile form</h2>

				<div>
					<Label htmlFor="username">Username</Label>
					<Input id="username" {...form.register('username')} />
					{errors.username && <div className="text-sm text-red-600">{ errors.username.message }</div>}
				</div>

				<div>
					<Label htmlFor="photo">Avatar file</Label>
					<Input id="imageFile" type="file" {...form.register('imageFile')} />
					{errors.imageFile && <div className="text-sm text-red-600">{ errors.imageFile.message }</div>}
				</div>

				<div>
					<Label htmlFor="bio">Bio</Label>
					<Textarea id="bio" {...form.register('bio')} />
					{errors.bio && <div className="text-sm text-red-600">{ errors.bio.message }</div>}
				</div>

				{uploadFileMutation.error && <p className="text-sm text-red-600">Upload Image error</p>}
				{updateProfileMutation.error && <p className="text-sm text-red-600">Update Profile error</p>}

				<Button type='submit' disabled={loading}>Update Profile</Button>
			</form>
		</Form>
	);
}
