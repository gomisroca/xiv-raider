'use client';

import { messageAtom } from '@/atoms/message';
import { useRedirect } from '@/hooks/useRedirect';
import { toErrorMessage } from '@/utils/errors';
import { useSetAtom } from 'jotai';
import { useRef } from 'react';
import Form from 'next/form';
import SubmitButton from '@/app/_components/ui/submit-button';
import { type SelectGroup, type ActionReturn } from 'types';
import { updateGroup } from '@/actions/groups';

export default function UpdateGroupForm({ group, modal = false }: { group: SelectGroup; modal?: boolean }) {
  const redirect = useRedirect();
  const setMessage = useSetAtom(messageAtom);

  const formRef = useRef<HTMLFormElement>(null);

  const formAction = async (formData: FormData) => {
    try {
      // Call the createGroup action with the form data
      const action: ActionReturn = await updateGroup({
        id: group.id,
        name: formData.get('name') as string,
      });

      // Reset the form and set the message
      formRef.current?.reset();
      setMessage({
        content: action.message,
        error: action.error,
      });

      // If the action returns a redirect, redirect to the specified page
      if (action.redirect) redirect(modal, action.redirect);
    } catch (error) {
      setMessage({
        content: toErrorMessage(error, 'Failed to create group'),
        error: true,
      });
    }
  };

  return (
    <Form
      ref={formRef}
      action={async (formData) => formAction(formData)}
      className="flex flex-col items-center justify-center gap-2">
      <input
        className="rounded-lg border-2 border-zinc-400 bg-zinc-200 p-2 text-center focus:ring-2 focus:ring-sky-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:focus:ring-sky-700"
        type="text"
        name="name"
        defaultValue={group.name}
        placeholder="My Group"
        required
      />
      <SubmitButton baseText="Update Group" pendingText="Updating..." />
    </Form>
  );
}
