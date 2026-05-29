"use client";

import { useTranslations } from "next-intl";

interface FormattedMessageProps {
  id: string;
  defaultMessage?: string;
  values?: Record<string, string | number | boolean | React.ReactNode>;
}

export function FormattedMessage({ id, defaultMessage, values }: FormattedMessageProps) {
  const t = useTranslations();
  const message = t(id, values as any);

  return <>{message ?? defaultMessage ?? id}</>;
}
