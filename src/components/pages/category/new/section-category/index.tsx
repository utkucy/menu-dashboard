import React from 'react'
import { observer } from "mobx-react";
import { action } from "mobx";
import styled from 'styled-components'
import { Form, Input, Row, Col, Typography, Divider } from 'antd';

import { PartialCategory } from '../../../../../models/category'

interface ICategorySectionProps {
  category: PartialCategory
}

const { TextArea } = Input;
const { Title } = Typography;


@observer
class CategorySection extends React.Component<ICategorySectionProps> {

  @action.bound
  categoryNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.props.category.name = event.target.value
    // console.log(this.props.category.name);
  }

  @action.bound
  categoryDescriptionChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    this.props.category.description = event.target.value
    // console.log(this.props.category.description);
  }


  render() {
    return (
      <Container>
        {/* <Row gutter={16}>
          <Col span={24}>
            <Divider orientation="left"><Title level={3}>Kategori Bilgileri</Title></Divider>
          </Col>
        </Row> */}
        <SectionTitle>Kategori Bilgileri</SectionTitle>
        <Row justify="start" gutter={16}>
          <Col span={24}>
            <Form.Item required={true} style={{ color: "red" }} label={<label style={{ color: "#283747" }}>Kategori İsmi</label>}>
                <Input 
                placeholder="- Kahvaltılıklar, Başlangıçlar ..."
                value={this.props.category.name}
                onChange={this.categoryNameChange}
                />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item 
            style={{ color: "red" }} 
            label={<label style={{ color: "#283747" }}>Açıklama</label>}
            >
                <TextArea 
                placeholder="Hamburgerlerimizin her biri ayrı bir lezzette olup damak tadınıza en yakışan ürünlerle özenle hazırlanır"
                autoSize={{ minRows: 2, maxRows: 6 }}
                value={this.props.category.description}
                onChange={this.categoryDescriptionChange}
                />
            </Form.Item>
          </Col>
        </Row>
      </Container>
    )
  }
}

const Container = styled.div`
  background: white;
  border-radius: 8px;
  padding: 24px;
  margin: auto;
  margin-top: 24px;
  box-shadow: 0px 12px 24px rgba(132, 153, 193, 0.08);
`

const SectionTitle = styled.div`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 24px;
`;






export default CategorySection
