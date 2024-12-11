'use client';
import Button from '@/components/Button';
import React from 'react';
import styled from 'styled-components';

const PlaceDrawer = () => {
  return (
    <Container>
      <div className="grayBox">line</div>
      <>
        {/* 1명일때 */}
        {/* <div className="drawer">
          <div className="drawerTitle">다른 미팅원들이 투표중이에요.</div>
          <p className="description">
            출발 위치를 <b>잠실역</b>으로 설정했어요.
          </p>
        </div> */}
        {/* 2명이상일떄 */}
        <div className="drawer">
          <div className="drawerTitle">
            <b>천호역</b>까지
            <br />
            평균 이동 시간은 <b>15분</b>입니다!
          </div>
          <div className="descriptionContainer">
            <p className="description">
              <div className="number">1</div> <b>잠실역</b>에서부터 <b>18분</b>
            </p>
            <p className="description">
              <div className="number">2</div> <b>아차산역</b>에서부터 <b>18분</b>
            </p>
          </div>
        </div>
      </>
      <StyledButton name="추천지 보기" />
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  bottom: 0;
  z-index: 100;
  background-color: white;
  width: 390px;
  border-radius: ${({ theme }) => theme.borderRadius.medium}
    ${({ theme }) => theme.borderRadius.medium} 0 0;
  padding: 0 16px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.15);
  @media (max-width: 390px) {
    width: 100%;
  }
  .grayBox {
    background-color: ${({ theme }) => theme.colors.gray[4]};
    width: 40px;
    height: 4px;
    text-indent: -9999px;
    border-radius: 2px;
    margin: 8px 0 20px;
  }
  .drawer {
    width: 100%;
    .drawerTitle {
      margin-bottom: 20px;
      ${({ theme }) => theme.fonts.title['sm']};
      b {
        color: ${({ theme }) => theme.colors.primary.default};
      }
    }
    .drawerDescription {
      ${({ theme }) => theme.fonts.text['xl']};
      b {
        font-weight: normal;
        color: ${({ theme }) => theme.colors.primary.default};
      }
    }
    .descriptionContainer {
      display: flex;
      flex-direction: column;
      gap: 12px;
      .description {
        width: 100%;
        display: flex;
        align-items: center;
        .number {
          display: grid;
          place-items: center;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background-color: ${({ theme }) => theme.colors.green};
          color: white;
          margin-right: 8px;
        }
        b {
          font-weight: normal;
          color: ${({ theme }) => theme.colors.green};
        }
      }
    }
  }
`;
const StyledButton = styled(Button)`
  margin: 28px 0 16px;
`;

export default PlaceDrawer;
