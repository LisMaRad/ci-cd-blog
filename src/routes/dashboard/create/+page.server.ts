import { fail, redirect } from '@sveltejs/kit'
import { superValidate } from 'sveltekit-superforms/server'
import { zod } from 'sveltekit-superforms/adapters'
import { marked } from 'marked'

import * as posts from '$lib/services/posts'
import { postSchema } from '$lib/zod/schema'

export const load = async () => {
	const form = await superValidate(zod(postSchema))
	return { form }
}

export const actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(postSchema))

		if (!form.valid) {
			return fail(400, { form })
		}

		try {
			const data = {
				...form.data,
				createdAt: new Date(),
				html: await marked.parse(form.data.markdown),
			}
			await posts.createPost(data)
		} catch (error) {
			return fail(400, { form })
		}

		throw redirect(300, '/dashboard')
	},
}
