import { Badge } from "react-bootstrap";
import { LocationType } from "../enums/location-type.enum";

export const CategoryTagUtil = ({ type }: { type: LocationType }) => {
  const getTag = (type: LocationType) => {
    switch (type) {
      case LocationType.BUILDING:
        return <Badge className="bg-primary">건물</Badge>;
      case LocationType.CAFE:
        return <Badge className="bg-primary">카페</Badge>;
      case LocationType.CAFETERIA:
        return <Badge className="bg-primary">학식당</Badge>;
      case LocationType.CONVENIENCE:
        return <Badge className="bg-primary">편의점</Badge>;
      case LocationType.RESTAURANT:
        return <Badge className="bg-primary">식당</Badge>;
      case LocationType.STORE:
        return <Badge className="bg-primary">상점</Badge>;
      default:
        return null;
    }
  };

  return <div>{getTag(type)}</div>;
};
