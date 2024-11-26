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

const FloatingSearchBarContainer = styled.div`
  position: fixed;
  top: 20px;
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
  display: flex;
  flex-direction: column;
`;

const StyledFormControl = styled(Form.Control)`
  flex-grow: 1;
  border-radius: 4px;
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

  const {goTo, goBack} = useSheet();
  const {setTargetLocation} = useRouteMap();

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
        const { data } = await axios.post<LocationResponse[]>('/location/search', request, { headers: { 'Content-Type': 'application/json',}});
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
  }

  const onBlurHandler = () => {
    if (results.length > 0) return;
    setQuery("");
    setFocus(false);
    goBack();
  }

  const onClickSearchResult = (i: number) => {
    setFocus(false);
    const target = results[i];
    setTargetLocation(target);
    setQuery("");
    goTo(Mode.SEARCH_RESULT);
  }

  return (
    <FloatingSearchBarContainer>
      <Form className="d-flex" style={{ width: "100%" }} onSubmit={(e) => e.preventDefault()}>
        <StyledFormControl
          onFocus={onFocusHandler}
          onBlur={onBlurHandler}
          value={query}
          onChange={(e) => {setQuery(e.target.value)}}
          type="search"
          placeholder="장소 검색"
          aria-label="Search"
        />
      </Form>
      {
        focus
        ?
        results.length > 0 ?
        <SearchResult>
          <ListGroup>
            {results.map((e, i) => (
              <ListGroup.Item action onClick={() => onClickSearchResult(i)} key={i}>
                <CategoryEmojiUtil  type={e.type}/>
                {` ${e.name}`}
              </ListGroup.Item>
            ))}
          </ListGroup>  
        </SearchResult>
        :
        <NoSearchResult>
          <p>
            검색 결과가 없습니다.
          </p>
          <small>
            장소 이름을 입력하세요.
          </small>
        </NoSearchResult>
        :
        <></>
      }
      
    </FloatingSearchBarContainer>
  );
};

export default SearchBar;