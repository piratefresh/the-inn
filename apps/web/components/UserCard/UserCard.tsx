import { GetUsersQuery } from "@generated/graphql";
import { formatDistance } from "date-fns";
import Image from "next/image";
import React from "react";
import { Avatar, Card, styled, Text } from "ui";

interface UserCardProps {
  user: GetUsersQuery["getUsers"]["edges"][0]["node"];
}

const StyledCard = styled(Card, {
  height: "100%",

  margin: "1rem 0rem",
  borderRadius: "$base",
  backgroundColor: "rgba(24, 24, 24, 1)",
});

export const UserCard = React.forwardRef<HTMLDivElement, UserCardProps>(
  ({ user }, ref) => {
    const fullName = `${user.firstName} ${user.lastName}`;
    const memberSince = formatDistance(new Date(user.createdAt), new Date(), {
      addSuffix: true,
    });

    const campaignsCount = user.memberships.length;
    return (
      <StyledCard ref={ref} background="dark">
        <div className="p-8">
          <div className="flex flex-row">
            <div className="mr-4">
              <Avatar name={fullName} imageUrl={user.imageUrl} />
            </div>

            <Text size="2xl" weight="bold" color="loContrast">
              {fullName}
            </Text>
          </div>
          <div className="my-4">
            <Text weight="bold" color="loContrast">
              Joined {memberSince}
            </Text>
            <Text weight="bold" color="loContrast">
              Been part of {campaignsCount} Campaigns
            </Text>
          </div>

          <div className="my-4">
            <Text color="loContrast">
              Started playing DnD in 1977 when elf and dwarf were classes, not
              races. 45 years as a play 44 as a DM Since the various lockdowns
              playing face to face became difficult so I came here. I favour
              RP-heavy games with dynamic combat. In other words, unless the AC
              is really obscure and the goblin has a 20 dex I tend to tell my
              players the AC, after all when you see a 14 miss and a 15 hit the
              cat is out of the bag. By knowing the AC you know if you hit or
              miss and can describe what happens rather than I roll 15 you hit
              roll damage 6 points ok next person, you roll you know you hit you
              say I slash the goblin across the face for 6 points. Happy to DM
              groups from their first game to very advanced. I will be running a
              mix of new modules and some old classics with a little homebrew
              thrown in for good measure
            </Text>
          </div>
        </div>
      </StyledCard>
    );
  }
);

UserCard.displayName = "UserCard";
