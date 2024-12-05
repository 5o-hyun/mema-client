import React from 'react';
import styled from 'styled-components';

function ManagementChangeTitle() {
  return (
    <Container>
      <p className="title">미팅의 새로운 이름을 알려주세요!</p>
      <p className="description">미팅 이름은 최대 8글자까지 설정할 수 있어요</p>
    </Container>
  );
}

const Container = styled.div`
  margin: 50px 0 100px;
  .title {
    ${({ theme }) => theme.fonts.title['md']};
    margin-bottom: 10px;
  }
  .description {
    ${({ theme }) => theme.fonts.text['lg']};
  }
`;

export default ManagementChangeTitle;
