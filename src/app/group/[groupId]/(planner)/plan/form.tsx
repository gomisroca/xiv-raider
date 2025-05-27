'use client';

import { messageAtom } from '@/atoms/message';
import { useRedirect } from '@/hooks/useRedirect';
import { toErrorMessage } from '@/utils/errors';
import { useSetAtom } from 'jotai';
import { useRef } from 'react';
import Form from 'next/form';
import SubmitButton from '@/app/_components/ui/submit-button';
import { updatePlan } from '@/actions/plans';
import { type Priority, type GroupPlan } from 'generated/prisma';
import { PlanPriorities } from '@/utils/enums';
import { type ActionReturn } from 'types';

export default function UpdatePlanForm({
  plan,
  groupId,
  modal = false,
}: {
  plan?: GroupPlan;
  groupId: string;
  modal?: boolean;
}) {
  const redirect = useRedirect();
  const setMessage = useSetAtom(messageAtom);

  const formRef = useRef<HTMLFormElement>(null);

  const formAction = async (formData: FormData) => {
    try {
      // Call the updatePlan action with the form data
      const data = {
        groupId,
        priority_1: formData.get('priority_1') as Priority,
        priority_2: formData.get('priority_2') as Priority,
        priority_3: formData.get('priority_3') as Priority,
        priority_4: formData.get('priority_4') as Priority,
      };

      const action: ActionReturn = await updatePlan(data);

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
        content: toErrorMessage(error, 'Failed to update group plan'),
        error: true,
      });
    }
  };

  return (
    <Form
      ref={formRef}
      action={async (formData) => formAction(formData)}
      className="flex flex-col items-center justify-center gap-2">
      <div className="flex items-center justify-center gap-2">
        <label>Priority #1</label>
        <select
          name="priority_1"
          defaultValue={plan?.priority_1 ?? undefined}
          className="rounded-lg border-2 border-zinc-400 bg-zinc-200 p-2 text-center focus:ring-2 focus:ring-sky-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:focus:ring-sky-700">
          {PlanPriorities.map((prio) => (
            <option key={prio} value={prio}>
              {prio}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center justify-center gap-2">
        <label>Priority #2</label>
        <select
          name="priority_2"
          defaultValue={plan?.priority_2 ?? undefined}
          className="rounded-lg border-2 border-zinc-400 bg-zinc-200 p-2 text-center focus:ring-2 focus:ring-sky-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:focus:ring-sky-700">
          {PlanPriorities.map((prio) => (
            <option key={prio} value={prio}>
              {prio}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center justify-center gap-2">
        <label>Priority #3</label>
        <select
          name="priority_3"
          defaultValue={plan?.priority_3 ?? undefined}
          className="rounded-lg border-2 border-zinc-400 bg-zinc-200 p-2 text-center focus:ring-2 focus:ring-sky-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:focus:ring-sky-700">
          {PlanPriorities.map((prio) => (
            <option key={prio} value={prio}>
              {prio}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center justify-center gap-2">
        <label>Priority #4</label>
        <select
          name="priority_4"
          defaultValue={plan?.priority_4 ?? undefined}
          className="rounded-lg border-2 border-zinc-400 bg-zinc-200 p-2 text-center focus:ring-2 focus:ring-sky-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:focus:ring-sky-700">
          {PlanPriorities.map((prio) => (
            <option key={prio} value={prio}>
              {prio}
            </option>
          ))}
        </select>
      </div>
      <SubmitButton baseText="Update Plan" pendingText="Updating..." />
    </Form>
  );
}
