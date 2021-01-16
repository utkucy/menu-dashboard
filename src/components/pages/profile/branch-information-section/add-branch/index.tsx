import * as React from "react";
import styled from 'styled-components'
import { observer } from "mobx-react";
import { action, observable, computed } from "mobx";
import { Drawer, Form, Button, Col, Row, Input, Divider, Typography, message } from 'antd';
import { PartialBranch } from "models/branch";
import BranchService from "services/branch";


interface IAddBranchProps {
  onClose: any
  visible: boolean
}

@observer
class AddBranch extends React.Component<IAddBranchProps> {

  @observable newBranch: PartialBranch = new PartialBranch({})

  @action.bound
  branchtNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.newBranch.name = event.target.value
  }

  @action.bound
  branchTelephoneChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.newBranch.telephone = event.target.value
  }

  @action.bound
  branchAddressChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.newBranch.address = event.target.value
  }


  @action.bound
  async addBranchClick() {
    if (this.newBranch.name === undefined)
      return message.warning('Şube ismi girilmemiş')
    else if(this.newBranch.telephone === undefined)
      return message.warning('Şubeye ait telefon numarası girilmemiş')
    else if(this.newBranch.address === undefined)
      return message.warning('Şubenin adres bilgileri girilmemiş girilmemiş')

    await BranchService.addBranch(this.newBranch)
    this.props.onClose()
    location.reload()
    message.success("Şubeniz Başarıyla Eklendi")
  } 

  render() {
    return (
      <Drawer
      title="Yeni Şube Bilgileri"
      width={720}
      onClose={this.props.onClose}
      visible={this.props.visible}
      bodyStyle={{ paddingBottom: 80 }}
      destroyOnClose={true}
      footer={
        <div
          style={{
            textAlign: 'right',
          }}
        >
          <Button type="primary" onClick={this.addBranchClick} >
            Ekle
          </Button>
        </div>
      }
      >
        {/* <Row style={{ marginBottom: 15, marginTop: 15 }} gutter={16}>
          <Col span={24}>
            <Title level={4}>{this.props.category.name}</Title>
          </Col>
        </Row> */}
        <Form layout="vertical">
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="Şube İsmi"
                required={true}
                rules={[{ required: true, message: 'Lütfen şube ismi giriniz' }]}
              >
                <Input value={this.newBranch.name} onChange={this.branchtNameChange} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="Telefon Numarası"
                required={true}
                rules={[{ required: true, message: 'Lütfen şubenizin telefon numarasını giriniz' }]}
              >
                <Input value={this.newBranch.telephone} onChange={this.branchTelephoneChange} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="Adres"
                required={true}
                rules={[
                  {
                    required: true,
                    message: 'Lütfen adres bilgilerinizi giriniz',
                  },
                ]}
              >
                <Input suffix="₺" value={this.newBranch.address} onChange={this.branchAddressChange} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    )
  }
}

export default AddBranch