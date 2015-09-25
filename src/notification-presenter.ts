// Copyright (c) 2015 Vadim Macagon
// MIT License, see LICENSE file for full terms.

import { Disposable } from 'event-kit';

/** Displays notifications to the user. */
export interface INotificationPresenter {
  /** Inform the user that an operation was completed successfully. */
  success(message: string): void;
  /** Display some useful information to the user. */
  info(message: string): void;
  /** Display a warning to the user. */
  warning(message: string): void;
  /** Inform the user that an error occurred. */
  error(message: string): void;
}
