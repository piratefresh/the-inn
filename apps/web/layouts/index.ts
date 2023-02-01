export { default as RootLayout } from "./RootLayout";
export { AuthLayout } from "./AuthLayout";
export { default as CampaignLayout } from "./CampaignLayout";
export { default as UserPageLayout } from "./UserPageLayout";
export interface ILayoutProps {
  children: React.ReactNode;
  resetUrqlClient?: () => void;
}
