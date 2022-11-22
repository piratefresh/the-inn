import { Text, TextProps } from "./Text";

export const Header = ({
  size = "base",
  as = "h1",
  color = "loContrast",
  className,
  children,
}: TextProps) => (
  <Text as={as} size={size} color={color} className={className}>
    {children}
  </Text>
);
