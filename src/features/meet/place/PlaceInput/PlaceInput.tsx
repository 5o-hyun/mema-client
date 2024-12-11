'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { ChevronLeft, Search } from 'react-feather';
import styled from 'styled-components';

type Props = {
  isFocus: boolean;
  onFocus: () => void;
};

const PlaceInput = ({ isFocus, onFocus }: Props) => {
  const router = useRouter();

  return (
    <Container isFocus={isFocus}>
      {/* 상단부분 */}
      <div className="searchTabContainer">
        <ChevronLeft onClick={() => router.back()} />
        <div className="searchTab">
          <input
            placeholder="모임날 출발하는 지하철 역을 알려주세요!"
            onFocus={onFocus}
            className="searchInput"
          />
          <Search />
        </div>
      </div>
      {/* 배경부분 */}
      {isFocus && (
        <div className="background">
          <div className="placeContainer">
            <div className="place">
              <p className="title">잠실역2호선1</p>
              <p className="location">서울송파구올림픽로</p>
            </div>
            <div className="place">
              <p className="title">잠실역2호선2</p>
              <p className="location">서울송파구올림픽로</p>
            </div>
            <div className="place">
              <p className="title">잠실역2호선3</p>
              <p className="location">
                서울송파구올림서울송파구올림픽로서울송파구올림픽로서울송파구올림픽로픽로
              </p>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

const Container = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'isFocus',
})<{ isFocus: boolean }>`
  width: 390px;
  position: relative;
  @media (max-width: 390px) {
    width: 100%;
  }
  .searchTabContainer {
    position: absolute;
    width: 100%;
    padding: 16px;
    display: flex;
    align-items: center;
    gap: 8px;
    box-sizing: border-box;
    z-index: 3;
    svg {
      cursor: pointer;
    }
    .searchTab {
      flex: 1;
      height: fit-content;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px;
      border-radius: ${({ theme }) => theme.borderRadius.medium};
      background-color: ${({ isFocus, theme }) =>
        isFocus ? theme.colors.gray[6] : theme.colors.white};
      box-shadow: ${({ isFocus }) => !isFocus && '0px 4px 10px 0px rgba(0, 0, 0, 0.15)'};

      .searchInput {
        flex: 1;
        border: none;
        outline: none;
        background-color: transparent;
        ${({ theme }) => theme.fonts.text.xl};
        color: ${({ theme }) => theme.colors.black};
        &::placeholder {
          color: ${({ theme }) => theme.colors.gray[4]};
        }
      }
    }
  }
  .background {
    position: absolute;
    width: 100%;
    background-color: white;
    height: 100vh;
    z-index: 2;
    .placeContainer {
      margin-top: 82px;
      border-top: 10px solid ${({ theme }) => theme.colors.gray[6]};
      z-index: 3;
      .place {
        padding: 12px 16px;
        border-bottom: 1px solid ${({ theme }) => theme.colors.gray[6]};
        cursor: pointer;
        .title {
          ${({ theme }) => theme.fonts.text.xl};
          margin-bottom: 4px;
        }
        .location {
          ${({ theme }) => theme.fonts.text.lg};
          color: ${({ theme }) => theme.colors.gray[3]};
        }
      }
    }
  }
`;

export default PlaceInput;
