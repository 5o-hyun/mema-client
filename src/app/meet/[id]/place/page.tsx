'use client';
import Button from '@/components/Button';
import Modal from '@/components/Modal';
import { DisabledText, Emphasize, Text } from '@/components/Modal/modalTypography';
import PlaceDrawer from '@/features/meet/place/PlaceDrawer';
import PlaceInput from '@/features/meet/place/PlaceInput';
import PlaceUserLocation from '@/features/meet/place/PlaceUserLocation';
import { createVoteLocation, getMyLocation, getStations, getTotalLocation } from '@/lib/api/locate';
import { getMeet } from '@/lib/api/meets';
import useToggle from '@/lib/hooks/useToggle';
import { Station } from '@/types/locate';
import { MeetResponse } from '@/types/meets';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const PlacePage = () => {
  const params = useParams();
  const meetId = (params?.id && Number(params.id)) || null;
  const [searchKeyword, setSearchKeyword] = useState('');
  const [station, setStation] = useState<Station>();
  const mapRef = useRef<naver.maps.Map | null>(null);
  const [isFocusSearch, toggleFocusSearch] = useToggle();
  const [isOpenModal, toggleOpenModal] = useToggle();
  const [isOpenConfirmModal, toggleOpenConfirmModal] = useToggle();

  // 만남 조회
  // const { data: meet } = useQuery<AxiosResponse<MeetResponse>>({
  //   queryKey: ['meet', meetId],
  //   queryFn: () => getMeet(meetId as number),
  //   enabled: meetId !== null,
  // });
  // console.log(meet);

  const { data: stations } = useQuery<AxiosResponse>({
    queryKey: ['meet', meetId],
    queryFn: () => getStations(meetId as number),
    enabled: meetId !== null,
  });

  const { data: myLocation, refetch: refetchMyLocation } = useQuery<AxiosResponse>({
    queryKey: ['myLocation', meetId],
    queryFn: () => getMyLocation(meetId as number),
    enabled: meetId !== null,
  });

  const { data: totalLocation } = useQuery<AxiosResponse>({
    queryKey: ['totalLocation', meetId],
    queryFn: () => getTotalLocation(meetId as number),
    enabled: meetId !== null,
  });

  const createVoteMutation = useMutation({
    mutationFn: createVoteLocation,
    onSuccess: () => {
      toggleOpenModal();
      toggleOpenConfirmModal();
      refetchMyLocation();
    },
    onError: (error) => {
      console.error(error);
      // alert('error');
    },
  });

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

  const onClickSearch = (station: Station) => {
    setSearchKeyword(`${station.stationName} ${station.routeName}`);
    setStation(station);
    toggleFocusSearch();
  };

  const onClickModal = () => {
    if (searchKeyword === '') {
      return alert('위치를 검색해주세요');
    }
    toggleOpenModal();
  };

  const onClickConfirmModal = () => {
    createVoteMutation.mutate({ meetId: meetId as number, station: station as Station });
  };

  return (
    <>
      <Container>
        {!myLocation && (
          <PlaceInput
            stations={stations}
            searchKeyword={searchKeyword}
            isFocus={isFocusSearch}
            setSearchKeyword={setSearchKeyword}
            onFocus={onFocusSearch}
            onClick={onClickSearch}
          />
        )}
        <div id="map" style={{ width: '100%', height: '100vh' }}>
          <PlaceUserLocation onClick={onClickUserLocation} />
        </div>
        {!myLocation && <StyledButton name="위치 확정하기" onClick={onClickModal} />}
      </Container>
      {myLocation && (
        <PlaceDrawer
          myLocation={myLocation.data.startStation}
          totalLocation={totalLocation?.data}
        />
      )}

      {isOpenModal && (
        <Modal type="OkCancel" onOk={onClickConfirmModal} onClose={toggleOpenModal} width={294}>
          <Text>
            <Emphasize>{searchKeyword}</Emphasize>에서 출발하시나요?
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
