'use client';
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';
import React from 'react';
import styled from 'styled-components';

type ManagementContentProps = {
  onDelete: () => void;
};

function ManagementContent({ onDelete }: ManagementContentProps) {
  const router = useRouter();

  return (
    <Container>
      <p className="title">찜닭머그러가자</p>
      <p className="totalPerson">인원 5명</p>
      <div className="person">
        <p>김짜장,</p>
        <p>불닭먹고싶다,</p>
        <p>마라엽기떡볶이,</p>
        <p>박짬뽕,</p>
        <p>지니는찜닭이조아</p>
      </div>
      <div className="btnGroup">
        <Button name="미팅 삭제" buttonType="gray" onClick={onDelete} />
        <Button name="미팅명 변경" onClick={() => router.push('/meet/management/1')} />
      </div>
    </Container>
  );
}

const Container = styled.div`
  padding: 16px;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  background-color: ${({ theme }) => theme.colors.gray[6]};
  .title {
    ${({ theme }) => theme.fonts.title['xs']};
    margin-bottom: 20px;
  }
  .totalPerson {
    margin-bottom: 4px;
    ${({ theme }) => theme.fonts.text['lg']};
    color: ${({ theme }) => theme.colors.gray[3]};
  }
  .person {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 20px;
  }
  .btnGroup {
    display: flex;
    gap: 8px;
  }
`;

export default ManagementContent;
