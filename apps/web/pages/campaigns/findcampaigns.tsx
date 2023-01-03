import { CampaignCard } from "@components/CampaignCard";
import { CampaignLayout } from "@layouts/CampaignLayout";
import {
  useHits,
  UseHitsProps,
  useRefinementList,
  UseRefinementListProps,
} from "react-instantsearch-hooks-web";
import { Text } from "ui";

function CardGrid(props: UseHitsProps) {
  const { hits } = useHits(props);
  return (
    <div className="grid grid-cols-4 gap-8">
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

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    refine(e.currentTarget.value);
  };

  return (
    <fieldset className="text-white">
      <legend className="capitalize my-2">
        <Text size="xs" color="lightContrast">
          {props.attribute.replace(/([A-Z])/g, " $1").trim()}
        </Text>
      </legend>
      {items.map(({ label, value, count }) => (
        <div className="flex flex-row gap-1" key={value}>
          <input type="checkbox" onChange={onChange} value={value} />
          <label>{label}</label>
          <label>{count}</label>
        </div>
      ))}
    </fieldset>
  );
}

const FindCampaignsPage = () => {
  return (
    <>
      <div>
        <CustomRefinementList attribute="days" />
        <CustomRefinementList attribute="gameSystem" />
        <CustomRefinementList attribute="voipSystem" />
        <CustomRefinementList attribute="virtualTable" />
      </div>
      <div className="max-w-7xl mx-auto">
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
    </>
  );
};

FindCampaignsPage.layoutProps = {
  meta: {
    title: "Find Campaign",
  },
  Layout: CampaignLayout,
};

export default FindCampaignsPage;