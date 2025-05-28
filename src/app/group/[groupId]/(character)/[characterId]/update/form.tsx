'use client';

import { messageAtom } from '@/atoms/message';
import { useRedirect } from '@/hooks/useRedirect';
import { toErrorMessage } from '@/utils/errors';
import { useSetAtom } from 'jotai';
import { useRef } from 'react';
import Form from 'next/form';
import SubmitButton from '@/app/_components/ui/submit-button';
import { updateCharacter } from '@/actions/characters';
import { GearSlots, GearStatuses, GearStatusLabels, Jobs } from '@/utils/enums';
import { GearSlot, type GearStatus, type Job } from 'generated/prisma';
import { type ActionReturn, type ExtendedCharacter } from 'types';
import { GearIcon } from '@/utils/icons';

export default function UpdateCharacterForm({
  modal = false,
  character,
  groupId,
}: {
  modal?: boolean;
  character: ExtendedCharacter;
  groupId: string;
}) {
  const redirect = useRedirect();
  const setMessage = useSetAtom(messageAtom);

  const formRef = useRef<HTMLFormElement>(null);

  const formAction = async (formData: FormData) => {
    try {
      // Call the updateCharacter action with the form data
      const data = {
        id: character.id,
        groupId,
        name: formData.get('name') as string,
        job: formData.get('job') as Job,
        gearPieces: Object.values(GearSlot).map((slot) => ({
          type: slot as GearSlot,
          status: formData.get(slot) as GearStatus,
        })),
      };

      const action: ActionReturn = await updateCharacter(data);

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
        content: toErrorMessage(error, 'Failed to update character'),
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
        defaultValue={character.name}
        required
      />
      <select
        name="job"
        defaultValue={character.job}
        className="rounded-lg border-2 border-zinc-400 bg-zinc-200 p-2 text-center focus:ring-2 focus:ring-sky-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:focus:ring-sky-700">
        {Jobs.map((job) => (
          <option key={job} value={job}>
            {job}
          </option>
        ))}
      </select>
      {GearSlots.map((slot) => (
        <div key={slot} className="flex items-center justify-center gap-2">
          <label>
            <GearIcon gearSlot={slot} />
          </label>
          <select
            name={slot}
            defaultValue={character.gear.find((gear) => gear.type === slot)?.status}
            className="rounded-lg border-2 border-zinc-400 bg-zinc-200 p-2 text-center focus:ring-2 focus:ring-sky-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:focus:ring-sky-700">
            {GearStatuses.map((status) => (
              <option key={status} value={status}>
                {GearStatusLabels[status]}
              </option>
            ))}
          </select>
          <input type="hidden" value={slot} />
        </div>
      ))}
      <SubmitButton baseText="Update Character" pendingText="Updating..." />
    </Form>
  );
}
