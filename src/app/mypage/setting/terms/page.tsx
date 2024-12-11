'use client';
import TabBar from '@/components/TabBar';
import styled from 'styled-components';

const TermsPage = () => {
  return (
    <>
      <TabBar />
      <Paragraph>
        <MainTitle>서비스 제작</MainTitle>
        <Text>본 서비스는 &#39;mmm&#39;에 의해 제작되었습니다.</Text>
      </Paragraph>

      <Paragraph>
        <MainTitle>이용 약관</MainTitle>
        <SubTitle>1조 (목적)</SubTitle>
        <Text>
          본 약관은 mema(이하 &#39;서비스&#39;)를 이용함에 있어 서비스 제공자와 이용자 간의 권리,
          의무 및 책임 사항을 규정하는 것을 목적으로 합니다.
        </Text>

        <SubTitle>2조 (정의)</SubTitle>
        <Text>
          &#39;서비스&#39;란 mema가 제공하는 미팅 관리 및 미팅 일정 투표, 미팅 장소 추천, 비용 정산
          후 공유 관련 모든 기능을 말합니다. &#39;회원&#39;이란 서비스에 가입하여 지속적으로
          서비스를 이용할 수 있는 자를 말합니다.
        </Text>

        <SubTitle>3조 (서비스 이용)</SubTitle>
        <Text>
          사용자는 본 약관에 동의함으로써 서비스를 이용할 수 있습니다. &#39;mmm&#39;은 서비스의 품질
          개선을 위해 일정 사전 공지 후 서비스를 일시적으로 중단할 수 있습니다. 사용자는 서비스를
          통해 제공되는 콘텐츠를 상업적으로 사용할 수 없습니다.
        </Text>

        <SubTitle>4조 (이용 제한)</SubTitle>
        <Text>
          &#39;mmm&#39;은 다음 사유가 발생한 경우 이용자의 서비스 이용을 제한할 수 있습니다:
          <br /> • 타인의 권리를 침해하거나 불법 행위를 저지른 경우. 허위 정보를 입력하여 서비스를
          <br /> • 부정하게 이용한 경우.
        </Text>

        <SubTitle>5조 (분쟁 해결)</SubTitle>
        <Text>
          본 서비스와 관련된 분쟁이 발생한 경우, &#39;mmm&#39;과 이용자는 신의성실의 원칙에 따라
          상호 협의하여 해결하도록 노력합니다. 협의를 통해 해결되지 않을 경우, 분쟁은 관할 법원의
          판결에 따릅니다. 분쟁 해결 과정에서 발생하는 비용은 각 당사자가 부담합니다.
        </Text>

        <SubTitle>6조 (면책 조항)</SubTitle>
        <Text>
          &#39;mmm&#39;은 천재지변, 시스템 장애 등 불가항력으로 인해 서비스를 제공할 수 없는 경우
          책임을 지지 않습니다. 사용자가 자신의 계정 정보를 타인에게 유출하여 발생한 문제에 대해
          &#39;mmm&#39;은 책임을 지지 않습니다.
        </Text>
      </Paragraph>

      <Paragraph>
        <MainTitle>개인정보 처리 방침</MainTitle>
        <SubTitle>7조 (수집하는 개인정보 항목)</SubTitle>
        <Text>필수 정보 : 이메일 주소, 비밀번호.</Text>

        <SubTitle>8조 (개인정보 수집 및 이용 목적)</SubTitle>
        <Text>
          서비스 제공 : 미팅 일정 투표, 미팅 장소 추천, 비용 정산 후 공유 등 핵심 기능 제공.
          <br />
          고객 지원 : 문제 해결.
          <br />
          서비스 개선 : 사용자 경험 분석 및 기능 개선.
        </Text>

        <SubTitle>9조 (개인정보의 보관 및 삭제)</SubTitle>
        <Text>
          사용자의 개인정보는 서비스 이용 기간 동안 보관됩니다. 사용자가 계정을 삭제하거나, 보관
          기간이 종료된 경우 개인정보는 즉시 삭제됩니다.
        </Text>

        <SubTitle>10조 (개인정보의 제3자 제공)</SubTitle>
        <Text>
          회원 및 &#39;mmm&#39;은 서비스 가입에 따른 본 약관 상의 지위 또는 권리, 의무의 전부 또는
          일부를 제3자에게 양도, 위임하거나 담보제공 등의 목적으로 처분할 수 없습니다.
          &#39;mmm&#39;은 사용자의 동의 없이 개인정보를 제3자에게 제공하지 않습니다. 단, 다음의 경우
          예외로 합니다:
          <br /> • 법령에 의해 요구되는 경우.
          <br /> • 사용자가 동의한 경우.
        </Text>

        <SubTitle>11조 (사용자의 권리)</SubTitle>
        <Text>사용자는 자신의 개인정보를 열람, 수정, 삭제할 수 있습니다.</Text>
      </Paragraph>

      <Paragraph>
        <MainTitle>부칙</MainTitle>
        <Text>이 약관은 2024년 12월 14일부터 시행합니다.</Text>
      </Paragraph>
    </>
  );
};

export default TermsPage;

const Paragraph = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`;

const MainTitle = styled.p`
  ${({ theme }) => theme.fonts.title.sm};
  margin-bottom: 16px;
`;
const SubTitle = styled.p`
  color: ${({ theme }) => theme.colors.gray[3]};
  ${({ theme }) => theme.fonts.text.xl};
  margin-bottom: 8px;
`;

const Text = styled.p`
  ${({ theme }) => theme.fonts.text.xl};
  margin-bottom: 10px;
`;
