import React from "react";
import { useSearchBox, UseSearchBoxProps } from "react-instantsearch-hooks-web";
import { Input } from "ui";

interface SearchInputProps extends UseSearchBoxProps {
  searchAsYouType?: boolean;
}

// https://www.algolia.com/doc/api-reference/widgets/search-box/react-hooks/#hook-params
const queryHook = (query, search) => {
  search(query);
};

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ searchAsYouType, ...rest }, ref) => {
    const { query, refine, clear, isSearchStalled } = useSearchBox({
      queryHook,
    });
    const [inputValue, setInputValue] = React.useState(query);

    const onChange = React.useCallback(
      (event) => {
        const value = event.currentTarget.value;
        setInputValue(value);
        refine(value);
      },
      [refine]
    );

    const onClearInput = React.useCallback(() => {
      setInputValue("");
      clear();
    }, [clear]);

    return (
      <Input
        ref={ref}
        gold
        // isLoading={isSearchStalled}
        value={inputValue}
        onChange={onChange}
        // onClearInput={onClearInput}
        {...rest}
      />
    );
  }
);

SearchInput.displayName = "SearchInput";
