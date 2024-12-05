import { Form, ListGroup } from "react-bootstrap";
import styled from "styled-components";
import { useSheet } from "../../contexts/SheetContext";
import { Mode } from "../../enums/mode.enum";
import { useEffect, useState } from "react";
import { SearchLocationRequest } from "../../interfaces/search-location-request.interface";
import { LocationResponse } from "../../interfaces/location-response.interface";
import axios from "axios";
import { useRouteMap } from "../../contexts/MapContext";
import { CategoryEmojiUtil } from "../../utils/emoji-util";
import { Search } from "react-bootstrap-icons";
import MainIcon from "../../assets/images/icon2x.png";

const FloatingSearchBarContainer = styled.div<{ $hideSearchBar: boolean }>`
  position: fixed;
  top: calc(${(props) => (props.$hideSearchBar ? "-80px" : "20px")});
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  width: calc(100vw - 40px);
  max-width: 600px;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 10px 10px;
  display: flex;
  align-items: center;
  flex-direction: column;

  transition: top 0.3s ease-in-out;
`;

const SearchListGroup = styled(ListGroup)`
  max-height: 300px;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
` as typeof ListGroup;

const StyledFormControl = styled(Form.Control)`
  border: none;
  flex-grow: 1;
  border-radius: 4px;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1em;
  aspect-ratio: 1 / 1;
  width: auto;
  height: 100%;
  text-align: center;
  margin: 0 10px;
`;

const SearchForm = styled(Form)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SearchResult = styled.div`
  width: 100%;
  margin-top: 20px;
  max-height: 600px;
`;

const NoSearchResult = styled.div`
  margin-top: 20px;
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100px;
`;

const SearchBar = () => {
  const [focus, setFocus] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<LocationResponse[]>([]);
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  const { goTo, goBack, hideSearchBar } = useSheet();
  const { setTargetLocation } = useRouteMap();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300); // 300ms 후에 적용

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (debouncedQuery === "") {
      setResults([]);
      return;
    }

    const fetchData = async () => {
      try {
        const request: SearchLocationRequest = { query };
        const { data } = await axios.post<LocationResponse[]>(
          (process.env.REACT_APP_ENDPOINT || "") + "/location/search",
          request,
          { headers: { "Content-Type": "application/json" } }
        );
        setResults(data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    fetchData();
  }, [debouncedQuery]);

  const onFocusHandler = () => {
    setFocus(true);
    goTo(Mode.SEARCH);
  };

  const onBlurHandler = () => {
    if (query.length > 0) return;
    setQuery("");
    setFocus(false);
    goBack();
  };

  const onClickSearchResult = (i: number) => {
    setFocus(false);
    const target = results[i];
    setTargetLocation(target);
    setQuery("");
    goTo(Mode.SEARCH_RESULT);
  };

  const highlightSearchResult = (text: string) => {
    const spl = text.split(debouncedQuery);
    const splS = spl.slice(0, -1);
    return (
      <>
        &nbsp;
        {splS.map((e, i) => {
          return (
            <span style={{ color: "gray" }} key={i}>
              <>{e}</>
              <strong style={{ color: "#003876" }}>{debouncedQuery}</strong>
            </span>
          );
        })}
        <span style={{ color: "gray" }}>{spl.at(-1)}</span>
      </>
    );
  };

  return (
    <FloatingSearchBarContainer $hideSearchBar={hideSearchBar}>
      <SearchForm
        className="d-flex"
        style={{ width: "100%" }}
        onSubmit={(e) => e.preventDefault()}
      >
        <img
          style={{
            aspectRatio: "1 / 1",
            objectFit: "contain",
            marginRight: "10px",
            height: "30px",
          }}
          src={MainIcon}
        />
        <StyledFormControl
          autoComplete="off"
          onFocus={onFocusHandler}
          onBlur={onBlurHandler}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          style={{
            color: "#003876 !important",
          }}
          type="search"
          placeholder="장소 검색"
          aria-label="Search"
        />
        <IconWrapper>
          <Search color="#003876"></Search>
        </IconWrapper>
      </SearchForm>
      {focus ? (
        results.length > 0 ? (
          <SearchResult>
            <SearchListGroup>
              {results.map((e, i) => (
                <ListGroup.Item
                  className="border-0"
                  action
                  onClick={() => onClickSearchResult(i)}
                  key={i}
                >
                  {highlightSearchResult(e.name)}
                </ListGroup.Item>
              ))}
            </SearchListGroup>
          </SearchResult>
        ) : (
          <NoSearchResult>
            <p>검색 결과가 없습니다.</p>
            <small>장소 이름을 입력하세요.</small>
          </NoSearchResult>
        )
      ) : (
        <></>
      )}
    </FloatingSearchBarContainer>
  );
};

export default SearchBar;
