import { MENU_DATA } from "@consts/menuLinks";
import { createUrqlClient } from "@utils/createUrqlClient";
import { signOut, useSession } from "next-auth/react";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { Menu } from "ui";
import { useMediaQuery } from "ui/src/hooks/useMediaQuery";
import { ILayoutProps } from ".";

const RootLayout: React.FC = ({ children, resetUrqlClient }: ILayoutProps) => {
  const { data: session } = useSession();
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 900px)");

  const handleSignOut = async () => {
    resetUrqlClient();
    await signOut({
      redirect: false,
      callbackUrl: "/auth/signin",
    });

    await router.push("/auth/signin");
  };
  return (
    <div>
      <Menu
        logo="/images/logotheinn.svg"
        menuLinks={isMobile ? MENU_DATA : MENU_DATA[0].children}
        session={session}
        signOut={handleSignOut}
      />
      <div className="">
        <main className="relative col-span-full">{children}</main>
        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(RootLayout);
