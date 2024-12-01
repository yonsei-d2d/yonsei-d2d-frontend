import { Badge } from "react-bootstrap";
import { LocationType } from "../enums/location-type.enum";
import styled from "styled-components";


const Tag = styled.div`
  background-color: #79A8DD;
  color: white;
  padding: 0 10px;
  border-radius: 10px;
`

export const CategoryTagUtil = ({ type }: { type: LocationType }) => {
  const getTag = (type: LocationType) => {
    switch (type) {
      case LocationType.BUILDING:
        return <Tag><small>건물</small></Tag>;
      case LocationType.CAFE:
        return <Tag><small>카페</small></Tag>;
      case LocationType.CAFETERIA:
        return <Tag><small>학식당</small></Tag>;
      case LocationType.CONVENIENCE:
        return <Tag><small>편의점</small></Tag>;
      case LocationType.RESTAURANT:
        return <Tag><small>식당</small></Tag>;
      case LocationType.STORE:
        return <Tag><small>상점</small></Tag>;
      default:
        return <Tag><small>장소</small></Tag>;;
    }
  };

  return <div>{getTag(type)}</div>;
};
