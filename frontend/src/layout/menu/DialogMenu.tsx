import { useEffect, useRef, SyntheticEvent, MouseEvent } from 'react';
import styled, { keyframes } from 'styled-components';

import { useMenuStore } from '../../store';

import Menu from './Menu';

const slideInUp = keyframes`
    from { transform: translateY(100%) }
`;

const Dialog = styled.dialog`
  padding: 0;
  border: none;
  width: 90%;
  border-radius: 0.5em;
  font-size: 1.25em;
  margin-bottom: 0;

  &::backdrop {
    background-color: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(1px);
  }

  &[open] {
    animation: ${slideInUp} 0.5s cubic-bezier(0.25, 0, 0.1, 1);
  }
`;

type Props = {};

const DialogMenu = (props: Props) => {
  const ref: any = useRef(null);
  const { open, setOpen } = useMenuStore();

  useEffect(() => {
    if (open) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [open]);

  // close the dialog if it unloads and the state is still open
  useEffect(() => {
    return () => {
      if (open) {
        ref.current?.close();
      }
    };
  }, []);

  // catch the ESC event and manually close the dialog otherwise the state would not change
  const onCancel = (e: SyntheticEvent<HTMLDialogElement>) => {
    e.preventDefault();
    setOpen(false);
  };

  // handle click events for the dialog
  const onClick = (e: MouseEvent<HTMLDialogElement>) => {
    if (open) {
      // close the dialog if a menu link or the backdrop was clicked
      const t = e.target;
      if (t instanceof HTMLDialogElement || t instanceof HTMLAnchorElement) {
        setOpen(false);
      }
    }
  };

  return (
    <Dialog onClick={onClick} onCancel={onCancel} ref={ref}>
      <Menu />
    </Dialog>
  );
};

export default DialogMenu;
