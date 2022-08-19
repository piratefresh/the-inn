import { Text, TextProps } from "./Text";

const DEFAULT_TAG = "h1";
const DEFAULT_SIZE = "base";

export const Header = ({ size, as, children }: TextProps) => (
  <Text as={DEFAULT_TAG || as} size={DEFAULT_SIZE || size}>
    {children}
  </Text>
);
