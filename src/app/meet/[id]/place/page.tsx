'use client';
import Button from '@/components/Button';
import Modal from '@/components/Modal';
import { DisabledText, Emphasize, Text } from '@/components/Modal/modalTypography';
import PlaceDrawer from '@/features/meet/place/PlaceDrawer';
import PlaceInput from '@/features/meet/place/PlaceInput';
import PlaceUserLocation from '@/features/meet/place/PlaceUserLocation';
import useToggle from '@/lib/hooks/useToggle';
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const PlacePage = () => {
  const mapRef = useRef<naver.maps.Map | null>(null);
  const [isFocusSearch, toggleFocusSearch] = useToggle();
  const [isOpenModal, toggleOpenModal] = useToggle();
  const [isOpenConfirmModal, toggleOpenConfirmModal] = useToggle();

  useEffect(() => {
    const initMap = () => {
      const mapOptions = {
        center: new naver.maps.LatLng(37.3595704, 127.105399),
        zoom: 10,
      };

      const map = new naver.maps.Map('map', mapOptions);
      mapRef.current = map;

      new naver.maps.Marker({
        position: new naver.maps.LatLng(37.3595704, 127.105399),
        map: map,
        title: '마커표시',
        icon: {
          url: '/svgs/place/marker.svg',
          size: new naver.maps.Size(36, 39),
          origin: new naver.maps.Point(0, 0),
          anchor: new naver.maps.Point(16, 16),
        },
      });

      // 사용자의 현재 위치 표시
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const currentLocation = new naver.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude,
          );
          //   현위치마커표시
          //   new naver.maps.Marker({
          //     position: currentLocation,
          //     map: map,
          //     title: 'Your Location',
          //   });

          // 지도 첫 접속 시 사용자의 현 위치로 중심이 오도록 추가!
          map.setCenter(currentLocation);
        });
      }
    };

    if (window.naver && window.naver.maps) {
      initMap();
    } else {
      const mapScript = document.createElement('script');
      mapScript.onload = () => initMap();
      mapScript.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.REACT_APP_MAP_KEY}`;
      document.head.appendChild(mapScript);
    }
  }, []);

  const onClickUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const currentLocation = new naver.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude,
        );
        if (mapRef.current) {
          mapRef.current.setCenter(currentLocation);
        }
      });
    }
  };

  const onFocusSearch = () => {
    // 원하는 작업 실행 Input focused!
    toggleFocusSearch();
  };

  return (
    <>
      <Container>
        <PlaceInput isFocus={isFocusSearch} onFocus={onFocusSearch} />
        <div id="map" style={{ width: '100%', height: '100vh' }}>
          <PlaceUserLocation onClick={onClickUserLocation} />
        </div>
        <StyledButton name="위치 확정하기" onClick={toggleOpenModal} />
      </Container>
      {/* <PlaceDrawer /> */}
      {isOpenModal && (
        <Modal
          type="OkCancel"
          onOk={() => {
            toggleOpenModal();
            toggleOpenConfirmModal();
          }}
          onClose={toggleOpenModal}
          width={294}
        >
          <Text>
            <Emphasize>잠실역</Emphasize>에서 출발하시나요?
          </Text>
          <DisabledText>위치를 확정하면 수정할 수 없어요!</DisabledText>
        </Modal>
      )}
      {isOpenConfirmModal && (
        <Modal type="Ok" onOk={toggleOpenConfirmModal} width={294}>
          <Text>출발 위치를 정했어요!</Text>
        </Modal>
      )}
    </>
  );
};

const Container = styled.div`
  height: 100vh;
`;
const StyledButton = styled(Button)`
  position: fixed;
  width: 358px;
  left: 50%;
  transform: translateX(-50%);
  bottom: 34px;
  @media (max-width: 390px) {
    width: calc(100% - 32px);
  }
`;

export default PlacePage;
