import * as React from "react";
import styled from 'styled-components'
import { observer } from "mobx-react";
import { action, observable, computed } from "mobx";
import { Form, Input, Row, Col, Divider, Typography, Button, Select, message } from 'antd';
import {
  PlusOutlined,
} from '@ant-design/icons';

import AddBranch from './add-branch'

import { User } from "models/user";
import { Branch, PartialBranch } from "models/branch";
import BranchService from "services/branch";



interface IBranchInformationSection {
  user: User
}

const { Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;

@observer
class BranchInformationSection extends React.Component<IBranchInformationSection> {

  @observable branch: PartialBranch = new PartialBranch(this.props.user.branches![0])
  @observable visible = false

  constructor(props: IBranchInformationSection) {
    super(props)
    this.changeModalVisible = this.changeModalVisible.bind(this)
  }

  @action.bound
  onSelectChange(value: string) {
    console.log(`selected ${value}`);
    this.props.user.branches?.map((branch, index) => {
      if (branch.name === value)
        this.branch = new PartialBranch(this.props.user.branches![index])
    })
  }

  @action.bound
  changeModalVisible() {
    this.visible = !this.visible
  }

  @action.bound
  onBranchNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.branch.name = event.target.value
  }

  @action.bound
  onBranchTelephoneChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.branch.telephone = event.target.value
  }
  
  @action.bound
  onBranchAddressChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    this.branch.address = event.target.value
  }

  @action.bound
  async onUpdateClick() {
    if(this.branch.address === "" || this.branch.name === "" || this.branch.telephone === "")
      return message.warning("Şube bilgileri için zorunlu alanları giriniz")
    console.log(this.branch.address)
    try {
      await BranchService.editBranch(this.branch)
      location.reload()
      message.success("Şube bilgileriniz güncellendi")
    } catch (error) {
      message.error("Şube bilgileriniz güncellenemedi")
    }
  }

  @action.bound
  async onDeleteClick() {
    try {
      await BranchService.deleteBranch(this.branch)
      location.reload()
      message.success(`${this.branch.name} şube bilgileriniz silinmiştir`)
    } catch (error) {
      message.error("Şube bilgileriniz silinemedi")
    }
    
  }


  @computed
  get selectOptions() {
    return(
      this.props.user.branches?.map((branch,index) => 
          <Option key={index} value={branch.name}>{branch.name}</Option>
      )
    )
  }

  @computed
  get defaultOption() {
    return this.props.user.branches![0].name
  }

  render() {
    return (
      <Container>
        <AddBranch onClose={this.changeModalVisible} visible={this.visible}/> 
        <Row gutter={16}>
          <Col span={12}>
            <Title style={{ marginBottom: 30 , color: '#283747' }} level={4}>Şube Bilgileri</Title>
          </Col>
          <Col span={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button 
              icon={<PlusOutlined />} 
              type="dashed" 
              // style={{ marginTop: 20 }}
              onClick={this.changeModalVisible}
            >
              Şube Ekle
            </Button>
          </Col>
        </Row>
        
        <Row gutter={[16,48]}>
          <Col span={24}>
            <Select defaultValue={this.defaultOption} style={{ width: '100%' }} onChange={this.onSelectChange}>
              {this.selectOptions}
            </Select>
          </Col>
        </Row>
        <Form layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
              label={<label style={{ color: "#283747" }}>Şube İsmi</label>}
              required={true}
              >
                 <Input 
                  value={this.branch.name}
                  onChange={this.onBranchNameChange}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
              label={<label style={{ color: "#283747" }}>Telefon Numarası</label>}
              required={true}
              >
                 <Input 
                  value={this.branch.telephone}
                  onChange={this.onBranchTelephoneChange}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label={<label style={{ color: "#283747" }}>Adres</label>}
                required={true}
                >
                  <TextArea
                    rows={4} 
                    autoSize={{ minRows: 2, maxRows: 4 }}
                    value={this.branch.address}
                    onChange={this.onBranchAddressChange}
                  />
              </Form.Item>
            </Col>
          </Row>
          <Row justify="end" gutter={16}>
            <Col >
              <Button onClick={this.onDeleteClick} danger>Sil</Button>
            </Col>
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


export default BranchInformationSection