'use client';

import { messageAtom } from '@/atoms/message';
import { useRedirect } from '@/hooks/useRedirect';
import { toErrorMessage } from '@/utils/errors';
import { useSetAtom } from 'jotai';
import { useRef } from 'react';
import Form from 'next/form';
import SubmitButton from '@/app/_components/ui/submit-button';
import { createCharacter } from '@/actions/characters';
import { GearSlots, LootTypes, Jobs, GearStatuses } from '@/utils/enums';
import { useParams } from 'next/navigation';
import { GearSlot, type GearStatus, type LootType, type Job } from 'generated/prisma';
import { type ActionReturn } from 'types';
import { GearIcon } from '@/app/_components/ui/icons';

export default function CreateCharacterForm({ modal = false }: { modal?: boolean }) {
  const params = useParams<{ groupId: string }>();
  const { groupId } = params;

  const redirect = useRedirect();
  const setMessage = useSetAtom(messageAtom);

  const formRef = useRef<HTMLFormElement>(null);

  const formAction = async (formData: FormData) => {
    try {
      // Call the createCharacter action with the form data
      const data = {
        groupId,
        name: formData.get('name') as string,
        job: formData.get('job') as Job,
        gearPieces: Object.values(GearSlot).map((slot) => ({
          type: slot as GearSlot,
          lootType: formData.get(slot) as LootType,
          status: formData.get(slot + 'Status') as GearStatus,
        })),
      };

      const action: ActionReturn = await createCharacter(data);

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
        content: toErrorMessage(error, 'Failed to create character'),
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
        placeholder="My New Character"
        required
      />
      <select
        name="job"
        className="cursor-pointer rounded-lg border-2 border-zinc-400 bg-zinc-200 p-2 text-center focus:ring-2 focus:ring-sky-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:focus:ring-sky-700">
        {Jobs.map((job) => (
          <option key={job} value={job}>
            {job}
          </option>
        ))}
      </select>
      <section className="grid grid-cols-2 space-y-1 gap-x-4 p-4">
        {GearSlots.map((slot) => (
          <div key={slot} className="flex items-center justify-center gap-1 last:col-start-2">
            <label>
              <GearIcon gearSlot={slot} />
            </label>
            <select
              name={slot}
              className="cursor-pointer rounded-lg border-2 border-zinc-400 bg-zinc-200 p-2 text-center focus:ring-2 focus:ring-sky-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:focus:ring-sky-700">
              {LootTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <select
              name={slot + 'Status'}
              className="cursor-pointer rounded-lg border-2 border-zinc-400 bg-zinc-200 p-2 text-center focus:ring-2 focus:ring-sky-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:focus:ring-sky-700">
              {GearStatuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            <input type="hidden" value={slot} />
          </div>
        ))}
      </section>
      <SubmitButton baseText="Create Character" pendingText="Creating..." />
    </Form>
  );
}
