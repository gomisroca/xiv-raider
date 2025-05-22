'use client';

/**
 * Modal component that displays a dialog box with a backdrop. Uses react-dom's createPortal to render the modal in the background.
 *
 * @example
 * <Modal><h1>Hello, world!</h1></Modal>
 */

import { ComponentRef, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createPortal } from 'react-dom';
import { MdClear } from 'react-icons/md';
import Button from './button';
import { useAutoAnimate } from '@formkit/auto-animate/react';

export default function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<ComponentRef<'dialog'>>(null);
  const [parent] = useAutoAnimate();

  // Add overflow hidden to body when modal is open
  useEffect(() => {
    const body = document.body;
    if (dialogRef.current?.open) {
      body.classList.add('overflow-hidden');
    }

    return () => {
      body.classList.remove('overflow-hidden');
    };
  }, []);

  // Show the modal when the component is mounted
  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  // On dismiss, go back to the previous page, which will be the background page
  function onDismiss() {
    router.back();
  }

  return createPortal(
    <div
      className="absolute top-0 right-0 bottom-0 left-0 z-[1000] flex items-center justify-center bg-black/70"
      ref={parent}>
      <dialog
        ref={dialogRef}
        className="max-height-[500px] relative m-auto flex w-[80%] max-w-[500px] items-center justify-center rounded-lg bg-zinc-100 p-4 dark:bg-zinc-900"
        onClose={onDismiss}>
        {children}
        <Button name="Close" onClick={onDismiss} className="absolute top-[10px] right-[10px]">
          <MdClear />
        </Button>
      </dialog>
    </div>,
    document.getElementById('modal-root')!
  );
}
