import React from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

// 이 함수는 upload와 detail에서 사용할 것
// detail 페이지에서는 setCustomValue를 못쓰게 하려고 옵셔널로 둔다.

interface KaKaoMapProps {
  latitude: number;
  longitude: number;
  setCustomValue?: (id: string, value: number) => void;
  detailPage?: boolean;
}

const KaKaoMap = ({
  latitude,
  longitude,
  setCustomValue,
  detailPage = false, // 상세페이지에서 사용하는지 여부
}: KaKaoMapProps) => {
  const handleClick = (mouseEvent: kakao.maps.event.MouseEvent) => {
    if (detailPage) return;

    setCustomValue!("latitude", mouseEvent.latLng.getLat());
    setCustomValue!("longitude", mouseEvent.latLng.getLng());
  };

  return (
    <Map
      center={{ lat: latitude, lng: longitude }}
      style={{ width: "100%", height: "360px" }}
      onClick={(_, mouseEvent) => handleClick(mouseEvent)}
    >
      <MapMarker position={{ lat: latitude, lng: longitude }}></MapMarker>
    </Map>
  );
};

export default KaKaoMap;
