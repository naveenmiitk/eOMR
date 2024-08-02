import * as React from "react";
import { Html } from "@react-email/html";
import { Button } from "@react-email/button";
import { render } from "@react-email/render";
import { Text } from "@react-email/components";

interface EmailProps {
  url: string;
}

export const Email: React.FC<Readonly<EmailProps>> = ({ url }) => {
  return (
    <Html lang="en">
        <Text>Hi Naveen,</Text>
        <Button href={url}>Click me</Button>
    </Html>
  );
};

export const emailHtml = render(<Email url="https://eomr.in" />);