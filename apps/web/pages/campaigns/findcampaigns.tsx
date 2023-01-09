import { CampaignCard } from "@components/CampaignCard";
import {
  AdjustmentsHorizontalIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { useMediaQuery } from "@hooks/useMediaQueries";
import { CampaignLayout } from "@layouts/CampaignLayout";
import { Button } from "@mantine/core";
import { Cross2Icon } from "@radix-ui/react-icons";
import React from "react";
import {
  useHits,
  UseHitsProps,
  useRefinementList,
  UseRefinementListProps,
} from "react-instantsearch-hooks-web";
import {
  Accordion,
  Collapsible,
  Dialog,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRoot,
  DropdownMenuTrigger,
  mediaString,
  RadixDialog,
  Text,
} from "ui";
import { SearchInput } from "../../components/InstantSearch";

function CardGrid(props: UseHitsProps) {
  const { hits } = useHits(props);
  return (
    <div className="grid justify-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {hits?.map((campaign: any) => (
        <div style={{ maxWidth: "275px" }} key={campaign.title}>
          <CampaignCard campaign={campaign} />
        </div>
      ))}
    </div>
  );
}

function CustomRefinementList(props: UseRefinementListProps) {
  const { items, refine } = useRefinementList(props);
  const [value, setValue] = React.useState();
  const itemRef = React.useRef<HTMLDivElement>(null);

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    refine(e.currentTarget.value);
  };

  const itemState = itemRef.current?.dataset.state;

  return (
    <Accordion.Item
      className="my-4"
      value={props.attribute.replace(/([A-Z])/g, " $1").trim()}
      ref={itemRef}
    >
      <Accordion.Trigger className="w-full p-4 bg-brandYellow">
        <legend className="flex uppercase tracking-wide justify-between items-center">
          <Text color="hiContrast" size="xs" className="">
            {props.attribute.replace(/([A-Z])/g, " $1").trim()}
          </Text>
          {itemState ? (
            <PlusIcon className="h-5 w-5" />
          ) : (
            <MinusIcon className="h-5 w-5" />
          )}
        </legend>
      </Accordion.Trigger>
      {items.map(({ label, value, count }) => (
        <Accordion.Content>
          <div
            className="flex flex-row gap-1 cursor-pointer text-white hover:outline-none"
            key={value}
          >
            <input type="checkbox" onChange={onChange} value={value} />
            <label>{label}</label>
            <label>{count}</label>
          </div>
        </Accordion.Content>
      ))}
    </Accordion.Item>
  );
}

const FindCampaignsPage = () => {
  const isDesktop = useMediaQuery(mediaString.lg);
  const [open, setOpen] = React.useState(false);
  return (
    <div className="flex flex-col lg:flex-row px-4">
      {isDesktop ? (
        <div>
          <SearchInput />
          <CustomRefinementList attribute="days" />
          <CustomRefinementList attribute="gameSystem" />
          <CustomRefinementList attribute="voipSystem" />
          <CustomRefinementList attribute="virtualTable" />
        </div>
      ) : (
        <div>
          <SearchInput />
          <RadixDialog.Root open={open} onOpenChange={setOpen}>
            <RadixDialog.Trigger>
              <button>
                <AdjustmentsHorizontalIcon className="w-6 h-6 text-white" />
              </button>
            </RadixDialog.Trigger>
            <RadixDialog.Portal>
              <RadixDialog.Content
                forceMount={true}
                className="w-screen h-screen  bg-brandLightBlack fixed top-2/4 left-2/4 z-modal"
                style={{
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div className="h-screen w-screen">
                  <RadixDialog.Close asChild>
                    <div
                      className="flex justify-end items-center cursor-pointer py-2 px-4"
                      aria-label="Close"
                    >
                      <Cross2Icon className="w-5 h-5 text-white" />
                    </div>
                  </RadixDialog.Close>
                  <Accordion.Root type="multiple">
                    <CustomRefinementList attribute="days" />
                    <CustomRefinementList attribute="gameSystem" />
                    <CustomRefinementList attribute="voipSystem" />
                    <CustomRefinementList attribute="virtualTable" />
                  </Accordion.Root>
                </div>
                <RadixDialog.Close asChild></RadixDialog.Close>
              </RadixDialog.Content>
            </RadixDialog.Portal>
          </RadixDialog.Root>
        </div>
      )}

      <div className="lg:max-w-7xl mx-auto w-full">
        <Text
          as="h2"
          size="7xl"
          color="lightContrast"
          className="font-oldFenris my-16"
        >
          Campaigns
        </Text>
        <CardGrid />
      </div>
    </div>
  );
};

FindCampaignsPage.layoutProps = {
  meta: {
    title: "Find Campaign",
  },
  Layout: CampaignLayout,
};

export default FindCampaignsPage;
