import styled from "styled-components";
import {Button, Col, Row} from "antd";
import {PhoneFilled, UserOutlined} from "@ant-design/icons";
import {Container} from "../Containers/Container";
import {theme} from "../../../configs/theme/theme";

const StyledHeader = styled.header`
  background-color: ${theme.light};
  padding: 10px 0;
  margin-bottom: 10px;
`;

const HeaderLink = styled(Button)`
  color: ${theme.black};
  font-weight: 300;
  margin: 0;
  padding: 0;
  font-size: small;
`;

const Seperator = styled.div`
  margin: auto 15px;
  display: inline;
  position: relative;

  ::after {
    position: absolute;
    left: 0;
    top: 0px;
    height: 100%;
    width: 1px;
    background: ${theme.black};
    opacity: 0.1;
    content: "";
  }
`;

const RightGroup = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const LoginBtn = styled(Button)`
  background: none !important;
  border: none !important;
  outline: none !important;
  box-shadow: none !important;
  margin: 0;
  padding: 0 2px;
  font-weight: 300;
  color: ${theme.black};
`;

const InlineIcon = styled.img`
  display: inline;
  max-height: 60%;
  margin-right: 5px;
  transform: translateY(-1px);
`;

export const Header = () => {
  return (
    <StyledHeader>
      <Container>
        <Row justify="center" align="middle">
          <Col sm={{span: 24}} md={{span: 12}}>
            <HeaderLink
              type="link"
              icon={<InlineIcon src="/images/icons/zalo.png" alt="Zalo" />}
              href="http://zalo.me/0938711074"
            >
              Zalo: Windy
            </HeaderLink>
            <Seperator />
            <HeaderLink
              type="link"
              icon={<PhoneFilled />}
              href="tel:0938711074"
            >
              0938 711 074
            </HeaderLink>
          </Col>
          <Col sm={{span: 24}} md={{span: 12}}>
            <RightGroup>
              <LoginBtn icon={<UserOutlined />}>Login</LoginBtn>
            </RightGroup>
          </Col>
        </Row>
      </Container>
    </StyledHeader>
  );
};
