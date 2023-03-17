import { CampaignCard } from "@components/CampaignCard";
import {
  AdjustmentsHorizontalIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { useMediaQuery } from "@hooks/useMediaQueries";
import { CampaignLayout } from "@layouts/index";
import React from "react";
import { renderToString } from "react-dom/server";
import algoliasearch from "algoliasearch/lite";
import {
  useHits,
  UseHitsProps,
  useRefinementList,
  UseRefinementListProps,
  InstantSearch,
  InstantSearchServerState,
  InstantSearchSSRProvider,
} from "react-instantsearch-hooks-web";
import { history } from "instantsearch.js/es/lib/routers/index.js";
import { UiState } from "instantsearch.js/es/types";
import { getServerState } from "react-instantsearch-hooks-server";
import { Accordion, mediaString, Button, Text } from "ui";
import { SearchInput } from "../../components/InstantSearch";
import { useRouter } from "next/compat/router";
import { v4 as uuidv4 } from "uuid";

type FindCampaignsProps = {
  serverState?: InstantSearchServerState;
  url?: string;
};

function CardGrid(props: UseHitsProps) {
  const { hits } = useHits(props);
  return (
    <div className="grid justify-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {hits?.map((campaign: any) => (
        <div style={{ maxWidth: "275px" }} key={campaign.id}>
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
          {itemState || items?.length > 0 ? (
            <PlusIcon className="h-5 w-5" />
          ) : (
            <MinusIcon className="h-5 w-5" />
          )}
        </legend>
      </Accordion.Trigger>
      {items.map(({ label, value, count, isRefined }) => (
        <Accordion.Content>
          <div
            className="flex flex-row gap-1 cursor-pointer text-white hover:outline-none"
            key={value}
          >
            <input
              type="checkbox"
              onChange={onChange}
              value={value}
              checked={isRefined}
            />
            <label>{label}</label>
            <label>{count}</label>
          </div>
        </Accordion.Content>
      ))}
    </Accordion.Item>
  );
}

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_API_KEY
);

export async function getServerSideProps({ req }) {
  const protocol = req.headers.referer?.split("://")[0] || "https";
  const url = `${protocol}://${req.headers.host}${req.url}`;
  const serverState = await getServerState(<FindCampaignsPage url={url} />, {
    renderToString,
  });

  return {
    props: {
      serverState,
      url,
    },
  };
}

function useOutsideAlerter(ref, open, setOpen) {
  React.useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target) && open) {
        setOpen(!open);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, open, setOpen]);
}

interface QueryParametersProps {
  query: string;
  days: string[];
  gameSystem: string[];
  voipSystem: string[];
  virtualTable: string[];
}

export default function FindCampaignsPage({
  serverState,
  url,
}: FindCampaignsProps) {
  const nextRouter = useRouter();
  const isDesktop = useMediaQuery(mediaString.lg);
  const [open, setOpen] = React.useState(false);
  const wrapperRef = React.useRef(null);
  useOutsideAlerter(wrapperRef, open, setOpen);

  return (
    <InstantSearchSSRProvider {...serverState}>
      <InstantSearch
        key={nextRouter?.pathname}
        searchClient={searchClient}
        indexName="dev_campaigns"
        routing={{
          router: history({
            getLocation() {
              if (typeof window === "undefined") {
                return new URL(url) as unknown as Location;
              }

              return window.location;
            },
            // @ts-ignore
            parseURL({ qsModule, location }) {
              const pathnameMatches =
                location.pathname.match(/search\/(.*?)\/?$/);
              // const category = getCategoryName(pathnameMatches?.[1] || "");
              const {
                query = "",
                page,
                days = [],
                gameSystem = [],
                voipSystem = [],
                virtualTable = [],
              } = qsModule.parse(location.search.slice(1));

              // `qs` does not return an array when there's a single value.
              const allDays = Array.isArray(days)
                ? days
                : decodeURIComponent(days as string).split(",");

              const allGameSystem = Array.isArray(gameSystem)
                ? gameSystem
                : decodeURIComponent(gameSystem as string).split(",");
              const allVoipSystem = Array.isArray(voipSystem)
                ? voipSystem
                : decodeURIComponent(voipSystem as string).split(",");
              const allVirtualTable = Array.isArray(virtualTable)
                ? virtualTable
                : decodeURIComponent(virtualTable as string).split(",");

              return {
                query: decodeURIComponent(query as string),
                page,
                days: allDays.map((day) => decodeURIComponent(day)),
                gameSystem: allGameSystem.map((system) =>
                  decodeURIComponent(system)
                ),
                virtualTable: allVirtualTable.map((table) =>
                  decodeURIComponent(table)
                ),
                voipSystem: allVoipSystem.map((voip) =>
                  decodeURIComponent(voip)
                ),
              };
            },
            createURL({ qsModule, location, routeState }) {
              const { origin, pathname, hash } = location;

              const queryParameters: QueryParametersProps = {
                query: undefined,
                days: undefined,
                gameSystem: undefined,
                voipSystem: undefined,
                virtualTable: undefined,
              };
              if (routeState.query) {
                queryParameters.query = encodeURIComponent(routeState.query);
              }

              if (routeState.days?.length) {
                queryParameters.days = routeState.days.map(encodeURIComponent);
              }

              if (routeState.gameSystem?.length) {
                queryParameters.gameSystem =
                  routeState.gameSystem.map(encodeURIComponent);
              }

              if (routeState.voipSystem?.length) {
                queryParameters.voipSystem =
                  routeState.voipSystem.map(encodeURIComponent);
              }

              if (routeState.virtualTable?.length) {
                queryParameters.virtualTable =
                  routeState.virtualTable.map(encodeURIComponent);
              }

              const queryString = qsModule.stringify(queryParameters, {
                encode: true,
                arrayFormat: "comma",
                addQueryPrefix: true,
              });

              const encodedString = queryString // try and keep a human-friendly url, decode brackets
                .replace(/%5B/g, "[")
                .replace(/%5D/g, "]");

              const href = `${origin}${pathname}${encodedString}${hash}`;

              console.log("queryParameter: ", queryParameters);

              nextRouter.push(href, undefined, { shallow: true });

              return href;
            },
          }),
          stateMapping: {
            // @ts-ignore
            stateToRoute(uiState: UiState): IndexUiState {
              const indexUiState = uiState["dev_campaigns"] || {};
              console.log("indexUiState: ", indexUiState);
              return {
                query: indexUiState?.query,
                // page: indexUiState?.page,
                days:
                  indexUiState.refinementList &&
                  indexUiState.refinementList.days,
                gameSystem:
                  indexUiState.refinementList &&
                  indexUiState.refinementList.gameSystem,
                voipSystem:
                  indexUiState.refinementList &&
                  indexUiState.refinementList.voipSystem,
                virtualTable:
                  indexUiState.refinementList &&
                  indexUiState.refinementList.virtualTable,
              };
            },
            // @ts-ignore
            routeToState(routeState: IndexUiState): IndexUiState {
              console.log("routeState: ", routeState);
              return {
                ["dev_campaigns"]: {
                  query: routeState.query,
                  page: routeState.page,

                  refinementList: {
                    days: routeState.days,
                    gameSystem: routeState.gameSystem,
                    voipSystem: routeState.voipSystem,
                    virtualTable: routeState.virtualTable,
                  },
                },
              };
            },
          },
        }}
      >
        <Accordion.Root type="multiple">
          <div className="flex flex-col row-gap-8 lg:flex-row px-4">
            {isDesktop ? (
              <div className="w-80 my-16">
                <SearchInput />
                <Accordion.Root type="multiple">
                  <CustomRefinementList attribute="days" />
                  <CustomRefinementList attribute="gameSystem" />
                  <CustomRefinementList attribute="voipSystem" />
                  <CustomRefinementList attribute="virtualTable" />
                </Accordion.Root>
              </div>
            ) : (
              <div>
                <div className="flex flex-row items-center gap-4 mt-16">
                  <SearchInput />
                  <Button onClick={() => setOpen(!open)}>
                    <AdjustmentsHorizontalIcon className="w-6 h-6 text-black" />
                  </Button>
                </div>

                <div
                  ref={wrapperRef}
                  className={`algoliaSheet ${open ? "visible" : "invisible"} `}
                >
                  <div className="fixed bottom-0 left-0 w-full bg-brandLightBlack border border-brandYellow">
                    <CustomRefinementList attribute="days" />
                    <CustomRefinementList attribute="gameSystem" />
                    <CustomRefinementList attribute="voipSystem" />
                    <CustomRefinementList attribute="virtualTable" />
                  </div>
                </div>
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
        </Accordion.Root>
      </InstantSearch>
    </InstantSearchSSRProvider>
  );
}

export function VirtualFilters() {
  useRefinementList({ attribute: "days" });
  useRefinementList({ attribute: "gameSystem" });
  useRefinementList({ attribute: "voipSystem" });
  useRefinementList({ attribute: "virtualTable" });

  return null;
}

FindCampaignsPage.layoutProps = {
  meta: {
    title: "Find Campaign",
  },
  Layout: CampaignLayout,
};
