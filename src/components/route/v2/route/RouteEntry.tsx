import { ReactNode, useEffect, useState } from "react";
import {
  Dropdown,
  DropdownButton,
  Form,
  InputGroup,
  ListGroup,
} from "react-bootstrap";
import styled from "styled-components";
import { RouteType } from "../../../../enums/route-type.enum";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import { useRouteMap } from "../../../../contexts/MapContext";
import { SearchLocationRequest } from "../../../../interfaces/search-location-request.interface";
import axios from "axios";
import { LocationResponse } from "../../../../interfaces/location-response.interface";
import { CategoryEmojiUtil } from "../../../../utils/emoji-util";
import { useSheet } from "../../../../contexts/SheetContext";
import { Flag, GeoAlt } from "react-bootstrap-icons";

const RouteEntryWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: start;
  margin-bottom: 20px;
`;

const RouteForm = styled.div`
  width: 150px;
  display: flex;
  align-items: center;
`;

const IconWrapper = styled.div`
  font-size: 1.5em;
`;

const SearchResultListGroup = styled(ListGroup)`
  max-height: 200px;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
` as typeof ListGroup;

const SearchResult = styled.div`
  width: 100%;
  max-height: 600px;
`;

export const RouteEntry = ({
  target,
}: {
  target: "origin" | "destination";
}) => {
  const [currentType, setCurrentType] = useState(RouteType.ROOM);
  const { routeOrigin, routeDestination, setRouteOrigin, setRouteDestination } =
    useRouteMap();
  const [inputValue, setInputValue] = useState<string>("");
  const [searchResults, setSearchResults] = useState<LocationResponse[]>([]);
  const [debouncedQuery, setDebouncedQuery] = useState(inputValue);
  const [showResult, setShowResult] = useState(false);
  const { redrawSheet } = useSheet();

  useEffect(() => {
    resetRouteRequest();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(inputValue);
    }, 300); // 300ms 후에 적용

    return () => clearTimeout(timer);
  }, [inputValue]);

  useEffect(() => {
    redrawSheet();
  }, [searchResults]);

  useEffect(() => {
    if (debouncedQuery === "") {
      setSearchResults([]);
      return;
    }

    const fetchData = async () => {
      try {
        const request: SearchLocationRequest = { query: inputValue };
        const { data } = await axios.post<LocationResponse[]>(
          (process.env.REACT_APP_ENDPOINT || "") + "/location/search",
          request,
          { headers: { "Content-Type": "application/json" } }
        );
        if (!showResult) return;
        setSearchResults(data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    fetchData();
  }, [debouncedQuery]);

  const setRouteRequestByLocation = (i: number) => {
    const selected = { ...searchResults[i] };
    if (target === "origin") {
      setRouteOrigin({
        routeType: RouteType.LOCATION_ID,
        locationId: selected?.id,
      });
    } else {
      setRouteDestination({
        routeType: RouteType.LOCATION_ID,
        locationId: selected?.id,
      });
    }
    redrawSheet();
    setInputValue(selected.name);
    setSearchResults([]);
    setShowResult(false);
  };

  const setRouteRequestByRoom = (i: string) => {
    if (target === "origin") {
      setRouteOrigin({
        routeType: RouteType.ROOM,
        room: i,
      });
    } else {
      setRouteDestination({
        routeType: RouteType.ROOM,
        room: i,
      });
    }
  };

  const resetRouteRequest = () => {
    if (target === "origin") {
      setRouteOrigin(null);
    } else {
      setRouteDestination(null);
    }
  };

  const routeTypeToString = (type: RouteType) => {
    switch (type) {
      case RouteType.COORDINATES:
        return "현재 위치";
      case RouteType.LOCATION_ID:
        return "장소 검색";
      case RouteType.ROOM:
        return "강의실 이름";
    }
  };

  const searchLocation = (input: string) => {
    if (target === "origin" && routeOrigin != null) return;
    if (target === "destination" && routeDestination != null) return;
    setInputValue(input);
  };

  const DropdownGenerator = () => {
    return (
      <Dropdown>
        <Dropdown.Toggle
          style={{
            width: "120px",
            backgroundColor: "transparent",
            border: "0",
            color: "black",
          }}
        >
          {routeTypeToString(currentType)}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {Object.values(RouteType).map((e, i) => {
            if (e === RouteType.COORDINATES) return null;
            return (
              <Dropdown.Item
                style={{ border: "0" }}
                key={i}
                onClick={() => {
                  setInputValue("");
                  resetRouteRequest();
                  setCurrentType(e);
                }}
              >
                {routeTypeToString(RouteType[e])}
              </Dropdown.Item>
            );
          })}
        </Dropdown.Menu>
      </Dropdown>
    );
  };

  const FormGenerator = () => {
    switch (currentType) {
      case RouteType.ROOM:
        return (
          <Form.Control
            autoComplete="off"
            type="text"
            name={target}
            value={inputValue}
            style={{
              border: "0",
              borderRadius: "0",
              borderBottom: "1px solid gray",
            }}
            onChange={(e) => {
              setInputValue(e.target.value);
              setRouteRequestByRoom(e.target.value);
            }}
            placeholder="강의실 이름"
            required
          />
        );
      case RouteType.COORDINATES:
        return (
          <Form.Control
            autoComplete="off"
            disabled
            type="text"
            name={target}
            value={"현재 위치"}
            style={{
              border: "0",
              borderRadius: "0",
              borderBottom: "1px solid gray",
            }}
            placeholder="현재 위치"
            required
          />
        );
      case RouteType.LOCATION_ID:
        return (
          <div
            style={{
              display: "flex",
              width: "100%",
              flexDirection: "column",
            }}
          >
            <Form.Control
              autoComplete="off"
              type="text"
              name={target}
              value={inputValue}
              style={{
                border: "0",
                borderRadius: "0",
                borderBottom: "1px solid gray",
              }}
              onChange={(e) => {
                searchLocation(e.target.value);
              }}
              onFocus={() => {
                resetRouteRequest();
                setInputValue("");
                setShowResult(true);
              }}
              placeholder="장소 검색"
              required
            />
            {showResult ? (
              searchResults.length > 0 ? (
                <SearchResult>
                  <SearchResultListGroup>
                    {searchResults.map((e, i) => (
                      <ListGroup.Item
                        className="border-0"
                        action
                        onClick={() => setRouteRequestByLocation(i)}
                        key={i}
                      >
                        {highlightSearchResult(e.name)}
                      </ListGroup.Item>
                    ))}
                  </SearchResultListGroup>
                </SearchResult>
              ) : (
                <ListGroup></ListGroup>
              )
            ) : (
              <></>
            )}
          </div>
        );
    }
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
    <RouteEntryWrapper>
      <RouteForm>
        <IconWrapper>
          {target === "origin" ? (
            <GeoAlt color="#79A8DD"></GeoAlt>
          ) : (
            <Flag color="#79A8DD"></Flag>
          )}
        </IconWrapper>
        {DropdownGenerator()}
      </RouteForm>
      {FormGenerator()}
    </RouteEntryWrapper>
  );
};
