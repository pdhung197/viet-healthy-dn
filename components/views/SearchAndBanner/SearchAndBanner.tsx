import {Col, Row} from "antd";
import React from "react";
import {useMenu} from "../../../hooks/useMenu/useMenu";
import {HomeCarousel} from "../../blocks/Carousels/HomeCarousel";
import {CatsDropdown} from "../../blocks/CatsDropdown/CatsDropdown";
import {Container} from "../../blocks/Containers/Container";
import {SearchBar} from "../../blocks/SearchBar/SearchBar";

export const SearchAndBanner = () => {
  const {currentRoute} = useMenu();

  return (
    <Container>
      <Row gutter={[24, 16]}>
        <Col
          xs={{span: 24}}
          sm={{span: 24}}
          md={{span: 9}}
          lg={{span: 8}}
          xl={{span: 7}}
        >
          <CatsDropdown />
        </Col>
        <Col
          xs={{span: 24}}
          sm={{span: 24}}
          md={{span: 15}}
          lg={{span: 16}}
          xl={{span: 17}}
        >
          <Row gutter={[0, 16]}>
            <Col xs={{span: 24}}>
              <SearchBar />
            </Col>
            {currentRoute === "home" && (
              <Col xs={{span: 24}}>
                <HomeCarousel />
              </Col>
            )}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
