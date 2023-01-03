import { UserCard } from "@components/UserCard";
import { GetUsersQuery, useGetUsersQuery } from "@generated/graphql";
import React from "react";
import { Text, Button } from "ui";

const LIMIT = 8;

const useIntersectionObserver = (element: HTMLElement | null): boolean => {
  const [isIntersecting, setIsIntersecting] = React.useState<boolean>(false);
  const observer = React.useRef<IntersectionObserver | undefined>();

  const callback = React.useCallback(([entry]: IntersectionObserverEntry[]) => {
    setIsIntersecting(entry.isIntersecting);
  }, []);

  React.useEffect(() => {
    if (element) {
      observer.current = new IntersectionObserver(callback);

      observer.current.observe(element);
    }

    return () => {
      observer.current?.disconnect();
      observer.current = undefined;
    };
  }, [callback, element]);

  return isIntersecting;
};

const AllPage = () => {
  const [pageVariables, setPageVariables] = React.useState({
    after: null,
    first: LIMIT,
  });
  const [{ data, fetching, error }] = useGetUsersQuery({
    variables: {
      ...pageVariables,
    },
  });

  const [element, setElement] = React.useState<HTMLDivElement | null>(null);
  const isIntersecting = useIntersectionObserver(element);

  React.useEffect(() => {
    if (isIntersecting) {
      console.log("data.getUsers.cursor: ", data.getUsers);
      setPageVariables({
        ...pageVariables,
        after: data.getUsers.pageInfo.endCursor,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isIntersecting]);

  if (error) return <p className="center">Error: {error.message}</p>;

  return (
    <div className="max-w-7xl mx-auto">
      <Text>ALL USERS</Text>
      <div className="flex flex-1 flex-col overflow-auto mb-8">
        {data?.getUsers.edges.map(({ node }) => (
          <UserCard key={node.id} ref={setElement} user={node}></UserCard>
        ))}
      </div>

      {fetching && <li>Loading...</li>}

      {data?.getUsers.pageInfo.hasNextPage && (
        <Button
          onClick={() => {
            setPageVariables({
              first: LIMIT,
              after: data.getUsers.pageInfo.endCursor,
            });
          }}
        >
          load more
        </Button>
      )}
    </div>
  );
};

export default AllPage;
