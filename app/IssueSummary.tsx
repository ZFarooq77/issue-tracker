import { Status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";

import { Value } from "@radix-ui/themes/dist/esm/components/data-list.js";
import Link from "next/link";
import React from "react";
interface Props {
  open: number;
  in_progress: number;
  close: number;
}
const IssueSummary = ({ open, in_progress, close }: Props) => {
  const containers: {
    label: string;
    value: number;
    status: Status;
  }[] = [
    { label: "Open Issues", value: open, status: "OPEN" },
    { label: "close Issues", value: close, status: "CLOSE" },
    { label: "InProgress Issues", value: in_progress, status: "IN_PROGRESS" },
  ];
  return (
    <Flex gap="4">
      {containers.map((c) => (
        <Card key={c.label}>
          <Flex direction="column" gap="1">
            <Link
              className="text-sm font-medium"
              href={`/issues/list?status=${c.status}`}
            >
              {c.label}
            </Link>
            <Text size="5" className="font-bold">
              {c.value}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default IssueSummary;
