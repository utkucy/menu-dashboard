import * as React from "react";
import styled from 'styled-components'
import { observer } from "mobx-react";
import { action, observable, computed } from "mobx";

import { Form, Input, Row, Col, Divider, Typography, Button } from 'antd';
import { User, PartialUser } from "models/user";
import UserService from "services/user";


interface IUserInformationSectionProps {
  user: User
}

const { Title } = Typography;

@observer
class UserInformationSection extends React.Component<IUserInformationSectionProps> {
  @observable user = new PartialUser(this.props.user)

  @action.bound
  userRestaurantNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.user.restaurant_name = event.target.value
  }

  @action.bound
  userEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.user.email = event.target.value
  }

  @action.bound
  userPhoneNumberChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.user.phone_number = event.target.value
  }

  @action.bound
  userWebsiteChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.user.website = event.target.value
  }

  @action.bound
  userImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.user.image_url = event.target.value
  }

  @action.bound
  async onUpdateClick() {
    console.log(this.user);
    await UserService.editUser(this.user)
    location.reload()
  }

  render() {
    return(
      <Container>
        <Title style={{ marginBottom: 30 , color: '#283747' }} level={4}>Kullanıcı Bilgileri</Title>
        <Form layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item 
              label={<label style={{ color: "#283747" }}>Restorant İsmi</label>}
              required={true}
              >
                <Input 
                  value={this.user.restaurant_name}
                  onChange={this.userRestaurantNameChange}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item 
              label={<label style={{ color: "#283747" }}>İnternet Sitesi</label>}
              >
                <Input 
                  value={this.user.website}
                  onChange={this.userWebsiteChange}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row justify="start" gutter={16}>
            <Col span={12}>
              <Form.Item 
              label={<label style={{ color: "#283747" }}>E-Posta</label>}
              required={true}
              >
                <Input 
                  value={this.user.email}
                  onChange={this.userEmailChange}
                  type="email"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item 
              label={<label style={{ color: "#283747" }}>Telefon Numarası</label>}
              required={true}
              >
                <Input 
                  value={this.user.phone_number}
                  onChange={this.userPhoneNumberChange}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item 
              label={<label style={{ color: "#283747" }}>Fotoğraf Linki</label>}
              >
                <Input 
                  value={this.user.image_url}
                  onChange={this.userImageChange}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row justify="end" gutter={16}>
            <Col  >
              <Button onClick={this.onUpdateClick} type="primary">Güncelle</Button>
            </Col>
          </Row>
        </Form>
      </Container>
    )
  }
}


const Container = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 24px;
  margin: auto;
  margin-top: 48px;
  margin-bottom: 24px;
  box-shadow: 0px 12px 24px rgba(132, 153, 193, 0.08);
  width: 1100px;
`;

const SectionTitle = styled.div`
  font-size: 18px;
`


export default UserInformationSection